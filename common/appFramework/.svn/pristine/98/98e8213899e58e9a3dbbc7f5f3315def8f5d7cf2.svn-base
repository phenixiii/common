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