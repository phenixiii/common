jsRes = {

	Server: {
		//获取公司信息（用户注册时）
		GetCompanysService: 'EILHub.API.Service.GetCompanysService',
		//获取用户信息
		GetLoginInfoService: 'EILHub.API.Service.GetLoginInfoService',
		//获取用户消息
		GetCompanyUserMsgsService: 'EILHub.API.Service.GetCompanyUserMsgsServic',
		//用户注册
		UserRegisterService: 'SHB.SDPL.API.Service.UserRegisterService',
		//密码重置
		BackPasswordService: 'SHB.SDPL.API.Service.BackPasswordService',
		//公司信息注册
		WebRegisterService: 'SHB.SDPL.API.Service.WebRegisterService',

		//测试数据
		TestService: 'SHB.IW.WebAPI.Serivce.TestService',

	},

	menuList: [{
		href: 'user',
		name: '用户管理',
		icon: 'el-icon-setting',
		list: [{
			name: '用户管理',
			href: 'userManage',
		}, {
			name: '角色管理',
			href: 'roleManage',
		}, {
			name: '权限管理',
			href: 'relationManage',
		}],
	}, {
		href: 'company',
		name: '公司简介',
		icon: 'el-icon-star-on',
		list: [{
			name: '公司介绍',
			href: 'page1',
		}, {
			name: '经营范围',
			href: 'page2',
		}, {
			name: '区域示意图',
			href: 'page3',
		}, {
			name: '组织机构',
			href: 'page4',
		}, {
			name: '公司荣誉与资质',
			href: 'page5',
		}, {
			name: '联系方式',
			href: 'page6',
		}],
	}, {
		href: 'onlineBusiness',
		name: '在线业务',
		icon: 'el-icon-more-outline',
		list: [{
			name: '客户中心',
			href: 'pageA',
		}, {
			name: '业务信息查询',
			href: 'pageB',
		}, {
			name: '网上业务受理',
			href: 'pageC',
		}],
	}, {
		href: 'helpCenter',
		name: '帮助中心',
		icon: 'el-icon-phone-outline',
		list: [{
			name: '公司公告',
			href: 'page7',
		}, {
			name: '服务中心',
			href: 'page8',
		}],
	}],

	adminMenuList: [
		{
			href: 'user',
			name: '文件',
			icon: 'el-icon-edit',
			list: [
				{ name: '登录', href: '' },
			]
		},
		{
			href: 'monitoring',
			name: '监控',
			icon: 'el-icon-view',
			list: [
				{ name: '港口总览', href: 'portMonitorning' },
				{ name: '码头监控', href: 'wharfMonitoring' },
				{ name: '船舶监控', href: 'shipMonitorning' },
				{ name: '作业路监控', href: 'jobMonitorning' },
				{ name: '设备故障监控', href: 'equipmentMonitorning' },
				{ name: '人员配置监控', href: 'personMonitorning' },
			]
		},
		{
			href: 'data',
			name: '数据',
			icon: 'el-icon-tickets',
			list: [
				{ name: '记录查询', href: 'searchData' },
				{ name: '数据分析', href: 'analyzeData' },
				{ name: '报表', href: 'statementData' },
			]
		},
		{
			href: 'setting',
			name: '设置',
			icon: 'el-icon-setting',
			list: [
				{ name: '界面样式', href: 'uiSetting' },
				{ name: '选项', href: 'optionSetting' },
			]
		},
		{
			href: 'help',
			name: '帮助',
			icon: 'el-icon-setting',
			list: [
				{ name: '关于', href: 'aboutHelp' },
				{ name: '帮助', href: 'helpHelp' },
			]
		},
	],

	goodsInfoList: [{
		cardNo: 'CS10010000', //卡号
		brandName: 'JAS/澳大利亚', //品牌
		weight: 20000, //重量
		count: 1, //数量
		carList: [ //车信息列表
			{
				wagon: 'BNCU3104039', //车皮号
				weight: 1000, //重量
				count: 1, //数量
				cargonLocationList: [ //货位信息列表
					{
						locationNo: 'C63000', //货位
						weight: '1250', //重量
						count: '4', //数量
						goodsInfo: [ //货信息列表
							{
								shipper: 'Shipper_0', //货主
								locationNo: 'C63000', //货位号
								stackingIndex: 1, //堆放顺序
								meltingNo: '161800', //熔炼号
								weight: '300', //重量
								warehouseName: '安达路堆场', //堆场名称
								productName: '阴极铜', //品名
								brandName: 'JAS/澳大利亚', //品牌
								ascription: '金属公司', //货物归属
								weigh: 300 //过磅重量					
							}
						]
					}
				]
			}
		]
	}],

	GetGoodsData: function() {
		var resultData = [];
		//设置一级数据
		for(var i = 1; i <= 2; i++) {
			var newGood = {
				cardNo: 'CS1001000' + i,
				brandName: 'JAS/澳大利亚',
				weight: 2000 + 400 * i,
				count: 32000,
				carList: [],
				searchWagon: [], //车皮号筛选列表
			};
			resultData.push(newGood);
		}
		//设置二级数据
		for(var i = 0; i < resultData.length; i++) {
			var item = resultData[i];
			for(var j = 1; j <= 4; j++) {
				var newCar = {
					wagon: 'BNCU3104030' + j, //车皮号
					weight: item.weight / 4, //重量
					count: item.count / 4, //数量
					cargonLocationList: [],
					searchLocationNo: [], //货位筛选列表
				};
				item.carList.push(newCar);
				var searchWagonObj = {
					text: newCar.wagon,
					value: newCar.wagon,
				};
				item.searchWagon.push(searchWagonObj);
			}
		}
		//设置三级数据
		for(var i = 0; i < resultData.length; i++) {
			var oneItem = resultData[i];
			for(var j = 0; j < oneItem.carList.length; j++) {
				var twoItem = oneItem.carList[j];
				for(var k = 1; k <= 4; k++) {
					var newCargonLocation = {
						locationNo: 'C63000' + k, //货位
						weight: twoItem.weight / 4, //重量
						count: twoItem.count / 4, //数量
						goodsInfo: [],
						searchShipper: [], //货主筛选列表
						searchMeltingNo: [], //熔炼号筛选列表
					};
					twoItem.cargonLocationList.push(newCargonLocation);
					var searchLocationNoObj = {
						text: newCargonLocation.locationNo,
						value: newCargonLocation.locationNo,
					};
					twoItem.searchLocationNo.push(searchLocationNoObj);
				}
			}
		}
		//设置四级数据
		for(var i = 0; i < resultData.length; i++) {
			var oneItem = resultData[i];
			var count = 5;
			for(var j = 0; j < oneItem.carList.length; j++) {
				var twoItem = oneItem.carList[j];
				for(var k = 0; k < twoItem.cargonLocationList.length; k++) {
					var threeItem = twoItem.cargonLocationList[k];
					for(var l = 1; l <= count; l++) {
						var newGoodInfo = {
							shipper: 'Shipper_' + l, //货主
							locationNo: threeItem.locationNo, //货位号
							stackingIndex: 0 + l, //堆放顺序
							meltingNo: 'RL161800_' + l, //熔炼号
							weight: threeItem.weight / count, //重量
							warehouseName: '安达路堆场', //堆场名称
							productName: '阴极铜', //品名
							brandName: 'JAS/澳大利亚', //品牌
							ascription: '金属公司', //货物归属
							weigh: threeItem.weight / count //过磅重量			
						};
						threeItem.goodsInfo.push(newGoodInfo);

						var searchShipperObj = {
							text: newGoodInfo.shipper,
							value: newGoodInfo.shipper,
						};
						threeItem.searchShipper.push(searchShipperObj);
						var searchMeltingNoObj = {
							text: newGoodInfo.meltingNo,
							value: newGoodInfo.meltingNo,
						};
						threeItem.searchMeltingNo.push(searchMeltingNoObj);
					}
				}
			}
		}
		return resultData;
	},

	GetTempData: function() {
		var resultData = {
			searchList: [],
			dataList: []
		};
		//设置一级数据
		for(var i = 1; i <= 2; i++) {
			var newGood = {
				cardNo: 'CS1001000' + i,
				brandName: 'JAS/澳大利亚',
				weight: 2000 + 400 * i,
				count: 32000,
				carList: [],
				searchWagon: [], //车皮号筛选列表
			};
			var newSearch = {
				text: newGood.cardNo,
				value: newGood.cardNo,
			};
			resultData.dataList.push(newGood);
			resultData.searchList.push(newSearch);
		}
		//设置二级数据
		for(var i = 0; i < resultData.dataList.length; i++) {
			var item = resultData.dataList[i];
			for(var j = 1; j <= 4; j++) {
				var newCar = {
					wagon: 'BNCU3104030' + j, //车皮号
					weight: item.weight / 4, //重量
					count: item.count / 4, //数量
					cargonLocationList: [],
					searchLocationNo: [], //货位筛选列表
				};
				item.carList.push(newCar);
				var searchWagonObj = {
					text: newCar.wagon,
					value: newCar.wagon,
				};
				item.searchWagon.push(searchWagonObj);
			}
		}
		//设置三级数据
		for(var i = 0; i < resultData.dataList.length; i++) {
			var oneItem = resultData.dataList[i];
			for(var j = 0; j < oneItem.carList.length; j++) {
				var twoItem = oneItem.carList[j];
				for(var k = 1; k <= 6; k++) {
					var newCargonLocation = {
						locationNo: 'C63000' + k, //货位
						weight: twoItem.weight / 4, //重量
						count: twoItem.count / 4, //数量
						goodsInfo: [],
						searchShipper: [], //货主筛选列表
						searchMeltingNo: [], //熔炼号筛选列表
					};
					twoItem.cargonLocationList.push(newCargonLocation);
					var searchLocationNoObj = {
						text: newCargonLocation.locationNo,
						value: newCargonLocation.locationNo,
					};
					twoItem.searchLocationNo.push(searchLocationNoObj);
				}
			}
		}
		//设置四级数据
		for(var i = 0; i < resultData.dataList.length; i++) {
			var oneItem = resultData.dataList[i];
			var count = 8;
			for(var j = 0; j < oneItem.carList.length; j++) {
				var twoItem = oneItem.carList[j];
				for(var k = 0; k < twoItem.cargonLocationList.length; k++) {
					var threeItem = twoItem.cargonLocationList[k];
					for(var l = 1; l <= count; l++) {
						var newGoodInfo = {
							shipper: 'Shipper_' + l, //货主
							locationNo: threeItem.locationNo, //货位号
							stackingIndex: 0 + l, //堆放顺序
							meltingNo: 'RL161800_' + l, //熔炼号
							weight: threeItem.weight / count, //重量
							warehouseName: '安达路堆场', //堆场名称
							productName: '阴极铜', //品名
							brandName: 'JAS/澳大利亚', //品牌
							ascription: '金属公司', //货物归属
							weigh: threeItem.weight / count //过磅重量			
						};
						threeItem.goodsInfo.push(newGoodInfo);

						var searchShipperObj = {
							text: newGoodInfo.shipper,
							value: newGoodInfo.shipper
						};
						threeItem.searchShipper.push(searchShipperObj);
						var searchMeltingNoObj = {
							text: newGoodInfo.meltingNo,
							value: newGoodInfo.meltingNo
						};
						threeItem.searchMeltingNo.push(searchMeltingNoObj);
					}
				}
			}
		}
		return resultData;
	},

	//过户
	GetTransferData: function() {
		var resultData = {
			dataList: [],
			searchpalnNo: [],
			searchshipper: [],
			searchtargetShipper: [],
			searchproductName: [],
			searchbillNo: [],
			searchactualStartDate: [],
			searchactualEndDate: [],
		};
		//过户信息
		var TransferCount = 2;
		for(var i = 1; i <= TransferCount; i++) {
			var obj = {
				planNo: 'GH1001000' + i,
				shipper: '上海XXXXXXX公司' + i,
				targetShipper: '目标XXXXXXX公司' + i,
				productName: '品名' + i,
				morebrandName: true,
				planNumber: 10000 + i * 100,
				planWeight: 15000 + i * 100,
				actualNumber: 10000 + i * 50,
				actualWeight: 15000 + i * 100 - 20,
				billNo: 'TD--001200' + i,
				planState: (i % 2) == 0 ? '计划中' : (i % 3 == 0 ? '已完成' : '已入库'),
				actualStartDate: '2019-01-01',
				actualEndDate: '2019-01-05',
				inputer: 'Admin',
				inputDate: '2019-01-01',
				detailPlan: [], //
				planBillDetail: [], //
			};
			resultData.dataList.push(obj);
			var planNo = {
				text: obj.planNo,
				value: obj.planNo
			};
			if(JSON.stringify(resultData.searchpalnNo).indexOf(JSON.stringify(planNo)) == -1) {
				resultData.searchpalnNo.push(planNo);
			}
			var shipper = {
				text: obj.shipper,
				value: obj.shipper
			};
			if(JSON.stringify(resultData.searchshipper).indexOf(JSON.stringify(shipper)) == -1) {
				resultData.searchshipper.push(shipper);
			}
			var targetShipper = {
				text: obj.targetShipper,
				value: obj.targetShipper
			};
			if(JSON.stringify(resultData.searchtargetShipper).indexOf(JSON.stringify(targetShipper)) == -1) {
				resultData.searchtargetShipper.push(targetShipper);
			}
			var productName = {
				text: obj.productName,
				value: obj.productName
			};
			if(JSON.stringify(resultData.searchproductName).indexOf(JSON.stringify(productName)) == -1) {
				resultData.searchproductName.push(productName);
			}
			var billNo = {
				text: obj.billNo,
				value: obj.billNo
			};
			if(JSON.stringify(resultData.searchbillNo).indexOf(JSON.stringify(billNo)) == -1) {
				resultData.searchbillNo.push(billNo);
			}
			var actualStartDate = {
				text: obj.actualStartDate,
				value: obj.actualStartDate
			};
			if(JSON.stringify(resultData.searchactualStartDate).indexOf(JSON.stringify(actualStartDate)) == -1) {
				resultData.searchactualStartDate.push(actualStartDate);
			}
			var actualEndDate = {
				text: obj.actualEndDate,
				value: obj.actualEndDate
			};
			if(JSON.stringify(resultData.searchactualEndDate).indexOf(JSON.stringify(actualEndDate)) == -1) {
				resultData.searchactualEndDate.push(actualEndDate);
			}
		}
		//过户明细
		for(var i = 0; i < resultData.dataList.length; i++) {
			var plan = resultData.dataList[i];
			for(var j = 1; j <= 5; j++) {
				var obj = {
					detailPlanNo: 'NCSP2019031500' + j,
					planNo: plan.planNo,
					warehouse: '安达路堆场' + j + '区',
					morebrandName: true,
					productbrandName: 'YP' + j,
					cardNo: '19SG20190320000' + j,
					planNumber: 1000 + j * 100,
					planCloudNumber: 1000 + j * 100,
					planWeight: 1500 + j * 100,
					planCloudNumber: 10000 + j * 50,
					pickCount: j * 100 - 30,
					billNo: plan.billNo,
					goodsDetail: [],
					searchWarehouse: [],
				};				
				plan.detailPlan.push(obj);
			}
		}
		//过户提单
		for(var i = 0; i < resultData.dataList.length; i++) {
			var plan = resultData.dataList[i];
			for(var j = 1; j <= 5; j++) {
				var obj = {
					billNo: 'NCSP2019031500' + j,
					planNo: plan.planNo,
					planNumber: 1000 + i * 100,
					planWeight: 1500 + i * 100,
					actualNumber: 1000 + i * 50,
					actualWeight: 1500 + i * 100 - 20,
					planState: (i % 2) == 0 ? '已完成' : (i % 3 == 0 ? '已入库' : '计划中'),
					planStartDate: '2019-01-01',
					planEndDate: '2019-01-08',
					actualStartDate: '2019-01-01',
					actualEndDate: '2019-01-05',
					inputer: 'Admin',
					inputDate: '2019-01-01',
				};
				plan.planBillDetail.push(obj);
			}
		}
		//过户货物
		for(var i = 0; i < resultData.dataList.length; i++) {
			var oneItem = resultData.dataList[i];
			for(var j = 0; j < oneItem.detailPlan.length; j++) {
				var twoItem = oneItem.detailPlan[j];
				for(var k = 1; k <= 10; k++) {
					var newCargonLocation = {
						planNo: oneItem.planNo, //过户计划号
						planDetNo: twoItem.detailPlanNo, //过户子计划号
						brandName: 'YP' + k, //品牌
						warrantyNo: 'FSW03417489' + k, //质保书编号
						cardNo: twoItem.cardNo, //卡号
						boxNo: 'NFOC023' + k, //车皮/箱号
						primaryNo: 'PID0S023SD012' + k, //原期货舱单号
						count: k, //数量
						weight: 200 + 20 * k, //重量
						locationNo: 'W0201T00' + i, //货位
					};
					twoItem.goodsDetail.push(newCargonLocation);
				}
			}
		}
		return resultData;
	},

}
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
	sessionStorage: {
		SetItem: function(type, key, value) {
			if(type == "JSON") {
				window.sessionStorage.setItem(key, JSON.stringify(value));
			} else {
				window.sessionStorage.setItem(key, value);
			}
		},
		GetItem: function(key) {
			return window.sessionStorage.getItem(key);
		},
		RemoveItem: function(key) {
			window.sessionStorage.removeItem(key);
		},
		Clear: function() {
			window.sessionStorage.clear();
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
		return jsTools.sessionStorage.getVal(jsTools.Res.userNumber);
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
var menuL = [{
	chName: '公司简介',
	egName: 'company',
	key: 'company',
	level: 1,
	menuList: [{
		title: '公司介绍',
		link: '#/company/page1',
		className: 'levelOne-compy'
	}, {
		title: '经营范围',
		link: '#/company/page2',
		className: 'levelOne-compy'
	}, {
		title: '区域示意图',
		link: '#/company/page3',
		className: 'levelOne-compy'
	}, {
		title: '组织架构',
		link: '#/company/page4',
		className: 'levelOne-compy'
	}, {
		title: '公司荣誉与资质',
		link: '#/company/page5',
		className: 'levelOne-compy'
	}, {
		title: '联系方式',
		link: '#/company/page6',
		className: 'levelOne-compy'
	}]
}, {
	chName: '新闻公告',
	egName: 'new',
	key: 'new',
	level: 1,
	menuList: [{
		title: '深水港新闻中心',
		link: '#/new/news',
		className: 'levelOne is-active'
	}]
}, {
	chName: '公司用户管理',
	egName: 'user',
	key: 'user',
	level: 1,
	menuList: [{
		title: '用户管理',
		link: '#/user/userManage',
		className: 'levelOne is-active'
	},{
		title: '角色管理',
		link: '#/user/roleManage',
		className: 'levelOne is-active'
	},{
		title: '权限管理',
		link: '#/user/relationManage',
		className: 'levelOne is-active'
	}]
}, {
	chName: '在线业务',
	egName: 'ONLINE BUSINESS',
	key: 'onlineBusiness',
	level: 2,
	menuList: [{
		title: '客户中心',
		link: '1',
		itemList: [{
			title: '电子小票',
			link: '#/onlineBusiness/printTicket'
		}]
	}, {
		title: '业务信息查询',
		link: '2',
		itemList: [{
			title: '货查询',
			link: '#/onlineBusiness/goodSearch'
		}, {
			title: '箱查询',
			link: '#/onlineBusiness/boxSearch'
		}, {
			title: '海关放行查询',
			link: '#/onlineBusiness/customCheck'
		}, {
			title: '在场箱状态查询',
			link: '#/onlineBusiness/inStateSearch'
		}, {
			title: 'VGM信息查询',
			link: '#/onlineBusiness/VGMinfoSearch'
		}]
	}, {
		title: '网上业务受理',
		link: '3',
		itemList: [{
			title: '报检录入',
			link: '#/onlineBusiness/inspectionEntry'
		}, {
			title: '报检查询',
			link: '#/onlineBusiness/inspectionQuery'
		}, {
			title: '报检结费',
			link: '#/onlineBusiness/inspectionPay'
		}, {
			title: '开票信息输入',
			link: '#/onlineBusiness/InvoiceEntry'
		}, {
			title: '箱信息变更推送',
			link: '#/onlineBusiness/boxinfoPush'
		}, {
			title: '辅助区查验计划',
			link: '#/onlineBusiness/auxiliaryPlan'
		}, {
			title: '辅助区查验结费',
			link: '#/onlineBusiness/auxiliaryPay'
		}, {
			title: '委托送港计划',
			link: '#/onlineBusiness/endeliveryPlan'
		}, {
			title: '委托送港结费',
			link: '#/onlineBusiness/endeliveryPay'
		}, {
			title: '其他结费',
			link: '#/onlineBusiness/otherPay'
		}]
	}]
}]

var phAjax = (function ($) {
    var HOST_COOKIE_NAME = "P-H";
    var PORT_COOKIE_NAME = "P-AP";
    var USER_NUMBER_COOKIE_NAME = "P-UN";
    var KEY_COOKIE_NAME = "P-K";

    var AUTHORIZATION_HEADER_NAME = "Phenix-Authorization";
    var METHOD_OVERRIDE_HEADER_NAME = "X-HTTP-Method-Override";

    var _getHost = function () {
        var result;
        try {
            result = window.sessionStorage.getItem(HOST_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(HOST_COOKIE_NAME);
        }
        // return typeof result != "undefined" && result != null ? result : "180.166.243.227";//外网
        return typeof result != "undefined" && result != null ? result : "172.20.10.88";//内网
    };
    var _setHost = function (value) {
        try {
            window.sessionStorage.removeItem(HOST_COOKIE_NAME);
            window.sessionStorage.setItem(HOST_COOKIE_NAME, value);
        } catch (e) {
            $.cookie(HOST_COOKIE_NAME, value, { path: '/' });
        }
    };
    
    var _getPort = function () {
        var result;
        try {
            result = window.sessionStorage.getItem(PORT_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(PORT_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? result : 8080;//8080/9082
    };
    var _setPort = function (value) {
        try {
            window.sessionStorage.removeItem(PORT_COOKIE_NAME);
            window.sessionStorage.setItem(PORT_COOKIE_NAME, value);
        } catch (e) {
            $.cookie(PORT_COOKIE_NAME, value, { path: '/' });
        }
    };

    var _getUserNumber = function () {
        var result;
        try {
            result = window.sessionStorage.getItem(USER_NUMBER_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(USER_NUMBER_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? result : 'Guest';
    };
    var _setUserNumber = function (value) {
        try {
            window.sessionStorage.removeItem(USER_NUMBER_COOKIE_NAME);
            window.sessionStorage.setItem(USER_NUMBER_COOKIE_NAME, value);
        } catch (e) {
            $.cookie(USER_NUMBER_COOKIE_NAME, value, { path: '/' });
        }
    };

    var _getKey = function () {
        var result;
        try {
            result = window.sessionStorage.getItem(KEY_COOKIE_NAME);
        } catch (e) {
            result = $.cookie(KEY_COOKIE_NAME);
        }
        return typeof result != "undefined" && result != null ? CryptoJS.enc.Hex.parse(result) : CryptoJS.MD5('Guest');
    };
    var _setKey = function (value) {
        try {
            window.sessionStorage.removeItem(KEY_COOKIE_NAME);
            window.sessionStorage.setItem(KEY_COOKIE_NAME, value != null ? CryptoJS.enc.Hex.stringify(value) : null);
        } catch (e) {
            $.cookie(KEY_COOKIE_NAME, value != null ? CryptoJS.enc.Hex.stringify(value) : null, { path: '/' });
        }
    };

    var _encrypt = function (value, key) {
        try {
            if (typeof value != "undefined" && value != null)
                return CryptoJS.AES.encrypt(value, key, { iv: key, mode: CryptoJS.mode.CBC });
            else
                return null;
        } catch (e) {
            return null;
        }
    };

    var _formatAuthorizationHeader = function (userNumber, key, contentMD5, contentEncrypted) {
        if (userNumber == null || key == null)
            return null;
        var timestamp = Math.random().toString(36).substring(2) + new Date().toISOString();
        return encodeURIComponent(userNumber) + "," + timestamp + "," + contentMD5 + "," +
            (contentEncrypted ? 1 : 0) + "," + _encrypt(timestamp + contentMD5, key);
    };

    var _setAuthorizationHeader = function (XMLHttpRequest, userNumber, key, contentMD5, contentEncrypted) {
        XMLHttpRequest.setRequestHeader(AUTHORIZATION_HEADER_NAME, _formatAuthorizationHeader(userNumber, key, contentMD5, contentEncrypted));
    };

    var _initAuthorizationHeader = function (XMLHttpRequest, contentMD5, contentEncrypted) {
        _setAuthorizationHeader(XMLHttpRequest, _getUserNumber(), _getKey(), contentMD5, contentEncrypted);
    };

    var _setPutOverrideHeader = function (XMLHttpRequest) {
        XMLHttpRequest.setRequestHeader(METHOD_OVERRIDE_HEADER_NAME, "PUT");
    };

    var _setDeleteOverrideHeader = function (XMLHttpRequest) {
        XMLHttpRequest.setRequestHeader(METHOD_OVERRIDE_HEADER_NAME, "DELETE");
    };

    return {
        get userNumber() {
            return _getUserNumber();
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

        get baseUrl() {
            return "http://" + phAjax.host + ":" + phAjax.port + "/api/";
        },

        get securityUrl() {
            return phAjax.baseUrl + "Security";
        },

        get dataUrl() {
            return phAjax.baseUrl + "Data";
        },

        logOn: function (userNumber, password, onComplete, onError) {
            phAjax.logOnVerify(userNumber, password, new Date().toISOString(), onComplete, onError);
        },

        logOnVerify: function (userNumber, password, tag, onComplete, onError) {
            var key = CryptoJS.MD5(password);
            $.ajax({
                type: "POST",
                url: phAjax.securityUrl,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: 3000,
                beforeSend: function (XMLHttpRequest) {
                    _setAuthorizationHeader(XMLHttpRequest, userNumber, key, "", false);
                },
                data: _encrypt(tag, key).toString(),
                complete: function (XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status == 200) {
                        _setUserNumber(userNumber);
                        _setKey(key);
                    } else if (typeof onError == "function")
                        onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    if (typeof onComplete == "function")
                        onComplete(XMLHttpRequest, textStatus);
                },
            });
        },

        changePassword: function (userNumber, password, newPassword, onComplete, onError) {
            var key = CryptoJS.MD5(password);
            $.ajax({
                type: "POST",
                url: phAjax.securityUrl,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: 3000,
                beforeSend: function (XMLHttpRequest) {
                    _setAuthorizationHeader(XMLHttpRequest, userNumber, key, "", false);
                    _setPutOverrideHeader(XMLHttpRequest);
                },
                data: _encrypt(newPassword, key).toString(),
                complete: function (XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status == 200) {
                        _setUserNumber(userNumber);
                        _setKey(CryptoJS.MD5(newPassword));
                    } else if (typeof onError == "function")
                        onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                    if (typeof onComplete == "function")
                        onComplete(XMLHttpRequest, textStatus);
                },
            });
        },

        logOff: function (userNumber, onComplete) {
            $.ajax({
                type: "POST",
                url: phAjax.securityUrl,
                dataType: "JSON",
                contentType: "application/json;charset=utf-8",
                crossDomain: true,
                timeout: 3000,
                beforeSend: function (XMLHttpRequest) {
                    _initAuthorizationHeader(XMLHttpRequest, "", false);
                    _setDeleteOverrideHeader(XMLHttpRequest);
                },
                data: {},
                complete: function (XMLHttpRequest, textStatus) {
                    _setUserNumber('Guest');
                    _setKey(CryptoJS.MD5('Guest'));
                    if (typeof onComplete == "function")
                        onComplete(XMLHttpRequest, textStatus);
                },
            });
        },

        getSequenceValue: function (options) {
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
                beforeSend: function (XMLHttpRequest) {
                    _initAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function (value) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(value);
                },
                complete: function (XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200)
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                },
            });
        },

        fetch: function (options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体类全名(需实现IEntity接口)
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
                beforeSend: function (XMLHttpRequest) {
                    _initAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function (data) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(data);
                },
                complete: function (XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200)
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                },
            });
        },

        getRecordCount: function (options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体集合类全名(需实现IEntityCollection接口)
                masterName: null, //主对象名, 在服务端注册的实体类全名(需实现IEntity接口)
                masterId: null, //主对象主键值
                groupName: null, //分组名, null代表全部
                criteriaName: null, //条件名, 在服务端定义的条件类全名(需实现ICriteria接口)
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
                beforeSend: function (XMLHttpRequest) {
                    _initAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function (count) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(count);
                },
                complete: function (XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200)
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                },
            });
        },

        fetchList: function (options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体集合类全名(需实现IEntityCollection接口)
                masterName: null, //主对象名, 在服务端注册的实体类全名(需实现IEntity接口)
                masterId: null, //主对象主键值
                groupName: null, //分组名, null代表全部
                criteriaName: null, //条件名, 在服务端定义的条件类全名(需实现ICriteria接口)
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
                beforeSend: function (XMLHttpRequest) {
                    _initAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: {},
                success: function (data) {
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
                                onSuccess: function (count) {
                                    options.onSuccess(data, count);
                                },
                                onError: options.onError,
                            });
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200)
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                },
            });
        },

        save: function (options) {
            var defaults = {
                dataName: null, //数据名, 在服务端注册的实体集合类/实体类全名(需实现IEntityCollection/IEntity接口)
                data: null, //传到服务端的数据, 需包含IsNew、IsSelfDeleted、IsSelfDirty属性以指明对象状态
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
                beforeSend: function (XMLHttpRequest) {
                    _initAuthorizationHeader(XMLHttpRequest, options.dataVerify ? CryptoJS.MD5(options.data) : "", options.dataEncrypt);
                },
                data: options.dataEncrypt ? _encrypt(options.data, _getKey()).toString() : options.data,
                success: function (count) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(count);
                },
                complete: function (XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200)
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                },
            });
        },

        execute: function (options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(需实现IService接口)
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
                beforeSend: function (XMLHttpRequest) {
                    _initAuthorizationHeader(XMLHttpRequest, options.dataVerify ? CryptoJS.MD5(options.data) : "", options.dataEncrypt);
                },
                data: options.dataEncrypt ? _encrypt(options.data, _getKey()).toString() : options.data,
                success: function (result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(result);
                },
                complete: function (XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200)
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                },
            });
        },

        uploadFiles: function (options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(需实现IService接口)
                data: null, //传到服务端的数据
                files: null, //传到服务端的文件
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            var formData = new FormData();
            formData.append("data", typeof options.data == "string" ? options.data : JSON.stringify(options.data));
            if (options.files != null)
                for (var i = 0; i < options.files.length; i++) {
                    formData.append("file", options.files[i], options.files[i].name);
                }
            $.ajax({
                type: "POST",
                url: phAjax.dataUrl +
                    "/" + encodeURIComponent(options.serviceName),
                dataType: "JSON",
                processData: false, //不要对data参数进行序列化处理，默认为true
                contentType: false, //不要设置Content-Type请求头，因为文件数据是以 multipart/form-data 来编码
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function (XMLHttpRequest) {
                    _initAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: formData,
                success: function (result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(result);
                },
                complete: function (XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200)
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                },
            });
        },

        uploadBigFiles: function (options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(需实现IService接口)
                data: null, //传到服务端的数据
                files: null, //传到服务端的文件
                timeout: 30000, //默认超时30秒
                onProgress: null, //执行进度的回调函数, 参数(result, fileName, chunkCount, chunkNumber, chunkSize)中result为返回的数据，函数调用返回值如为false则中止上传
                onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
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
        },

        uploadChunkInfo: function (options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(需实现IService接口)
                data: null, //传到服务端的数据
                file: null, //传到服务端的文件
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
                beforeSend: function (XMLHttpRequest) {
                    _initAuthorizationHeader(XMLHttpRequest, "", false);
                },
                data: formData,
                success: function (result) {
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
                complete: function (XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200)
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                },
            });
        },

        downloadFile: function (options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(需实现IService接口)
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
            _initAuthorizationHeader(xhr, "", false);
            xhr.onload = function () {
                if (this.status == 200) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(this.response);
                } else if (typeof options.onError == "function")
                    options.onError(this, this.textStatus, new Error(this.responseText));
            };
            var formData = new FormData();
            formData.append("data", typeof options.data == "string" ? options.data : JSON.stringify(options.data));
            formData.append("chunkNumber", "0");
            xhr.send(formData);
        },

        downloadBigFile: function (options) {
            var defaults = {
                serviceName: null, //服务名, 在服务端注册的服务类全名(需实现IService接口)
                data: null, //传到服务端的数据
                chunkNumber: 1, //传到服务端的块号
                timeout: 30000, //默认超时30秒
                onProgress: null, //执行进度的回调函数, 参数(fileName, chunkCount, chunkNumber, chunkSize, chunkBuffer)，函数调用返回值如为false则中止上传
                onSuccess: null, //调用成功的回调函数, 参数(fileName, chunkCount)
                onError: null, //调用失败的回调函数, 参数(XMLHttpRequest, textStatus, errorThrown)
            };
            options = $.extend(defaults, options);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", phAjax.dataUrl + "/" + encodeURIComponent(options.serviceName));
            xhr.responseType = "json";
            xhr.withCredentials = true;
            xhr.timeout = options.timeout;
            _initAuthorizationHeader(xhr, "", false);
            xhr.onload = function () {
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
                } else if (typeof options.onError == "function")
                    options.onError(this, this.textStatus, new Error(this.responseText));
            };
            var formData = new FormData();
            formData.append("data", typeof options.data == "string" ? options.data : JSON.stringify(options.data));
            formData.append("chunkNumber", options.chunkNumber);
            xhr.send(formData);
        },

        ajax: function (options) {
            var defaults = {
                anonymity: false, //是否匿名访问
                type: "GET", //请求方法(GET/POST/PUT/DELETE), 默认是GET
                uri: null, //标识服务端的ApiController名称及其参数
                data: null, //传到服务端的数据
                dataVerify: false, //数据需核实(匿名访问时无效)
                dataEncrypt: false, //数据需加密(匿名访问时无效)
                timeout: 30000, //默认超时30秒
                onSuccess: null, //调用成功的回调函数, 参数(result)为返回的数据
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
                crossDomain: true,
                timeout: options.timeout,
                beforeSend: function (XMLHttpRequest) {
                    if (!options.anonymity)
                        _initAuthorizationHeader(XMLHttpRequest, options.dataVerify ? CryptoJS.MD5(options.data) : "", options.dataEncrypt);
                    if (options.type == "PUT")
                        _setPutOverrideHeader(XMLHttpRequest);
                    else if (options.type == "DELETE")
                        _setDeleteOverrideHeader(XMLHttpRequest);
                },
                data: !options.anonymity && options.dataEncrypt ? _encrypt(options.data, _getKey()).toString() : options.data,
                success: function (result) {
                    if (typeof options.onSuccess == "function")
                        options.onSuccess(result);
                },
                complete: function (XMLHttpRequest, textStatus) {
                    if (XMLHttpRequest.status != 200)
                        if (typeof options.onError == "function")
                            options.onError(XMLHttpRequest, textStatus, new Error(XMLHttpRequest.responseText));
                },
            });
        },
    }
})(jQuery);

/*
    工具集
*/
var phUtils = (function () {
    var CHUNK_MAX_SIZE = 1024 * 1024;
    return {
        getChunkCount: function (fileSize) {
            return Math.ceil(fileSize / CHUNK_MAX_SIZE);
        },

        readChunkInfo: function (file, chunkCount, chunkNumber) {
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

        toObject: function (nameValues) {
            var result = {};
            nameValues.map(function (item) { result[item.name] = item.value; });
            return result;
        },
    }
})();