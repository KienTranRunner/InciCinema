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
    public class SeatRepository : Repository<Seat>, ISeatRepository
    {
        public SeatRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AddRangeAsync(IEnumerable<Seat> seats)
        {
            await _context.Seats.AddRangeAsync(seats);
        }

        public async Task<List<Seat>> GetByRoomIdAsync(int roomId)
        {
            return await _context.Seats
                .Where(s => s.RoomId == roomId)
                .ToListAsync();
        }

        public async Task<List<Seat>> GetByRoomIdAndSeatNumbersAsync(int roomId, List<string> seatNumbers)
        {
            return await _context.Seats
                .Where(s => s.RoomId == roomId && seatNumbers.Contains(s.SeatNumber))
                .ToListAsync();
        }

        public void RemoveRange(IEnumerable<Seat> seats)
        {
            _context.Seats.RemoveRange(seats);
        }



    }
}