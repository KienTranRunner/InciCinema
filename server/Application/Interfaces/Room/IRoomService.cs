using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Room;
using Domain.Entities;

namespace Application.Interfaces.Room
{
    public interface IRoomService
    {
        Task<IEnumerable<RoomResponse>> GetAllRoomAsync();
        Task<RoomResponse> GetRoomByIdAsync(int id);
        Task<RoomResponse> CreateRoomAsync(CreateRoomRequest request);
        Task<bool> UpdateRoomAsync(int id, UpdateRoomRequest request);
        Task<bool> DeleteRoomAsync(int id);


    }
}