//index.js
//获取应用实例
var config = require('../../utils/config.js');

const app = getApp()

Page({
  data: {
    width: 0,
    height: 0,
    //src: './welcomebase64.png',
    src: config.welcomeBase64,
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
  onClickStart: function (e) {
    let id, hash;
    
    let avatar = e.detail.userInfo.avatarUrl;
    wx.getStorage({
      key: 'SignInHash',
      success: function (res) {
        hash: res.data
        wx.getStorage({
          key: 'Id',
          success: function (res) {
            id = res.data
            console.log(e.detail)
            wx.request({
              url: "https://miniforms.azurewebsites.net/SetAvatar",
              method: 'POST',
              data: {avatarUrl:e.detail.userInfo.avatarUrl},
              header: {
                Authorization: "eihei " + id + ":" + hash,
              },
              success(res) {
                console.log("send avator link success")
              }
            })
          },
        })
      }})
    wx.redirectTo({
      url: '../designPage/designPage',
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
          hasUserInfo: true,
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