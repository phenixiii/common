//该API用于访问原生信息
(function() {

	var jsApi = {};

	//打开目前是PDF[2019-03-08]
	jsApi.openFile = function(ret) {
		var pdfReader = api.require('pdfReader');
		pdfReader.open({
			path: ret,
			hidden: {
				print: true,
				export: true,
				bookmark: true,
				email: true
			}
		});
	}

	//打电话
	jsApi.call = function(ret) {
		api.call({
			type: 'tel_prompt',
			number: ret
		});
	}
	//扫描二维码
	jsApi.scanner = function(callback) {

		var FNScanner = api.require('FNScanner');

		FNScanner.open({
			autorotation: true
		}, function(ret, err) {
			if(ret) {
				callback(ret);
			} else {
				callback(err);
			}
		});
	}
	//扫描二维码
	jsApi.fnscanner = function(callback) {
		var FNScanner = api.require('FNScanner');
		FNScanner.openScanner({
			autorotation: true
		}, function(ret, err) {
			if(ret) {
				callback(ret);
			} else {
				callback(err);
			}
		});
	}
	//网路检查
	jsApi.isHasNetwork = function(callback) {
		/**
		 	unknown            //未知
			ethernet        //以太网
			wifi            //wifi
			2g                //2G网络
			3g                //3G网络
			4g                //4G网络
			none            //无网络
		 **/
		if(jsTools.getCurSystem() == 'app') {
			var connectionType = api.connectionType.toUpperCase();
			//			console.log(connectionType);
			if(connectionType == '5G' || connectionType == '4G' || connectionType == 'WIFI') {
				if(callback && typeof callback == 'function')
					callback();
			} else {
				jsTools.toast('网络状况不理想,请选择合适网络！', 2000);
			}
		} else {
			if(callback && typeof callback == 'function')
				callback();
		}

	}
	//click to tap
	jsApi.parseTapmode = function() {
		api.parseTapmode();
	}
	//拍照和获取系统图片
	jsApi.getPicture = function(options, callback) {
		var defaults = {
			sourceType: 'camera',
			encodingType: 'jpg',
			mediaValue: 'pic',
			destinationType: 'url',
			allowEdit: true,
			quality: 50,
			targetWidth: 100,
			targetHeight: 100,
			saveToPhotoAlbum: false
		};

		options = $.extend(defaults, options);

		api.getPicture(options, function(ret, err) {
			if(ret) {
				callback(ret);
			} else {
				callback(err);
			}
		});
	}
	//打开日期选择器
	jsApi.openCalendar = function(options, callback) {

		var defaults = {
			type: 'date',
			date: new Date().format('yyyy-MM-dd'),
			title: '选择日期'
		};

		options = $.extend(defaults, options);

		api.openPicker(options, function(ret, err) {
			if(ret) {
				var cur = ret.year + '/' + ret.month + '/' + ret.day;
				var tmp = new Date(cur);
				cur = tmp.format('yyyy-MM-dd');
				callback(cur, tmp);
			} else {
				alert(JSON.stringify(err));
			}

		});
	}
	//系统类型
	jsApi.systemType = function() {
		return api.systemType;
	};
	//安装App
	jsApi.installApp = function(appPath) {
		api.installApp({
			appUri: appPath
		});
	}
	//卸载应用支持android
	jsApi.uninstallApp = function(pkgName) {
		api.uninstallApp({
			packageName: pkgName
		});
	}

	jsApi.file = {
		//文件上传
		upload: function(upLoadHttp, filePath, callback) {
			api.ajax({
				url: upLoadHttp,
				method: 'post',
				cache: false,
				timeout: 10,
				//			contentType: "application/json; charset=utf-8",
				data: {
					//				stream : filePath,
					files: {
						filename: filePath
					}
				}
			}, function(ret, err) {
				if(ret) {
					callback(ret);
				} else {

					callback(err);
				}
			});
		},
		//文件下载
		down: function(downloadPath, savedPath, callback) {
			api.download({
				url: downloadPath + '?' + new Date().getTime(),
				savePath: savedPath,
				report: true,
				cache: false,
				allowResume: true
			}, function(ret, err) {
				if(ret.state == 0) {
					api.showProgress({
						title: '下载中...',
						text: '完成度：' + ret.percent + '%',
						modal: true
					});
				} else if(ret.state == 1) {
					api.hideProgress();
					//下载成功
					callback();
				} else if(ret.state == 2) {
					api.hideProgress();
					api.alert({
						msg: JSON.stringify(err)
					});
				}
			});
		},
		//文件删除
		del: function(path, callback) {
			var fs = api.require('fs');
			fs.exist({
				path: path
			}, function(ret, err) {
				if(ret.exist) {
					fs.remove({
						path: path
					}, function(ret1, err1) {
						if(ret1.status) {
							callback(ret1);
						} else {
							callback(err1);
						}
					});
				} else {
					alert(JSON.stringify(err));
				}
			});

		},
	};

	jsApi.win = {
		init: function() {
			jsApi.pageConfig();
		},
		initFrm: function(el, url, bounces, params, reload) {
			var header = $api.byId(el);
			if(api.statusBarAppearance)
				$api.fixStatusBar(header);
			var headerPos = $api.offset(header);
			var body_h = $api.offset($api.dom('body')).h;
			var footer_h = 0;
			if($api.dom('footer'))
				footer_h = $api.offset($api.dom('footer')).h;
			var rects = {
				x: 0,
				y: headerPos.h,
				w: 'auto',
				h: api.winHeight - headerPos.h - footer_h
			};
			jsApi.win.openFrm(url, url + '.html', rects, bounces, params, reload);
		},
		initFrms: function(arr) {
			api.lockSlidPane();
			var header = $api.byId('aui-header');
			if(api.statusBarAppearance)
				$api.fixStatusBar(header);
			var headerPos = $api.offset(header);
			var body_h = $api.offset($api.dom('body')).h;
			var footer_h = $api.offset($api.dom('footer')).h;
			//			jsTools.Storage.setVal('head_H', headerPos.h);

			var frames = [];
			var rect = {};

			rect = {
				x: 0,
				y: headerPos.h,
				w: 'auto',
				h: api.winHeight - headerPos.h - footer_h
			};

			for(var i = 0, len = arr.length; i < len; i++) {
				frames.push({
					name: arr[i],
					url: './html/' + arr[i] + '.html',
					bounces: false,
					allowEdit: true,
				})
			}

			jsApi.win.openFrmGroup(frames, arr.length, rect, function(ret, err) {});
		},
		open: function(name, url, params, reload) {
			var delay = 0;

			var type = 'default';

			if(jsCheck.isUrl(url)) {
				type = 'page';
			}

			if(reload == null)
				reload = false;
			api.openWin({
				name: name,
				url: url,
				bounces: false,
				delay: delay,
				reload: reload,
				slidBackEnabled: false,
				vScrollBarEnabled: false,
				hScrollBarEnabled: false,
				overScrollMode: 'always',
				allowEdit: true,
				pageParam: params,
				progress: {
					type: type, //加载进度效果类型，默认值为default，取值范围为default|page，default等同于showProgress参数效果；为page时，进度效果为仿浏览器类型，固定在页面的顶部						
				}
			});
		},
		close: function() {
			api.closeWin({
				animation: {
					type: "push",
					subType: "from_left",
					duration: 300
				}
			});
		},
		closetoWin: function(name) {
			if(name == null)
				name = 'root';
			api.closeToWin({
				name: name
			});
		},
		openFrm: function(name, url, rects, bounces, params, reload) {
			var type = 'default';

			if(jsCheck.isUrl(url)) {
				type = 'page';
			}

			if(bounces == null)
				bounces = true;
			if(reload == null)
				reload = false;
			api.openFrame({
				name: name,
				url: url,
				reload: reload,
				bounces: bounces,
				allowEdit: true,
				rect: rects,
				hScrollBarEnabled: false,
				vScrollBarEnabled: false,
				pageParam: params,
				progress: {
					type: type, //加载进度效果类型，默认值为default，取值范围为default|page，default等同于showProgress参数效果；为page时，进度效果为仿浏览器类型，固定在页面的顶部

				}
			});
		},
		openFrmGroup: function(frames, counts, rect, fn) {
			api.openFrameGroup({
				name: 'group',
				scrollEnabled: false,
				rect: rect,
				index: 0,
				preload: counts,
				frames: frames
			}, fn);
		},
		setFrmGroupIndex: function(index) {
			api.setFrameGroupIndex({
				name: 'group',
				scroll: true,
				index: index
			});
		},
		closeFrm: function(name) {
			api.closeFrame({
				name: name
			});
		},
	}

	jsApi.ui = {
		toast: function(text, time) {
			if(time == null)
				time = 3000;
			api.toast({
				msg: text,
				duration: time,
				location: 'bottom'
			});
		},
		showProgress: function(args) {
			api.showProgress(args);
		},
		hideProgress: function() {
			api.hideProgress();
		},
		alert: function(msg, fn) {
			api.alert({
				title: '提示',
				msg: msg,
			}, function(ret, err) {
				fn();
			})
		},
		confirm: function(msg, fn, cancelfn) {
			api.confirm({
				title: '提示',
				msg: msg,
				buttons: ['取消', '确定'],
			}, function(ret, err) {
				if(ret.buttonIndex == 1) {
					//取消
					if(cancelfn && typeof cancelfn == 'function')
						cancelfn();
				} else if(ret.buttonIndex == 2) {
					//确定
					fn();
				}
			});
		},
	}

	jsApi.sendEvent = function(name, args) {
		api.sendEvent({
			name: name,
			extra: args
		});
	}

	jsApi.addEventListener = function(name, fn) {
		api.addEventListener({
			name: name
		}, fn);
	}

	//清理缓存
	jsApi.clearCache = function(fn) {
		api.clearCache(function() {
			fn();
		});
	}

	jsApi.closeWidget = function() {
		api.closeWidget({
			id: api.appId, //这里改成自己的应用ID
			retData: {
				name: 'closeWidget'
			},
			silent: true
		});
	}
	//设置状态栏颜色
	jsApi.setStatusBarStyle = function(style, color) {
		if(typeof style == 'undefined')
			style = 'light';

		if(typeof color == 'undefined')
			color = '#03a9f4';

		api.setStatusBarStyle({
			style: style,
			color: color,
		});
	}

	//初始化调用
	jsApi.ready = function(fn) {
		apiready = function() {
			fn();
		}
	}

	jsApi.exitApp = function() {
		api.addEventListener({
			name: 'keyback'
		}, function(ret, err) {
			api.toast({
				msg: '再按一次返回键退出' + api.appName,
				duration: 2000,
				location: 'bottom'
			});

			api.addEventListener({
				name: 'keyback'
			}, function(ret, err) {
				api.closeWidget({
					id: api.appId, //这里改成自己的应用ID
					retData: {
						name: 'closeWidget'
					},
					silent: true
				});
			});

			setTimeout(function() {
				jsApi.exitApp();
			}, 3000)
		});
	}

	jsApi.pageConfig = function() {
		var bars = $api.domAll('.aui-bar');

		if(bars == null || bars.length == 0) return;

		for(var x = 0; x < bars.length; x++) {
			if(bars[x].id == 'footer' || bars[x].id == 'c-footer') // 底部不增加
				$api.fixTabBar(bars[x]);

			else {
				//沉浸式
				if(api.statusBarAppearance)
					$api.fixStatusBar(bars[x]);
			}

		}
	}

	//外部调用监听
	jsApi.thirdSendEventer = function(callback) {
		jsApi.addEventListener('appintent', function(ret, err) {
			//			console.log("addEventListener: appintent");
			var args = ret.appParam;
			callback(args);
		}, false);
	}

	jsApi.share = function(text, type, ret) {
		var sharedModule = api.require('shareAction');
		if(type == 'url')
			sharedModule.share({
				path: ret,
				type: 'url'
			});
		else if(type == 'image') {
			sharedModule.share({
				images: ret,
				type: 'image',
				thumbnail: ret[0],
				contentSize: {
					w: 100,
					h: 100
				}
			});
		}
	}

	window.jsApi = jsApi;
})();
var jsFiles = (function() {

	//将File或Blob转换为DOMString,DOMString可以直接赋值给img标签（推荐使用）
	var _createObjectURL = function(fileObj) {

		var str = URL.createObjectURL(fileObj);
		return str;
	}
	//删除domString
	var _revokeObjectURL = function(domString) {

		URL.revokeObjectURL(domString);
	}
	//将File或Blob转换为base64，base64可以直接赋值给img标签（android 4.4以下存在兼容问题）
	var _getFileToBase64Reader = function(fileObj, fn) {

		var reader = new FileReader();
		reader.onloadend = function(e) {
			fn(e.target.result);
		};
		reader.readAsDataURL(fileObj);
	}

	var _urltoImage = function(url, fn) {
		var img = new Image();
		img.src = url;
		img.onload = function() {
			fn(img);
		}
	};

	var _imagetoCanvas = function(image) {
		var cvs = document.createElement("canvas");
		var ctx = cvs.getContext('2d');
		cvs.width = image.width;
		cvs.height = image.height;
		ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
		return cvs;
	};
	
	var _canvasResizetoDataURL = function(canvas,quality){
  		var dateUrl = canvas.toDataURL('image/jpeg',quality);
  		canvas = null;
  		return dateUrl;
	};

	var _canvasResizetoFile = function(canvas, quality, fn) {
		canvas.toBlob(function(blob) {
			fn(blob);
			canvas = null;
		}, 'image/jpeg', quality);
	};

	//base64转换为文件,(存在兼容性问题)
	var _getBase64ToFile = function(blob, filename) {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while(n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, {
			type: mime
		});
	}
	//base64转为Blob类型文件对象，可直接上传，但上传时候需增加文件名(推荐使用)
	var _getBase64ToFileBlob = function(urlData, filename) {
		//去掉url的头，并转换为byte
		var bytes = window.atob(urlData.split(',')[1]);

		//处理异常,将ascii码小于0的转换为大于0
		var ab = new ArrayBuffer(bytes.length);
		var ia = new Uint8Array(ab);
		for(var i = 0; i < bytes.length; i++) {
			ia[i] = bytes.charCodeAt(i);
		}
		var blob = new Blob([ab], {
			type: 'image/png'
		});

		blob.name = filename;
		return blob;
	}
	
	//将文件图片为Base64，带压缩，取值0-1
	var _getFileToBase64 = function(fileObj,quality,callback){
		var dataUrl = _createObjectURL(fileObj);
		_urltoImage(dataUrl,function(img){
			var qUrl = _canvasResizetoDataURL(_imagetoCanvas(img),quality);
			callback(qUrl);
		});
	}
	
	//将网络图片转换为Base64，带压缩，取值0-1
	var _getUrlImgToBase64 = function(url, quality, callback) {
		_urltoImage(url,function(img){
			var dataUrl = _canvasResizetoDataURL(_imagetoCanvas(img),quality);
			callback(dataUrl);
		});
	}

	//将网络图片转换为Blob类型文件，带压缩，取值0-1
	var _getUrlImgToFileBlob = function(url, quality, callback) {
		var img = new Image();
		var filename = url.substring(url.lastIndexOf('/') + 1);
		_urltoImage(url,function(img){
			_canvasResizetoFile(_imagetoCanvas(img),quality,function(blob){
				blob.name = filename;
				callback(blob);
			});	
		});
	}

	return {
		createObjectURL: _createObjectURL,
		revokeObjectURL: _revokeObjectURL,
		
		getFileToBase64Reader: _getFileToBase64Reader,
		getFileToBase64 : _getFileToBase64,
		
		getBase64ToFile: _getBase64ToFile,
		getBase64ToFileBlob: _getBase64ToFileBlob,
		
		getUrlImgToBase64: _getUrlImgToBase64,
		getUrlImgToFileBlob : _getUrlImgToFileBlob,
	}
})();
var jsRes = {
	//资源
	Res: {
		managerMenu: function(ret) {
			//注意：菜单id与relationHref字段与数据库对应，请添加或修改时务必意义对应
			var menus = [{
					id: 1,
					title: '统计分析',
					showList: true,
					icon: 'iconfont icon-icon',
					list: [{
							id: 10,
							relationHref:'analysis/AnalysisAll',
							href: 'analysis/AnalysisAll.html',
							name: 'AnalysisAll',
							title: '综合分析',
						}, {
							id: 11,
							relationHref:'analysis/AnalysisRank',
							href: 'analysis/AnalysisRank.html',
							name: 'AnalysisRank',
							title: '排名分析',
						},

					],
				}, {
					id: 2,
					title: '平台管理',
					showList: true,
					icon: 'iconfont icon-pingtaiguanli',
					list: [{
							id: 12,
							relationHref:'platform/BusinessSystem',
							href: 'platform/BusinessSystem.html',
							name: 'BusinessSystem',
							title: '业务系统',
						},
						{
							id: 13,
							relationHref:'platform/UserLoc',
							href: 'platform/UserManage.html',
							name: 'UserManage',
							title: '会员管理',
						},
						{
							id: 14,
							relationHref:'platform/UserBusRelation',
							href: 'platform/BusinessRef.html',
							name: 'BusinessRef',
							title: '业务关系',
						}, {
							id: 15,
							relationHref:'platform/TotalAccount',
							href: 'platform/TotalAccount.html',
							name: 'TotalAccount',
							title: '资金汇总',
						}
					],
				}, {
					id: 3,
					title: '协议管理',
					showList: true,
					icon: 'iconfont icon-guize',
					list: [{
							id: 16,
							relationHref:'agreement/DepositAgreement',
							href: 'agreement/DepositAgreement.html',
							name: 'DepositAgreement',
							title: '提现协议',
						}, {
							id: 17,
							relationHref:'agreement/TradeAgreement',
							href: 'agreement/TradeAgreement.html',
							name: 'TradeAgreement',
							title: '交易协议',
						},

					],
				}, {
					id: 4,
					title: '订单管理',
					showList: true,
					icon: 'iconfont icon-dingdan',
					list: [{
							id: 18,
							relationHref:'order/RechargeOrders',
							href: 'order/RechargeOrder.html',
							name: 'RechargeOrder',
							title: '充值订单',
						},
						{
							id: 19,
							relationHref:'order/DepositOrders',
							href: 'order/DepositOrder.html',
							name: 'DepositOrder',
							title: '提现订单',
						},
						{
							id: 20,
							relationHref:'order/TradeOrders',
							href: 'order/TradeOrder.html',
							name: 'TradeOrder',
							title: '交易订单',
						},
						{
							id: 21,
							relationHref:'order/RefundOrders',
							href: 'order/RefundOrder.html',
							name: 'RefundOrder',
							title: '退款订单',
						},
						{
							id: 22,
							relationHref:'order/HangUpOrders',
							href: 'order/HangupOrder.html',
							name: 'HangupOrder',
							title: '转账订单',
						},
						{
							id: 23,
							relationHref:'order/CancelHangOrders',
							href: 'order/CancelHangupOrder.html',
							name: 'CancelHangupOrder',
							title: '撤账订单',
						},
					]
				}, {
					id: 5,
					title: '综合查询',
					showList: true,
					icon: 'iconfont icon-chaxun',
					list: [{
							id: 24,
							relationHref:'search/AgentSearch',
							href: 'search/AgentSearch.html',
							name: 'AgentSearch',
							title: '代理查询',
						},
						{
							id: 25,
							relationHref:'search/TradeDetail',
							href: 'search/TradeDetail.html',
							name: 'TradeDetail',
							title: '交易流水',
						},
						{
							id: 26,
							relationHref:'search/BillSearch',
							href: 'search/BillSearch.html',
							name: 'BillSearch',
							title: '账单查询',
						},
						{
							id: 27,
							relationHref:'search/DaySettlementQuery',
							href: 'search/DaySettlement.html',
							name: 'DaySettlement',
							title: '每日对账',
						},
						{
							id: 28,
							relationHref:'search/BalanceDifferences',
							href: 'search/BalanceDifference.html',
							name: 'BalanceDifference',
							title: '余额差异',
						},
					]
				},
				{
					id: 6,
					title: '银行查询-见证',
					showList: true,
					icon: 'iconfont icon-zhichiyinhang',
					list: [{
							id: 33,
							relationHref:'bankjz/CXPTZZCZMX6050',
							href: 'bank/ComTransferRecharge_JZ.html',
							name: 'ComTransferRecharge_JZ',
							title: '普通转账充值明细',
						},
						{
							id: 36,
							relationHref:'bankjz/CXYHSJDNJYMX6072',
							href: 'bank/bankTrade_JZ.html',
							name: 'bankTrade_JZ',
							title: '银行交易明细',
						},
						{
							id: 37,
							relationHref:'bankjz/CXYHDBJYZT6110',
							href: 'bank/bankTradeSingle_JZ.html',
							name: 'bankTradeSingle_JZ',
							title: '银行单笔交易明细',
						},
						{
							id: 40,
							relationHref:'bankjz/CXYHZTQSJG6108',
							href: 'bank/bankOnSettlement_JZ.html',
							name: 'bankOnSettlement_JZ',
							title: '银行在途清算结果',
						}
					]
				},
				{
					id: 7,
					title: '银行查询-跨行',
					showList: true,
					icon: 'iconfont icon-zhichiyinhang',
					list: [{
							id: 44,
							relationHref:'bankkh/DBDDCX',
							href: 'bank/SingleOrderSearch_KH.html',
							name: 'SingleOrderSearch_KH',
							title: '单笔订单查询',
						},
						{
							id: 45,
							relationHref:'bankkh/DDLBCX',
							href: 'bank/OrderListSearch_KH.html',
							name: 'OrderListSearch_KH',
							title: '订单列表查询',
						},
						{
							id: 47,
							relationHref:'bankkh/DBTKCX',
							href: 'bank/SingleRefundSearch_KH.html',
							name: 'SingleRefundSearch_KH',
							title: '单笔退款查询',
						},
						{
							id: 48,
							relationHref:'bankkh/TKDLBCX',
							href: 'bank/RefundListSearch_KH.html',
							name: 'RefundListSearch_KH',
							title: '退款列表查询',
						}
					]
				},
				{
					id: 8,
					title: '银行查询-微信',
					showList: true,
					icon: 'iconfont icon-weixin',
					list: [{
							id: 49,
							relationHref:'bankwx/WXCXDDMX',
							href: 'bank/SingleOrderSearch_WX.html',
							name: 'SingleOrderSearch_WX',
							title: '微信订单查询',
						},
						{
							id: 50,
							relationHref:'bankwx/WXDDTKCX',
							href: 'bank/SingleRefundSearch_WX.html',
							name: 'SingleRefundSearch_WX',
							title: '微信退款查询',
						},
						{
							id: 51,
							relationHref:'bankwx/WXHQDDLB',
							href: 'bank/OrderListSearch_WX.html',
							name: 'OrderListSearch_WX',
							title: '微信订单列表查询',
						},
					]
				}
			];
			
			return menus;
		},

		userListData: {
			oneInfo: [{
				href: 'AddUser.html',
				name: 'AddUser',
				icon: 'aui-iconfont aui-icon-my aui-text-danger',
				title: '注册管理员',
			}, {
				href: 'ChangePd.html',
				name: 'ChangePd',
				icon: 'aui-iconfont aui-icon-lock aui-text-success',
				title: '密码修改',
			}],
			twoInfo: [{
					title: '系统更新',
					icon: 'aui-iconfont aui-icon-paper aui-text-info',
					id: 'checkUpdate',
				},
				{
					title: '分享',
					icon: 'aui-iconfont aui-icon-share aui-text-warning',
					id: 'share',
				},
				{
					title: '关于',
					icon: 'aui-iconfont aui-icon-laud aui-text-warning',
					href: 'About.html',
					name: 'About',
				}
			],

		},

	},
	downloadPath: {
		app: {
			state: 1,
			path: 'https://eharbor.hb56.com/wap/down.html',
		},
		appAdmin: {
			state: 1,
			path: 'https://eharbor.hb56.com/wap/downAdmin.html',
		},
	},
}
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
var jsTools = (function(CUR) {

	

	CUR.Server = {
		
		//更新
		GetSysUpdateInfoService: 'SHB.ePay.GetAPPVersion.Service.GetAPPVersionService',

		//获取图片验证码
		GetCheckCodeService: 'SHB.ePay.GetCheckCode.Service.GetCheckCodeService',

		//注册
		RegisterService: 'SHB.ePay.Menmber.Serveice.MenmberRegService',
		//获取用户信息
		GetUserInfoService: 'SHB.ePay.Menmber.Serveice.MenmberQueryService',

		
		//管理员注册
		ManagerRegService: 'SHB.ePay.Menmber.Serveice.ManagerRegService',

		//管理员查询本地会员信息
		ManagerQueryMenmberService: 'SHB.ePay.Menmber.Serveice.ManagerQueryMenmberService',

		//商户收款统计
		MerchantInAmountTotalService: 'SHB.ePay.Report.Service.MerchantInAmountTotalService',
		//汇总统计
		TotalQueryService: 'SHB.ePay.Report.Service.TotalQueryService',

		//交易排名
		RankingService: 'SHB.ePay.Report.Service.RankingService',

		
	};

	return CUR;
})(jsTools || {});
/*
    v6.9
    2018-08-30 添加sendMessage、receiveMessage、affirmReceivedMessage、subscribeMessage函数，提供简易的消息收发功能
    2018-09-02 添加CanXXX系列函数，提供控制UI交互权限的功能
 */

