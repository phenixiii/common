let jsEnum = {
	VesselType : [{
		name :'干线',
		value : 0
	},{
		name :'支线',
		value : 1
	}],
	//设备类型
	EquipmentTypeList: [{
		name: 'Camera',
		value: 0
	}, {
		name: 'OCR',
		value: 1
	}, {
		name: 'PLC',
		value: 2
	}, {
		name: 'Trigger',
		value: 3
	}, {
		name: 'WIFI_NODE',
		value: 4
	}, {
		name: 'UPS',
		value: 5
	}, {
		name: 'POWER',
		value: 6
	}],
	
	//获取码头图片服务IP
	getPierImgServerIp: function(code){
		var ip = '';
		switch(code){
			case 0:	//外一
				ip = '172.16.78.201';
				break;
			case 1: //外二
				ip = '172.16.78.200';
				break;
			case 2:	//外四
				ip = '172.15.21.200';
				break;
		}
		return ip;
	},
	
	//码头
	EquipmentKeepList: function(ret) {
		var ret = [{
			name: '浦东',	//外一
			value: 0
		}, {
			name: '振东',	//外二
			value: 1
		}, {
			name: '沪东',	//外四
			value: 2
		}, {
			name: '明东',	//外五
			value: 3
		}, {
			name: '盛东',	//洋一
			value: 4
		}, {
			name: '冠东',	//洋三
			value: 5
		}, {
			name: '尚东',	//洋四
			value: 6
		}];

		var userInfo = ret;

		//权限判断
		if(userInfo.PierList && userInfo.PierList.length > 0) {
			var tmp = [];
			userInfo.PierList.map(function(item) {
				tmp.push({
					name: item.Name,
					value: item.PierFlag
				})
			});
			ret = tmp;
		}
		return ret;
	},
	//故障类型枚举
	DamageType: [{
			name: '硬件',
			value: 0
		},
		{
			name: '软件',
			value: 1
		},
		{
			name: '断电',
			value: 2
		},
		{
			name: '其他',
			value: 9
		}
	],
	//应急处理方案
	EmergencyProcess: [{
			name: '可视化理货',
			value: 0
		},
		{
			name: 'PDA理货',
			value: 1
		},
		{
			name: '无',
			value: 9
		},
	],
	//借调状态
	UserStatus: [{
			name: '待审核',
			value: 0
		},
		{
			name: '已审核',
			value: 1
		},
		{
			name: '已拒绝',
			value: 2
		},
	],
	//出勤状态
	DutyStatus: [{
			name: '当班',
			value: 0
		},
		{
			name: '借入',
			value: 1
		},
		{
			name: '借出',
			value: 2
		},
		{
			name: '休息',
			value: 3
		},
		{
			name: '公休',
			value: 4
		},
		{
			name: '年休',
			value: 5
		},
		{
			name: '公假',
			value: 6
		},
		{
			name: '病假',
			value: 7
		},
		{
			name: '事假',
			value: 8
		},
		{
			name: '探亲',
			value: 9
		},
	],
	//岗位类型
	StaticType: [{
			name: '当班经理',
			value: 0
		},
		{
			name: '当班班长',
			value: 1
		},
		{
			name: '室长',
			value: 2
		},
		{
			name: '理货长',
			value: 3
		},
		{
			name: '前台理货长',
			value: 4
		},
		{
			name: '后台理货长',
			value: 5
		},
		{
			name: '理货组长',
			value: 6
		},
		{
			name: '操控员',
			value: 7
		},
		{
			name: '理货员',
			value: 8
		},
		{
			name: '其他',
			value: 99
		},
	],
	//保养状态
	MaintainStatus: [{
			name: '待确认',
			value: 0
		},
		{
			name: '已确认',
			value: 1
		},
		{
			name: '拒绝确认',
			value: 2
		},
		{
			name: '已完结',
			value: 3
		},
	],

	//天气类型
	WeatherTypeList: [{
			name: '晴',
			value: 0
		},
//		{
//			name: '高温',
//			value: 1
//		},
		{
			name: '冰雹',
			value: 2
		},
		{
			name: '多云',
			value: 3
		},
		{
			name: '阴',
			value: 4
		},
//		{
//			name: '大风',
//			value: 5
//		},
//		{
//			name: '台风',
//			value: 6
//		},
		{
			name: '小雨',
			value: 7
		},
		{
			name: '中雨',
			value: 8
		},
		{
			name: '大雨',
			value: 9
		},
		{
			name: '小雪',
			value: 10
		},
		{
			name: '中雪',
			value: 11
		},
		{
			name: '大雪',
			value: 12
		},
	],
	//天气预警等级
	WeatherWarnlevel: [
//		{
//			name: '正常',
//			value: 0
//		},
		{
			name: '蓝色预警',
			value: 1
		},
		{
			name: '黄色预警',
			value: 2
		},
		{
			name: '橙色预警',
			value: 3
		},
		{
			name: '红色预警',
			value: 4
		},
	],
	//天气预警类型
	WeatherWarnType: [ 
		{
			name: '大风',
			value: 0
		},
		{
			name: '高温',
			value: 1
		},
		{
			name: '台风',
			value: 2
		},
		{
			name: '暴雨',
			value: 3
		},
		{
			name: '大雾',
			value: 4
		},
		{
			name: '寒潮',
			value: 5
		},
		{
			name: '雷电',
			value: 6
		},
		{
			name: '霜冻',
			value: 7
		},
		{
			name: '暴雪',
			value: 8
		},
	],
	//实时天气
	currentWeather:  [{
			name: '晴',
			value: 0
		},
//		{
//			name: '高温',
//			value: 1
//		},
		{
			name: '冰雹',
			value: 2
		},
		{
			name: '多云',
			value: 3
		},
		{
			name: '阴',
			value: 4
		},
//		{
//			name: '大风',
//			value: 5
//		},
//		{
//			name: '台风',
//			value: 6
//		},
		{
			name: '小雨',
			value: 7
		},
		{
			name: '中雨',
			value: 8
		},
		{
			name: '大雨',
			value: 9
		},
		{
			name: '小雪',
			value: 10
		},
		{
			name: '中雪',
			value: 11
		},
		{
			name: '大雪',
			value: 12
		},
		{
			name: '雷阵雨',
			value: 13
		},
		{
			name: '阵雨',
			value: 14
		},
		{
			name: '暴雨',
			value: 15
		},
		{
			name: '雷暴雨',
			value: 16
		},
		{
			name: '雾天',
			value: 17
		},
		{
			name: '霜冻',
			value: 18
		},
	],
	//处理流程
	handleFlowList: [{
			name: '可自行处置',
			value: 0
		},
		{
			name: '需审批后处置',
			value: 1
		},
	],
	//处理状态
	warnStatus: [{
			name: '未处理',
			value: 0
		},
		{
			name: '已处理',
			value: 1
		},
	],
	PierFlag:[{//所有码头枚举，首页用
		name: '外一',
		value: 0
	}, {
		name: '外二',
		value: 1
	}, {
		name: '外四',
		value: 2
	}, {
		name: '外五',
		value: 3
	}, {
		name: '洋一',
		value: 4
	}, {
		name: '洋三',
		value: 5
	}, {
		name: '洋四',
		value: 6
	}],
	//重要程度
	ImportantLevel: [{
			name: '一般',
			value: 0
		},
		{
			name: '重要',
			value: 1
		},
		{
			name: '非常重要',
			value: 2
		},
	],
	
	//报警参数
	WarnParamaType: [{
			name: '操控员最大操作桥机数量',
			value: 0
		},
		{
			name: '值班经理值班班长每工班最少人数',
			value: 1
		},
		{
			name: '前台理货长最大允许一人负责几个泊位',
			value: 2
		},
		{
			name: '后台理货长派工数量范围值',
			value: 3
		},
		{
			name: '就餐时间顶岗人员允许操控桥机数量',
			value: 4
		},
		{
			name: '非就餐时间顶岗人员允许操控桥机数量',
			value: 5
		},
//		{
//			name: '操控员每多少分钟至少要确认一个箱子',
//			value: 6
//		},
		{
			name: '单次顶岗最多不超过多少分钟',
			value: 7
		},
		{
			name: '一个工班内顶岗不超过多少分钟',
			value: 8
		},
		{
			name: '岗位职位安排错误报警',
			value: 9
		},
		{
			name: '设备保养监控',
			value: 10
		},
		{
			name: '超时操作监控',
			value: 11
		},
		{
			name: '最大允许未操作指令报警',
			value: 12
		},
	],
}

export default jsEnum;