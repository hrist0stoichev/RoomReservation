using System.Collections.Generic;

namespace RoomReservation.Web.Api.Ldap
{
    public class LdapConfig
    {
        public string Url { get; set; }
        public string BindDn { get; set; }
        public string BindCredentials { get; set; }
        public string SearchBase { get; set; }
        public string SearchFilter { get; set; }
        public List<string> Admins { get; set; }
    }
}
