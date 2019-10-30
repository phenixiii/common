(function() {

	var vm = new Vue({
		el: '#div-page1',
		data: {
			tableData: null,
			loading: false,
			screenHeight:(window.screen.availHeight-250),
		},
		methods: {
			query: function() {
				debugger;
				loadUserInfo();
			},
			carSearch:function(value, row, column){
				const property = column['property'];
        		return row[property] === value;
			},
			shipperSearch:function(value, row, column){
				const property = column['property'];
        		return row[property] === value;
			},
			meltingNoSearch:function(value, row, column){
				const property = column['property'];
        		return row[property] === value;
			},
		}
	});

	var loadUserInfo = function() {
		vm.loading = true; //启用加载状态
		
		console.time();

		//var tempData = jsRes.goodsInfoList;
		var tempData = jsRes.GetTempData();

		vm.tableData = tempData;

		console.timeEnd();
		vm.loading = false; //关闭加载状态
	}

	loadUserInfo();

})();