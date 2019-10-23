const app = getApp(), 
r = require('../../utils/request.js'), 
l = require('../../utils/login.js'), 
u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showxiaoqu: false,
    showdong: false,
    showroom: false,
    communitylist: ['1111', '2222', '3333', '4444', '5555', '243'],
    community: '',

   
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
  tklyChoose: function (e) {
  
    this.setData({
      showxiaoqu: !this.data.showxiaoqu,
      community: this.data.communitylist[e.currentTarget.dataset.index]
    })
    // console.log(this.data.communitylist[e.currentTarget.dataset.index]);
  },




  bindSave: function (e) {
    console.log(e)
    var that = this

    r.req(u + '/api/user/bind', {
      community_id: that.data.community_id,
      community_build_id: that.data.community_build_id,
      community_room_id: that.data.community_room_id,
      name: e.detail.value.consignee,
      tel: e.detail.value.telephone,
      password: e.detail.value.password,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      console.log(res)

    })


  },






  showxiaoqu: function() {
    this.setData({
      showxiaoqu: !this.data.showxiaoqu
    })
  },
  showdong: function() {
    this.setData({
      showdong: !this.data.showdong
    })
  },
  showroom: function() {
    this.setData({
      showroom: !this.data.showroom
    })
  },

  
  login: function() {
    app.globalData.is_admin = false
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})