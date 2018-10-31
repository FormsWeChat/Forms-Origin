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
    public class ChoicesController : ODataController
    {
        private CloudTable ChoiceTable = null;
        public ChoicesController() : base()
        {
            // Parse the connection string and return a reference to the storage account.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
                CloudConfigurationManager.GetSetting("StorageConnectionString"));

            // Create the FormTable client.
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

            // Retrieve a reference to the FormTable.
            ChoiceTable = tableClient.GetTableReference("Choices");
        }

        [HttpPost]
        [ODataRoute("Forms({formId})/Questions({questionId})/Choices")]
        public IHttpActionResult Post([FromODataUri] string formId, [FromODataUri] string questionId, [FromBody] Choice choice)
        {
            choice.Id = Guid.NewGuid().ToString();
            choice.FormId = formId;
            choice.QuestionId = questionId;

            // Create the TableOperation object that inserts the customer entity.
            TableOperation insertOperation = TableOperation.Insert(new TableEntityAdapter<Choice>(choice, questionId, choice.Id));

            // Execute the operation.
            ChoiceTable.Execute(insertOperation);

            return Created(choice);
        }
    }
}