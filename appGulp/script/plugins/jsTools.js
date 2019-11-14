var jsTools = {

	//资源文件
	Res: {
		
		isDebug: false,	//正式和测试环境切换
		hostIp: 'https://eharbor.hb56.com',
		prewinName: 'prewinName', //上一个界面名
		winName: 'winName', //当前界面名
		system: 'eharboradmin-system', //系统信息
		host: 'eharboradmin-host',
		currentUrl: 'eharboradmin-currentUrl',
		userNumber: 'eharboradmin-userNumber', //用户名
		downloadPath: 'eharboradmin-downloadPath', //下载路径
		busInfo: 'eharboradmin-businessInfo', //业务系统信息
		serverIp: 'https://eharbor.hb56.com',
		webSocketIp: 'https://eharbormessage.hb56.com',
		port: '9001', //端口
		webSocketPort: '80', //websocket 端口
		appSavePath: 'fs://',
		VERSION: '1.0.3', //版本号
		curSystem: 'web',
		userInfo: 'eharboradmin-userInfo', //用户信息
		hisInfo: 'eharboradmin-hisInfo', //历史信息
		orderData: 'eharboradmin-orderData', //订单信息
		toast: null, //全局的toast变量
		timer : null,
		times: 59,
		count: 0,
	},

	//动画
	animate: function(dom, ani) {
		var el = $(dom);

		var name = ani + ' animated';
		el.addClass(name);
	},
	//初始化服务
	initService: function(ret) {
		if(jsTools.Res.isDebug) {
			ret.host = 'http://192.168.5.22';
			ret.port = '8080';

			ret.messageHost = 'http://192.168.5.22';
			ret.messagePort = '8081';
		} else {
			ret.host = jsTools.Res.serverIp;
			ret.port = jsTools.Res.port;

			ret.messageHost = jsTools.Res.webSocketIp;
			ret.messagePort = jsTools.Res.webSocketPort;
		}
	},
	
	// 数字格式化
	numberFormat: function(num) {
		var num = (num || 0).toString(),
			result = '';

		var arr = num.split('.');

		while(arr[0].length > 3) {
			result = ',' + arr[0].slice(-3) + result;
			arr[0] = arr[0].slice(0, arr[0].length - 3);
		}
		if(arr[0]) {
			result = arr[0] + result;
		}
		if(arr[1]) {
			result = result + '.' + arr[1];
		}
		return result;
	},
	
	debounce : function(fn,delayTime){
		//函数防抖
		clearTimeout(jsTools.Res.timer);
		jsTools.Res.timer = setTimeout(function(){
			fn.call();
		},delayTime);
	},

	//初始化方法兼容android,ios,web页面打开方式
	initPage: function(callback) {

		if(jsTools.getCurSystem() == 'app') {
			jsApi.ready(function() {

				jsApi.parseTapmode();
				FastClick.attach(document.body);
				callback();
			});

		} else {
			jsTools.Storage.setVal(jsTools.Res.currentUrl, location.href);
			callback();
		}
	},

	initSystem: function() {
		var str = '';
		if(/MicroMessenger/i.test(navigator.userAgent)) {
			str = 'wx';
		} else if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
			str = 'app';
		} else {
			str = 'web';
		};
		jsTools.Storage.setVal(jsTools.Res.system, str);
		return str;
	},
	//获取当前系统
	getCurSystem: function() {
		return jsTools.Res.curSystem;
		//		return jsTools.initSystem();
	},
	//获取系统类型
	getSystemType: function() {
		if(jsTools.Res.curSystem == 'web') {
			return jsTools.Res.curSystem;
		} else {
			return jsApi.systemType();
		}
	},
	
	//判断是否显示按钮
	isButtonShow:function(){
		if(jsTools.Res.curSystem != 'web') {
			if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
				return false;
			}
		}
		return false;	//TODO:暂时不放开
	},

	//全局用户名
	userNumber: function() {
		if(typeof phAjax != 'undefined' && phAjax.userNumber == 'Guest') {
			jsTools.Storage.removeVal(jsTools.Res.userInfo);
			jsTools.Storage.setVal(jsTools.Res.userNumber, phAjax.userNumber);
		}

		return jsTools.Storage.getVal(jsTools.Res.userNumber);
	},

	//判断是否已经登录
	isLogon: function() {
		var userNumber = jsTools.userNumber();
		if(userNumber == null || userNumber == "Guest") {
			return false;
		}
		return true;
	},
	//关闭应用
	closeWidget: function() {
		jsApi.closeWidget();
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

	getScript: function(callback) {
		$.getScript(jsTools.Res.hostIp + '/res/resource.js?' + encodeURI(jsTools.Res.VERSION), function() {
			callback();
		});
	},

	ajax: function(ret, callback, errorback, showErrMsg) {
		var isShow = ret.title != null && ret.title.length > 0;
		if(isShow) {
			jsTools.showProgress({
				title: ret.title
			});
		}
		//默认显示错误信息
		if(showErrMsg == null)
			showErrMsg = true;

		console.log('phajaxQuery:' + JSON.stringify(ret));
		phAjax.execute({
			disHead: ret.disHead,
			serviceName: ret.serviceName,
			data: ret.data,
			timeout: ret.timeout == null ? 20000 : ret.timeout,
			onSuccess: function(response) {
				console.log('phajaxData:' + JSON.stringify(response));
				if(isShow)
					jsTools.hideProgress();

				var result = response.ResultModel;

				if(callback && typeof callback == 'function') {

					if(result != null && result.NeedSkipBackUrl == 0) {
						//针对跳转问题
						if(result.Status != 0) {
							jsTools.toast(result.ErrorMsg, '2000', 'custom');
						} else {
							var dat = result;
							callback(dat);
						}
						return;
					}

					if(result != null && result.Status == 0) {
						var dat = result.Msg;
						callback(dat);
					} else if(result.Status == 2) {
						var dat = result.Msg;
						callback(dat);
						//处理中
					} else {
						if(result.ErrorMsg != null && errorback && typeof errorback == 'function')
							errorback(result.ErrorMsg, result);
						else {
							if(result.ErrorMsg != null)
								jsTools.toast(result.ErrorMsg, '2000', 'fail');
						}
					}

				}
			},
			onError: function(XMLHttpRequest, textStatus, errorThrown) {
				if(isShow)
					jsTools.hideProgress();

				jsTools.onErrorFunc(XMLHttpRequest, ret.serviceName);
			}
		});
	},

	onErrorFunc: function(xmlHttpRequest, serviceName) {

		var errorMsg = "调用Service:" + serviceName + "失败! status: " + xmlHttpRequest.status + ',' + xmlHttpRequest.statusText + ", response: " + xmlHttpRequest.responseText;
		console.log(errorMsg);

		if(xmlHttpRequest.status === 401) {
			var msg = xmlHttpRequest.responseJSON.Message;

			if(msg.indexOf('系统管理员解锁') >= 0) {
				msg = '该用户登录次数超过限制被锁定30分钟,可进行密码找回解锁用户！';
				jsTools.toast(msg, '2000,', 'fail');
				return;
			} else if(msg.indexOf('用户不存在') >= 0) {
				msg = '该用户不存在，请确认用户名！';
			} else if(msg.indexOf('口令验证失败') >= 0) {
				msg = '该用户登陆密码错误，请检查！';
			} else if(msg.indexOf('验证码输入错误') >= 0) {
				msg = '验证码输入错误，请检查！';
			} else if(msg.indexOf('此业务系统账号只允许公司会员登陆') >= 0) {
				msg = '此业务系统账号只允许公司会员登陆, 请确认！';
			} else if(msg.indexOf('此业务系统账号只允许个人会员登陆') >= 0) {
				msg = '此业务系统账号只允许个人会员登陆, 请确认！';
			}

			jsTools.toast(msg, '2000,', 'fail');
		} else if(xmlHttpRequest.status == 0) {
			if(xmlHttpRequest.statusText == 'error') {
				//关闭错误
			} else if(xmlHttpRequest.statusText == 'timeout') {
				jsTools.toast('调用服务：' + serviceName + '，网络超时，请检查您的网络配置后刷新页面！', '2000,', 'fail');
			}
		} else {
			jsTools.toast(errorMsg, '2000,', 'fail');
		}
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
	setStatusBarStyle: function(style, color) {
		if(jsTools.getCurSystem() == 'app')
			jsApi.setStatusBarStyle(style, color);
	},
	//窗口
	Win: {
		open: function(name, url, params, reload) {

			if(jsTools.getCurSystem() == 'app') {
				jsApi.win.open(name, url, params, reload);
			} else {
				var curUrl = url + '?' + new Date().getTime();
				if(params != null) {
					if(typeof params == 'object') {
						params = JSON.stringify(params);

					}

					curUrl += '&param=' + params;
				}

				location.href = curUrl;
			}

		},
		close: function() {
			if(jsTools.getCurSystem() == 'app') {
				jsApi.win.close();

			} else {
				history.back();
			}

		},
		closeToWin: function(name) {
			if(jsTools.getCurSystem() == 'app') {
				jsApi.win.closetoWin(name);
			} else {
				if(name.indexOf('.html') == -1) {
					name += '.html';
				}
				window.location.href = name;
			}

		},
		init: function() {
			if(jsTools.getCurSystem() == 'app') {
				jsApi.win.init();
			}
		},
		initFrms: function(arr) {
			if(jsTools.getCurSystem() == 'app') {
				jsApi.win.initFrms(arr);
			}

		},
		initFrm: function(el, url, bounces, params, reload) {
			if(jsTools.getCurSystem() == 'app') {
				jsApi.win.initFrm(el, url, bounces, params, reload);
			}
		},
		setFrmGroupIndex: function(index) {
			if(jsTools.getCurSystem() == 'app') {
				jsApi.win.setFrmGroupIndex(index);
			}
		}
	},

	//打开文件（PDF）
	openFile: function(ret) {
		if(jsTools.getCurSystem() == 'app') {
			jsApi.openFile(ret);
		} else {
			jsTools.Win.open('file', ret);
		}
	},

	//弹出框
	toast: function(text, time, type) {
		time = parseInt(time) + 1000;
		if(jsTools.getCurSystem() == 'app') {
			//原生
			jsApi.ui.toast(text, time);
			return;
		}

		//浏览器
		var toast = new auiToast();
		if(!type)
			type = 'success';

		switch(type) {
			case "success":
				toast.success({
					title: text,
					duration: time
				});
				break;
			case "fail":
				toast.fail({
					title: text,
					duration: time
				});
				break;
			case "custom":
				toast.custom({
					title: text,
					html: '<i class="aui-iconfont aui-icon-info"></i>',
					duration: time
				});
				break;
		}
	},

	dialog: {
		alert: function(msg, callback) {
			var dialog = new auiDialog();
			dialog.alert({
				title: "提示",
				msg: msg,
				buttons: ['确定']
			}, function(ret) {
				if(ret.buttonIndex == 1) {
					callback();
				}
			});
		},

		confirm: function(msg, callback, cancelCallback) {
			var dialog = new auiDialog();
			dialog.alert({
				title: "提示",
				msg: msg,
				buttons: ['取消', '确定']
			}, function(ret) {
				if(ret.buttonIndex == 2) {
					callback();
				} else {
					if(cancelCallback && typeof cancelCallback == 'function')
						cancelCallback();
				}
			});
		},
		custom: function(title, contentHtml, callback, cancelback) {
			var dialog = new auiCustomCode();

			dialog.alert({
				title: title,
				content: contentHtml,
				buttons: ['取消', '确定']
			}, function(ret) {
				if(ret.buttonIndex == 2 && ret.customCode != null) {
					if(typeof callback == 'function')
						callback(ret.customCode, dialog);

					//dialog.close();	
				} else {
					if(typeof cancelCallback == 'function')
						cancelCallback();
					dialog.close();
				}
			});

		}
	},

	//显示进度提示框
	showProgress: function(args) {

		if(jsTools.Res.toast == null) {
			jsTools.Res.toast = new auiToast();
			jsTools.Res.toast.loading({
				title: args.title
			});
		} else {
			jsTools.Res.toast.changeTitle({
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

	//创建条码
	createBarcode: function(strUrl, index, elId, width, height) {
		//index = 1 : 条形码; = 2 : 二维码
		if(strUrl == '' || strUrl == null) {
			return;
		}

		if(width == null)
			width = index == 1 ? 1 : 100;

		if(height == null)
			height = index == 1 ? 80 : 100;

		var curEl = elId;
		if(curEl == null) {
			curEl = 'imgbarcode' + index;
		}
		curEl = '#' + curEl;

		if(index == 1) {
			$(curEl).attr("src", "");
			JsBarcode(curEl, strUrl, {
				format: "CODE39", //选择要使用的条形码类型
				width: width, //设置条之间的宽度
				height: height, //高度
				displayValue: true, //是否在条形码下方显示文字
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
				text: strUrl,
				width: width, //二维码的宽度  
				height: height, //二维码的高度  
				background: "#ffffff", //二维码的后景色  
				foreground: "#000000", //二维码的前景色  
				src: '../image/logo.png' //二维码中间的图片  
			});
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

	//发送事件
	sendEvent: function(name, args) {
		if(jsTools.getCurSystem() == 'app') {
			jsApi.sendEvent(name, args);
		} else {

		}
	},
	//增加事件监听
	addEvent: function(name, fn) {
		if(jsTools.getCurSystem() == 'app') {
			jsApi.addEventListener(name, fn);
		} else {

		}
	},

	thirdSendEventer: function(callback) {
		if(jsTools.getCurSystem() == 'app')
			jsApi.thirdSendEventer(callback);
	},

	//清理缓存
	clearCache: function(callback) {
		if(jsTools.getCurSystem() == 'app')
			jsApi.clearCache(callback);
	},

	exit: function() {
		if(jsTools.getCurSystem() == 'app') {
			jsApi.closeWidget();
		}
	},

	//重新注册退出事件
	exitApp: function() {
		if(jsTools.getCurSystem() == 'app') {
			jsApi.exitApp();
		}

	},

	isHasNetwork: function(callback) {
		jsApi.isHasNetwork(callback);
	},

	checkVersion: function(isShowMsg) {
		if(jsTools.getCurSystem() != 'app') return;

		if(typeof isShowMsg == 'undefined')
			isShowMsg = true;

		var dat = {
			title: '检查中...',
			disHead: true,
			serviceName: jsTools.Server.GetSysUpdateInfoService,
			data: {
				Parameter: jsApi.systemType() + 'admin'
			}
		};

		jsTools.ajax(dat, function(ret) {
			if(ret == null) return;

			var fileName = '';
			var filePath = ret.Path;
			var msg = ret.Msg;

			var arr = filePath.split('/');
			fileName = arr[arr.length - 1];

			if(!ret.State) return;

			if(ret.Version > jsTools.Res.VERSION) {
				if(ret.State == 1) {
					//选择升级
					jsApi.ui.confirm(msg, function() {
						if(jsApi.systemType() == "android") {
							var savedPath = jsTools.Res.appSavePath + fileName;
							//解决客户端缓存问题

							jsApi.file.down(filePath, savedPath, function() {
								jsApi.installApp(savedPath);
							});
						} else {
							jsApi.installApp(filePath);
						}
					});
				} else if(ret.State == 2) {
					//强制升级
					jsApi.ui.alert(msg, function() {
						if(jsApi.systemType() == "android") {
							var savedPath = jsTools.Res.appSavePath + fileName;
							//解决客户端缓存问题

							jsApi.file.down(filePath, savedPath, function() {
								jsApi.installApp(savedPath);
							});
						} else {
							jsApi.installApp(filePath);
						}
					});
				}

			} else {
				if(isShowMsg)
					jsApi.ui.toast('该版本为最新版本，无需更新！', '2000');
			}
		});
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

	addDays: function(date, days) {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	},

	//获取URL参数,默认是param
	getQueryString: function(name) {
		if(name == null || typeof name == 'undefined')
			name = 'param';
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return decodeURI(r[2]);
		return null;
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

	rndNum: function(n) {
		var rnd = "";
		for(var i = 0; i < n; i++) {
			rnd += Math.floor(Math.random() * 10);
		}

		return rnd;
	},

	addPreZero: function(num) {
		return('000' + num).slice(-4);
	},

	startInterval: function(el, className) {
		//验证码(用于获取验证码)	
		if(jsTools.Res.count > 0) return;

		jsTools.Res.count = jsTools.Res.times;
		var initCount = jsTools.Res.count + 1;
		$(el).text("重新获取(" + initCount + "s" + ")");
		$(el).attr("disabled", true);
		$(el).removeClass(className);

		var countdown = setInterval(function() {
			$(el).text("重新获取(" + jsTools.Res.count + "s" + ")");
			if(jsTools.Res.count <= 0) {
				clearInterval(countdown);
				jsTools.Res.count = 0;
				$(el).text("重新获取").attr("disabled", false);
				$(el).addClass(className);
			} else
				jsTools.Res.count--;
		}, 1000);

	},
	endInterval: function() {
		jsTools.Res.count = 0;
	},

	openConfig: function() {
		//if(jsTools.getCurSystem() == 'web') return;
		jsTools.Res.count++;
		if(jsTools.Res.count >= 10) {
			jsTools.Res.count = 0;
			jsTools.Win.open('Config', 'Config.html');
		}
	},

	//将JSON转为&连接的字符串
	jsonToParams: function(param) {
		var result = ""
		for(var name in param) {
			if(typeof param[name] != 'function') {
				result += "&" + name + "=" + encodeURI(param[name]);
			}
		}
		return result.substring(1)
	},

	paramsToJson: function(str) {
		var arr = str.split('&');
		var args = {};
		for(var name in arr) {
			var tmp = arr[name].split('=');
			args[tmp[0]] = tmp[1];
		}
		return args;
	},

	formSubmit: function(ret) {
		//表单提交
		var turnForm = document.createElement("form");
		//一定要加入到body中！！   
		document.body.appendChild(turnForm);
		turnForm.method = ret.method;
		turnForm.action = ret.action;
		turnForm.style.display = 'none';

		for(var x in ret) {
			if(x != 'action' && x != 'method') {
				var opt = document.createElement("input");
				opt.name = x;
				opt.type = 'hidden';
				opt.value = ret[x];
				turnForm.appendChild(opt);
			}
		}

		turnForm.submit();
	}
};

var jsCheck = {
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

			alert("请正确填写用户名！");
			return false;
		}
		return true;
	},
	//身份证
	isTaxID: function(obj) {
		if(obj != null && obj.length == 18) {
			return true;
		} else {
			return false;
		}
	},

	//电话号码验证
	isphone: function(obj) {
		var reg = /^1[0-9]{10}/;
		if(!reg.test(obj)) {
			obj = '';
			//            bootbox.alert("请正确填写手机号！");
			return false;
		}
		return true;
	},

	//验证邮件格式
	ismail: function(obj) {
		var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
		if(!reg.test(obj)) {
			obj = '';
			//			bootbox.alert("请正确填写邮件！");
			return false;
		}
		return true;
	},

	//验证用户名格式
	isname: function(obj) {
		var reg = /^[\u4e00-\u9fa5]{2,4}$/;
		if(!reg.test(obj)) {
			alert("请正确填写姓名！姓名为两到四个汉字。");
			obj.value = "";
		}
	},
	//验证登录密码(8-20位字母数字组合)
	isPassword: function(obj) {

		var reg = /^(?!([a-z]+|\d+)$)[a-z\d]{8,20}$/i;
		if(!reg.test(obj)) {

			return false;
		}
		return true;
	},
	//验证支付密码(6位数字)
	isPayPassword: function(obj) {
		var reg = /^\d{6}$/;
		if(!reg.test(obj)) {

			return false;
		}
		return true;
	},
	isUrl: function(str) {
		var RegUrl = new RegExp();
		RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
		if(!RegUrl.test(str)) {
			return false;
		}

		return true;
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
		var dt = new Date(dtArr[0], dtArr[1] - 1, dtArr[2]);
		return dt.format(fmt);
	} else {
		return new Date(Date.now()).format(fmt);
	}
}

//用于结束日期自动+1一天
String.prototype.stringAddDay = function(day) {
	if(!this) return null;
	var strDate = this.substr(0, 10);
	var dtArr = strDate.split("-");
	var dt = new Date(dtArr[0], dtArr[1] - 1, dtArr[2]);
	dt.setDate(dt.getDate()+day);
	return dt.format('yyyy-MM-dd');
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