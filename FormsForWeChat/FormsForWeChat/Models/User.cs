
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FormsForWeChat.Models
{
    public class User
    {
        public string Id { get; set; }
        public string AvatarUrl { get; set; }
        public int SignInHash { get; set; }
    }
}