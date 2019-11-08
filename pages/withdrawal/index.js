const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showmodal: false,
    showmsg: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var is_admin = app.globalData.is_admin
    this.setData({
      is_admin: is_admin
    })

  },
  gohistory:function(){
    wx.navigateTo({
      url: '/pages/xiaofei/xiaofei',
    })
  },
  jineInput: function(e) {
    this.setData({
      money: e.detail.value
    })
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
    this.init();
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
  init() {
    let that = this;
    wx.request({
      url: app.globalData.url + '/api/landlord/getBalance',
      data: {
        token: wx.getStorageSync('token')
      },
      method: 'post',
      success: function(res) {
        console.log(res)
        that.setData({
          balance: res.data.data.balance
        })
      },

    })
  },
  tixian() {
    if (this.data.money) {
      wx.navigateTo({
        url: '/pages/tixian/tixian?money=' + this.data.money,
      })
    }else{
      wx.showToast({
        title: '请输入提现金额',
        icon:'none'
      })
    }

  }
})