var jsTools = {
    //资源文件
    Res: {
      userNumber: 'userNumber',
      userInfo: 'userInfo', //用户信息
      param: 'param', //传入信息
      backParam: 'backParam', //返回参数
      toast: null, //全局的toast变量
      timer: null,
      times: 59,
      count: 0,
    },
  
    debounce: function (fn, delayTime) {
      //函数防抖
      clearTimeout(jsTools.Res.timer);
      jsTools.Res.timer = setTimeout(function () {
        fn.call();
      }, delayTime);
    },
  
    initConfig: function (serverIp,port) {
      phAjax.host = serverIp;
      phAjax.port = port;
  
    },
  
    //初始化方法,web页面打开方式
    initPage: function (callback) {
      // if(typeof phAjax != 'undefined' && phAjax.userNumber == 'Guest') {
      // 	jsTools.Win.open('index', '../index.html');
      // }
      clearInterval(jsTools.Res.timer);
      callback();
    },
  
    //设置用户信息
      setUserInfo: function(val) {
          jsTools.SessionStorage.setVal(jsTools.Res.userInfo, val);
      },
      //获取用户信息
      getUserInfo: function() {
          jsTools.SessionStorage.getVal(jsTools.Res.userInfo);
      },
  
    ajax: function (ret, callback, errorback) {
  
      var isShow = ret.title != null && ret.title.length > 0;
  
      if (isShow)
        jsTools.showProgress(ret.title);
  
      console.log('phajaxQuery:' + JSON.stringify(ret));
      phAjax.execute({
        serviceName: ret.serviceName,
        data: ret.data,
        onSuccess: function (response) {
          console.log(ret.serviceName + ' phajaxData:' + JSON.stringify(response));
  
          if (isShow)
            jsTools.hideProgress();
  
          var result = response.ResultModel;
  
          if (result != null && result.Status == 0) {
            var dat = result.Msg;
            if (callback && typeof callback == 'function') {
              callback(dat);
            }
  
          } else {
            if (errorback && typeof errorback == 'function') {
              errorback(result.ErrorMsg);
            } else {
              if (result.ErrorMsg != null) {
                jsTools.Alertify.msgTip('error', result.ErrorMsg);
                //							jsTools.Alertify.alert({
                //								title: '提示',
                //								message: result.ErrorMsg
                //							});
              }
            }
  
          }
  
        },
        onError: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest.responseText);
  
          if (isShow)
            jsTools.hideProgress();
  
          //alert("调用Service失败! status: " + XMLHttpRequest.statusText + ", response: " + XMLHttpRequest.responseText);
          if (errorback && typeof errorback == 'function')
            errorback(XMLHttpRequest);
          else
            jsTools.onErrorFunc(XMLHttpRequest, ret.serviceName);
        }
      });
    },
  
    onErrorFunc: function (xmlHttpRequest, serviceName) {
  
      var errorMsg = "调用Service:" + serviceName + "失败! status: " + xmlHttpRequest.status + ',' + xmlHttpRequest.statusText + ", response: " + xmlHttpRequest.responseText;
      console.log(errorMsg);
  
      if (xmlHttpRequest.status === 401) {
        var msg = xmlHttpRequest.responseJSON.Message;
  
        jsTools.Alertify.msgTip('error', msg);
  
      } else if (xmlHttpRequest.status == 0) {
        if (xmlHttpRequest.statusText == 'error') {
          //关闭错误
        } else if (xmlHttpRequest.statusText == 'timeout') {
          jsTools.Alertify.msgTip('error', '调用服务：' + serviceName + '，网络超时，请检查您的网络配置（检查：' + jsTools.Res.serverIp + '是否加入白名单）！');
        }
      } else {
        jsTools.Alertify.msgTip('error', errorMsg);
      }
    },
  
    getScript: function (resPath,callback) {
      $.getScript('resPath?' + new Date().getTime(), function () {
        callback();
      });
    },
  
    //本地存储
    SessionStorage: {
      setVal: function (key, value) {
        if (arguments.length === 2) {
          var v = value;
          if (typeof v == 'object') {
            v = JSON.stringify(v);
            v = 'obj-' + v;
          } else {
            v = 'str-' + v;
          }
          var ls = window.sessionStorage;
          if (ls) {
            ls.setItem(key, v);
          }
        }
      },
      getVal: function (key) {
        var ls = window.sessionStorage;
        if (ls) {
          var v = ls.getItem(key);
          if (!v) {
            return;
          }
          if (v.indexOf('obj-') === 0) {
            v = v.slice(4);
            return JSON.parse(v);
          } else if (v.indexOf('str-') === 0) {
            return v.slice(4);
          }
        }
      },
      removeVal: function (key) {
        var ls = window.sessionStorage;
        if (ls && key) {
          ls.removeItem(key);
        }
      },
      clear: function () {
        var ls = window.sessionStorage;
        if (ls) {
          ls.clear();
        }
      },
    },
  
    //本地存储
    Storage: {
      getVal: function (key) {
        var ls = window.localStorage;
        if (ls) {
          var v = ls.getItem(key);
          if (!v) {
            return;
          }
          if (v.indexOf('obj-') === 0) {
            v = v.slice(4);
            return JSON.parse(v);
          } else if (v.indexOf('str-') === 0) {
            return v.slice(4);
          }
        }
      },
      setVal: function (key, value) {
        if (arguments.length === 2) {
          var v = value;
          if (typeof v == 'object') {
            v = JSON.stringify(v);
            v = 'obj-' + v;
          } else {
            v = 'str-' + v;
          }
          var ls = window.localStorage;
          if (ls) {
            ls.setItem(key, v);
          }
        }
      },
      removeVal: function (key) {
        var ls = window.localStorage;
        if (ls && key) {
          ls.removeItem(key);
        }
  
      },
      clear: function () {
        var ls = window.localStorage;
        if (ls) {
          ls.clear();
        }
      }
    },
  
    //动画
    animate: function (dom, ani) {
      var el = $(dom);
  
      var name = ani + ' animated infinite';
      el.addClass(name);
  
      setTimeout(function () {
        el.removeClass(name);
      }, 1000);
    },
  
    //全局用户名
    userNumber: function () {
  
      var user = jsTools.SessionStorage.getVal(jsTools.Res.userNumber);
  
      return user == null ? phAjax.userNumber:user;
    },
  
    //判断是否已经登录
    isLogon: function () {
      var userNumber = phAjax.userNumber;
      if (userNumber == null || userNumber == "Guest") {
        return false;
      }
      return true;
    },
  
    //两个时间相差数 兼容firefox chrome
    dateDifference: function (sDate1, sDate2, unit) { //sDate1和sDate2是2006-12-18格式  
      var dateSpan,
        tempDate,
        iDays;
      sDate1 = Date.parse(sDate1);
      sDate2 = Date.parse(sDate2);
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
  
      if (unit == null)
        unit = 0;
  
      switch (unit) {
        case 0:
          tempDate = 24; //天
          break;
        case 1:
          tempDate = 1; //小时
          break;
      }
  
      iDays = Math.floor(dateSpan / (tempDate * 3600 * 1000));
      return iDays;
    },
  
    //判断是否是数组
    isArray: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    },
  
    //克隆对象
    deepCopy: function (source) {
      var result = {};
      for (var key in source) {
        result[key] = source[key];
      }
      return result;
    },
  
    Alertify: {
      //右下角通知提示
      //type:提示类型
      //msg:通知信息内容
      //time：通知提示显示时间，单位：秒。如果time值为0，则表示提示信息一直显示，知道用户点击提示信息后消失。
      //position: 提示框显示位置top-right(右上)、top-left(左上)、top-center(中上)、bottom-left(左下)、bottom-center(中下)、bottom-right(右下)
      msgTip: function (type, msg, time, position) {
        if (time == null) {
          switch (type) {
            case 'success':
              time = 4;
              break;
            case 'warning':
              time = 6;
              break;
            case 'error':
              time = 8;
              break;
            default:
              time = 5;
              break;
          }
        }
  
        if (position == null)
          position = 'bottom-right';
        alertify.set('notifier', 'delay', time);
        alertify.set('notifier', 'position', position);
        if (type == "success") {
          alertify.success(msg);
        } else if (type == "warning") {
          alertify.warning(msg);
        } else if (type == "error") {
          alertify.error(msg);
        } else if (type == 'message') {
          alertify.message(msg);
        } else {
          alertify.error("参数有误");
        }
      },
      //弹出窗提示
      //ret.title：通知信息标题
      //ret.message：通知信息内容
      //ret.closeButton：是否显示右上角关闭(×)按钮
      //ret.basic：是否显示基础模板(即：没有标题，没有关闭label按钮)
      //ret.callback：点击关闭按钮返回方法
      alert: function (ret) {
        if (ret.title == null)
          ret.title = "提示";
        if (ret.closeButton == null)
          ret.closeButton = false;
        if (ret.basic == null)
          ret.basic = false;
        alertify.alert().setting({
          'title': ret.title == null ? "提示" : ret.title,
          'label': '关闭',
          'message': ret.message,
          'closable': ret.closeButton,
          'basic': ret.basic,
          'onok': ret.callback
        }).show();
      },
      //弹出窗操作
      //msg：通知信息内容
      //title：弹出窗标题
      //callback：点击按钮返回方法
      confirm: function (ret) {
        alertify.confirm()
          .setting({
            'title': ret.title == null ? "提示" : ret.title,
            'message': ret.message,
            'labels': {
              ok: '确定',
              cancel: '取消'
            },
            'onok': ret.callback,
          }).show();
      },
      //prompt弹窗提示输入
      //title：提示框标题
      //labelText：提示标签值
      //placeholder：文本框提示内容
      prompt: function (title, labelText, placeholder, okFun, cancelFun) {
        alertify.prompt(title, labelText, placeholder, function (evt, value) {
          okFun(value);
        }, function () {
          cancelFun();
        }).set('labels', {
          ok: '确定',
          cancel: '取消'
        });
      },
    },
  
    //element操作提示
    Element: {
      alert: function (doc, msg, yesback) {
        doc.$alert(msg, '操作提示', {
          confirmButtonText: '确定',
          callback: function () {
            if (yesback && typeof yesback == 'function')
              yesback();
          }
        });
      },
  
      confirm: function (dom, msg, yesback, noback) {
        dom.$confirm(msg, "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: function (action) {
            if (action == 'confirm') {
              if (yesback && typeof yesback == 'function')
                yesback();
            } else {
              if (noback && typeof noback == 'function')
                noback();
            }
  
          }
        })
      },
  
      //element消息提示
      //type:success,warning,info,error
      msgTip: function (doc, msg, type) {
          doc.$message({
            message: msg,
            type: type,
          });
      },
      //type: success/warning/info/error	
      //pos: top-right、top-left、bottom-right、bottom-left
      notify: function (doc, title, msg, type, pos) {
        doc.$notify({
          title: title,
          message: msg,
          type: type,
          position: pos
        });
      }
    },
  
    //窗口
    Win: {
      open: function (name, url, params) {
        var curUrl = url + '?' + new Date().getTime();
        if (params) {
          if (typeof params == 'object') {
            params = JSON.stringify(params);
            curUrl += '&param=' + params;
          } else {
            curUrl += '&' + params;
          }
        }
  
        location.href = curUrl;
      },
      close: function () {
        window.history.back();
      }
    },
  
    //弹出等待自动关闭
    toast: function (text, time) {
      if (time == null)
        time = 3000;
  
      //浏览器
      var cur = new auiToast();
  
      cur.toast({
        title: text,
        duration: time
      });
    },
  
    //显示进度提示框
    showProgress: function (title) {
      if (jsTools.Res.toast == null) {
        jsTools.Res.toast = new auiToast();
        jsTools.Res.toast.loading({
          title: title
        });
      }
  
    },
    //隐藏进度提示框
    hideProgress: function () {
      if (jsTools.Res.toast != null) {
        jsTools.Res.toast.hide();
        jsTools.Res.toast = null;
      }
    },
  
    //获取url 参数
    getQueryString: function (name) {
  
      var url = window.location.href;
      if (new RegExp(".*\\b" + name + "\\b(\\s*=([^&]+)).*", "gi").test(url)) {
        return RegExp.$2;
      } else {
        return null;
      }
    },
  
    //创建条码
    createBarcode: function (arg, index, elId) {
      //index = 1 : 条形码; = 2 : 二维码
      if (arg == '') {
        return;
      }
  
      var curEl = elId;
      if (curEl == null) {
        curEl = 'imgbarcode' + index;
      }
      curEl = '#' + curEl;
  
      if (index == 1) {
        $(curEl).attr("src", "");
        JsBarcode(curEl, arg, {
          format: "CODE39", //选择要使用的条形码类型
          width: 1, //设置条之间的宽度
          height: 80, //高度
          displayValue: false, //是否在条形码下方显示文字
          //				text: "456", //覆盖显示的文本
          //				fontOptions: "bold italic", //使文字加粗体或变斜体
          //				font: "fantasy", //设置文本的字体
          textAlign: "center", //设置文本的水平对齐方式
          textPosition: "bottom", //设置文本的垂直位置
          textMargin: 5, //设置条形码和文本之间的间距
          //				fontSize: 16, //设置文本的大小
          //				background: "#eee", //设置条形码的背景
          //				lineColor: "#2196f3", //设置条和文本的颜色。
          margin: 15 //设置条形码周围的空白边距
        });
      } else if (index == 2) {
        $(curEl).empty();
        $(curEl).qrcode({
          render: "canvas", //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好  
          text: arg,
          width: "100", //二维码的宽度  
          height: "100", //二维码的高度  
          background: "#ffffff", //二维码的后景色  
          foreground: "#000000", //二维码的前景色  
          //				src: 'wx.jpg' //二维码中间的图片  
        });
      }
    },
  
    //获取随机码
    getCode: function (str, count, radix) {
      //new Date().getTime()
      //guid唯一代码
      //str 前缀
      //count:为数字长度
      //radix:为基数，10：十进制，16：十六进制
      var guid = "";
      for (var i = 1; i <= count; i++) {
        var n = Math.floor(Math.random() * radix).toString(radix);
        guid += n;
      }
      return str + guid.toUpperCase();
    },
  
    addPreZero: function (num) {
      return ('000' + num).slice(-4);
    },
  
    getObjLength: function (obj) {
      var c = 0;
      if (!obj) {
        return c;
      }
      if ($.isArray(obj)) {
        return obj.length;
      } else {
        if (!$.isPlainObject(obj)) {
          return c;
        }
        for (var i in obj) {
          c++;
        }
        return c;
      }
    },
  
    addDays: function (date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
  
    //获取URL参数,默认是param
    getQueryString: function (name) {
      if (name == null || typeof name == 'undefined')
        name = 'param';
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
  
    loadScript: function (url, callback) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      if (typeof (callback) != "undefined") {
        if (script.readyState) {
          script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
              script.onreadystatechange = null;
              callback();
            }
          };
        } else {
          script.onload = function () {
            callback();
          };
        }
      }
      script.src = url;
      document.body.appendChild(script);
    },
  
    startInterval: function (el, className) {
      //验证码(用于获取验证码)		
      if (jsTools.Res.count > 0) return;
  
      jsTools.Res.count = jsTools.Res.times;
      var initCount = jsTools.Res.count + 1;
      $(el).val("重新获取(" + initCount + "s" + ")");
      $(el).attr("disabled", true);
      $(el).removeClass(className);
  
      var countdown = setInterval(function () {
        $(el).val("重新获取(" + jsTools.Res.count + "s" + ")");
        if (jsTools.Res.count <= 0) {
          clearInterval(countdown);
          jsTools.Res.count = 0;
          $(el).val("重新获取").attr("disabled", false);
          $(el).addClass(className);
        } else
          jsTools.Res.count--;
      }, 1000);
  
    },
    endInterval: function () {
      jsTools.Res.count = 0;
    },
  
    //设置页面关闭时间
    PageTimeOut: function (count) {
      var lastTime = new Date().getTime();
      var currentTime = new Date().getTime();
      var timeOut = count * 60 * 1000; //设置超时时间： 10分
      $(function () {
        /* 鼠标移动事件 */
        $(document).mouseover(function () {
          lastTime = new Date().getTime(); //更新操作时间
  
        });
      });
  
      function testTime() {
        currentTime = new Date().getTime(); //更新当前时间
        if (currentTime - lastTime > timeOut) { //判断是否超时
          window.location.href = 'main.html';
          console.log("长时间未操作,自动回到主页");
        }
      }
      /* 定时器  间隔1秒检测是否长时间未操作页面  */
      window.setInterval(testTime, 1000);
    },
  };