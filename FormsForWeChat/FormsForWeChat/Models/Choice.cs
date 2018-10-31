using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FormsForWeChat.Models
{
    public class Choice
    {
        public string Id { get; set; }
        public string QuestionId { get; set; }
        public string FormId { get; set; }
        public int Order { get; set; }
        public string ShopId { get; set; }
        public Shop Shop { get; set; }
    }
}