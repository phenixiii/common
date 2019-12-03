<template>
  <div>
    <transition-group name="fade-transform-v">
      <div v-for="item in dataList" :key="item.name" class="list-transition">
        <qc :data='item' :show-image='showImage' @close="remove"></qc>
      </div>
    </transition-group>
  </div>
</template>

<script>
import qc from "./qcbase";

export default {
  components: { qc },
  data() {
    return {
      dataList: []
    };
  },
  props: {
    datas: {
      type: Array,
      default: () => {
        return [];
      }
    },
    showImage: {
      type: Boolean,
      default: true
    }
  },

  watch:{
    datas(val){
       this.dataList = val;
    }
  },

  methods: {
    remove(ret) {
      this.dataList.forEach((el, index) => {
        if (el.name == ret.name) {
            this.dataList.splice(index, 1);
             return;
        }

      });
    },
  },
  mounted(){
      this.dataList = this.datas;
  }
};
</script>

<style scoped>
.list-transition {
  transition: all 0.5s;
  display: inline-block;
  margin: 10px;
}
</style>