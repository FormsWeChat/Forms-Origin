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

  onClickSuggestion: function (e) {
    console.log("Yeah:", e.detail.msg);
    
  },

  onClickSuggestionTitle: function(e) {
    this.setData({
      Title: e.detail.Title,
      showBottom: "suggestion"
    });
  },

  backToSuggestion: function(e) {
    console.log("Yeah:", e);
    this.setData({
      showBottom: e.EventType
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
