using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using RoomReservation.Common.Exceptions;

namespace RoomReservation.Common
{
    public static class LINQExtension
    {
        public static IQueryable<TSource> Paginate<TSource>(this IQueryable<TSource> source, int skip, int top)
        {
            return source
                .Skip(Math.Max(skip, 0))
                .Take(Math.Min(Math.Max(top, 1), 50));
        }

        public static IQueryable<TSource> WhereDynamic<TSource>(this IQueryable<TSource> source, string filter)
        {
            if (!String.IsNullOrWhiteSpace(filter))
            {
                var separatedFilters = filter.Split(',', StringSplitOptions.RemoveEmptyEntries);

                foreach (var singleFilter in separatedFilters)
                {
                    var singleFilterParameters = singleFilter
                        .Split(':', StringSplitOptions.RemoveEmptyEntries)
                        .Where(s => !string.IsNullOrWhiteSpace(s))
                        .Select(s => s.Trim())
                        .ToArray();

                    if (singleFilterParameters.Length != 2)
                    {
                        throw new DynamicLinqException("You must provide a property and a value attribute!");
                    }

                    var property = singleFilterParameters[0];
                    var value = singleFilterParameters[1];

                    Type propertyType = null;
                    try
                    {
                        propertyType = source.Select(property).ElementType;
                    }
                    catch (Exception e)
                    {
                        throw new DynamicLinqException("Invalid property!", e);
                    }

                    string whereClause = null;
                    if (propertyType == typeof(string))
                    {
                        var valuesToContain = value.Split(' ', StringSplitOptions.RemoveEmptyEntries)
                            .Where(s => !string.IsNullOrWhiteSpace(s))
                            .Select(s => string.Format("{0}.Contains(\"{1}\")", property, s.Trim()))
                            .ToArray();

                        whereClause = string.Join(" && ", valuesToContain);
                    }
                    else if (propertyType == typeof(int) || propertyType == typeof(decimal) || propertyType == typeof(bool))
                    {
                        whereClause = string.Format("{0}.Equals({1})", singleFilterParameters[0], singleFilterParameters[1]);
                    }

                    try
                    {
                        source = source.Where(whereClause);
                    }
                    catch (Exception e)
                    {
                        throw new DynamicLinqException("Invalid filter argument!", e);
                    }
                }
            }

            return source;
        }

        public static IOrderedQueryable<TSource> OrderByDynamic<TSource>(this IQueryable<TSource> source, string orderBy)
        {
            if (!String.IsNullOrWhiteSpace(orderBy))
            {
                try
                {
                    source = source.OrderBy(orderBy);
                }
                catch (Exception e)
                {
                    throw new DynamicLinqException("Invalid orderBy argument!", e);
                }
            }

            return (IOrderedQueryable<TSource>) source;
        }
    }
}