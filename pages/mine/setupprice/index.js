const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feng_one: 0,
    feng_two: 4,
    feng_three: 6,
    feng_four: 9,
    gu_one: 0,
    gu_two: 4,
    gu_three: 6,
    gu_four: 9,
    lastY: 0,
    showmodal: false,
    showmsg: !0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  up_feng_one: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == '1') {
      if (this.data.feng_one > 0) {
        this.setData({
          feng_one: this.data.feng_one - 1
        })
      }
    } else {
      if (this.data.gu_one > 0) {
        this.setData({
          gu_one: this.data.gu_one - 1
        })
      }
    }
  },
  down_feng_one: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == '1') {
      if (this.data.feng_one < 1) {
        this.setData({
          feng_one: this.data.feng_one + 1
        })
      }
    } else {
      if (this.data.gu_one < 1) {
        this.setData({
          gu_one: this.data.gu_one + 1
        })
      }
    }
  },
  up_feng_two: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == "1") {
      if (this.data.feng_two > 0) {
        this.setData({
          feng_two: this.data.feng_two - 1
        })
      }
    } else {
      if (this.data.gu_two > 0) {
        this.setData({
          gu_two: this.data.gu_two - 1
        })
      }
    }
  },
  down_feng_two: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == "1") {
      if (this.data.feng_two < 9) {
        this.setData({
          feng_two: this.data.feng_two + 1
        })
      }
    } else {
      if (this.data.gu_two < 9) {
        this.setData({
          gu_two: this.data.gu_two + 1
        })
      }
    }
  },
  up_feng_three: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == "1") {
      if (this.data.feng_three > 0) {
        this.setData({
          feng_three: this.data.feng_three - 1
        })
      }
    } else {
      if (this.data.gu_three > 0) {
        this.setData({
          gu_three: this.data.gu_three - 1
        })
      }
    }
  },
  down_feng_three: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == "1") {
      if (this.data.feng_three < 9) {
        this.setData({
          feng_three: this.data.feng_three + 1
        })
      }
    } else {
      if (this.data.gu_three < 9) {
        this.setData({
          gu_three: this.data.gu_three + 1
        })
      }
    }
  },
  up_feng_four: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == "1") {
      if (this.data.feng_four > 0) {
        this.setData({
          feng_four: this.data.feng_four - 1
        })
      }
    } else {
      if (this.data.gu_four > 0) {
        this.setData({
          gu_four: this.data.gu_four - 1
        })
      }
    }
  },
  down_feng_four: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == "1") {
      if (this.data.feng_four < 9) {
        this.setData({
          feng_four: this.data.feng_four + 1
        })
      }
    } else {
      if (this.data.gu_four < 9) {
        this.setData({
          gu_four: this.data.gu_four + 1
        })
      }
    }
  },
  handletouchmove: function(event) {
    var id = event.currentTarget.dataset.id
    let currentY = event.touches[0].pageY
    let ty = currentY - this.data.lastY
    if (ty < 0) {
      if (id == '1' && this.data.feng_two < 9) {
        this.setData({
          feng_two: this.data.feng_two + 1
        })
      }
      if (id == '2' && this.data.feng_three < 9) {
        this.setData({
          feng_three: this.data.feng_three + 1
        })
      }
      if (id == '3' && this.data.feng_four < 9) {
        this.setData({
          feng_four: this.data.feng_four + 1
        })
      }
    } else if (ty > 0) {
      if (id == '1' && this.data.feng_two > 0) {
        this.setData({
          feng_two: this.data.feng_two - 1
        })
      }
      if (id == '2' && this.data.feng_three > 0) {
        this.setData({
          feng_three: this.data.feng_three - 1
        })
      }
      if (id == '3' && this.data.feng_four > 0) {
        this.setData({
          feng_four: this.data.feng_four - 1
        })
      }
    }
    //将当前坐标进行保存以进行下一次计算
    this.data.lastY = currentY
  },
  handletouchtart: function(event) {
    this.data.lastY = event.touches[0].pageY
  },
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showmodal: false,
      showmsg: false,
    });
  },
  backmine: function() {
    wx.navigateBack({
      delta: 1
    })
  }
})