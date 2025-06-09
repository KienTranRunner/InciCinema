using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Ticket
{
    public class TicketReponse
    {
        public int TicketId { get; set; }
        public int SeatId { get; set; }
        public decimal Price { get; set; }
        public DateTime BookingTime { get; set; }
        public string Status { get; set; }
        public string UserId { get; set; }

        public string SeatNumber { get; set; }
        public string Title { get; set; }
        public string RoomName { get; set; }
        public DateTime StartTime { get; set; }


    }
}