const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectindex: 0,
    msg: [],
    type:0,
    admin:false
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

    this.setData({
      type: this.data.admin ? 1 :0
    })
    if(wx.getStorageSync('adminChongzhi')==true){
      this.setData({
        admin:true,
        type:1,
        selectindex:1
      })
      this.init2();
    }else{
      this.init();
    }
    console.log(this.data.admin)

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
    wx.removeStorageSync('adminChongzhi')
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
  changetype(e) {
    var id = e.currentTarget.dataset.id
    this.setData({
      selectindex: Number(id),
      type:Number(id)
    })
    if(wx.getStorageSync('adminChongzhi')==true){
      if(id==2){
        this.tixian();
      }else{
        this.init2();
      }
      
    }else{
      if(id==2){
        this.tixian();
      }else{
        this.init();
      }
      
    }
  },
  tixian(){
    var that=this
    wx.request({
      url: app.globalData.url+'/api/Withdraw/record',
      data:{
        token:wx.getStorageSync('token'),
        type: this.data.admin ? 2 : 1,
      },
        method:'post',
        success:function(res){
          console.log(res.data)
          if(res.data.code==1){
            if(res.data.data.data.length==0){
              wx.showToast({
                title: '暂无数据',
                icon: 'none'
              }) 
            }
            that.setData({
              msg: res.data.data.data
            })
            
          }else{
            wx.showToast({
              title: res.data.mes,
              icon:'none'
            })
          }
        }
      
    })
  },
  init(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/api/user/userRecord',
      data: {
        token:wx.getStorageSync('token'),
        type:that.data.type
      },
      method: 'post',
      success: function(res){
        console.log(res)
        if(res.data.data.length==0){
          wx.showToast({
            title: '暂无数据',
            duration:1500,
            icon:'none'
          })
        }
          that.setData({
            msg:res.data.data
          })
          
      },
    })
  },
  init2(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/api/Landlord/Record',
      data: {
        token:wx.getStorageSync('token'),
        type:that.data.type
      },
      method: 'post',
      success: function(res){
        console.log(res)
        if(res.data.data.length==0){
          wx.showToast({
            title: '暂无数据',
            duration:1500,
            icon:'none'
          })
        }
          that.setData({
            msg:res.data.data
          })
          
      },
    })
  }
})