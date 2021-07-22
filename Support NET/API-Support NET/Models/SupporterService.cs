using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API_Support_NET.Models
{
    public partial class SupporterService
    {
        public int IdSupporter { get; set; }
        public int IdService { get; set; }

        public virtual Service Service { get; set; }
        public virtual Supporter Supporter { get; set; }
    }
}
