using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Seat
{
    public class SeatResponse
    {
        public int SeatId { get; set; }
        public string SeatNumber { get; set; }
        public string Row { get; set; }
        public int Column { get; set; }
        public int RoomId { get; set; }
    }
}