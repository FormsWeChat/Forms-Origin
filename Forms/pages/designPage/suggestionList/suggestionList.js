Component({
  data: {
    title: '',
    subtitle: '加载中...',
    type: 'movie',
    loadData: "1",
    page: 1,
    size: 20,
    restaurants: [
      { title: "Nan Jing Da Pai Dang", image: "../../../images/cat.jpg", comments: "1000", price: "$98/person", rate: 4 },
      { title: "Zhong 8 Lou", image: "../../../images/cat.jpg", comments: "1000", price: "$98/person", rate: 3 },
    ],
    Options: [
      { Text: "Option1"}
    ],
    Sort: '',
    MinPrice: '',
    MaxPrice: '',
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad() {

      wx.getStorage({
        key: 'Sort',
        success: res => {
          console.log(res.data);
          this.setData({
            Sort: res.data
          })
        }
      })
      wx.getStorage({
        key: 'MinPrice',
        success:res => {
          console.log(res.data);
          this.setData({
            MinPrice: res.data
          });
        }
      })
      wx.getStorage({
        key: 'MaxPrice',
        success: res => {
          console.log(res.data);
          this.setData({
            MaxPrice: res.data
          })
        }
      })

    },

    attached: function () {
      // Do something when page show.
      wx.getStorage({
        key: 'Sort',
        success(res) {
          console.log(res.data)
        }
      })
      wx.getStorage({
        key: 'MinPrice',
        success(res) {
          console.log(res.data)
        }
      })
      wx.getStorage({
        key: 'MaxPrice',
        success(res) {
          console.log(res.data)
        }
      })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function onPullDownRefresh() {
      this.setData({
        restaurant: [],
        page: 1,
        hasMore: true
      });
      this.loadMore().then(function() {
        return app.wechat.original.stopPullDownRefresh();
      });
    },
    onReachBottom: function onReachBottom() {
      this.loadMore();
    },

    onSuggestButton: function (e) {
      let item;
      this.data.restaurants.forEach(element => {
          if (element.title === e.currentTarget.id) {
            item = element;
            return true;
          }
      });
      var myEventDetail = { eventType: "button", item: item} // detail对象，提供给事件监听函数
      console.log(e)
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },

    onFilter: function (e) {
      var myEventDetail = { eventType: "filter" } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
  }

})