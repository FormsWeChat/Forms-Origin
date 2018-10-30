// pages/designPage/suggestTitle/suggestTitle.js
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
    suggestTitle: [
      { title: "Where should we eat?" },
      { title: "Which movie we want to see?" },
      { title: "Where do we want to meet?" }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSuggestButton: function (e) {
      var myEventDetail = { Title: e.target.id, showBottom: "suggestion" } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
