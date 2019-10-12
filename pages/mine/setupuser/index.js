const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    showmodal: true,
    showmsg: true,
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
  search: function(e) {
    var value = e.detail.value
    if (value == "") {
      wx.showToast({
        title: '请输入用户筛选',
        icon: 'none'
      })
      return
    }
    var list = this.data.list
    list.push({})
    console.log(list)
    this.setData({
      list: list
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
  changestate:function(e){
    var index=e.currentTarget.dataset.index
    this.setData({
      showmodal: true,
      showmsg: true,
    });
  },
  submit:function(){
    this.hideModal()
  }
})