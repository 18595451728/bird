const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    pwd:''
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  userInput(e) {
    this.setData({
      user:e.detail.value
    })
  },
  pwdInput(e){
    this.setData({
      pwd: e.detail.value
    })
  },
  formSubmit:function(e){

    app.globalData.is_admin=true

      let that=this;
  if(this.data.user=='' || this.data.pwd==''){
    wx.showModal({
      title: '提示',
      content: '请完整填写信息',
      showCancel:false
    })
  }else{
    wx.request({
      url: app.globalData.url+'/api/landlord/login',
      data: {
        username:that.data.user,
        password:that.data.pwd,
        token:wx.getStorageSync('token')
      },
      method: 'POST', 
      success: function(res){
          console.log(res)
          if(res.data.code==1){
            wx.showToast({
              title:'登陆成功',
              icon:'success',
              duration:1500
            })
            setTimeout(function(){
              wx.switchTab({
                url: '/pages/index/index',
              })
            },1500)
          }else{
            wx.showToast({
              title:'登陆失败',
              icon:'none',
              duration:1500
            })
          }
      },

    })

  }

  }
})