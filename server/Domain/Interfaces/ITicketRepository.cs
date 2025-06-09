using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ITicketRepository : IRepository<Ticket>
    {
        Task AddRangeAsync(IEnumerable<Ticket> tickets);
        Task<IEnumerable<Ticket>> GetTicketsByUserIdAsync(string userId);

    }
}