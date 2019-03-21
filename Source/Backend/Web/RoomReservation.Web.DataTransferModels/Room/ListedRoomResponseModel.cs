namespace RoomReservation.Web.DataTransferModels.Room
{
    using System.Collections.Generic;
    using System.Linq;
    using AutoMapper;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;

    public class ListedRoomResponseModel : IMapFrom<Room>, IHaveCustomMappings
    {
        public ushort Number { get; set; }

        public byte CurrentResidentsCount { get; set; }

        public IList<string> ResidentsNames { get; set; }

        public void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<Room, ListedRoomResponseModel>()
                .ForMember(lrrm => lrrm.ResidentsNames, opts => opts.MapFrom(r => r.Students.Select(s => s.FirstName + " " + s.LastName)));
        }
    }
}