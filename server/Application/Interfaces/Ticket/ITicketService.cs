using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Ticket;

namespace Application.Interfaces.Ticket
{
    public interface ITicketService
    {
        Task<TicketReponse> CreateTicketAsync(CreateTicketRequest request);
        Task<IEnumerable<TicketReponse>> CreateTicketsAsync(CreateTicketsRequest request);

        Task<IEnumerable<TicketReponse>> GetTicketsByUserIdAsync(string userId);

    }
}