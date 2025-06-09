using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Room;
using Application.Interfaces.Room;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepository;

        public RoomService(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }
        public async Task<RoomResponse> CreateRoomAsync(CreateRoomRequest request)
        {
            var room = new Room
            {
                RoomName = request.RoomName,
                RoomType = request.RoomType,
                SeatCount = request.SeatCount,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _roomRepository.AddAsync(room);
            await _roomRepository.SaveChangesAsync();

            return MapToResponse(room);
        }

        public async Task<bool> DeleteRoomAsync(int id)
        {
            var room = await _roomRepository.GetByIdAsync(id);
            if (room == null) return false;

            _roomRepository.Delete(room);
            await _roomRepository.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<RoomResponse>> GetAllRoomAsync()
        {
            var room = await _roomRepository.GetAllAsync();
            return room.Select(MapToResponse);
        }

        public async Task<RoomResponse> GetRoomByIdAsync(int id)
        {
            var room = await _roomRepository.GetByIdAsync(id);
            return room == null ? null : MapToResponse(room);
        }

        public async Task<bool> UpdateRoomAsync(int id, UpdateRoomRequest request)
        {
             var room = await _roomRepository.GetByIdAsync(id);
            if (room == null) return false;

            room.RoomName = request.RoomName;
            room.RoomType = request.RoomType;
            room.SeatCount = request.SeatCount;
          

            _roomRepository.Update(room);
            await _roomRepository.SaveChangesAsync();

            return true;
        }

        

        private RoomResponse MapToResponse(Room room)
        {
            return new RoomResponse
            {
                RoomId = room.RoomId,
                RoomName = room.RoomName,
                RoomType = room.RoomType,
                SeatCount = room.SeatCount,
            };
        }
    }
}