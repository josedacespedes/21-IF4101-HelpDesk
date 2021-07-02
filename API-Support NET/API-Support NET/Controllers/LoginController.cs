using API_Support_NET.Models;
using API_Support_NET.Models.EntitiesModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace API_Support_NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly _21IF4101HelpDeskSupportContext _context;

        public LoginController(_21IF4101HelpDeskSupportContext context)
        {
            _context = context;
        }

        [EnableCors("GetAllPolicy")]
        // POST: api/Login
        [HttpPost]
        public async Task<ActionResult<SessionData>> PostLogin(LoginData loginData)
        {
            SupervisorModel supervisor = null;
            SupporterModel support = null;
            SessionData sessionData = null;

            //SESSION SUPERVISOR
            using (var context = new _21IF4101HelpDeskSupportContext())
            {
                supervisor = context.Supervisor.Where(superItem => superItem.Email == loginData.Email).
                    Select(superItem => new SupervisorModel()
                    {
                        Id_Supervisor = superItem.Id,
                        Pass = superItem.Pass
                    }).FirstOrDefault<SupervisorModel>();

            }

            if (supervisor != null && supervisor.Pass == loginData.Pass)
            {
                sessionData = new SessionData();
                sessionData.IdUser = supervisor.Id_Supervisor;
                sessionData.Role = "USU";
                sessionData.Token = "";
                return Json(sessionData);
            }

            //SESSION SUPPORT
            using (var context = new _21IF4101HelpDeskSupportContext())
            {
                support = context.Supporter.Where(suppItem => suppItem.Email == loginData.Email).
                    Select(suppItem => new SupporterModel()
                    {
                        Id_Supporter = suppItem.Id,
                        Pass = suppItem.Pass
                    }).FirstOrDefault<SupporterModel>();
            }

            if (support != null && support.Pass == loginData.Pass)
            {
                sessionData = new SessionData();
                sessionData.IdUser = support.Id_Supporter;
                sessionData.Role = "USO";
                sessionData.Token = "";
                return Json(sessionData);
            }

            //No esta registrado
            return sessionData;
        }
    }
    public class LoginData
    {
        public string Email { set; get; }
        public string Pass { set; get; }
    }

    public class SessionData
    {
        public int IdUser { set; get; }
        public string Token { set; get; }
        public string Role { set; get; }
    }
}
