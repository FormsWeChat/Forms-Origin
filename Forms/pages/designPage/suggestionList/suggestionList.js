var config = require('../../../utils/config.js');

Component({
  data: {
    title: '',
    type: 'movie',
    loadData: "0",
    size: 5,
    restaurants: [
      // { Id:"", "Nan Jing Da Pai Dang", image: "../../../images/cat.jpg", comments: "1000", price: "$98/person", rate: 4 },
      // { title: "Zhong 8 Lou", image: "../../../images/cat.jpg", comments: "1000", price: "$98/person", rate: 3 },
    ],
    Options: [{
      Text: "Option1"
    }],
    Sort: '',
    MinPrice: '',
    MaxPrice: '',
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad() {
      var that = this;
      wx.request({
          url: config.shopUrl + '?$top=' + this.data.size,
          data: {},

          success: function(res) {
            console.log(res.data)
            that.setData({
              restaurants: res.data.value,
              loadData: "1"
            });
          }
        }),

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
        success: res => {
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

    attached: function() {
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
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function() {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function() {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function() {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function() {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function() {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function() {

    },

    onSuggestButton: function(e) {
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

    onFilter: function(e) {
      var myEventDetail = {
        eventType: "filter"
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
  }

})