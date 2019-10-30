<template>
  <div id="swiper_container" class="notice-wrap swiper-container">
    <ul id="notice-list" class="notice-list swiper-wrapper">
      <li
        v-for="(item,index) in noticList"
        class="swiper-slide"
        :class="item.WarnClass == 1 ? 'danger' : 'warning'"
        @click="linkTo(item)"
        :key="index"
      >
        <i class="iconfont icon-police"></i>
        <a href="javascript:;" :title="item.content">【{{item.time}}】{{item.content}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    data: function() {
		return {
			mySwiper: null,
		}
	},
	props: {
		isShow : {
			type:Boolean,
			default:true
		},
		noticList: {
			type: Array,
			default: ()=>[]
		},
		speed: {
			type: Number,
			default: 100
		}
	},
	watch: {
		'isShow':function(newValue,oldValue){
		},
		'noticList': function(newValue, oldValue) {
		}
	},
	mounted: function() {
		var that = this;
		this.$nextTick(function() {
			that.maq();
		});
	},
	methods: {

		maq: function() {
			$('#swiper_container').myScroll({
				speed: 100, //数值越大，速度越慢
				rowHeight: 30 //li的高度
			});
		},

		linkTo: function(item) {
			//跳转到
			var param = {

				PierFlag: item.PierFlag, //码头
//				CraneNo: item.CraneNo, //桥吊
				UserNumber: item.UserNumber, //工号

				fromPage: vmMain.defaultPage, //当前页面
				//showBack: true, //目标页面是否显示返回按钮
				//tag: vm.dataType //当前页面显示条件
			};
            jsTools.SessionStorage.setVal(jsTools.Res.param, param);
            this.$emit('linkTo',null, ['warning', 'warninglist']);
		}
	},
}
</script>