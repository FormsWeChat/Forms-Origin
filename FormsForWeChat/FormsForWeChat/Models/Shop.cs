using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FormsForWeChat.Models
{
    public class Shop
    {
        public string Id { get; set; }
        public string Address { get; set; }
        public int AveragePrice { get; set; }
        public double EnvScore { get; set; }
        public string ImageHref { get; set; }
        public double ServiceScore { get; set; }
        public string ShopHref { get; set; }
        public string ShopTitle { get; set; }
        public int StarNet { get; set; }
        public double TasteScore { get; set; }
        public int Distance { get; set; }
        public int CommentsNumber { get; set; }
    }
}