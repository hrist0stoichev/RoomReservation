using System;

namespace RoomReservation.Common.Exceptions
{
    public class DynamicLinqException : Exception
    {
        public DynamicLinqException(string message)
            : base(message)
        {
        }

        public DynamicLinqException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}