const app = getApp(), 
r = require('../../utils/request.js'), 
// l = require('../../utils/login.js'), 
u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showxiaoqu: false,
    showdong: false,
    showroom: false,
    communitylist: [],
    donglist:[],
    roomlist:[],
    community_id: '',
    community_build_id:'',
    consignee: '',
    community: '',

   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     var that =this
    r.req(u + '/api/Community/getCommunity', {
        // token: wx.getStorageSync('token')
      }, 'post').then((res) => {
        console.log(res)
        that.setData({
          communitylist: res.data.community
        })
        console.log(res.data.community)
      })
 
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
  commChoose: function (e) {
    this.setData({
      showxiaoqu: true,
      community: this.data.communitylist[e.currentTarget.dataset.index].class_name,
      community_id: this.data.communitylist[e.currentTarget.dataset.index].community_id,
      community_build: ''
    })
    // console.log(this.data.communitylist[e.currentTarget.dataset.index]);
  },

  dongchoose:function(e){
    this.setData({
      showdong: true,
      community_build: this.data.donglist[e.currentTarget.dataset.index].class_name,
      community_build_id: this.data.donglist[e.currentTarget.dataset.index].community_build_id,
      // community_build: ''
    })
  },

  roomchoose:function(e){
    this.setData({
      showroom: true,
      community_room: this.data.roomlist[e.currentTarget.dataset.index].class_name
    })
  },

  bindSave: function (e) {
    console.log(e)
    var that = this

    // var community = e.detail.value.community;
    // var city = that.data.city_id;

    // var consignee = e.detail.value.consignee;
    // var telephone = e.detail.value.telephone;

    // if (community == "") {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请填写地区',
    //     showCancel: false
    //   })
    //   return
    // }



    // if (consignee == "") {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请填写联系人姓名',
    //     showCancel: false
    //   })
    //   return
    // }
    // if (telephone == "") {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请填写手机号码',
    //     showCancel: false
    //   })
    //   return
    // }

    // if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(telephone))) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '手机号格式错误',
    //     showCancel: false
    //   })
    //   return
    // }
   

    // if (address == "") {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请填写详细地址',
    //     showCancel: false
    //   })
    //   return
    // }

    r.req(u + '/api/user/bind', {
      community_id: that.data.communitylist,
      community_build_id: that.data.community_build,
      community_room_id: that.data.community_room,
      name: e.detail.value.consignee,
      tel: e.detail.value.telephone,
      password: e.detail.value.password,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      console.log(res)
      wx.showModal({
        title: '提示',
        content: '保存成功',
        showCancel: false
      })
        wx.navigateTo({
          url: '/pages/index/index',
        })
    }, 500)


  },






  showxiaoqu: function() {
    this.setData({
      showxiaoqu: !this.data.showxiaoqu
    })
  },


  showdong: function() {
    var that = this
    r.req(u + '/api/Community/changeCommunity', {
      community_id: that.data.community_id,
      // token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      console.log(res)
      that.setData({
        showdong: !this.data.showdong,
        donglist: res.data.community
      })
    })


    // this.setData({
    //   showdong: !this.data.showdong
    // })
  },



  showroom: function() {
    var that = this
    r.req(u + '/api/Community/changeCommunity', {
      community_id: that.data.community_id,
      community_build_id: that.data.community_build_id,
      // token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      console.log(res)
      that.setData({
        showroom: !this.data.showroom,
        roomlist: res.data.community
      })
    })

    // this.setData({
    //   showroom: !this.data.showroom
    // })
  },

  
  login: function() {
    app.globalData.is_admin = false
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})