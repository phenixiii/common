var vueAction = {
	str : ['<div style="display: none;">',
		'			<div class="aui-mask aui-mask-in"  onclick="vueAction.toggleHisDiv(\'hide\')"></div>',
		'			<div id = "historyDiv" v-cloak class="c-bg-white aui-margin-l-15 aui-margin-r-15 " style="position: fixed;left: 0rem;right:0rem;z-index: 99;max-height: 16rem;overflow-y: auto;display: none;">',
		'				<div v-for="x in infoHis" class="aui-flex-col aui-padded-15 aui-border-b" v-on:click="selectHis(x)">					',
		'						<div class="aui-flex-auto aui-text-center " >{{x.name}}</div>		',
		'				</div>',
//		'				<div class="aui-padded-15 aui-text-center aui-border-b" tapmode v-on:click="clearCache()">',
//		'					<i class="aui-iconfont aui-icon-trash"></i>',
//		'				</div>',
		'			</div>',
		'			',
		'		</div>'
	].join(""),

	//当前组件对象
	cur : {},
	//当前存储路径
	curRes : '',
	//回调方法
	callback : function(){},
	//初始化
	init : function(res,data, callback) {
		
		vueAction.curRes = res;
		
		vueAction.callback = callback;
		// 注册
		Vue.component('zgghis', {
			template: vueAction.str,
			data: function() {
				return {
					infoHis: data
				}
			},
			mounted: function() {
				vueAction.cur = this;
			},
			methods: {
				selectHis: function(ret) {
					console.log(JSON.stringify(ret));
					
					vueAction.callback(ret);

					vueAction.toggleHisDiv('hide');
				},
				deleteHis: function(ret) {
					this.infoHis.splice($.inArray(ret, this.infoHis), 1);
				},
				clearCache: function() {

					this.infoHis = [];

					vueAction.toggleHisDiv('hide');
				}
			}
		});

		new Vue({
			el: '#vueHis'
		});

	},
	
	//数据重置
	resetData : function(str,data,callback){
		vueAction.curRes = str;
		vueAction.cur.infoHis = data;
		vueAction.callback = callback;
	},

	addHis : function(ret) {

		var tmpHis = vueAction.cur.infoHis;

		var q = Enumerable.From(tmpHis).FirstOrDefault(null, "x=>x.name=='" + ret + "'");

		if(q == null)
			tmpHis.unshift({
				name: ret
			});

		while(tmpHis.length > 10)
			tmpHis.pop();

		vueAction.cur.infoHis = tmpHis;

	},

	toggleHisDiv : function(str) {
		if(vueAction.cur.infoHis.length == 0){
			
			$('#historyDiv').parent().hide();
			$('#historyDiv').animate({
				height: 'hide'
			});
			return;
			
		}
			
		if(!str)
			str = 'toggle';

		$('#historyDiv').parent().toggle();

		$('#historyDiv').animate({
			height: str
		});
	}
};