Page({
  data: {
    filters: [],
    loading: true,
    Title: "",
    
    Options: [
      { 
        Title: "Option1", 
        Card: true, 
        DoneInput: false,
        image:"../../images/cat.jpg",
        price:0,
        rating:0,
        kouwei:1,
        fuwu:1,
        huanjing:1,
      }
    ],
    showBottom: "title",
  },
  //事件处理函数

  
  onAddOptionsButton: function (e) {
    let newOptions = this.data.Options;
    newOptions.push({ Title: "Option" + (newOptions.length + 1), Card: false, DoneInput: false })
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
      showBottom: e.detail.showBottom
    });
  },

  onLoad: function () {
    let index = this.data.Options.findIndex((item) => item.Title=="Option1");
    this.data.Options[index]["Card"] = true;
    this.data.Options[index]["Title"] = "true";
    this.data.Options[index]["image"] = "../../images/cat.jpg";
    this.data.Options[index]["price"] = 123;
    this.data.Options[index]["rating"] = 4.5;
    this.data.Options[index]["kouwei"] = 4;
    this.data.Options[index]["huanjing"] = 4;
    this.data.Options[index]["fuwu"] = 4;
    let tmp = 'Options[' + index + ']';
    this.setData({
      tmp: this.data.Options[index]
    })
  },

  onShareAppMessage: function onShareAppMessage() {

  },

  shareForm: function (e) {
    console.log(e)
    Page.onshareAppMessage
  },
})
