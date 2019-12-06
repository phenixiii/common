<template>
  <div>
    <div class="aui-flex-col">
      <div class="aui-flex-item-3">
        <panel>
          <span slot="title">
            <div class="aui-flex-col">
              <div class="aui-flex-item-6 cur-bold">桥吊区</div>
              <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-flex-right">
                <el-switch v-model="showImage" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                <i
                  class="el-icon-edit-outline cur-icon transfrom-active aui-padded-l-15"
                  @click="dialogVisible = true"
                ></i>
              </div>
            </div>
          </span>

          <qclist
            slot="content"
            :class="showImage ? 'aui-text-center':''"
            :datas="selectList"
            :show-image="showImage"
          ></qclist>
        </panel>

        <panel style="min-height:640px">
          <span slot="title" class="cur-bold">指令区</span>
          <order slot="content" :datas="orderList" @select="getItem"></order>
        </panel>
      </div>
      <div class="aui-flex-item-9">
        <panel style="min-height:700px;overflow-x:hidden">
          <span slot="title" class="cur-bold">作业区</span>

          <transition slot="content" name="fade-transform" mode="out-in">
            <div v-show="isShow">

              <swipper-ber :cur-seat="currentSeat" :cur-ber="3" @toSeat="refSeat"></swipper-ber>
              
              <div class="aui-flex-col aui-border-t aui-padded-t-15">
                <div class="aui-flex-item-7">
                  <photo></photo>
                </div>
                <div class="aui-flex-item-5">
                  <task :data="task" @send="sendMsg"></task>
                </div>
              </div>
            </div>
          </transition>
        </panel>
      </div>
    </div>

    <el-dialog v-el-drag-dialog :visible.sync="dialogVisible" title="桥吊选择">
      <div class="aui-flex-col">
        <div class="aui-flex-item-3 aui-padded-15" v-for="(item,i) in machineList" :key="i">
          <div
            class="cur-card"
            :class="selectList.indexOf(item) >= 0 ? 'select':'' "
            @click="toggle(item)"
          >{{item.name}}</div>
        </div>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>-->
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
  name: "all",
  directives: { elDragDialog },
  data() {
    return {
      dialogVisible: false,
      orderList: [],
      machineList: [],
      selectList: [],
      task: {},
      isShow: false,
      showImage: false,
      currentSeat: '8:84:00'
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

    refSeat(ret) {      
      this.currentSeat = ret;
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
    toggle(ret) {
      let index = this.selectList.indexOf(ret);
      if (index < 0) {
        this.selectList.push(ret);
      } else {
        this.selectList.splice(index, 1);
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
        clearInterval(qcInterval);
      }
      this.machineList.push({
        name: "Q80" + i
      });
      i = i + 1;
    }, 0);

    setTimeout(() => {
      if (this.orderList.length >= 1) this.getItem(this.orderList[0]);
    }, 1500);
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

.select.cur-card {
  background: #67c23a;
  color: #ffffff;
}
</style>
