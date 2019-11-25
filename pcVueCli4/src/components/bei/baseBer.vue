<template>
  <div class="aui-padded-15">
    <div
      class="aui-flex-col aui-flex-center aui-flex-middle"
      style="display: -webkit-box;overflow: hidden;"
    >
      <div class="cur-size-bei" v-if="item.topData">
        <div class="aui-border aui-bg-default aui-padded-15">
          <div class="aui-text-right aui-margin-b-10">
            <div class="aui-label aui-label-outlined aui-font-size-20 cur-bold">{{item.title}}</div>
          </div>

          <div class="aui-flex-col aui-flex-center" v-for="i in item.topData.vTitle" :key="i">
            <div class="cur-size-title">{{i}}</div>
            <div
              class="cur-size-wei"
              :class="currentSeat == item.key + ':' + i +':' + j?'aui-bg-danger':''"
              v-for="j in item.topData.hTitle"
              @click="selectSeat(i,j)"
              :key="j"
            ></div>
          </div>
          
          <div class="aui-flex-col">
            <div class="cur-size-title"></div>
            <div class="cur-size-title" v-for="j in item.topData.hTitle" :key="j">{{j}}</div>
          </div>

          <div class="cur-hr"></div>

          <div class="aui-flex-col">
            <div class="cur-size-title"></div>
            <div class="cur-size-title" v-for="j in item.bottomData.hTitle" :key="j">{{j}}</div>
          </div>

          <div class="aui-flex-col aui-flex-center" v-for="i in item.bottomData.vTitle" :key="i">
            <div class="cur-size-title">{{i}}</div>
            <div
              class="cur-size-wei"
              :class="currentSeat == item.key + ':' + i +':' + j?'aui-bg-danger':''"
              v-for="j in item.bottomData.hTitle"
              @click="selectSeat(i,j)"
              :key="j"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      currentSeat : ''
    }
  },
  watch:{
    seat(val){
       this.currentSeat = val;
    }
  },
  props: {
    //当前位置，可由父组件传入，如初始化、修改列表等
    seat:{
      type: String,
      default: ''
    },
    //当个倍位数据结构
    item: {
      type: Object,
      default: () => {
        return {
          title: "16贝",
          key: '16',
          topData: {
            vTitle: ["86", "84", "82"],
            hTitle: ["06", "04", "02", "00", "01", "03", "05"]
          },
          bottomData: {
            vTitle: ["08", "06", "04", "02"],
            hTitle: ["06", "04", "02", "00", "01", "03", "05"]
          }
        };
      }
    }
  },
  methods: {
    selectSeat: function(i, j) {
      if(this.currentSeat == this.item.key + ':' + i + ":" + j)
        this.currentSeat = null;
      else
        this.currentSeat = this.item.key + ':' + i + ":" + j;

      this.$emit("click", this.currentSeat);    
    }
  },
  mounted: function() {

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
  border: solid 1px transparent;
  margin: 3px;
  text-align: center;
}

.cur-bold{
  font-weight: bold;
}

.cur-hr {
  position: relative;
  border-top: 4px solid #666666;
  height: 1px;
  margin: 5px 0px;
}

input {
  text-align: center;
  padding: 0 3px !important;
}
</style>