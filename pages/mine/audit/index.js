const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      state: 0
    }, {
      state: 1
    }, {
      state: 2
    }],
    user:[]
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
  init(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/api/Landlord/bindList',
      data: {
        token:wx.getStorageSync('token'),
        type:2,
    
      },
      method: 'post', 
      success: function(res){
          console.log(res)
          that.setData({
            user:res.data.data.user
          })
      }
    })
  },
  change: function(e) {
    let that=this;
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var status=e.currentTarget.dataset.status
    var text = '是否确定通过该审核？'
    if (status == '3') {
      text = "是否确定忽略该审核？"
    }
    wx.showModal({
      title: '提示',
      content: text,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.globalData.url+'/api/Landlord/bindCheck',
            data: {
              user_id:id,
              status:status,
              token:wx.getStorageSync('token')
            },
            method: 'post', 
            success: function(res){
              console.log(res)
              that.init();
            },

          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})