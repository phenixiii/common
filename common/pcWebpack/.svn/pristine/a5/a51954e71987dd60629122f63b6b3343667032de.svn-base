<template>
  <article id="d-equipment-maintain" class="d-equipkeepBody">
    <section class="d-secLevel-hd d-zoom">
      <div class="d-addWrap">
        <div class="d-btn-com" v-if="setBtnDisplay('add')" @click="addItem">
          <i class="iconfont icon-add"></i>
          <span>新增</span>
        </div>
      </div>
      <div class="d-zoom d-flex-right">
        <div class="d-dropdown-item">
          <el-select
            v-model="condition.DpId"
            clearable
            :disabled="!userInfo.isGlobal"
            placeholder="总部"
            size="mini"
            style="width: 160px;"
            popper-class="d-selectUl-com"
            filterable
          >
            <el-option
              v-for="item in deptmentlist"
              :key="item.DP_ID"
              :label="item.Name"
              :value="item.DP_ID"
            ></el-option>
          </el-select>
        </div>
        <div class="d-addWrap d-margin-l-10">
          <div class="d-btn-com" @click="search()">
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </div>
        </div>
      </div>
    </section>

    <section class="d-table-blueWrap">
      <el-table
        class
        height="100%"
        max-height="900"
        :data="bodyList"
        stripe
        size="mini"
        style="width: 100%;"
        type="index"
        row-class-name="d-tab-pub"
      >
        <el-table-column width="15"></el-table-column>
        <el-table-column label="标题" prop="Title" width="220" show-overflow-tooltip></el-table-column>
        <el-table-column label="内容" prop="Content" show-overflow-tooltip></el-table-column>
        <el-table-column
          label="接收部门"
          prop="DpName"
          width="120"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.DpName == null ? '总部' : scope.row.DpName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否置顶" width="100" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.IsTop?'是':'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发布日期"
          prop="CreateTime"
          width="160"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="开始时间"
          prop="TopStartTime"
          width="160"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="结束时间"
          prop="TopEndTime"
          width="160"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="发布人"
          prop="Creator"
          width="100"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="200" show-overflow-tooltip>
          <template slot-scope="scope" v-if="!ishabo">
            <!-- <span @click="putTop(scope.row,1)" v-if="setBtnDisplay('settop')" class="d-btnItem d-line-r">置顶</span> -->
            <span
              @click="putTop(scope.row,0)"
              v-if="scope.row.IsTop && setBtnDisplay('cancel')"
              class="d-btnItem d-line-r"
            >取消置顶</span>
            <span
              @click="editIt(scope.row)"
              v-if="setBtnDisplay('edit')"
              class="d-btnItem d-line-r"
            >编辑</span>
            <span @click="deleteItem(scope.row)" v-if="setBtnDisplay('delete')" class="d-btnItem">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <!-- 弹出框  -->
    <div class="d-popupBox" v-if="isAlert">
      <section class="d-body">
        <div class="d-popheader">
          <div v-if="flag == 1" class="d-tit">新增公告设置</div>
          <div v-if="flag == 0" class="d-tit">公告设置编辑</div>
          <span class="close" @click="closeAlert">
            <i class="iconfont icon-close"></i>
          </span>
          <div class="line"></div>
        </div>

        <div class="d-popform">
          <div class="d-padded-10">
            <div class="aui-flex-col aui-padded-r-20">
              <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
                <div class="aui-flex-item-2 d-label">接收部门：</div>
                <div class="aui-flex-item-9 d-input-hor">
                  <el-select
                    v-model="noticeDpId"
                    clearable
                    placeholder="总部"
                    size="mini"
                    class="d-width-100"
                    popper-class="d-selectUl-dialog"
                    :disabled="!userInfo.isGlobal || flag == 0"
                  >
                    <el-option
                      v-for="item in deptmentlist"
                      :key="item.DP_ID"
                      :label="item.Name"
                      :value="item.DP_ID"
                    ></el-option>
                  </el-select>
                </div>
              </div>

              <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
                <div class="d-switch">
                  <span class="d-label">是否置顶：</span>
                  <el-switch v-model="noticeItemTop"></el-switch>
                  <span class="d-label">{{noticeItemTop ? '是': '否'}}</span>
                </div>
              </div>

              <div class="aui-flex-item-6 aui-flex-col aui-flex-middle aui-margin-b-15">
                <div class="aui-flex-item-2 d-label">开始：</div>
                <div class="aui-flex-item-9 d-input-hor">
                  <el-date-picker
                    size="mini"
                    v-model="StartTimme"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    class="d-width-100"
                    prefix-icon="el-icon-date"
                    style="font-size: 12px;"
                  ></el-date-picker>
                </div>
              </div>

              <div
                class="aui-flex-item-6 aui-flex-col aui-flex-right aui-flex-middle aui-margin-b-15"
              >
                <div class="aui-flex-item-2 d-label">结束：</div>
                <div class="aui-flex-item-9 d-input-hor">
                  <el-date-picker
                    size="mini"
                    v-model="EndTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    class="d-width-100"
                    prefix-icon="el-icon-date"
                  ></el-date-picker>
                </div>
              </div>

              <div class="aui-flex-item-12 aui-flex-col aui-flex-middle aui-margin-b-15">
                <div class="aui-flex-item-1 d-label">标题：</div>
                <div class="aui-flex-item-11 d-input-hor">
                  <el-input
                    type="text"
                    placeholder
                    size="mini"
                    v-model="noticeTitle"
                    class="d-width-100"
                  ></el-input>
                </div>
              </div>

              <div class="aui-flex-item-12 aui-flex-col aui-flex-middle aui-margin-b-15">
                <div class="aui-flex-item-1 d-label">内容：</div>
                <div class="aui-flex-item-11 d-input-hor">
                  <el-input
                    type="textarea"
                    :rows="6"
                    placeholder
                    size="mini"
                    v-model="noticeContent"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-popfoot">
          <div class="d-inner">
            <div class="btn d-save" @click="save()">
              <i class="iconfont icon-save"></i>&nbsp;确定
            </div>
            <div class="btn d-cancel" @click="closeAlert">
              <i class="iconfont icon-close"></i>&nbsp;取消
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="editfooter">
      <c-paging :results="results" @searchclick="search"></c-paging>
    </div>
  </article>
