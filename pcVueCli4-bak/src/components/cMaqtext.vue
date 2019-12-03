// 滚动文字列表
<template>
  <div id="text-wrap" class="d-noticeBox">
    <ul class="aui-padded-l-15 aui-padded-r-15" v-if="list.length > 0">
      <li class="aui-flex-col" v-for="(item,index) in list" :key="index">
        <div class="d-serial">
          <span class="d-cirdot"></span>
        </div>
        <div v-if="!showtitle" class="d-con">
          <p class="d-font-size-17">{{item.ContentStr}}</p>
        </div>
        <div v-else class="d-con">
          <div class="d-title d-font-size-25">{{item.Title}}：</div>
          <div class="d-content d-font-size-25">{{item.ContentStr}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    showtitle: false,
  },
  data() {
    return {};
  },
  mounted: function() {
    var that = this;
    this.$nextTick(function() {
      that.maq();
    });
  },
  methods: {
    maq: function() {
      $("#text-wrap").myScroll({
        speed: 100, //数值越大，速度越慢
        rowHeight: 30 //li的高度
      });
    }
  }
};
</script>
