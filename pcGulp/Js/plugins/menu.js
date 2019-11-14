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
