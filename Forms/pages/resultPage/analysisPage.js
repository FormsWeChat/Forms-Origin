// pages/resultPage/analysisPage.js

var config = require('../../utils/config.js');
var formId = '3edd2659-803b-41ee-bee7-862dad5b8121';

Page({
  /**
   * Page initial data
   */
  data: {
    vote:{},
    loadData:"0",
    // Mock vote data
    /*
    vote:
      {
        items: [{
          storeName: '南京大排档',
          count: 9,
          images: [{
            src: "http://pic1.win4000.com/wallpaper/8/5260ceb4636ec.jpg?down"
          },
          {
            src: "https://www.bomb01.com/upload/news/original/b8e483bfb6793f50b27b64ad53bda073.jpg"
          },
          {
            src: "http://img.ylq.com/2017/1022/thumb_300_400_20171022113434935.png"
          },
          {
            src: "http://img0.utuku.china.com/520x0/news/20170627/b7ebeb9b-a300-4fc9-8800-55cc4c4244ae.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          }]
        }, {
          storeName: '南京大排档',
          count: 5,
          images: [{
            src: "http://pic1.win4000.com/wallpaper/8/5260ceb4636ec.jpg?down"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          }]
        }, {
          storeName: '南京大排档',
          count: 5,
          images: [{
            src: "http://pic1.win4000.com/wallpaper/8/5260ceb4636ec.jpg?down"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          }]
        }, {
          storeName: '南京大排档',
          count: 5,
          images: [{
            src: "http://pic1.win4000.com/wallpaper/8/5260ceb4636ec.jpg?down"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          }]
        }, {
          storeName: '那家小馆',
          count: 2,
          images: [{
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          }]
        }, {
          storeName: '将太无二',
          count: 3,
          images: [{
            src: "http://pic1.win4000.com/wallpaper/8/5260ceb4636ec.jpg?down"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          }]
        }, {
          storeName: '皖南水乡',
          count: 2,
          images: [{
            src: "http://pic1.win4000.com/wallpaper/8/5260ceb4636ec.jpg?down"
          },
          {
            src: "http://a2.att.hudong.com/80/49/01100000000000144733498645188_s.jpg"
          }]
        }],
        storeName: '南京大排档',
        count: 12
      },
     */
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //var voteId = options.VOTE_ID;

    var that = this;
    var url = config.resultUrl + '\'' + formId + '\'' + ')/Responses/Summary';

    //获取投票结果
   wx.request( {
     url: config.resultUrl + '\'' + formId  + '\'' + ')/Responses/Summary',
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