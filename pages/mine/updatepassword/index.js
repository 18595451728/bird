const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    old_state: 0,
    new_state: 0,
    new_check_state: 0,
    old_password: '',
    new_password: '',
    check_password: '',
    showmodal: false,
    showmsg: false,
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
  oldinput: function(e) {
    console.log(e)
    this.setData({
      old_password: e.detail.value,
      old_state: 2
    })
  },
  newinput: function(e) {
    this.setData({
      new_password: e.detail.value,
      new_state: 2
    })
  },
  checkinput: function(e) {
    this.setData({
      check_password: e.detail.value,
    })
    if (this.data.new_password == this.data.check_password) {
      this.setData({
        new_check_state: 2,
      })
    } else {
      wx.showToast({
        title: '请确认密码与新密码保持一致',
        icon: 'none'
      })
      this.setData({
        new_check_state: 1,
      })
    }
  },
  submit: function() {
    if (this.data.old_state != 2) {
      wx.showToast({
        title: '请输入正确原密码',
        icon: 'none'
      })
      return
    }
    if (this.data.new_state != 2) {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none'
      })
      return
    }
    if (this.data.new_check_state != 2) {
      wx.showToast({
        title: '请确认密码与新密码保持一致',
        icon: 'none'
      })
      return
    }

    else{
      let that=this;
      wx.request({
        url: app.globalData.url+'/api/landlord/changePassword',
        data: {
          token:wx.getStorageSync('token'),
          o_pass:that.data.old_password,
          n_pass:that.data.new_password,
          con_pass:that.data.check_password
        },
        method: 'POST', 
        success: function(res){
          console.log(res)
          if(res.data.code==0){
    
            wx.showModal({
              title:'提示',
              content:res.data.mes+'',
              showCancel:false
            })
          }else{
            that.setData({
              showmodal: true,
              showmsg: true,
            })
          }

        },
  
      })
    }

  
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
  }
})