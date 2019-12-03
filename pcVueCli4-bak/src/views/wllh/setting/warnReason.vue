// 报警原因
<template>
  <article id="div-body" class="d-equipkeepBody">
    <section class="d-secLevel-hd d-zoom">
      <div class="d-addWrap">
        <div
          @click="add()"
          v-if="setBtnDisplay('add')"
          class="d-btn-com d-float-left d-margin-r-15"
        >
          <i class="iconfont icon-add"></i>
          <span>新增</span>
        </div>
      </div>
      <div class="aui-flex-item-5 d-zoom d-flex-right">
        <div class="d-dropdown-item aui-margin-r-15" style="min-width: auto;">
          <el-select
            v-model="condition.IsStop"
            clearable
            placeholder="请选择状态"
            size="mini"
            style="width: 120px;"
            popper-class="d-selectUl-com"
          >
            <el-option
              v-for="item in stateData"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div class="d-searchtime" style="width: 260px;">
          <div class="aui-flex-item-5-5">
            <el-date-picker
              size="mini"
              v-model="condition.StartTime"
              type="date"
              popper-class="d-selectUl-com"
              class="d-width-100"
              prefix-icon="el-icon-date"
              placeholder="开始日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="aui-flex-item-1 d-float-left d-text-center">
            <div style="line-height: 28px;">-</div>
          </div>
          <div class="aui-flex-item-5-5">
            <el-date-picker
              size="mini"
              v-model="condition.EndTimeReal"
              type="date"
              popper-class="d-selectUl-com"
              class="d-width-100"
              prefix-icon="el-icon-date"
              placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
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
        :data="results.WarnReasonDess"
        stripe
        size="mini"
        style="width: 100%;"
      >
        <el-table-column width="25"></el-table-column>
        <el-table-column label="报警名称" prop="Name" width="120" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="报警代码" prop="Code" width="160" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="报警解释" prop="WarnDes" show-overflow-tooltip></el-table-column>
        <el-table-column label="备注" prop="Remark" width="160" show-overflow-tooltip></el-table-column>
        <el-table-column label="是否禁用" width="120" align="center">
          <template slot-scope="scope">
            <!--{{scope.row.IsStop?'禁用':'启用'}}-->
            {{scope.row.IsStop?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          prop="CreateTime"
          width="180"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建人"
          prop="Creator"
          width="130"
          align="center"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <span
              @click="enabling(scope.row)"
              v-if="setBtnDisplay('disabled')"
              class="d-btnItem d-line-r"
            >{{scope.row.IsStop?'启用':'禁用'}}</span>
            <span @click="edit(scope.row)" v-if="setBtnDisplay('edit')" class="d-btnItem">编辑</span>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <!-- 弹出框  -->
    <div class="d-popupBox" v-if="isAlert">
      <section class="d-body">
        <div class="d-popheader">
          <div v-if="popupType == 'add'" class="d-tit">新增报警原因</div>
          <div v-if="popupType == 'edit'" class="d-tit">编辑报警原因</div>
          <span class="close" @click="closeAlert">
            <i class="iconfont icon-close"></i>
          </span>
          <div class="line"></div>
        </div>

        <div class="d-popform">
          <div class="d-padded-10">
            <!-- 新增 -->
            <div class="aui-flex-col d-padded-r-40">
              <div class="aui-flex-item-12 aui-flex-col aui-flex-middle aui-margin-b-15">
                <div class="aui-flex-item-3 d-label">报警名称：</div>
                <div class="aui-flex-item-5 d-input-hor">
                  <el-input v-if="popupType == 'add'" placeholder size="mini" v-model="model.Name"></el-input>
                  <el-input
                    v-if="popupType == 'edit'"
                    placeholder
                    size="mini"
                    v-model="model.Name"
                    :disabled="true"
                  ></el-input>
                </div>
              </div>

              <div class="aui-flex-item-12 aui-flex-col aui-flex-middle aui-margin-b-15">
                <div class="aui-flex-item-3 d-label">报警代码：</div>
                <div class="aui-flex-item-5 d-input-hor">
                  <el-input v-if="popupType == 'add'" placeholder size="mini" v-model="model.Code"></el-input>
                  <el-input
                    v-if="popupType == 'edit'"
                    placeholder
                    size="mini"
                    v-model="model.Code"
                    :disabled="true"
                  ></el-input>
                </div>
              </div>

              <div class="aui-flex-item-12 aui-flex-col aui-flex-middle aui-margin-b-15">
                <div class="aui-flex-item-3 d-label">报警解释：</div>
                <div class="aui-flex-item-8 d-input-hor">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder
                    size="mini"
                    v-model="model.WarnDes"
                  ></el-input>
                </div>
              </div>

              <div class="aui-flex-item-12 aui-flex-col aui-flex-middle">
                <div class="aui-flex-item-3 d-label">备注：</div>
                <div class="aui-flex-item-8 d-input-hor">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder
                    size="mini"
                    v-model="model.Remark"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-popfoot">
          <div class="d-inner">
            <div class="btn d-save" @click="save(model)">
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

export default {
  components: { cPaging },
  data() {
    return {
      userInfo: userInfo,
      condition: {
        IsStop: false, //是否禁用
        StartTime: null,
        EndTime: null,
        EndTimeReal: null,
        CurrentPage: 1
      },
      results: {
        WarnReasonDess: []
      },
      model: {
        WRD_ID: null,
        Name: null,
        Code: null,
        WarnDes: null,
        Remark: null,
        IsStop: false
      },
      isAlert: false,
      ishabo: false,
      popupType: "hide", //判断操作类型（新增，编辑，审核）

      stateData: [
        {
          name: "启用",
          value: false
        },
        {
          name: "禁用",
          value: true
        }
      ]
    };
  },
  mounted: function() {
    var end = new Date();
    var start = new Date();

    start.setDate(end.getDate() - 7);

    this.condition.EndTimeReal = end.format("yyyy-MM-dd");
    this.condition.StartTime = start.format("yyyy-MM-dd");

    this.getwarnReasonList();
  },
  filters: {},
  methods: {
    //根据权限设置页面按钮是否显示
    setBtnDisplay: function(code) {
      if (jsRes.getPowerButtons(code)) return true;
      else return false;
    },
    checkform: function(ret) {
      if (ret.Name == null || ret.Name == "") {
        jsTools.Alertify.msgTip("error", "请输入报警名称");
        return false;
      }

      if (ret.Code == null || ret.Code == "") {
        jsTools.Alertify.msgTip("error", "请输入报警代码");
        return false;
      }

      if (ret.WarnDes == null || ret.WarnDes == "") {
        jsTools.Alertify.msgTip("error", "请输入报警解释");
        return false;
      }

      return true;
    },
    closeAlert: function() {
      this.isAlert = false;
      this.popupType = "add";
    },
    init: function() {},
    add: function() {
      //清空
      this.model.Name = "";
      this.model.Code = "";
      this.model.WarnDes = "";
      this.model.Remark = "";
      this.isAlert = true;
      this.popupType = "add";
    },
    edit: function(item) {
      this.popupType = "edit";
      this.model = jsTools.deepCopy(item);

      this.isAlert = true;
    },
    enabling: function(item) {
      var dat = {
        serviceName: jsRes.Server.WarnReasonDesChangeAbleService,
        data: {
          Parameter: item.WRD_ID
        }
      };

      if (item.IsStop) {
        //启用
        jsTools.ajax(dat, result => {
          jsTools.Alertify.msgTip("success", "启用成功");
          this.isAlert = false;
          this.getwarnReasonList();
        });
      } else {
        //禁用
        jsTools.Alertify.confirm({
          title: "提示",
          message: "是否禁用该记录？",
          callback: () => {
            var dat = {
              serviceName: jsRes.Server.WarnReasonDesChangeAbleService,
              data: {
                Parameter: item.WRD_ID
              }
            };

            jsTools.ajax(dat, result => {
              jsTools.Alertify.msgTip("success", result);
              this.isAlert = false;
              this.getwarnReasonList();
            });
          }
        });
      }
    },
    save: function(item) {
      if (!this.checkform(item)) {
        return;
      } else {
        if (this.popupType == "add") {
          //新增
          var dat = {
            serviceName: jsRes.Server.WarnReasonDesAddService,
            data: {
              Parameter: item
            }
          };

          jsTools.ajax(dat, result => {
            jsTools.Alertify.msgTip("success", "新增成功");
            this.isAlert = false;
            this.getwarnReasonList();
          });
        } else {
          //编辑
          var dat = {
            serviceName: jsRes.Server.WarnReasonDesModifyService,
            data: {
              Parameter: item
            }
          };

          jsTools.ajax(dat, result => {
            jsTools.Alertify.msgTip("success", "编辑成功");
            this.isAlert = false;
            this.getwarnReasonList();
          });
        }
      }
    },
    search: function(ret) {
      if (ret == null) ret = 1;
      this.condition.CurrentPage = ret;
      this.getwarnReasonList();
    },
    getwarnReasonList() {
      var info = this.condition;

      if (info.StartTime > info.EndTimeReal) {
        jsTools.Alertify.msgTip("error", "开始日期不能大于结束日期！");
        return;
      }

      info.EndTime =
        info.EndTimeReal == null ? null : info.EndTimeReal.stringAddDay(1);
      var dat = {
        title: "检索中...",
        serviceName: jsRes.Server.WarnReasonDesQueryService,
        data: {
          Parameter: info
        }
      };

      jsTools.ajax(dat, result => {
        this.results = result;
        this.results.curRecord = result.WarnReasonDess.length;
      });
    }
  }
};
</script>
