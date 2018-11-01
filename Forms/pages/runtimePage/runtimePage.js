
var config = require('../../utils/config.js');

// pages/runtimePage/runtimePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formId:"",
    getFormUrl: "http://miniforms.azurewebsites.net/Forms",
    pageHeight: "95%",
    itemHeight: "80%",
    Mode: "runtime",
    voteStatus: "0",
    Title:"",
    Options:[
      {title:"Restaurant name A", image:"../../images/cat.jpg", distance:"300M", rating: 4, comments: 199987, price: 94, type: "Western Style", click: false},
      { title: "Restaurant name B", image: "../../images/cat.jpg", distance: "300M", rating: 4, comments: 199987, price: 94, type: "Western Style", click: false },
      { title: "Restaurant name C", image: "../../images/cat.jpg", distance: "300M", rating: 4, comments: 199987, price: 94, type: "Western Style", click: false}
    ]
  },
  onSwiperItem: function(e) {
    if(this.data.Mode === "preview") {
      return
    }
    let index = this.data.Options.findIndex((item) => {
      return item.Choices.Id === e.currentTarget.id;
    })
    this.data.Options[index].click = true;
    this.setData({
      Options: this.data.Options
    })
  },
  onVote: function(e) {
    var that = this;
    // Vote ongoing
    this.setData({ voteStatus: "1"});

    var formId = this.data.formId;
    wx.getStorage({
      key: 'Id',
      success: function (res) {
      wx.request({
        url: config.resultUrl + '\'' + formId + '\'' + ')/Responses',
        method: 'POST',
        data: {
          ResponderId:res.data,
          ChoiceId: e.currentTarget.id,
        },

        success: function(res) {
          console.log("Vote success!");

          // Vote complete
          that.setData({ voteStatus: "2" });
          wx.redirectTo({
            url: '../resultPage/analysisPage?formId=' + formId,
          })
        }
      });

       },
    })
  },

  touchMove: function(e) {
    this.data.Options.forEach((item) => {
      item.click = false
    })
    this.setData({
      Options: this.data.Options
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.Mode && options.Mode === "preview") {
      this.setData({ Mode: "preview", pageHeight: "85%", itemHeight: "85%"})
    }
    if(options.formId) {
      this.setData({
        formId: options.formId
      })
    }
    var that = this;
    wx.request({
      url: this.data.getFormUrl + "('"+this.data.formId+"')?$expand=Questions($expand=Choices($expand=Shop))",
      method: 'GET',
      success(res) {
        console.log(res.data)
        if(res.data.Questions.length > 0) {
          let newOptions = res.data.Questions[0].Choices.map((item) => {
            return {click: false, Choices: item}
          })
          that.setData({
            Options: newOptions,
            Title: res.data.Questions[0].Description
          })
        }
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'Where should we eat?',
      path: '/pages/runtimePage/runtimePage'
    }
  },
})