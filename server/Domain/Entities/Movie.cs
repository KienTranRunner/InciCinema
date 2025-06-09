using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Movie
    {
        [Key]
        public int MovieId { get; set; }

        [Required, StringLength(250)]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required, Range(0, 250)]
        public int Duration { get; set; }

        [Required, StringLength(200)]
        public string Director { get; set; }

        [Required, StringLength(100)]
        public string Language { get; set; }

        [Required, StringLength(50)]
        public string Genre { get; set; }

        public string PosterUrl { get; set; }

        public string TrailerUrl { get; set; }

        [StringLength(5)]
        public string Rating { get; set; }

        public bool hasStoppedShowing { get; set; }
        
        [Required]
        public DateTime ReleaseDate { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<Showtime> Showtimes { get; set; }
    }
}