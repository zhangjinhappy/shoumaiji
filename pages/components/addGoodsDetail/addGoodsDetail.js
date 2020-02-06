// pages/components/addGoodsDetail/addGoodsDetail.js
const http = require('/../../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    replenishmentList:[],
    equipmentCode:'',
    createDt:'',
    location:'',
    endPicurl:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.id))
    const pick = JSON.parse(options.id)
    console.log(pick)
    this.setData({
      equipmentCode: pick.replenishmentCode,
      createDt: pick.createDt,
      location: pick.location,
      endPicurl: (pick.endPicurl).split(",")
    })
    var replenishmentCode = pick.replenishmentCode;
    console.log(replenishmentCode)
    var param = {}
    wx.getStorage({
      key: 'employeeCode',
      success: function (res) {
        param.employeeCode = res.data
      },
    })
    const that = this
    http.httpPost({
      // loading: '拼命请求中...',
      url: '/equipmentReplenishment/queryReplenishmentDetails',
      param: param,
      complete: function (res) {
        console.log(res)
         var list = res.data.data
        var replenishmentList = []
         if (res.data.code === 200) {
           for (let i = 0; i < list.length; i++) {
              if (list[i].replenishmentCode === replenishmentCode){
                replenishmentList.push(list[i])
              }
            }
           console.log("我率选的list", replenishmentList)
          that.setData({
            replenishmentList
          })
         }
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