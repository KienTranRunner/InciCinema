using Application.DTOs.Seat;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces.Seat
{
    public interface ISeatService
    {
        Task<IEnumerable<SeatResponse>> GetAllSeatsAsync();
        Task<SeatResponse> GetSeatByIdAsync(int id);
        Task<SeatResponse> CreateSeatAsync(CreateSeatRequest request);
        Task<bool> DeleteSeatAsync(int id);
        Task DeleteSeatsAsync(DeleteSeatRequest request);

        Task<IEnumerable<SeatResponse>> CreateSeatsAsync(List<CreateSeatRequest> requests);

        Task<IEnumerable<SeatResponse>> GetSeatsByRoomIdAsync(int roomId);

    }
}
