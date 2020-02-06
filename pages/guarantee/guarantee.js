// pages/guarantee/guarantee.js
const http = require('/../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  scan: function () {
    console.log("---------------------------------------")
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
           if (res.data.code == 200) {
             var result = res.data.data;
             console.log("设备信息：" + result);
             var obj = JSON.stringify(result);
             console.log("================result===================");
             wx.navigateTo({
               url: '/pages/components/equipmentLoss/equipmentLoss?obj=' + obj,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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