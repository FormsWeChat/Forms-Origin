using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.OData.Builder;

namespace FormsForWeChat.Models
{
    public class Form
    {
        public string Id { get; set; }

        public string OwnerId { get; set; }

        public string Title { get; set; }

        [Contained]
        public ICollection<Question> Questions { get; set; }
        [Contained]
        public ICollection<Response> Responses { get; set; }

        public Form()
        {
            Questions = new List<Question>();
            Responses = new List<Response>();
        }
    }
}