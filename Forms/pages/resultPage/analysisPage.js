// pages/resultPage/analysisPage.js
var config = require('../../utils/config.js');

Page({
  /**
   * Page initial data
   */
  data: {
    vote:{},
    loadData:"0",
    formId:"",
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
  var that = this;

    //获取投票结果
   wx.request( {
     url: config.resultUrl + '\'' + options.formId  + '\'' + ')/Responses/Summary',
     data: {
       },
 
       success: function(res) {
         console.log( res.data )
         that.setData( {
           vote: res.data,
           loadData: "1"
           });
           }
       });
  },

  orderPhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '+8615910699632',
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})