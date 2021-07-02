using API_Support_NET.Models;
using API_Support_NET.Models.EntitiesModels;
using API_Support_NET.ModelsClient;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            IList<IssueModel> issues = null;
            using (var context = new _21IF4101HelpDeskSupportContext())
            {
                issues = context.Issue
                    .Select(issueItem => new IssueModel()
                    {
                        Report_Number = issueItem.ReportNumber,
                        Classification = issueItem.Classification,
                        Status = issueItem.Status,
                        Report_Time = issueItem.ReportTime,
                        Resolution_Comment = issueItem.ResolutionComment,
                    }).OrderByDescending(x => x.Report_Time).ToList<IssueModel>();
            }
            if (issues.Count == 0)
            {
                return null;
            }
            return Json(issues);
        }

        [EnableCors("GetAllPolicy")]
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<IEnumerable<Issue>>> GetById(int id)
        {
            IssueModel issue = null;
            using (var context = new _21IF4101HelpDeskSupportContext())
            {

                issue = context.Issue.Where(issueItem => issueItem.ReportNumber == id).
                    Select(issueItem => new IssueModel()
                    {
                        Report_Number = issueItem.ReportNumber,
                        Classification = issueItem.Classification,
                        Status = issueItem.Status,
                        Report_Time = issueItem.ReportTime,
                        Resolution_Comment = issueItem.ResolutionComment

                    }).FirstOrDefault<IssueModel>();
            }
            if (issue == null)
            {
                return null;
            }
            return Json(issue);
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

        [HttpPost]
        public async Task<ActionResult<Issue>> Post(IssueModel issue)
        {
            _context.Issue.Add(new Issue()
            {
                ReportNumber = issue.Report_Number,
                IdSupporter = null,
                Classification = "Media",
                Status = "Ingresado",
                ReportTime = DateTime.Now,
                ResolutionComment = "Nuevo caso"
            });
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (IssueExists(issue.Report_Number))
                {
                    return null;
                }
            }
            return Ok();
        }

        private bool IssueExists(int id)
        {
            return _context.Issue.Any(e => e.ReportNumber == id);
        }

        [EnableCors("GetAllPolicy")]
        [HttpPut]
        [Route("[action]")]
        public async Task<ActionResult> PutSupportAssignedsAsync(UpdateSupportAssignedModel model)
        {
            using (var context = new _21IF4101HelpDeskSupportContext())
            {
                var existingIssue = context.Issue.Where(s => s.ReportNumber == model.Report_Number)
                                                        .FirstOrDefault<Issue>();
                if (existingIssue != null)
                {
                    UpdateIntStringClientModel data = new UpdateIntStringClientModel();

                    var supporter = context.Supporter.Where(s => s.Id == model.Id_Supporter)
                    .FirstOrDefault<Supporter>();
                    if (supporter != null)
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

                    existingIssue.IdSupporter = model.Id_Supporter;
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
