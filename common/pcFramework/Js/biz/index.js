var vm = new Vue({
	el: '#div-index',
	data: {
		activeIndex: 'home',
		seenapp: 0,
		bannerimg: [{
				src: 'Images/banner/banner_summary.jpg',
				txt: 'Images/banner/img_ban_txtOne.png'
			},
			{
				src: 'Images/banner/banner_download.jpg',
				txt: 'Images/banner/img_ban_txtThird.png',
				phoneImg: 'Images/banner/img_ban_phone.png',
			}
		],
		newsLists: [],
		downloadLists: [],
		loginUserName: jsTools.userNumber(),

	},
	mounted: function() {
		//首页动画
		wow = new WOW({
			animateClass: 'animated',
		});
		wow.init();
	},
	methods: {
		handleSelect: function(key, keyPath) {
			console.log(key, keyPath);
			if(key == "home") return;
			location.href = key;
		},
		androidCode: function() {
			this.seenapp = 0;
		},
		iosCode: function() {
			this.seenapp = 1;
		},
		logoutUser: function() {
			jsTools.Alertify.confirm({
				title: '退出确认',
				message: '您是否真的要退出系统？',
				callback: function() {
					phAjax.logOff(vm.loginUserName,function() {
						debugger;
						jsTools.Win.open('login', 'Views/login.html');
					});
				}
			});
		},
		openDetail: function(newsInfo) {
			jsTools.sessionStorage.SetItem("JSON", 'newInfo', newsInfo);
			window.location = 'Views/main.html#/newsBulletin/newsDetail';
		},
	}
});
