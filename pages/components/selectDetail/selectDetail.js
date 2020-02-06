// pages/components/selectDetail/selectDetail.js
const http = require('/../../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:[],
    list:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.list){
      const list = options.list
      console.log(list)
      this.setData({
        list
      })
    }
    var that = this
    http.httpPost({
      // loading: '拼命请求中...',
      url: '/equipmentReplenishment/productList',
      complete: function (res) {
        console.log("商品信息：",res.data.data);
        var result = res.data.data;
        that.setData({
          result,
        }) 
      }
      
    })
  },
  myImage: function (e) {
    console.log(e.currentTarget.dataset.img)
    const img = e.currentTarget.dataset.img
    console.log(img)
    wx.navigateTo({
      url: '/pages/components/replenishmentDetail/replenishmentDetail?img=' + img,
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