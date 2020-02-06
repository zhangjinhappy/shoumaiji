// pages/replenish/replenish.js
const http = require('/../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:-1
  },
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
     let that= this
     wx.getStorage({
        key: 'userMessage',
        success: function (res) {
          console.log("获取userMessage",res)
          const status = res.data.status
          console.log(status)
          that.setData({
             status
          })
        }
    })
  },
  
  scan: function () {
    var that = this;
    console.log("获取data里面的数据",that.data.status)
    if (that.data.status === "1"){
       console.log(111111111111)
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
              if (res.data.code == 200) {
                var result = res.data.data;
                wx.setStorageSync('replenishMessage', result)
                console.log("设备信息：" , result);
                var obj = JSON.stringify(result);
                console.log("================result===================");
                wx.navigateTo({
                  url: '/pages/components/replenishmentDetail/replenishmentDetail?obj=' + obj,
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
    }else{
      if (that.data.status === "0"){
        return that.showPopup()
      }
      
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.popup = this.selectComponent("#popup");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  showPopup() {
    this.popup.showPopup();
  },

  //取消事件
  _error() {
    console.log('你点击了取消');
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    console.log('你点击了确定');
    wx.navigateTo({
      url: '/pages/components/certificates/certificates',
    })
    this.popup.hidePopup();
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