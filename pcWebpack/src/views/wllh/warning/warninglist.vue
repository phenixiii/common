// 报警列表
<template>
  <article id="div-body" class="d-warningBody">
    <div class="d-secLevel-hd d-zoom">
      <div class="d-addWrap">
        <section class="d-secLevel-hd d-float-left">
          <div class="d-tit-three">
            <span>报警列表</span>
          </div>
        </section>

        <div class="d-float-left d-changeBtn aui-margin-l-40" @click="toggleDataType">
          <i class="iconfont icon-switch"></i>&nbsp;&nbsp;切换
        </div>
      </div>

      <div class="d-zoom d-flex-right">
        <div class="aui-margin-l-15 d-searchtime" style="width: 350px;">
          <div class="aui-flex-item-5-5">
            <el-date-picker
              size="mini"
              v-model="condition.CreateTimeStart"
              type="datetime"
              popper-class="d-selectUl-com"
              class="d-width-100"
              prefix-icon="el-icon-date"
              placeholder="开始日期"
            ></el-date-picker>
          </div>
          <div class="aui-flex-item-1 d-float-left d-text-center">
            <div style="line-height: 28px;">-</div>
          </div>
          <div class="aui-flex-item-5-5">
            <el-date-picker
              size="mini"
              v-model="condition.CreateTimeEnd"
              type="datetime"
              popper-class="d-selectUl-com"
              class="d-width-100"
              prefix-icon="el-icon-date"
              placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>

        <div class="d-dropdown-item" style="width: 140px;">
          <el-select
            v-model="condition.WarnParamaType"
            clearable
            placeholder="选择报警类型"
            size="mini"
            style="width: 140px;"
            filterable
            popper-class="d-selectUl-com"
          >
            <el-option
              v-for="item in WarnParamaData"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div class="d-dropdown-item">
          <el-select
            v-model="condition.PierFlag"
            clearable
            placeholder="选择码头"
            size="mini"
            style="width: 100px;"
            @change="selSpiType()"
            popper-class="d-selectUl-com"
          >
            <el-option
              v-for="item in spiData"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div class="d-dropdown-item">
          <el-select
            v-model="condition.CraneNo"
            clearable
            placeholder="选择桥机"
            size="mini"
            style="width: 90px;"
            filterable
            popper-class="d-selectUl-com"
          >
            <el-option
              v-for="item in craneAliasData"
              :key="item.CraneId"
              :label="item.CraneId"
              :value="item.CraneId"
            ></el-option>
          </el-select>
        </div>

        <div class="d-dropdown-item">
          <el-select
            v-model="condition.WarnStatus"
            clearable
            placeholder="处理状态"
            size="mini"
            style="width: 110px;"
            filterable
            popper-class="d-selectUl-com"
          >
            <el-option
              v-for="item in StatusData"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div class="d-dropdown-item" style="width: 110px;">
          <el-input v-model="condition.UserNumber" placeholder="员工工号" size="mini" clearable></el-input>
        </div>

        <div class="d-addWrap aui-margin-l-15">
          <div class="d-btn-com d-float-left" @click="search()">
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </div>
          <!--<div class="d-btn-com d-float-left aui-margin-l-15" @click="refresh()"><i class="el-icon-refresh"></i> <span>刷新</span></div>-->
          <div v-if="showBack" class="d-btn-com d-float-left aui-margin-l-15" @click="goback()">
            <i class="el-icon-caret-left"></i>
            <span>返回</span>
          </div>
        </div>
      </div>
    </div>

    <div class="d-warningMain" style="height: 93%;">
      <div
        class="d-table-noTxt"
        v-if="results.WarnInfoList.length == 0 || results.WarnInfoList == null"
      >暂无记录...</div>
      <div class="d-height-100" v-else>
        <div class="d-warningCard" v-show="dataType=='card'">
          <ul>
            <li v-for="(item,i) in results.WarnInfoList" class="d-warninglist" :key="i">
              <div
                class="aui-flex-col aui-flex-middle d-wgitem"
                :class="item.WarnClass == 1 ? 'danger' : 'warning'"
              >
                <div class="aui-flex-item-9 aui-flex-col aui-flex-middle">
                  <div
                    @click="showMore(item)"
                    class="el-icon-arrow-right aui-padded-10 d-font-size-14"
                    style="cursor: pointer;"
                  ></div>
                  <div class="d-wgicon-circle">
                    <i
                      class="iconfont"
                      :class="item.WarnParamaType == 1 ? 'icon-police' : 'icon-fault'"
                    ></i>
                  </div>
                  <span class="aui-flex-item-11 text d-font-size-14">{{item.WarnReason}}</span>
                </div>
                <div class="aui-flex-item-3 aui-flex-col aui-flex-right d-btnWrap">
                  <el-button
                    v-if="setBtnDisplay('declare') && item.ishasDeclare"
                    type="primary"
                    @click="declare(item)"
                    size="mini"
                    plain
                  >
                    <i class="iconfont icon-declare aui-padded-r-10"></i>申报
                  </el-button>
                  <el-button
                    v-if="setBtnDisplay('check') && item.ishasApproval"
                    type="primary"
                    class="aui-margin-r-5"
                    @click="approval(item)"
                    size="mini"
                    plain
                  >
                    <i class="iconfont icon-approval aui-padded-r-10"></i>审批
                  </el-button>
                  <a
                    v-if="setBtnDisplay('do') && item.WarnStatus == 0"
                    href="javascript:;"
                    @click="handle(item)"
                    class="d-btn-com aui-margin-r-5"
                  >
                    <i class="iconfont icon-arrow-rtop"></i>处理
                  </a>
                </div>
              </div>

              <div v-show="item.isDetailShow" class="aui-flex-col aui-flex-middle">
                <div class="d-warning-detail">
                  <div class="aui-flex-col aui-flex-item-12">
                    <div class="aui-flex-item-4 d-font-size-14">码头：{{item.PierFlagCaption}}</div>
                    <div class="aui-flex-item-4 d-font-size-14">桥机：{{item.CraneNo}}</div>
                    <div class="aui-flex-item-4 d-font-size-14">部门：{{item.DpName}}</div>
                    <div class="aui-flex-item-4 d-font-size-14">人员：{{item.UserName}}</div>
                    <div class="aui-flex-item-4 d-font-size-14">用户工号：{{item.UserNumber}}</div>
                    <div class="aui-flex-item-4 d-font-size-14">处理流程：{{item.HandleFlowCaption}}</div>
                    <div class="aui-flex-item-4 d-font-size-14">处理状态：{{item.WarnStatusCaption}}</div>
                    <div class="aui-flex-item-4 d-font-size-14">
                      申报人-时间：{{item.Submiter}}&nbsp;
                      <span
                        v-if="item.SubmitTime"
                      >（{{item.SubmitTime}}）</span>
                    </div>
                    <div class="aui-flex-item-4 d-font-size-14">
                      批准人-时间：{{item.Checker}}&nbsp;
                      <span v-if="item.CheckTime">（{{item.CheckTime}}）</span>
                    </div>
                    <div class="aui-flex-item-4 d-font-size-14">
                      处理人-时间：{{item.Handler}}&nbsp;
                      <span
                        v-if="item.HandleTime"
                      >（{{item.HandleTime}}）</span>
                    </div>
                    <div class="aui-flex-item-4 d-font-size-14">
                      <div class="d-float-left">处理说明：</div>
                      <div class="aui-ellipsis-1 aui-margin-r-25">{{item.HandleDes}}</div>
                    </div>
                    <div class="aui-flex-item-4 d-font-size-14">
                      <div class="d-float-left">报警原因解释：</div>
                      <div class="aui-ellipsis-1 aui-margin-r-25">{{item.WrdWarnDes}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <section v-show="dataType=='table'" class="d-table-blueWrap" style="border: 0;">
          <el-table
            class="d-scrollBar-showX"
            max-height="900"
            :data="results.WarnInfoList"
            stripe
            size="mini"
            style="width: 100%;"
            :row-class-name="tableRowClassName"
          >
            <el-table-column label="码头" prop="PierFlagCaption" width="80" align="center"></el-table-column>
            <el-table-column
              label="桥机号"
              prop="CraneNo"
              width="80"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="部门" prop="DpName" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column label="姓名" prop="UserName" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="工号" prop="UserNumber" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="报警原因" prop="WarnReason" show-overflow-tooltip></el-table-column>
            <el-table-column label="报警原因解释" prop="WrdWarnDes" show-overflow-tooltip></el-table-column>
            <el-table-column
              label="处理状态/流程"
              prop="HandleFlowCaption"
              width="120"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{scope.row.WarnStatusCaption}}/{{scope.row.HandleFlowCaption}}</span>
              </template>
            </el-table-column>
            <el-table-column label="处理说明" prop="HandleDes" show-overflow-tooltip></el-table-column>
            <el-table-column label="申报人" width="90" show-overflow-tooltip>
              <template slot-scope="scope">
                <p style="line-height: 17px">
                  {{scope.row.Submiter}}
                  <br />
                  <!--<span style="font-size: 12px;">{{scope.row.SubmitTime}}</span>-->
                </p>
              </template>
            </el-table-column>
            <el-table-column label="批准人" width="90" show-overflow-tooltip>
              <template slot-scope="scope">
                <p style="line-height: 17px">
                  {{scope.row.Checker}}
                  <br />
                  <!--<span style="font-size: 12px;">{{scope.row.CheckTime}}</span>-->
                </p>
              </template>
            </el-table-column>
            <el-table-column label="处理人" width="90" show-overflow-tooltip>
              <template slot-scope="scope">
                <p style="line-height: 17px">
                  {{scope.row.Handler}}
                  <br />
                  <!--<span style="font-size: 12px;">{{scope.row.HandleTime}}</span>-->
                </p>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="160" show-overflow-tooltip>
              <template slot-scope="scope">
                <span
                  @click="declare(scope.row,$event)"
                  v-if="setBtnDisplay('declare') && scope.row.ishasDeclare"
                  class="d-btnItem d-line-r"
                >申报</span>
                <span
                  @click="approval(scope.row,$event)"
                  v-if="setBtnDisplay('check') && scope.row.ishasApproval"
                  class="d-btnItem"
                >审批</span>
                <span
                  v-if="setBtnDisplay('do') && scope.row.WarnStatus == 0"
                  @click="handle(scope.row,$event)"
                  class="d-btnItem d-line-l"
                >处理</span>
              </template>
            </el-table-column>
          </el-table>
        </section>
      </div>
    </div>

    <!-- 弹出框  -->
    <div class="d-popupBox" v-if="isAlert">
      <section class="d-body">
        <div class="d-popheader">
          <div class="d-tit">报警处理</div>
          <span class="close" @click="closeAlert">
            <i class="iconfont icon-close"></i>
          </span>
          <div class="line"></div>
        </div>

        <div class="d-popform">
          <div class="d-padded-10">
            <!-- 处理-->
            <div class="aui-flex-col aui-flex-middle aui-margin-t-15">
              <div class="aui-flex-item-3 d-label">报警原因解释：</div>
              <div class="aui-flex-item-8 d-input-hor">
                <el-select
                  v-model="model.WrdId"
                  clearable
                  placeholder="请选择"
                  size="mini"
                  style="width: 100%;"
                  @change="selWarnReason()"
                  popper-class="d-selectUl-dialog"
                >
                  <el-option
                    v-for="item in warReaList"
                    :key="item.WRD_ID"
                    :label="item.WarnDes"
                    :value="item.WRD_ID"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="aui-flex-col aui-flex-middle aui-margin-t-15">
              <div class="aui-flex-item-3 d-label">处理说明：</div>
              <div class="aui-flex-item-8 d-input-hor">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder
                  size="mini"
                  v-model="model.HandleDes"
                ></el-input>
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

