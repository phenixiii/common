<template>
  <div class="aui-margin-20">
    <el-button type="primary" @click="dialogTableVisible = true">
      打开一个可拖动弹出框
    </el-button>

    <el-button type="primary" @click="openWin()">
      URL
    </el-button>

    <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="TEST" @dragDialog="handleDrag">
      <el-select ref="select" v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-table :data="gridData">
        <el-table-column property="date" label="Date" width="150" />
        <el-table-column property="name" label="Name" width="200" />
        <el-table-column property="address" label="Address" />
      </el-table>
    </el-dialog>

    

    <div class="aui-margin-t-20">
      <el-button-group>
        <el-button type="info" @click="msg(0)">msgTip</el-button>
        <el-button type="info" @click="msg(1)">alert</el-button>
        <el-button type="info" @click="msg(2)">confirm</el-button>
      </el-button-group>
    </div>

    <div class="aui-margin-t-20">
      <el-button-group>
        <el-button type="primary" @click="msg(3)">ele-msgTip</el-button>
        <el-button type="primary" @click="msg(4)">ele-alert</el-button>
        <el-button type="primary" @click="msg(5)">ele-confirm</el-button>
        <el-button type="primary" @click="msg(6)">ele-notify</el-button>
      </el-button-group>
    </div>

  </div>
  
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  name: 'dialogs',
  directives: { elDragDialog },
  data() {
    return {
      dialogTableVisible: false,
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' }
      ],
      value: '',
      gridData: [{
        date: '2016-05-02',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-04',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-01',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-03',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }]
    }
  },
  methods: {
    openWin(){
      window.open('wllh.html','_blank');
    },
    handleDrag() {
      this.$refs.select.blur()
    },
    msg(index){
      switch(index){
        case 0:
          jsTools.Alertify.msgTip('success','TEST成功！',3,'top-right')
          break;
        case 1:
          jsTools.Alertify.alert({title:'提示',message:'TEST成功！',callback:function(){
            jsTools.Alertify.msgTip('success','TEST成功！');
          }})
          break;
        case 2:
           jsTools.Alertify.confirm({title:'提示',message:'TEST成功！',callback:function(){
            jsTools.Alertify.msgTip('success','TEST成功！');
          }})
          break;
        case 3:
           jsTools.Element.msgTip(this,'test sucess!', 'success');
          break;
        case 4:
           jsTools.Element.alert(this,'test success?',()=>{
            jsTools.Element.msgTip(this,'test sucess!', 'info');
          });
          break;
        case 5:
           jsTools.Element.confirm(this,'test success?',()=>{
            jsTools.Element.msgTip(this,'test sucess!', 'success');
          },()=>{
            jsTools.Element.msgTip(this,'test error!', 'error');
          });
          break;
         case 6:
           let i = Math.floor(Math.random(0,1) * 4);
           let arr = ['success','warning','info','error'];

           jsTools.Element.notify(this,'','test sucess!', arr[i]);
          break;
       
      }
    }
  }
}
</script>
