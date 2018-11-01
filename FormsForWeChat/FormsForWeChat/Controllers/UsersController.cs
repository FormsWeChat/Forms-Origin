using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
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
    public class UsersController : ODataController
    {
        [DataContract]
        internal class SignInResult
        {
            [DataMember(Name = "openid")]
            public string OpenId { get; set; }

            [DataMember(Name = "session_key")]
            public string SessionKey { get; set; }

            [DataMember(Name = "unionid")]
            public string UnionId { get; set; }

            [DataMember(Name = "errcode")]
            public int ErrorCode { get; set; }

            [DataMember(Name = "errmsg")]
            public string ErrorMsg { get; set; }

            public bool Success { get { return ErrorCode == 0; } }
        }
        private static HttpClient client = new HttpClient();
        private CloudTable UserTable = null;

        public UsersController() : base()
        {
            // Parse the connection string and return a reference to the storage account.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
                CloudConfigurationManager.GetSetting("StorageConnectionString"));

            // Create the FormTable client.
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

            // Retrieve a reference to the UserTable.
            UserTable = tableClient.GetTableReference("Users");
        }

        [HttpPost]
        [ODataRoute("SignIn")]
        public async Task<IHttpActionResult> SignIn(ODataActionParameters parameters)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            string code = (string)parameters["code"];

            HttpResponseMessage response = await client.GetAsync($"https://api.weixin.qq.com/sns/jscode2session?appid={ConfigurationManager.AppSettings["wxAppId"]}&secret={ConfigurationManager.AppSettings["wxAppSecret"]}&js_code={code}&grant_type=authorization_code");
            if (response.IsSuccessStatusCode)
            {
                var stream = await response.Content.ReadAsStreamAsync();
                var serializer = new DataContractJsonSerializer(typeof(SignInResult));
                var result = (SignInResult)serializer.ReadObject(stream);
                if (result.Success)
                {
                    TableOperation retrieveOperation = TableOperation.Retrieve<TableEntityAdapter<User>>("User", result.OpenId);
                    TableResult retrievedResult = UserTable.Execute(retrieveOperation);
                    TableEntityAdapter<User> userEntity = (TableEntityAdapter<User>)retrievedResult.Result;

                    if (userEntity != null)
                    {
                        userEntity.OriginalEntity.SignInHash = result.SessionKey.GetHashCode();
                        TableOperation updateOperation = TableOperation.Replace(userEntity);
                        UserTable.Execute(updateOperation);
                    }
                    else
                    {
                        User user = new User
                        {
                            Id = result.OpenId,
                            SignInHash = result.SessionKey.GetHashCode()
                        };
                        userEntity = new TableEntityAdapter<User>(user, "User", user.Id);
                        TableOperation insertOperation = TableOperation.Insert(userEntity);
                        UserTable.Execute(insertOperation);
                    }

                    return Json(userEntity.OriginalEntity);
                }
                else
                {
                    return BadRequest(result.ErrorMsg);
                }
            }
            return BadRequest();
        }

        [HttpPost]
        [ODataRoute("SetAvatar")]
        public IHttpActionResult SetAvatar(ODataActionParameters parameters)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userId = Request.Headers.Authorization.Parameter.Split(':')[0];

            string avatarUrl = (string)parameters["avatarUrl"];

            TableOperation retrieveOperation = TableOperation.Retrieve<TableEntityAdapter<User>>("User", userId);
            TableResult retrievedResult = UserTable.Execute(retrieveOperation);

            TableEntityAdapter<User> userEntity = (TableEntityAdapter<User>)retrievedResult.Result;

            if (userEntity != null)
            {
                userEntity.OriginalEntity.AvatarUrl = avatarUrl;
                TableOperation updateOperation = TableOperation.Replace(userEntity);
                UserTable.Execute(updateOperation);
                return Ok();
            }
            else
            {
                return BadRequest("User does not exist.");
            }
        }
    }
}