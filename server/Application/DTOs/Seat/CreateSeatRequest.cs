using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Seat
{
    public class CreateSeatRequest
    {
        public string SeatNumber { get; set; }
        public string Row { get; set; }
        public int Column { get; set; }
        public int RoomId { get; set; }
    }
}