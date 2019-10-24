const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:'',
    jine:''
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
  jineInput(e){
    this.setData({
      jine:e.detail.value
    })
  },
  usemsg:function(){
    wx.navigateTo({
      url: '/pages/usemsg/index',
    })
  },
  chongzhi(){
    let that=this;
    if(this.data.jine==''){
      wx.showToast({
        title:'金额不能为空',
        icon:'none',
        duration:1000
      })
    }else{
      wx.request({
        url: app.globalData.url+'/api/User/recharge',
        data: {
          token:wx.getStorageSync('token'),
          amount:that.data.jine
        },
        method: 'post', 
        success: function(res){
          var a=res.data.data.order_no
          that.setOrder(a);
        },
      })
    }

  },
  setOrder(orderno){

    let that=this;
    wx.request({
      url: app.globalData.url+'/api/pay/wxPay',
      data: {
        order_no:orderno,
        token:wx.getStorageSync('token')
      },
      method: 'post',
      success: function(res){
        if(res.data.status=='1'){
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp+'',
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            success: function(res){
                console.log(res)
                wx.showToast({
                  title:'充值成功',
                  icon:'success'
                })
                that.init();
            },
          })
        }
      },

    })
  },
  init(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/api/user/center',
      data: {
        token:wx.getStorageSync('token')
      },
      method: 'post',
      success: function(res){
        console.log(res)
        that.setData({
          userinfo:res.data.data.user
        })
      },

    })
  }
})