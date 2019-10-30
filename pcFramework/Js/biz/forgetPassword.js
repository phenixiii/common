var vm = new Vue({
	el: '#div-register',
	data: {
		info: {
			oldPwd: '',
			newPwd: '',
			newConfirmPwd: '',
		}
	},
	methods: {
		Save: function() {
			if(vm.info.oldPwd == '') {
				jsTools.msgTip(vm, '请输入原密码！');
				return;
			}
			if(vm.info.newPwd == '') {
				jsTools.msgTip(vm, '请输入新密码！');
				return;
			}
			if(vm.info.newConfirmPwd=='') {
				jsTools.msgTip(vm, '请输入确认新密码！');
				return;
			}
			if(vm.info.newPwd!=vm.info.newConfirmPwd){
				jsTools.msgTip(vm, '两次输入的新密码不一致！');
				return;
			}
			//登录
			phAjax.changePassword(vm.info.oldPwd, vm.info.newPwd,vm.info.newConfirmPwd, function onCompleteLogOn(XMLHttpRequest, textStatus) {
				if(XMLHttpRequest.status === 200) {
					jsTools.mBox("密码修改成功，前往登录！ ", 1, 3);
					location.href = "login.html";
				} else if(XMLHttpRequest.status === 401) {
					jsTools.mBox("修改密码失败： " + XMLHttpRequest.responseJSON.Message, 1, 3);
				} else
					jsTools.mBox("修改密码失败! status: " + XMLHttpRequest.statusText + ", response: " + XMLHttpRequest.responseText, 1, 3);
			});
		},
	}
});