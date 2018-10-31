using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using FormsForWeChat.Models;

namespace FormsForWeChat.Controllers
{
    public class FormsController : ODataController
    {
        private CloudTable FormTable = null;
        private CloudTable ResponseTable = null;
        public FormsController() : base()
        {
            // Parse the connection string and return a reference to the storage account.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
                CloudConfigurationManager.GetSetting("StorageConnectionString"));

            // Create the FormTable client.
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

            // Retrieve a reference to the FormTable.
            FormTable = tableClient.GetTableReference("Forms");
            ResponseTable = tableClient.GetTableReference("Responses");
        }

        [HttpGet]
        [ODataRoute("Forms")]
        public IHttpActionResult Get()
        {
            // Construct the query operation for all customer entities where PartitionKey="Smith".
            TableQuery<TableEntityAdapter<Form>> query = new TableQuery<TableEntityAdapter<Form>>().Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "test"));

            return Ok(FormTable.ExecuteQuery(query).Select(result => result.OriginalEntity));

        }

        [HttpGet]
        [ODataRoute("Forms({formId})")]
        public IHttpActionResult Get([FromODataUri] string formId)
        {
            // Create a retrieve operation that takes a customer entity.
            TableOperation retrieveOperation = TableOperation.Retrieve<TableEntityAdapter<Form>>("test", formId);

            // Execute the retrieve operation.
            TableResult retrievedResult = FormTable.Execute(retrieveOperation);

            if (retrievedResult == null)
            {
                return NotFound();
            }

            return Ok(((TableEntityAdapter<Form>)retrievedResult.Result).OriginalEntity);

        }

        [HttpPost]
        [ODataRoute("Forms")]
        public IHttpActionResult Post([FromBody]Form form)
        {
            form.Id = Guid.NewGuid().ToString();
            // Create the TableOperation object that inserts the customer entity.
            TableOperation insertOperation = TableOperation.Insert(new TableEntityAdapter<Form>(form, form.OwnerId, form.Id));

            // Execute the operation.
            FormTable.Execute(insertOperation);

            return Created(form);
        }

        [HttpPatch]
        [ODataRoute("Forms({formId})")]
        public IHttpActionResult Patch(string formId, [FromBody] Delta<Form> delta)
        {
            return StatusCode(HttpStatusCode.NotImplemented);
        }

        [HttpDelete]
        [ODataRoute("Forms({formId})")]
        public IHttpActionResult Delete(string formId)
        {
            // Create a retrieve operation that expects a customer entity.
            TableOperation retrieveOperation = TableOperation.Retrieve<TableEntityAdapter<Form>>("test", formId);

            // Execute the operation.
            TableResult retrievedResult = FormTable.Execute(retrieveOperation);

            // Assign the result to a Form.
            TableEntityAdapter<Form> formAdapter = (TableEntityAdapter<Form>)retrievedResult.Result;

            // Create the Delete TableOperation.
            if (formAdapter != null)
            {
                TableOperation deleteOperation = TableOperation.Delete(formAdapter);

                // Execute the operation.
                FormTable.Execute(deleteOperation);

                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return NotFound();
            }
        }
    }
}