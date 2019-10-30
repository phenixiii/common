
//分页组件
Vue.component('pager', {
	data: function() {
		return {

		}
	},
	props: {
		results: ''
	},
	
	template: [
	
		'<div class="aui-flex-row aui-margin-15">',
		'	<div v-show="results.RecordNums > 0" class="aui-flex-col aui-flex-middle aui-flex-center c-bg-white">',
		'		<div class="layui-btn aui-margin-10 layui-btn-primary layui-btn-sm" :class="results.CurrentPage == 1 ? \'layui-btn-disabled\':\'\'" @click="curPage(1)">首页</div>',
		'		<div class="layui-btn aui-margin-10 layui-btn-primary layui-btn-sm" :class="results.CurrentPage == 1 ? \'layui-btn-disabled\':\'\'" @click="previousPage(results.CurrentPage)">上一页</div>',
		'		<div>第{{results.CurrentPage}} / {{results.PageNums}}页</div>',
		'		<div class="layui-btn aui-margin-10 layui-btn-primary layui-btn-sm" :class="results.CurrentPage == results.PageNums ? \'layui-btn-disabled\':\'\'" @click="nextPage(results.CurrentPage,results.PageNums)">下一页</div>',
		'		<div class="layui-btn aui-margin-10 layui-btn-primary layui-btn-sm" :class="results.CurrentPage == results.PageNums ? \'layui-btn-disabled\':\'\'" @click="curPage(results.PageNums)">尾页</div>',
		'		<div class="aui-padded-l-15 aui-font-size-14">共：{{results.RecordNums}} 条记录</div>',
		'	</div>',
		'</div>'
		
//		'<div class="aui-flex-col aui-flex-middle aui-flex-center ">	'+
//		'	<ul class="pager">	'+
//		'		<li :class="CurNums == 1 ? \'disabled\':\'d-cursor-pointer\' ">	'+
//		'			<a @click="first()">首页</a>	'+
//		'		</li>	'+
//		'		<li :class="CurNums == 1 ? \'disabled\':\'d-cursor-pointer\' ">	'+
//		'			<a @click="previousPage()" class="d-f-16">&laquo;</a>	'+
//		'		</li>	'+
//		'		<span class="aui-margin-l-5 aui-margin-r-5 aui-padded-t-10 aui-padded-b-10 aui-padded-l-20 aui-padded-r-20 d-border-gray2">第{{TradeInfo.CurrentPage}}/{{TradeInfo.PageNums}}页</span>	'+
//		'		<li :class="LastPage == true ? \'disabled\':\'d-cursor-pointer\' ">	'+
//		'			<a @click="nextPage()" class="d-f-16">&raquo;</a>	'+
//		'		</li>	'+
//		'		<li :class="LastPage == true ? \'disabled\':\'d-cursor-pointer\' ">	'+
//		'			<a @click="last()">末页</a>	'+
//		'		</li>	'+
//		'	</ul>	'+
//		'	<span class="aui-margin-l-10 aui-margin-r-10 aui-padded-t-10 aui-padded-b-10 aui-padded-l-20 aui-padded-r-20 d-border-gray2 d-f-14">当前{{TradeInfo.MenmberTradeQuerys.length}}条 <em class="d-text-gray-2">/</em> 总计{{TradeInfo.RecordNums}}条</span>	'+
//		'</div>	'+
		
	].join(""),
	
	methods: {
		curPage : function(ret){
			this.$emit('searchdata',ret);	
		},
		previousPage: function(ret) {
			if(ret > 1)
				ret--;
			else
				return;
			this.$emit('searchdata',ret);	
		},
		nextPage: function(ret,num) {
//			this.$parent.nextPage();
			if(ret < num)
				ret++;
			else
				return;
			this.$emit('searchdata',ret);	

//			this.$emit('next');
		}
	},
});
