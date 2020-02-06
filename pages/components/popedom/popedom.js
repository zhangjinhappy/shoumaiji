// pages/components/popedom/popedom.js
const app = getApp();
const http = require('/../../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
    this.queryHotel(e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var param = {};
    var index = 0;
    var that = this;
     param.employeeCode = app.globalData.userInfo.employeeCode;
    http.httpPost({
      // loading: '拼命请求中...',
      url: '//equipment/queryEmployeeArea',
      param: param,
      complete: function (res) {
        console.log("分区：",res)
        var list = res.data.data;
        console.log("list",list)
        var areaCodeList = [];
        var areaNameList = [];
        for (var i = 0; i < list.length;i++){
          areaCodeList.push(list[i].areaCode)
          areaNameList.push(list[i].areaName)
        }
        console.log("区名：", areaNameList)
        that.setData({
          areaCodeList,
          areaNameList
        })
        that.queryHotel(index)
      }
    })
   
  },
  /**
   * 查询指定分区内的酒店信息
   */
    queryHotel: function(index){
      console.log("index:",index)
      var param = {};
      param.employeeCode = app.globalData.userInfo.employeeCode;
      param.areaCode = this.data.areaCodeList[index]
      var that = this;
      http.httpPost({
        // loading: '拼命请求中...',
        url: '//equipment/queryAreaEquipment',
        param: param,
        complete: function (res) {
            console.log("区域酒店信息：",res)
            var hotelList = res.data.data;
            that.setData({
              hotelList
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

  }
})