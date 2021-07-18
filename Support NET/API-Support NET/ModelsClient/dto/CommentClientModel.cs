using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API_Support_NET.Models
{
    public class CommentClientModel
    {

        public int id { set; get; }
        public int issueByReportNumber { set; get; }
        public string description { set; get; }
        public DateTime commentTime { set; get; }

        public CommentClientModel() { }


    }
}