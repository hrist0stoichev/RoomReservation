namespace RoomReservation.Web.DataTransferModels.Room
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using AutoMapper;
    using RoomReservation.Common.AutoMapper;
    using RoomReservation.Data.Models;

    public class ApartmentResponseModel : IHaveCustomMappings
    {
        public string Number { get; set; }

        public string ApartmentRoomNumber { get; set; }

        public bool? IsMale { get; set; }

        public byte TotalCapacity { get; set; }

        public int TotalResidentsCount { get; set; }

        public List<Tuple<string, string>> Residents { get; set; }

        public void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<Room, ApartmentResponseModel>()
                .ForMember(arm => arm.TotalCapacity, opts => opts.MapFrom(r => (byte)(r.Capacity + r.ApartmentRoom.Capacity)))
                .ForMember(arm => arm.TotalResidentsCount, opts => opts.MapFrom(r => r.CurrentResidents.Count + r.ApartmentRoom.CurrentResidents.Count))
                .ForMember(arm => arm.Residents, opts => opts.MapFrom(r => r.CurrentResidents.Select(res => new Tuple<string, string>(res.Id, res.FirstName + " " + res.LastName)).Union(r.ApartmentRoom.CurrentResidents.Select(res => new Tuple<string, string>(res.Id, res.FirstName + " " + res.LastName)))));
        }
    }
}