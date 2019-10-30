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