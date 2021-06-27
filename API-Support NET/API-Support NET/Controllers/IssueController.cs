using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Support_NET.Models;
using Microsoft.AspNetCore.Cors;
using API_Support_NET.ModelsClient;

namespace API_Support_NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssueController : Controller
    {
        private readonly _21IF4101HelpDeskSupportContext _context;

        public IssueController(_21IF4101HelpDeskSupportContext context)
        {
            _context = context;
        }

        // GET: api/Issue
        [EnableCors("GetAllPolicy")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Issue>>> GetAll()
        {
            IList<Issue> issues = null;
            issues = await _context.Issue.Select(issueItem => new Issue()
            {
                ReportNumber = issueItem.ReportNumber,
                IdSupport = issueItem.IdSupport,
                Classification = issueItem.Classification,
                Status = issueItem.Status,
                ReportTime = issueItem.ReportTime,
                ResolutionComment = issueItem.ResolutionComment
            }).OrderByDescending(x => x.ReportTime).ToListAsync<Issue>();

            if (issues.Count == 0)
            {
                return null;
            }
            return Json(issues);
        }

        [EnableCors("GetAllPolicy")]
        [HttpGet("GetAllBySupportId/{id}")]
        public async Task<ActionResult<IEnumerable<Issue>>> GetAllBySupportId(int id)
        {
            IList<Issue> issues = null;
            issues = await _context.Issue.Where(issueItem => issueItem.IdSupport == id).Select(issueItem => new Issue()
            {
                ReportNumber = issueItem.ReportNumber,
                IdSupport = issueItem.IdSupport,
                Classification = issueItem.Classification,
                Status = issueItem.Status,
                ReportTime = issueItem.ReportTime,
                ResolutionComment = issueItem.ResolutionComment
            }).OrderByDescending(x => x.ReportNumber).ToListAsync<Issue>();

            if (issues.Count == 0)
            {
                return null;
            }
            return Json(issues);
        }

        // GET: api/Issue/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Issue>> GetIssue(int id)
        {
            var issue = await _context.Issue.FindAsync(id);

            if (issue == null)
            {
                return NotFound();
            }

            return issue;
        }

        // PUT: api/Issue/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIssue(int id, Issue issue)
        {
            if (id != issue.ReportNumber)
            {
                return BadRequest();
            }

            _context.Entry(issue).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IssueExists(id))
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

        // POST: api/Issue
        [HttpPost]
        public async Task<ActionResult<Issue>> PostIssue(Issue issue)
        {
            _context.Issue.Add(issue);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (IssueExists(issue.ReportNumber))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetIssue", new { id = issue.ReportNumber }, issue);
        }

        private bool IssueExists(int id)
        {
            return _context.Issue.Any(e => e.ReportNumber == id);
        }

        [EnableCors("GetAllPolicy")]
        [HttpPut]
        [Route("[action]")]
        public async Task<ActionResult> PutUpdateSupportAssigned(UpdateSupportAssignedModel model)
        {
            using (var context = new _21IF4101HelpDeskSupportContext())
            {
                var existingIssue = context.Issue.Where(s => s.ReportNumber == model.reportNumber)
                                                        .FirstOrDefault<Issue>();
                if (existingIssue != null)
                {
                    var support = context.Support.Where(s => s.Id == model.idSupport)
                                                            .FirstOrDefault<Support>();
                    if (support != null)
                    {
                        /*TODO PutUpdateSupportAssigned SpringBoot*/

                        /* EXAMPLE
                        string url = "http://localhost:8080/api/issue/updateSupporterAssigned";
                        var client = new HttpClient();
                        HttpResponseMessage response = await client.PutAsJsonAsync(url, data);
                        response.EnsureSuccessStatusCode();
                        */
                    }
                    else return null;

                    existingIssue.IdSupport = model.idSupport;
                    await context.SaveChangesAsync();
                }
                else
                {
                    return null;
                }
            }
            return Ok();
        }
    }
}
