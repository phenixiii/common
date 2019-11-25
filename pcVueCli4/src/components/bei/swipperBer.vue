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
          slidesPerView: 5,
          spaceBetween: 10,
          slideToClickedSlide: true,
          centeredSlides : true,
          initialSlide :2,

      },

      beiList: [],
      start: 0,
      end: 0,
      count: 5,
      curSeat: null
    };
  },
  methods:{
    getSeat(ret){
      this.curSeat = ret;
    }
  },
  mounted() {

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