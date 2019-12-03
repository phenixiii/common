<template>
  <div class="cur-base">
    <div class="aui-flex-col aui-margin-15 aui-border-b">
       <div class="aui-flex-item-12 aui-margin-b-15">
        <span>指令编号：</span>
        <span class="cur-bold">{{data.orderNo}}</span>
      </div>
      <div class="aui-flex-item-6 aui-margin-b-15">
        <span>船名：</span>
        <span>{{data.vessel}}</span>
      </div>
      <div class="aui-flex-item-6 aui-margin-b-15">
        <span>航次：</span>
        <span>{{data.voyage}}</span>
      </div>
      <div class="aui-flex-item-6 aui-margin-b-15">
        <span>倍位：</span>
        <span>{{data.ber}}</span>
      </div>
      <div class="aui-flex-item-6 aui-margin-b-15">
        <span>船舶方向：</span>
        <span>{{data.direction}}</span>
        <i class="el-icon-edit-outline aui-padded-l-15 aui-text-info"></i>
      </div>
      <div class="aui-flex-item-6 aui-margin-b-15">
        <span>装卸类型：</span>
        <span>{{data.oadType == 0 ? '装':'卸'}}</span>
      </div>
      <div class="aui-flex-item-6 aui-margin-b-15">
        <span>船期：</span>
        <span>{{data.topsSch}}</span>
      </div>
    </div>
    <div class="aui-flex-col aui-margin-15">
      <div class="aui-flex-col aui-flex-middle aui-flex-item-6 aui-margin-b-15">
        <div class="aui-flex-item-4">
          <span>横坐标：</span>
        </div>
        <div class="aui-flex-item-8">
          <el-input v-model="data.x" :size="size"></el-input>
        </div>
      </div>
      <div class="aui-flex-col aui-flex-middle aui-flex-item-6 aui-margin-b-15">
        <div class="aui-flex-item-4">
          <span>纵坐标：</span>
        </div>
        <div class="aui-flex-item-8">
          <el-input v-model="data.y" :size="size"></el-input>
        </div>
      </div>
      <div class="aui-flex-col aui-flex-middle aui-flex-item-6 aui-margin-b-15">
        <div class="aui-flex-item-4">
          <span>箱号：</span>
        </div>
        <div class="aui-flex-item-8">
          <el-input v-model="data.ctnNo" :size="size"></el-input>
        </div>
      </div>
      <div class="aui-flex-col aui-flex-middle aui-flex-item-6 aui-margin-b-15">
        <div class="aui-flex-item-4">
          <span>箱型：</span>
        </div>
        <div class="aui-flex-item-8">
          <el-select v-model="data.ctnModel" :size="size" placeholder="请选择">
            <el-option
              v-for="(item,index) in ctnModelList"
              :key="index"
              :label="item"
              :value="index"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="aui-flex-col aui-flex-middle aui-flex-item-6 aui-margin-b-15">
        <div class="aui-flex-item-4">
          <span>箱类型：</span>
        </div>
        <div class="aui-flex-item-8">
          <el-select v-model="data.ctnType" :size="size" placeholder="请选择">
            <el-option
              v-for="(item,index) in ctnTypeList"
              :key="index"
              :label="item"
              :value="index"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div class="aui-flex-col aui-flex-middle aui-flex-item-6 aui-margin-b-15">
        <div class="aui-flex-item-4">
          <span>危标：</span>
        </div>
        <div class="aui-flex-item-8">
          <el-select v-model="data.dangerFg" :size="size" placeholder="请选择">
            <el-option
              v-for="(item,index) in typeList"
              :key="index"
              :label="item"
              :value="index"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div class="aui-flex-col aui-flex-middle aui-flex-item-6 aui-margin-b-15">
        <div class="aui-flex-item-4">
          <span>残损：</span>
        </div>
        <div class="aui-flex-item-8">
          <el-select v-model="data.damageFg" :size="size" placeholder="请选择">
            <el-option
              v-for="(item,index) in typeList"
              :key="index"
              :label="item"
              :value="index"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div class="aui-flex-col aui-flex-middle aui-flex-item-6 aui-margin-b-15">
        <div class="aui-flex-item-4">
          <span>铅封：</span>
        </div>
        <div class="aui-flex-item-8">
          <el-select v-model="data.leadFg" :size="size" placeholder="请选择">
            <el-option
              v-for="(item,index) in typeList"
              :key="index"
              :label="item"
              :value="index"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div class="aui-flex-item-12">
        <el-button style="width:100%" type="primary" :loading="false" @click="send">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ctnModelList: ["20'", "40'", "45'"],
      ctnTypeList: ["空箱", "重箱"],
      typeList: ["有", "无", "看不清"],
      size:'mini'
    };
  },
  computed: {},
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          orderNo:'1111',
          vessel: "海洋之星",
          voyage: "1219B",
          loadType: "0", //0：装，1：卸
          topsSch: "6554676",
          direction: "L",
          ber: "16贝",
          x: "100",
          y: "120",
          ctnNo: "CTN1223333",
          ctnModel: 0, //箱型号
          ctnType: 0, //箱类型
          ctnPos: "123", //箱位置
          dangerFg: 1, //危标
          damageFg: 1, //残损
          leadFg: 1 //铅封
        };
      }
    }
  },
  methods: {
    send(){
      this.$emit('send',this.data)
    }
  }
};
</script>

<style scoped>
.cur-base {
  position: relative;
  border-radius: 5px;
  
  min-width: 300px;
}

.cur-tag {
  position: absolute;
  right: 4px;
  top: 4px;
}

.cur-bold {
  font-weight: bold;
}

div > span:nth-child(1) {
  color: #888888;
  padding-left: 10px
}

div > i {
  font-size: 1.1rem;
  cursor: pointer;
}
</style>