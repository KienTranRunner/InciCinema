using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Seat;
using Application.DTOs.Ticket;

namespace Application.DTOs.Showtime
{
    public class ShowtimeReponse
    {
         public int ShowTimeId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public decimal Price { get; set; }

        public int MovieId { get; set; }


         public string MovieTitle { get; set; } 
       
        public string PosterUrl { get; set; }
        public string Rating { get; set; }
        public string Director { get; set; }
        public int Duration { get; set; } 
        public string Genre { get; set; }

        public int RoomId { get; set; }

        public string RoomName { get; set; }

        public List<SeatResponse> Seats { get; set; }
        public List<TicketReponse> Tickets { get; set; } 

    }
}