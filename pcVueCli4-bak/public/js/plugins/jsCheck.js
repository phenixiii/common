//校验
var jsCheck = {
    //验证箱号是否符合标准(前4位字母后7位数字)
    isCtnNo: function (no) {
      if (no == "" || no == null)
        return false;
      if (no.length != 11)
        return false;
      var noLetter = no.substring(0, 4);
      var noNumber = no.substring(4, 11);
      var RegL = /^[A-Za-z]+$/;
      var regN = /^[0-9]*$/;
      if (RegL.test(noLetter) && regN.test(noNumber)) {
        return true;
      } else {
        return false;
      }
    },
  
    //验证是否车牌号
    isCarNo: function (carNo) {
      var result = false;
      if (carNo.length == 7) {
        var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
        result = reg.test(carNo);
      }
      return result;
    },
  
    //身份证验证
    isIdCard: function (code) {
      var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
      };
      var tip = "";
      var pass = true;
  
      if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
      } else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
      } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
          code = code.split('');
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            tip = "校验位错误";
            pass = false;
          }
        }
      }
      //		if(!pass) alert(tip);
      return pass;
    },
  
    //用户名验证
    isUser: function (obj) {
      //    var reg=/{1,8}[a-zA-Z0-9]{1,8}/;
      if (obj == null || obj == '') {
  
        // jsTools.alert("请正确填写用户名！");
        return false;
      }
      return true;
    },
  
    //电话号码验证
    isPhone: function (obj) {
      var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if(!reg.test(obj)) {
        obj = '';
        return false;
      }
      return true;
    },
  
    //组织机构代码验证
    isOrgCode: function (obj) {
      var reg = /^[0-9]{18}/;
      if (!reg.test(obj)) {
        return false;
      }
      return true;
    },
  
    //联合国编号验证
    isUnno: function (obj) {
      var reg = /^[0-9]{4}/;
      if (!reg.test(obj)) {
        return false;
      }
      return true;
    },
  
    //验证邮件格式
    isMail: function (obj) {
      var reg = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
      if (!reg.test(obj)) {
        obj = '';
        // jsTools.alert("请正确填写邮件！");
        return false;
      }
      return true;
    },
  
    //验证用户名格式
    isChnName: function (obj) {
      var reg = /^[\u4e00-\u9fa5]{2,4}$/;
      if (!reg.test(obj)) {
        // jsTools.alert("请正确填写姓名！姓名为两到四个汉字。");
        obj.value = "";
      }
    },
  
    //校验箱号
    checkCtnNo: function (containerNo) {
      var reg = /^[A-Z]{4}\d{7}$/;
      if (!reg.test(containerNo))
        return false;
  
      if (containerNo.indexOf("HLCU") == 0)
        containerNo = "4029" + containerNo.substr(4);
  
      var sum = 0;
      for (var i = 0; i < 10; i++) {
        sum += parseInt(jsTools.convertToNumber(containerNo.substr(i, 1)) * Math.pow(2.0, i));
      }
  
      if (((sum % 11) == parseInt(containerNo.substr(10, 1))) ||
        ((sum % 11) == 10 && parseInt(containerNo.substr(10, 1)) == 0)) {
        return true;
      } else {
        return false;
      }
    }
  
  };