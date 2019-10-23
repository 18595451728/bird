const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timelist: ['1个月', '3个月', '6个月', '', '1 年', '2 年','3 年',''],
    selectindex:1,
    showmodal: false,
    showmsg:false,
    user:'',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that=this;
    wx.request({
      url: app.globalData.url+'/api/Landlord/is_use_card',
      data: {
        token:wx.getStorageSync('token')
      },
      method: 'POST', 
      success: function(res){
        // success
        console.log(res)
        that.setData({
          code:res.data.data.is_use_card
        })
      },

    })
    this.init();
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
  choose:function(e){
    var index=e.currentTarget.dataset.index
    this.setData({
      selectindex:index
    })
  },
  preventTouchMove: function () { },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showmodal: false,
      showmsg: false,
    });
  },
  backmine: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  init(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/api/Landlord/rechargePage',
      data: {
        token:wx.getStorageSync('token')
      },
      method: 'POST', 
      success: function(res){
        console.log(res)
        that.setData({
          user:res.data.data
        })
      },

    })
  },
  useCoupon(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/api/Landlord/useCard',
      data: {
        token:wx.getStorageSync('token')
      },
      method: 'POST', 
      success: function(res){
        console.log(res)
      },

    })
  }
})