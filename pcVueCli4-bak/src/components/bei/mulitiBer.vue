<template>
  <div style="padding: 50px;">
    <div
      class="aui-flex-col aui-flex-center aui-flex-middle"
      style="display: -webkit-box;overflow: hidden;"
    >
      <transition name="slide-fade" v-for="(ber,index) in beiList" :key="'m'+index">
        <div
          class="cur-size-bei"
          v-show="index >= start && index < end"
          :class="index > start ? 'cur-margin-left':''"
        >
          <base-ber :item="ber"></base-ber>
        </div>
      </transition>
    </div>

    <div class="aui-flex-col aui-flex-center">
      <el-pagination
        @current-change="select"
        :current-page.sync="pagination.currentPage"
        :page-size="pagination.pageSize"
        layout="prev, pager, next"
        :total="pagination.totalPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import baseBer from "./baseBer.vue";

export default {
  components: {
    baseBer
  },
  data: function() {
    return {
      beiList: [],
      start: 0,
      end: 0,
      count: 5,
      currentBei: null,

      pagination: {
        currentPage: 1,
        pageSize: 1,
        totalPage: 1
      }
    };
  },
  methods: {
    select: function(i) {
      this.currentBei = null;

      this.start = i - 1;

      if (this.start > this.pagination.totalPage - this.pagination.pageSize) {
        this.start = this.pagination.totalPage - this.pagination.pageSize;
      }

      this.end = this.start + this.count;
    },
  },
  mounted: function() {
    this.end = this.start + this.count;
    for (var i = 0; i < 30; i++) {
      var bei = {
        title: i + 1 + "贝",
        key: i,
        topData: {
          vTitle: ["86", "84", "82"],
          hTitle: ["06", "04", "02", "00", "01", "03", "05"]
        },
        bottomData: {
          vTitle: ["08", "06", "04", "02"],
          hTitle: ["06", "04", "02", "00", "01", "03", "05"]
        }
      };
      this.beiList.push(bei);
    }
    this.pagination.totalPage = this.beiList.length;
  }
};
</script>

<style scoped>
.cur-size-wei {
  width: 15px;
  height: 15px;
  margin: 3px;
  border: solid 1px #666666;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px;
  cursor: pointer;
}

.cur-size-title {
  width: 15px;
  height: 15px;
  line-height: 15px;
  /* border: solid 1px #666666; */
  margin: 3px;
  text-align: center;
}

.cur-size-bei {
  transition: all 1s;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(45deg);
}

.cur-size-bei:hover {
  margin-left: 10px;
  transform: rotateX(0deg);
  transform: scale(1.1);
}

.cur-size-bei:hover + div {
  margin-left: 0px;
}

.cur-margin-left {
  margin-left: -100px;
}

.cur-hr {
  width: 100%;
  position: relative;
  border-top: 4px solid #666666;
  height: 1px;
  margin: 5px 0;
}

.slide-fade-leave-active,
.slide-fade-enter-active {
  transition: all 1s;
}
.slide-fade-enter, .slide-fade-leave-to
			/* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
  transform: translateX(-10px);
  transform: rotateX(-30deg) rotateY(45deg);
  opacity: 0;
}
</style>