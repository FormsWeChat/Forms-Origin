//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
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
      url: '../designPage/designPage',
    })
  },

  onLoad: function () {
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
              this.setData({
                Id: res.data.Id,
                SignInHash: res.data.SignInHash,
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