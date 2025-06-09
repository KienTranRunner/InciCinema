using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Seat;
using Application.Interfaces.Seat;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class seatController : ControllerBase
    {
        private readonly ISeatService _seatService;

        public seatController(ISeatService seatService)
        {
            _seatService = seatService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            var seats = await _seatService.GetAllSeatsAsync();
            return Ok(seats);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var seat = await _seatService.GetSeatByIdAsync(id);
            if (seat == null) return NotFound();
            return Ok(seat);
        }

        [HttpGet("room/{roomId}")]
        public async Task<IActionResult> GetByRoomId(int roomId)
        {
            var seats = await _seatService.GetSeatsByRoomIdAsync(roomId);
            return Ok(seats);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSeatRequest request)
        {
            var room = await _seatService.CreateSeatAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = room.RoomId }, room);
        }

        [HttpPost("bulk")]
        public async Task<IActionResult> CreateBulk([FromBody] List<CreateSeatRequest> requests)
        {
            var result = await _seatService.CreateSeatsAsync(requests);
            return Ok(result);
        }

        [HttpDelete("bulk")]
        public async Task<IActionResult> DeleteBulk([FromBody] DeleteSeatRequest request)
        {
            await _seatService.DeleteSeatsAsync(request);
            return NoContent();
        }







    }
}