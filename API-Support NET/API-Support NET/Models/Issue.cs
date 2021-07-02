using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API_Support_NET.Models
{
    public partial class Issue
    {
        public Issue()
        {
            Note = new HashSet<Note>();
        }

        public int ReportNumber { get; set; }
        public int? IdSupporter { get; set; }
        public string Classification { get; set; }
        public string Status { get; set; }
        public DateTime ReportTime { get; set; }
        public string ResolutionComment { get; set; }

        public virtual Supporter Supporter { get; set; }
        public virtual ICollection<Note> Note { get; set; }
    }
}
