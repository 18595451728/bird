const app = getApp(),
  r = require('../../../utils/request.js'),
  u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showpassword: false,
    showmodal: false,
    showmsg: false,
    xiaoqu: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  revise(){
    wx.navigateTo({
      url: '/pages/revise/revise?loginword='+this.data.loginword,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  xiaoqu: function(e) {
    this.setData({
      xiaoqu: e.detail.value
    })
  },
  dong: function(e) {
    this.setData({
      dong: e.detail.value
    })
  },
  menpai: function(e) {
    this.setData({
      menpai: e.detail.value
    })
  },
  dianbiao: function(e) {
    this.setData({
      dianbiao: e.detail.value
    })
  },
  loginword: function(e) {
    this.setData({
      loginword: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    r.req(u + '/api/landlord/getPassword', {
      token: wx.getStorageSync('token')
    }, 'post').then(res => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          showpassword: !0,
          loginword: res.data.room_password
        })
      }
    })
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
    this.setData({
      xiaoqu: '',
      dong: '',
      menpai: '',
      dianbiao: ''
    })
    this.onLoad()
  },
  formSubmit: function(e) {
    var that=this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    r.req(u + '/api/landlord/bindDevice', {
      token: wx.getStorageSync('token'),
      community: this.data.xiaoqu,
      community_build: this.data.dong,
      community_room: this.data.menpai,
      device_code: this.data.dianbiao,
      room_password: this.data.loginword
    }, 'post').then(res => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          showmodal: true,
          showmsg: true,
        });
      }else{
        wx.showToast({
          title: res.mes,
          icon:'none'
        })
      }
    })

  },
  formReset: function() {
    console.log('form发生了reset事件')
    this.hideModal();
    this.onLoad()
  },
})