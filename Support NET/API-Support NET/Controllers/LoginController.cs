using API_Support_NET.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;

namespace support_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class LoginController : Controller
    {
        private readonly _21IF4101HelpDeskSupportContext _context;
        public LoginController(_21IF4101HelpDeskSupportContext context)
        {
            _context = new _21IF4101HelpDeskSupportContext();
        }

        [HttpPost]
        public ActionResult Post(LoginData loginData)
        {
            SessionData sessionData = null;
            SupervisorModel superModel = null;

            superModel = _context.Supervisor.Where(superItem => superItem.Email == loginData.Email).
                Select(superItem => new SupervisorModel()
                {
                    Id_Supervisor = superItem.Id,
                    Pass = superItem.Pass
                }).FirstOrDefault<SupervisorModel>();

            if (superModel != null && superModel.Pass == loginData.Pass) //corregir con jwt
            {
                sessionData = new SessionData();
                sessionData.IdUser = superModel.Id_Supervisor;
                sessionData.Role = "USU";
                sessionData.Token = "";
                return Ok(JsonConvert.SerializeObject(sessionData));
            }
            SupporterModel suppModel = null;

            suppModel = _context.Supporter.Where(suppItem => suppItem.Email == loginData.Email).
                Select(suppItem => new SupporterModel()
                {
                    Id_Supporter = suppItem.Id,
                    Pass = suppItem.Pass
                }).FirstOrDefault<SupporterModel>();
            if (suppModel != null && suppModel.Pass == loginData.Pass) //corregir con jwt
            {
                sessionData = new SessionData();
                sessionData.IdUser = suppModel.Id_Supporter;
                sessionData.Role = "USO";
                sessionData.Token = "";
                return Ok(JsonConvert.SerializeObject(sessionData));
            }

            return NoContent();
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
