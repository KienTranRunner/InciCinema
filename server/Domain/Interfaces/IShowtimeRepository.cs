using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IShowtimeRepository : IRepository<Showtime>
    {
        Task<List<Showtime>> GetByRoomIdAsync(int roomId);

        Task<List<Showtime>> GetByMovieIdAsync(int movieId); 

        Task<List<Showtime>> GetByMovieIdWithRoomAsync(int movieId);
        Task<Showtime> GetDetailsByShowtimeIdAsync(int showtimeId);

        Task<List<Showtime>> GetAllWithDetailsAsync();

    }
}