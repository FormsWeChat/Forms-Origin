// pages/runtimePage/runtimePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageHeight: "95%",
    itemHeight: "80%",
    Mode: "runtime",
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
      return item.title === e.currentTarget.id;
    })
    this.data.Options[index].click = true;
    this.setData({
      Options: this.data.Options
    })
  },
  onVote: function(e) {
    wx.redirectTo({
      url: '../resultPage/analysisPage',
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
    var that = this;
    wx.getStorage({
      key: 'Title',
      success: function (res) {
        that.setData({
          Title: res.data,
        })
      },
      fail: function (res) {
        console.log(res,'Load title fail')
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