module.exports = {
  buildRequest: buildRequest,
  parseResponse: parseResponse,
  queryIOService: queryIOService,
  uploadFile: uploadFile,
  uploadVedio: uploadVedio,
  downloadFile: downloadFile,
  downloadVideo: downloadVideo,
  refreshMsg: refreshMsg,
}

const app = getApp();
/**生成发送报文  */
function buildRequest(params, serviceCode) {
  var reqTxt = "";
  reqTxt += '{                                                        '
  reqTxt += '    \"SvcCont\": [                                       '
  reqTxt += '        {                                                '
  reqTxt += '            \"PARAMS\": #constaint#            '
  reqTxt += '        }                                                '
  reqTxt += '    ],                                                   '
  reqTxt += '    \"TcpCont\": {                                       '
  reqTxt += '        \"ServiceCode\": \"#serviceCode#\",             '
  reqTxt += '        \"SrcSysID\": \"1003\",                          '
  reqTxt += '        \"SrcSysSign\": \"123456\",                      '
  reqTxt += '        \"TransactionID\": \"1322017119413\",            '
  reqTxt += '        \"srcSysPassWord\": \"1003\"                     '
  reqTxt += '    }                                                    '
  reqTxt += '}'
  reqTxt = reqTxt.replace('#serviceCode#', serviceCode);
  reqTxt = reqTxt.replace('#constaint#', params);
  return reqTxt;
}
/**解析返回参数 */
function parseResponse(response) {
  return response.data.SvcCont.result;
}

/**方法调用 
 * 传入options({data,name,reback})
 * 回调backCenter({options,response}) 
 */
function queryIOService(options) {
  console.log({
    t: "----------服务器请求：" + options.name + "----------",
    options: options,
  });
  var that = this;
  var data = JSON.stringify(options.data);
  var params = that.buildRequest(data, options.name);
  wx.request({
    url: app.globalData.serverUrl,
    data: params,
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      var response = that.parseResponse(res);
      console.log({
        t: "==========服务器返回：" + options.name + "==========",
        options: options,
        response: response,
      });
      if (options.reback != null) {
        options.reback.backCenter({
          options: options,
          response: response,
        });
      }
    }
  })
}
/**
 * 上传图片
 * 传入options({*count,*sizeType,back})
 * count：最多可以选择的图片张数，默认1
 * sizeType：['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
 * 回调back.uploadCenter({res: res,options: options,i: i})
 */
function uploadFile(options) {
  var count = options.count ? options.count : 1;
  var sizeType = options.sizeType ? options.sizeType : ['original', 'compressed'];
  wx.chooseImage({
    count: count,
    sizeType: sizeType,
    success(res) {
      var tempFilePaths = res.tempFilePaths
      for (var i in tempFilePaths) {
        wx.uploadFile({
          url: app.globalData.domainUrl + 'unite/wechat/upload!uploadImage.do',
          filePath: tempFilePaths[i],
          name: 'file',
          formData: {
            'type': 'png'
          },
          success(res) {
            console.log("==========图片上传==========");
            console.log({
              res: res,
              options: options,
            });
            options.back.uploadCenter({
              res: res,
              options: options,
              i: i
            });
          }
        })
      }
    }
  })
}
//上传视频
function uploadVedio(options) {
  wx.chooseVideo({
    success(res) {
      var tempFilePath = res.tempFilePath;
      var thumbTempFilePath = res.thumbTempFilePath;
      wx.uploadFile({
        url: app.globalData.domainUrl + 'unite/wechat/upload!uploadVedio.do',
        filePath: tempFilePath,
        name: 'file',
        formData: {
          'type': 'mp4'
        },
        success(resVideo) {
          console.log("==========视频上传-1==========");
          console.log({
            resVideo: resVideo,
            tempFilePath: tempFilePath,
            thumbTempFilePath: thumbTempFilePath,
            options: options,
          });
          if (thumbTempFilePath == null) {
            options.back.uploadVideo({
              resVideo: resVideo,
              options: options,
            });
            return;
          }
          wx.uploadFile({
            url: app.globalData.domainUrl + 'unite/wechat/upload!uploadImage.do',
            filePath: thumbTempFilePath,
            name: 'file',
            formData: {
              'type': 'png'
            },
            success(resImage) {
              console.log("==========视频上传-2==========");
              console.log({
                resVideo: resVideo,
                resImage: resImage,
                options: options,
              });
              options.back.uploadVideo({
                resVideo: resVideo,
                resImage: resImage,
                options: options,
              });
            }
          })
        }
      })
    }
  })
}

//下载图片文件
function downloadFile(options) {
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            downloadFileAction(options);
          },
          fail(res) {
            console.log(res)
            wx.openSetting({
              success(settingdata) {
                console.log(settingdata)
                if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                  downloadFileAction(options);
                } else {
                  wx.showToast({
                    icon: "none",
                    title: '请授权保存权限',
                  })
                }
              }
            })
          }
        })
      } else {
        downloadFileAction(options);
      }
    }
  })
}

//下载视频文件
function downloadVideo(options) {
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            downloadVideoAction(options);
          },
          fail(res) {
            console.log(res)
            wx.openSetting({
              success(settingdata) {
                console.log(settingdata)
                if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                  downloadVideoAction(options);
                } else {
                  wx.showToast({
                    icon: "none",
                    title: '请授权保存权限',
                  })
                }
              }
            })
          }
        })
      } else {
        downloadVideoAction(options);
      }
    }
  })
}

function downloadFileAction(options) {
  console.log(11111111111111)
  if (options.back != null) {
    options.back.setData({
      download: true,
    })
  }
  wx.downloadFile({
    url: options.url,
    success(downloadRes) {
      console.log(22222222222222)
      console.log(downloadRes)
      wx.saveImageToPhotosAlbum({
        filePath: downloadRes.tempFilePath,
        success(saveFileRes) {
          console.log(333333333333333)
          if (options.back != null) {
            var backData = {
              options: options,
              downloadRes: downloadRes,
              saveFileRes: saveFileRes,
            }
            console.log("------------------下载图片------------------");
            console.log(backData);
            options.back.downloadBack(backData);
          }
        }
      })
    }
  })
}

function downloadVideoAction(options) {
  console.log(11111111111111)
  wx.downloadFile({
    url: options.url,
    success(downloadRes) {
      console.log(22222222222222)
      console.log(downloadRes)
      wx.saveVideoToPhotosAlbum({
        filePath: downloadRes.tempFilePath,
        success(saveFileRes) {
          console.log(333333333333333)
          if (options.back != null) {
            var backData = {
              options: options,
              downloadRes: downloadRes,
              saveFileRes: saveFileRes,
            }
            console.log("------------------下载图片------------------");
            console.log(backData);
            options.back.downloadBack(backData);
          }
        }
      })
    }
  })
}

function refreshMsg() {
  queryIOService({
    data: {
      memberCode: app.globalData.member.memberCode,
      msgStatus: 0,
    },
    name: "queryMemberMsgLength",
    reback: {
      backCenter: function(res) {
        var length = res.response.resultData.length;
        wx.setTabBarBadge({
          index: 4,
          text: length,
        })
        console,log("----------------")
      }
    },
  })
}