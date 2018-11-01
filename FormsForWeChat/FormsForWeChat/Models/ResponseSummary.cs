using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.OData.Builder;

namespace FormsForWeChat.Models
{
    public class ResponseSummaryItem
    {
        public string ShopTitle { get; set; }
        public int Count { get; set; }
        public ICollection<string> ResponderAvatarUrls { get; set; }
    }

    public class ResponseSummary
    {
        public string WinnerTitle { get; set; }
        public int Total { get; set; }
        [Contained]
        public ICollection<ResponseSummaryItem> Items { get; private set; }

        public ResponseSummary()
        {
            Items = new List<ResponseSummaryItem>();
        }
    }
}