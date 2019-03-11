using AutoMapper;

namespace RoomReservation.Common.AutoMapper
{
    public interface IHaveCustomMappings
    {
        void CreateMappings(Profile configuration);
    }
}