using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API_Support_NET.Models
{
    public partial class Support
    {
        public Support()
        {
            Issue = new HashSet<Issue>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string FirstSurname { get; set; }
        public string SecondSurname { get; set; }
        public string Email { get; set; }
        public int IdSupervisor { get; set; }

        public virtual Login Login { get; set; }
        public virtual Supervisor Supervisor { get; set; }
        public virtual ICollection<Issue> Issue { get; set; }
    }
}
