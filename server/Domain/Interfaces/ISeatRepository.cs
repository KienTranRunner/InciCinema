using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ISeatRepository : IRepository<Seat>
    {
        Task AddRangeAsync(IEnumerable<Seat> seats);
        Task<List<Seat>> GetByRoomIdAsync(int roomId);

        Task<List<Seat>> GetByRoomIdAndSeatNumbersAsync(int roomId, List<string> seatNumbers);
        void RemoveRange(IEnumerable<Seat> seats);


    }
}