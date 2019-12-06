<template>
  <div>
    <panel>
      <span slot="title">
        <div class="aui-flex-col">
          <div class="aui-flex-item-6 cur-bold">桥吊区</div>
          <div class="aui-flex-item-6 aui-text-right">
            <i class="el-icon-edit-outline cur-icon transfrom-active" @click="dialogVisible = true"></i>
          </div>
        </div>
      </span>

      <qclist slot="content" :datas="selectList" :show-image = 'true'></qclist>
    </panel>

    <div class="aui-flex-col">
      <div class="aui-flex-item-3">
        <panel style="height:470px">
          <span slot="title" class="cur-bold">指令区</span>
          <order slot="content" :datas="orderList" @select="getItem"></order>
        </panel>
      </div>
      <div class="aui-flex-item-9">
        <panel style="height:470px">
          <span slot="title" class="cur-bold">作业区</span>
          <transition slot="content" name="bound-transform" mode="out-in">
            <div v-show="isShow" class="aui-flex-col">
              <div class="aui-flex-item-7">
                <photo></photo>
              </div>
              <div class="aui-flex-item-5">
                <task :data="task" @send="sendMsg"></task>
              </div>
            </div>
          </transition>
        </panel>
      </div>
    </div>

     <panel>
      <span slot="title">
       倍位区
      </span>

      <swipperBer slot="content"></swipperBer>
    </panel>

    <el-dialog v-el-drag-dialog :visible.sync="dialogVisible" title="桥吊选择">
      <div class="aui-flex-col">
        <div class="aui-flex-item-3 aui-padded-15" v-for="(item,i) in machineList" :key="i">
          <div class="cur-card" :class="selectList.indexOf(item) >= 0 ? 'select':'' " @click="toggle(item)">{{item.name}}</div>
        </div>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import panel from "@/components/panel";
import task from "@/components/task";
import photo from "@/components/photo";
import order from "@/components/order";
import qclist from "@/components/machine";
import elDragDialog from "@/directive/el-drag-dialog";
import swipperBer from "@/components/bei/swipperBer.vue";

export default {
   name:'panels',
  directives: { elDragDialog },
  data() {
    return {
      dialogVisible: false,
      orderList: [],
      machineList: [],
      selectList: [],
      task: {},
      isShow: false
    };
  },
  components: {
    panel,
    task,
    photo,
    order,
    qclist,
    swipperBer
  },
  methods: {
    getItem(ret) {
      this.task = ret;

      if (this.isShow) {
        this.isShow = false;
        setTimeout(() => {
          this.isShow = true;
        }, 500);
      } else {
        this.isShow = true;
      }
    },
    sendMsg(ret) {
      this.orderList.forEach((item, index) => {
        if (item.orderNo == ret.orderNo) {
          this.orderList.splice(index, 1);
          this.isShow = false;
          return;
        }
      });
    },
    toggle(ret){
      let index = this.selectList.indexOf(ret);
      if(index < 0){
        this.selectList.push(ret);
      }else{
        this.selectList.splice(index,1);
      }
    }
  },
  mounted() {
    let v = 1;
    let Interval = setInterval(() => {
      if (this.orderList.length >= 5) clearInterval(Interval);
      this.orderList.push({
        orderNo: "20191202-" + v,
        orderTm: "2019-11-28 11:11:11",
        orderQc: "Q801"
      });
      v = v + 1;
    }, 500);

    let i = 1;
    let qcInterval = setInterval(() => {
      if (this.machineList.length >= 15) {
        this.selectList.push(this.machineList[0]);
        clearInterval(qcInterval)
      };
      this.machineList.push({
        name: "Q80" + i
      });
      i = i + 1;
    }, 0);
  }
};
</script>

<style lang="scss" scoped>
.cur-icon {
  font-size: 1.5rem;
  cursor: pointer;
}

.cur-bold {
  font-weight: bold;
}

.cur-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #dddddd;
  border-radius: 30px;
  border: 2px;
  text-align: center;
  padding: 1rem;
  cursor: pointer;
  font-weight: bold;
}

.select.cur-card{
  background: #67C23A;
  color: #ffffff;
}
</style>
