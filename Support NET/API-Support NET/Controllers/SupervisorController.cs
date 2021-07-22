using API_Support_NET.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace support_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class SupervisorController : Controller
    {

        private readonly _21IF4101HelpDeskSupportContext _context;
        public SupervisorController(_21IF4101HelpDeskSupportContext context)
        {
            _context = new _21IF4101HelpDeskSupportContext();
        }

        [HttpPost]
        public ActionResult Post(SupervisorModel sup)
        {
            var existSupervisor = _context.Supervisor.Where(s => s.Email == sup.Email).FirstOrDefault<Supervisor>();
            if (existSupervisor != null)
            {
                return NoContent();
            }

            _context.Supervisor.Add(new Supervisor()
            {
                //Id = sup.Id_Supervisor,
                Pass = sup.Pass,
                Name = sup.Name,
                FirstSurname = sup.First_surname,
                SecondSurname = sup.Second_Surname,
                Email = sup.Email
            });
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public ActionResult<IEnumerable<SupervisorModel>> GetAll()
        {
            var supports = JsonConvert.SerializeObject(_context.Supervisor
                .Select(supItem => new SupervisorModel()
                {
                    Id_Supervisor = supItem.Id,
                    Name = supItem.Name,
                    First_surname = supItem.FirstSurname,
                    Second_Surname = supItem.SecondSurname,
                    Email = supItem.Email,
                }).ToList<SupervisorModel>());
            if (supports.Length == 0)
            {
                return NotFound();
            }
            return Ok(supports);
        }

        [Route("{id}")]
        [HttpGet]
        public ActionResult<SupervisorModel> GetById(int id)
        {
            var superModel = JsonConvert.SerializeObject(_context.Supervisor.Where(superItem => superItem.Id == id).
                Select(superItem => new SupervisorModel()
                {
                    Id_Supervisor = superItem.Id,
                    Name = superItem.Name,
                    First_surname = superItem.FirstSurname,
                    Second_Surname = superItem.SecondSurname,
                    Email = superItem.Email

                }).FirstOrDefault<SupervisorModel>());
            if (superModel == null)
            {
                return NotFound();
            }
            else
                return Ok(superModel);
        }

        [Route("{id}")]
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid Supervisor id");


            var supervisor = _context.Supervisor
                .Where(s => s.Id == id)
                .FirstOrDefault();

            _context.Entry(supervisor).State = EntityState.Deleted;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        public ActionResult Put(Supervisor supervisor)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            var existingSupervisor = _context.Supervisor.Where(s => s.Id == supervisor.Id)
                                                    .FirstOrDefault<Supervisor>();

            if (existingSupervisor != null)
            {
                existingSupervisor.Name = supervisor.Name;
                existingSupervisor.FirstSurname = supervisor.FirstSurname;
                existingSupervisor.SecondSurname = supervisor.SecondSurname;
                existingSupervisor.Email = supervisor.Email;

                _context.SaveChanges();
            }
            else
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
