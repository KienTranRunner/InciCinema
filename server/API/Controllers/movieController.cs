using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Movie;
using Application.Interfaces.Movie;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class movieController : ControllerBase
    {
        private readonly IMovieService _movieService;
        public movieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMovies()
        {
            var movies = await _movieService.GetAllMoviesAsync();
            return Ok(movies);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var movie = await _movieService.GetMovieByIdAsync(id);
            if (movie == null) return NotFound();
            return Ok(movie);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMovieRequest request)
        {
            var movie = await _movieService.CreateMovieAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = movie.MovieId }, movie);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(int id, [FromBody] UpdateMovieRequest request)
        {
            try
            {
                await _movieService.UpdateMovieAsync(id, request);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _movieService.DeleteMovieAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


    }
}