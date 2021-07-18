using API_Support_NET.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;


namespace support_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class NoteController : Controller
    {
        private readonly _21IF4101HelpDeskSupportContext _context;
        public NoteController(_21IF4101HelpDeskSupportContext context)
        {
            _context = new _21IF4101HelpDeskSupportContext();
        }

        [HttpPost]
        public ActionResult Post(NoteModel note)
        {
            _context.Note.Add(new Note()
            {
                //Id = note.Id_Note,
                ReportNumberIssue = note.Report_Number,
                Description = note.Description,
                NoteTime = DateTime.Now
            });
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public ActionResult<IEnumerable<NoteModel>> GetAll()
        {
            var notes = JsonConvert.SerializeObject(_context.Note
                .Select(noteItem => new NoteModel()
                {
                    Id_Note = noteItem.Id,
                    Report_Number = noteItem.ReportNumberIssue,
                    Description = noteItem.Description,
                    Note_Time = noteItem.NoteTime

                }).ToList<NoteModel>());

            if (notes.Length == 0)
            {
                return NotFound();
            }
            return Ok(notes);

        }

        [Route("{id}")]
        [HttpGet]
        public ActionResult<NoteModel> GetById(int id)
        {
            var notes = JsonConvert.SerializeObject(_context.Note.Where(noteItem => noteItem.ReportNumberIssue == id).
                Select(noteItem => new NoteModel()
                {
                    Id_Note = noteItem.Id,
                    Report_Number = noteItem.ReportNumberIssue,
                    Description = noteItem.Description,
                    Note_Time = noteItem.NoteTime

                }).ToList<NoteModel>());

            if (notes == null)
            {
                return NotFound();
            }
            else
                return Ok(notes);

        }

        [Route("{id}")]
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid Note id");

            var note = _context.Note
                .Where(n => n.Id == id)
                .FirstOrDefault();

            _context.Entry(note).State = EntityState.Deleted;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        public ActionResult Put(Note note)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");


            var existingNote = _context.Note.Where(s => s.Id == note.Id)
                                                    .FirstOrDefault<Note>();
            if (existingNote != null)
            {
                existingNote.Description = note.Description;

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
