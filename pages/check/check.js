// pages/check/check.js
import * as echarts from '../ec-canvas/echarts';

// function initChart(canvas, width, height) {
//   const chart = echarts.init(canvas, null, {
//     width: width,
//     height: height
//   });
//   canvas.setChart(chart);

//   var option = {
//     title: {
//       text: '(度)',
//       left: 0,
//       top: 20,
//       textStyle: {
//         fontWeight: '400',
//         fontSize: 12,
//         color: '#989898'
//       },
//     },
//     color: ['#eb5e2b', '#f5aa33'],
//     legend: {},
//     tooltip: {},
//     dataset: {
//       source: [
//         // ['product', '峰值', '谷值'],
//         ['10', 10.25, 6.8],
//         ['11', 10.25, 6.8],
//         ['12', 10.25, 6.8],
//         ['13', 10.25, 6.8],
//         ['14', 10.25, 6.8],
//         ['15', 10.25, 6.8],
//         ['16', 10.25, 6.8]
//       ]
//     },
//     xAxis: {
//       type: 'category'
//     },
//     yAxis: {
//       type: 'value',
//       min: 0,
//       max: 16,
//       splitNumber: 8
//     },
//     // Declare several bar series, each will be mapped
//     // to a column of dataset.source by default.
//     series: [{
//         type: 'bar',
//         barGap: 0
//       },
//       {
//         type: 'bar',
//         barGap: 0
//       }
//     ]
//   };
//   chart.setOption(option);
//   return chart;
// }

function getOption(xData, data_cur, data_his) {
  var option = {

    
    textStyle: {
      fontWeight: '400',
      fontSize: 12,
      color: '#989898'
    },
    color: ['#eb5e2b', '#f5aa33'],
    legend: {},
    tooltip: {},
    grid: {
      top: '14%',
      left: '0',
      right: '10',
      bottom: '10rpx',
      containLabel: true
    },
    dataset: {
      source: [
        // ['product', '峰值', '谷值'],
        ['10', 10.25, 6.8],
        ['11', 10.25, 6.8],
        ['12', 10.25, 6.8],
        ['13', 10.25, 6.8],
        ['14', 10.25, 6.8],
        ['15', 10.25, 6.8],
        ['16', 10.25, 6.8]
      ]
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        fontSize: '12'
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 16,
      splitNumber: 8,
      name: '(度)',
      axisLabel: {
        fontSize: '13'
      }
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{
        lable: {
          normal: {
            rich: {}
          }
        },
        type: 'bar',
        barGap: 0
      },
      {
        lable: {
          normal: {
            fontSize: 28,
            rich: {}
          }
        },
        type: 'bar',
        barGap: 0
      }
    ]
  };
  return option;
}

let chartLine;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: function(canvas, width, height) {
        //初始化echarts元素，绑定到全局变量，方便更改数据
        chartLine = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chartLine);

        //可以先不setOption，等数据加载好后赋值，
        //不过那样没setOption前，echats元素是一片空白，体验不好，所有我先set。
        var option = getOption();
        chartLine.setOption(option);
      }
    },
    scrollLeft: '',
    choose: 0,
    time: ['日', '月', '年'],
    currentTab: -1,
    currentTab1: -1,
    year: 2019,
    month: 9,
    days: '',
    dian: !0,
    is_admin: true,
    is_select: false,
    communitylist: ['', '', '', '', '', ''],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCurrentTime();
  },
  choose: function(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      choose: index
    })
  },
  changeTab: function(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      currentTab: index,
      currentTab1: index
    })
    console
      .log(this.data.year, this.data.month, index + 1)
  },
  bindscroll: function(e) {
    console.log(e.detail.scrollLeft)
  },
  dian: function(e) {
    if (e.currentTarget.dataset.index) {
      this.setData({
        dian: !0
      })
      this.updatemsg("(度)")
    } else {
      this.setData({
        dian: !1
      })
      this.updatemsg("(元)")
    }
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
      is_admin: app.globalData.is_admin
    })
    if (!this.data.is_admin) {
      this.setData({
        is_select: true
      })
    }
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
  getCurrentTime: function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var days = new Date(year, month, 0).getDate()
    this.setData({
      year: year,
      month: month,
      currentTab: day - 1,
      currentTab1: day - 1,
      days: days
    })
    console.log(year, month, day, days)
    var that = this
    setTimeout(function() {
      that.setData({
        scrollLeft: 'currentTime'
      })
    }, 1)
  },
  prevMonth: function() {
    var year = this.data.year,
      month = this.data.month
    month--;
    if (month < 1) {
      month = 12;
      year--;
    }
    var days = new Date(year, month, 0).getDate()
    console.log(days)
    this.setData({
      year: year,
      month: month,
      days: days,
      currentTab1: this.data.currentTab1
    })
    var that = this
    setTimeout(function() {
      that.setData({
        scrollLeft: 'currentTime'
      })
    }, 1)
  },
  nextMonth: function() {
    var year = this.data.year,
      month = this.data.month
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
    var days = new Date(year, month, 0).getDate()
    console.log(days)
    this.setData({
      year: year,
      month: month,
      days: days,
      currentTab1: this.data.currentTab1
    })
    var that = this
    setTimeout(function() {
      that.setData({
        scrollLeft: 'currentTime'
      })
    }, 1)
  },
  updatemsg: function(text) {
    var option = getOption();
    chartLine.setOption(option);
    //如果上面初始化时候，已经chartLine已经setOption了，
    //那么建议不要重新setOption，官方推荐写法，重新赋数据即可。
    chartLine.setOption({
      yAxis: {
        name: text,
      },
    });
  },
  daochu: function() {
    wx.navigateTo({
      url: '/pages/Exportdata/index',
    })
  },
  showinfo: function() {
    this.setData({
      is_select: true
    })
  },
  changeitem: function() {
    this.setData({
      is_select: false
    })
  },
  showxiaoqu: function() {
    this.setData({
      showxiaoqu: !this.data.showxiaoqu
    })
  },
  showdong: function() {
    this.setData({
      showdong: !this.data.showdong
    })
  },
})