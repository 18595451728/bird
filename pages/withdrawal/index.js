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
    if(this.data.is_admin){
      var url = app.globalData.url + '/api/landlord/getBalance'
    }else{
      var url = app.globalData.url + '/api/User/getBalance'
    }
    wx.request({
      url: url,
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
    console.log('10.00'>8)
    console.log(this.data.money-this.data.balance)
    if(this.data.money==0){
      wx.showToast({
        title: '提现金额不能为0',
        icon: 'none'
      })
      return false;
    }
    if(this.data.money == 0){
      wx.showToast({
        title: '提现金额不能为0',
        icon: 'none'
      })
      return false;
    }
    if (this.data.money) {
      if(this.data.money-this.data.balance>0){
        wx.showToast({
          title: '提现金额不能大于可提现余额',
          icon:'none'
        })
      }else{
        wx.navigateTo({
          url: '/pages/tixian/tixian?money=' + this.data.money,
        })
      }
     
    }else{
      wx.showToast({
        title: '请输入提现金额',
        icon:'none'
      })
    }

  }
})