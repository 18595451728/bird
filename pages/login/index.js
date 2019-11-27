const app = getApp(),
  r = require('../../utils/request.js'),
  l = require('../../utils/login.js'),
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
  bindGetUserInfo: function(e) {
    var that = this
    console.log(e)
    var id = e.currentTarget.dataset.id
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo)
      l.login(function(t) {
        console.log(t)
        wx.setStorageSync('token', t)
        wx.setStorageSync('haslogin', !0)
        if (id == 0) {
          that.gotologin();
        } else {
          if (wx.getStorageSync('token')) {
            wx.request({
              url: app.globalData.url + '/api/landlord/isAdmin',
              method: 'post',
              data: {
                token: wx.getStorageSync('token')
              },
              success: function (res) {
                console.log(res)
                if (res.data.code == 1) {
                  that.setData({
                    is_admin: res.data.data.is_admin
                  })
                  if (that.data.is_admin) {
                    wx.setStorageSync('adminHasBind', !0)
                    app.globalData.is_admin = !0
                    wx.switchTab({
                      url: '/pages/mine/mine',
                    })
                  } else {
                    that.adminlogin()
                  }
                } else {
                  wx.showToast({
                    title: res.data.mes,
                    icon: 'none'
                  })
                }
              }
            })
          }
        }
      });
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log(wx.getStorageSync('token'))
    this.setData({
      token:wx.getStorageSync('token')
    })
   
  },


  usergo(){
    this.gotologin()
  },
  admingo(){
    var that = this
    if (wx.getStorageSync('token')) {
      wx.request({
        url: app.globalData.url + '/api/landlord/isAdmin',
        method: 'post',
        data: {
          token: wx.getStorageSync('token')
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 1) {
            app.globalData.is_admin = !0
            that.setData({
              is_admin: res.data.data.is_admin
            })
            if (that.data.is_admin) {
              wx.setStorageSync('adminHasBind', !0)
              wx.switchTab({
                url: '/pages/mine/mine',
              })
            } else {
              that.adminlogin()
            }
          } else {
            wx.showToast({
              title: res.data.mes,
              icon: 'none'
            })
          }
        }
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
  gotologin: function() {
    wx.setStorageSync('adminHasBind',false)
    wx.setStorageSync('userBind', true)
    r.req(u + '/api/User/checkBind', {
      token: wx.getStorageSync('token')
    }, 'post').then(res => {
      console.log(res)
      if (res.code == 1) {
        app.globalData.is_admin = false
        wx.setStorageSync('userBind', !0)
        console.log(wx.getStorageSync('userBind'))
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else {
        wx.navigateTo({
          url: '/pages/userlogin/index',
        })
      }
    })


  },
  adminlogin: function() {
    app.globalData.is_admin = !0
    var adminHasBind = wx.getStorageSync('adminHasBind')

    wx.setStorageSync('adminHasBind', true)
    wx.setStorageSync('userBind', false)

    console.log(wx.getStorageSync('adminHasBind'))
    wx.navigateTo({
      url: '/pages/adminlogin/index',
    })
    // if (adminHasBind) {
    //   wx.switchTab({
    //     url: '/pages/index/index',
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '/pages/adminlogin/index',
    //   })
    // }

  }
})