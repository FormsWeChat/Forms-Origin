Page({
  data: {
    filters: [],
    loading: true,
    Title: "",
    suggestTitle: [
      { title: "Where to eat" },
      { title: "What movies" },
      { title: "KTV" }
    ],
    Options: [
      { Text: "Option1", Card: false, DoneInput: false }
    ],
    showBottom: "title",
  },
  //事件处理函数
  onSuggestButton: function (e) {
    this.setData({
      Title: e.target.id,
      showBottom: "suggestion"
    });
  },
  onAddOptionsButton: function (e) {
    let newOptions = this.data.Options;
    newOptions.push({ Text: "Option" + (newOptions.length + 1), Card: false, DoneInput: false })
    this.setData({
      Options: newOptions
    })
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
