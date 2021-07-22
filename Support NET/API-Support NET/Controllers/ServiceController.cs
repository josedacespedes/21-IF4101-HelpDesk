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

    public class ServiceController : Controller
    {

        private readonly _21IF4101HelpDeskSupportContext _context;
        public ServiceController(_21IF4101HelpDeskSupportContext context)
        {
            _context = new _21IF4101HelpDeskSupportContext();
        }

        [HttpPost]
        public ActionResult Post(ServiceModel service)
        {
            _context.Service.Add(new Service()
            {
                Id = service.Id_Service,
                Name = service.Name
            });
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public ActionResult<IEnumerable<ServiceModel>> GetAll()
        {
            var services = JsonConvert.SerializeObject(_context.Service
                .Select(serviceItem => new ServiceModel()
                {
                    Id_Service = serviceItem.Id,
                    Name = serviceItem.Name
                }).ToList<ServiceModel>());
            if (services.Length == 0)
            {
                return NotFound();
            }
            return Ok(services);
        }

        [Route("{id}")]
        [HttpGet]
        public ActionResult<ServiceModel> GetById(int id)
        {
            var service = JsonConvert.SerializeObject(_context.Service.Where(serviceItem => serviceItem.Id == id).
                Select(serviceItem => new ServiceModel()
                {
                    Id_Service = serviceItem.Id,
                    Name = serviceItem.Name


                }).FirstOrDefault<ServiceModel>());
            if (service == null)
            {
                return NotFound();
            }
            else
                return Ok(service);

        }

        [Route("{id}")]
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid Service id");

            var service = _context.Service
                .Where(s => s.Id == id)
                .FirstOrDefault();

            _context.Entry(service).State = EntityState.Deleted;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        public ActionResult Put(Service service)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            var existingService = _context.Service.Where(s => s.Id == service.Id)
                                                    .FirstOrDefault<Service>();

            if (existingService != null)
            {
                existingService.Name = service.Name;

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
