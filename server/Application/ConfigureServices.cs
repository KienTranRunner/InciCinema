using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Interfaces.Movie;
using Application.Interfaces.Room;
using Application.Interfaces.Seat;
using Application.Interfaces.Showtime;
using Application.Interfaces.Ticket;
using Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IMovieService, MovieService>();
            services.AddScoped<IRoomService, RoomService>(); 
            services.AddScoped<ISeatService, SeatService>();
            services.AddScoped<IShowtimeService, ShowtimeService>();
            services.AddScoped<ITicketService, TicketService>();

            return services;

            
        }
    }
}