</template>

<script>
import cPaging from "@/components/cPaging";

let userInfo = jsTools.SessionStorage.getVal("loginUser");

let vm = {
  name: "noticeSetting",
  components: { cPaging },
  data: function() {
    return {
      userInfo: userInfo,
      StartTimme: null,
      EndTime: null,
      condition: {
        DpId: userInfo.isGlobal ? "" : userInfo.Department.DP_ID,
        CurrentPage: 1
      },
      flag: 0, //新增或者编辑判断
      //                  isReturn:false,//是否撤回
      isAlert: false, //是否显示弹出层
      ishabo: false, //权限判断
      bodyList: [],
      deptmentlist: userInfo.Deptmentlist, //Page部门
      // 绑定数据相关
      noticeDpId: userInfo.isGlobal ? "" : userInfo.Department.DP_ID,
      noticeTitle: "",
      noticeContent: "",
      noticeItmeShow: false,
      noticeItemTop: true,
      editOrAdd: 1,
      editId: 0, //需要传的ID
      results: {} // 分页参数
    };
  },
  computed: {
    saveData: function() {
      //保存的数据
      return {
        data: {
          Parameter: {
            Title: this.noticeTitle,
            Content: this.noticeContent,
            IsTop: this.noticeItemTop ? 1 : 0,
            DpId: this.noticeDpId,
            TopStartTime: this.StartTimme,
            TopEndTime: this.EndTime
          },
          ResultModel: {}
        },
        serviceName: jsRes.Server.NoticeInsertService
      };
    },
    editData: function() {
      //编辑的数据
      return {
        data: {
          Parameter: {
            Title: this.noticeTitle,
            Content: this.noticeContent,
            IsTop: this.noticeItemTop ? 1 : 0,
            DpId: this.noticeDpId,
            Id: this.editId,
            IsCancel: this.noticeItmeShow,
            TopStartTime: this.StartTimme,
            TopEndTime: this.EndTime
          },
          ResultModel: {}
        },
        serviceName: jsRes.Server.NoticeUpdateService
      };
    }
  },
  mounted: function() {
    this.getNoticeList(this.condition);
  },
  filters: {},
  methods: {
    //根据权限设置页面按钮是否显示
    setBtnDisplay: function(code) {
      if (jsRes.getPowerButtons(code)) return true;
      else return false;
    },
    returnBack: function(item) {
      var that = this;
      jsTools.Alertify.confirm({
        title: "提示",
        message: "是否取消置顶？",
        callback: function() {
          var deletdat = {
            serviceName: jsRes.Server.NoticeCancelService,
            data: {
              Parameter: {
                Id: item.Id,
                IsCancel: 1
              }
            }
          };
          jsTools.ajax(deletdat, function(result) {
            jsTools.Alertify.msgTip("success", result);
            that.getNoticeList(vm.condition);
          });
        }
      });
    },
    putTop: function(item, ret) {
      //置顶
      var that = this;
      jsTools.Alertify.confirm({
        title: "提示",
        message: ret == 1 ? "是否置顶？" : "是否取消置顶？",
        callback: function() {
          var deletdat = {
            serviceName: jsRes.Server.NoticeTopService,
            data: {
              Parameter: {
                Id: item.Id,
                IsTop: ret
              }
            }
          };
          jsTools.ajax(deletdat, function(result) {
            jsTools.Alertify.msgTip("success", result);
            that.getNoticeList(vm.condition);
          });
        }
      });
    },
    getNoticeList: function(ret) {
      //更新数据及结构初始化
      var that = this;
      var queryData = {
        title: "检索中...",
        data: {
          Parameter: ret
        },
        serviceName: jsRes.Server.NoticeQueryService
      };

      jsTools.ajax(queryData, function(result) {
        that.results = result;
        that.results.curRecord = result.NoticeList.length;

        that.bodyList = [];
        that.initData(result.NoticeList);
        that.isAlert = false;
      });
    },
    initData: function(result) {
      //初始结构化
      var that = this;
      this.bodyList = result;
    },
    save: function() {
      //保存新增或修改
      var that = this;
      if (this.editOrAdd == 1) {
        //新增
        if (this.noticeItemTop) {
          if (!this.StartTimme) {
            jsTools.Alertify.msgTip("error", "请填入开始时间！");
            return;
          }
        }
        jsTools.ajax(this.saveData, function(result) {
          jsTools.Alertify.msgTip("success", result);
          that.getNoticeList(that.condition);
          that.closeAlert();
        });
      } else {
        //编辑
        jsTools.ajax(this.editData, function(result) {
          jsTools.Alertify.msgTip("success", result);
          that.getNoticeList(that.condition);
        });
      }
    },
    editIt: function(item, index) {
      //编辑数据
      this.flag = 0;
      //填入数据
      this.noticeDpId = item.DpId;
      this.noticeTitle = item.Title;
      this.noticeContent = item.Content;
      this.noticeItemTop = item.IsTop;
      this.noticeItmeShow = item.IsCancel;
      this.StartTimme = item.TopStartTime;
      this.EndTime = item.TopEndTime;
      this.editOrAdd = 2;
      this.editId = item.Id;
      //                  this.isReturn = true;
      this.isAlert = true;
    },
    deleteItem: function(item, index) {
      //删除数据
      var that = this;
      jsTools.Alertify.confirm({
        title: "提示",
        message: "是否删除该记录？",
        callback: function() {
          var deletdat = {
            serviceName: jsRes.Server.NoticeDeleteService,
            data: {
              Parameter: item.Id
            }
          };
          jsTools.ajax(deletdat, function(result) {
            jsTools.Alertify.msgTip("success", result);
            that.getNoticeList(that.condition);
          });
        }
      });
    },
    inputRest: function() {
      //              	this.noticeDpId = '';
      this.StartTimme = null;
      this.EndTime = null;
      this.noticeTitle = "";
      this.noticeContent = "";
      this.noticeItemTop = true;
    },
    addItem: function() {
      //新增数据
      this.inputRest();
      this.flag = 1;
      //                  this.isReturn = false;
      this.isAlert = true;
      this.editOrAdd = 1;
    },
    closeAlert: function() {
      this.inputRest();
      this.isAlert = false;
    },
    click: function() {
      this.$emit("click");
    },
    search: function(ret) {
      if (ret == null) ret = 1;
      this.condition.CurrentPage = ret;
      this.getNoticeList(this.condition);
    }
  }
};

export default vm;
</script>		

	<style>
.d-equipkeepBody .d-input-hor .el-switch {
  padding: 0 5px 0 3px;
}
</style>