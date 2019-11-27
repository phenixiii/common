<template>
  <div>
    <el-popover placement="top-start" title="详细信息" width="250" trigger="hover">
      <div class="aui-flex-col">
        <div class="aui-flex-item-5">船名：</div>
        <div class="aui-flex-auto aui-text-right">{{data.vessel}}</div>
      </div>
      <div class="aui-flex-col">
        <div class="aui-flex-item-5">航次：</div>
        <div class="aui-flex-auto aui-text-right">{{data.voyage}}</div>
      </div>
      <div class="aui-flex-col">
        <div class="aui-flex-item-5">靠泊方向：</div>
        <div class="aui-flex-auto aui-text-right">{{data.direction}}</div>
      </div>
      <div class="aui-flex-col">
        <div class="aui-flex-item-5">作业量：</div>
        <div class="aui-flex-auto aui-text-right">{{data.quantity}} / {{data.total}}</div>
      </div>
       <div class="aui-flex-col">
        <div class="aui-flex-item-5">开始时间：</div>
        <div class="aui-flex-auto aui-text-right">{{data.startDt}}</div>
      </div>
      <div
        slot="reference"
        :class="data.direction == 'L'? 'cur_bg_img_l':'cur_bg_img_r'"
        @click="changeDir"
      ></div>
    </el-popover>

    <div class="aui-flex-col aui-padded-5">
      <span>作业进度：</span>
      <div class="aui-flex-auto">
        <el-progress :percentage="per" :format="format"></el-progress>
      </div>
    </div>

    <div class="aui-flex-col aui-padded-5">
      <el-tag  v-for="(item,index) in data.qcArray"
        :key="index" class="aui-margin-5" size='mini' effect="dark" type="success">{{item}}</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return{}
  },
  computed: {
    per() {
      return Math.round((this.data.quantity * 100) / this.data.total, 0);
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          vessel: "ABC",
          voyage: "12EF",
          quantity: 100,
          total: 500,
          qcArray: ["Q801", "Q802", "Q803"],
          direction: "L",
          startDt:'2019-11-27 12:12:12',


        };
      }
    }
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
    changeDir() {
      jsTools.Element.confirm(
        this,
        "您是否要修改靠泊方向？",
        () => {
          this.data.direction = this.data.direction == "L" ? "R" : "L";
          this.$emit("change", this.data);
          jsTools.Element.msgTip(this, "修改成功！", "success");
        },
        () => {
          jsTools.Element.msgTip(this, "修改失败！", "error");
        }
      );
    }
  }
};
</script>

<style scoped>
.cur_bg_img_l {
  width: 100%;
  height: 50px;
  background: url(../../assets/images/ship/blue_l.png) no-repeat;
  background-size: 100% 100%;
}

.cur_bg_img_r {
  width: 100%;
  height: 50px;
  background: url(../../assets/images/ship/blue_r.png) no-repeat;
  background-size: 100% 100%;
}
</style>