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
        private CloudTable QuestionTable = null;
        private CloudTable ChoiceTable = null;
        private CloudTable ResponseTable = null;
        private CloudTable ShopTable = null;

        public FormsController() : base()
        {
            // Parse the connection string and return a reference to the storage account.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
                CloudConfigurationManager.GetSetting("StorageConnectionString"));

            // Create the FormTable client.
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

            // Retrieve a reference to the FormTable.
            FormTable = tableClient.GetTableReference("Forms");
            QuestionTable = tableClient.GetTableReference("Questions");
            ChoiceTable = tableClient.GetTableReference("Choices");
            ResponseTable = tableClient.GetTableReference("Responses");
            ShopTable = tableClient.GetTableReference("Shops");
        }

        #region Forms Operations

        [HttpGet]
        [ODataRoute("Forms")]
        public IHttpActionResult Get()
        {
            // Construct the query operation for all customer entities where PartitionKey="Smith".
            TableQuery<TableEntityAdapter<Form>> query = new TableQuery<TableEntityAdapter<Form>>().Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "test"));

            return Ok(FormTable.ExecuteQuery(query).Select(result => result.OriginalEntity));

        }

        [HttpGet]
        [EnableQuery(MaxExpansionDepth = 3)]
        [ODataRoute("Forms({formId})")]
        public IHttpActionResult Get([FromODataUri] string formId)
        {
            // Create a retrieve operation that takes a customer entity.
            TableOperation retrieveOperation = TableOperation.Retrieve<TableEntityAdapter<Form>>("test", formId);

            // Execute the retrieve operation.
            TableResult retrievedResult = FormTable.Execute(retrieveOperation);

            if (retrievedResult?.Result == null)
            {
                return NotFound();
            }

            var form = ((TableEntityAdapter<Form>)retrievedResult.Result).OriginalEntity;

            TableQuery<TableEntityAdapter<Question>> queryQuestions = new TableQuery<TableEntityAdapter<Question>>().Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, formId));
            var questions = QuestionTable.ExecuteQuery(queryQuestions).Select(result => result.OriginalEntity);
            if (questions != null)
            {
                TableQuery<TableEntityAdapter<Choice>> queryChoices = new TableQuery<TableEntityAdapter<Choice>>().Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, formId));
                var choices = ChoiceTable.ExecuteQuery(queryChoices).Select(result => result.OriginalEntity);
                foreach (var question in questions)
                {
                    question.Choices = choices?.Where(choice => choice.QuestionId == question.Id).ToList();
                    foreach (var choice in question.Choices)
                    {
                        TableOperation shopRetrieveOperation = TableOperation.Retrieve<TableEntityAdapter<Shop>>("zgc", choice.ShopId);
                        choice.Shop = ((TableEntityAdapter<Shop>)ShopTable.Execute(shopRetrieveOperation).Result)?.OriginalEntity;
                    }
                    form.Questions.Add(question);
                }
            }

            return Ok(form);

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

        #endregion Forms Operations

        #region Questions Operations

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

        #endregion Questions Operations

        #region Choices Operations

        [HttpPost]
        [ODataRoute("Forms({formId})/Questions({questionId})/Choices")]
        public IHttpActionResult Post([FromODataUri] string formId, [FromODataUri] string questionId, [FromBody] Choice choice)
        {
            choice.Id = Guid.NewGuid().ToString();
            choice.FormId = formId;
            choice.QuestionId = questionId;

            // Create the TableOperation object that inserts the customer entity.
            TableOperation insertOperation = TableOperation.Insert(new TableEntityAdapter<Choice>(choice, formId, choice.Id));

            // Execute the operation.
            ChoiceTable.Execute(insertOperation);

            return Created(choice);
        }

        #endregion Choices Operations

        #region Responses Operations

        [HttpPost]
        [ODataRoute("Forms({formId})/Responses")]
        public IHttpActionResult Post([FromODataUri] string formId, [FromBody] Response response)
        {
            response.Id = Guid.NewGuid().ToString();
            response.FormId = formId;

            // Create the TableOperation object that inserts the customer entity.
            TableOperation insertOperation = TableOperation.Insert(new TableEntityAdapter<Response>(response, formId, response.Id));

            // Execute the operation.
            ResponseTable.Execute(insertOperation);

            return Created(response);
        }

        [HttpGet]
        [ODataRoute("Forms({formId})/Responses/Summary")]
        public IHttpActionResult Summary([FromODataUri] string formId)
        {
            var result = new ResponseSummary();
            var item1 = new ResponseSummaryItem()
            {
                ShopTitle = "南京大排档",
                Count = 4,
                ResponderAvatarUrls = new List<string>() { "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg", "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg", "http://pic1.win4000.com/wallpaper/8/5260ceb4636ec.jpg?down" }
            };
            var item2 = new ResponseSummaryItem()
            {
                ShopTitle = "那家小馆",
                Count = 3,
                ResponderAvatarUrls = new List<string>() { "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg", "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg", "http://pic1.win4000.com/wallpaper/8/5260ceb4636ec.jpg?down" }
            };
            var item3 = new ResponseSummaryItem()
            {
                ShopTitle = "将太无二",
                Count = 3,
                ResponderAvatarUrls = new List<string>() { "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg", "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg", "http://pic1.win4000.com/wallpaper/8/5260ceb4636ec.jpg?down" }
            };
            result.Items.Add(item1);
            result.Items.Add(item2);
            result.Items.Add(item3);
            result.WinnerTitle = "南京大排档";
            result.Total = 10;
            //return Json(result);
            return Ok(result);
        }

        #endregion Responses Operations
    }
}