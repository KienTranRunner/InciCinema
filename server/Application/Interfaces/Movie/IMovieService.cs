using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Movie;

namespace Application.Interfaces.Movie
{
    public interface IMovieService
    {
        Task<IEnumerable<MovieResponse>> GetAllMoviesAsync();
        Task<MovieResponse> GetMovieByIdAsync(int id);
        Task<MovieResponse> CreateMovieAsync(CreateMovieRequest request);
        Task<bool> UpdateMovieAsync(int id, UpdateMovieRequest request);
        Task<bool> DeleteMovieAsync(int id);
    }
}