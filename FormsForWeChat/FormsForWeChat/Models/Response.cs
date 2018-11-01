using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FormsForWeChat.Models
{
    public class Response
    {
        public string Id { get; set; }

        public string FormId { get; set; }

        public string ResponderId { get; set; }

        // Todo: Add support for Dictionary<QuestionId, ChoiceId> to support multiple questions
        public string ChoiceId { get; set; }
    }
}