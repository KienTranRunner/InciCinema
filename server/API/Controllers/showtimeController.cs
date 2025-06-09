using Application.DTOs.Showtime;
using Application.Interfaces.Showtime;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class showtimeController : ControllerBase
    {
        private readonly IShowtimeService _showtimeService;

        public showtimeController(IShowtimeService showtimeService)
        {
            _showtimeService = showtimeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _showtimeService.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _showtimeService.GetByIdAsync(id);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatShowtimeRequest request)
        {
            try
            {
                var result = await _showtimeService.CreateAsync(request);
                return CreatedAtAction(nameof(GetById), new { id = result.ShowTimeId }, result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateShowtimeRequest request)
        {
            try
            {
                var result = await _showtimeService.UpdateAsync(id, request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _showtimeService.DeleteAsync(id);
            return success ? NoContent() : NotFound();
        }

        [HttpGet("room/{roomId}")]
        public async Task<IActionResult> GetByRoomId(int roomId)
        {
            var result = await _showtimeService.GetByRoomIdAsync(roomId);
            return Ok(result);
        }


        [HttpGet("movie/{movieId}")]
        public async Task<IActionResult> GetByMovieId(int movieId)
        {
            var result = await _showtimeService.GetByMovieIdAsync(movieId);
            return Ok(result);
        }

        [HttpGet("movie/{movieId}/with-room")]
        public async Task<IActionResult> GetShowtimesWithRoom(int movieId)
        {
            var result = await _showtimeService.GetByMovieIdWithRoomAsync(movieId);
            return Ok(result);
        }

        [HttpGet("{id}/details")]
        public async Task<IActionResult> GetDetailsById(int id)
        {
            var result = await _showtimeService.GetDetailsByShowtimeIdAsync(id);
            return result == null ? NotFound() : Ok(result);
        }
    }
}
