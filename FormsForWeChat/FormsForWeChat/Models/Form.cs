using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FormsForWeChat.Models
{
    public class Form
    {
        public string Id { get; set; }

        public string OwnerId { get; set; }

        public string Title { get; set; }

        public IEnumerable<Question> Questions { get; set; }
        public IEnumerable<Response> Responses { get; set; }
    }
}