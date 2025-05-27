using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class ShowtimeRepository : Repository<Showtime>, IShowtimeRepository
    {
        public ShowtimeRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}