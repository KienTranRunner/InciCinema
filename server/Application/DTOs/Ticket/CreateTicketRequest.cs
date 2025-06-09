using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Ticket
{
    public class CreateTicketRequest
    {
        public int ShowTimeId { get; set; }
        public int SeatId { get; set; }
        public string UserId { get; set; }
        public decimal Price { get; set; }

        public DateTime BookingTime { get; set; }

        public string Status { get; set; }
    }
}