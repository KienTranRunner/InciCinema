using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ShowtimeRepository : Repository<Showtime>, IShowtimeRepository
    {
        public ShowtimeRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<List<Showtime>> GetByRoomIdAsync(int roomId)
        {
            return await _context.Showtimes
                .Where(s => s.RoomId == roomId)
                .ToListAsync();
        }

        public async Task<List<Showtime>> GetByMovieIdAsync(int movieId)
        {
            return await _context.Showtimes.Where(s => s.MovieId == movieId).ToListAsync();
        }

        public async Task<List<Showtime>> GetByMovieIdWithRoomAsync(int movieId)
        {
            return await _context.Showtimes
                .Include(s => s.Room)
                .Where(s => s.MovieId == movieId)
                .ToListAsync();
        }
        public async Task<Showtime> GetDetailsByShowtimeIdAsync(int showtimeId)
        {
            return await _context.Showtimes
                .Include(s => s.Room)
                    .ThenInclude(r => r.Seats)
                .Include(s => s.Tickets)
                    .ThenInclude(t => t.Seat)
                .Include(s => s.Movie)
                .FirstOrDefaultAsync(s => s.ShowTimeId == showtimeId);
        }

        public async Task<List<Showtime>> GetAllWithDetailsAsync()
        {
            return await _context.Showtimes
                .Include(s => s.Movie)
                .Include(s => s.Room)
                    .ThenInclude(r => r.Seats)
                .Include(s => s.Tickets)
                .ToListAsync();
        }







    }
}