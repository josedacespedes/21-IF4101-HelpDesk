using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API_Support_NET.Models
{
    public partial class Supervisor
    {
        public Supervisor()
        {
            Supporter = new HashSet<Supporter>();
        }

        public int Id { get; set; }
        public string Pass { get; set; }
        public string Name { get; set; }
        public string FirstSurname { get; set; }
        public string SecondSurname { get; set; }
        public string Email { get; set; }

        public virtual ICollection<Supporter> Supporter { get; set; }
    }
}
