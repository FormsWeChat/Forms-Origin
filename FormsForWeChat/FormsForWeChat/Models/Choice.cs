using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.OData.Builder;
using Microsoft.WindowsAzure.Storage.Table;

namespace FormsForWeChat.Models
{
    public class Choice
    {
        public string Id { get; set; }
        public string QuestionId { get; set; }
        public string FormId { get; set; }
        public int Order { get; set; }
        public string ShopId { get; set; }
        [Contained]
        [IgnoreProperty]
        public Shop Shop { get; set; }
    }
}