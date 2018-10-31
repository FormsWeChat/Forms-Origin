using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using FormsForWeChat.Models;

namespace FormsForWeChat
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            var builder = new ODataConventionModelBuilder();
            builder.EntitySet<Form>("Forms");
            builder.EntitySet<Shop>("Shops");
            builder.EntitySet<User>("Users");
            builder.Action("SignIn").Parameter<string>("code");
            builder.EntityType<Response>().Collection
                .Function("Summary")
                .Returns<ResponseSummary>();
            config.MapODataServiceRoute(
                routeName: "ODataRoute",
                routePrefix: null,
                model: builder.GetEdmModel());

            // Azure Table configuration
            // Parse the connection string and return a reference to the storage account.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
                CloudConfigurationManager.GetSetting("StorageConnectionString"));

            // Create the FormTable client.
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

            // Retrieve a reference to the FormTable.
            var FormTable = tableClient.GetTableReference("Forms");
            var QuestionTable = tableClient.GetTableReference("Questions");
            var ChoiceTable = tableClient.GetTableReference("Choices");
            var ResponseTable = tableClient.GetTableReference("Responses");
            var ShopTable = tableClient.GetTableReference("Shops");
            var UserTable = tableClient.GetTableReference("Users");

            // Create the FormTable if it doesn't exist.
            FormTable.CreateIfNotExists();
            QuestionTable.CreateIfNotExists();
            ChoiceTable.CreateIfNotExists();
            ResponseTable.CreateIfNotExists();
            ShopTable.CreateIfNotExists();
            UserTable.CreateIfNotExists();
        }
    }
}
