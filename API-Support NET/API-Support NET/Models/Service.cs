// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

using System.Collections.Generic;

namespace API_Support_NET.Models
{
    public partial class Service
    {
        public Service()
        {
            Supporter = new HashSet<Supporter>();
        }


        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Supporter> Supporter { get; set; }
        public virtual ICollection<SupporterService> SupporterService { get; set; }
    }
}
