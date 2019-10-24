const app = getApp(),
  r = require('../../utils/request.js'),
  u = app.globalData.url
//index.js
//获取应用实例

var is_change = false
Page({
  data: {
    is_open: true,
    // money: '37.66',
    is_time: true,
    start_minute: 11,
    start_hour: 11,
    end_hour: 12,
    end_minute: 30,
    lastY: 0,
    is_admin: true,
    showxiaoqu: false,
    showdong: false,
    showroom: false,
    communitylist:[],
    donglist:[],
    community: '',
    community_build:'',
    community_build_id:'',
    community_id:'',
    showinfo:false,
    // list:['','',''],
    showmodal: false,
    showcoupon: false,
  },



  commChoose: function (e) {
    this.setData({
      showxiaoqu: true,
      community: this.data.communitylist[e.currentTarget.dataset.index].class_name,
      community_id: this.data.communitylist[e.currentTarget.dataset.index].community_id,
      community_build:''
    })
    console.log(this.data.communitylist[e.currentTarget.dataset.index].community_id);


   
  },


  onLoad: function(e) {
    var that = this
    r.req(u + '/api/Community/getCommunity', {
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      console.log(res)
      that.setData({
        communitylist: res.data.community,
      })
    })

    r.req(u + '/api/Device/deviceUser', {
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      console.log(res)
      that.setData({
        devicelist: res.data.device,
        decicessum:res.data,
        is_open: res.data.device.device_status,
      })

      // if (res.data.device.power == null) {
      //   console.log(1211)
      //   res.data.device.power 0.00
      // }

      console.log(res.data.device.device_status)
      console.log(res.data)
    })

   
  },


  onShow: function() {
     this.setData({
       is_admin: app.globalData.is_admin
     })
    this.init();
     
  },



  dongchoose: function (e) {
    this.setData({
      showdong: true,
      community_build: this.data.donglist[e.currentTarget.dataset.index].class_name,
      community_build_id: this.data.donglist[e.currentTarget.dataset.index].community_build_id,
    })
  
  },
     
  init(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/api/Landlord/is_use_card',
      data: {
        token:wx.getStorageSync('token')
      },
      method: 'POST', 
      success: function(res){
        // success
        console.log(res)
        that.setData({
          showcoupon:res.data.data.is_use_card==0 ?  true : false
        })
      },
    })
  },






  changestate() {
    this.setData({
      is_open: !this.data.is_open,
      is_time: false
    })
  },
  handletouchmove: function(event) {
    var id = event.currentTarget.dataset.id
    is_change = true
    let currentY = event.touches[0].pageY
    let ty = currentY - this.data.lastY
    if (ty < 0 && is_change) {
      if (id == '0' && this.data.start_hour < 23) {
        this.setData({
          start_hour: this.data.start_hour + 1
        })
      }
      if (id == '1' && this.data.start_minute < 59) {
        this.setData({
          start_minute: this.data.start_minute + 1
        })
      }
      if (id == '2' && this.data.end_hour < 23) {
        this.setData({
          end_hour: this.data.end_hour + 1
        })
      }
      if (id == '3' && this.data.end_minute < 59) {
        this.setData({
          end_minute: this.data.end_minute + 1
        })
      }
    } else if (ty > 0 && is_change) {
      if (id == '0' && this.data.start_hour > 0) {
        this.setData({
          start_hour: this.data.start_hour - 1
        })
      }
      if (id == '1' && this.data.start_minute > 0) {
        this.setData({
          start_minute: this.data.start_minute - 1
        })
      }
      if (id == '2' && this.data.end_hour > 0) {
        this.setData({
          end_hour: this.data.end_hour - 1
        })
      }
      if (id == '3' && this.data.end_minute > 0) {
        this.setData({
          end_minute: this.data.end_minute - 1
        })
      }
    }
    //将当前坐标进行保存以进行下一次计算
    this.data.lastY = currentY
    is_change = false
  },
  handletouchtart: function(event) {
    this.data.lastY = event.touches[0].pageY
  },
  changetime: function() {
    if (this.data.is_open) {
      this.setData({
        is_time: !this.data.is_time
      })
    }
  },
  upstarthour() {
    if (this.data.start_hour > 0) {
      this.setData({
        start_hour: this.data.start_hour - 1
      })
    }
  },
  upstartminute() {
    if (this.data.start_minute > 0) {
      this.setData({
        start_minute: this.data.start_minute - 1
      })
    }
  },
  upendhour() {
    if (this.data.end_hour > 0) {
      this.setData({
        end_hour: this.data.end_hour - 1
      })
    }
  },
  upendminute() {
    if (this.data.end_minute > 0) {
      this.setData({
        end_minute: this.data.end_minute - 1
      })
    }
  },
  downstarthour() {
    if (this.data.start_hour < 23) {
      this.setData({
        start_hour: this.data.start_hour + 1
      })
    }
  },
  downstartminute() {
    if (this.data.start_minute < 59) {
      this.setData({
        start_minute: this.data.start_minute + 1
      })
    }
  },
  downendhour() {
    if (this.data.end_hour < 23) {
      this.setData({
        end_hour: this.data.end_hour + 1
      })
    }
  },
  downendminute() {
    if (this.data.end_minute < 59) {
      this.setData({
        end_minute: this.data.end_minute + 1
      })
    }
  },
  showxiaoqu: function () {
    this.setData({
      showxiaoqu: !this.data.showxiaoqu
    })
  },
  showdong: function () {
    // this.setData({
    //   showdong: !this.data.showdong
    // })
    var that=this
    r.req(u + '/api/Community/changeCommunity', {
      community_id: that.data.community_id,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      console.log(res)
      that.setData({
        showdong: !this.data.showdong,
        donglist: res.data.community
      })
    })

  },


  showinfo:function(e){
    console.log(e)
    var that = this
    var community = that.data.community;
    var community_build = that.data.community_build;
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

    // this.setData({
    //   showinfo: true
    // })


    r.req(u + '/api/device/deviceLandlord', {
      community_id: that.data.community_id,
      community_build_id: that.data.community_build_id,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
       console.log(res)
      that.setData({
        showinfo: true,
        dedevicebox:res.data,
        community_device: res.data.community_device
      })
      console.log(res.data.community_device)
     

      // wx.showModal({
      //   title: '提示',
      //   content: '查看成功',
      //   showCancel: false
      // })
      // wx.navigateTo({
      //   url: '/pages/index/index',
      // })

    }, 500)

  },


  changeselect:function(){
    this.setData({
      showinfo: false
    })
  },
  preventTouchMove: function () { },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showmodal: false,
      showcoupon: false,
    });
  },
  gouserinfo:function(){
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  },
    userCoupon(){
      let that=this;
      wx.request({
        url: app.globalData.url+'/api/Landlord/useCard',
        data: {
          token:wx.getStorageSync('token')
        },
        method: 'POST', 
        success: function(res){
          wx.showToast({
            title:'使用成功',
            icon:'success',
            duration:1000
          })
          that.init();
        },
  
      })
    }
})