using Microsoft.EntityFrameworkCore;
using RoomReservation.Data.Models;

namespace RoomReservation.Data
{
    public class RoomReservationDbContext : DbContext
    {
        public DbSet<Resident> Residents { get; set; }

        public DbSet<Room> Rooms { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Resident>(resident =>
            {
                resident.Property(r => r.Id)
                    .ValueGeneratedNever();
            });

            builder.Entity<Room>(room =>
            {
                room.Property(r => r.Id)
                    .ValueGeneratedNever();
            });
        }
    }
}
