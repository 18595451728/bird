const app = getApp(),
  r = require('../../utils/request.js'),
  u = app.globalData.url
//index.js
//获取应用实例

var is_change = false
Page({
  data: {
   
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
      showxiaoqu: !1,
      community: this.data.communitylist[e.currentTarget.dataset.index].class_name,
      community_id: this.data.communitylist[e.currentTarget.dataset.index].community_id,
      community_build:''
    })
    console.log(this.data.communitylist[e.currentTarget.dataset.index].community_id);


   
  },


  onLoad: function(e) {
    var that = this
    if(app.globalData.is_admin){
      r.req(u + '/api/Community/getCommunity', {
        token: wx.getStorageSync('token')
      }, 'post').then((res) => {
        console.log(res)
        if (res.code == 1) {
          that.setData({
            communitylist: res.data.community,
          })
        }else{
          that.setData({
            showinfo: false
          })
        }
      
      })
    }else{
      r.req(u +'/api/User/checkBind',{
        token:wx.getStorageSync('token')
      },'post').then(re=>{
        console.log(re)
        if(re.code==1){
          r.req(u + '/api/Device/deviceUser', {
            token: wx.getStorageSync('token')
          }, 'post').then((res) => {
            console.log(res)
            if (res.code == 1) {
              that.setData({
                devicelist: res.data.device,
                decicessum: res.data,
                is_open: res.data.device.device_status,
                is_time: res.data.device.device_status? res.data.device.time_status:!1,  
                star_time: res.data.device.star_time,
                end_time: res.data.device.end_time
              })
              console.log(res.data.device.star_time)
              var end_time = that.data.end_time, star_time = that.data.star_time, dd = star_time.split(':'), cc = end_time.split(':')
             
              that.setData({
                end_hour:parseInt(cc[0]),
                end_minute:parseInt(cc[1]),
                start_hour:parseInt(dd[0]),
                start_minute: parseInt(dd[1])
              })

  // var end_time = that.data.end_time, star_time = that.data.star_time
  //             console.log(end_time)
  //             // that.setData({
  //             //   end_hour:parseInt(cc[0]),
  //             //   end_minute:parseInt(cc[1]),
  //             //   start_hour:parseInt(dd[0]),
  //             //   start_minute: parseInt(dd[1])
  //             // })

            }
          })
        }else{
          that.setData({
            is_open:!1,
            notap:!0
          })
        }
      })
    }
    

    

   
  },

  // cutTime:function(){
  //   var aa = '11:30'
  //   var bb = aa.split(':')
  //   console.log(bb) 
  // },

  onShow: function() {
    this.onLoad();
    console.log(app.globalData.is_admin)
     this.setData({
       is_admin: app.globalData.is_admin
     })
     if(this.data.is_admin){
       this.init(); 
     }
    
     
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
    if(!this.data.notap){
      r.req(u +'/api/Device/deviceControl',{
        device_id: this.data.decicessum.device_id,
        device_status: this.data.is_open?0:1,
        token:wx.getStorageSync('token')
      },'post').then(res=>{
        console.log(res)
        if(res.code==1){
          this.setData({
            is_open: !this.data.is_open,
            is_time: !1
          })
        }else{
          wx.showToast({
            title: res.mes,
            icon:'none'
          })
        }
      })   
    }else{
      wx.showToast({
        title: '您尚未绑定房间',
        icon:'none'
      })
    }
    
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
    this.dingshi()
  },
  dingshi(){
    var that = this
    var isOpen = this.data.is_time

    if (isOpen) {
      r.req(u + '/api/device/deviceCrontab', {
        token: wx.getStorageSync('token'),
        device_id: this.data.decicessum.device_id,
        time_status: 1,
        star_time: this.data.start_hour + ':' + this.data.start_minute,
        end_time: this.data.end_hour + ':' + this.data.end_minute
      }, 'post').then(res => {
        console.log(res)
        wx.showToast({
          title: res.mes,
          icon: 'none'
        })
        if (res.code == 1) {
          that.setData({
            is_time: isOpen
          })
        }

      })
    }
  },
  handletouchtart: function(event) {
    this.data.lastY = event.touches[0].pageY
    // this.data.start_hour = this.data.star_time[0]
  
  },
  changetime: function() {
    var that = this
    // if (!this.data.is_time == 1) {
    //   r.req(u + '/api/device/deviceCrontab', {
    //     token: wx.getStorageSync('token'),
    //     device_id: this.data.decicessum.device_id,
    //     time_status: this.data.is_time,
    //     star_time: this.data.start_hour + ':' + this.data.start_minute,
    //     end_time: this.data.end_hour + ':' + this.data.end_minute
    //   }, 'post').then(res => {
    //     console.log(res)
    //   })
    // }
    if(this.data.is_open){
      var isOpen = this.data.is_time
      console.log(isOpen, this.data.decicessum)
      isOpen = !isOpen
      
      var that =this
        r.req(u + '/api/device/deviceCrontab', {
          token: wx.getStorageSync('token'),
          device_id: this.data.decicessum.device_id,
          time_status: isOpen ? 1 : 0,
          star_time: this.data.start_hour + ':' + this.data.start_minute,
          end_time: this.data.end_hour + ':' + this.data.end_minute
        }, 'post').then(res => {
          console.log(res)
          wx.showToast({
            title: res.mes,
            icon:'none'
          })
          if(res.code==1){
            that.setData({
              is_time: isOpen
            })
          }
          
        })
      }
    
    
  },
  upstarthour() {
    if (this.data.start_hour > 0) {
      this.setData({
        start_hour: this.data.start_hour - 1
      })
      this.dingshi()
    }
  },
  upstartminute() {
    if (this.data.start_minute > 0) {
      this.setData({
        start_minute: this.data.start_minute - 1
      })
      this.dingshi()
    }
  },
  upendhour() {
    if (this.data.end_hour > 0) {
      this.setData({
        end_hour: this.data.end_hour - 1
      })
      this.dingshi()
    }
  },
  upendminute() {
    if (this.data.end_minute > 0) {
      this.setData({
        end_minute: this.data.end_minute - 1
      })
      this.dingshi()
    }
  },
  downstarthour() {
    if (this.data.start_hour < 23) {
      this.setData({
        start_hour: this.data.start_hour + 1
      })
      this.dingshi()
    }
  },
  downstartminute() {
    if (this.data.start_minute < 59) {
      this.setData({
        start_minute: this.data.start_minute + 1
      })
      this.dingshi()
    }
  },
  downendhour() {
    if (this.data.end_hour < 23) {
      this.setData({
        end_hour: this.data.end_hour + 1
      })
      this.dingshi()
    }
  },

  downendminute() {

    if (this.data.end_minute < 59) {
      this.setData({
        end_minute: this.data.end_minute + 1
      })
      this.dingshi()
    }

  },
  searchCom(e) {
    var that = this
    if(!e.detail.value){
      this.setData({
        showxiaoqu: !1
      })
      return;
    }
    r.req(u + '/api/Community/getCommunity', {
      token: wx.getStorageSync('token'),
      keyword:e.detail.value
    }, 'post').then((res) => {
      console.log(res)
      if (res.code == 1 && res.data.community.length!=0) {
        that.setData({
          communitylist: res.data.community,
          showxiaoqu: !0
        })
      } else {
        that.setData({
          showinfo: false
        })
      }

    })
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
    if (that.data.community_id){
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
    }else{
      wx.showToast({
        title: '请先选择小区',
        icon:'none',
      })
    }
    

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