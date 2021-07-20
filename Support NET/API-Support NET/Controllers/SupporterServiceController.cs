using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Support_NET.Models;

namespace API_Support_NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupporterServiceController : ControllerBase
    {
        private readonly _21IF4101HelpDeskSupportContext _context;

        public SupporterServiceController(_21IF4101HelpDeskSupportContext context)
        {
            _context = context;
        }

        // GET: api/SupporterService
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupporterService>>> GetSupporterService()
        {
            return await _context.SupporterService.ToListAsync();
        }

        // GET: api/SupporterService/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SupporterService>> GetSupporterService(int id)
        {
            var supporterService = await _context.SupporterService.FindAsync(id);

            if (supporterService == null)
            {
                return NotFound();
            }

            return supporterService;
        }

        // PUT: api/SupporterService/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupporterService(int id, SupporterService supporterService)
        {
            if (id != supporterService.IdSupporter)
            {
                return BadRequest();
            }

            _context.Entry(supporterService).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupporterServiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SupporterService
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SupporterService>> PostSupporterService(SupporterService supporterService)
        {
            _context.SupporterService.Add(supporterService);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SupporterServiceExists(supporterService.IdSupporter))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSupporterService", new { id = supporterService.IdSupporter }, supporterService);
        }

        // DELETE: api/SupporterService/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SupporterService>> DeleteSupporterService(int id)
        {
            var supporterService = await _context.SupporterService.FindAsync(id);
            if (supporterService == null)
            {
                return NotFound();
            }

            _context.SupporterService.Remove(supporterService);
            await _context.SaveChangesAsync();

            return supporterService;
        }

        private bool SupporterServiceExists(int id)
        {
            return _context.SupporterService.Any(e => e.IdSupporter == id);
        }
    }
}
