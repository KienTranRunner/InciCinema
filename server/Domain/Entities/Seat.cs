using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Seat
    {
        [Key]
        public int SeatId { get; set; }

        [Required, StringLength(10)]
        public string SeatNumber { get; set; }

        [Required, StringLength(5)]
        public string Row { get; set; } 

        [Required]
        public int Column { get; set; }

        [ForeignKey("Room")]
        public int RoomId { get; set; }
        public Room Room { get; set; }

    }
}