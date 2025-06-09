using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Ticket
{
    public class CreateTicketsRequest
    {
        public int ShowTimeId { get; set; }
        public List<int> SeatIds { get; set; } = new();
        public string UserId { get; set; }
        public decimal Price { get; set; }
        public DateTime BookingTime { get; set; }
    }
}