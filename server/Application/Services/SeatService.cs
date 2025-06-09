using Application.Interfaces.Seat;
using Application.DTOs.Seat;
using Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Domain.Entities;

namespace Application.Services
{
    public class SeatService : ISeatService
    {
        private readonly ISeatRepository _seatRepository;

        public SeatService(ISeatRepository seatRepository)
        {
            _seatRepository = seatRepository;
        }

        public async Task<SeatResponse> CreateSeatAsync(CreateSeatRequest request)
        {
            var seat = new Seat
            {
                SeatNumber = request.SeatNumber,
                Row = request.Row,
                Column = request.Column,
                RoomId = request.RoomId
            };

            await _seatRepository.AddAsync(seat);
            await _seatRepository.SaveChangesAsync();

            return MapToResponse(seat);
        }

        public Task<bool> DeleteSeatAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<SeatResponse>> GetAllSeatsAsync()
        {
            var seat = await _seatRepository.GetAllAsync();
            return seat.Select(MapToResponse);
        }

        public Task<SeatResponse> GetSeatByIdAsync(int id)
        {
            throw new NotImplementedException();
        }


        private SeatResponse MapToResponse(Seat seat)
        {
            return new SeatResponse
            {
                SeatId = seat.SeatId,
                SeatNumber = seat.SeatNumber,
                Row = seat.Row,
                Column = seat.Column,
                RoomId = seat.RoomId,
            };
        }

        public async Task<IEnumerable<SeatResponse>> CreateSeatsAsync(List<CreateSeatRequest> requests)
        {
            if (requests == null || requests.Count == 0)
                return Enumerable.Empty<SeatResponse>();

            var roomId = requests.First().RoomId;

            var existingSeats = await _seatRepository.GetByRoomIdAsync(roomId);

            var existingSeatKeys = new HashSet<string>(
                existingSeats.Select(s => $"{s.Row}{s.Column}")
            );

            var newSeats = requests
                .Where(req => !existingSeatKeys.Contains($"{req.Row}{req.Column}"))
                .Select(req => new Seat
                {
                    SeatNumber = req.SeatNumber,
                    Row = req.Row,
                    Column = req.Column,
                    RoomId = req.RoomId
                })
                .ToList();

            if (newSeats.Any())
            {
                await _seatRepository.AddRangeAsync(newSeats);
                await _seatRepository.SaveChangesAsync();
            }

            return newSeats.Select(MapToResponse);
        }

        public async Task DeleteSeatsAsync(DeleteSeatRequest request)
        {
            var seatsToDelete = await _seatRepository
                .GetByRoomIdAndSeatNumbersAsync(request.RoomId, request.SeatNumbers);

            if (seatsToDelete.Any())
            {
                _seatRepository.RemoveRange(seatsToDelete);
                await _seatRepository.SaveChangesAsync();
            }
        }
        public async Task<IEnumerable<SeatResponse>> GetSeatsByRoomIdAsync(int roomId)
        {
            var seats = await _seatRepository.GetByRoomIdAsync(roomId);

            return seats.Select(MapToResponse);
        }






    }
}
