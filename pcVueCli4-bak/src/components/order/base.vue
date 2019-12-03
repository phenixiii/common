<template>
 
    <div class=" cur-base transfrom-active" @click="select()">
      <div class="cur-tag">
        <el-tag class="aui-margin-5" size="mini" effect="dark" type="success">{{data.orderQc}}</el-tag>
      </div>
      <div class="aui-flex-col aui-margin-15">
        <span>指令编号：</span>
        <span>{{data.orderNo}}</span>
      </div>
      <div class="aui-flex-col aui-margin-15">
        <span>指令时间：</span>
        <span>{{data.orderTm}}</span>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          orderNo: "1111111111",
          orderTm: "2019-11-28 12:12:12",
          orderQc: "Q801"
        };
      }
    }
  },
  methods: {
    select(){
      this.$emit('select',this.data);
    }
  }
};
</script>

<style scoped>
.cur-base {
  position: relative;
  border-radius: 5px;
  background: #f5f5f5;
  cursor: pointer;
  border: #dddddd solid 1px;
  -webkit-box-shadow: 0 10px 5px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0 10px 5px -5px rgba(0, 0, 0, 0.2);
}

.cur-tag {
  position: absolute;
  right: 4px;
  top: 4px;
}

div.aui-flex-col>span:nth-child(1){
    color: #888888
}

</style>