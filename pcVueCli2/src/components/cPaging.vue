<template>
  <div class="aui-flex-row aui-margin-15 d-paging">
    <div v-show="results.RecordNums > 0" class="aui-flex-col aui-flex-middle aui-flex-center">
      <div
        class="pag d-font-size-11"
        :class="results.CurrentPage == 1 ? 'disable':''"
        @click="curPage(1,results.CurrentPage)"
      >首页</div>
      <div
        class="pag d-font-size-11"
        :class="results.CurrentPage == 1 ? 'disable':''"
        @click="prev(results.CurrentPage)"
      >上一页</div>
      <div
        class="number pagnumber d-font-size-11"
      >第&nbsp;{{results.CurrentPage}}/{{results.PageNums}}&nbsp;页</div>
      <div
        class="pag d-font-size-11"
        :class="results.CurrentPage == results.PageNums ? 'disable':''"
        @click="next(results.CurrentPage,results.PageNums)"
      >下一页</div>
      <div
        class="pag d-font-size-11"
        :class="results.CurrentPage == results.PageNums ? 'disable':''"
        @click="curPage(results.PageNums,results.CurrentPage)"
      >末页</div>
      <div v-if="showdown" class="pag d-font-size-11" @click="download()">下载</div>
      <div
        class="aui-padded-l-15 d-font-size-11"
      >当前 {{results.curRecord}} 条，共计 {{results.RecordNums}} 条</div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  props: {
    results: "",
    showdown: false //显示下载
  },

  template: [].join(""),

  methods: {
    curPage: function(ret, cur) {
      if (ret == cur) return;
      this.$emit("searchclick", ret);
    },
    prev: function(ret) {
      if (ret > 1) ret--;
      else return;
      this.$emit("searchclick", ret);
    },
    next: function(ret, num) {
      if (ret < num) ret++;
      else return;
      this.$emit("searchclick", ret);
    },
    download: function() {}
  }
};
</script>
