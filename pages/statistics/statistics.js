import * as echarts from "../../component/ec-canvas/echarts";
const app = getApp()
const http = require('/../../utils/http.js');

function initChart(canvas, width, height) {
  console.log("-----------------------------------")
  console.log(app.globalData);
  var that=this;
  var data={};
  data.employeeCode = app.globalData.userInfo.employeeCode;

  console.log("我的data", data.employeeCode)
  http.httpPost({
    url: '/employee/daynots',
    param: data,
    complete: function (res) {
      console.log("==============aaaaaaaaaaaa======================")
      console.log(res);
      if (res.data.code == 200) {
        console.log("==============200======================")
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        console.log( res.data.data.dayList);
        console.log(res.data.data.countList);
        //这里复制了官方示例配置
        var option = {
          title: {
            text: "日补货数量统计",
            textStyle: {
              fontSize: 14, //字体大小
              color: "#ffffff" //字体颜色
            }
          },
          xAxis: {
            type: "category",
            data: res.data.data.dayList,
            // data: ["周一", "周二", "周三", "周四", "周五"],
            axisLabel: {
              show: true,
              interval: 0,
              textStyle: {
                color: "#FFFFFF"
              }
            }
          },
          yAxis: {
            type: "value",
            name: "(个)",
            nameTextStyle: {//y轴上方单位的颜色
              color: '#ffffff'
            },
            min: "dataMin", // 最小值
            scale: true,
            splitLine: {//分割线配置
              show: true,
              lineStyle: {
                color: "#646576",
              }
            },
            axisLabel: {
              textStyle: {
                color: "#ffffff"
              }
            }
          },
          series: [
            {
              data: res.data.data.countList,
              // data: [12, 13, 24, 25, 26],
              type: "bar",
              barWidth: 10, //柱形图的粗细
              itemStyle: {
                emphasis: {
                  barBorderRadius: 30
                },
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    1,
                    0,
                    0,
                    [
                      {
                        offset: 0,
                        color: "#1268f3" // 0% 处的颜色
                      },
                      {
                        offset: 0.6,
                        color: "#08a4fa" // 60% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#01ccfe" // 100% 处的颜色
                      }
                    ],
                    false
                  ),
                  barBorderRadius: [15, 15, 15, 15],
                  label: {
                    show: false,//是否展示
                    textStyle: {
                      fontSize: '12',
                      fontFamily: '微软雅黑',
                    }
                  }
                }
              }
            }
          ]
        };
        chart.setOption(option);
        return chart;
      } else {
        wx.showToast({
          icon: 'none',
          title: res.message,
        })
      }
    }
  })

  //   xAxis: {
  //     type: "category",
  //     // data: res.data.data.dayList,
  //     data: ["周一", "周二", "周三", "周四", "周五"],
  //     axisLabel: {
  //       show: true,
  //       textStyle: {
  //         color: "#ffffff"
  //       }
  //     }
  //   },
  //   yAxis: {
  //     type: "value",
  //     name: "(个)",
  //     nameTextStyle: {//y轴上方单位的颜色
  //       color: '#ffffff'
  //     },
  //     scale: true,
  //     axisLabel: {
  //       textStyle: {
  //         color: "#ffffff"
  //       }
  //     },
  //     splitLine: {//分割线配置
  //       show: true,
  //       lineStyle: {
  //         color: "#646576",
  //       }
  //     }
  //   },
  //   series: [
  //     {
  //       // data: res.data.data.countList,
  //       data: [28, 39, 20, 25, 26],
  //       type: "bar",
  //       barWidth: 10, //柱形图的粗细
  //       itemStyle: {
  //         //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
  //         emphasis: {
  //           barBorderRadius: 30
  //         },
  //         normal: {
  //           //柱形图圆角，初始化效果
  //           color: new echarts.graphic.LinearGradient(
  //             0,
  //             1,
  //             0,
  //             0,
  //             [
  //               {
  //                 offset: 0,
  //                 color: "#12C0F1" // 0% 处的颜色
  //               },
  //               {
  //                 offset: 0.5,
  //                 color: "#3EE6EA" // 60% 处的颜色
  //               },
  //               {
  //                 offset: 1,
  //                 color: "#4DF4E8" // 100% 处的颜色
  //               }
  //             ],
  //             false
  //           ),
  //           barBorderRadius: [15, 15, 15, 15],
  //           label: {
  //             show: false,//是否展示
  //             textStyle: {
  //               fontSize: '12',
  //               fontFamily: '微软雅黑',
  //             }
  //           }
  //         }
  //       }
  //     }
  //   ]
  // };
  // chart.setOption(option);
  // return chart;


  

}


