using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Showtime
{
    public class UpdateShowtimeRequest
    {

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public decimal Price { get; set; }

        public int MovieId { get; set; }

        public int RoomId { get; set; }

    }
}