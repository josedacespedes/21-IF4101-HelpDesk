using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API_Support_NET.Models
{
    public partial class Service
    {
        public Service()
        {
            SupporterService = new HashSet<SupporterService>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<SupporterService> SupporterService { get; set; }
    }
}
