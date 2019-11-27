const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose:!0,
    name:'',
    credit:'',
    fuze:'',
    tel:'',

    xingming:'',
    concat:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  change:function(e){
    var index = e.currentTarget.dataset.index
    if(index==0){
      this.setData({
        choose:!0
      })
    }else{
      this.setData({
        choose: !1
      })
    }
    this.setData({
      name:'',
      credit:'',
      fuze:'',
      tel:'',

      xingming:'',
      concat:''
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

  nameInput(e){
    this.setData({
      name:e.detail.value
    })
  },
  creditInput(e){
    this.setData({
      credit:e.detail.value
    })
  },
  fuzeInput(e){
    this.setData({
     fuze:e.detail.value
    })
  },
  telInput(e){
    this.setData({
      tel:e.detail.value
    })
  },

  xingmingInput(e){
    this.setData({
      xingming:e.detail.value
    })
  },
  concatInput(e){
    this.setData({
      concat:e.detail.value
    })
  },
  reply(){
    console.log(this.data.choose)
    let that=this;
    if(this.data.choose){
      if(this.data.name=='' || this.data.credit=='' || this.data.fuze=='' || this.data.tel==''){
        wx.showModal({
          title:'提示',
          content:'请完整填写信息',
          showCancel:false
        })
      }else if(!(/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(this.data.tel))){
        wx.showModal({
          title:'提示',
          content:'手机号格式错误',
          showCancel:false
        })
      } else{
        wx.request({
          url: app.globalData.url+'/api/user/becomeAdmin',
          data: {
            type:1,
            company_name:that.data.name,
            credit_code:that.data.credit,
            principal_name:that.data.fuze,
            principal_tel:that.data.tel,
            token:wx.getStorageSync('token')
          },
          method: 'post', 
          success: function(res){
              console.log(res)
              if(res.data.code==1){
                wx.showToast({
                  title:'申请成功',
                  icon:'success',
                  duration:1000
                })
              }else{
                wx.navigateTo({
                  url: "/pages/audit/index",
                })
              }
          },

        })
      }

    }else{
      if(this.data.xingming=='' || this.data.concat==''){
        wx.showModal({
          title:'提示',
          content:'请完整填写信息',
          showCancel:false
        })
      }else if(!(/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(this.data.concat))){
        wx.showModal({
          title:'提示',
          content:'手机号格式错误',
          showCancel:false
        })
      }
      else{
        wx.request({
          url: app.globalData.url+'/api/user/becomeAdmin',
          data: {
            type:2,
            contact_name:that.data.xingming,
            contact_tel:that.data.concat,
            token:wx.getStorageSync('token')
          },
          method: 'post', 
          success: function(res){
            console.log(res)
            if(res.data.code==1){
              wx.showToast({
                title:'申请成功',
                icon:'success',
                duration:1000
              })
              setTimeout(() => {
                wx.navigateTo({
                  url: "/pages/audit/index",
                })
              }, 1000);
            }else{
              wx.showToast({
                title: res.data.mes,
                icon:'none'
              })
            }
          },
  
        })
      }
    }
  }
})