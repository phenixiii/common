(function() {

	var vm = new Vue({
		el: '#div-page3',
		data: {
			searchNo: '', //ESU
			tableData: [],
			carInfo: [],
			cargonLocationInfo: [],
			goodsInfo: [],

			loading: false,
			searchCarNo:[{
				text:'CS10010001',
				value:'CS10010001',
			},{
				text:'CS10010002',
				value:'CS10010002',
			},{
				text:'CS10010003',
				value:'CS10010003',
			}],
		},
		methods: {
			query: function() {
				loadUserInfo(1);
			},
			//选择的车信息
			selectCar: function(val) {
				if(val.length > 1) {
					jsTools.Alertify.msgTip("warning", "只能选择单条数据进行操作！");
					return;
				}
				this.carInfo = getChooseData(val[0], 1);
			},
			//选择的货位信息
			selectLaction: function(val) {
				if(val.length > 1) {
					jsTools.Alertify.msgTip("warning", "只能选择单条数据进行操作！");
					return;
				}
				this.cargonLocationInfo = getChooseData(val[0], 2);
			},
			//选择的货物信息
			selectGoods: function(val) {
				if(val.length > 1) {
					jsTools.Alertify.msgTip("warning", "只能选择单条数据进行操作！");
					return;
				}
				this.goodsInfo = getChooseData(val[0], 3);
			},
			changePanelWidth: function() {
				if(this.carInfo.length > 0 && this.cargonLocationInfo == 0) {
					return 'el-col-12'
				} else if(this.cargonLocationInfo.length > 0) {
					return 'el-col-8'
				} else {
					return 'el-col-24'
				}
			},
			carSearch:function(value, row, column){
				debugger
				const property = column['property'];
        		return row[property] === value;
			},
		}
	});

	function getChooseData(value, level) {
		var resultData;
		if(level == 1) {
			for(var i = 0; i < vm.tableData.length; i++) {
				var item = vm.tableData[i];
				if(item == value) {
					resultData = item.carList;
				}
			}
		}
		if(level == 2) {
			for(var i = 0; i < vm.carInfo.length; i++) {
				var item = vm.carInfo[i];
				if(item == value) {
					resultData = item.cargonLocationList;
				}
			}
		}
		if(level == 3) {
			for(var i = 0; i < vm.cargonLocationInfo.length; i++) {
				var item = vm.cargonLocationInfo[i];
				if(item == value) {
					resultData = item.goodsInfo;
				}
			}
		}
		return resultData;
	}

	var loadUserInfo = function(pageNo) {
		vm.loading = true; //启用加载状态

		console.time();

		console.timeEnd();
//		var tempData = jsRes.goodsInfoList;
		var tempData = jsRes.GetGoodsData();
		vm.tableData = tempData;
		vm.total = tempData.length;
		vm.loading = false; //关闭加载状态
	}

	loadUserInfo(1);

})();