<template>

  <div style="width:300px" class="aui-padded-10">     
    <order :datas='dataList'></order>
  </div>
   
</template>

<script>
import order from "@/components/order"

export default {
  data(){
    return {
      dataList:[]
    }
  },
  components: {
    order
  },
  mounted(){
    setInterval(() => {
      if( this.dataList.length >= 5)
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