let fromPage = null;
let tag = null;

let userInfo = jsTools.SessionStorage.getVal("loginUser");

export default {
  components: { cPaging },
  data() {
    return {
      userInfo: userInfo,
      showBack: false,
      condition: {
        DpId: userInfo.isGlobal ? "" : userInfo.Department.DP_ID,
        PierFlag: null,
        CraneNo: null,
        UserNumber: null,
        WarnStatus: 0, //状态 (0: 未处理, 1:已处理)

        WarnParamaType: null, //报警类型
        CreateTimeStart: null,
        CreateTimeEnd: null,
        CreateTimeEndReal: null,
        CurrentPage: 1
      },
      results: {
        WarnInfoList: []
      },
      model: {
        WriId: null,
        Handler: null,
        HandleDes: null, //处理说明
        WrdId: null //报警解释ID
      },
      isAlert: false,

      popupType: "hide",
      spiData: jsEnum.EquipmentKeepList(userInfo), //Page码头
      craneAliasData: [], //page页桥机
      StatusData: jsEnum.warnStatus,
      WarnParamaData: jsEnum.WarnParamaType,
      warReaList: [],
      dataType: "card", //数据模式card&table

      fromSelect: false
      //                  isSelect: localStorage.getItem('isSelect'),
    };
  },
  methods: {
    //根据权限设置页面按钮是否显示
    setBtnDisplay: function(code) {
      if (jsRes.getPowerButtons(code)) return true;
      else return false;
    },
    //tab某一行添加 class
    tableRowClassName: function(row, rowIndex) {
      if (row.WarnClass === 0) {
        return "warning d-tab-pub";
      } else if (row.WarnClass === 1) {
        return "danger d-tab-pub";
      }
      return "d-tab-pub";
    },
    toggleDataType: function() {
      if (this.dataType == "card") this.dataType = "table";
      else this.dataType = "card";
    },
    showMore: function(item) {
      item.isDetailShow = !item.isDetailShow;
    },
    closeAlert: function() {
      this.isAlert = false;
      this.model.WrdId = "";
      this.popupType = "hide";
    },
    //查询条件列表
    selSpiType: function() {
      this.condition.CraneNo = "";
      if (this.condition.PierFlag == null) this.craneAliasData = [];
      else
        getCraneList(this.condition.PierFlag, lis => {
          this.craneAliasData = lis;
        });
    },
    //报警原因选择
    selWarnReason: function() {
      this.getwarnReasonList();
    },
    declare: function(item, el) {
      //申报
      //					$(el.currentTarget).addClass('on');
      if (item.ishasDeclare) {
        jsTools.Alertify.confirm({
          title: "提示",
          message: "是否要申报？",
          callback: function() {
            var dat = {
              serviceName: jsRes.Server.WarnInfoSubmitService,
              data: {
                Parameter: {
                  WriId: item.WriId
                }
              }
            };

            jsTools.ajax(dat, result => {
              jsTools.Alertify.msgTip("success", result);
              this.getwarnInfoList();
              item.ishasDeclare = false;
            });
          }
        });
      }
    },
    approval: function(item, el) {
      //审批
      //					$(el.currentTarget).addClass('on');
      if (item.ishasApproval) {
        jsTools.Alertify.confirm({
          title: "提示",
          message: "是否要审批？",
          callback: function() {
            var dat = {
              serviceName: jsRes.Server.WarnInfoCheckService,
              data: {
                Parameter: {
                  WriId: item.WriId
                }
              }
            };

            jsTools.ajax(dat, result => {
              jsTools.Alertify.msgTip("success", result);

              this.getwarnInfoList();
            });
          }
        });
      }
    },
    handle: function(item, el) {
      //处理
      //					$(el.currentTarget).addClass('on');
      this.model.Handler = "";
      this.model.HandleDes = "";
      this.model.WriId = item.WriId;
      this.getwarnReasonList();

      this.popupType = "handle";
      this.isAlert = true;
    },
    save: function(ret) {
      //处理
      //						if(this.model.WrdId == null || this.model.WrdId == '') {
      //							jsTools.Alertify.msgTip('error', '请选择报警原因解释');
      //							return;
      //						}

      var dat = {
        serviceName: jsRes.Server.WarnInfoHandleService,
        data: {
          Parameter: {
            WriId: ret.WriId,
            Handler: ret.Handler,
            HandleDes: ret.HandleDes,
            WrdId: ret.WrdId
          }
        }
      };

      jsTools.ajax(dat, result => {
        jsTools.Alertify.msgTip("success", result);
        this.isAlert = false;
        this.getwarnInfoList();
      });
    },
    search: function(ret) {
      if (ret == null) ret = 1;
      this.condition.CurrentPage = ret;
      this.getwarnInfoList();
    },
    refresh: function() {
      this.condition.CurrentPage = 1;
      this.getwarnInfoList();
    },

    goback: function() {
      if (tag != null)
        jsTools.SessionStorage.setVal(jsTools.Res.backParam, tag);

      this.$router.push("/" + fromPage.title1 + "/" + fromPage.title2);
    },
    getwarnInfoList() {
      var info = this.condition;

      //				info.CreateTimeEnd = info.CreateTimeEndReal == null ? null : info.CreateTimeEndReal.stringAddDay(1);

      var dat = {
        title: "检索中...",
        serviceName: jsRes.Server.WarnInfoQueryService,
        data: {
          Parameter: info
        }
      };

      jsTools.ajax(dat, result => {
        result.WarnInfoList.map(item => {
          item.isDetailShow = false;

          if (item.Submiter == "" || item.Submiter == null) {
            item.ishasDeclare = true;
          } else {
            item.ishasDeclare = false;
          }

          if (item.Checker == "" || item.Checker == null) {
            item.ishasApproval = true;
          } else {
            item.ishasApproval = false;
          }
        });

        this.results = result;
        this.results.curRecord = result.WarnInfoList.length;
      });
    },
    getwarnReasonList() {
      //获取报警原因列表
      var dat = {
        serviceName: jsRes.Server.GetWarnBaseDataService,
        data: {
          Parameter: 3
        }
      };

      jsTools.ajax(dat, result => {
        this.warReaList = JSON.parse(result);
      });
    }
  },
  mounted: function() {
    console.log(this.userInfo);
    if (sessionStorage.getItem("isfromSelect") == "true") {
      this.fromSelect = true;
    }

    var end = new Date();
    var start = new Date();

    start.setDate(end.getDate() - 7);
    end.setDate(end.getDate() + 1);

    this.condition.CreateTimeEnd = end.format("yyyy-MM-dd");
    this.condition.CreateTimeStart = start.format("yyyy-MM-dd");

    //接收报警参数
    var param = jsTools.SessionStorage.getVal(jsTools.Res.param);

    if (param != null) {
      fromPage = param.fromPage;
      if (param.page == "starffMonitor") {
        //接收人员监控跳转过来的参数
        tag = param.tag;

        this.condition.PierFlag = param.PierFlag; //码头
        this.condition.CraneNo = param.CraneNo; //吊桥号
        this.condition.UserNumber = param.UserNumber; //工号
        this.condition.WarnStatus = 0; //状态 (0: 未处理, 1:已处理)
        this.showBack = param.showBack;
      }

      if (param.page == "warningMonitor") {
        //接收报警总览跳转过来的参数
        this.condition.CreateTimeStart = param.MinCreateTime; //开始时间
        this.condition.CreateTimeEnd = param.MaxCreateTime; //结束时间
        this.condition.WarnParamaType = param.WarnParamaType; //报警类型
        this.condition.PierFlag = param.PierFlag; //码头
        this.condition.WarnStatus = 0; //状态 (0: 未处理, 1:已处理)
      }

      jsTools.SessionStorage.removeVal(jsTools.Res.param);
    }

    this.selSpiType();
    this.getwarnInfoList();
  }
};

function getCraneList(craneId, callback) {
  //根据码头获取桥吊
  var dat = {
    serviceName: jsRes.Server.FetchCraneService,
    data: {
      Parameter: {
        PierFlag: craneId
      }
    }
  };

  jsTools.ajax(dat, function(result) {
    callback(result.CraneList);
  });
}
</script>
