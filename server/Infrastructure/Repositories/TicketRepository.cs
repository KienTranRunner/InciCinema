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
    public class TicketRepository : Repository<Ticket>, ITicketRepository
    {
        public TicketRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AddRangeAsync(IEnumerable<Ticket> tickets)
        {
            await _context.Tickets.AddRangeAsync(tickets);
        }
        public async Task<IEnumerable<Ticket>> GetTicketsByUserIdAsync(string userId)
        {
            return await _context.Tickets
        .Where(t => t.UserId == userId)
        .Include(t => t.Seat)
        .Include(t => t.Showtime)
            .ThenInclude(st => st.Movie)
        .Include(t => t.Showtime)
            .ThenInclude(st => st.Room)
        .ToListAsync();
        }


    }
}