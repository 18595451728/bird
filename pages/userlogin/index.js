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
    community_room_id: '',
    consignee: '',
    community: '',

   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     var that =this
    r.req(u + '/api/Community/getCommunity', {
        usertoken: wx.getStorageSync('token')
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
      community_build: '',
      community_room: ''
    })
    // console.log(this.data.communitylist[e.currentTarget.dataset.index]);
  },

  dongchoose:function(e){
    this.setData({
      showdong: true,
      community_build: this.data.donglist[e.currentTarget.dataset.index].class_name,
      community_build_id: this.data.donglist[e.currentTarget.dataset.index].community_build_id,
     community_room: ''
    })
  },

  roomchoose:function(e){
    this.setData({
      showroom: true,
      community_room: this.data.roomlist[e.currentTarget.dataset.index].class_name,
      community_room_id: this.data.roomlist[e.currentTarget.dataset.index].community_room_id,
    })
  },

  bindSave: function (e) {
    console.log(e)
    var that = this

    var community = that.data.community;
    var community_build = that.data.community_build;
    var community_room = that.data.community_room;
    
    var consignee = e.detail.value.consignee;
    var telephone = e.detail.value.telephone;
    var password = e.detail.value.password;
    
    if (community == "") {
      wx.showModal({
        title: '提示',
        content: '请选择小区',
        showCancel: false
      })
      return
    }
    if (community_build == "") {
      wx.showModal({
        title: '提示',
        content: '请选择幢',
        showCancel: false
      })
      return
    }

    if (community_room == "") {
      wx.showModal({
        title: '提示',
        content: '请选择门牌',
        showCancel: false
      })
      return
    }

    if (!consignee) {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }

    if (telephone == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return
    }

    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(telephone))) {
      wx.showModal({
        title: '提示',
        content: '手机号格式错误',
        showCancel: false
      })
      return
    }

    if (password == "") {
      wx.showModal({
        title: '提示',
        content: '请选择密码',
        showCancel: false
      })
      return
    }

   
    r.req(u + '/api/user/bind', {
      community_id: that.data.community_id,
      community_build_id: that.data.community_build_id,
      community_room_id: that.data.community_room_id,
      name: e.detail.value.consignee,
      tel: e.detail.value.telephone,
      password: e.detail.value.password,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      console.log(res)


      if (res.code == 1) {
        app.globalData.is_admin = false
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.mes,
          icon: 'none'
        })

      }
     

      // if(res.code==1){
      //   wx.showToast({
      //     title: res.mes,
      //     icon:'none'
      //   })
      //   setTimeout(function(){
      //      wx.navigateTo({
      //     url: '/pages/index/index',
      //   })
      //   },1000)
      // }
      // that.setData({
        // wx.showModal({
        //   title: '提示',
        //   content: '保存成功',
        //   showCancel: false
        // })
      // })
// >>>>>>> f8a97bb118e6ce6c2b90ae73d42e88436d56a15e
     
        // wx.navigateTo({
        //   url: '/pages/index/index',
        // })
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