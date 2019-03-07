using Microsoft.EntityFrameworkCore;
using RoomReservation.Data.Models;

namespace RoomReservation.Data
{
    public class RoomReservationDbContext : DbContext
    {
        public RoomReservationDbContext(DbContextOptions<RoomReservationDbContext> options) : base(options)
        { }

        public DbSet<Resident> Residents { get; set; }

        public DbSet<Room> Rooms { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
