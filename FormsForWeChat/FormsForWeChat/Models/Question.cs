using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FormsForWeChat.Models
{
    public class Question
    {
        public string Id { get; set; }

        public string FormId { get; set; }

        public string Description { get; set; }

        public int Order { get; set; }

        public IEnumerable<Choice> Choices { get; set; }
    }
}