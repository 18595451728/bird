// pages/revise/revise.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loginword:options.loginword
    })
  },
  sure(){
    if(!this.newword){
      wx.showToast({
        title: '请先输入新密码',
        icon:'none'
      })
      return false;
    }

    wx.request({
      url: app.globalData.url +'/api/Landlord/SetPassWord',
      method:'post',
      data:{
        token:wx.getStorageSync('token'),
        room_password:this.newword
      },
      success:function(res){
        console.log(res)
        wx.showToast({
          title: res.data.mes,
          icon:'none'
        })
        if(res.data.code==1){
          setTimeout(()=>{
            wx.navigateBack({
              
            })
          },1000)
        }
      }
    })
  },
  changeword(e){
    this.newword = e.detail.value
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

  }
})