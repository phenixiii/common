<template>
  <div class="aui-flex-col" style="height:330px">
      <div class="aui-flex-item-2" style="overflow:auto;height:100%">
        <order :datas='dataList'></order>
      </div>
    <div class="aui-flex-item-10 aui-flex-col aui-flex-middle">
      <div class="aui-flex-item-7">
        <photo></photo>
      </div>
      <div class="aui-flex-item-5">
        <task></task>
      </div>
    </div>
  </div>
</template>

<script>
import task from "@/components/task"
import photo from "@/components/photo"
import order from "@/components/order"

export default {
  data(){
    return {
      dataList:[]
    }
  },
  components: {
    task,
    photo,
    order
  },
  mounted() {
      setInterval(() => {
      if( this.dataList.length >= 10)
        return;
      this.dataList.push({
        orderNo: "12123123",
        orderTm: "2019-11-28 11:11:11",
        orderQc: "Q801"
      });
    }, 1000);
  }
};
</script>
