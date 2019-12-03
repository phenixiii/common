
// 通用

String.prototype.format = function (args) {
    if (arguments.length > 0) {
      var result = this;
      if (arguments.length == 1 && typeof (args) == "object") {
        for (var key in args) {
          var reg = new RegExp("({" + key + "})", "g");
          result = result.replace(reg, args[key]);
        }
      } else {
        for (var i = 0; i < arguments.length; i++) {
          if (arguments[i] == undefined) {
            return "";
          } else {
            var reg = new RegExp("({[" + i + "]})", "g");
            result = result.replace(reg, arguments[i]);
          }
        }
      }
      return result;
    } else {
      return this;
    }
  }
  
  String.prototype.stringDateFormat = function (fmt) {
    if (this) {
      var strDate = this.substr(0, 10);
      var dtArr = strDate.split("-");
      var dt = new Date(dtArr[0], dtArr[1], dtArr[2]);
      return dt.format(fmt);
    } else {
      return new Date(Date.now()).format(fmt);
    }
  }
  
  //用于结束日期自动+1一天
  String.prototype.stringAddDay = function (day) {
    if (!this) return null;
    var strDate = this.substr(0, 10);
    var dtArr = strDate.split("-");
    var dt = new Date(dtArr[0], dtArr[1] - 1, dtArr[2]);
    dt.setDate(dt.getDate() + day);
    return dt.format('yyyy-MM-dd');
  }
  
  Date.prototype.format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  
    return fmt;
  }
  