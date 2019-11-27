const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feng_one: 0,
    feng_two: 4,
    feng_three: 6,
    feng_four: 9,
    gu_one: 0,
    gu_two: 4,
    gu_three: 6,
    gu_four: 9,
    lastY: 0,
    showmodal: false,
    showmsg: !1,
    chooseStyle:0,
    commu:['绿城理想家','西湖杨柳郡'],
    xiaoqu:[],
    community_id:'',
    high_price:'',
    low_price:'',
    dlList:[]
  },
  bto:function(){
    let that=this;
    var highPrice=that.data.feng_one+'.'+that.data.feng_two+''+that.data.feng_three+''+that.data.feng_four;
    var lowPrice=that.data.gu_one+'.'+that.data.gu_two+''+that.data.gu_three+''+that.data.gu_four

    console.log(that.data.community_id)
    if(lowPrice>highPrice){
      wx.showModal({
        title:'提示',
        content:'谷电价必须小于等于峰电价',
        showCancel:false
      })
    }
    else{
      if(this.data.chooseStyle==0){
        wx.request({
          url: app.globalData.url+'/api/Landlord/setElectricityPrice',
          data: {
            token:wx.getStorageSync('token'),
            high_price:highPrice,
            low_price: lowPrice,
            type:1,
            
          },
          method: 'POST', 
          success: function(res){
           console.log(res)
           if(res.data.code ==1){
             that.setData({
               showmsg: !0
             })
           }else{
             wx.showToast({
               title: res.data.mes,
               icon:'none'
             })
           }
           
          },
        })
      }else if(this.data.chooseStyle=='1'){
        if(that.data.community_id==''){
          wx.showModal({
            title:'提示',
            content:'请选择小区',
            showCancel:false
          })
        }else{
          wx.request({
            url: app.globalData.url+'/api/Landlord/setElectricityPrice',
            data: {
              token:wx.getStorageSync('token'),
              community_id:that.data.community_id,
              high_price:highPrice,
              low_price: lowPrice,
              type:2
            },
            method: 'POST', 
            success: function(res){
              console.log(res)
              if(res.data.code==1){
                that.setData({
                  showmsg: !0
                })
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
 


  },
  bindPickerChange:function(e){
   
    this.setData({
      community: this.data.commu[e.detail.value],
      community_id:this.data.xiaoqu[e.detail.value].community_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  chooseStyle:function(e){
    var style = e.currentTarget.dataset.style
    this.setData({
      chooseStyle:style
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
    this.init();
    this.initFeng();
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
  initFeng(){
    let that=this;
    wx.request({
      url:app.globalData.url+'/api/landlord/priceGet',
      data: {
        token:wx.getStorageSync('token')
      },
      method: 'POST', 
      success: function(res){


        if(res.data.data!=''){
          that.setData({
            feng_one:parseInt(res.data.data[0].high_price.split("")[0] ? res.data.data[0].high_price.split("")[0] : '0'),
            feng_two:parseInt(res.data.data[0].high_price.split("")[2] ? res.data.data[0].high_price.split("")[2] : '0'),
            feng_three:parseInt(res.data.data[0].high_price.split("")[3] ? res.data.data[0].high_price.split("")[3] : '0'),
            feng_four:parseInt(res.data.data[0].high_price.split("")[4] ? res.data.data[0].high_price.split("")[4] : '0'),


            gu_one:parseInt(res.data.data[0].low_price.split("")[0] ? res.data.data[0].low_price.split("")[0] : '0'),
            gu_two:parseInt(res.data.data[0].low_price.split("")[2] ? res.data.data[0].low_price.split("")[2] : '0'),
            gu_three:parseInt(res.data.data[0].low_price.split("")[3] ? res.data.data[0].low_price.split("")[3] : '0'),
            gu_four:parseInt(res.data.data[0].low_price.split("")[4] ? res.data.data[0].low_price.split("")[4] : '0'), 

            dlList:res.data.data
          })
        }
      },
    })
  },
  init(){
    let arr=[]
    let that=this;
    wx.request({
      url:app.globalData.url+'/api/Community/getCommunity',
      data: {
        token:wx.getStorageSync('token')
      },
      method: 'POST', 
      success: function(res){
        console.log(res)
  
        res.data.data.community.forEach(function(item,index){
          arr.push(item.class_name)
        })
        that.setData({
          xiaoqu:res.data.data.community,
          commu:arr
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  up_feng_one: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == '1') {
      if (this.data.feng_one > 0) {
        this.setData({
          feng_one: this.data.feng_one - 1
        })
      }
    } else {
      if (this.data.gu_one > 0) {
        this.setData({
          gu_one: this.data.gu_one - 1
        })
      }
    }
  },
  down_feng_one: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == '1') {
      if (this.data.feng_one < 1) {
        this.setData({
          feng_one: this.data.feng_one + 1
        })
      }
    } else {
      if (this.data.gu_one < 1) {
        this.setData({
          gu_one: this.data.gu_one + 1
        })
      }
    }
  },
  up_feng_two: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == "1") {
      if (this.data.feng_two > 0) {
        this.setData({
          feng_two: this.data.feng_two - 1
        })
      }
    } else {
      if (this.data.gu_two > 0) {
        this.setData({
          gu_two: this.data.gu_two - 1
        })
      }
    }
  },
  down_feng_two: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == "1") {
      if (this.data.feng_two < 9) {
        this.setData({
          feng_two: this.data.feng_two + 1
        })
      }
    } else {
      if (this.data.gu_two < 9) {
        this.setData({
          gu_two: this.data.gu_two + 1
        })
      }
    }
  },
  up_feng_three: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == "1") {
      if (this.data.feng_three > 0) {
        this.setData({
          feng_three: this.data.feng_three - 1
        })
      }
    } else {
      if (this.data.gu_three > 0) {
        this.setData({
          gu_three: this.data.gu_three - 1
        })
      }
    }
  },
  down_feng_three: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == "1") {
      if (this.data.feng_three < 9) {
        this.setData({
          feng_three: this.data.feng_three + 1
        })
      }
    } else {
      if (this.data.gu_three < 9) {
        this.setData({
          gu_three: this.data.gu_three + 1
        })
      }
    }
  },
  up_feng_four: function(e) {
    var id = e.currentTarget.dataset.id
    if (id == "1") {
      if (this.data.feng_four > 0) {
        this.setData({
          feng_four: this.data.feng_four - 1
        })
      }
    } else {
      if (this.data.gu_four > 0) {
        this.setData({
          gu_four: this.data.gu_four - 1
        })
      }
    }
  },
  down_feng_four: function(e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    if (id == "1") {
      if (this.data.feng_four < 9) {
        this.setData({
          feng_four: this.data.feng_four + 1
        })
      }
    } else {
      if (this.data.gu_four < 9) {
        this.setData({
          gu_four: this.data.gu_four + 1
        })
      }
    }
  },
  handletouchmove: function(event) {
    var id = event.currentTarget.dataset.id
    let currentY = event.touches[0].pageY
    let ty = currentY - this.data.lastY
    if (ty < 0) {
      if (id == '0' && this.data.feng_one < 9) {
        this.setData({
          feng_one: this.data.feng_one + 1
        })
      }
      if (id == '1' && this.data.feng_two < 9) {
        this.setData({
          feng_two: this.data.feng_two + 1
        })
      }
      if (id == '2' && this.data.feng_three < 9) {
        this.setData({
          feng_three: this.data.feng_three + 1
        })
      }
      if (id == '3' && this.data.feng_four < 9) {
        this.setData({
          feng_four: this.data.feng_four + 1
        })
      }
      if (id == '4' && this.data.gu_two < 9) {
        this.setData({
          gu_two: this.data.gu_two + 1
        })
      }
      if (id == '5' && this.data.gu_three < 9) {
        this.setData({
          gu_three: this.data.gu_three + 1
        })
      }
      if (id == '6' && this.data.gu_four < 9) {
        this.setData({
          gu_four: this.data.gu_four + 1
        })
      }
      if (id == '7' && this.data.gu_one < 9) {
        this.setData({
          gu_one: this.data.gu_one + 1
        })
      }
    } else if (ty > 0) {
      if (id == '0' && this.data.feng_one >0) {
        this.setData({
          feng_one: this.data.feng_one - 1
        })
      }
      if (id == '1' && this.data.feng_two > 0) {
        this.setData({
          feng_two: this.data.feng_two - 1
        })
      }
      if (id == '2' && this.data.feng_three > 0) {
        this.setData({
          feng_three: this.data.feng_three - 1
        })
      }
      if (id == '3' && this.data.feng_four > 0) {
        this.setData({
          feng_four: this.data.feng_four - 1
        })
      }

      if (id == '4' && this.data.gu_two > 0) {
        this.setData({
          gu_two: this.data.gu_two -1
        })
      }
      if (id == '5' && this.data.gu_three > 0) {
        this.setData({
          gu_three: this.data.gu_three - 1
        })
      }
      if (id == '6' && this.data.gu_four >0) {
        this.setData({
          gu_four: this.data.gu_four - 1
        })
      }
      if (id == '7' && this.data.gu_one >0) {
        this.setData({
          gu_one: this.data.gu_one - 1
        })
      }
    }
    //将当前坐标进行保存以进行下一次计算
    this.data.lastY = currentY
  },
  handletouchtart: function(event) {
    this.data.lastY = event.touches[0].pageY
  },
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showmodal: false,
      showmsg: false,
    });
  },
  backmine: function() {
    wx.navigateBack({
      delta: 1
    })
  }
})