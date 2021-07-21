using System;

namespace API_Support_NET.Models
{
    public class CommentClientModel
    {

        public int id { set; get; }
        public int issueByReportNumber { set; get; }
        public string description { set; get; }
        public string author { set; get; }
        public DateTime commentTime { set; get; }

        public CommentClientModel() { }


    }
}
