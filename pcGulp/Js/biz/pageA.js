(function() {
	var vm = new Vue({
		el: '#div-pageA',
		data: {
			tableData: null,
			detailPlan: [],
			planBillDetail: [],
			goodsDetail: [],
			loading: false,
			isOpenSearchMore: false, //是否展开查询条件
			//查询参数
			serachPrams: {
				A: '',
				B: '',
				C: '',
				D: '',
				E: '',
				F: '',
				G: '',
				H: '',
				I: '',
				J: '',
				K: '',
				L: '',
			},
			shipper: [{
				caption: "上海XXXXXX公司1",
				value: 1
			}, {
				caption: "上海XXXXXX公司2",
				value: 2
			}, {
				caption: "上海XXXXXX公司3",
				value: 3
			}, {
				caption: "上海XXXXXX公司4",
				value: 4
			}],
			productName: [{
				caption: "锌锭",
				value: 1
			}, {
				caption: "阴极铜",
				value: 2
			}, {
				caption: "精炼铜",
				value: 3
			}, {
				caption: "原铝",
				value: 4
			}],
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now();
				},
				shortcuts: [{
					text: '今天',
					onClick(picker) {
						picker.$emit('pick', new Date());
					}
				}, {
					text: '昨天',
					onClick(picker) {
						const date = new Date();
						date.setTime(date.getTime() - 3600 * 1000 * 24);
						picker.$emit('pick', date);
					}
				}, {
					text: '一周前',
					onClick(picker) {
						const date = new Date();
						date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
						picker.$emit('pick', date);
					}
				}]
			},

		},
		methods: {
			query: function() {
				loadUserInfo();
			},
			openSearchmore: function() {
				vm.isOpenSearchMore = vm.isOpenSearchMore == true ? false : true;
				$("#Searchmore").toggleClass('el-icon-plus').toggleClass('el-icon-minus');
			},
			columnSearch: function(value, row, column) {
				const property = column['property'];
				return row[property] === value;
			},
			clearFilter: function(index) {
				switch(index) {
					case 1 :
						this.$refs.multipleTable.clearFilter();
						break;
					case 2 :
						this.$refs.multipleDeailTable.clearFilter();
						this.$refs.multipBillleTable.clearFilter();
						break;
					case 3 :
						this.$refs.multipleGoodsTable.clearFilter();
						break;
				}
			},
			//计划信息选择行改变事件
			selectPlan: function(row) {
				if(row.length != 0) {
					var selectRow = row[row.length - 1];
					//选中行多于两行时
					if(row.length > 1) {
						//.$refs.multipleTable.clearSelection();//清楚所有选中数据
						this.$refs.multipleTable.toggleRowSelection(row[0], false); //取消之前选中的
						this.$refs.multipleTable.toggleRowSelection(selectRow, true); //选中最后选择的
					}
					vm.detailPlan = selectRow.detailPlan;
					vm.planBillDetail = selectRow.planBillDetail;
				} else {
					vm.detailPlan = [];
					vm.planBillDetail = [];
					vm.goodsDetail = [];
				}
			},
//			selectPlan:function(selection,row){
//				if(vm.detailPlan.length>0)
//				{
//					
//				}
//			},
			//过户明细计划信息选择行改变事件
			selectDetail: function(row) {
				if(row.length != 0) {
					var selectRow = row[row.length - 1];
					//选中行多于两行时
					if(row.length > 1) {
						//.$refs.multipleDeailTable.clearSelection();//清楚所有选中数据
						this.$refs.multipleDeailTable.toggleRowSelection(row[0], false); //取消之前选中的
						this.$refs.multipleDeailTable.toggleRowSelection(selectRow, true); //选中最后选择的
					}
					vm.goodsDetail = selectRow.goodsDetail;
				} else {
					vm.goodsDetail = [];
				}
			},
		}
	});

	var loadUserInfo = function() {
		vm.loading = true; //启用加载状态

		console.time();

		//var tempData = jsRes.goodsInfoList;
		var tempData = jsRes.GetTransferData();

		vm.tableData = tempData;
		console.timeEnd();
				debugger;
		vm.loading = false; //关闭加载状态
	}

	//	loadUserInfo();

})();