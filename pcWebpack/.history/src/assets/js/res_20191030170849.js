const jsRes = {

	Server: {
		//获取公司信息（用户注册时）
		GetCompanysService: 'EILHub.API.Service.GetCompanysService',
		//获取用户信息
		GetLoginInfoService: 'EILHub.API.Service.GetLoginInfoService',
		//获取用户消息
		GetCompanyUserMsgsService: 'EILHub.API.Service.GetCompanyUserMsgsServic',
		//获取部门
		GetBaseDataService: 'SHB.WL.GetBaseData.Service.GetBaseDataService',

		//用户注册
		UserRegisterService: 'SHB.SDPL.API.Service.UserRegisterService',
		//密码重置
		BackPasswordService: 'SHB.SDPL.API.Service.BackPasswordService',
		//公司信息注册
		WebRegisterService: 'SHB.SDPL.API.Service.WebRegisterService',

		//测试数据
		TestService: 'SHB.IW.WebAPI.Serivce.TestService',

		//设备保养协议
		FetchEquMaintainAgreementService: 'SHB.WL.GKDevice.Service.FetchEquMaintainAgreementService',
		DeleteEquMaintainAgreementService: 'SHB.WL.GKDevice.Service.DeleteEquMaintainAgreementService',
		InsertEquMaintainAgreementService: 'SHB.WL.GKDevice.Service.InsertEquMaintainAgreementService',
		UpdateEquMaintainAgreementService: 'SHB.WL.GKDevice.Service.UpdateEquMaintainAgreementService',

		//天气设置
		WeatherQueryService: 'SHB.WL.GKWeather.Service.WeatherQueryService',
		WeatherInsertService: 'SHB.WL.GKWeather.Service.WeatherInsertService',
		WeatherUpdateService: 'SHB.WL.GKWeather.Service.WeatherUpdateService',
		WeatherDeleteService: 'SHB.WL.GKWeather.Service.WeatherDeleteService',

		// 公告设置
		NoticeQueryService: 'SHB.WL.GKNotice.Service.NoticeQueryService',
		NoticeInsertService: 'SHB.WL.GKNotice.Service.NoticeInsertService',
		NoticeDeleteService: 'SHB.WL.GKNotice.Service.NoticeDeleteService',
		NoticeUpdateService: 'SHB.WL.GKNotice.Service.NoticeUpdateService',
		NoticeTopService: 'SHB.WL.GKNotice.Service.NoticeTopService',
		NoticeCancelService: 'SHB.WL.GKNotice.Service.NoticeCancelService',

		//码头查询
		FetchPierService: 'SHB.WL.GKDevice.Service.FetchPierService',

		//桥吊查询
		FetchCraneService: 'SHB.WL.GKDevice.Service.FetchCraneService',
		// 设备查询
		FetchDeviceService: 'SHB.WL.GKDevice.Service.FetchDeviceService',

		// 设备维修
		FetchDeviceRepairService: 'SHB.WL.GKDevice.Service.FetchDeviceRepairService',
		DeleteDeviceRepairService: 'SHB.WL.GKDevice.Service.DeleteDeviceRepairService',
		InsertDeviceRepairService: 'SHB.WL.GKDevice.Service.InsertDeviceRepairService',
		UpdateDeviceRepairService: 'SHB.WL.GKDevice.Service.UpdateDeviceRepairService',
		ConfirmDeviceRepairService: 'SHB.WL.GKDevice.Service.ConfirmDeviceRepairService',

		// 人员借调申请
		UserExchangeApplyQueryService: 'SHB.WL.GKUserSecondment.Service.UserExchangeApplyQueryService',
		UserExchangeApplyDeleteService: 'SHB.WL.GKUserSecondment.Service.UserExchangeApplyDeleteService',
		UserExchangeApplyAddService: 'SHB.WL.GKUserSecondment.Service.UserExchangeApplyAddService',
		UserExchangeApplyModifyService: 'SHB.WL.GKUserSecondment.Service.UserExchangeApplyModifyService',
		UserExchangeApplyParameterService: 'SHB.WL.GKUserSecondment.Service.UserExchangeApplyParameterService',
		UserExchangeApplyCheckService: 'SHB.WL.GKUserSecondment.Service.UserExchangeApplyCheckService',
		EnableUserQueryService: 'SHB.WL.GKUserSecondment.Service.EnableUserQueryService',
		UserOutAddService: 'SHB.WL.GKUserSecondment.Service.UserOutAddService',
		UserOutDeleteService: 'SHB.WL.GKUserSecondment.Service.UserOutDeleteService',

		// 人员派工服务
		GetDispatchBaseInfoService: 'SHB.WL.GKUserDispatch.Service.GetDispatchBaseInfoService',
		GetDispatchInfoService: 'SHB.WL.GKUserDispatch.Service.GetDispatchInfoService',
		DeleteDispatchUserService: 'SHB.WL.GKUserDispatch.Service.DeleteDispatchUserService',
		SaveDispatchUserService: 'SHB.WL.GKUserDispatch.Service.SaveDispatchUserService',
		SetDispatchUserWaitService: 'SHB.WL.GKUserDispatch.Service.SetDispatchUserWaitService',

		//理货部和装拆箱部门基础数据获取
		GetBaseDataService: 'SHB.WL.GetBaseData.Service.GetBaseDataService',

		// 人员出勤
		GetDutyGpsInfoService: 'SHB.WL.GKUserDuty.Service.GetDutyGpsInfoService',
		GetDutyInfoAndSettingUserService: 'SHB.WL.GKUserDuty.Service.GetDutyInfoAndSettingUserService',
		GetUserDutyInfosService: 'SHB.WL.GKUserDuty.Service.GetUserDutyInfosService',
		SaveOnDutyUsersService: 'SHB.WL.GKUserDuty.Service.SaveOnDutyUsersService',
		DeleteOnDutyUsersService: 'SHB.WL.GKUserDuty.Service.DeleteOnDutyUsersService',
		ResetDutyUserInfoService: 'SHB.WL.GKUserDuty.Service.ResetDutyUserInfoService',

		//设备保养记录
		InsertEquMaintainService: 'SHB.WL.GKDevice.Service.InsertEquMaintainService',
		DeleteEquMaintainService: 'SHB.WL.GKDevice.Service.DeleteEquMaintainService',
		UpdateEquMaintainService: 'SHB.WL.GKDevice.Service.UpdateEquMaintainService',
		FetchEquMaintainService: 'SHB.WL.GKDevice.Service.FetchEquMaintainService',
		ConfirmEquMaintainService: 'SHB.WL.GKDevice.Service.ConfirmEquMaintainService',

		//报警设置
		WarnParamsAddService: 'SHB.WL.GKWarn.Service.WarnParamsAddService',
		WarnParamsDeleteService: 'SHB.WL.GKWarn.Service.WarnParamsDeleteService',
		WarnParamsModifyService: 'SHB.WL.GKWarn.Service.WarnParamsModifyService',
		WarnParamsQueryService: 'SHB.WL.GKWarn.Service.WarnParamsQueryService',

		//报警原因设置
		WarnReasonDesAddService: 'SHB.WL.GKWarn.Service.WarnReasonDesAddService',
		WarnReasonDesDeleteService: 'SHB.WL.GKWarn.Service.WarnReasonDesDeleteService',
		WarnReasonDesModifyService: 'SHB.WL.GKWarn.Service.WarnReasonDesModifyService',
		WarnReasonDesQueryService: 'SHB.WL.GKWarn.Service.WarnReasonDesQueryService',
		WarnReasonDesChangeAbleService: 'SHB.WL.GKWarn.Service.WarnReasonDesChangeAbleService',

		//报警原因解释
		GetWarnBaseDataService: 'SHB.WL.Lookup.Business.GetBaseDataService',

		// 登录后员工信息获取
		GetUserInfoService: 'SHB.WL.GetBaseData.Service.GetUserInfoService',
		WarnReasonDesEnableService: 'SHB.WL.GKWarn.Service.WarnReasonDesEnableService',

		//报警信息
		WarnInfoQueryService: 'SHB.WL.GKWarn.Service.WarnInfoQueryService',
		WarnInfoSubmitService: 'SHB.WL.GKWarn.Service.WarnInfoSubmitService',
		WarnInfoCheckService: 'SHB.WL.GKWarn.Service.WarnInfoCheckService',
		WarnInfoHandleService: 'SHB.WL.GKWarn.Service.WarnInfoHandleService',

		//就餐时间服务
		MealTimesAddService: 'SHB.WL.GKWarn.Service.MealTimesAddService',
		MealTimesDeleteService: 'SHB.WL.GKWarn.Service.MealTimesDeleteService',
		MealTimesModifyService: 'SHB.WL.GKWarn.Service.MealTimesModifyService',
		MealTimesQueryService: 'SHB.WL.GKWarn.Service.MealTimesQueryService',

		//应急预案处置
		FetchEmcProcessService: 'SHB.WL.GKDevice.Service.FetchEmcProcessService',
		UpdateEmcProcessService: 'SHB.WL.GKDevice.Service.UpdateEmcProcessService',
		DeleteEmcProcessService: 'SHB.WL.GKDevice.Service.DeleteEmcProcessService',
		InsertEmcProcessService: 'SHB.WL.GKDevice.Service.InsertEmcProcessService',
		CheckEmcProcessService: 'SHB.WL.GKDevice.Service.CheckEmcProcessService',

		//操作室检查录入
		FetchCCKInputService: 'SHB.WL.GKControlCheckInput.Service.FetchCCKInputService',
		InsertCCKInputService: 'SHB.WL.GKControlCheckInput.Service.InsertCCKInputService',
		UpdateCCKInputService: 'SHB.WL.GKControlCheckInput.Service.UpdateCCKInputService',
		DeleteCCKInputService: 'SHB.WL.GKControlCheckInput.Service.DeleteCCKInputService',

		//大屏监控相关
		// 作业路监控
		GetOperationRouteInfoService: 'SHB.WL.GKOperatingRouteMonitor.Service.GetOperationRouteInfoService',
		// 船舶总览
		GetOperationRouteVesselService: 'SHB.WL.GKOperatingRouteMonitor.Service.GetOperationRouteVesselService',
		//船舶监控
		VesselMonitorService: 'SHB.WL.GKVesselMonitor.Service.VesselMonitorService',
		// 码头总览
		GetPierOverallService: 'SHB.WL.GKPierOverallSituation.Service.GetPierOverallService',
		//根据船舶获取统计
		GetOperationRouteVesselTotalService: 'SHB.WL.GKOperatingRouteMonitor.Service.GetOperationRouteVesselTotalService',

		GetPastTallyService: 'SHB.WL.GKPierOverallSituation.Service.GetPastTallyService',
		//码头二级页面总览服务
		PierMonitorService: 'SHB.WL.GKPierMonitor.Service.PierMonitorService',
		
		//新码头总览相关统计
		GetIndentifyRateService: 'SHB.WL.GKPierOverallSituation.Service.GetIndentifyRateService',
		GetTallyTeuService: 'SHB.WL.GKPierOverallSituation.Service.GetTallyTeuService',
		GetAllMonitorService: 'SHB.WL.GKPierOverallSituation.Service.GetAllMonitorService',
		GetDPMonitorService: 'SHB.WL.GKPierOverallSituation.Service.GetDPMonitorService',
		
		//操作室检查录入
		FetchCCKInputService: 'SHB.WL.GKControlCheckInput.Service.FetchCCKInputService',
		InsertCCKInputService: 'SHB.WL.GKControlCheckInput.Service.InsertCCKInputService',
		UpdateCCKInputService: 'SHB.WL.GKControlCheckInput.Service.UpdateCCKInputService',
		DeleteCCKInputService: 'SHB.WL.GKControlCheckInput.Service.DeleteCCKInputService',

		//报警监控
		WarnMonitorService: 'SHB.WL.GKWarn.Service.WarnMonitorService',
		WarnMonitorDetailService: 'SHB.WL.GKWarn.Service.WarnMonitorDetailService',

		// 操控室录入
		FetchTeamGroupService: 'SHB.WL.GKControlCheckInput.Service.FetchTeamGroupService',

		TopNoticeShowService: 'SHB.WL.GKNotice.Service.TopNoticeShowService',

		//设备监控
		DeviceMonitorService: 'SHB.WL.GKDeviceMonitor.Service.DeviceMonitorService',

		//人员监控
		UserMonitorService: 'SHB.WL.GKUserMonitor.Service.UserMonitorService',

		//数据监控
		GetDataMonitorService: 'SHB.WL.GKPierOverallSituation.Service.GetDataMonitorService',

	},
	Report:{
		//报表服务
	},
	
	adminMenuList: [{
			dir: 'notice',
			name: '公告',
			icon: 'iconfont icon-notice',
			list: [{
					name: '公告内容',
					href: 'noticeInfo'
				},
				{
					name: '公告设置',
					href: 'noticeSetting'
				},
			]
		},
		{
			dir: 'monitoring',
			name: '监控',
			icon: 'iconfont icon-monitor',
			list: [{
					name: '码头总览',
					href: 'portsMonitorning'
				},
				{
					name: '船舶总览',
					href: 'vesselAllMonitorning'
				},
				{
					name: '船舶监控',
					href: 'vesselMonitorning'
				},
				{
					name: '作业监控',
					href: 'roadMonitorning'
				},
				{
					name: '设备监控',
					href: 'equipmentMonitorning'
				},
				{
					name: '人员监控',
					href: 'starffMonitorning'
				},{
					name : '现场监控',
					href : 'siteMonitoring'
				}
				
			]
		},
		{
			dir: 'data',
			name: '数据',
			icon: 'iconfont icon-data',
			list: [{
					name: '数据监控',
					href: 'dataMonitoring'
				},
				{
					name: '昼夜作业日志',
					href: 'reportDayNightJobLog'
				},
				{
					name : '作业识别统计',
					href : 'reportJobRecognition'
				},
				{
					name : '箱量统计',
					href : 'reportContainerAmount'
				},
				{
					name : '顶班人员汇总',
					href : 'reportTopPersonTotal'
				},
				{
					name : '人员借调统计',
					href : 'reportPersonLoan'
				},
				{
					name : '结束船舶汇总',
					href : 'reportFinishVesselTotal'
				},
				{
					name : '工分工时统计',
					href : 'reportJobHoursFen'
				},
			]
		},
		{
			dir: 'warning',
			//			href: 'Warninglist',
			name: '报警',
			icon: 'iconfont icon-alarmHd',
			list: [{
					name: '报警信息',
					href: 'warninglist'
				},
				{
					name: '报警总览',
					href: 'warningMonitorning'
				},
			]
		}, {
			dir: 'user',
			name: '人员',
			icon: 'iconfont icon-user',
			list: [{
					name: '人员借入借出',
					href: 'starffland'
				},
				{
					name: '人员出勤',
					href: 'turnwork'
				},
				{
					name: '派工配置',
					href: 'starffDispatch'
				}, {
					name: '操控室检查录入',
					href: 'operatingInput'
				},
				{
					name: '应急预案处置',
					href: 'emergencyPlan'
				}
				
			]
		}, {
			dir: 'device',
			name: '设备',
			icon: 'iconfont icon-device',
			list: [{
					name: '保养协议',
					href: 'upkeep'
				},
				{
					name: '设备保养',
					href: 'equipmentKeep'
				},
				{
					name: '故障维修',
					href: 'addequipment'
				},

			]
		},
		{
			dir: 'setting',
			name: '设置',
			icon: 'iconfont icon-setup',
			list: [{
					name: '密码修改',
					href: 'changePassword'
				}, {
					name: '约束设置',
					href: 'restrainSetting'
				},
				{
					name: '天气设置',
					href: 'weatherSetting'
				},
				{
					name: '报警原因',
					href: 'warnReason'
				},

			]
		},
	],
	menuList:[{
		dir: 'base',
		name: '基础',
		icon: 'el-icon-edit',
		list: [{
				name: '表单',
				href: 'form'
			},
			{
				name: '弹出框',
				href: 'dialog'
			},
			{
				name: '表格',
				href: 'table'
			},
		]
	}],
	managerMenu: function(ret) {
		var powerList = jsRes.adminMenuList;
		var pageButtons = [{
				pageName: '公告',
				pageHref: 'notice',
				buttons: []
			}, {
				pageName: '修改密码',
				pageHref: 'changePassword',
				buttons: []
			},
			{
				pageName: '报警信息',
				pageHref: 'warninglist',
				buttons: [{
						btnName: '申报',
						btnCode: 'declare',
					}, {
						btnName: '审批',
						btnCode: 'check',
					},
					{
						btnName: '处理',
						btnCode: 'do',
					}
				]
			},
			{
				pageName: '报警总览',
				pageHref: 'warningMonitorning',
				buttons: []
			},
			{
				pageName: '码头总览',
				pageHref: 'portsMonitorning',
				buttons: []
			},
			{
				pageName: '船舶总览',
				pageHref: 'vesselAllMonitorning',
				buttons: []
			},
			{
				pageName: '船舶监控',
				pageHref: 'vesselMonitorning',
				buttons: []
			},
			{
				pageName: '作业路监控',
				pageHref: 'roadMonitorning',
				buttons: []
			},
			{
				pageName: '设备监控',
				pageHref: 'equipmentMonitorning',
				buttons: [{
					btnName: '链接',
					btnCode: 'link'
				}]
			},
			{
				pageName: '人员监控',
				pageHref: 'starffMonitorning',
				buttons: []
			},
			{
				pageName: '数据分析',
				pageHref: 'analyzeData',
				buttons: [{
					btnName: '预览',
					btnCode: 'preview'
				}, {
					btnName: '打印',
					btnCode: 'print'
				}]
			},
			{
				pageName: '数据统计',
				pageHref: 'statisData',
				buttons: []
			},
			{
				pageName: '约束设置',
				pageHref: 'restrainSetting',
				buttons: [{
					btnName: '保存',
					btnCode: 'save'
				}]
			},
			{
				pageName: '天气设置',
				pageHref: 'weatherSetting',
				buttons: [{
					btnName: '新增',
					btnCode: 'add'
				}, {
					btnName: '编辑',
					btnCode: 'edit'
				}, {
					btnName: '删除',
					btnCode: 'delete'
				}]
			},
			{
				pageName: '设备维修',
				pageHref: 'addequipment',
				buttons: [{
					btnName: '新增',
					btnCode: 'add'
				}, {
					btnName: '审核',
					btnCode: 'check'
				}, {
					btnName: '编辑',
					btnCode: 'edit'
				}, {
					btnName: '删除',
					btnCode: 'delete'
				}]
			},
			{
				pageName: '保养协议',
				pageHref: 'upkeep',
				buttons: [{
					btnName: '新增',
					btnCode: 'add'
				}, {
					btnName: '编辑',
					btnCode: 'edit'
				}, {
					btnName: '删除',
					btnCode: 'delete'
				}]
			},
			{
				pageName: '设备保养',
				pageHref: 'equipmentKeep',
				buttons: [{
					btnName: '新增',
					btnCode: 'add'
				}, {
					btnName: '审核',
					btnCode: 'check'
				}, {
					btnName: '编辑',
					btnCode: 'edit'
				}, {
					btnName: '删除',
					btnCode: 'delete'
				}]
			},
			{
				pageName: '人员借入借出',
				pageHref: 'starffland',
				buttons: [{
					btnName: '新增',
					btnCode: 'add'
				}, {
					btnName: '编辑',
					btnCode: 'edit'
				}, {
					btnName: '删除',
					btnCode: 'delete'
				}, {
					btnName: '审核',
					btnCode: 'check'
				}, {
					btnName: '派人',
					btnCode: 'sendPeople'
				}]
			},
			{
				pageName: '人员出勤',
				pageHref: 'turnwork',
				buttons: [{
					btnName: '新增',
					btnCode: 'add'
				}, {
					btnName: '编辑',
					btnCode: 'edit'
				}, {
					btnName: '删除',
					btnCode: 'delete'
				}]
			},
			{
				pageName: '公告设置',
				pageHref: 'noticeSetting',
				buttons: [{
					btnName: '新增',
					btnCode: 'add'
				}, {
					btnName: '置顶',
					btnCode: 'settop'
				}, {
					btnName: '撤回',
					btnCode: 'cancel'
				}, {
					btnName: '编辑',
					btnCode: 'edit'
				}, {
					btnName: '删除',
					btnCode: 'delete'
				}]
			},
			{
				pageName: '报警原因',
				pageHref: 'warnReason',
				buttons: [{
					btnName: '新增',
					btnCode: 'add'
				}, {
					btnName: '编辑',
					btnCode: 'edit'
				}, {
					btnName: '禁用',
					btnCode: 'disabled'
				}]
			},
			{
				pageName: '派工配置',
				pageHref: 'starffDispatch',
				buttons: [{
					btnName: '选择员工',
					btnCode: 'setuseron'
				}, {
					btnName: '删除派工人员',
					btnCode: 'deleteuser'
				}, {
					btnName: '设置员工待时',
					btnCode: 'setUseroff'
				}, {
					btnName: '取消员工待时',
					btnCode: 'cancelUseroff'
				}]
			},
			{
				pageName: '操控室检查录入',
				pageHref: 'operatingInput',
				buttons: [{
					btnName: '新增',
					btnCode: 'add'
				}, {
					btnName: '修改',
					btnCode: 'edit'
				}, {
					btnName: '删除',
					btnCode: 'delete',
				}]
			},
			{
				pageName: '应急预案配置',
				pageHref: 'emergencyPlan',
				buttons: [{
					btnName: '新增',
					btnCode: 'add'
				}, {
					btnName: '修改',
					btnCode: 'edit'
				}, {
					btnName: '删除',
					btnCode: 'delete'
				}, {
					btnName: '审核',
					btnCode: 'check'
				}]
			}
		];

		for(var i = 0; i < powerList.length; i++) {
			var menu = powerList[i];
			if(menu.list != null) {
				menu.isShow = true;
				for(var m = 0; m < menu.list.length; m++) {
					var powerPage = menu.list[m];
					for(var j = 0; j < pageButtons.length; j++) {
						var page = pageButtons[j];
						if(page.pageHref == powerPage.href) {
							powerPage.buttons = page.buttons;
						}
					}
					ret.ResourceList.map(function(item) {
						if(item.Name.trim() == powerPage.href.trim()) {
							var parentId = item.AM_ID;
							powerPage.isShow = true;
							if(powerPage.buttons != null) {
								for(var k = 0; k < powerPage.buttons.length; k++) {
									var btn = powerPage.buttons[k];
									ret.ResourceList.map(function(btnItem) {
										//按钮名称相同 并且按钮在改页面下
										if(btnItem.Name.trim() == btn.btnCode && btnItem.AM_AM_ID == parentId) {
											btn.isShow = true;
										}
									});
								}
							}
						}
					});
				}
			} else {
				ret.ResourceList.map(function(noticeItem) {
					if(noticeItem.Name == menu.href) {
						menu.isShow = true;
					}
				});
			}
		}

		//删除
		for(var m = powerList.length - 1; m >= 0; m--) {
			if(powerList[m].list != null) {
				for(var n = powerList[m].list.length - 1; n >= 0; n--) {
					if(!powerList[m].list[n].isShow) {
						powerList[m].list.splice(n, 1);
						//如果没有子级页面，则删除该菜单
						if(powerList[m].list.length == 0) {
							powerList.splice(m, 1);
						}
						continue;
					} else {
						if(powerList[m].list[n].buttons != null) {
							for(var k = powerList[m].list[n].buttons.length - 1; k >= 0; k--) {
								if(!powerList[m].list[n].buttons[k].isShow) {
									powerList[m].list[n].buttons.splice(k, 1);
									continue;
								}
							}
						}
					}
				}
			} else {
				if(!powerList[m].isShow) {
					powerList.splice(m, 1);
					continue;
				}
			}
		}
		return powerList;
	},
	loginUser: function() {
		var user = jsTools.SessionStorage.getVal('loginUser');
		return user
	},

	//获取当前页面拥有权限的按钮
	getPowerButtons: function(code) {
		var isBtnShow = false;
		var page = jsTools.SessionStorage.getVal('defaultPage');
		if(page != null) {
			if(page.buttons != null && page.buttons.length > 0)
				page.buttons.map(function(item) {
					if(item.btnCode == code)
						isBtnShow = item.isShow;
				});
		}
		return isBtnShow;
	},
}


export default jsRes;