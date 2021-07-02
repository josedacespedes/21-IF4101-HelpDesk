namespace API_Support_NET.Models.EntitiesModels
{
    public class ServiceModel
    {
        public ServiceModel(int id_Service, string name)
        {
            Id_Service = id_Service;
            Name = name;
        }
        public ServiceModel() { }

        public int Id_Service { set; get; }
        public string Name { set; get; }
    }
}
