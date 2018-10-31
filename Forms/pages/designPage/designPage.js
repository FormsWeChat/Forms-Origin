Page({
  data: {
    filters: [],
    loading: true,
    Title: "",
    
    Options: [
      { Text: "Option1", Card: false, DoneInput: false }
    ],
    showBottom: "title",
  },
  //事件处理函数

  
  onAddOptionsButton: function (e) {
    let newOptions = this.data.Options;
    newOptions.push({ Text: "Option" + (newOptions.length + 1), Card: false, DoneInput: false })
    this.setData({
      Options: newOptions
    })
  },

  onClickSuggestionCard: function (e) {
    console.log("Yeah:", e.detail.msg);
  },

  onClickSuggestionTitle: function(e) {
    this.setData({
      Title: e.detail.Title,
      showBottom: "filter"
    });
  },

  onLoad: function () {
  },

  onShareAppMessage: function onShareAppMessage() {

  },

  shareForm: function (e) {
    console.log(e)
    Page.onshareAppMessage
  },
})
