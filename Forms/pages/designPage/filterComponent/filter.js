// pages/designPage/filterComponent/filter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    orderCandidate:[
      { name:"ServiceScore", clicked: true},
      { name: "TasteScore", clicked: false},
      { name: "EnvScore", clicked: false}
    ],
    orderBy:"TasteScore",
    minPrice: 50,
    maxPrice: 150,
    choseMinPrice: 50,
    choseMaxPrice: 150,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backToSuggestion: function(e) {
      var myEventDetail = { eventType: "suggestion" } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    lowValueChangeAction: function(e) {
      this.setData({choseMinPrice: e.detail.lowValue})
    },
    highValueChangeAction: function (e) {
      if(e.detail.highValue == 300) {
        this.setData({ choseMaxPrice: "Unlimited"})
      }
      else {
        this.setData({ choseMaxPrice: e.detail.highValue })
      }
    },
    clickService: function(e) {
      let index = this.data.orderCandidate.findIndex((item) => {
        return item.name === e.target.id;
      })
      this.data.orderCandidate.forEach((item) => item.checked = false)
      this.data.orderCandidate[index].checked = true;
      console.log(e); 
      this.setData({
        orderBy: e.target.id,
        orderCandidate: this.data.orderCandidate
      })
    },
    clickTasty: function (e) {
      console.log(e);
      this.setData({
        orderBy: e.target.id
      })
    },
    clickEnvironment: function (e) {
      console.log(e);
      this.setData({
        orderBy: e.target.id
      })
    },
    applyFilter: function (e) {
      wx.setStorage({
        key: 'Sort',
        data: this.data.orderBy,
      })
      wx.setStorage({
        key: 'MinPrice',
        data: this.data.choseMinPrice,
      })
      wx.setStorage({
        key: 'MaxPrice',
        data: this.data.choseMaxPrice,
      })
      wx.setStorage({
        key: 'Filter',
        data: 1,
      })
      var myEventDetail = { eventType: "suggestion", Sort: this.data.orderBy} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
