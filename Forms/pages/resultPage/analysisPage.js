// pages/resultPage/analysisPage.js

var config = require('../../utils/config.js');

Page({
  /**
   * Page initial data
   */
  data: {
    toView: 'red',
    scrollTop: 100,

    // Mock vote data
    vote:
    {
        items: [{
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
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //var voteId = options.VOTE_ID;

    var that = this;

     //获取投票结果
     /*
    wx.request( {
      url: config.resultUrl,
      data: {
        VOTE_ID: voteId,
        OPEN_ID: wx.getStorageSync( 'openid' )
        },

        success: function(res) {
          console.log( res.data )
          that.setData( {
            vote: res.data
            });
            }
        });*/
  },

  bookShop: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: 15910699632,
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