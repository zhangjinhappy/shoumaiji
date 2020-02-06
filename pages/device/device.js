// pages/device/device.js
const http = require('/../..//utils/http.js');

function getDevice (that) {
  wx.showLoading({
    title: '定位中',
    mark: true
  })
  wx.getLocation({
    type: 'gcj02',
    latitude: true,
    success: function (res) {
      that.setData({
        latitude: res.latitude,
        longitude: res.longitude
      })
    },
    fail: function (res) {
      wx.showToast({
        title: '定位失败',
        icon: 'none',
      })
    },
    complete: function () {
      wx.hideLoading()
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [
      {
        id: 4,
        latitude: 31.938841,
        longitude: 118.799698,
        width: 30,
        height: 30
      }
    ],
    array: [{id:0,name:"请选则区域"}],
    index: 0,
    dataList:[],
    result:{},
    roomName:"",
    scale: 16,
    latitude: '',
    longitude: '',
    importInput: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) { 
    var that = this   
    var param = {};
    getDevice(that)
    wx.getStorage({
      key: 'employeeCode',
      success: function (res) {
        console.log(res.data)
        param.employeeCode = res.data;
        http.httpPost({
          // loading: '拼命请求中...',
          url: '/employeeArea/queryAreaHotel',
          param: param,
          complete: function (res) {
            console.log(res)
            var array = []
            if (res.data.code === 200) {
              let data = res.data.data;
              for (let i = 0; i < data.length; i++) {
                var obj = {}
                obj.areaName = data[i].areaName.split("-").join("")
                obj.hotelName = data[i].hotelName
                obj.id = data[i].id
                obj.location = data[i].location
                obj.lattitude = data[i].lattitude
                obj.longtitude = data[i].longtitude
                array.push(obj)
              }
              console.log(array)
              that.setData({
                array,
                dataList:data
              })
            }
          }
        })
      },
    }); 
   

  },
  touTo: function (){
    let data = this.data.result
    console.log(data)//代表成功的数据。

    //  return wx.navigateTo({
    //    url: '/pages/components/TouSuccess/TouSuccess',
    //  })
  },
  //指定定位地点
  getLocation: function(){
    console.log(this.data.array)
    let index = this.data.index
    wx.openLocation({
      latitude: this.data.array[index].lattitude,//要去的纬度-地址
      longitude: this.data.array[index].longtitude,//要去的经度-地址
    })
  },
  saoma:function(){
    var that = this
    let index = that.data.index
    let dataList = that.data.dataList
    console.log(that.data.dataList[index])
    if (that.data.roomName ===""){
      return wx.showToast({
        icon: 'none',
        title: "请填写房间号",
      })
      
    }
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrcode'],
      success: function (res) {
        console.log("RES:" + res.result)
        var ff = {
          'equipmentCode': res.result
        }
        var param = JSON.stringify(ff);
        http.httpPost({
          // loading: '拼命请求中...',
          url: '/equipmentReplenishment/replenishSweepCode',
          param: param,
          complete: function (res) {
            console.log("==============aaaaaaaaaaaa======================")
            console.log("RES信息data：", res);
            if (res.data.code === 200) {
              that.setData({
                importInput:false
              })
              var result = res.data.data;
              console.log("设备信息：", result) 
              that.setData({
                result
              })
              
            } else {
              wx.showToast({
                icon: 'none',
                title: res.message,
              })
            }
          }
        })
      }
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

  // 验证信息
  homeCode:function (e) {
    console.log("顾客输入的房间号！",e.detail.value)
    var homeCode = e.detail.value;
    this.setData({
      roomName
    })
  }
})