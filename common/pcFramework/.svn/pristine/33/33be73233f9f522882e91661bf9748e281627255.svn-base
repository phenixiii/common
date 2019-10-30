
//底部组件
Vue.component('foot', {
	data: function() {
		return {
			telInfo: jsRes.telInfo
		}
	},	
	template: '<div class="d-width-100">' +
					'<div class="container ">' +
					'	<div class="aui-flex-col d-flex-center"> ' +
//					'				<div class="aui-flex-item-3"> ' +
//					'					<div class="aui-margin-t-40 aui-margin-b-40 aui-flex-col aui-flex-middle" style="height: 110px;"> ' +
//					'						<img src="../img/logo_l_white.png" class="d-disply-block" height="40" style="opacity: 0.4;"/> ' +
//					'					</div> ' +
//					'				</div>	' + 
					'				<div class="aui-flex-item-3 aui-padded-t-25 aui-padded-b-0 aui-padded-l-20 aui-padded-r-30"> ' +
					'					<div class="d-text-gray-2 d-border-r-gray2"> ' +
					'						<div class="d-f-16 aui-padded-b-15 text-left d-sectit d-font-normal">关于我们</div> ' +
					'                       <div class="aui-flex-col">' +
					'						        <div class="aui-flex-item-6 aui-padded-b-15 d-f-14"> ' +
					'							          <a href="../web/helpDock.html" target="_blank" class="d-text-gray-2 pull-left">帮助中心</a> ' +
					'						        </div> ' +
//					'						       	<div class="aui-flex-item-6 aui-padded-b-15 d-f-14"> ' +
//					'							       	  <a href="../web/platformProtocol.html" target="_blank" class="d-text-gray-2 pull-left">平台协议</a> ' +
//					'						        </div> ' +
					'						        <div class="aui-flex-item-6 aui-padded-b-15 d-f-14"> ' +
					'							       	  <a href="../web/merchantDock.html" target="_blank" class="d-text-gray-2 pull-left">商户对接</a> ' +
					'						        </div> ' +
					'						       	<div class="aui-flex-item-6 aui-padded-b-15 d-f-14"> ' +
					'							       	  <a href="../res/icons.zip" class="d-text-gray-2 pull-left">素材下载</a>' +
					'						        </div> ' +
					'                        </div>' +					
					'					</div> ' +
					'				</div> ' +
					'				<div class="aui-flex-item-4 aui-padded-t-25 aui-padded-b-0 aui-padded-l-30 aui-padded-r-30"> ' +
					'					<div class="d-text-gray-2 d-border-r-gray2"> ' +
					'						<div class="d-f-16 aui-padded-b-15 text-left d-sectit d-font-normal"> '+
					'                       	<span>客服邮箱</span>'+
					'                       </div> ' +
					'                       <div class="aui-flex-col">' +
					'							   <div class="aui-flex-item-6 aui-padded-b-15 d-f-14"> ' +
					'									<span class="pull-left d-text-gray-2 d-f-14">eharbor@hb56.com</span> ' +
					'							   </div> ' +
					'							   <div class="aui-flex-item-6 aui-padded-b-15 d-f-14"> ' +
					'									<span class="pull-left d-text-gray-2 d-f-14">eharbor1@hb56.com</span> ' +
					'							   </div> ' +
					'							   <div class="aui-flex-item-6 aui-padded-b-15 d-f-14"> ' +
					'									<span class="pull-left d-text-gray-2 d-f-14">eharbor2@hb56.com</span> ' +
					'							   </div> ' +
					'                       </div> ' +
					'					</div> ' +
					'				</div> ' +
					'				<div class="aui-flex-item-4 aui-padded-t-25 aui-padded-b-0  aui-padded-l-30 aui-padded-r-30"> ' +
					'					<div class="d-text-gray-2"> ' +
					'						<div class="d-f-16 aui-padded-b-15 text-left d-sectit d-font-normal">客服热线</div> ' +
					'                       <div class="aui-flex-col">' +
					'							<div v-for="(item,index) in telInfo" class="aui-flex-item-6 aui-padded-b-15 d-f-14">' +
					'								<span v-if="item.type==0" class="pull-left d-tel">{{item.tel}}</span> ' +
					'								<a v-else-if="item.type==1" href="javascript:;" class="pull-left" @click="openQQ(item)">'+
					'									<img border="0" :src="getUrl(item)" alt="QQ交谈" title="QQ交谈" class="d-h-20"/>'+
					'								</a>'+					
					'                       	</div> ' +
					' 							<div class="aui-flex-item-6 aui-padded-b-15 d-f-14"> ' +
					'								<span class="pull-left">周一至周五 08:30~17:00</span> ' +
					'							</div> ' +
					'                       </div> ' +
					'					</div> ' +
					'			</div> ' +
					'	</div>	' +
					'	<div class="aui-flex-col aui-padded-t-5 aui-flex-center"> ' +
					'			<ul class="d-text-gray-2 "> ' +
					'					<li class="">Copyright ©上海海勃物流软件有限公司版权所有 | 沪ICP备05012886号 ' +
					'						<img src="../img/intro/police_bg.png" class="aui-padded-l-20 aui-margin-b-5"> ' +
					'						<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31022102000115" target="_blank" class="d-text-gray-2">沪公网安备 31022102000115号</a> ' +
					'					</li> ' +
					'					<li class="">' +
					'						推荐使用：<a href="https://www.google.cn/chrome/" target="_blank" title="下载Chrome浏览器">谷歌Chrome浏览器</a>、<a href="http://browser.360.cn/" target="_blank" title="下载360浏览器">360浏览器</a>、' +
					'						<a href="https://browser.qq.com/" target="_blank" title="下载QQ浏览器">QQ浏览器</a>  ' +
					'						<span class="aui-padded-l-10">支持IE11及以上版本</span> ' +
					'					</li> ' +
					'			</ul> ' +
					'   </div> ' +
				'</div>' , 
	methods: {
		 
	}
});


new Vue({
	el: '#footLight'
});
