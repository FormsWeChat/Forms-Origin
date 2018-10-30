Page({
  data: {
    filters: [],
    loading: true,
  },

  onLoad: function () {
   /* wx.showLoading({ title: '拼命加载中...' })
    const tasks = this.data.boards.map(board => {
      return app.douban.find(board.key, 1, 8)
        .then(d => {
          board.title = d.title
          board.movies = d.subjects
          return board
        })
    })

    Promise.all(tasks).then(boards => {
      this.setData({ boards: boards, loading: false })
      wx.hideLoading()
    })*/
  },

  onShareAppMessage: function onShareAppMessage() {

  },

  shareForm: function (e) {
    console.log(e)
    Page.onshareAppMessage
  },
})