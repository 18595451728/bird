    const app = getApp(),
      r = require('../../utils/request.js'),
      u = app.globalData.url
    Page({

      /**
       * 页面的初始数据
       */
      data: {

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
      username: function(e) {
        this.setData({
          username: e.detail.value
        })
      },
      password: function(e) {
        this.setData({
          password: e.detail.value
        })
      },
      formSubmit: function(e) {
        console.log(e)
        app.globalData.is_admin = true

        r.req(u + '/api/landlord/login', {
          username: this.data.username,
          password: this.data.password,
          token: wx.getStorageSync('token')
        }, 'post').then(res => {
          console.log(res)
          if (res.code == 1) {
            wx.setStorageSync('adminHasBind', !0)
            wx.switchTab({
              url: '/pages/index/index',
            })
          } else {
            wx.showToast({
              title: res.mes,
              icon: 'none'
            })
          }
        })
      }
    })