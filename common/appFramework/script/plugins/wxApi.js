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