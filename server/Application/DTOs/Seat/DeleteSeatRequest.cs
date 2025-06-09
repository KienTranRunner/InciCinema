using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Seat
{
    public class DeleteSeatRequest
    {
        public int RoomId { get; set; }
        public List<string> SeatNumbers { get; set; } = new();
    }
}