using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Ticket;
using Application.Interfaces.Ticket;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _ticketRepository;

        public TicketService(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<TicketReponse> CreateTicketAsync(CreateTicketRequest request)
        {
            var ticket = new Ticket
            {
                ShowTimeId = request.ShowTimeId,
                SeatId = request.SeatId,
                UserId = request.UserId,
                Price = request.Price,
                BookingTime = DateTime.SpecifyKind(request.BookingTime, DateTimeKind.Utc),
                Status = "Đã đặt",

            };

            await _ticketRepository.AddAsync(ticket);
            await _ticketRepository.SaveChangesAsync();

            return MapToResponse(ticket);
        }

        public async Task<IEnumerable<TicketReponse>> CreateTicketsAsync(CreateTicketsRequest request)
        {
            var tickets = request.SeatIds.Select(seatId => new Ticket
            {
                ShowTimeId = request.ShowTimeId,
                SeatId = seatId,
                UserId = request.UserId,
                Price = request.Price,
                BookingTime = DateTime.SpecifyKind(request.BookingTime, DateTimeKind.Utc),
                Status = "Đã đặt",
            }).ToList();

            await _ticketRepository.AddRangeAsync(tickets);
            await _ticketRepository.SaveChangesAsync();

            return tickets.Select(MapToResponse);
        }

        public async Task<IEnumerable<TicketReponse>> GetTicketsByUserIdAsync(string userId)
        {
            var tickets = await _ticketRepository.GetTicketsByUserIdAsync(userId);

            return tickets.Select(t => new TicketReponse
            {
                TicketId = t.TicketId,
                SeatId = t.SeatId,
                SeatNumber = t.Seat?.Row + t.Seat?.Column,
                Title = t.Showtime?.Movie?.Title,
                RoomName = t.Showtime?.Room?.RoomName,
                StartTime = t.Showtime?.StartTime ?? DateTime.MinValue,
                Price = t.Price,
                Status = t.Status
            });
        }



        private TicketReponse MapToResponse(Ticket ticket)
        {
            return new TicketReponse
            {
                TicketId = ticket.TicketId,
                SeatId = ticket.SeatId,
                Price = ticket.Price,
                BookingTime = ticket.BookingTime,
                Status = ticket.Status,
                UserId = ticket.UserId,
            };
        }
    }
}