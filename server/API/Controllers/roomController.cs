using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Room;
using Application.Interfaces.Room;
using Application.Interfaces.Seat;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class roomController : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly ISeatService _seatService;

        public roomController(IRoomService roomService, ISeatService seatService)
        {
            _roomService = roomService;
            _seatService = seatService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            var rooms = await _roomService.GetAllRoomAsync();
            return Ok(rooms);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var room = await _roomService.GetRoomByIdAsync(id);
            if (room == null) return NotFound();
            return Ok(room);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRoomRequest request)
        {
            var room = await _roomService.CreateRoomAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = room.RoomId }, room);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(int id, [FromBody] UpdateRoomRequest request)
        {
            try
            {
                await _roomService.UpdateRoomAsync(id, request);
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
                await _roomService.DeleteRoomAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

       


    }
}