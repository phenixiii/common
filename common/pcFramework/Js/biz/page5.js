(function() {

	var vm = new Vue({
		el: '#div-page5',
		data: {
			tableData: [],			
			searchCarNo:[{
				text:'CS10010001',
				value:'CS10010001',
			},{
				text:'CS10010002',
				value:'CS10010002',
			},{
				text:'CS10010003',
				value:'CS10010003',
			},{
				text:'CS10010004',
				value:'CS10010004',
			},{
				text:'CS10010005',
				value:'CS10010005',
			},{
				text:'CS10010006',
				value:'CS10010006',
			}],
			searchShipper:[{
				text:'Shipper_01',
				value:'Shipper_01',
			},{
				text:'Shipper_050',
				value:'Shipper_050',
			},{
				text:'Shipper_099',
				value:'Shipper_099',
			}],
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
		var tempData = jsRes.GetGoodsData();

		vm.tableData = tempData;

		console.timeEnd();
		vm.loading = false; //关闭加载状态
		debugger
	}

	loadUserInfo();

})();