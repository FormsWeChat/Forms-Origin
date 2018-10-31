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
    public class ShopsController : ODataController
    {
        private CloudTable ShopTable = null;
        public ShopsController() : base()
        {
            // Parse the connection string and return a reference to the storage account.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
                CloudConfigurationManager.GetSetting("StorageConnectionString"));

            // Create the FormTable client.
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

            // Retrieve a reference to the FormTable.
            ShopTable = tableClient.GetTableReference("Shops");
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops")]
        public IQueryable<Shop> Get()
        {
            TableQuery<TableEntityAdapter<Shop>> query = new TableQuery<TableEntityAdapter<Shop>>().Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "zgc"));

            return ShopTable.ExecuteQuery(query).Select(result => result.OriginalEntity).AsQueryable();

        }
    }
}