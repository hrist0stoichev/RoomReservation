using Microsoft.EntityFrameworkCore;
using RoomReservation.Data.Models;

namespace RoomReservation.Data
{
    public class RoomReservationDbContext : DbContext
    {
        public RoomReservationDbContext(DbContextOptions<RoomReservationDbContext> options) : base(options)
        { }

        public DbSet<Student> Students { get; set; }

        public DbSet<Room> Rooms { get; set; }

        public DbSet<Invitation> Invitations { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Student>(student =>
            {
                student.HasOne(s => s.CurrentRoom)
                    .WithMany(r => r.Students)
                    .HasForeignKey(s => s.CurrentRoomNumber)
                    .IsRequired(false)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            builder.Entity<Room>(room =>
            {
                room.HasOne(r => r.ApartmentRoom)
                    .WithOne()
                    .HasForeignKey<Room>(r => r.ApartmentRoomNumber)
                    .IsRequired(false)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            builder.Entity<Invitation>(invitation =>
            {
                invitation.HasKey(i => new { i.ToStudentId, i.FromStudentId });

                invitation.HasOne(i => i.Room)
                    .WithMany(r => r.Invitations)
                    .HasForeignKey(r => r.RoomNumber)
                    .IsRequired(true)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
