using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Interfaces;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Server.Infrastructure
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfrastructureServices
            (this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        

            services.AddScoped<IMovieRepository, MovieRepository>();
            services.AddScoped<IRoomRepository, RoomRepository>();
            services.AddScoped<ISeatRepository, SeatRepository>();
            services.AddScoped<IShowtimeRepository, ShowtimeRepository>();
            services.AddScoped<ITicketRepository, TicketRepository>();



            return services;
        }
    }
}