/*
    v6.8
    2018-08-02 提供ajax函数，支持匿名或登录用户访问自定义ApiController
 */

/*
    v6.7
    2018-06-18 支持“等保三级”评测认证
 */

/*
    v6.6
    2018-04-22 调整URI格式为贴近RESTful风格
 */

/*
    v6.5
    2017-10-13 为数据处理函数添加timeout参数，调用超时可在onError回调函数中处理
    2017-10-22 添加uploadBigFiles、downloadBigFile服务的客户端接口函数
 */

/*
    v6.4
    2017-09-25 添加uploadFiles、downloadFile服务的客户端接口函数
 */

/*
    v6.3
    2017-08-18 _getUserNumber函数如果获取不到cookie保存的登录用户则返回'Guest'以代表匿名用户
    2017-08-18 _getKey函数如果获取不到cookie保存的登录口令则返回'Guest'以代表匿名用户默认口令
 */

/*
    Phenix Web Client
    Copyright © 2007, 2018 Phenix Studio All rights reserved.

    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/CryptoJS/core-min.js"></script>
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/CryptoJS/cipher-core-min.js"></script>
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/CryptoJS/aes-min.js"></script>
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/CryptoJS/md5-min.js"></script>
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/base64-binary.js"></script>
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/json2.js"></script>
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/jquery.min.js"></script> --v3.2.1
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/jquery.signalR.min.js"></script> --v2.3.0
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/jquery.cookie.js"></script>
    <script type="text/javascript" src="../../Phenix.Extensions/Phenix.Web.Client.Ajax/phenix.js"></script>

 */
