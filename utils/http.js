var u = {};

//请求返回体模型
u.httpModel = {
  code: 0,
  data: '',
  msg: '',
}

//请求方式
u.GET = 'GET'; //GET类型的请求
u.POST = 'POST'; //POST类型的请求

//请求状态CODE
u.statusCode_success = 200; //开发者服务器返回的 HTTP 成功状态码
u.CODE_SUCCESS = 2000; //接口请求成功的CODE
u.CODE_TOKEN_TIMEOUT = 1015; //用户token过期CODE

//服务器地址

//u.API_SERVICE ='https://hlxy.pluss.cn/hlxyapi'

// u.API_SERVICE = 'http://127.0.0.1:8090';
u.API_SERVICE = 'http://192.168.0.193:8090';


/**
 * 拦截器
 */
u.requestInterceptor = function(reqParams) {
  //做请求前的拦截处理

  return reqParams;
}

/**
 * 请求返回统一处理
 *
 */
u.handleResponse = function(result, reqParams) {
  if (result.statusCode == u.statusCode_success) {
    u.httpModel = result.data;
    if (u.httpModel.code == u.CODE_SUCCESS) {
      //接口成功返回
      if (reqParams.success)
        reqParams.success(u.httpModel.code);
    } else if (u.httpModel.code == u.CODE_TOKEN_TIMEOUT) {
      //token过期出来
    } else {
      //其他的code码返回到页面自行处理
      if (u.httpModel.sucinfo == null || u.httpModel.sucinfo == '' || u.httpModel.sucinfo == undefined) {
        var code;
        if (u.httpModel.code == undefined) {
          code = '未知';
        } else {
          code = u.httpModel.code;
        }
        result = {
          data: {
            sucinfo: u.httpModel.sucinfo,
          }
        }
      }
      // wx.showToast({
      //   icon: 'none',
      //   title: '',
      //   duration: 3000,
      // })
      if (reqParams.fail)
        reqParams.fail(u.httpModel);
    }
  } else {
    console.log('请求错误 : ' + '错误码：' + result.statusCode + ' / ' + '错误信息：' + result.errMsg);
    wx.showToast({
      icon: 'none',
      title: '请求失败：' + result.statusCode,
      duration: 3000,
    })
  }
}


/**
 * 发送请求
 * 
 * @param reqParams     请求封装的参数
 * @param requestType   什么类型的请求 GET POST
 */
u.request = function(reqParams, requestType) {
  var methods = u.POST;
  if (requestType == u.GET) {
    methods = u.GET;
  } else if (requestType == u.POST) {
    methods = u.POST;
  }
  //打印请求地址
  // u.logRequestUrl(reqParams);

  //判断是否需要显示loading
  var isLoading = false;
  if (reqParams.loading != null && reqParams.loading != '') {
    isLoading = true;
    wx.showLoading({
      title: reqParams.loading,
      mask:true
    })
  }
  var headers;
  if (reqParams.header==undefined){
    headers = "{'content-type': 'application/json'}"
  }else{
    headers = reqParams.header
  }

  wx.request({
    url: u.API_SERVICE + reqParams.url,
    data: reqParams.param,
    header: headers,
    method: methods,
    complete: function(msg) {
      if (reqParams.complete)
        reqParams.complete(msg);

    },
    success: function(result) {
      console.log(reqParams)
      //关闭loading
      if (isLoading)
        wx.hideLoading();

      u.handleResponse(result, reqParams);
    },
    fail: function(e) {
      //关闭loading
      if (isLoading)
        wx.hideLoading();
      e = {
        sucinfo: '请求失败：' + e.errMsg,
      }
      if (reqParams.fail)
        reqParams.fail(e);

    }
  })
}

/**
 * GET请求
 * 
 * @param reqParams
 * @desc  一般用于登录等不携带token
 */
u.httpGet = function(reqParams) {
  reqParams = u.requestInterceptor(reqParams);
  u.request(reqParams, u.GET);
}

/**
 * POST请求
 * 
 * @param reqParams
 * @desc  一般用于携带token
 */
u.httpPost = function(reqParams) {
  reqParams = u.requestInterceptor(reqParams);
  u.request(reqParams, u.POST);
}

/**
 * 上传文件
 * 
 * @param reqParams
 * @desc  
 */
u.uploadFile = function(reqParams) {
  //判断是否需要显示loading
  var isLoading = false;
  if (reqParams.loading != null && reqParams.loading != '') {
    isLoading = true;
    wx.showLoading({
      title: reqParams.loading,
    })
  }

  wx.uploadFile({
    url: u.API_SERVICE + reqParams.url, //仅为示例，非真实的接口地址
    filePath: reqParams.filePath,
    name: reqParams.name,
    formData: req.params,
    complete: function(msg) {
      reqParams.complete(msg);
    },
    success: function(result) {
      //关闭loading
      if (isLoading)
        wx.hideLoading();
      result.data = JSON.parse(result.data + '');
      handleResponse(req, result);
    },
    fail: function(e) {
      //关闭loading
      if (isLoading)
        wx.hideLoading();
      e = {
        sucinfo: '请求失败：' + e.errMsg,
      }
      reqParams.fail(e);
    }
  })
}

/**
 * 打印请求地址
 */
u.logRequestUrl = function(requestParams) {
  //显示请求路径
  var url = '请求路径: ' + u.API_SERVICE + requestParams.url;
  var paramCount = u.objCount(requestParams.param);
  if (paramCount >= 1) {
    url += '?' +requestParams.param;
  } else {
    url+='?';
    var i = 0;
    for (var item in requestParams.param) { //用javascript的for/in循环遍历对象的属性 
      if (i != (paramCount - 1)) { //不是最后一个才加上&
        url += item + "=" + requestParams.param[item] + '&';
      } else {
        url += item + "=" + requestParams.param[item];
      }

      i++;
    }
  }
  console.log(url);
}

/**
 * 获取对象、数组的长度、元素个数
 * 
 * @param obj 要计算长度的元素，可以为object、array、string
 */
u.objCount = function(obj) {
  var objType = typeof obj;
  if (objType == "string") {
    return obj.length;
  } else if (objType == "object") {
    var objLen = 0;
    for (var i in obj) {
      objLen++;
    }
    return objLen;
  }
  return false;
}

//抛出方法
module.exports = u;