<template>
  <div>
    <photo :data="imgData"></photo>
  </div>
</template>

<script>
import photo from "@/components/photo";

export default {
  components: {
    photo
  },
  data() {
    return {
      imgData:{
           title: "单箱",
      imgs: [
        "https://www.w3school.com.cn/i/eg_tulip.jpg",
        "https://www.w3school.com.cn/i/eg_tulip.jpg",
        "https://www.w3school.com.cn/i/eg_tulip.jpg",
        "https://www.w3school.com.cn/i/eg_tulip.jpg",
        "https://www.w3school.com.cn/i/eg_tulip.jpg",
        "https://www.w3school.com.cn/i/eg_tulip.jpg",
        "https://www.w3school.com.cn/i/eg_tulip.jpg"
      ]
      }
     
    };
  }
};
</script>
