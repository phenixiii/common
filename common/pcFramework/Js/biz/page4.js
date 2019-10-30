(function() {

	var vm = new Vue({
		el: '#div-page4',
		data: {
			tableData: [],
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
			carCellClick:function(row, column, cell, event){
				debugger
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
		debugger
	}

	loadUserInfo();

})();