Page({
  data: {
    filters: [],
    loading: true,
    Title: "",
    Options: [
      { Text: "Option1", Card: false, DoneInput: false, title: "", rate: 0, comments:0, price:""}
    ],
    showBottom: "title",
  },
  //事件处理函数


  onAddOptionsButton: function (e) {
    let newOptions = this.data.Options;
    newOptions.push({ Text: "Option" + (newOptions.length + 1), Card: false, DoneInput: false, title: "", rate: 0, comments: 0, price: "" })
    this.setData({
      Options: newOptions
    })
  },

  onDoneButton: function(e) {
    wx.navigateTo({
      url: '../runtimePage/runtimePage?Mode=preview',
    })
  },

  onClickSuggestion: function (e) {
    console.log("ClickSuggestion:", e);
    this.setData({
      showBottom: e.detail.eventType
    });
    if (e.detail.eventType === "button") {
      let newOptions = this.data.Options;
      let optionLength = newOptions.length;
      newOptions[optionLength - 1] = { 
        Text: e.detail.item.ShopTitle, 
        Card: true, 
        DoneInput: false, 
        title: e.detail.item.ShopTitle, 
        rate: e.detail.item.StarNet, 
        comments: e.detail.item.CommentsNumber, 
        price: e.detail.item.AveragePrice
      }
      this.setData({
        Options: newOptions,
        showBottom: "suggestion"
      })
      this.onAddOptionsButton()
    }
    else if (e.detail.eventType === "suggestion") {
      const component = this.selectComponent('#suggestion-List');
      component.onLoad();
    }
  },

  onClickSuggestionTitle: function (e) {
    this.setData({
      Title: e.detail.Title,
      showBottom: "suggestion"
    });
    const component = this.selectComponent('#suggestion-List');
    component.onLoad();
  },

  backToSuggestion: function (e) {
    console.log("Yeah:", e);
    this.setData({
      showBottom: e.detail.eventType
    });
    const component = this.selectComponent('#suggestion-List');
    component.onLoad();
  },

  onLoad: function () {
  },

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'Where should we eat?',
      path: '/pages/runtimePage/runtimePage?Mode=runtime'
    }
  },
})
