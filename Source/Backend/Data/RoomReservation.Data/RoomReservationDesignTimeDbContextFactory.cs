using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace RoomReservation.Data
{
    public class RoomReservationDesignTimeDbContextFactory : IDesignTimeDbContextFactory<RoomReservationDbContext>
    {
        public RoomReservationDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("RoomReservationDatabase");

            var dbContextBuilder = new DbContextOptionsBuilder<RoomReservationDbContext>();
            dbContextBuilder.UseSqlServer(connectionString);

            return new RoomReservationDbContext(dbContextBuilder.Options);
        }
    }
}
