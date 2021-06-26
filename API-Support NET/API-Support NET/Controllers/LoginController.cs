using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Support_NET.Models;
using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cors;

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
        public async Task<ActionResult<SessionData>> PostLogin(Login login)
        {
            Supervisor supervisor = null;
            Support support = null;
            SessionData sessionData = null;
            Login loginBD = null;

            //SESSION SUPERVISOR
            using (var context = new _21IF4101HelpDeskSupportContext())
            {
                supervisor = context.Supervisor.Where(superItem => superItem.Email == login.Email).
                    Select(superItem => new Supervisor()
                    {
                        Id = superItem.Id
                    }).FirstOrDefault<Supervisor>();

                loginBD = context.Login.Where(logItem => logItem.Email == login.Email).
                    Select(logItem => new Login()
                    {
                        Password = logItem.Password
                    }).FirstOrDefault<Login>();
            }

            if (supervisor != null && loginBD.Password == login.Password)
            {
                sessionData = new SessionData();
                sessionData.IdUser = supervisor.Id;
                sessionData.Role = "USU";
                sessionData.Token = "";
                return Json(sessionData);
            }

            //SESSION SUPPORT
            using (var context = new _21IF4101HelpDeskSupportContext())
            {
                support = context.Support.Where(suppItem => suppItem.Email == login.Email).
                    Select(suppItem => new Support()
                    {
                        Id = suppItem.Id
                    }).FirstOrDefault<Support>();

                loginBD = context.Login.Where(logItem => logItem.Email == login.Email).
                    Select(logItem => new Login()
                    {
                        Password = logItem.Password
                    }).FirstOrDefault<Login>();
            }

            if (support != null && loginBD.Password == login.Password)
            {
                sessionData = new SessionData();
                sessionData.IdUser = support.Id;
                sessionData.Role = "USO";
                sessionData.Token = "";
                return Json(sessionData);
            }

            /*TODO PostLogin SpringBoot*/

            //No esta registrado
            return sessionData;
        }
    }

    public class SessionData
    {
        public int IdUser { set; get; }
        public string Token { set; get; }
        public string Role { set; get; }
    }
}
