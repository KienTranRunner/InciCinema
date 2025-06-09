using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Movie;
using Application.Interfaces.Movie;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;

        public MovieService(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        public async Task<IEnumerable<MovieResponse>> GetAllMoviesAsync()
        {
            var movies = await _movieRepository.GetAllAsync();
            return movies.Select(MapToResponse);
        }

        public async Task<MovieResponse> GetMovieByIdAsync(int id)
        {
            var movie = await _movieRepository.GetByIdAsync(id);
            return movie == null ? null : MapToResponse(movie);
        }

        public async Task<MovieResponse> CreateMovieAsync(CreateMovieRequest request)
        {
            var movie = new Movie
            {
                Title = request.Title,
                Description = request.Description,
                Duration = request.Duration,
                Director = request.Director,
                Language = request.Language,
                Genre = request.Genre,
                PosterUrl = request.PosterUrl,
                TrailerUrl = request.TrailerUrl,
                Rating = request.Rating,
                ReleaseDate = DateTime.SpecifyKind(request.ReleaseDate, DateTimeKind.Utc),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _movieRepository.AddAsync(movie);
            await _movieRepository.SaveChangesAsync();

            return MapToResponse(movie);
        }

        public async Task<bool> UpdateMovieAsync(int id, UpdateMovieRequest request)
        {
            var movie = await _movieRepository.GetByIdAsync(id);
            if (movie == null) return false;

            movie.Title = request.Title;
            movie.Description = request.Description;
            movie.Duration = request.Duration;
            movie.Director = request.Director;
            movie.Language = request.Language;
            movie.Genre = request.Genre;
            movie.PosterUrl = request.PosterUrl;
            movie.TrailerUrl = request.TrailerUrl;
            movie.Rating = request.Rating;
            movie.ReleaseDate = request.ReleaseDate;
            movie.UpdatedAt = DateTime.UtcNow;

            _movieRepository.Update(movie);
            await _movieRepository.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteMovieAsync(int id)
        {
            var movie = await _movieRepository.GetByIdAsync(id);
            if (movie == null) return false;

            _movieRepository.Delete(movie);
            await _movieRepository.SaveChangesAsync();

            return true;
        }

        private MovieResponse MapToResponse(Movie movie)
        {
            return new MovieResponse
            {
                MovieId = movie.MovieId,
                Title = movie.Title,
                Description = movie.Description,
                Duration = movie.Duration,
                Director = movie.Director,
                Language = movie.Language,
                Genre = movie.Genre,
                PosterUrl = movie.PosterUrl,
                TrailerUrl = movie.TrailerUrl,
                Rating = movie.Rating,
                ReleaseDate = movie.ReleaseDate
            };
        }
    }
}