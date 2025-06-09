using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Movie
{
    public class MovieResponse
    {
        public int MovieId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public string Director { get; set; }
        public string Language { get; set; }
        public string Genre { get; set; }
        public string PosterUrl { get; set; }
        public string TrailerUrl { get; set; }
        public string Rating { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}