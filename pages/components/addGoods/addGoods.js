// pages/components/addGoods/addGoods.js

const http = require('/../../../utils/http.js');
var util = require('/../../../utils/util.js');

const app = getApp()

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
    shopList:[],//请求出来的总数据
    areaCode:[],
    PicterArray:[],
    array: [],
    shop: ["七天酒店", "五星酒店","西湖酒店"],
    index:0,
    one:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    var param={}
    wx.getStorage({
      key: 'employeeCode',
      success: function(res) {
        console.log(res.data)
        param.employeeCode = res.data
      },
    })
    const that = this
    //查询全部信息
    http.httpPost({
      // loading: '拼命请求中...',
      url: '/equipmentReplenishment/queryReplenishment',
      param: param,
      complete: function (res) { 
        var list = res.data.data
        console.log(list)
        if (res.data.code === 200){
          var array = [];
          var shop = [];
          var areaCode =[];
          var PicterArray =[]
           for(let i=0;i<list.length;i++){
             list[i].createDt = util.formatTime(new Date(list[i].createDt))
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
          for (let i = 0; i < array.length;i++){
            PicterArray.push(array[i].split("-")[2]) 
          }
          shop = noRepeat2(shop)
          let showList= [];
          for(let j=0;j<list.length;j++){
            if (array[0] === list[j].areaName){
              showList.push(list[j])
            }
          }
          that.setData({
            shopList:list,
            list:showList,
            PicterArray,
            array,
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
    var showList=[]
    for (let i = 0;i<list.length;i++){
      if (array[e.detail.value] === list[i].areaName){
         console.log(array[e.detail.value])
         showList.push(list[i])
      }
    }
    this.setData({
      index: e.detail.value,
      list: showList
    })
  },
  // 帅选功能
  shopPickerChange: function (e) {
    let list = this.data.list
    let array = this.data.array
    let areaCode = this.data.areaCode
    console.log(areaCode)
    console.log(list)
    var showList= []
    for (let key in list) {
      if (list[key].areaName === array[e.detail.value] ){
        showList.push(areaCode[key])
      } 
    }
    console.log(1111111)
    console.log(showList)
    this.setData({
      showList,
      one: e.detail.value
    })
  },
  addGoodsDetail:function (e) {
    console.log(e)
    const result = JSON.stringify(e.currentTarget.dataset.id)
    return wx.navigateTo({
      url: '/pages/components/addGoodsDetail/addGoodsDetail?id=' + result,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  

  /*
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