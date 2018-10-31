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
    public class ResponsesController : ODataController
    {
        private CloudTable ResponseTable = null;
        public ResponsesController() : base()
        {
            // Parse the connection string and return a reference to the storage account.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
                CloudConfigurationManager.GetSetting("StorageConnectionString"));

            // Create the FormTable client.
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

            // Retrieve a reference to the FormTable.
            ResponseTable = tableClient.GetTableReference("Responses");
        }

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
            return Json(result);
        }
    }
}