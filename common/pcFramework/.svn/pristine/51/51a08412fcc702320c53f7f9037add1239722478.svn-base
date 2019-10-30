(function() {
	var vm = new Vue({
		el: '#div-relationManage',
		data: {
			searchNo: '', //ESU
			tbRoleData: [],
			tbModularData: [],
			ModularData: [],
			loading: false,
			parameters: {
				No: "", //ESU
				queryNumber: 1,
				queryPage: 1,
			},
			checkedRole: [],
			isIndeterminate: true,
			checkAll: false,
			checkedAllItems: [],
		},
		methods: {
			query: function() {
				debugger;
				loadRoleInfo(1);
			},
			//选择的角色
			handleSelectionChange: function(val) {
				vm.checkedRole = val;
			},
			CheckAllChange: function(selected) {
				for(var i = 0; i < vm.ModularData.length; i++) {
					if(selected.index == i) {
						var item = vm.ModularData[i];
						if(!item.checked) {
							for(var j = 0; j < item.details.length; j++) {
								var detailItem = item.details[j];
								if(vm.checkedAllItems.indexOf(detailItem.name) == -1) {
									vm.checkedAllItems.push(detailItem.name);
								}
								detailItem.checked = true;
							}
						} else {
							debugger;
							for(var j = 0; j < item.details.length; j++) {
								var detailItem = item.details[j];
								for(var i = 0; i < vm.checkedAllItems.length; i++) {
									var checkedItem = vm.checkedAllItems[i];
									if(checkedItem == detailItem.name) {
										var index = vm.checkedAllItems.indexOf(checkedItem);
										vm.checkedAllItems.splice(index, 1);
									}
								}
							}
						}
						selected.checked = !selected.checked;
						break;
					}
				}
				this.isIndeterminate = false;
			},
			CheckedItemChange: function(value) {
				for(var i = 0; i < vm.ModularData.length; i++) {
					var item = vm.ModularData[i];
					for(var j = 0; j < item.details.length; j++) {
						var detailItem = item.details[j];
						if(value.indexOf(detailItem.name) != -1) {
							detailItem.checked = true;
							break;
						}
					}
				}
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.checkedAllItems.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedAllItems.length;
			},
			save: function() {
				jsTools.mBox("选择了 " + vm.checkedRole.length + "个角色，添加了" + vm.checkedAllItems.length + "个页面权限", 1, 3);
				return;
			},
			cancel: function() {
				//			vm.checkedRole=[];
				//			vm.checkedAllItems=[];
			},
		}
	});
	
	var modularInfos = [{
		modularName: '基础数据',
		index: 0,
		checked: false,
		modularDetail: ['堆场管理', '客户资料', '计划类型设置类', '经营人设置经营人设置', '道口设置', '来源去向地来源去向地', '箱经营人设置箱经营人设置', '报文设置'],
		details: [{
			name: '堆场管理',
			index: 0,
			checked: false,
		}, {
			name: '客户资料',
			index: 1,
			checked: false,
		}, {
			name: '计划类型设置类',
			index: 2,
			checked: false,
		}, {
			name: '经营人设置经营人设置',
			index: 3,
			checked: false,
		}, {
			name: '道口设置',
			index: 4,
			checked: false,
		}, {
			name: '来源去向地来源去向地',
			index: 5,
			checked: false,
		}, {
			name: '箱经营人箱经营人设置',
			index: 6,
			checked: false,
		}, {
			name: '箱经营人设置箱经营人设置',
			index: 7,
			checked: false,
		}]
	}, {
		modularName: '箱务管理',
		index: 1,
		modularDetail: ['进场计划', '出场计划', '出场安排', '坏箱修复'],
		details: [{
			name: '进场计划',
			index: 1,
			checked: false,
		}, {
			name: '出场计划',
			index: 2,
			checked: false,
		}, {
			name: '出场安排',
			index: 3,
			checked: false,
		}, {
			name: '坏箱修复',
			index: 4,
			checked: false,
		}]
	}, {
		modularName: '费用管理',
		index: 2,
		modularDetail: ['进场计划A', '出场计划A', '出场安排A', '坏箱修复A'],
		details: [{
			name: '进场计划A',
			index: 1,
			checked: false,
		}, {
			name: '出场计划A',
			index: 2,
			checked: false,
		}, {
			name: '出场安排A',
			index: 3,
			checked: false,
		}, {
			name: '坏箱修复A',
			index: 4,
			checked: false,
		}]
	}, {
		modularName: '车辆管理',
		index: 3,
		modularDetail: ['进场计划AA', '出场计划AA', '出场安排AA', '坏箱修复AA'],
		details: [{
			name: '进场计划AA',
			index: 1,
			checked: false,
		}, {
			name: '出场计划AA',
			index: 2,
			checked: false,
		}, {
			name: '出场安排AA',
			index: 3,
			checked: false,
		}, {
			name: '坏箱修复AA',
			index: 4,
			checked: false,
		}]
	}, {
		modularName: '出库计划管理管理',
		index: 4,
		modularDetail: ['进场计划AAA', '出场计划AAA', '出场安排AAA', '坏箱修复AAA'],
		details: [{
			name: '进场计划AAA',
			index: 1,
			checked: false,
		}, {
			name: '出场计划AAA',
			index: 2,
			checked: false,
		}, {
			name: '出场安排AAA',
			index: 3,
			checked: false,
		}, {
			name: '坏箱修复AAA',
			index: 4,
			checked: false,
		}]
	}];

	var roleInfo = [{
		roleName: '系统开发员',
		code: 'DEVELOP',
		remakr: '测试数据'
	}, {
		roleName: '系统维护员',
		code: 'Maintain',
		remakr: '测试数据'
	}, {
		roleName: '系统维护员',
		code: 'Maintain',
		remakr: '测试数据'
	}, {
		roleName: '系统开发员',
		code: 'DEVELOP',
		remakr: '测试数据'
	}, {
		roleName: '系统推广员',
		code: 'Extension',
		remakr: '测试数据'
	}, {
		roleName: '系统开发员',
		code: 'DEVELOP',
		remakr: '测试数据'
	}, {
		roleName: '系统推广员',
		code: 'Extension',
		remakr: '测试数据'
	}, {
		roleName: '系统开发员',
		code: 'DEVELOP',
		remakr: '测试数据'
	}];

	var loadRoleInfo = function(pageNo) {
		vm.loading = true; //启用加载状态
		vm.tbRoleData = roleInfo;
		vm.loading = false; //关闭加载状态
	};
	var loadModularInfo = function() {
		vm.loading = true; //启用加载状态
		vm.ModularData = modularInfos;
		vm.loading = false; //关闭加载状态
	};
	loadRoleInfo(1);
	loadModularInfo();
})();