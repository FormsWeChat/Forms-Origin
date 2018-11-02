var config = require('../../../utils/config.js');

Component({
  data: {
    title: '',
    type: 'movie',
    loadData: "0",
    size: 10,
    restaurants: [
    ],
    Options: [{
      Text: "Option1"
    }],
    Sort: "StarNet",
    MinPrice: '',
    MaxPrice: '',
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad() {
      var that = this;
      let url = config.shopUrl + '?';
      wx.getStorage({
        key: 'Filter',
        success: res => {
          console.log(res.data);
          this.setData({
            Filter: res.data
          })
          wx.getStorage({
            key: 'Sort',
            success: res => {
              console.log(res.data);
              this.setData({
                Sort: res.data
              })
              wx.getStorage({
                key: 'MinPrice',
                success: res => {
                  console.log(res.data);
                  this.setData({
                    MinPrice: res.data
                  });
                  wx.getStorage({
                    key: 'MaxPrice',
                    success: res => {
                      console.log(res.data);
                      this.setData({
                        MaxPrice: res.data
                      })

                      if (that.data.Filter) {
                        url = url + '$orderby=' + this.data.Sort + '&$filter=AveragePrice' + '%20lt%20' + this.data.MinPrice + '%20&%20ga%20' + this.data.MaxPrice;
                      }
                      wx.request({
                        url: url + '&$top=' + that.data.size,
                        method: 'GET',
                        data: {},

                        success: function (res) {
                          console.log(res.data)
                          that.setData({
                            restaurants: res.data.value,
                            loadData: "1",
                            Filter: 0,
                          });
                        }
                      })
                    }
                  })
                }
              })
            }
          })
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

    },

    onSuggestButton: function (e) {
      let item;
      this.data.restaurants.forEach(element => {
        if (element.Id === e.currentTarget.id) {
          item = element;
          return true;
        }
      });
      var myEventDetail = {
        eventType: "button",
        item: item
      } // detail对象，提供给事件监听函数
      console.log(e)
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },

    onFilter: function (e) {
      var myEventDetail = {
        eventType: "filter"
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
  }

})