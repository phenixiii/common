<template>
  <div>
    <div class="aui-flex-col">
        <div class="aui-flex-col aui-flex-center aui-flex-middle cur-height aui-padded-5 aui-flex-item-3">
             <span class="cur-font">{{data.title}}</span>
        </div>
      <div class="aui-flex-col aui-flex-center aui-flex-middle cur-height aui-padded-5" v-for="(item,index) in data.imgs" :key="index" :class="item.tag == 1 ?'aui-flex-item-6':'aui-flex-item-3'">        
          <img v-if="item.url != ''" width="100%" height="100%" :src="item.url">
      </div>
    </div>
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
          imgs: [{
              url:'https://www.w3school.com.cn/i/eg_tulip.jpg',
              tag : 1,
          },{
              url:'',
              tag : 0,
          },{
              url:'https://www.w3school.com.cn/i/eg_tulip.jpg',
              tag : 0,
          },{
              url:'https://www.w3school.com.cn/i/eg_tulip.jpg',
              tag : 1,
          },{
              url:'https://www.w3school.com.cn/i/eg_tulip.jpg',
              tag : 0,
          },{
              url:'https://www.w3school.com.cn/i/eg_tulip.jpg',
              tag : 0,
          },{
              url:'https://www.w3school.com.cn/i/eg_tulip.jpg',
              tag : 1,
          },{
              url:'https://www.w3school.com.cn/i/eg_tulip.jpg',
              tag : 0,
          }]
        };
      }
    }
  }
};
</script>

<style scoped>
.cur-height{
    height: 150px;
}
.cur-font{
    font-size: 20px;
    font-weight: bold;
}
</style>