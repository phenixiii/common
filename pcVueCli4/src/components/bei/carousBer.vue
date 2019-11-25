<template>
  <el-carousel :autoplay='false' type="card" indicator-position='none'>
    <el-carousel-item v-for="(item,i) in beiList" :key="i">
      <base-ber :item="item"></base-ber>
    </el-carousel-item>
  </el-carousel>
</template>

<script>

import baseBer from './baseBer'

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
}
</script>

<style scoped>
  
  .el-carousel__item:nth-child(2n) {
    background-color: transparent;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: transparent;
  }
</style>