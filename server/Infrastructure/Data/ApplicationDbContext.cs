using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Infrastructure.Indentity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<string>, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Showtime> Showtimes { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Movie
            modelBuilder.Entity<Movie>()
                .Property(m => m.Title)
                .IsRequired()
                .HasMaxLength(250);

            modelBuilder.Entity<Movie>()
                .Property(m => m.Director)
                .IsRequired()
                .HasMaxLength(200);

            modelBuilder.Entity<Movie>()
                .Property(m => m.Language)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Movie>()
                .Property(m => m.Genre)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<Movie>()
                .Property(m => m.Rating)
                .HasMaxLength(5);

            modelBuilder.Entity<Room>()
                .Property(r => r.RoomName)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Room>()
                .Property(r => r.SeatCount)
                .IsRequired();

            modelBuilder.Entity<Room>()
                .Property(r => r.RoomType)
                .HasMaxLength(50);

            modelBuilder.Entity<Seat>()
                .Property(s => s.SeatNumber)
                .IsRequired()
                .HasMaxLength(10);

            modelBuilder.Entity<Showtime>()
                .Property(st => st.StartTime)
                .IsRequired();

            modelBuilder.Entity<Showtime>()
                .Property(st => st.EndTime)
                .IsRequired();

            modelBuilder.Entity<Showtime>()
                .Property(st => st.Price)
                .IsRequired();

            // Ticket
            modelBuilder.Entity<Ticket>()
                .Property(t => t.Price)
                .HasColumnType("decimal(10,2)");

            modelBuilder.Entity<Ticket>()
                .Property(t => t.Status)
                .IsRequired()
                .HasMaxLength(20);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Seat)
                .WithMany()
                .HasForeignKey(t => t.SeatId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Showtime)
                .WithMany()
                .HasForeignKey(t => t.ShowTimeId)
                .OnDelete(DeleteBehavior.Cascade);

                modelBuilder.Entity<Ticket>()
    .HasOne(t => t.Showtime)
    .WithMany(st => st.Tickets) 
    .HasForeignKey(t => t.ShowTimeId)
    .OnDelete(DeleteBehavior.Cascade);



            modelBuilder.Entity<Ticket>()
                .HasOne<ApplicationUser>()
                .WithMany(u => u.Tickets)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict);



        }
    }
}