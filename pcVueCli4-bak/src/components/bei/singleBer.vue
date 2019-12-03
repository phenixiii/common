<template>
  <div>
    <base-ber :item="ber" :seat='seat' @click='getSeat'></base-ber>

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
  name: "SingleBer",

  components: {
    baseBer
  },
  data: function() {
    return {
      beiList: [],
      ber: {},
      seat:'',
      pagination: {
        currentPage: 1,
        pageSize: 1,
        totalPage: 1
      },
    };
  },
  methods: {
    select: function(i) {
      this.ber = this.beiList[this.pagination.currentPage - 1];
    },
    getSeat(ret){
      this.seat = ret;
    }
  },
  mounted: function() {
    for (var i = 0; i < 30; i++) {
      var bei = {
        title: i + 1 + "贝",
        key:i,
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

    this.ber = this.beiList[this.pagination.currentPage - 1];
  }
};
</script>