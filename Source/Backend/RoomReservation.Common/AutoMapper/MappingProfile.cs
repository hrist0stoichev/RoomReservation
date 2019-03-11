using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using AutoMapper;

namespace RoomReservation.Common.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            var dataTransferModelsAssemblie = Assembly.Load("RoomReservation.Web.DataTransferModels");
            var types = dataTransferModelsAssemblie.GetExportedTypes();

            LoadStandardMappings(types);
            LoadCustomMappings(types);
        }

        private void LoadStandardMappings(IEnumerable<Type> types)
        {
            var maps = types.SelectMany(t => t.GetInterfaces(), (t, i) => new { t, i })
                .Where(
                    type =>
                        type.i.IsGenericType && 
                        type.i.GetGenericTypeDefinition() == typeof(IMapFrom<>) &&
                        !type.t.IsAbstract && 
                        !type.t.IsInterface)
                .Select(type => new { Source = type.i.GetGenericArguments()[0], Destination = type.t });

            foreach (var map in maps)
            {
                CreateMap(map.Source, map.Destination);
                CreateMap(map.Destination, map.Source);
            }
        }

        private void LoadCustomMappings(IEnumerable<Type> types)
        {
            var maps = types.SelectMany(t => t.GetInterfaces(), (t, i) => new { t, i })
                .Where(
                    type =>
                        typeof(IHaveCustomMappings).IsAssignableFrom(type.t) && 
                        !type.t.IsAbstract &&
                        !type.t.IsInterface)
                .Select(type => (IHaveCustomMappings)Activator.CreateInstance(type.t));

            foreach (var map in maps)
            {
                map.CreateMappings(this);
            }
        }
    }
}