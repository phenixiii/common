<template>
  <!-- swiper -->
  <swiper :options="swiperOption">
    <swiper-slide v-for="(item,i) in beiList" :key="i">
      <base-ber :item="item" :seat='curSeat' @click='getSeat'></base-ber>
    </swiper-slide>
  </swiper>
</template>

<script>

import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import baseBer from "./baseBer.vue";

export default {
  name: "carrousel",
  components: {
    swiper,
    swiperSlide,
    baseBer
  },
  data() {
    return {
      swiperOption: {
          slidesPerView: 4,
          spaceBetween: 5,
          slideToClickedSlide: true,
          centeredSlides : true,
          initialSlide :2,
          observer:true,/*启动动态检查器，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。*/
          observeParents:true,/*将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。*/
      },

      beiList: [],
      start: 0,
      end: 0,
      curSeat: null
    };
  },
  methods:{
    getSeat(ret){
      this.curSeat = ret;
    }
  },
  mounted() {
    for (var i = 0; i < 10; i++) {
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
  }
};
</script>

<style scoped>

    .swiper-slide {
      transition: 300ms;
      transform: scale(0.8);
    }
	.swiper-slide-active,.swiper-slide-duplicate-active{
      transform: scale(1);
	}
  
</style>