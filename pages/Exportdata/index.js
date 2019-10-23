const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showxiaoqu: false,
    showdong: false,
    showroom: false,
    communitylist: [],
    communitylist2: [],
    community: '',
    showmodal: false,
    showmsg: false,
    quname:'',
    dongname:'',
    email:'',
    id1:'',
    id2:''
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
  showxiaoqu: function () {
    this.setData({
      showxiaoqu: !this.data.showxiaoqu
    })
  },
  showdong: function () {
    this.setData({
      showdong: !this.data.showdong
    })
  },
  showroom: function () {
    this.setData({
      showroom: !this.data.showroom
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
  init(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/api/Community/getCommunity',
      data: {
        token:wx.getStorageSync('token'),

      },
      method: 'post', 
      success: function(res){
        that.setData({
          communitylist:res.data.data.community
        })
      },

    })
  },
  changQu(e){

    this.setData({
      quname:e.currentTarget.dataset.name,
      id1:e.currentTarget.dataset.id
    })
    let that=this;
    wx.request({
      url: app.globalData.url+'/api/Community/changeCommunity',
      data: {
        community_id:e.currentTarget.dataset.id
      },
      method: 'post', 
      success: function(res){
 
        that.setData({
          communitylist2:res.data.data.community
        })
     
      },

    })
  },
  changDong(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      dongname:e.currentTarget.dataset.name,
      id2:e.currentTarget.dataset.id
    })
  },
  daochu(){
    let that=this;
    console.log(this.data.id2)
    var emreg=/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
    if(that.data.email==''){
      wx.showToast({
        title:'邮箱不能为空',
        icon:'none'
      })
    }else if(emreg.test(that.data.email)==false){
      wx.showToast({
        title:'邮箱错误',
        icon:'none'
      })
    }
    else{
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.url+'/api/device/sendEmail',
        data: {
          community_id:that.data.id1,
          community_build_id:that.data.id2,
          token:wx.getStorageSync('token'),
          email:that.data.email
        },
        method: 'post',
        success: function(res){
          wx.hideLoading();
          that.setData({
            showmodal: true,
            showmsg: true,
          })
 
        },
  
      })
    }

  },
  emInput(e){
    this.setData({
      email:e.detail.value
    })
  }
})