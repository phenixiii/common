<template>
  <div style="height:100%;overflow:auto">
     <transition-group name="fade-transform-v" mode="out-in">
      <div v-for="item in datas" :key="item.orderNo" class="list-transition">       
          <order :data="item" @select="select"></order>       
      </div>
     </transition-group>
  </div>
</template>

<script>
import order from "./base";

export default {
  components: { order },
  props: {
    datas: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    select(ret){
      this.$emit('select',ret);
    }
  },
  mounted() {
    
  }
};
</script>

<style scoped>
.cur-height {
  height: 150px;
}
.cur-font {
  font-size: 20px;
  font-weight: bold;
}

.cur-pointer {
  cursor: pointer;
}

.list-transition {
  transition: all 0.5s;
  margin-bottom: 10px;
}
</style>