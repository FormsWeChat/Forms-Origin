using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.OData.Builder;
using Microsoft.WindowsAzure.Storage.Table;

namespace FormsForWeChat.Models
{
    public class Form
    {
        public string Id { get; set; }

        public string OwnerId { get; set; }

        public string Title { get; set; }

        [Contained]
        [IgnoreProperty]
        public ICollection<Question> Questions { get; set; }
        [Contained]
        [IgnoreProperty]
        public ICollection<Response> Responses { get; set; }

        public Form()
        {
            Questions = new List<Question>();
            Responses = new List<Response>();
        }
    }
}