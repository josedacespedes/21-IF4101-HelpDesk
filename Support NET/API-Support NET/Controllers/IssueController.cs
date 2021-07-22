

using API_Support_NET.Models;
using API_Support_NET.Models.apiClientApp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;


namespace support_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class IssueController : Controller
    {
        private readonly _21IF4101HelpDeskSupportContext _context;
        public IssueController(_21IF4101HelpDeskSupportContext context)
        {
            _context = new _21IF4101HelpDeskSupportContext();
        }

        [HttpPost]
        public ActionResult Post(IssueModel issue)
        {
            _context.Issue.Add(new Issue()
            {
                ReportNumber = issue.Report_Number,
                IdSupporter = null,
                Classification = "Ingresada",
                Status = "Ingresado",
                ReportTime = DateTime.Now,
                ResolutionComment = "Nuevo caso"
            });
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public ActionResult<IEnumerable<IssueModel>> GetAll()
        {
            var issues = JsonConvert.SerializeObject(_context.Issue
                .Select(issueItem => new IssueModel()
                {
                    Report_Number = issueItem.ReportNumber,
                    //Id_Supporter = (issueItem.Id_Supporter).Value,
                    Classification = issueItem.Classification,
                    Status = issueItem.Status,
                    Report_Time = issueItem.ReportTime,
                    Resolution_Comment = issueItem.ResolutionComment,
                }).OrderByDescending(x => x.Report_Time).ToList<IssueModel>());

            if (issues.Length == 0)
            {
                return NotFound();
            }
            return Ok(issues);
        }

        [Route("{id}")]
        [HttpGet]
        public ActionResult<IssueModel> GetById(int id)
        {
            var issue = JsonConvert.SerializeObject(_context.Issue.Where(issueItem => issueItem.ReportNumber == id).
                Select(issueItem => new IssueModel()
                {
                    Report_Number = issueItem.ReportNumber,
                    //Id_Supporter = issueItem.Id_Supporter.Value,
                    Classification = issueItem.Classification,
                    Status = issueItem.Status,
                    Report_Time = issueItem.ReportTime,
                    Resolution_Comment = issueItem.ResolutionComment


                }).FirstOrDefault<IssueModel>());
            if (issue == null)
            {
                return NotFound();
            }
            else
                return Ok(issue);

        }

        [Route("{id}")]
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid Issue id");

            var issue = _context.Issue
                .Where(s => s.ReportNumber == id)
                .FirstOrDefault();

            _context.Entry(issue).State = EntityState.Deleted;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        public ActionResult Put(Issue issue)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            var existingIssue = _context.Issue.Where(s => s.ReportNumber == issue.ReportNumber)
                                                    .FirstOrDefault<Issue>();

            if (existingIssue != null)
            {
                //existingIssue.Classification = issue.Classification;
                //existingIssue.Status = issue.Status;
                existingIssue.ResolutionComment = issue.ResolutionComment;
                //existingIssue.Report_Time = issue.Report_Time;
                _context.SaveChanges();

            }
            else
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet]
        [Route("findIssueBySuppId/{id}")]
        public ActionResult<IEnumerable<IssueModel>> GetAllBySupportId(int id)
        {
            //IList<IssueModel> issues = null;
            var issues = JsonConvert.SerializeObject(_context.Issue.Where(issueItem => issueItem.IdSupporter == id).
                Select(issueItem => new IssueModel()
                {
                    Report_Number = issueItem.ReportNumber,
                    Id_Supporter = issueItem.IdSupporter.Value,
                    Classification = issueItem.Classification,
                    Status = issueItem.Status,
                    Report_Time = issueItem.ReportTime,
                    Resolution_Comment = issueItem.ResolutionComment


                }).OrderByDescending(x => x.Report_Time).ToList<IssueModel>());
            if (issues.Length == 0)
            {
                return NotFound();
            }
            else
                return Ok(issues);

        }


        [HttpGet]
        [Route("findUserClientById/{id}")]
        public async Task<ActionResult<UserClientModel>> GetUserClientByIdAsync(int id)
        {
            string url = "http://localhost:8080/api/user/" + id;
            var client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return Json(response.Content.ReadAsAsync<UserClientModel>().Result);
        }


        [HttpGet]
        [Route("findIssueClient/{reportNumber}")]
        public async Task<ActionResult<IssueClientModel>> GetIssueClientByReportNumberAsync(int reportNumber)
        {
            string url = "http://localhost:8080/api/issue/" + reportNumber;
            var client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return Json(response.Content.ReadAsAsync<IssueClientModel>().Result);
        }

        [HttpGet]
        [Route("findCommentClientById/{id}")]
        public ActionResult GetCommentClientById(int id)
        {
            string url = "http://localhost:8080/api/comment/findAllByIssueReportNumber/";
            var httpClient = new HttpClient();
            var json = new System.Net.WebClient().DownloadString(url + id);
            dynamic m = JsonConvert.DeserializeObject(json);
            return Json(m);
        }

        [HttpPost]
        [Route("CommentClient")]
        public async Task<ActionResult<CommentClientModel>> PostCommentClientAsync(CommentClientModel comment)
        {
            comment.commentTime = DateTime.Now;
            string url = "http://localhost:8080/api/comment/";
            var client = new HttpClient();
            HttpResponseMessage response = await client.PostAsJsonAsync(url, comment);

            response.EnsureSuccessStatusCode();
            return Json(response.Content.ReadAsAsync<CommentClientModel>().Result);
        }

        [HttpPut]
        [Route("UpdateStatus")]
        public async Task<ActionResult> PutStatusAsync(UpdateIntStringClientModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");


            var existingIssue = _context.Issue.Where(s => s.ReportNumber == model.reportNumber)
                                                    .FirstOrDefault<Issue>();
            if (existingIssue != null)
            {
                string url = "http://localhost:8080/api/issue/updateStatus";
                var client = new HttpClient();
                HttpResponseMessage response = await client.PutAsJsonAsync(url, model);
                response.EnsureSuccessStatusCode();
                existingIssue.Status = model.val;
                _context.SaveChanges();
            }
            else
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPut]
        [Route("PutClassificationIssue/{reportNumber}")]
        public async Task<IActionResult> PutClassificationIssue(int reportNumber, IssueModel issue)
        {
            if (reportNumber != issue.Report_Number)
            {
                return BadRequest();
            }

            var existingIssue = _context.Issue.Where(s => s.ReportNumber == issue.Report_Number)
                                                    .FirstOrDefault<Issue>();

            if (existingIssue != null)
            {
                existingIssue.Classification = issue.Classification;

                _context.SaveChanges();
            }
            else
            {
                return NotFound();
            }
            return Ok();
        }


        //[Route("[action]")]
        //[HttpPut("{reportNumber}")]
        //public async Task<IActionResult> PutIssue(int reportNumber, String classification)
        //{
        //    if (reportNumber != issue.Report_Number)
        //    {
        //        return BadRequest();
        //    }

        //    var existingIssue = _context.Issue.Where(s => s.ReportNumber == reportNumber).FirstOrDefault<Issue>();

        //    if (existingIssue != null)
        //    {
        //        existingIssue.Classification = issue.Classification;

        //        _context.SaveChanges();
        //    }
        //    else
        //    {
        //        return NotFound();
        //    }
        //    return Ok();
        //}




        private bool IssueExists(int id)
        {
            return _context.Issue.Any(e => e.ReportNumber == id);
        }



        [HttpPut]
        [Route("UpdateSupportAssigned")]
        public async Task<ActionResult> PutSupportAssignedsAsync(UpdateSupportAssignedModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");


            var existingIssue = _context.Issue.Where(s => s.ReportNumber == model.Report_Number)
                                                    .FirstOrDefault<Issue>();
            if (existingIssue != null)
            {
                UpdateIntStringClientModel data = new UpdateIntStringClientModel();



                var supporter = _context.Supporter.Where(s => s.Id == model.Id_Supporter)

                    .FirstOrDefault<Supporter>();



                if (supporter != null)

                {

                    data.reportNumber = model.Report_Number;

                    data.val = supporter.Name + " " + supporter.FirstSurname + " " + supporter.SecondSurname;

                    string url = "http://localhost:8080/api/issue/updateSupporterAssigned";

                    var client = new HttpClient();

                    HttpResponseMessage response = await client.PutAsJsonAsync(url, data);

                    response.EnsureSuccessStatusCode();
                }

                else return NotFound();

                existingIssue.IdSupporter = model.Id_Supporter;
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
