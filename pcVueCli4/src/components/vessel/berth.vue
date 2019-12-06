<template>
  <div>
    <div
      v-for="(item,index) in data"
      class="cur_border aui-flex-col"
      :key="index"
      :style="{width:per(item)}"
    >
      <div class="cur_line_s">
        <span class="cur_tag_s">{{item.start}}</span>
      </div>
      <div class="cur_line" style="width:100%">{{item.name}}</div>
      <div v-if="index + 1 == data.length" class="cur_line_e">
        <span class="cur_tag_e">{{item.end}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    per() {
      return item => {
        let width = 0;
        this.data.forEach(ret => {
          width += Math.abs(ret.end - ret.start);
        });

        let cur = Math.abs(item.end - item.start);
        return ((cur * 100) / width).toFixed(2) + "%";
      };
    }
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [
          {
            name: "特殊泊位",
            start: -200,
            end: 0
          },
          {
            name: "一泊位",
            start: 0,
            end: 120
          },
          {
            name: "二泊位",
            start: 120,
            end: 500
          },
          {
            name: "三泊位",
            start: 500,
            end: 800
          }
        ];
      }
    }
  },
  methods: {}
};
</script>

<style scoped>
.cur_border {
  float: left;
  position: relative;
}

.cur_line_s {
  border-left: 1px solid #aaaaaa;
  height: 5px;
  margin-top: -5px;
  position: absolute;
}
.cur_line {
  border-top: 1px solid #aaaaaa;
  text-align: center;
  padding: 5px;
}

.cur_line_e {
  border-left: 1px solid #aaaaaa;
  height: 5px;
  margin-top: -5px;
  right: 0px;
  position: absolute;
}

.cur_tag_s {
  position: absolute;
  margin-top: 10px;
  margin-left: -5px;
}

.cur_tag_e {
  position: absolute;
  margin-top: 10px;
  right: 0px;
}
</style>