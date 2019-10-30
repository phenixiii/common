(function() {

	var vm = new Vue({
		el: '#div-page7',
		data: {
			tableData: null,
			detailPlan: [],
			planBillDetail: [],
			goodsDetail: [],
			loading: false,
			firstLevelHeight: 500,
			secondLevelHeight: 500,
			thirdLevelHeight: 0,
			isOpenSearchMore: false, //是否展开查询条件
			currentPlan: null,
			currentPlanDetail: null,
			showPlanList: true,//是否显示全部计划列表
			showPlanInfo: false,//是否只显示当前选中计划详情
			showOnlyDetail:false,//是否只显示当前选中明细数据
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
				vm.screenHeight = vm.screenHeight - 103;
				vm.isOpenSearchMore = vm.isOpenSearchMore == true ? false : true;
				$("#Searchmore").toggleClass('el-icon-plus').toggleClass('el-icon-minus');
			},
			changePanelWidth: function() {
				if(vm.detailPlan.length > 0 && vm.planBillDetail.length > 0) {
					return 'el-col-6'
				} else {
					return 'el-col-24'
				}
			},
			columnSearch: function(value, row, column) {
				const property = column['property'];
				return row[property] === value;
			},
			clearFilter: function(index) {
				switch(index) {
					case 1:
						this.$refs.multipleTable.clearFilter();
						break;
					case 2:
						this.$refs.multipleDeailTable.clearFilter();
						this.$refs.multipBillleTable.clearFilter();
						break;
					case 3:
						this.$refs.multipleGoodsTable.clearFilter();
						break;
				}
			},
			GoDetail:function(row){		
				debugger		
				vm.showPlanList = false;
				vm.showPlanInfo = true;
				vm.currentPlan = row;
				vm.detailPlan = row.detailPlan;
				vm.planBillDetail = row.planBillDetail;
			},
			//计划信息选择行改变事件
			selectPlan: function(row) {
				debugger
				if(row.length != 0) {
					var selectRow = row[row.length - 1];
					//选中行多于两行时
					if(row.length > 1) {
						//.$refs.multipleTable.clearSelection();//清楚所有选中数据
						this.$refs.multipleTable.toggleRowSelection(row[0], false); //取消之前选中的
						this.$refs.multipleTable.toggleRowSelection(selectRow, true); //选中最后选择的
					}
					vm.showPlanList = false;
					vm.showPlanInfo = true;
					vm.currentPlan = selectRow;
					vm.detailPlan = selectRow.detailPlan;
					vm.planBillDetail = selectRow.planBillDetail;
				} else {
					vm.currentPlan = [];
					vm.detailPlan = [];
					vm.planBillDetail = [];
					vm.goodsDetail = [];
				}
			},
			selectPlanRow: function(row, column, event) {
//				vm.showPlanList = false;
//				vm.showPlanInfo = true;
//				vm.currentPlan = row;
//				vm.detailPlan = row.detailPlan;
//				vm.planBillDetail = row.planBillDetail;
			},	
			backPlanList: function() {
				vm.currentPlan = [];
				vm.detailPlan = [];
				vm.planBillDetail = [];
				vm.goodsDetail = [];
				vm.showPlanList = true;
				vm.showPlanInfo = false;
			},		
			selectPlanDetailRow: function(row, column, event) {
				vm.showOnlyDetail = true;
				vm.detailPlan=[];//清空计划明细列表
				vm.detailPlan.push(row);//计划明细列表只添加当前选择明细
				vm.currentPlanDetail = row;
				vm.goodsDetail = row.goodsDetail;
				vm.thirdLevelHeight=305;
			},			
			backPlanDetailList: function() {
				debugger;
				vm.goodsDetail = [];
				vm.showOnlyDetail = false;
				vm.detailPlan=vm.currentPlan.detailPlan;
			},
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
		//		debugger;
		vm.loading = false; //关闭加载状态
	}

	loadUserInfo();

})();