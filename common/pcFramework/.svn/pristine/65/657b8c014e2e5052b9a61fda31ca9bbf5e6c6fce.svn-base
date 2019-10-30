var vm = new Vue({
	el: '#div-register',
	data: {
		userInfo: {
			userName: '',
			userPwd: '',
		},
	},
	methods: {
		submitForm: function() {
			$("#summary").html('');
			var loginName = vm.userInfo.userName.trim();
			var loginPwd = vm.userInfo.userPwd;
			if(loginPwd == null || loginPwd == "" || loginName == null || loginName == "") {
				$("#summary").html('<span class="el-icon-error el-tag--danger"> 用户名或密码为空！</span>');
				$("#errorMsg").show();
				return;
			} else {
				$("#errorMsg").hide();
			}
			//登录
			phAjax.logOn(loginName, loginPwd, function onCompleteLogOn(XMLHttpRequest, textStatus) {
				if(XMLHttpRequest.status === 200) {
					jsTools.sessionStorage.SetItem("string", 'userName', vm.userInfo.userName);
					location.href = "../index.html";
					jsTools.sessionStorage.RemoveItem('payInfo');
				} else if(XMLHttpRequest.status === 401) {
					jsTools.alert({
						title: "注册提示",
						message: "登录失败： " + XMLHttpRequest.responseJSON.Message,
					});
				} else
					jsTools.alert({
						title: "注册提示",
						message: "登录失败! status: " + XMLHttpRequest.statusText + ", response: " + XMLHttpRequest.responseText,
					});
			});
		}
	}
});