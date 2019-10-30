var vueSearch = {
	searchStr: ['<div id = "searchDiv" v-cloak style="position:relative;z-index:9">',
		'				<div class="aui-bg-info aui-text-white c-orderSearch aui-padded-l-10 aui-padded-r-10 aui-padded-b-10">',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" style="line-height:1.6rem;background-color: #dbdcde;" type="date" v-model="criteria.TranTimeStart" />',
		'						</div> ',
		'						<div class="aui-flex-item-1 aui-text-center">-</div> ',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default"> ',
		'							<input class="aui-text-center aui-font-size-14" type="date" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.TranTimeEnd" />',
		'						</div>',
		'					</div> ',		
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-11 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" type="text" placeholder="请输入证件号码" v-model="criteria.TaxIDNo" style=";background-color: #dbdcde;" />',
		'						</div>',
		'					</div>',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-11 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" type="text" placeholder="请输入订单号" v-model="criteria.OrderNo" style=";background-color: #dbdcde;" />',
		'						</div>',
		'					</div>',
		'					<div v-show="sp >= 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="会员名" style="line-height:1.6rem;background-color: #dbdcde;" type="text" v-model="criteria.NickName" />',
		'						</div>',
		'						<div class="aui-flex-offset-1 aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="会员电话" type="text" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.Tel" />',
		'						</div>',
		'						<div class="aui-flex-item-1 aui-text-right c-radius1" @click="searchParams(criteria,sp)">',
		'							<i class="aui-iconfont aui-icon-search aui-font-size-18 c-text-bold aui-text-white"></i>',
		'						</div>',
		'					</div>',
		'				</div>',
		'			</div>'
	].join(""),
	searchPro: ['<div id = "searchDiv" v-cloak style="position:relative;z-index:9">',
		'				<div class="aui-bg-info aui-text-white c-orderSearch aui-padded-l-10 aui-padded-r-10 aui-padded-b-10">',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" style="line-height:1.6rem;background-color: #dbdcde;" type="date" v-model="criteria.TranTimeStart" />',
		'						</div> ',
		'						<div class="aui-flex-item-1 aui-text-center">-</div> ',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default"> ',
		'							<input class="aui-text-center aui-font-size-14" type="date" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.TranTimeEnd" />',
		'						</div>',
		'					</div> ',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-11 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" type="text" placeholder="请输入订单号" v-model="criteria.OrderNo" style=";background-color: #dbdcde;" />',
		'						</div>',

		'					</div>',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="收款方名称" style="line-height:1.6rem;background-color: #dbdcde;" type="text" v-model="criteria.InNickName" />',
		'						</div>',
		'						<div class="aui-flex-offset-1 aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="收款方电话" type="text" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.InTel" />',
		'						</div>',
		'					</div>',
		'					<div v-show="sp >= 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="付款方名称" style="line-height:1.6rem;background-color: #dbdcde;" type="text" v-model="criteria.OutNickName" />',
		'						</div>',
		'						<div class="aui-flex-offset-1 aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="付款方电话" type="text" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.OutTel" />',
		'						</div>',
		'						<div class="aui-flex-item-1 aui-text-right c-radius1" @click="searchParams(criteria,sp)">',
		'							<i class="aui-iconfont aui-icon-search aui-font-size-18 c-text-bold aui-text-white"></i>',
		'						</div>',
		'					</div>',
		'				</div>',
		'			</div>'
	].join(""),
	searchUser: ['<div id = "searchDiv" v-cloak style="position:relative;z-index:9">',
		'				<div class="aui-bg-info aui-text-white c-orderSearch aui-padded-l-10 aui-padded-r-10 aui-padded-b-10">',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" style="line-height:1.6rem;background-color: #dbdcde;" type="date" v-model="criteria.RegisterTimeStart" />',
		'						</div> ',
		'						<div class="aui-flex-item-1 aui-text-center">-</div> ',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default"> ',
		'							<input class="aui-text-center aui-font-size-14" type="date" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.RegisterTimeEnd" />',
		'						</div>',
		'					</div> ',		
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-11 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" type="text" placeholder="请输入证件号" v-model="criteria.TaxIDNo" style=";background-color: #dbdcde;" />',
		'						</div>',
		'					</div>',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-11 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="请输入邮箱" style="line-height:1.6rem;background-color: #dbdcde;" type="text" v-model="criteria.Email" />',
		'						</div>',
		'					</div>',
		'					<div v-show="sp >= 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="会员名称" style="line-height:1.6rem;background-color: #dbdcde;" type="text" v-model="criteria.NickName" />',
		'						</div>',
		'						<div class="aui-flex-offset-1 aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="会员电话" type="text" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.Tel" />',
		'						</div>',
		'						<div class="aui-flex-item-1 aui-text-right c-radius1" @click="searchParams(criteria,sp)">',
		'							<i class="aui-iconfont aui-icon-search aui-font-size-18 c-text-bold aui-text-white"></i>',
		'						</div>',
		'					</div>',
		'				</div>',
		'			</div>'
	].join(""),
	searchAgreemt: ['<div id = "searchDiv" v-cloak style="position:relative;z-index:9">',
		'				<div class="aui-bg-info aui-text-white c-orderSearch aui-padded-l-10 aui-padded-r-10 aui-padded-b-10">',
		'					<div v-show="sp == 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-11 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" type="text" placeholder="请输入协议号" v-model="criteria.TaxIDNo" style=";background-color: #dbdcde;" />',
		'						</div>',
		'					</div>',
		'					<div v-show="sp >= 0" class="aui-flex-col aui-flex-middle aui-padded-t-5">',
		'						<div class="aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="会员名称" style="line-height:1.6rem;background-color: #dbdcde;" type="text" v-model="criteria.NickName" />',
		'						</div>',
		'						<div class="aui-flex-offset-1 aui-flex-item-5 aui-border aui-bg-default">',
		'							<input class="aui-text-center aui-font-size-14" placeholder="会员电话" type="text" style="line-height:1.6rem;background-color: #dbdcde;" v-model="criteria.Tel" />',
		'						</div>',
		'						<div class="aui-flex-item-1 aui-text-right c-radius1" @click="searchParams(criteria,sp)">',
		'							<i class="aui-iconfont aui-icon-search aui-font-size-18 c-text-bold aui-text-white"></i>',
		'						</div>',
		'					</div>',
		'				</div>',
		'			</div>'
	].join(""),
	
};

