// pages/components/equipment/equipment.js
const http = require('/../../../utils/http.js');
const util = require('/../../../utils/util.js');
const app = getApp()
function getLocation(lattitude, longtitude) {
  console.log(lattitude)
  console.log(longtitude)
  wx.openLocation({
    latitude: lattitude,//要去的纬度-地址
    longitude: longtitude,//要去的经度-地址
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaCodeList:[],
    areaNameList:[],
    index:0,
    count:0,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var param = JSON.stringify(options);
    var that = this;
    this.queryAera(that,param); 
  },
  //查询分区
  queryAera: function (that,param){
    console.log("参数：" + param);
    var areaCodeList = [];
    var areaNameList = [];
    var areaEquipmentList = [];
    var count = 0;
    var areaCount = 0;
    var result = "";
    http.httpPost({
      // loading: '拼命请求中...',
      url: '/equipment/queryEmployeeArea',
      param: param,
      complete: function (res) {
        console.log("返回值：", res);
        var result = res.data.data;
        console.log("result", res.data.data);
        for (var i = 0; i < result.length; i++) {
          areaCodeList.push(result[i].areaCode);
          areaNameList.push(result[i].areaName);
        }
        that.setData({
          areaCodeList,
          areaNameList,
        })
      }
    })
    var index = 0;
    http.httpPost({
      // loading: '拼命请求中...',
      url: '/equipment/queryEquipment',
      param: param,
      complete: function (res) {
        console.log("返回值：", res);
         result = res.data.data;
        console.log("allResult", res.data.data);
        that.setData({
          count :result.length,
        })
        that.queryAreaEquipment(index)
      }
    })
  }, 
  //选择点击事件
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.queryAreaEquipment(e.detail.value)
  },
  //查询区域设备
  queryAreaEquipment: function(index){
    console.log("index:",index)
    var param = {};
    param.employeeCode = app.globalData.userInfo.employeeCode;
    param.areaCode = this.data.areaCodeList[index];
    var that = this;
    http.httpPost({
      // loading: '拼命请求中...',
      url: '/equipment/queryAreaEquipment',
      param: param,
      complete: function (res) {
        console.log("区域设备信息：",res);
        var areaEquipmentList = res.data.data;
        var areaName = areaEquipmentList[index].areaName.split("-")[2];
        var areaCount = areaEquipmentList.length;
        that.setData({
          areaEquipmentList,
          areaName,
          areaCount
        })
      }
    })
  },
  msgTo: function(e){
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    console.log(id)
    let hotelCode = id.hotelCode
    console.log(hotelCode)
    let param = {}
    param.hotelCode = hotelCode
    wx.getStorage({
      key: 'employeeCode',
      success: function (res) {
        console.log(res.data)
        param.employeeCode = res.data;
        http.httpPost({
          // loading: '拼命请求中...',
          url: '/equipment/adressNavigation',
          param: param,
          complete: function (res) {
            if (res.data.code ===200) {
              const data = res.data.data;
              const lattitude = data.lattitude
              const longtitude = data.longtitude
              getLocation(lattitude, longtitude)
            }
          }
        })
      },

    }); 
   
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

  }
})