// pages/components/equipmentLoss/equipmentLoss.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArrs: [],					//加一个图片显示一张
    idArrs: []
  },

  submit: function(){
     return wx.navigateTo({
       url:"/pages/components/submit/submit",
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const result = JSON.parse(options.obj);
    var areaName ={};
    console.log("显示：", result);
    this.setData({
      result,
    })
  },
  // 图片上传

 
   chooseImage(){
     let that = this
     wx.chooseImage({
       count: 1,
       sizeType: [],
       sourceType: ['album', 'camera'],
       success: function(res) {
         const path = res.tempFilePaths[0]
         wx.uploadFile({
           url: 'http://192.168.0.193:8090',
           filePath: 'path',
           name: 'image',
           success:(res) =>{
             console.log(res)
             let {url,id} = JSON.parse(res.data).data
             console.log(url)
             console.log(id)
             that.data.imgArrs.push(url)
             that.data.idArrs.push(id)
             that.setData({
               imgArrs: that.data.imgArrs,
               idArrs: that.data.idArrs
             })
             console.log(that.data.imgArrs)
             console.log(that.data.idArrs)
           }
         })
       },
     })
   },
   //图片预览
   previewImage(e){
     console.log(e)
     let that = this
     wx.previewImage({
       urls: that.data.imgArrs,
       current:e.target.dataset.item
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