const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showmodal: false,
    showmsg: false,
    dl:''
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
      url: app.globalData.url+'/api/Landlord/remindGet',
      data: {
        token:wx.getStorageSync('token')
      },
      method: 'POST', 
      success: function(res){
        console.log(res)
        that.setData({
          dl:res.data.data.remind
        })
      },

    })
  },
  dlInput(e){
    this.setData({
      dl:e.detail.value
    })
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
  },
  backmine: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  submit: function() {
    let that=this;

    if(this.data.dl==''){
      wx.showModal({
        title:'提示',
        content:'请设置警戒值',
        showCancel:false
      })
    }else{
      wx.request({
        url: app.globalData.url+'/api/landlord/remindSet',
        data: {
          token:wx.getStorageSync('token'),
          remind:that.data.dl
        },
        method: 'post', 
        success: function(res){
          console.log(res)
          if(res.data.code==1){
            that.setData({
              showmodal: true,
              showmsg: true,
            });
          }else{
            wx.showToast({
              title:'设置失败',
              icon:'none'
            })
          }

        },
  
      })
    }

  }
})