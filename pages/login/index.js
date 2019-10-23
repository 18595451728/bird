const app = getApp(),r=require('../../utils/request.js'),l=require('../../utils/login.js'),u=app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindGetUserInfo: function (e) {
    var that = this
    console.log(e)
    var id =e.currentTarget.dataset.id
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo)
      l.login(function (t) {
        console.log(t)
        wx.setStorageSync('token', t)
        wx.setStorageSync('haslogin', !0)
        if(id==0){
          that.gotologin();
        }else{
          that.adminlogin()
        }
      });
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gotologin:function(){
    wx.navigateTo({
      url: '/pages/userlogin/index',
    })
  },
  adminlogin:function(){
    var adminHasBind = wx.getStorageSync('adminHasBind')
    if (adminHasBind){
      wx.switchTab({
        url: '/pages/mine/mine',
      })
    }else{
      wx.navigateTo({
        url: '/pages/adminlogin/index',
      })
    }
    
  }
})