const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectindex: 0,
    msg: [],
    type:0
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
  changetype(e) {
    var id = e.currentTarget.dataset.id
    this.setData({
      selectindex: Number(id),
      type:Number(id)
    })
    this.init();
  },
  init(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/api/user/userRecord',
      data: {
        token:wx.getStorageSync('token'),
        type:that.data.type
      },
      method: 'post',
      success: function(res){
        console.log(res)
          that.setData({
            msg:res.data.data
          })
      },
    })
  }
})