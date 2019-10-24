const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    showmodal: false,
    showmsg: false,
    user:[],
    username:'',
    userId:''
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
      username:e.currentTarget.dataset.name,
      userId:e.currentTarget.dataset.id
    });

  },
  submit:function(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/api/Landlord/releaseBind',
      data: {
        token:wx.getStorageSync('token'),
        user_id:that.data.userId
      },
      method: 'post', 
      success: function(res){
        console.log(res)
      },

    })
    this.hideModal()
    this.init();
  },
  init(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/api/Landlord/bindList',
      data: {
        token:wx.getStorageSync('token'),
        type:2,
        keyword:''
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
})