function initChartTwo(canvas, width, height) {
  var that = this;
  var data = {};
  data.employeeCode = app.globalData.userInfo.employeeCode;
  console.log("-----------------------------------")

  http.httpPost({
    url: '/employee/daynots2',
    param: data,
    complete: function (res) {
      console.log("==============nnnnnnn======================")
      console.log(res);
      if (res.data.code == 200) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  //这里复制了官方示例配置
  var option = {
    title: {
      text: "日补货金额统计",
      textStyle: {
        fontSize: 14, //字体大小
        color: "#ffffff" //字体颜色
      }
    },
    xAxis: {
      type: "category",
      data: res.data.data.dayList,
      // data: ["周一", "周二", "周三", "周四", "周五"],
      axisLabel: {
        show: true,
        interval: 0,
        textStyle: {
          color: "#ffffff"
        }
      }
    },
    yAxis: {
      type: "value",
      name: "(元)",
      nameTextStyle: {//y轴上方单位的颜色
        color: '#ffffff'
      },
      splitLine: {//分割线配置
        show: true,
        lineStyle: {
          color: "#646576",
        }
      },
      scale: true,
      axisLabel: {
        textStyle: {
          color: "#ffffff"
        }
      }
    },
    series: [
      {
        data: res.data.data.countList,
        // data: [28, 39, 20, 25, 26,12,13],
        type: "bar",
        barWidth: 10, //柱形图的粗细
        itemStyle: {
          //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
          emphasis: {
            barBorderRadius: 30
          },
          normal: {
            //柱形图圆角，初始化效果
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              [
                {
                  offset: 0,
                  color: "#575AF5" // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: "#8971FD" // 60% 处的颜色
                },
                {
                  offset: 1,
                  color: "#9677FF" // 100% 处的颜色
                }
              ],
              false
            ),
            barBorderRadius: [15, 15, 15, 15],
            label: {
              show: false,//是否展示
              textStyle: {
                fontSize: '12',
                fontFamily: '微软雅黑',
              }
            }
          }
        }
      }
    ]
  };
  chart.setOption(option);
  return chart;
      } else {
        wx.showToast({
          icon: 'none',
          title: res.message,
        })
      }
    }
  })

  // http.httpPost({
  //   // loading: '拼命请求中...',
  //   url: '/employee/daynots',
  //   param: data,
  //   complete: function (res) {
  //     console.log("==============aaaaaaaaaaaa======================")
  //     console.log(res);
  //     if (res.data.code == 200) {
  //       const chart = echarts.init(canvas, null, {
  //         width: width,
  //         height: height
  //       });
  //       canvas.setChart(chart);

  //       //这里复制了官方示例配置
  //       var option = {
  //         title: {
  //           text: "日补货数量统计(周)",
  //           textStyle: {
  //             fontSize: 16, //字体大小
  //             color: "#ffffff" //字体颜色
  //           }
  //         },
  //         xAxis: {
  //           type: "category",
  //           // data: res.data.data.dayList,
  //           data: ["周一", "周二", "周三", "周四", "周五"],
  //           axisLabel: {
  //             show: true,
  //             textStyle: {
  //               color: "#FFFFFF"
  //             }
  //           }
  //         },
  //         yAxis: {
  //           type: "value",
  //           min: "dataMin", // 最小值
  //           scale: true,
  //           axisLabel: {
  //             textStyle: {
  //               color: "#FFFFFF"
  //             }
  //           }
  //         },
  //         series: [
  //           {
  //             // data: res.data.data.countList,
  //             data: [12, 13, 24, 25, 26],
  //             type: "bar",
  //             barWidth: 16, //柱形图的粗细
  //             itemStyle: {
  //               normal: {
  //                 color: new echarts.graphic.LinearGradient(
  //                   0,
  //                   1,
  //                   0,
  //                   0,
  //                   [
  //                     {
  //                       offset: 0,
  //                       color: "#1268f3" // 0% 处的颜色
  //                     },
  //                     {
  //                       offset: 0.6,
  //                       color: "#08a4fa" // 60% 处的颜色
  //                     },
  //                     {
  //                       offset: 1,
  //                       color: "#01ccfe" // 100% 处的颜色
  //                     }
  //                   ],
  //                   false
  //                 )
  //               }
  //             }
  //           }
  //         ]
  //       };
  //       chart.setOption(option);
  //       return chart;
  //     } else {
  //       wx.showToast({
  //         icon: 'none',
  //         title: res.message,
  //       })
  //     }


  //   },

  // })

}



Page({
  /**
   * 页面的初始数据
   */
  data: {
      ec: {
        onInit: initChart
      },
      ecOne:{
        onInit: initChartTwo
      },
      count:{

      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  
  },

  replenishmentWarning:function(){
    return wx.navigateTo({
      url: '/pages/components/replenishmentWarning/replenishmentWarning',
    })
  },
  //跳转到设备页面
  Myequipment: function (employeeCode) {
    //var employeeCode = app.globalData.userInfo.employeeCode;
    var employeeCode = "201910312604184"
    return wx.navigateTo({
      url: '/pages/components/equipment/equipment?employeeCode='+employeeCode,
    })
  },
  //跳转到补货统计页面
  Myreplenishment: function () {
    return wx.navigateTo({
      url: '/pages/components/addGoods/addGoods',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
      this.queryIndex();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 首页数字统计
   */

  queryIndex:function(){
    var that=this;
    var data={};
    data.employeeCode = app.globalData.userInfo.employeeCode;
    // http.httpPost({
    //   url: '/employee/queryIndex',
    //   param: data,
    //   complete: function (res) {
    //     console.log("==============nnnnnnn======================")
    //     console.log(res);
    //     if (res.data.code == 200) {
    //       that.setData({
    //         count: { equipmentCount: res.data.data.eqCount, replenishmenttCount: res.data.data.repCount, warnningCount: res.data.data.warnCount }
    //       })
    //     } else {
    //     wx.showToast({
    //       icon: 'none',
    //       title: res.message,
    //     })
    //   }


    //  }
    // })
    

    http.httpPost({
      // loading: '拼命请求中...',
      url: '/employee/index',
      param: data,
      complete: function (res) {
        console.log("==============aaaaaaaaaaaa======================")
        console.log(res);
        if (res.data.code == 200) {
        that.setData({
          count: res.data.data
        })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.message,
          })
        }
      },
    })
  }
 });
