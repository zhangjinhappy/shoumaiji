// pages/replenish/replenish.js
var util = require('/../../../utils/util.js');
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    equipmentCode:'',
    time:'',
    hotellocation:'',
    location:'',
    datalist:[]
  },
  uploadImage: function (){
    var that = this;

    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 这里无论用户是从相册选择还是直接用相机拍摄，拍摄完成后的图片临时路径都会传递进来
        app.startOperating("保存中")
        var filePath = res.tempFilePaths[0];
        var session_key = wx.getStorageSync('session_key');
        // 这里顺道展示一下如何将上传上来的文件返回给后端，就是调用wx.uploadFile函数
        wx.uploadFile({
          url: app.globalData.url + '/home/upload/uploadFile/session_key/' + session_key,
          filePath: filePath,
          name: 'file',
          success: function (res) {
            app.stopOperating();
            // 下面的处理其实是跟我自己的业务逻辑有关
            var data = JSON.parse(res.data);
            if (parseInt(data.status) === 1) {
              app.showSuccess('文件保存成功');
            } else {
              app.showError("文件保存失败");
            }
          }
        })
      },
      fail: function (error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function () {

    console.log('aaaaaaaaaaaaaaaaaaaa')
    wx.showActionSheet({
      itemList: ['从手机相册选择', '拍照'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
    // wx.chooseImage({
    //   count: this.data.count[this.data.countIndex],
    //   success: function (res) {
    //     console.log('ssssssssssssssssssssssssss')
    //     //缓存下 
    //     wx.showToast({
    //       title: '正在上传...',
    //       icon: 'loading',
    //       mask: true,
    //       duration: 2000,
    //       success: function (ress) {
    //         console.log('成功加载动画');
    //       }
    //     })


      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.obj){
      console.log(options.obj)
      const list = JSON.parse(options.obj)
      console.log(list)
      that.setData({
        equipmentCode: list.equipmentCode,
        time: util.formatTime(new Date(list.createDt)),
        hotellocation: list.hotelName,
        location: list.location,
        datalist: list.equipmentDetailsList
      })
    } else if (options.img){
      console.log(options.img)
      var list = options.img
      console.log(list);
      
    }else{

    }
    
    
    // this.setData({
    //   list,
    //   title: list.location,
    //   equipmentCode: list.equipmentCode,
    //   count: list.count,
    //   seq: list.seq
    // })
    // console.log(options.obj);
    // var list = JSON.parse(options.obj);
    // //console.log(util.timeFormat(new Date));
    // this.setData({
    //   hotellocation: list.location,
    //   equipmentCode: list.equipmentCode,
    //   time: util.timeFormat(new Date()),
    //   equipmentDetailsList:list.equipmentDetailsList
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
  Select: function (e) {
     console.log("序号："+e);
    var that = this;
    that.setData({
      seq: e.currentTarget.dataset.seq
    })
    console.log(that.data.seq);
    const list = that.data.seq
     return wx.navigateTo({
       url: '/pages/components/selectDetail/selectDetail?list=' + list,
     })
     
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