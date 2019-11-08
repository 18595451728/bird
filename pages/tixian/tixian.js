const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose: !0,
    name: '',
    credit: '',
    fuze: '',
    tel: '',

    xingming: '',
    concat: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var money=options.money
    this.setData({
      type: app.globalData.is_admin?2:1,
      money: money
    })
  },
  change: function (e) {
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      this.setData({
        choose: !0
      })
    } else {
      this.setData({
        choose: !1
      })
    }
    this.setData({
      name: '',
      credit: '',
      fuze: '',
      tel: '',

      xingming: '',
      concat: ''
    })
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

  name(e) {
    this.setData({
      name: e.detail.value
    })
  },
  tel(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  zhifubao(e) {
    this.setData({
      zhifubao: e.detail.value
    })
  },
  cardname(e) {
    this.setData({
      cardname: e.detail.value
    })
  },

  cardtel(e) {
    this.setData({
      cardtel: e.detail.value
    })
  },
  bank(e) {
    this.setData({
      bank: e.detail.value
    })
  },
  bankcard(e) {
    this.setData({
      bankcard: e.detail.value
    })
  },
  reply() {

    if(this.data.choose){
      var data ={
        type: this.data.type,
        token: wx.getStorageSync('token'),
        way: 1,
        name:this.data.name,
        tel: this.data.tel,
        account_number:this.data.zhifubao,
        amount:this.data.money
      }
    }else{
      var data = {
        type: this.data.type,
        token: wx.getStorageSync('token'),
        way: 2,
        name: this.data.cardname,
        tel: this.data.cardtel,
        account_number: this.data.bankcard,
        amount: this.data.money,
        bank_name:bank
      }
    }

    wx.request({
      url: app.globalData.url +'/api/withdraw/withdraw',
      method:'post',
      data:data,
      success:function(res){
        console.log(res)
        if(res.data.code==1){
          wx.showToast({
            title: '提现成功',
            icon: 'none'
          })
        }else{
          wx.showToast({
            title: res.data.mes,
            icon:'none'
          })
        }
      }
    })
  }
})