using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Showtime;

namespace Application.Interfaces.Showtime
{
    public interface IShowtimeService
    {
        Task<ShowtimeReponse> CreateAsync(CreatShowtimeRequest request);
        Task<IEnumerable<ShowtimeReponse>> GetAllAsync();
        Task<ShowtimeReponse> GetByIdAsync(int id);
        Task<ShowtimeReponse> UpdateAsync(int id, UpdateShowtimeRequest request);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<ShowtimeReponse>> GetByRoomIdAsync(int roomId);
        Task<IEnumerable<ShowtimeReponse>> GetByMovieIdAsync(int movieId);
        Task<IEnumerable<ShowtimeReponse>> GetByMovieIdWithRoomAsync(int movieId);

        Task<ShowtimeReponse> GetDetailsByShowtimeIdAsync(int showtimeId);

    }
}