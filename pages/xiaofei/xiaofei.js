const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectindex: 0,
    msg: [],
    type: 2,
    admin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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
  changetype(e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    if(id==0){
      this.setData({
        type:2
      })
      this.init()
    }else if(id==1){
      this.setData({
        type: 1
      })
      this.init()
    }else{
      this.init2()
    }
    
    this.setData({
      selectindex: Number(id),
    })

  },
  init2(){
    var that=this
    wx.request({
      url: app.globalData.url+'/api/Withdraw/record',
      method:'post',
      data:{
        token: wx.getStorageSync('token'),
        type:2
      },
      success:function(res){
        console.log(res)
        if (res.data.data.data.length == 0) {
          wx.showToast({
            title: '暂无数据',
            duration: 1500,
            icon: 'none'
          })
        }
        that.setData({
          msg: res.data.data.data
        })
      }
    })
  },
  init() {
    let that = this;
    wx.request({
      url: app.globalData.url + '/api/landlord/getUserRecording',
      data: {
        token: wx.getStorageSync('token'),
        type: that.data.type
      },
      method: 'post',
      success: function (res) {
        console.log(res)
        if (res.data.length == 0) {
          wx.showToast({
            title: '暂无数据',
            duration: 1500,
            icon: 'none'
          })
        }
        that.setData({
          msg: res.data
        })

      },
    })
  }
})