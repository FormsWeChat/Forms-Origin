using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using FormsForWeChat.Models;

namespace FormsForWeChat.Controllers
{
    public class QuestionsController : ODataController
    {
        private CloudTable QuestionTable = null;
        public QuestionsController() : base()
        {
            // Parse the connection string and return a reference to the storage account.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
                CloudConfigurationManager.GetSetting("StorageConnectionString"));

            // Create the FormTable client.
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

            // Retrieve a reference to the FormTable.
            QuestionTable = tableClient.GetTableReference("Questions");
        }

        [HttpPost]
        [ODataRoute("Forms({formId})/Questions")]
        public IHttpActionResult Post([FromODataUri] string formId, [FromBody] Question question)
        {
            question.Id = Guid.NewGuid().ToString();
            question.FormId = formId;

            // Create the TableOperation object that inserts the customer entity.
            TableOperation insertOperation = TableOperation.Insert(new TableEntityAdapter<Question>(question, formId, question.Id));

            // Execute the operation.
            QuestionTable.Execute(insertOperation);

            return Created(question);
        }
    }
}