var vm = new Vue({
	el: '#div-register',
	data: {
		info: {
			GroupNo: "",
			CustomerName: "",
			Password: "",
			ConfirmPwd: "",
			PhoneNo: "",
			ContactPerson: "",
			Fax: "",
			Address: "",
			Email: ""
		},
		isDialogShow: false,
		checked: false,
	},
	methods: {
		//同意协议
		Agree: function() {
			vm.checked = true;
			vm.isDialogShow = false;
		},
		//拒绝协议
		Refuse: function() {
			vm.checked = false;
			vm.isDialogShow = false;
		},
		submitForm: function() {
			if(vm.info.CustomerName == "") {
				jsTools.Alertify.msgTip("error", "账户名称不能为空！");
				return;
			}
			if(vm.info.Password == "" || vm.info.ConfirmPwd == "" || vm.info.Password != vm.info.ConfirmPwd) {
				jsTools.Alertify.msgTip("error", "密码为空或两次输入的密码不一致！");
				return;
			}
			if(vm.info.GroupNo == "") {
				jsTools.Alertify.msgTip("error", "集团代码不能为空！");
				return;
			}
			if(vm.info.PhoneNo == "") {
				jsTools.Alertify.msgTip("error", "电话号码不能为空！");
				return;
			}
			if(vm.info.ContactPerson == "") {
				jsTools.Alertify.msgTip("error", "联系人不能为空！");
				return;
			}
			if(vm.info.Fax == "") {
				jsTools.Alertify.msgTip("error", "公司传真不能为空！");
				return;
			}
			if(vm.info.Email == "") {
				jsTools.Alertify.msgTip("error", "公司邮箱不能为空！");
				return;
			}
			if(vm.info.Address == "") {
				jsTools.Alertify.msgTip("error", "公司地址不能为空！");
				return;
			}
			if(vm.checked != true) {
				jsTools.Alertify.msgTip("error", "请查看注册协议并确认通过！");
				return;
			}
			phAjax.execute({
				serviceName: jsRes.Server.WebRegisterService,
				data: {
					Parameter: vm.info
				},
				onSuccess: function(response) {
					if(response.ResultModel.IsSuccess == 0) {
						jsTools.Alertify.alert({
							title:"注册提示",
							message:'注册公司信息失败：' + response.ResultModel.Message,							
						});
					} else {
						jsTools.alert({
							title:"注册提示",
							message:'注册成功！',
							callback:function(){
								location.href = "login.html?ver=" + new Date().getTime();
							}
						});
					}
				},
				onError: function(XMLHttpRequest, textStatus, errorThrown) {
					jsTools.Element.alert(vm, "调用Service失败! status: " + XMLHttpRequest.statusText + ", response: " + XMLHttpRequest.responseText);
				}
			});
		},
	}
});