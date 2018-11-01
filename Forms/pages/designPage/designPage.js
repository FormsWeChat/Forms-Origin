Page({
  data: {
    createFormUrl:"http://miniforms.azurewebsites.net/Forms",
    createQuestionUrl: "http://miniforms.azurewebsites.net/Forms('3edd2659-803b-41ee-bee7-862dad5b8121')/Questions",
    formId:"",
    questionId:"",
    filters: [],
    loading: true,
    Title: "",
    Options: [
      { Id:"", Text: "Option1", Card: false, DoneInput: false, title: "", rate: 0, comments:0, price:"", image:""}
    ],
    showBottom: "title",

  },
  //事件处理函数
  finishInput: function (e) {
    wx.setStorage({
      key: 'suggestionFilterKeyword',
      data: e.detail.value,
    })
  },

  onAddOptionsButton: function (e) {
    let newOptions = this.data.Options;
    newOptions.push({ Id: "", Text: "Option" + (newOptions.length + 1), Card: false, DoneInput: false, title: "", rate: 0, comments: 0, price: "", image: ""})
    this.setData({
      Options: newOptions
    })
  },

  onDoneButton: function(e) {
    wx.navigateTo({
      url: '../runtimePage/runtimePage?Mode=preview&formId='+this.data.formId,
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
        Id: e.detail.item.Id,
        image: e.detail.item.ImageHref,  
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

      const component = this.selectComponent('#suggestion-List');
      component.onLoad();

      let createOptionUrl = this.data.createFormUrl+"('"+this.data.formId+"')/Questions('"+this.data.questionId+"')/Choices"
      let order = newOptions.length - 1
      let that = this
      console.log(createOptionUrl)
      wx.request({
        url: createOptionUrl,
        method:'POST',
        data:{
          ShopId: e.detail.item.Id,
          Order: order
        },
        success(res) {
          console.log("Create New Question:", res.data, order)
        }
      })
      
      that.onAddOptionsButton()
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
    let title = this.data.Title
    let that = this
    wx.request({
      url: this.data.createFormUrl,
      method: 'POST',
      data: {
        Title: title,
      },
      success(res) {
        console.log("Create New For:", res.data)
        if (res.data.Id)
        {
          that.setData({
            formId: res.data.Id
          })
        }
        let createQuestionUrl = that.data.createFormUrl + "('" + that.data.formId + "')/Questions"
        wx.request({
          url: createQuestionUrl,
          method:'POST',
          data: {
            Description: title,
            Order: 0
          },
          success(res) {
            that.setData({
              questionId: res.data.Id
            })
            console.log("Create New Question:", title, that.data.questionId)
          }
        })
      }
    })
    
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
      data: 0,
    })
  },

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'Where should we eat?',
      path: '/pages/runtimePage/runtimePage?Mode=runtime&formId='+this.data.formId
    }
  },
})
