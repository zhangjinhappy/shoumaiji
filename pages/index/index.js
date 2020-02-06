//index.js
//获取应用实例
const app = getApp()
const http = require('/../../utils/http.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  loginAction: function() {
    var that = this
    wx.login({
      success(res) {
        var ff = {
          'js_code': res.code,
          'phone': that.data.phone,
          'pwd': that.data.pwd,
        }
        var param = JSON.stringify(ff);
        http.httpPost({
          // loading: '拼命请求中...',
          url: '/employee/login',
          param: param,
          complete: function (res) {
            console.log("==============aaaaaaaaaaaa======================")
            console.log("RES信息data：", res.data.code);
            if (res.data.code == 200) {
              wx.setStorageSync('userMessage', res.data.data)
              wx.setStorageSync("employeeCode", res.data.data.employeeCode)
          
              console.log("==============dddddddddd======================");
              console.log(res);
              console.log("================ffffff===================");
              var result = res.data.data;
              console.log("用户信息：");
              console.log(result);
              app.globalData.userInfo = result;
              console.log("================result===================");
              wx.switchTab({
                  url: '/pages/statistics/statistics',
              })

            } else {
              wx.showToast({
                icon:'none',
                title: res.message,
              })
            }
          },
        })
      }
    })
  },

  onShow:function(){
   this.getUserInfo();
  },



  getUserInfo:function() {
    var that = this;
    wx.login({
      success(res) {
        console.log(res.code);
        var ff = {
          'js_code': res.code,
        }
        // console.log("我是百忙之中会",ff)
        var param = JSON.stringify(ff);
        http.httpPost({
          // loading: '拼命请求中...',
          url: '/employee/userInfo',
          param: param,
          complete: function (res) {
            console.log("==============res======================" + res);
            console.log( res);
         
            if (res.data.code==200){
              console.log("==============dddddddddd======================");
              console.log(res);
              console.log("================ffffff===================");
              var result = res.data.data;
              console.log(result);
              // console.log(app.globalData.userInfo);
              // console.log(app.globalData.userInfo);
              app.globalData.userInfo = result;
              
              if (app.globalData.userInfo != null && app.globalData.userInfo!=undefined){
                var userInfo = app.globalData.userInfo;
                console.log("================status===================" + result.status);
                if (result.phone == userInfo.phone) {
                  if (result.status != "2") {
                    wx.switchTab({
                      url: '/pages/statistics/statistics',
                    })
                  }
                }
              }
              
              // app.globalData.userInfo = result;
              console.log("================result===================");
            }else{
              console.log("================message==================="+res.message);
            }
           
          
          },
         
        })
      }
    })

  },

/**
 * 输入登陆账号
 */
  phone: function (e) {
    // console.log(e);
    var phone=e.detail.value;
    this.setData({
      phone: phone
    })
  },
/**
 * 输入登陆密码
 */
  pwd: function (e) {
    console.log(e);
    console.log(e);
    var pwd = e.detail.value;
    this.setData({
      pwd: pwd
    })
  },


})