// 注册查询组件
Vue.component("zgg-search", {
	template: vueSearch.searchStr,
	data: function() {
		return {}
	},
	props: {
		sp: null,
		criteria: '',
	},

	methods: {
		searchParams: function(criteria, sp) {
			if(sp == 1) {
				criteria.OrderNo = null;
				criteria.TaxIDNo = null;
			}
			this.$emit('zggsearch');
		}
	},
});

// 注册组件pro
Vue.component("zgg-search-pro", {
	template: vueSearch.searchPro,
	data: function() {
		return {}
	},
	props: {
		sp: null,
		criteria: '',
	},

	methods: {
		searchParams: function(criteria, sp) {
			if(sp == 1) {
				criteria.OrderNo = null;
				criteria.InNickName = null;
				criteria.InTel = null;
			}
			this.$emit('zggsearch');
		}
	},
});

// 用户查询组件user
Vue.component("zgg-search-user", {
	template: vueSearch.searchUser,
	data: function() {
		return {}
	},
	props: {
		sp: null,
		criteria: '',
	},

	methods: {
		searchParams: function(criteria, sp) {
			if(sp == 1) {
				criteria.TaxIDNo = null;
				criteria.Email = null;
			}
			this.$emit('zggsearch');
		}
	},
});


// 协议查询组件
Vue.component("zgg-search-agreemt", {
	template: vueSearch.searchAgreemt,
	data: function() {
		return {}
	},
	props: {
		sp: null,
		criteria: '',
	},

	methods: {
		searchParams: function(criteria, sp) {
			if(sp == 1) {
				criteria.TaxIDNo = null;
			}
			this.$emit('zggsearch');
			debugger
		}
	},
});