;
$.support.cors = true;
/*
    配套WabAPI服务(Bin.Top目录下Host服务程序)
*/
var phAjax = (function($) {
    var HOST_COOKIE_NAME = "eharboradmin-P-H";
    var PORT_COOKIE_NAME = "eharboradmin-P-P";
    
    var MESSAGE_HOST_COOKIE_NAME = "eharboradmin-P-MH";
    var MESSAGE_PORT_COOKIE_NAME = "eharboradmin-P-MP";
    
    var USER_NUMBER_COOKIE_NAME = "eharboradmin-P-UN";
    var KEY_COOKIE_NAME = "eharboradmin-P-K";

    var AUTHORIZATION_HEADER_NAME = "Phenix-Authorization";
    var METHOD_OVERRIDE_HEADER_NAME = "X-HTTP-Method-Override";

    var _getHost = function() {
        var result;
        try {
            result = window.localStorage.getItem(HOST_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(HOST_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? result : 'http://localhost';
    };
    var _setHost = function(value) {
        try {
            window.localStorage.removeItem(HOST_COOKIE_NAME);
            window.localStorage.setItem(HOST_COOKIE_NAME, value);
        } catch (e) {
            $.cookie(HOST_COOKIE_NAME, value, { path: '/' });
        }
    };

    var _getPort = function() {
        var result;
        try {
            result = window.localStorage.getItem(PORT_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(PORT_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? result : 8080;
    };
    var _setPort = function(value) {
        try {
            window.localStorage.removeItem(PORT_COOKIE_NAME);
            window.localStorage.setItem(PORT_COOKIE_NAME, value);
        } catch (e) {
            $.cookie(PORT_COOKIE_NAME, value, { path: '/' });
        }
    };
    
    var _getMessageHost = function() {
        var result;
        try {
            result = window.localStorage.getItem(MESSAGE_HOST_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(MESSAGE_HOST_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? result : 'http://localhost';
    };
    var _setMessageHost = function(value) {
        try {
            window.localStorage.removeItem(MESSAGE_HOST_COOKIE_NAME);
            window.localStorage.setItem(MESSAGE_HOST_COOKIE_NAME, value);
        } catch (e) {
            $.cookie(MESSAGE_HOST_COOKIE_NAME, value, { path: '/' });
        }
    };
    
    var _getMessagePort = function () {
        var result;
        try {
            result = window.localStorage.getItem(MESSAGE_PORT_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(MESSAGE_PORT_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? result : 8081;
    };
    var _setMessagePort = function (value) {
        try {
            window.localStorage.removeItem(MESSAGE_PORT_COOKIE_NAME);
            window.localStorage.setItem(MESSAGE_PORT_COOKIE_NAME, value);
        } catch (e) {
            $.cookie(MESSAGE_PORT_COOKIE_NAME, value, { path: '/' });
        }
    };

    var _getUserNumber = function() {
        var result;
        try {
            result = window.localStorage.getItem(USER_NUMBER_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(USER_NUMBER_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? result : 'Guest';
    };
    var _setUserNumber = function(value) {
        try {
            window.localStorage.removeItem(USER_NUMBER_COOKIE_NAME);
            window.localStorage.setItem(USER_NUMBER_COOKIE_NAME, value);
        } catch (e) {
            $.cookie(USER_NUMBER_COOKIE_NAME, value, { path: '/' });
        }
    };

    var _getKey = function() {
        var result;
        try {
            result = window.localStorage.getItem(KEY_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(KEY_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? CryptoJS.enc.Hex.parse(result) : CryptoJS.MD5('Guest');
    };
    var _setKey = function(value) {
        try {
            window.localStorage.removeItem(KEY_COOKIE_NAME);
            window.localStorage.setItem(KEY_COOKIE_NAME, value != null ? CryptoJS.enc.Hex.stringify(value) : null);
        } catch (e) {
            $.cookie(KEY_COOKIE_NAME, value != null ? CryptoJS.enc.Hex.stringify(value) : null, { path: '/' });
        }
    };

    var _encrypt = function(value, key) {
        try {
            if (typeof value != "undefined" && value != null)
                return CryptoJS.AES.encrypt(value, key, { iv: key, mode: CryptoJS.mode.CBC });
            else
                return null;
        } catch (e) {
            return null;
        }
    };

    var _formatSimpleAuthorization = function() {
        var timestamp = Math.random().toString(36).substring(2) + new Date().toISOString();
        return AUTHORIZATION_HEADER_NAME + '=' + encodeURIComponent(_getUserNumber()) + "," + timestamp + "," + _encrypt(timestamp, _getKey());
    };

    var _formatComplexAuthorization = function(userNumber, key, contentMD5, contentEncrypted) {
        if (userNumber == null || key == null)
            return null;
        var timestamp = Math.random().toString(36).substring(2) + new Date().toISOString();
        return encodeURIComponent(userNumber) + "," + timestamp + "," + contentMD5 + "," +
            (contentEncrypted ? 1 : 0) + "," + _encrypt(timestamp + contentMD5, key);
    };

    var _initComplexAuthorizationHeader = function(XMLHttpRequest, userNumber, key, contentMD5, contentEncrypted) {
        XMLHttpRequest.setRequestHeader(AUTHORIZATION_HEADER_NAME, _formatComplexAuthorization(userNumber, key, contentMD5, contentEncrypted));
    };

    var _setComplexAuthorizationHeader = function(XMLHttpRequest, contentMD5, contentEncrypted) {
        _initComplexAuthorizationHeader(XMLHttpRequest, _getUserNumber(), _getKey(), contentMD5, contentEncrypted);
    };

    var _setPutOverrideHeader = function(XMLHttpRequest) {
        XMLHttpRequest.setRequestHeader(METHOD_OVERRIDE_HEADER_NAME, "PUT");
    };

    var _setDeleteOverrideHeader = function(XMLHttpRequest) {
        XMLHttpRequest.setRequestHeader(METHOD_OVERRIDE_HEADER_NAME, "DELETE");
    };

    return {
        get userNumber() {
            return _getUserNumber();
        },
        set userNumber(value) {
            _setUserNumber(value);
        },
        
        set key(value){
        	_setKey(value);
        },

        get host() {
            return _getHost();
        },
        set host(value) {
            _setHost(value);
        },

        get port() {
            return _getPort();
        },
        set port(value) {
            _setPort(value);
        },
        
        get messageHost() {
            return _getMessageHost();
        },
        set messageHost(value) {
            _setMessageHost(value);
        },

        get messagePort() {
            return _getMessagePort();
        },
        set messagePort(value) {
            _setMessagePort(value);
        },

        get baseUrl() {
            return phAjax.host + ":" + phAjax.port + "/api/";
        },

        get baseMessageUrl() {
            return phAjax.messageHost + ":" + phAjax.messagePort;
        },

        get securityUrl() {
            return phAjax.baseUrl + "Security";
        },

        get dataUrl() {
            return phAjax.baseUrl + "Data";
        },

        get messageUrl() {
            return phAjax.baseUrl + "Message";
        },

        getIdentity: function(options) {
            var defaults = {
                onSuccess: null, //调用成功的回调函数, 参数(result)为用户身份信息
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            $.ajax({
                type: "GET",
                url: phAjax.securityUrl,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                cache: false,
                crossDomain: true,
                timeout: 3000,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(result);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        isByDeny: function(options) {
            var defaults = {
                typeName: null, //标识服务端type名称
                actionName: null, //标识服务端type的action名称
                onSuccess: null, //调用成功的回调函数, 参数(result)为是否拒绝访问
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            $.ajax({
                type: "GET",
                url: phAjax.securityUrl +
                    "?typeName=" + encodeURIComponent(options.typeName) + "&actionName=" + encodeURIComponent(options.actionName),
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                cache: false,
                crossDomain: true,
                timeout: 3000,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(result);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        logOn: function(userNumber, password, onComplete, onError) {
            phAjax.logOnVerify(userNumber, password, new Date().toISOString(), onComplete, onError);
        },

        logOnVerify: function(userNumber, password, tag, onComplete, onError) {
            var key = CryptoJS.MD5(password);
            $.ajax({
                type: "POST",
                url: phAjax.securityUrl,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: 3000,
                beforeSend: function(XMLHttpRequest) {
                    _initComplexAuthorizationHeader(XMLHttpRequest, userNumber, key, "", false);
                },
                data: _encrypt(tag, key).toString(),
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status == 200) {
                        _setUserNumber(userNumber);
                        _setKey(key);
                    } else {
                        if (typeof onError == "function")
                            onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                    if (typeof onComplete == "function")
                        onComplete(XMLHttpRequest, textStatus);
                },
            });
        },

        changePassword: function(userNumber, password, newPassword, onComplete, onError) {
            var key = CryptoJS.MD5(password);
            $.ajax({
                type: "POST",
                url: phAjax.securityUrl,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: 3000,
                beforeSend: function(XMLHttpRequest) {
                    _initComplexAuthorizationHeader(XMLHttpRequest, userNumber, key, "", false);
                    _setPutOverrideHeader(XMLHttpRequest);
                },
                data: _encrypt(newPassword, key).toString(),
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status == 200) {
                        _setUserNumber(userNumber);
                        _setKey(CryptoJS.MD5(newPassword));
                    } else {
                        if (typeof onError == "function")
                            onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                    if (typeof onComplete == "function")
                        onComplete(XMLHttpRequest, textStatus);
                },
            });
        },

        logOff: function(onComplete) {
            $.ajax({
                type: "POST",
                url: phAjax.securityUrl,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: 3000,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                    _setDeleteOverrideHeader(XMLHttpRequest);
                },
                data: {},
                complete: function(XMLHttpRequest, textStatus) {
                    _setUserNumber('Guest');
                    _setKey(CryptoJS.MD5('Guest'));
                    if (typeof onComplete == "function")
                        onComplete(XMLHttpRequest, textStatus);
                },
            });
        },

        getSequenceValue: function(options) {
            var defaults = {
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(value)为获取到的64位序号
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            $.ajax({
                type: "GET",
                url: phAjax.dataUrl,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                cache: false,
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function(value) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(value);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        canFetch: function(options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体/实体集合类全名(须实现IEntity/IEntityCollection接口)
                onSuccess: null, //调用成功的回调函数, 参数(result)为是否允许访问
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            phAjax.isByDeny({
                typeName: options.dataName,
                actionName: "Fetch",
                onSuccess: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(!result);
                },
                onError: function(XMLHttpRequest, textStatus, errorThrown) {
                    if (typeof options.onError == "function")
                        options.onError(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        },

        fetch: function(options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体类全名(须实现IEntity接口)
                id: null, //主键值
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(data)为获取到的数据
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            $.ajax({
                type: "GET",
                url: phAjax.dataUrl +
                    "/" + encodeURIComponent(options.dataName) +
                    "?id=" + options.id +
                    "&pageSize=&pageNo=",
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                cache: false,
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function(data) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(data);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        getRecordCount: function(options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体集合类全名(须实现IEntityCollection接口)
                masterName: null, //主对象名, 在服务端注册的实体类全名(须实现IEntity接口)
                masterId: null, //主对象主键值
                groupName: null, //分组名, null代表全部
                criteriaName: null, //条件名, 在服务端定义的条件类全名(须实现ICriteria接口)
                criteria: null, //条件对象
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(count)为获取到的记录数
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            $.ajax({
                type: "GET",
                url: phAjax.dataUrl +
                    "/" + encodeURIComponent(options.dataName) +
                    ":" + (options.masterId != null ? encodeURIComponent(options.masterName) : "") +
                    ":" + (options.criteria != null ? encodeURIComponent(options.criteriaName) : "") +
                    "?" +
                    (options.masterId != null ? "masterId=" + options.masterId + "&groupName=" + (options.groupName != null ? options.groupName : "") + "&" : "") +
                    "id=" + (options.criteria != null ? encodeURIComponent(typeof options.criteria == "string" ? options.criteria : JSON.stringify(options.criteria)) : "") +
                    "&pageSize=0&pageNo=0",
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                cache: false,
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function(count) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(count);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        fetchList: function(options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体集合类全名(须实现IEntityCollection接口)
                masterName: null, //主对象名, 在服务端注册的实体类全名(须实现IEntity接口)
                masterId: null, //主对象主键值
                groupName: null, //分组名, null代表全部
                criteriaName: null, //条件名, 在服务端定义的条件类全名(须实现ICriteria接口)
                criteria: null, //条件对象
                pageSize: null, //分页大小
                pageNo: null, //分页号, 从1起始
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(data)为获取到的数据
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            $.ajax({
                type: "GET",
                url: phAjax.dataUrl +
                    "/" + encodeURIComponent(options.dataName) +
                    ":" + (options.masterId != null ? encodeURIComponent(options.masterName) : "") +
                    ":" + (options.criteria != null ? encodeURIComponent(options.criteriaName) : "") +
                    "?" +
                    (options.masterId != null ? "masterId=" + options.masterId + "&groupName=" + (options.groupName != null ? options.groupName : "") + "&" : "") +
                    "id=" + (options.criteria != null ? encodeURIComponent(typeof options.criteria == "string" ? options.criteria : JSON.stringify(options.criteria)) : "") +
                    "&pageSize=" + (options.pageSize != null ? options.pageSize : "") +
                    "&pageNo=" + (options.pageNo != null ? options.pageNo : ""),
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                cache: false,
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function(data) {
                    if (typeof options.onSuccess == "function") {
                        if (options.pageNo == null || options.pageNo > 1 || options.onSuccess.length == 1)
                            options.onSuccess(data);
                        else
                            phAjax.getRecordCount({
                                dataName: options.dataName,
                                masterName: options.masterName,
                                masterId: options.masterId,
                                groupName: options.groupName,
                                criteriaName: options.criteriaName,
                                criteria: options.criteria,
                                onSuccess: function(count) {
                                    options.onSuccess(data, count);
                                },
                                onError: options.onError,
                            });
                    }
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        canSave: function(options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体/实体集合类全名(须实现IEntity/IEntityCollection接口)
                onSuccess: null, //调用成功的回调函数, 参数(result)为是否允许访问
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            phAjax.isByDeny({
                typeName: options.dataName,
                actionName: "All",
                onSuccess: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(!result);
                },
                onError: function(XMLHttpRequest, textStatus, errorThrown) {
                    if (typeof options.onError == "function")
                        options.onError(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        },

        save: function(options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体集合类/实体类全名(须实现IEntityCollection/IEntity接口)
                data: null, //传到服务端的数据, 须包含IsNew、IsSelfDeleted、IsSelfDirty属性以指明对象状态
                dataVerify: false, //数据需核实
                dataEncrypt: false, //数据需加密
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(count)为成功保存的记录数
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            if (typeof options.data != "string")
                options.data = JSON.stringify(options.data);
            $.ajax({
                type: "POST",
                url: phAjax.dataUrl +
                    "/" + encodeURIComponent(options.dataName),
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, options.dataVerify ? CryptoJS.MD5(options.data) : "", options.dataEncrypt);
                },
                data: options.dataEncrypt ? _encrypt(options.data, _getKey()).toString() : options.data,
                success: function(count) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(count);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        canExecute: function(options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(须实现IService接口)
                onSuccess: null, //调用成功的回调函数, 参数(result)为是否允许访问
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            phAjax.isByDeny({
                typeName: options.serviceName,
                actionName: "Update",
                onSuccess: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(!result);
                },
                onError: function(XMLHttpRequest, textStatus, errorThrown) {
                    if (typeof options.onError == "function")
                        options.onError(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        },

        execute: function(options) {
            var defaults = {
            	disHead : false,	//是否禁用头
                serviceName: null, //服务名, 在服务端注册的服务类全名(须实现IService接口)
                data: null, //传到服务端的数据
                dataVerify: false, //数据需核实
                dataEncrypt: false, //数据需加密
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            if (typeof options.data != "string")
                options.data = JSON.stringify(options.data);
            $.ajax({
                type: "POST",
                url: phAjax.dataUrl +
                    "/" + encodeURIComponent(options.serviceName),
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                	if(!options.disHead)
                    	_setComplexAuthorizationHeader(XMLHttpRequest, options.dataVerify ? CryptoJS.MD5(options.data) : "", options.dataEncrypt);
                },
                data: options.dataEncrypt ? _encrypt(options.data, _getKey()).toString() : options.data,
                success: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(result);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        uploadFiles: function(options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(须实现IService接口)
                data: null, //传到服务端的数据
                files: null, //传到服务端的文件(须是FileList/File对象(如果APP应用是本地图片，要么转成base64->File对象，要么转成网络图片->base64->File对象))
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            var formData = new FormData();
            formData.append("data", typeof options.data == "string" ? options.data : JSON.stringify(options.data));
            if (options.files != null)
                if (options.files instanceof FileList) {
                    for (var i = 0; i < options.files.length; i++) {
                        formData.append("file", options.files[i], options.files[i].name);
                    };
                } else {
                    formData.append("file", options.files, options.files.name);
                };
            $.ajax({
                type: "POST",
                url: phAjax.dataUrl +
                    "/" + encodeURIComponent(options.serviceName),
                dataType: "JSON",
                processData: false, //不要对data参数进行序列化处理，默认为true
                contentType: false, //不要设置Content-Type请求头，因为文件数据是以 multipart/form-data 来编码
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: formData,
                success: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(result);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        uploadBigFiles: function(options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(须实现IService接口)
                data: null, //传到服务端的数据
                files: null, //传到服务端的文件(须是FileList/File对象(如果APP应用是本地图片，要么转成base64->File对象，要么转成网络图片->base64->File对象))
                timeout: 30000, //默认超时30秒
                onProgress: null, //执行进度的回调函数, 参数(result, fileName, chunkCount, chunkNumber, chunkSize)中result为返回的数据，函数调用返回值如为false则中止上传
                onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            if (options.files != null)
                if (options.files instanceof FileList) {
                    for (var i = 0; i < options.files.length; i++) {
                        var file = options.files[i];
                        phAjax.uploadChunkInfo({
                            serviceName: options.serviceName,
                            data: options.data,
                            file: file,
                            chunkCount: phUtils.getChunkCount(file.size),
                            chunkNumber: 1,
                            timeout: options.timeout,
                            onProgress: options.onProgress,
                            onSuccess: options.onSuccess,
                            onError: options.onError,
                        });
                    };
                } else {
                    phAjax.uploadChunkInfo({
                        serviceName: options.serviceName,
                        data: options.data,
                        file: options.files,
                        chunkCount: phUtils.getChunkCount(options.files.size),
                        chunkNumber: 1,
                        timeout: options.timeout,
                        onProgress: options.onProgress,
                        onSuccess: options.onSuccess,
                        onError: options.onError,
                    });
                };
        },

        uploadChunkInfo: function(options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(须实现IService接口)
                data: null, //传到服务端的数据
                file: null, //传到服务端的文件(须是File对象(如果APP应用是本地图片，要么转成base64->File对象，要么转成网络图片->base64->File对象))
                chunkCount: 0, //传到服务端的块数
                chunkNumber: 0, //传到服务端的块号
                timeout: 30000, //默认超时30秒
                onProgress: null, //执行进度的回调函数, 参数(result, fileName, chunkCount, chunkNumber, chunkSize)中result为返回的数据，函数调用返回值如为false则中止上传
                onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            var formData = new FormData();
            formData.append("data", typeof options.data == "string" ? options.data : JSON.stringify(options.data));
            var fileChunkInfo = phUtils.readChunkInfo(options.file, options.chunkCount, options.chunkNumber);
            formData.append("chunkInfo", JSON.stringify({ FileName: fileChunkInfo.fileName, ChunkCount: fileChunkInfo.chunkCount, ChunkNumber: fileChunkInfo.chunkNumber, ChunkSize: fileChunkInfo.chunkSize }));
            if (fileChunkInfo.chunkBuffer != null)
                formData.append("chunkInfo", fileChunkInfo.chunkBuffer, fileChunkInfo.fileName);
            $.ajax({
                type: "POST",
                url: phAjax.dataUrl +
                    "/" + encodeURIComponent(options.serviceName),
                dataType: "JSON",
                processData: false, //不要对data参数进行序列化处理，默认为true
                contentType: false, //不要设置Content-Type请求头，因为文件数据是以 multipart/form-data 来编码
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: formData,
                success: function(result) {
                    if (options.chunkNumber <= 0)
                        return;
                    if (typeof options.onProgress == "function")
                        if (!options.onProgress(result, fileChunkInfo.fileName, fileChunkInfo.chunkCount, fileChunkInfo.chunkNumber, fileChunkInfo.chunkSize)) {
                            options.chunkCount = 0;
                            options.chunkNumber = 0;
                            phAjax.uploadChunkInfo(options);
                            return;
                        };
                    if (options.chunkNumber >= options.chunkCount) {
                        if (typeof options.onSuccess == "function")
                            options.onSuccess(result);
                        return;
                    };
                    options.chunkNumber = options.chunkNumber + 1;
                    phAjax.uploadChunkInfo(options);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        downloadFile: function(options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(须实现IService接口)
                data: null, //传到服务端的数据
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(blob)为返回的数据流
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", phAjax.dataUrl + "/" + encodeURIComponent(options.serviceName)); 
            xhr.responseType = "blob";
            xhr.withCredentials = true;
            xhr.timeout = options.timeout;
            _setComplexAuthorizationHeader(xhr, "", false);
            xhr.onload = function() {
                if (this.status == 200) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(this.response);
                } else {
                    if (typeof options.onError == "function")
                        options.onError(this, this.textStatus, new Error(this.responseText));
                }
            };
            var formData = new FormData();
            formData.append("data", typeof options.data == "string" ? options.data : JSON.stringify(options.data));
            formData.append("chunkNumber", "0");
            xhr.send(formData);
        },

        downloadBigFile: function(options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(须实现IService接口)
                data: null, //传到服务端的数据
                chunkNumber: 1, //传到服务端的块号
                timeout: 30000, //默认超时30秒
                onProgress: null, //执行进度的回调函数, 参数(fileName, chunkCount, chunkNumber, chunkSize, chunkBuffer)，函数调用返回值如为false则中止下载
                onSuccess: null, //调用成功的回调函数, 参数(fileName, chunkCount)
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", phAjax.dataUrl + "/" + encodeURIComponent(options.serviceName));
            xhr.responseType = "json";
            xhr.withCredentials = true;
            xhr.timeout = options.timeout;
            _setComplexAuthorizationHeader(xhr, "", false);
            xhr.onload = function() {
                if (this.status == 200) {
                    var fileChunkInfo = JSON.parse(this.response);
                    if (fileChunkInfo == null)
                        return;
                    if (typeof options.onProgress == "function")
                        if (!options.onProgress(fileChunkInfo.FileName, fileChunkInfo.ChunkCount, fileChunkInfo.ChunkNumber, fileChunkInfo.ChunkSize, fileChunkInfo.ChunkBuffer)) {
                            return;
                        };
                    if (fileChunkInfo.ChunkNumber >= fileChunkInfo.ChunkCount) {
                        if (typeof options.onSuccess == "function")
                            options.onSuccess(fileChunkInfo.FileName, fileChunkInfo.ChunkCount);
                        return;
                    };
                    options.chunkNumber = options.chunkNumber + 1;
                    phAjax.downloadBigFile(options);
                } else {
                    if (typeof options.onError == "function")
                        options.onError(this, this.textStatus, new Error(this.responseText));
                }
            };
            var formData = new FormData();
            formData.append("data", typeof options.data == "string" ? options.data : JSON.stringify(options.data));
            formData.append("chunkNumber", options.chunkNumber);
            xhr.send(formData);
        },

        sendMessage: function(options) {
            var defaults = {
                receiver: null, //接收工号
                content: null, //消息内容
                dataVerify: false, //数据需核实
                dataEncrypt: false, //数据需加密
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            if (typeof options.content != "string")
                options.content = JSON.stringify(options.content);
            $.ajax({
                type: "POST",
                url: phAjax.messageUrl +
                    "?receiver=" + encodeURIComponent(options.receiver),
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, options.dataVerify ? CryptoJS.MD5(options.content) : "", options.dataEncrypt);
                },
                data: options.dataEncrypt ? _encrypt(options.content, _getKey()).toString() : options.content,
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status == 200) {
                        if (typeof options.onSuccess == "function")
                            options.onSuccess();
                    } else {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        receiveMessage: function(options) {
            var defaults = {
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(messages)为返回的消息id(key)+content(array[key])数据字典集合
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            $.ajax({
                type: "GET",
                url: phAjax.messageUrl,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                cache: false,
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function(messages) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(messages);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        affirmReceivedMessage: function(options) {
            var defaults = {
                id: null,  //消息id, 即receive函数onSuccess事件参数messages的key值
                burn: true, //默认阅后即焚
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            $.ajax({
                type: "POST",
                url: phAjax.messageUrl +
                    "?id=" + options.id + "&burn=" + options.burn,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    _setComplexAuthorizationHeader(XMLHttpRequest, "", false);
                    _setDeleteOverrideHeader(XMLHttpRequest);
                },
                data: {},
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status == 200) {
                        if (typeof options.onSuccess == "function")
                            options.onSuccess();
                    } else {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                },
            });
        },

        subscribeMessage: function(options) {
            var defaults = {
                onReceived: null, //处理收到消息, 参数(messages)为消息id(key)+content(array[key])数据字典集合
                onError: null, //处理收到错误消息, 参数(text)为错误消息文本
                onDone: null, //调用成功的回调函数
                onFail: null, //调用失败的回调函数, 参数(error)
            };
            options = $.extend(defaults, options);
            var connection = $.hubConnection(phAjax.baseMessageUrl);
            connection.qs = _formatSimpleAuthorization();
            connection.createHubProxy('messageHub')
                .on('onReceived',
                    function(messages) { if (typeof options.onReceived == "function") options.onReceived(messages); })
                .on('onError',
                    function(text) { if (typeof options.onError == "function") options.onError(text); });
            connection.start()
                .done(function() { if (typeof options.onDone == "function") options.onDone(); })
                .fail(function(error) { if (typeof options.onFail == "function") options.onFail(error); });
        },

        canCall: function(options) {
            var defaults = {
                controllerName: null, //标识服务端ApiController名称
                actionName: "Get", //标识服务端ApiController函数名
                onSuccess: null, //调用成功的回调函数, 参数(result)为是否允许访问
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            phAjax.isByDeny({
                typeName: options.controllerName,
                actionName: options.actionName,
                onSuccess: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(!result);
                },
                onError: function(XMLHttpRequest, textStatus, errorThrown) {
                    if (typeof options.onError == "function")
                        options.onError(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        },

        ajax: function(options) {
            var defaults = {
                anonymity: false, //是否匿名访问
                type: "GET", //请求方法(GET/POST/PUT/DELETE)
                uri: null, //标识服务端ApiController名称/函数名及其参数(名称/函数名?参数1=值&参数2=值...)
                data: null, //传到服务端的数据
                dataVerify: false, //数据需核实(匿名访问时无效)
                dataEncrypt: false, //数据需加密(匿名访问时无效)
                cache: false, //默认不缓存
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
                onComplete: null, //调用完整的回调函数, 参数(XMLHttpRequest, textStatus)
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            if (typeof options.data != "string")
                options.data = JSON.stringify(options.data);
            $.ajax({
                type: (options.type == "PUT" || options.type == "DELETE") ? "POST" : options.type,
                url: phAjax.baseUrl + options.uri,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                cache: options.cache,
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function(XMLHttpRequest) {
                    if (!options.anonymity)
                        _setComplexAuthorizationHeader(XMLHttpRequest, options.dataVerify ? CryptoJS.MD5(options.data) : "", options.dataEncrypt);
                    if (options.type == "PUT")
                        _setPutOverrideHeader(XMLHttpRequest);
                    else if (options.type == "DELETE")
                        _setDeleteOverrideHeader(XMLHttpRequest);
                },
                data: !options.anonymity && options.dataEncrypt ? _encrypt(options.data, _getKey()).toString() : options.data,
                success: function(result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(result);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200) {
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    }
                    if (typeof options.onComplete == "function")
                        options.onComplete(XMLHttpRequest, textStatus);
                },
            });
        },
    }
})(jQuery);

/*
    工具集
*/
var phUtils = (function() {
    var CHUNK_MAX_SIZE = 1024 * 1024;
    return {
        getChunkCount: function(fileSize) {
            return Math.ceil(fileSize / CHUNK_MAX_SIZE);
        },

        readChunkInfo: function(file, chunkCount, chunkNumber) {
            var result = {
                fileName: null,
                chunkCount: 0,
                chunkNumber: 0,
                chunkSize: 0,
                chunkBuffer: null,
            };
            result.fileName = file.name;
            if (chunkNumber >= 1 && chunkNumber <= chunkCount) {
                result.chunkCount = chunkCount;
                result.chunkNumber = chunkNumber;
                result.chunkSize = chunkNumber < chunkCount
                    ? CHUNK_MAX_SIZE
                    : file.size - CHUNK_MAX_SIZE * (chunkCount - 1);
                var strat = CHUNK_MAX_SIZE * (chunkNumber - 1);
                result.chunkBuffer = file.slice(strat, strat + result.chunkSize);
            };
            return result;
        },

        toObject: function(nameValues) {
            var result = {};
            nameValues.map(function(item) { result[item.name] = item.value; });
            return result;
        },
    }
})();
(function() {
	var wxApi = {};

	//微信充值服务
	var WXAppCZService = 'SHB.ePay.Trade.WX.Service.WXAppCZService';
	//微信支付
	var WXAppZFService = 'SHB.ePay.Trade.WX.Service.WXAppZFService';
	//前端通知服务
	var WXWebNotifyService = 'SHB.ePay.Trade.WX.Service.WXWebNotifyService';

	//充值下单
	var czOrder = function(ret, callback) {
		var dat = {
			title: '充值中...',
			serviceName: WXAppCZService,
			data: {
				Parameter: ret
			}
		}
		jsTools.ajax(dat, function(result) {
			callback(result);
		});
	};

	//交易下单
	var zfOrder = function(ret, callback) {
		var dat = {
			title: '交易中...',
			serviceName: WXAppZFService,
			data: {
				Parameter: ret
			}
		}
		jsTools.ajax(dat, function(result) {
			callback(result);
		});
	};

	//支付结果通知
	var wxWebNotify = function(fg, ret, callback) {
		var dat = {
			title: '通知中...',
			serviceName: WXWebNotifyService,
			data: {
				Parameter: {
					ThirdHtID: ret.ThirdHtId,
					OrderNo: ret.OrderNo,
					Model: fg
				}
			}
		}
		jsTools.ajax(dat, function(result) {
			callback(result);
		});
	};

	//订单支付
	var orderPay = function(fg, ret, callback) {
		if(jsTools.getCurSystem() == 'web') {
			console.dir(ret);
		} else if(jsTools.getCurSystem() == 'app') {
			var bankResult = ret.BankResult.Dictionary.data;
			var result = ret;
			var wx = api.require('wx');
			wx.isInstalled(function(ret, err) {
				if(ret.installed) {
					var wxPay = api.require('wxPay');
					wxPay.payOrder({
						apiKey: bankResult.appid,
						orderId: bankResult.prepayid,
						mchId: bankResult.partnerid,
						nonceStr: bankResult.noncestr,
						timeStamp: bankResult.timestamp,
						package: bankResult.package,
						sign: bankResult.currency_sign
					}, function(ret, err) {

						wxWebNotify(fg, result, function() {
							if(ret.status) {
								callback();
							} else {
								//alert(err.code);
								var msg = '';
								switch(err.code) {
									case -1:
										msg = '未知错误！';
										break;
									case 1:
										msg = 'apiKey值非法！';
										break;
									case 2:
										msg = '用户取消 ！';
										break;
								}

								callback(msg);
							}
						});

					});
				} else {
					alert('当前设备未安装微信客户端');
				}
			});
		}
	}

	//微信支付
	wxApi.pay = function(fg, ret, callback) {
		if(fg == 0) {
			//充值
			czOrder(ret, function(result) {
				orderPay(fg, result, callback);
			});
		} else if(fg == 1) {
			//交易
			zfOrder(ret, function(result) {
				orderPay(fg, result, callback);
			});
		}

	}
	//scene: session（会话）timeline（朋友圈）favorite（收藏）
	wxApi.shareWebpage = function(title, desc, url, scene) {
		if(scene == null)
			scene = 'session';

		var wx = api.require('wx');
		wx.isInstalled(function(ret, err) {
			if(ret.installed) {
				wx.shareWebpage({
					apiKey: '',
					scene: scene,
					title: title,
					description: desc,
					contentUrl: url
				}, function(ret, err) {
					if(ret.status) {

					} else {
						alert(err.code);
					}
				});

			}else {
				alert('当前设备未安装微信客户端');
			}
		});
	}
	window.wxApi = wxApi;
})();

//					var arr = [];
//					var key = 'c3ef6310ae1e0e4edcca33ea3bcad2b0';
//
//					var t = {
//						appid: bankResult.appid,
//						prepayid: bankResult.prepayid,
//						partnerid: bankResult.partnerid,
//						noncestr: bankResult.noncestr,
//						timestamp: bankResult.timestamp,
//						package: "Sign=WXPay",
//					};
//
//					for(var item in t) {
//						if(t[item] != null)
//							arr.push(item + '=' + t[item]);
//					}
//
//					//ASCII码排序
//					arr.sort();
//
//					var Str = arr.join('&');
//					var m = Str + '&key=' + key;
//					console.log(m);
//
//					var sign = CryptoJS.MD5(m).toString().toUpperCase();
//					console.log(sign);