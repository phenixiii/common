(function() {
	var vm = new Vue({
		el: '#div-userManager',
		data: {
			searchNo: '', //ESU
			tableData: [],
			userInfo: {},
			//角色
			roleList: [{
				Key: 'Admin',
				Caption: '管理员'
			}, {
				Key: 'DEVELOP',
				Caption: '系统开发员'
			}, {
				Key: 'Extension',
				Caption: '系统推广员'
			}],
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
				loadUserInfo(1);
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
				var newUser = {
					userNumber: '',
					userName: '',
					userRole: '',
					userTel: '',
					userEmail: '',
					remark: ''
				};
				vm.userInfo = newUser;
			},
			EditUser: function(user) {
				vm.dialogCzType = "Edit";
				vm.dialogTitle = "编辑用户信息"
				vm.isDialogShow = true;
				vm.userInfo = user;
			},
			Save: function() {
				if(vm.userInfo.userRole == "") {
					jsTools.msgTip(vm, "用户角色不能为空！")
					return;
				}
				if(vm.userInfo.userTel == "") {
					jsTools.msgTip(vm, "用户电话不能为空！")
					return;
				}
				if(vm.userInfo.userEmail == "") {
					jsTools.msgTip(vm, "用户邮箱不能为空！")
					return;
				}
				jsTools.alert(vm, "【" + vm.userInfo.userRole + "】保存提示！");
			},
			Cancel: function() {
				vm.isDialogShow = false;
			},
			DeleteUser: function() {
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
	var userInfo = [{
		userNumber: '10010001',
		userName: '张三',
		userRole: '系统开发员',
		userTel: '13112345678',
		userEmail: '123@cc.com',
		remark: [{
			userNumber: '10010001',
			userName: '张三',
		},{
			userNumber: '10010001',
			userName: '张三',
		}]
	}, {
		userNumber: '10010002',
		userName: '李四',
		userRole: '系统开发员',
		userTel: '13112345678',
		userEmail: '123@cc.com',
		remark: '测试数据'
	}, {
		userNumber: '10010003',
		userName: 'AAA',
		userRole: '系统开发员',
		userTel: '13112345678',
		userEmail: '123@cc.com',
		remark: '测试数据'
	}, {
		userNumber: '10010004',
		userName: 'BBB',
		userRole: '系统开发员',
		userTel: '13112345678',
		userEmail: '123@cc.com',
		remark: '测试数据'
	}, {
		userNumber: '10010005',
		userName: 'CCC',
		userRole: '系统开发员',
		userTel: '13112345678',
		userEmail: '123@cc.com',
		remark: '测试数据'
	}, {
		userNumber: '10010006',
		userName: 'DDD',
		userRole: '系统开发员',
		userTel: '13112345678',
		userEmail: '123@cc.com',
		remark: '测试数据'
	}, {
		userNumber: '10010007',
		userName: 'EEE',
		userRole: '系统开发员',
		userTel: '13112345678',
		userEmail: '123@cc.com',
		remark: '测试数据'
	}, {
		userNumber: '10010008',
		userName: 'FFF',
		userRole: '系统开发员',
		userTel: '13112345678',
		userEmail: '123@cc.com',
		remark: '测试数据'
	}];

	var loadUserInfo = function(pageNo) {
		vm.loading = true; //启用加载状态
//		for(var i = 0; i < 100; i++) {
//			userInfo.push(userInfo[0]);
//		}
		vm.tableData = userInfo;
		vm.total = userInfo.length;
		vm.loading = false; //关闭加载状态
	}
	loadUserInfo(1);

})();