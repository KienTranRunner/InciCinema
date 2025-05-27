using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Ticket
    {
        [Key]
        public int TicketId { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        public DateTime BookingTime { get; set; }


        [Required, MaxLength(20)]
        public string Status { get; set; }


        [ForeignKey("Showtime")]
        public int ShowTimeId { get; set; }
        public Showtime Showtime { get; set; }

        [ForeignKey("Seat")]
        public int SeatId { get; set; }
        public Seat Seat { get; set; }

        [Required]
        public int UserId { get; set; }

    }
}