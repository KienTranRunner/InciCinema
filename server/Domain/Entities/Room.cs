using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Room
    {

        [Key]
        public int RoomId { get; set; }

        [Required, StringLength(100)]
        public string RoomName { get; set; }

        [Required, Range(1, 500)]
        public int SeatCount { get; set; }

        [StringLength(50)]
        public string RoomType { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }


        public ICollection<Showtime> Showtimes { get; set; }
        public ICollection<Seat> Seats { get; set; }


    }
}