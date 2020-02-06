// pages/My/My.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("我的信息：",app.globalData.userInfo);
    const infoList = app.globalData.userInfo
    this.setData({
      infoList
    })
  },
  toAboutUs: function (e) {
    console.log(e.currentTarget.dataset.id)
    let page = e.currentTarget.dataset.id
    if (page === "1") {
      return wx.navigateTo({
        url: "/pages/components/certificates/certificates",
      })
    }
    if (page === "2") {
      var employeeCode = app.globalData.userInfo.employeeCode;
      console.log("员工编号：",employeeCode)
      return wx.navigateTo({
        url: "/pages/components/equipment/equipment?employeeCode=" + employeeCode,
      })
    }
    if (page === "3") {
      console.log(111)
      return wx.navigateTo({
        url: "/pages/components/popedom/popedom",
      })
    }
  },
  exit: function(){
    return wx.navigateTo({
      url: "/pages/index/index",
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