Component({
  data: {
    title: '',
    subtitle: '加载中...',
    type: 'movie',
    loading: false,
    hasMore: false,
    page: 1,
    size: 20,
    restaurants: [
      { title: "Nan Jing Da Pai Dang", comments: "1000", price: "$98/person", rate: 4 },
      { title: "Zhong 8 Lou", comments: "1000", price: "$98/person", rate: 3 },
    ],
    Options: [
      { Text: "Option1"}
    ],
    Sort: '',
    MinPrice: '',
    MaxPrice: '',
  },

  methods: {
    loadMore: function loadMore() {
      var _this = this;

      if (!this.data.hasMore) return;

      //this.setData({ subtitle: '加载中...', loading: true });

      /*return app.douban.find(this.data.type, this.data.page++, this.data.size).then(function (d) {
        if (d.subjects.length) {
          _this.setData({ subtitle: d.title, restaurants: _this.data.restaurants.concat(d.subjects), loading: false });
        } else {
          _this.setData({ subtitle: d.title, hasMore: false, loading: false });
        }
      }).catch(function (e) {
        _this.setData({ subtitle: 'Loading data error', loading: false });
        console.error(e);
      });*/
      // _this.setData({
      //   subtitle: "Restaurant nearby",
      //   restaurants: ["Nan Jing Da Pai Dang", "Zhong 8 Lou"],
      //   loading: false
      // });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad() {
      /*this.data.title = params.title || this.data.title;
  
      // 类型： in_theaters  coming_soon  us_box
      this.data.type = params.type || this.data.type;*/
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

      this.loadMore();
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