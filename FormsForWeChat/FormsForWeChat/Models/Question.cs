﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.OData.Builder;

namespace FormsForWeChat.Models
{
    public class Question
    {
        public string Id { get; set; }

        public string FormId { get; set; }

        public string Description { get; set; }

        public int Order { get; set; }

        [Contained]
        public ICollection<Choice> Choices { get; set; }

        public Question()
        {
            Choices = new List<Choice>();
        }
    }
}