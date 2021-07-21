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

    public class SupporterController : Controller
    {
        private int[] values = new int[100];
        private readonly _21IF4101HelpDeskSupportContext _context;
        public SupporterController(_21IF4101HelpDeskSupportContext context)
        {
            _context = new _21IF4101HelpDeskSupportContext();
        }

        [HttpPost]
        public ActionResult Post(SupporterModel supp)
        {

            var existSupport = _context.Supporter.Where(s => s.Email == supp.Email).FirstOrDefault<Supporter>();
            if (existSupport != null)
            {
                return NoContent();
            }

            _context.Supporter.Add(new Supporter()
            {
                IdSupervisor = supp.Id_Supervisor,
                Pass = supp.Pass,
                Name = supp.Name,
                FirstSurname = supp.First_SurName,
                SecondSurname = supp.Second_Surname,
                Email = supp.Email,
                SupporterService = supp.Supporter_Service
            });

            //for (int index = 0; index <= supp.Supporter_Service.Count(); index++)
            //{
            //    _context.SupporterService.Add(new SupporterService()
            //    {
            //        IdSupporter = supp.Id_Supporter,
            //        IdService = values[index + 1]
            //    });
            //}

            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public ActionResult<IEnumerable<SupervisorModel>> GetAll()
        {
            var issues = JsonConvert.SerializeObject(_context.Supporter
                .Select(suppitem => new SupporterModel()
                {
                    Id_Supervisor = suppitem.IdSupervisor,

                    Id_Supporter = suppitem.Id,

                    Name = suppitem.Name,
                    First_SurName = suppitem.FirstSurname,
                    Second_Surname = suppitem.SecondSurname,
                    Email = suppitem.Email,
                }).ToList<SupporterModel>());
            if (issues.Length == 0)
            {
                return NotFound();
            }
            return Ok(issues);
        }

        [Route("{id}")]
        [HttpGet]
        public ActionResult<SupporterModel> GetById(int id)
        {
            var suppModel = JsonConvert.SerializeObject(_context.Supporter.Where(suppItem => suppItem.Id == id).
                Select(suppItem => new SupporterModel()
                {
                    Id_Supporter = suppItem.Id,
                    Id_Supervisor = suppItem.IdSupervisor,
                    Name = suppItem.Name,
                    First_SurName = suppItem.FirstSurname,
                    Second_Surname = suppItem.SecondSurname,
                    Email = suppItem.Email

                }).FirstOrDefault<SupporterModel>());
            if (suppModel == null)
            {
                return NotFound();
            }
            else
                return Ok(suppModel);

        }

        [Route("{id}")]
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid supporter id");

            var supporter = _context.Supporter
                .Where(s => s.Id == id)
                .FirstOrDefault();

            _context.Entry(supporter).State = EntityState.Deleted;
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        public ActionResult Put(Supporter supporter)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");


            var existSupporter = _context.Supporter.Where(s => s.Id == supporter.Id)
                                                    .FirstOrDefault<Supporter>();

            if (existSupporter != null)
            {
                existSupporter.Name = supporter.Name;
                existSupporter.FirstSurname = supporter.FirstSurname;
                existSupporter.SecondSurname = supporter.SecondSurname;
                existSupporter.Email = supporter.Email;

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
