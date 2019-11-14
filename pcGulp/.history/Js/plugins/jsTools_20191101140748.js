var jsTools = {

	//资源文件
	Res: {
		system: 'system', //系统信息
		uploadIp: 'uploadIp', //更新IP
		serverIp: '192.168.251.127', //内网  webApi服务IP
		//port: '9082', //端口 正式 
		port: '8080', //端口 测试 
		appSavePath: 'fs://SSG_AcceptApp', //保存目录
		VERSION: 'V 1.0.0.01', //版本号
		token: 'token', //暂留
		userInfo: 'userInfo', //用户信息
		hisInfo: 'hisInfo', //历史信息
		toast: null, //全局的toast变量
		Debug: true
	},

	debounce: function(fn, delayTime) {
		//函数防抖
		clearTimeout(jsTools.Res.timer);
		jsTools.Res.timer = setTimeout(function() {
			fn.call();
		}, delayTime);
	},

	//初始化IP和端口
	initConfig: function(ret) {
		if(jsTools.Res.isDebug) {
			ret.host = 'http://localhost';
			ret.port = '8080';

		} else {
			ret.host = jsTools.Res.serverIp;
			ret.port = jsTools.Res.port;
		}
	},

	ajax: function(ret, callback, errorback) {

		var isShow = ret.title != null && ret.title.length > 0;

		if(isShow)
			jsTools.showProgress(ret);

		console.log('phajaxQuery:' + JSON.stringify(ret));
		phAjax.execute({
			serviceName: ret.serviceName,
			data: ret.data,
			onSuccess: function(response) {
				console.log(ret.serviceName + ' phajaxData:' + JSON.stringify(response));

				if(isShow)
					jsTools.hideProgress();

				var result = response.ResultModel;

				if(result != null && result.Status == 0) {
					var dat = result.Msg;
					if(callback && typeof callback == 'function') {
						callback(dat);
					}

				} else {
					if(errorback && typeof errorback == 'function') {
						errorback(result.ErrorMsg);
					} else {
						if(result.ErrorMsg != null) {
							jsTools.Alertify.msgTip('error', result.ErrorMsg);
						}
					}

				}

			},
			onError: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.responseText);

				if(isShow)
					jsTools.hideProgress();

				//alert("调用Service失败! status: " + XMLHttpRequest.statusText + ", response: " + XMLHttpRequest.responseText);
				if(errorback && typeof errorback == 'function')
					errorback(XMLHttpRequest);
				else
					jsTools.onErrorFunc(XMLHttpRequest, ret.serviceName);
			}
		});
	},

	onErrorFunc: function(xmlHttpRequest, serviceName) {

		var errorMsg = "调用Service:" + serviceName + "失败! status: " + xmlHttpRequest.status + ',' + xmlHttpRequest.statusText + ", response: " + xmlHttpRequest.responseText;
		console.log(errorMsg);

		if(xmlHttpRequest.status === 401) {
			var msg = xmlHttpRequest.responseJSON.Message;

			jsTools.Alertify.msgTip('error', msg);

		} else if(xmlHttpRequest.status == 0) {
			if(xmlHttpRequest.statusText == 'error') {
				//关闭错误
			} else if(xmlHttpRequest.statusText == 'timeout') {
				jsTools.Alertify.msgTip('error', '调用服务：' + serviceName + '，网络超时，请检查您的网络配置（检查：' + jsTools.Res.serverIp + '是否加入白名单）！');
			}
		} else {
			jsTools.Alertify.msgTip('error', errorMsg);
		}
	},

		//本地存储
		SessionStorage: {
			setVal: function(key, value) {
				if(arguments.length === 2) {
					var v = value;
					if(typeof v == 'object') {
						v = JSON.stringify(v);
						v = 'obj-' + v;
					} else {
						v = 'str-' + v;
					}
					var ls = window.sessionStorage;
					if(ls) {
						ls.setItem(key, v);
					}
				}
			},
			getVal: function(key) {
				var ls = window.sessionStorage;
				if(ls) {
					var v = ls.getItem(key);
					if(!v) {
						return;
					}
					if(v.indexOf('obj-') === 0) {
						v = v.slice(4);
						return JSON.parse(v);
					} else if(v.indexOf('str-') === 0) {
						return v.slice(4);
					}
				}
			},
			removeVal: function(key) {
				var ls = window.sessionStorage;
				if(ls && key) {
					ls.removeItem(key);
				}
			},
			clear: function() {
				var ls = window.sessionStorage;
				if(ls) {
					ls.clear();
				}
			},
		},

	//本地存储
	Storage: {
		getVal: function(key) {
			var ls = window.localStorage;
			if(ls) {
				var v = ls.getItem(key);
				if(!v) {
					return;
				}
				if(v.indexOf('obj-') === 0) {
					v = v.slice(4);
					return JSON.parse(v);
				} else if(v.indexOf('str-') === 0) {
					return v.slice(4);
				}
			}
		},
		setVal: function(key, value) {
			if(arguments.length === 2) {
				var v = value;
				if(typeof v == 'object') {
					v = JSON.stringify(v);
					v = 'obj-' + v;
				} else {
					v = 'str-' + v;
				}
				var ls = window.localStorage;
				if(ls) {
					ls.setItem(key, v);
				}
			}
		},
		removeVal: function(key) {
			var ls = window.localStorage;
			if(ls && key) {
				ls.removeItem(key);
			}

		},
		clearVal: function() {
			var ls = window.localStorage;
			if(ls) {
				ls.clear();
			}
		}
	},
	//动态加载js
	getScript: function(jsPath,callback) {
		$.getScript(jsPath + '?' + encodeURI(jsTools.Res.VERSION), function() {
			callback();
		});
	},

	//动画
	animate: function(dom, ani) {
		var el = $(dom);

		var name = ani + ' animated infinite';
		el.addClass(name);

		setTimeout(function() {
			el.removeClass(name);
		}, 1000);
	},

	//全局用户名
	userNumber: function() {
		return jsTools.SessionStorage.getVal(jsTools.Res.userNumber);
	},

	//判断是否已经登录
	isLogon: function() {
		var userNumber = jsTools.userNumber();
		if(userNumber == null || userNumber == "Guest") {
			return false;
		}
		return true;
	},

	//两个时间相差天数 兼容firefox chrome
	dateDifference: function(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式  
		var dateSpan,
			tempDate,
			iDays;
		sDate1 = Date.parse(sDate1);
		sDate2 = Date.parse(sDate2);
		dateSpan = sDate2 - sDate1;
		dateSpan = Math.abs(dateSpan);
		iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
		return iDays;
	},

	//判断是否是数组
	isArray: function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	},

	//克隆对象
	deepCopy: function(source) {
		var result = {};
		for(var key in source) {
			result[key] = source[key];
		}
		return result;
	},

	//日志
	log: function(str) {
		console.log(str);
	},

	Alertify: {
		//右下角通知提示
		//type:提示类型
		//msg:通知信息内容
		//time：通知提示显示时间，单位：秒。如果time值为0，则表示提示信息一直显示，知道用户点击提示信息后消失。
		//position: 提示框显示位置top-right(右上)、top-left(左上)、top-center(中上)、bottom-left(左下)、bottom-center(中下)、bottom-right(右下)
		msgTip: function(type, msg, time, position) {
			if(time == null)
				time = 5;
			if(position == null)
				position = 'bottom-right';
			alertify.set('notifier', 'delay', time);
			alertify.set('notifier', 'position', position);
			if(type == "success") {
				alertify.success(msg);
			} else if(type == "warning") {
				alertify.warning(msg);
			} else if(type == "error") {
				alertify.error(msg);
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
		alert: function(ret) {
			if(ret.title == null)
				ret.title = "提示";
			if(ret.closeButton == null)
				ret.closeButton = false;
			if(ret.basic == null)
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
		confirm: function(ret) {
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
		prompt: function(title, labelText, placeholder, okFun, cancelFun) {
			alertify.prompt(title, labelText, placeholder, function(evt, value) {
				okFun(value);
			}, function() {
				cancelFun();
			}).set('labels', {
				ok: '确定',
				cancel: '取消'
			});
		},
	},

	//element操作提示
	Element: {
		alert: function(doc, msg, yesback) {
			doc.$alert(msg, '操作提示', {
				confirmButtonText: '确定',
				callback: function() {
					if(yesback && typeof yesback == 'function')
						yesback();
				}
			});
		},

		$confirm: function(dom, msg, yesback, noback) {
			dom.$confirm(msg, "提示", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(yesback)
				.catch(noback);
		},

		//element消息提示
		msgTip: function(doc, msg) {
			doc.$message({
				showClose: true,
				message: msg,
				type: 'error',
				center: true
			});
		},
	},

	//窗口
	Win: {
		open: function(name, url, params) {
			var curUrl = url + '?' + new Date().getTime();
			if(params) {
				if(typeof params == 'object') {
					params = JSON.stringify(params);
					curUrl += '&param=' + params;
				} else {
					curUrl += '&' + params;
				}
			}

			location.href = curUrl;
		},
		close: function() {
			window.history.back();
		}
	},

	getCode: function(str, count, radix) {
		//new Date().getTime()
		//guid唯一代码
		//str 前缀
		//count:为数字长度
		//radix:为基数，10：十进制，16：十六进制
		var guid = "";
		for(var i = 1; i <= count; i++) {
			var n = Math.floor(Math.random() * radix).toString(radix);
			guid += n;
		}
		return str + guid.toUpperCase();
	},

	getObjLength: function(obj) {
		var c = 0;
		if(!obj) {
			return c;
		}
		if($.isArray(obj)) {
			return obj.length;
		} else {
			if(!$.isPlainObject(obj)) {
				return c;
			}
			for(var i in obj) {
				c++;
			}
			return c;
		}
	},

	//弹出等待自动关闭
	toast: function(text, time) {
		if(time == null)
			time = 3000;

		//浏览器
		var cur = new auiToast();

		cur.toast({
			title: text,
			duration: time
		});
	},

	//显示进度提示框
	showProgress: function(args) {
		if(jsTools.Res.toast == null) {
			jsTools.Res.toast = new auiToast();
			jsTools.Res.toast.loading({
				title: args.title
			});
		}

	},
	//隐藏进度提示框
	hideProgress: function() {
		if(jsTools.Res.toast != null) {
			jsTools.Res.toast.hide();
			jsTools.Res.toast = null;
		}
	},

	getDay: function(value) {
		switch(value) {
			case 0:
				return "周日";
			case 1:
				return "周一";
			case 2:
				return "周二";
			case 3:
				return "周三";
			case 4:
				return "周四";
			case 5:
				return "周五";
			case 6:
				return "周六";
		}
	},

	addDays: function(date, days) {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	},

	//获取url 参数
	getQueryString: function(name) {

		var url = window.location.href;
		if(new RegExp(".*\\b" + name + "\\b(\\s*=([^&]+)).*", "gi").test(url)) {
			return RegExp.$2;
		} else {
			return null;
		}
	},

	rndNum: function(n) {
		var rnd = "";
		for(var i = 0; i < n; i++) {
			rnd += Math.floor(Math.random() * 10);
		}
		return rnd;
	},

	//创建条码
	createBarcode: function(arg, index, elId) {
		//index = 1 : 条形码; = 2 : 二维码
		if(arg == '') {
			return;
		}

		var curEl = elId;
		if(curEl == null) {
			curEl = 'imgbarcode' + index;
		}
		curEl = '#' + curEl;

		if(index == 1) {
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
		} else if(index == 2) {
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

	loadScript: function(url, callback) {  
		var script = document.createElement("script");  
		script.type = "text/javascript";  
		if(typeof(callback) != "undefined") {    
			if(script.readyState) {      
				script.onreadystatechange = function() {        
					if(script.readyState == "loaded" || script.readyState == "complete") {          
						script.onreadystatechange = null;          
						callback();        
					}      
				};    
			} else {      
				script.onload = function() {        
					callback();      
				};    
			}  
		}  
		script.src = url;  
		document.body.appendChild(script);
	},

	
	addPreZero: function(num) {
		return('000' + num).slice(-4);
	},

	startInterval: function(el, className) {
		//验证码(用于获取验证码)		
		if(jsTools.Res.count > 0) return;

		jsTools.Res.count = jsTools.Res.times;
		var initCount = jsTools.Res.count + 1;
		$(el).val("重新获取(" + initCount + "s" + ")");
		$(el).attr("disabled", true);
		$(el).removeClass(className);

		var countdown = setInterval(function() {
			$(el).val("重新获取(" + jsTools.Res.count + "s" + ")");
			if(jsTools.Res.count <= 0) {
				clearInterval(countdown);
				jsTools.Res.count = 0;
				$(el).val("重新获取").attr("disabled", false);
				$(el).addClass(className);
			} else
				jsTools.Res.count--;
		}, 1000);

	},
	endInterval: function() {
		jsTools.Res.count = 0;
	},

	convertToNumber: function(value) {
		switch(value) {
			case "A":
				return 10;
			case "B":
				return 12;
			case "C":
				return 13;
			case "D":
				return 14;
			case "E":
				return 15;
			case "F":
				return 16;
			case "G":
				return 17;
			case "H":
				return 18;
			case "I":
				return 19;
			case "J":
				return 20;
			case "K":
				return 21;
			case "L":
				return 23;
			case "M":
				return 24;
			case "N":
				return 25;
			case "O":
				return 26;
			case "P":
				return 27;
			case "Q":
				return 28;
			case "R":
				return 29;
			case "S":
				return 30;
			case "T":
				return 31;
			case "U":
				return 32;
			case "V":
				return 34;
			case "W":
				return 35;
			case "X":
				return 36;
			case "Y":
				return 37;
			case "Z":
				return 38;
			default:
				return parseInt(value);
		}
	},

	//根据字母获取车牌号汉字代码
	GetCarCode: function(matchCode) {
		var names = "京,津,冀,晋,蒙,辽,吉,沪,黑,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,桂,琼,渝,川,黔,云,藏,陕,甘,青,宁,新,港,澳,台";
		var codes = "J,J,J,J,M,L,J,H,H,S,Z,W,M,G,L,Y,E,X,Y,G,Q,Y,C,Q,Y,Z,S,G,Q,N,X,G,O,T";
		var list = [];
		if(matchCode != "" || matchCode != null) {
			var nameList = names.split(',');
			var codeList = codes.split(',');
			for(var i = 0; i < codeList.length; i++) {
				if(codeList[i] == matchCode) {
					var dat = {};
					dat.Key = codeList[i];
					dat.Caption = nameList[i];
					list.push(dat);
				}
			}
		}
		return list;
	},

	//验证箱号是否符合标准(前4位字母后7位数字)
	isCtnNo: function(no) {
		if(no == "" || no == null)
			return false;
		if(no.length != 11)
			return false;
		var noLetter = no.substring(0, 4);
		var noNumber = no.substring(4, 11);
		var RegL = /^[A-Za-z]+$/;
		var regN = /^[0-9]*$/;
		if(RegL.test(noLetter) && regN.test(noNumber)) {
			return true;
		} else {
			return false;
		}
	},

	//设置页面关闭时间
	PageTimeOut: function(count) {
		var lastTime = new Date().getTime();
		var currentTime = new Date().getTime();
		var timeOut = count * 60 * 1000; //设置超时时间： 10分
		$(function() {
			/* 鼠标移动事件 */
			$(document).mouseover(function() {
				lastTime = new Date().getTime(); //更新操作时间

			});
		});

		function testTime() {
			currentTime = new Date().getTime(); //更新当前时间
			if(currentTime - lastTime > timeOut) { //判断是否超时
				window.location.href = 'main_app.html';
				console.log("长时间未操作,自动回到主页");
			}
		}
		/* 定时器  间隔1秒检测是否长时间未操作页面  */
		window.setInterval(testTime, 1000);

	},

	//验证是否车牌号
	IsCarNo: function(carNo) {
		var result = false;
		if(carNo.length == 7) {
			var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
			result = reg.test(carNo);
		}
		return result;
	},

	//获取时间
	GetNowDate: function(type, callbackTpye) {
		var myDate = new Date();
		//获取当前年
		var year = myDate.getFullYear();
		//获取当前月
		var month = myDate.getMonth() + 1;
		//获取当前日
		var date = myDate.getDate();
		var h = myDate.getHours(); //获取当前小时数(0-23)
		var m = myDate.getMinutes(); //获取当前分钟数(0-59)
		var s = myDate.getSeconds(); //获取当前秒数(0-59)
		var ms = myDate.getMilliseconds(); //获取当前毫秒数(0-999)
		var nowDate = "";
		if(callbackTpye == 'N') {
			switch(type) {
				case "Y":
					nowDate = p(year).toString();
					break;
				case "M":
					nowDate = p(month).toString();
					break;
				case "D":
					nowDate = p(date).toString();
					break;
				case "H":
					nowDate = p(h).toString();
					break;
				case "m":
					nowDate = p(m).toString();
					break;
				case "s":
					nowDate = p(s).toString();
					break;
				case "ms":
					nowDate = p(ms).toString();
					break;
				case "All":
					nowDate = year + p(month).toString() + p(date).toString() + p(h).toString() + p(m).toString() + p(s).toString() +
						ms;
					break;
				case "Date":
					nowDate = year + p(month).toString() + p(date).toString() + p(h).toString() + p(m).toString() + p(s).toString();
					break;
				case "day":
					nowDate = year + p(month).toString() + p(date).toString();
					break;
				case "timePort":
					nowDate = p(h).toString() + p(m).toString() + p(s).toString() + ms;
					break;
			}
		} else {
			switch(type) {
				case "Y":
					nowDate = p(year).toString();
					break;
				case "M":
					nowDate = p(month).toString();
					break;
				case "D":
					nowDate = p(date).toString();
					break;
				case "H":
					nowDate = p(h).toString();
					break;
				case "m":
					nowDate = p(m).toString();
					break;
				case "s":
					nowDate = p(s).toString();
					break;
				case "ms":
					nowDate = p(ms).toString();
					break;
				case "All":
					nowDate = year + '-' + p(month).toString() + '-' + p(date).toString() + ' ' + p(h).toString() + ':' + p(m).toString() +
						':' + p(s).toString() + ':' + ms;
					break;
				case "Date":
					nowDate = year + '-' + p(month).toString() + '-' + p(date).toString() + ' ' + p(h).toString() + ':' + p(m).toString() +
						':' + p(s).toString();
					break;
				case "day":
					nowDate = year + '-' + p(month).toString() + '-' + p(date).toString();
					break;
				case "timePort":
					nowDate = p(h).toString() + ':' + p(m).toString() + ':' + p(s).toString() + ':' + ms;
					break;
			}
		}
		return nowDate;
	},
};

var jsCheck = {
	//身份证验证
	isIdCard: function(code) {
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

		if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
			tip = "身份证号格式错误";
			pass = false;
		} else if(!city[code.substr(0, 2)]) {
			tip = "地址编码错误";
			pass = false;
		} else {
			//18位身份证需要验证最后一位校验位
			if(code.length == 18) {
				code = code.split('');
				//∑(ai×Wi)(mod 11)
				//加权因子
				var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
				//校验位
				var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
				var sum = 0;
				var ai = 0;
				var wi = 0;
				for(var i = 0; i < 17; i++) {
					ai = code[i];
					wi = factor[i];
					sum += ai * wi;
				}
				var last = parity[sum % 11];
				if(parity[sum % 11] != code[17]) {
					tip = "校验位错误";
					pass = false;
				}
			}
		}
		//		if(!pass) alert(tip);
		return pass;
	},

	addBlur: function(id, check) {
		var dom = document.getElementById(id);
		//注册一个失去焦点的事件
		dom.onblur = function() {
			check(dom);
		}
	},

	//用户名验证
	isuser: function(obj) {
		//    var reg=/{1,8}[a-zA-Z0-9]{1,8}/;
		if(obj == null || obj == '') {

			// jsTools.alert("请正确填写用户名！");
			return false;
		}
		return true;
	},

	//电话号码验证
	isphone: function(obj) {
		var reg = /^[0-9]{11}/;
		if(!reg.test(obj)) {
			obj = '';
			//            jsTools.alert("请正确填写手机号！");
			return false;
		}
		return true;
	},

	//组织机构代码验证
	isOrgCode: function(obj) {
		var reg = /^[0-9]{18}/;
		if(!reg.test(obj)) {
			return false;
		}
		return true;
	},

	//联合国编号验证
	isUnno: function(obj) {
		var reg = /^[0-9]{4}/;
		if(!reg.test(obj)) {
			return false;
		}
		return true;
	},

	//验证邮件格式
	ismail: function(obj) {
		var reg = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
		if(!reg.test(obj)) {
			obj = '';
			// jsTools.alert("请正确填写邮件！");
			return false;
		}
		return true;
	},

	//验证用户名格式
	isname: function(obj) {
		var reg = /^[\u4e00-\u9fa5]{2,4}$/;
		if(!reg.test(obj)) {
			// jsTools.alert("请正确填写姓名！姓名为两到四个汉字。");
			obj.value = "";
		}
	},

	//校验箱号
	checkCtnNo: function(containerNo) {
		var reg = /^[A-Z]{4}\d{7}$/;
		if(!reg.test(containerNo))
			return false;

		if(containerNo.indexOf("HLCU") == 0)
			containerNo = "4029" + containerNo.substr(4);

		var sum = 0;
		for(var i = 0; i < 10; i++) {
			sum += parseInt(jsTools.convertToNumber(containerNo.substr(i, 1)) * Math.pow(2.0, i));
		}

		if(((sum % 11) == parseInt(containerNo.substr(10, 1))) ||
			((sum % 11) == 10 && parseInt(containerNo.substr(10, 1)) == 0)) {
			return true;
		} else {
			return false;
		}
	}

};

String.prototype.format = function(args) {
	if(arguments.length > 0) {
		var result = this;
		if(arguments.length == 1 && typeof(args) == "object") {
			for(var key in args) {
				var reg = new RegExp("({" + key + "})", "g");
				result = result.replace(reg, args[key]);
			}
		} else {
			for(var i = 0; i < arguments.length; i++) {
				if(arguments[i] == undefined) {
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

String.prototype.stringDateFormat = function(fmt) {
	if(this) {
		var strDate = this.substr(0, 10);
		var dtArr = strDate.split("-");
		var dt = new Date(dtArr[0], dtArr[1], dtArr[2]);
		return dt.format(fmt);
	} else {
		return new Date(Date.now()).format(fmt);
	}
}

Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}

	return fmt;
}