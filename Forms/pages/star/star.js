Component({

  data: {
    WidthRate: 1.0
  },

  methods: {
    onLoad: function(options) {
      var that = this
      wx.getSystemInfo({
        success: function(res) {
          // 因为canvas上的单位是固定为px，所以需要按当前屏幕与iPhone6的宽度比例缩放
          that.data.WidthRate = res.windowWidth / 375.0
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    },

    onReady: function() {
      // 页面初次渲染完成
      var context = wx.createCanvasContext('stars')
      var width = 60 * this.data.WidthRate
      var score = 4.57
      var count = 5
      var style = {
        borderColor: "gold",
        fillColor: "gold",
        spaceColor: "#FFFFFF"
      }
      this.drawStars(context, score, count, width, style)
    },

    /* 画星星 */
    drawStars: function(context, score, count, width, style) {
      // 分数不能大于星星数
      if (score > count) {
        score = count
      }

      var xStart = score * width;
      var yStart = 0;
      var xEnd = (Math.ceil(score) + 1) * width;
      var yEnd = 0;
      var radius = width / 2;

      // 线性渐变，由左至右
      var linear = context.createLinearGradient(xStart, yStart, xEnd, yEnd);
      linear.addColorStop(0, style.fillColor);
      linear.addColorStop(0.01, style.spaceColor);
      linear.addColorStop(1, style.spaceColor);
      context.setFillStyle(linear)

      // 星星边框边框颜色
      context.setStrokeStyle(style.borderColor)
      context.setLineWidth = 1;

      // 绘制星星的顶点坐标   
      var x = radius,
        y = 0;

      for (var i = 0; i < count; i++) {
        // 星星绘制
        context.beginPath();
        var x1 = width * Math.sin(Math.PI / 10);
        var h1 = width * Math.cos(Math.PI / 10);
        var x2 = radius;
        var h2 = radius * Math.tan(Math.PI / 5);
        context.lineTo(x + x1, y + h1);
        context.lineTo(x - radius, y + h2);
        context.lineTo(x + radius, y + h2);
        context.lineTo(x - x1, y + h1);
        context.lineTo(x - x1, y + h1);
        context.lineTo(x, y);
        context.closePath();
        context.stroke()
        context.fill();
        x = (i + 1.5) * width;
        y = 0;
        context.moveTo(x, y);
      }
      context.draw()
    },
  }
})