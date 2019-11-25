
<template>
    <div>
        

        <base-ber></base-ber>

        <single-ber></single-ber>

        <muliti-ber></muliti-ber>

        <div class="aui-flex-col aui-flex-center">
          <carous-ber style="width:600px"></carous-ber>
        </div>
       
       <div class="aui-flex-col aui-flex-center">
          <swipper-ber></swipper-ber>
        </div>
       
    </div>
</template>


<script>


import singleBer from '@/components/bei/singleBer.vue'
import mulitiBer from '@/components/bei/mulitiBer.vue'
import baseBer from '@/components/bei/baseBer.vue'
import carousBer from '@/components/bei/carousBer.vue'
import swipperBer from '@/components/bei/swipperBer.vue'

export default {
  name: "beis",
  components: {baseBer,singleBer,mulitiBer,carousBer,swipperBer}
};
</script>

