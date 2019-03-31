using System;
using Microsoft.Extensions.Options;
using Novell.Directory.Ldap;

namespace RoomReservation.Web.Api.Ldap
{
    public class LdapAuthenticationService
    {
        private const string DisplayNameAttribute = "displayName";
        private const string DescriptionAttribute = "description";

        public LdapAuthenticationService(IOptions<LdapConfig> config)
        {
            this.Config = config.Value;
            this.Connection = new LdapConnection();
        }

        private LdapConnection Connection { get; }

        private LdapConfig Config { get; }

        public LdapUser Login(string username, string password)
        {
            this.Connection.Connect(this.Config.Url, 0);
            this.Connection.Bind(this.Config.BindDn, this.Config.BindCredentials);

            var searchFilter = string.Format(this.Config.SearchFilter, username);
            var result = this.Connection.Search(
                this.Config.SearchBase,
                LdapConnection.SCOPE_SUB,
                searchFilter,
                new[] { DisplayNameAttribute, DescriptionAttribute },
                false
            );

            try
            {
                var user = result.next();
                this.Connection.Bind(user.DN, password);
                if (this.Connection.Bound)
                {
                    return new LdapUser
                    {
                        DisplayName = user.getAttribute(DisplayNameAttribute).StringValue,
                        Description = user.getAttribute(DescriptionAttribute).StringValue,
                        Role = this.Config.Admins.Contains(username) ? "Admin" : "Student"
                    };
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }
            finally
            {
                this.Connection.Disconnect();
            }
        }
    }
}