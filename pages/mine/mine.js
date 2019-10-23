const app = getApp(),
  r = require('../../utils/request.js'),
  l = require('../../utils/login.js'),
  u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasbind: true,
    is_admin: true,
    user:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  bemanager: function() {
    wx.navigateTo({
      url: '/pages/bemanager/bemanager',
    })
  },
  chongzhi: function() {
    wx.navigateTo({
      url: '/pages/recharge/index',
    })
  },
  tixian: function() {
    wx.navigateTo({
      url: '/pages/withdrawal/index',
    })
  },
  huiyuan: function() {
    wx.navigateTo({
      url: 'members/index',
    })
  },
  binddianbiao: function() {
    wx.navigateTo({
      url: 'bindammeter/index',
    })
  },
  setupinfo: function() {
    wx.navigateTo({
      url: 'setupprice/index',
    })
  },
  setuppassword: function() {
    wx.navigateTo({
      url: 'updatepassword/index',
    })
  },
  bindaudit: function() {
    wx.navigateTo({
      url: 'audit/index',
    })
  },
  bindtishi: function() {
    wx.navigateTo({
      url: 'warning/index',
    })
  },
  setupuser: function() {
    wx.navigateTo({
      url: 'setupuser/index',
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
  onShow: function(e) {
    this.setData({
      is_admin: app.globalData.is_admin
    })
    var adminHasBind = wx.getStorageSync('adminHasBind')
    if (adminHasBind) {
      this.setData({
        hasbind: !0
      })
    }
    var that = this
 
    var haslogin = wx.getStorageSync('haslogin')
   
   if(!this.data.is_admin){
     r.req(u + '/api/user/center', {
       token: wx.getStorageSync('token')
     }, 'post').then((res) => {
       console.log(res)
       that.setData({
         userinfo: res.data.user,
         haslogin: haslogin
       })
     })
   }else{
     r.req(u + '/api/landlord/center', {
       token: wx.getStorageSync('token')
     }, 'post').then(res => {
       console.log(res)
       that.setData({
         userinfo: res.data,
         haslogin: haslogin
       })
       console.log(that.data.userinfo.bind_num)
     })
   }
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


  loginout: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否退出登录',
      success: function (res) {
        if (res.confirm) {
          console.log(1111)
          r.req(u + '/api/Wx/signOut', {
             token: wx.getStorageSync('token')
          }, 'post').then((res) => {
            console.log(res)
            wx.showToast({
              title: res.mes,
              icon: 'none'
            })
            if (res.code == 1) {
              that.setData({
                hasbind:!1
              })
              wx.clearStorage()
            }else{
              
            }
          })
        }
      }
    })

    // wx.showModal({
    //   title: '提示',
    //   content: '是否退出登录',
    //   success: function (res) {
    //     if (res.confirm) {
    //       wx.clearStorage();
    //       var token = wx.getStorageSync('token')
    //       if (!token) {
    //         wx.showToast({
    //           title: '成功退出登录',
    //           icon: 'none'
    //         })
    //         that.onLoad();
    //       }
    //     }
    //   }
    // })
  },

  gotologin:function(){
    wx.navigateTo({
      url: '/pages/login/index',
    })
  }
})