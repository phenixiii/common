<template>
  <div class="cur-base">
    <viewer :images="data.imgs">
      <div class="aui-flex-col">
        <div
          class="aui-flex-col aui-flex-center aui-flex-middle cur-height aui-padded-5 aui-flex-item-3"
        >
          <span class="cur-font">{{data.title}}</span>
        </div>
        <div
          class="aui-flex-col aui-flex-center aui-flex-middle cur-height aui-padded-5 aui-flex-item-6"
        >
          <img width="100%" height="100%" :src="data.imgs[0]" class="cur-pointer" />
        </div>
        <div
          class="aui-flex-col aui-flex-center aui-flex-middle cur-height aui-padded-5 aui-flex-item-3"
        ></div>
        <template v-for="(item,index) in data.imgs">
          <div
            class="aui-flex-col aui-flex-center aui-flex-middle cur-height aui-padded-5"
            :key="index"
            :class="index == 2 || index == 5 ?'aui-flex-item-6':'aui-flex-item-3'"
            v-if="index > 0"
          >
            <img width="100%" height="100%" :src="item" class="cur-pointer" />
          </div>
        </template>
      </div>
    </viewer>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          title: "单箱",
          imgs: [
            require("../../../public/Images/exp/2.jpg"),
            require("../../../public/Images/exp/1.jpg"),
            require("../../../public/Images/exp/2.jpg"),
            require("../../../public/Images/exp/1.jpg"),
            require("../../../public/Images/exp/1.jpg"),
            require("../../../public/Images/exp/2.jpg"),
            require("../../../public/Images/exp/1.jpg"),
          ]
        };
      }
    }
  },
  methods: {}
};
</script>

<style scoped>

.cur-base {
  position: relative;
  /* border-radius: 5px;
  background: #f5f5f5;
  border: #dddddd solid 1px;
  -webkit-box-shadow: 0 10px 5px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0 10px 5px -5px rgba(0, 0, 0, 0.2); */
  min-width: 300px;
}

.cur-height {
  height: 100px;
}
.cur-font {
  font-size: 20px;
  font-weight: bold;
}

.cur-pointer {
  cursor: pointer;
}

@media (min-width:1900px){
  .cur-height {
  height: 180px;
}
}
</style>