<template>
  <div>
    <template v-if="showImage">
      <div class="cur-com cur-image">
        <div class="cur-btn" @click="close">
          <i class="el-icon-error" style="font-size: 1.4rem;"></i>
        </div>

        <div class="cur-text-p">{{data.name}}</div>
      </div>
    </template>
    <template v-else>
      <el-tag>{{data.name}}</el-tag>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          name: "Q801"
        };
      }
    },
    showImage: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    close() {
      this.$emit("close", this.data);
    }
  }
};
</script>

<style scoped>
.cur-com {
  position: relative;
  width: 100px;
  height: 100px;
  transition: all 0.5s;
  cursor: pointer;
}

.cur-com:hover {
  transform: scale(1.2);
}

.cur-btn {
  color: red;
  position: absolute;
  right: -0.7rem;
  top: -0.7rem;
  cursor: pointer;
}

.cur-image {
  width: 100px;
  height: 100px;
  background: url(../../../public/Images/exp/qc.jpg) no-repeat;
  background-size: 100% 100%;
  border-radius: 5px;
}

.cur-text-p {
  position: absolute;
  width: 100px;
  height: 25px;
  line-height: 25px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  border-radius: 0 0 5px 5px;
  text-align: center;
  bottom: 0rem;
}

.cur-text {
  width: 60px;
  height: 25px;
  line-height: 25px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  border-radius: 0 0 5px 5px;
  text-align: center;
  bottom: 0rem;
}
</style>