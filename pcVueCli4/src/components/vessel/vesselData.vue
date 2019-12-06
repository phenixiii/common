<template>
  <!-- swiper -->
  <swiper :options="swiperOption" ref="myVesselData">
    <swiper-slide v-for="(data,i) in swiperSlides" :key="i">
      <el-card class="box-card">
        <div @click="linkTo(data)">
          <div class="aui-flex-col item">
            <div class="aui-flex-item-4">船名：</div>
            <div class="aui-flex-auto aui-text-right">{{data.vessel}}</div>
          </div>
          <div class="aui-flex-col item">
            <div class="aui-flex-item-4">航次：</div>
            <div class="aui-flex-auto aui-text-right">{{data.voyage}}</div>
          </div>
          <div class="aui-flex-col item">
            <div class="aui-flex-item-4">靠泊方向：</div>
            <div class="aui-flex-auto aui-text-right">{{data.direction}}</div>
          </div>
          <div class="aui-flex-col item">
            <div class="aui-flex-item-4">作业量：</div>
            <div class="aui-flex-auto aui-text-right">{{data.quantity}} / {{data.total}}</div>
          </div>
          <div class="aui-flex-col item">
            <div class="aui-flex-item-4">开始时间：</div>
            <div class="aui-flex-auto aui-text-right">{{data.startDt}}</div>
          </div>
        </div>
      </el-card>
    </swiper-slide>
  </swiper>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 5,
        slideToClickedSlide: true,
        centeredSlides: true,
        initialSlide: this.slide,
        observer: true /*启动动态检查器，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。*/,
        observeParents: true /*将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。*/
      },
      sd: null
    };
  },
  props: {
    swiperSlides: {
      type: Array,
      default: () => {
        let arr = [];
        for (let i = 0; i < 10; i++) {
          let item = {
            id: i,
            vessel: "AAA",
            voyage: "1209B",
            direction: i % 2 == 0 ? "L" : "R",
            startDt: "2019-12-04 01:01:01"
          };
          arr.push(item);
        }

        return arr;
      }
    },
    slide: {
      type: Number,
      default: 0
    }
  },
  computed: {
    swiper() {
      return this.$refs.myVesselData.swiper;
    }
  },
  watch: {
    slide(val) {
      if (val != null) {
        this.sd = val;
        this.swiper.slideTo(val);
      }
    }
  },

  methods: {
    linkTo(ret) {
      debugger;
      this.$emit("linkTo", ret);
    }
  },
  mounted() {
    this.sd = this.slide;
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

.box-card {
  cursor: pointer;
}

.title {
  font-size: 1.2rem;
}

.item {
  margin-bottom: 1rem;
  font-size: 14px;
}

.item:last-child {
  margin-bottom: 0rem;
  font-size: 14px;
}
</style>