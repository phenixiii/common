<template>
  <!-- swiper -->
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(item,i) in swiperSlides" :key="i">
      <base-ber :item="item" :seat="seat" @toSeat="getSeat"></base-ber>
    </swiper-slide>
  </swiper>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import baseBer from "./baseBer.vue";

export default {
  components: {
    swiper,
    swiperSlide,
    baseBer
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 5,
        slideToClickedSlide: true,
        centeredSlides: true,
        initialSlide: this.curBer,
        observer: true /*启动动态检查器，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。*/,
        observeParents: true /*将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。*/
      },
      seat:null,
    };
  },
  props: {
    curSeat: {
      type: String,
      default: null
    },
    swiperSlides: {
      type: Array,
      default: () => {
        let arr = [];
        for (let i = 5; i < 10; i++) {
          let bei = {
            title: i + 1 + "贝",
            key: i + 1,
            topData: {
              vTitle: ["86", "84", "82"],
              hTitle: ["06", "04", "02", "00", "01", "03", "05"]
            },
            bottomData: {
              vTitle: ["08", "06", "04", "02"],
              hTitle: ["06", "04", "02", "00", "01", "03", "05"]
            },
            existData: [i + 1 + ":84:03", i + 1 + ":06:05"]
          };
          arr.push(bei);
        }

        return arr;
      }
    },
    curBer:{
      type: Number,
      default: 0
    }
  },
  watch:{
    curSeat(val){
      if(val != null){
        this.seat=val;
      }   
    },
    curBer(val){
      if(val != null){
        this.swiper.slideTo(val);
      }       
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    getSeat(ret) {
      this.seat = ret;
      
      this.$emit('toSeat',ret);
    },
  },
  mounted() {
     this.seat=this.curSeat;
  }
};
</script>

<style scoped>
.swiper-slide {
  transition: 300ms;
  transform: scale(0.8);
}
.swiper-slide-active,
.swiper-slide-duplicate-active {
  transform: scale(1);
}
</style>