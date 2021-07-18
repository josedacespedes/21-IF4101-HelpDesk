using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API_Support_NET.Models
{
    public partial class Note
    {
        public int Id { get; set; }
        public int ReportNumberIssue { get; set; }
        public string Description { get; set; }
        public DateTime NoteTime { get; set; }

        public virtual Issue Issue { get; set; }
    }
}
