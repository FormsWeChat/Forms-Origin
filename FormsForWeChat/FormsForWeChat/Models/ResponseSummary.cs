using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FormsForWeChat.Models
{
    public class ResponseSummaryItem
    {
        public string ShopTitle { get; set; }
        public int Count { get; set; }
        public List<string> ResponderAvatarUrls { get; set; }
    }

    public class ResponseSummary
    {
        public List<ResponseSummaryItem> Items = new List<ResponseSummaryItem>();
        public string WinnerTitle { get; set; }
        public int Total { get; set; }
    }
}