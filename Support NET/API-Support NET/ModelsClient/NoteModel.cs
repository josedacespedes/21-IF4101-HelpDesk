using System;

namespace API_Support_NET.Models
{
    public class NoteModel
    {
        public NoteModel(int id_Note, int report_Number, string description, DateTime note_Time, string author)
        {
            Id_Note = id_Note;
            Report_Number = report_Number;
            Description = description;
            Note_Time = note_Time;
            Author = author;
        }
        public NoteModel() { }

        public int Id_Note { set; get; }
        public int Report_Number { set; get; }
        public string Description { set; get; }
        public DateTime Note_Time { set; get; }

        public string Author { get; set; }
    }
}
