//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    width: 0,
    height: 0,
    src: '../../images/welcome.png',

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code: '',
    Id: '',
    SignInHash: '',
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onClickStart: function () {
    wx.redirectTo({
    url: '../runtimePage/runtimePage',
    })
  },

  onLoad: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function success(res) {
        _this.setData({
          width: res.windowWidth,
          height: res.windowHeight
        });
      }
    });  

    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey
          wx.request({
            url:  "http://miniforms.azurewebsites.net/SignIn",
            data: { code: res.code },
            method:  "POST",
            success: res=> {
              console.log(res.data);
              wx.setStorage({
                key: 'Id',
                data: res.data.Id,
              })
              wx.setStorage({
                key: 'SignInHash',
                data: res.data.SignInHash,
              })
            }
          })
        }
      }) 
    // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        console.log(res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }
},
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})