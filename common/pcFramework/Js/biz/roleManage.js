(function() {
	var vm = new Vue({
		el: '#div-rolemanage',
		data: {
			searchNo: '', //ESU
			tableData: [],
			roleInfo: {},
			loading: false,
			parameters: {
				No: "", //ESU
				queryNumber: 1,
				queryPage: 1,
			},
			total: 0,
			pageSize: 1,
			currentPage: 1,
			pageNumbers: 100,

			isDialogShow: false,
			dialogCzType: null,
			dialogTitle: '',
		},
		methods: {
			query: function() {
				debugger;
				loadRoleInfo(1);
				//				var dat = {
				//					serviceName: jsTools.Server.GetSmallTicketService,
				//					data: {
				//						Parameter: vm.parameters
				//					}
				//				};
				//				jsTools.ajax(dat, function(response) {
				//					if(response.IsSuccess == 1) {
				//						
				//						vm.loading = false; //关闭加载状态
				//					} else {
				//						jsTools.alert(vm, response.Message);
				//						vm.loading = false; //关闭加载状态
				//					}
				//
				//				});
			},
			AddUser: function() {
				vm.isDialogShow = true;
				vm.dialogCzType = "Add";
				vm.dialogTitle = "新增用户"
				var newRole = {
					roleName: '',
					code: '',
					remakr: ''
				};
				vm.roleInfo = newRole;
			},
			EditRole: function(role) {
				vm.isDialogShow = true;
				vm.roleInfo = role;
			},
			Save: function() {
				if(vm.roleInfo.code == "") {
					jsTools.msgTip(vm, "用户角色代码，不能为空！")
					return;
				}
				jsTools.alert(vm, "【" + vm.roleInfo.roleName + "】保存提示！");
			},
			Cancel: function() {
				vm.isDialogShow = false;
			},
			DeleteRole: function() {
				jsTools.mBox("确定删除该用户吗？", 2, 2, function() {
					jsTools.msgTip(vm, "删除成功！")
				}, function() {
					jsTools.msgTip(vm, "取消删除！")
				});
			},

			handleSizeChange: function(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange: function(val) {
				console.log(`当前页: ${val}`);
			},
			pageChange: function(page) {
				vm.query(page);
			},
		}
	});
	var roleInfo = [{
		roleName: '系统开发员',
		code: 'DEVELOP',
		remakr: '测试数据'
	}, {
		roleName: '系统维护员',
		code: 'Maintain',
		remakr: '测试数据'
	}, {
		roleName: '系统操作员',
		code: 'Operation',
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
		roleName: '系统管理员',
		code: 'Admin',
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

		vm.tableData = roleInfo;
		vm.total = roleInfo.length;
		vm.loading = false; //关闭加载状态
	}
	loadRoleInfo(1);
})();