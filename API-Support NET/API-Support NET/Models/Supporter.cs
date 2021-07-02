using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API_Support_NET.Models
{
    public partial class Supporter
    {
        public Supporter()
        {
            Issue = new HashSet<Issue>();
            SupporterService = new HashSet<SupporterService>();
        }

        public int Id { get; set; }
        public int IdSupervisor { get; set; }
        public string Pass { get; set; }
        public string Name { get; set; }
        public string FirstSurname { get; set; }
        public string SecondSurname { get; set; }
        public string Email { get; set; }

        public virtual Supervisor Supervisor { get; set; }
        public virtual ICollection<Issue> Issue { get; set; }
        public virtual ICollection<SupporterService> SupporterService { get; set; }
    }
}
