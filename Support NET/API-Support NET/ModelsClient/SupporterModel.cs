using System.Collections.Generic;

namespace API_Support_NET.Models
{
    public class SupporterModel
    {


        public SupporterModel(int id_Supporter, int id_Supervisor, string pass, string name, string first_SurName, string second_Surname, string email, ICollection<SupporterService> supporterService)
        {
            Id_Supporter = id_Supporter;
            Id_Supervisor = id_Supervisor;
            Pass = pass;
            Name = name;
            First_SurName = first_SurName;
            Second_Surname = second_Surname;
            Email = email;
            Supporter_Service = supporterService;
        }

        public SupporterModel()
        {

        }

        public int Id_Supporter { set; get; }
        public int Id_Supervisor { set; get; }
        public string Pass { set; get; }
        public string Name { set; get; }
        public string First_SurName { set; get; }
        public string Second_Surname { set; get; }
        public string Email { set; get; }
        public virtual ICollection<SupporterService> Supporter_Service { get; set; }
    }
}
