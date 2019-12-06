const jsRes = {

	Server: {
		

	},
	
	menuList:[{
		dir: 'base',
		name: '基础',
		icon: 'el-icon-bangzhu',
		childIcon: 'el-icon-star-on',
		list: [{
				name: '布局',
				href: 'layout',
			},{
				name: '按钮',
				href: 'button',
			},{
				name: '表单',
				href: 'form',
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
	},{
		dir: 'model',
		name: '模块',
		icon: 'el-icon-sugar',
		childIcon: 'el-icon-star-on',
		list: [{
				name: '单表1',
				href: 'single1',
			},{
				name: '单表2',
				href: 'single2',
			},{
				name: '外部页面',
				href: 'wllh.html',
			}
		]
	},{
		dir: 'com',
		name: '组件',
		icon: 'el-icon-sugar',
		childIcon: 'el-icon-star-on',
		list: [{
				name: '倍位',
				href: 'beis',
			},{
				name: '船舶',
				href: 'vessels',
			},{
				name: '图片',
				href: 'photos',
			},{
				name: '指令',
				href: 'orders',
			},{
				name: '任务',
				href: 'tasks',
			},{
				name: '桥吊',
				href: 'qcs',
			}
		]
	},{
		dir: 'case',
		name: '案例',
		icon: 'el-icon-sugar',
		childIcon: 'el-icon-star-on',
		list: [{
				name: '公告发布',
				href: 'upload',
			},{
				name: '面板',
				href: 'panels',
			},{
				name: '全部',
				href: 'all',
			}
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