// pages/components/succeed/succeed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     img:true,
     page:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // this.Data({
    //   page: options.id
    // })  
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
    // console.log(this.page)
    // if (this.page === 1) {
    //   wx.setNavigationBarTitle({ title: '预约失败' })
    //   this.Data({
    //     img: false
    //   })
    // } else {
    //   wx.setNavigationBarTitle({ title: '预约成功' })
    //   this.Data({
    //     img: true
    //   })
    // }

  },
  successd: function(){
    console.log(111111)
    wx.navigateBack({
      delta: 10,
       complete: function (res) {// complete 
         console.log(res)
       } 
     })
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