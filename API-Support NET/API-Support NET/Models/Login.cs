using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API_Support_NET.Models
{
    public partial class Login
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Rol { get; set; }

        public virtual Supervisor Supervisor { get; set; }
        public virtual Support Support { get; set; }
    }
}
