using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Seat;
using Application.DTOs.Showtime;
using Application.DTOs.Ticket;
using Application.Interfaces.Showtime;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class ShowtimeService : IShowtimeService
    {
        private readonly IShowtimeRepository _showtimeRepository;

        public ShowtimeService(IShowtimeRepository showtimeRepository)
        {
            _showtimeRepository = showtimeRepository;
        }

        public async Task<ShowtimeReponse> CreateAsync(CreatShowtimeRequest request)
        {
            var existingShowtimes = await _showtimeRepository.GetByRoomIdAsync(request.RoomId);

            bool isOverlapping = existingShowtimes.Any(s =>
                request.StartTime < s.EndTime && request.EndTime > s.StartTime
            );

            if (isOverlapping)
            {
                throw new Exception("Trùng thời gian suất chiếu trong cùng phòng.");
            }

            var showtime = new Showtime
            {
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                Price = request.Price,
                MovieId = request.MovieId,
                RoomId = request.RoomId
            };

            await _showtimeRepository.AddAsync(showtime);
            await _showtimeRepository.SaveChangesAsync();

            return MapToResponse(showtime);
        }

        public async Task<IEnumerable<ShowtimeReponse>> GetAllAsync()
        {
            var showtimes = await _showtimeRepository.GetAllWithDetailsAsync();
            return showtimes.Select(MapToResponse);
        }

        public async Task<ShowtimeReponse> GetByIdAsync(int id)
        {
            var showtime = await _showtimeRepository.GetByIdAsync(id);
            return showtime != null ? MapToResponse(showtime) : null;
        }

        public async Task<ShowtimeReponse> UpdateAsync(int id, UpdateShowtimeRequest request)
        {
            var existingShowtime = await _showtimeRepository.GetByIdAsync(id);

            if (existingShowtime == null)
                throw new Exception("Suất chiếu không tồn tại.");

            var overlapping = (await _showtimeRepository.GetByRoomIdAsync(request.RoomId))
                .Where(s => s.ShowTimeId != id)
                .Any(s =>
                    request.StartTime < s.EndTime && request.EndTime > s.StartTime
                );

            if (overlapping)
                throw new Exception("Trùng thời gian suất chiếu trong cùng phòng.");

            existingShowtime.StartTime = request.StartTime;
            existingShowtime.EndTime = request.EndTime;
            existingShowtime.Price = request.Price;
            existingShowtime.MovieId = request.MovieId;
            existingShowtime.RoomId = request.RoomId;

            _showtimeRepository.Update(existingShowtime);
            await _showtimeRepository.SaveChangesAsync();

            return MapToResponse(existingShowtime);
        }



        public async Task<bool> DeleteAsync(int id)
        {
            var showtime = await _showtimeRepository.GetByIdAsync(id);
            if (showtime == null) return false;

            _showtimeRepository.Delete(showtime);
            await _showtimeRepository.SaveChangesAsync();
            return true;
        }

        private ShowtimeReponse MapToResponse(Showtime s)
        {
            return new ShowtimeReponse
            {
                ShowTimeId = s.ShowTimeId,
                StartTime = s.StartTime,
                EndTime = s.EndTime,
                Price = s.Price,
                MovieId = s.MovieId,
                MovieTitle = s.Movie?.Title,
                PosterUrl = s.Movie?.PosterUrl,
                Rating = s.Movie?.Rating,
                Director = s.Movie?.Director,
                Duration = s.Movie?.Duration ?? 0, 
                Genre = s.Movie?.Genre,
                RoomId = s.RoomId,
                RoomName = s.Room?.RoomName,

               
            };
        }

        public async Task<IEnumerable<ShowtimeReponse>> GetByRoomIdAsync(int roomId)
        {
            var showtimes = await _showtimeRepository.GetByRoomIdAsync(roomId);
            return showtimes.Select(MapToResponse);
        }

        public async Task<IEnumerable<ShowtimeReponse>> GetByMovieIdAsync(int movieId)
        {
            var showtimes = await _showtimeRepository.GetByMovieIdAsync(movieId);
            return showtimes.Select(MapToResponse);
        }

        public async Task<IEnumerable<ShowtimeReponse>> GetByMovieIdWithRoomAsync(int movieId)
        {
            var showtimes = await _showtimeRepository.GetByMovieIdWithRoomAsync(movieId);

            return showtimes.Select(s => new ShowtimeReponse
            {
                ShowTimeId = s.ShowTimeId,
                StartTime = s.StartTime,
                EndTime = s.EndTime,
                Price = s.Price,
                MovieId = s.MovieId,
                RoomId = s.RoomId,
                RoomName = s.Room?.RoomName
            });
        }
        public async Task<ShowtimeReponse> GetDetailsByShowtimeIdAsync(int showtimeId)
        {
            var showtime = await _showtimeRepository.GetDetailsByShowtimeIdAsync(showtimeId);

            if (showtime == null) return null;

            return new ShowtimeReponse
            {
                ShowTimeId = showtime.ShowTimeId,
                StartTime = showtime.StartTime,
                EndTime = showtime.EndTime,
                Price = showtime.Price,
                MovieId = showtime.MovieId,
                RoomId = showtime.RoomId,
                RoomName = showtime.Room?.RoomName,
                MovieTitle = showtime.Movie?.Title,
                Seats = showtime.Room?.Seats?.Select(seat => new SeatResponse
                {
                    SeatId = seat.SeatId,
                    SeatNumber = seat.SeatNumber,
                    Row = seat.Row,
                    Column = seat.Column,
                    RoomId = seat.RoomId
                }).ToList(),
                Tickets = showtime.Tickets?.Select(ticket => new TicketReponse
                {
                    TicketId = ticket.TicketId,
                    SeatId = ticket.SeatId,
                    Price = ticket.Price,
                    BookingTime = ticket.BookingTime,
                    Status = ticket.Status,
                    UserId = ticket.UserId
                }).ToList()
            };
        }



    }
}