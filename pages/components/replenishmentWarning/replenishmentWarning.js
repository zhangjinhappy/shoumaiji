// pages/components/addGoods/addGoods.js
const http = require('/../../../utils/http.js');


//数组去重
function noRepeat2(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) == -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],//分出来的数据
    shopList: [],//请求出来的总数据
    areaCode: [],
    array: ["蜀山区", "包河区", "高新区", "瑶海区", "滨湖自治区"],
    shop: ["七天酒店", "五星酒店", "西湖酒店"],
    index: 0,
    one: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var param = {}
    wx.getStorage({
      key: 'employeeCode',
      success: function (res) {
        console.log(res.data)
        param.employeeCode = res.data
      },
    })
    const that = this
    http.httpPost({
      // loading: '拼命请求中...',
      url: '/equipmentWarnning/replenishWarning',
      param: param,
      complete: function (res) {
        var list = res.data.data
        console.log(list)
        if (res.data.code === 200) {
          var array = [];
          var shop = [];
          var areaCode = [];
          var PicterArray=[];
          for (let i = 0; i < list.length; i++) {
            array.push(list[i].areaName)
            shop.push(list[i].location)
            var obj = {}
            obj.areaCode = list[i].areaCode
            obj.areaName = list[i].areaName
            obj.location = list[i].location
            areaCode.push(obj)
          }
          console.log(list)
          array = noRepeat2(array)
          for (let i = 0; i < array.length; i++) {
            PicterArray.push(array[i].split("-")[2])
          }
          shop = noRepeat2(shop)
          let showList = [];
          for (let j = 0; j < list.length; j++) {
            if (array[0] === list[j].areaName) {
              showList.push(list[j])
            }
          }
          that.setData({
            shopList: list,
            list: showList,
            array,
            PicterArray,
            shop,
            areaCode
          })

        }
      }
    })
    
  },
  bindPickerChange: function (e) {
    let array = this.data.array
    let list = this.data.shopList
    var showList = []
    for (let i = 0; i < list.length; i++) {
      if (array[e.detail.value] === list[i].areaName) {
        console.log(array[e.detail.value])
        showList.push(list[i])
      }
    }
    console.log(showList)
    this.setData({
      index: e.detail.value,
      list: showList
    })
  },
  shopPickerChange: function (e) {
    let list = this.data.list
    let array = this.data.array
    let areaCode = this.data.areaCode
    var showList = []
    for (let key in areaCode) {
      if (areaCode[key].areaName === array[e.detail.value]) {
        showList.push(areaCode[key])
      }
    }
    this.setData({
      showList,
      one: e.detail.value
    })
  },
  addGoodsDetail: function (e) {
     //console.log(e.currentTarget.dataset.id)
    const id = JSON.stringify(e.currentTarget.dataset.id)
    return wx.navigateTo({
      url: '/pages/components/replenishmentDetail/replenishmentDetail?id='+id,
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