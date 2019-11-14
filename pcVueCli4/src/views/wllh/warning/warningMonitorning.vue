// 报警总览

<template>
  <article id="div-body" class="d-warnOverviewBody">
    <div class="aui-flex-col aui-flex-middle aui-padded-b-20 aui-padded-l-15">
      <div class="aui-flex-item-10">
        <c-warning :notic-list="warnList"></c-warning>
      </div>
      <div v-if="isSecend && isGlobal" class="aui-flex-item-2">
        <div class="d-float-right backbutton">
          <div class="d-btn-back" @click="goback">
            <i class="el-icon-caret-left"></i>
            <span>返回</span>
          </div>
        </div>
      </div>
    </div>

    <!--多个码头总览 -->
    <section v-if="isFirst && isGlobal" class="d-index-warning">
      <div
        class="d-site-mode d-float-left"
        v-for="(item, index) in results.PierList"
        :key="index"
        @click="showNext(item)"
      >
        <div class="d-site-tit">
          <div class="d-head-middle">
            <div class="d-arrow-l"></div>
            <span class="d-tit">{{item.PierFlagCaption}}</span>
            <div class="d-arrow-r"></div>
            <div class="d-shineBg">&nbsp;</div>
          </div>
        </div>

        <div class="d-zoom d-overview-hd">
          <div class="aui-flex-item-8 aui-flex-offset-4">
            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle warning">
              <div class="d-square"></div>
              <span class="aui-padded-l-15">警告</span>
            </div>
            <div class="aui-flex-item-6 aui-flex-col aui-flex-middle danger">
              <div class="d-square"></div>
              <span class="aui-padded-l-15">报警</span>
            </div>
          </div>
        </div>

        <div class="d-zoom d-overview-bd">
          <div class="d-warnOver-li">
            <div class="aui-flex-item-5 aui-flex-col aui-flex-middle d-height-90">
              <div class="aui-flex-col aui-flex-middle">
                <div class="d-name d-font-size-25">派工报警</div>
                <div class="d-warn-arrowBg"></div>
              </div>
            </div>
            <div class="aui-flex-item-7 aui-flex-row aui-flex-middle d-height-90">
              <div class="aui-flex-col aui-flex-middle d-warnOver-bar">
                <div class="aui-flex-col d-barWrap" :style="{width: item.progressDispathWarn}">
                  <div class="d-bar warning"></div>
                </div>
                <div class="d-barTxt">
                  <span
                    class="warning"
                    :class="item.DispathWarnCount==0?'':'aui-padded-l-15'"
                  >{{item.DispathWarnCount}}</span>
                </div>
              </div>
              <div class="aui-flex-col aui-flex-middle d-warnOver-bar aui-margin-t-10">
                <div class="aui-flex-col d-barWrap" :style="{width: item.progressDispathErr}">
                  <div class="d-bar danger"></div>
                </div>
                <div class="d-barTxt">
                  <span
                    class="danger"
                    :class="item.DispathErrCount==0?'':'aui-padded-l-15'"
                  >{{item.DispathErrCount}}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="d-warnOver-li">
            <div class="aui-flex-item-5 aui-flex-col aui-flex-middle d-height-90">
              <div class="aui-flex-col aui-flex-middle">
                <div class="d-name d-font-size-25">作业报警</div>
                <div class="d-warn-arrowBg"></div>
              </div>
            </div>
            <div class="aui-flex-item-7 aui-flex-row aui-flex-middle d-height-90">
              <div class="aui-flex-col aui-flex-middle d-warnOver-bar">
                <div class="aui-flex-col d-barWrap" :style="{width: item.progressWorkWarn}">
                  <div class="d-bar warning"></div>
                </div>
                <div class="d-barTxt">
                  <span
                    class="warning"
                    :class="item.WorkWarnCount==0?'':'aui-padded-l-15'"
                  >{{item.WorkWarnCount}}</span>
                </div>
              </div>
              <div class="aui-flex-col aui-flex-middle d-warnOver-bar aui-margin-t-10">
                <div class="aui-flex-col d-barWrap" :style="{width: item.WorkErrCount +'px'}">
                  <div class="d-bar danger"></div>
                </div>
                <div class="d-barTxt">
                  <span
                    class="danger"
                    :class="item.WorkErrCount==0?'':'aui-padded-l-15'"
                  >{{item.WorkErrCount}}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="d-warnOver-li">
            <div class="aui-flex-item-5 aui-flex-col aui-flex-middle d-height-90">
              <div class="aui-flex-col aui-flex-middle">
                <div class="d-name d-font-size-25">顶岗报警</div>
                <div class="d-warn-arrowBg"></div>
              </div>
            </div>
            <div class="aui-flex-item-7 aui-flex-row aui-flex-middle d-height-90">
              <div class="aui-flex-col aui-flex-middle d-warnOver-bar">
                <div class="aui-flex-col d-barWrap" :style="{width: item.progressReplaceWarn}">
                  <div class="d-bar warning"></div>
                </div>
                <div class="d-barTxt">
                  <span
                    class="warning"
                    :class="item.ReplaceWarnCount==0?'':'aui-padded-l-15'"
                  >{{item.ReplaceWarnCount}}</span>
                </div>
              </div>
              <div class="aui-flex-col aui-flex-middle d-warnOver-bar aui-margin-t-10">
                <div class="aui-flex-col d-barWrap" :style="{width: item.progressReplaceErr}">
                  <div class="d-bar danger"></div>
                </div>
                <div class="d-barTxt">
                  <span
                    class="danger"
                    :class="item.ReplaceErrCount==0?'':'aui-padded-l-15'"
                  >{{item.ReplaceErrCount}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 二级详情页  -->
    <section v-if="isSecend && isGlobal" class="d-level-warning">
      <div v-for="(itemLeft, idx) in detailInfo.PierList" class="d-height-100" :key="idx">
        <div class="aui-flex-col aui-padded-b-10 d-position-relative">
          <div class="aui-flex-col aui-flex-center d-warworkToggle">
            <div class="d-changeBtn" @click="toggleDp(itemLeft)" style="font-size: 1.2rem;">
              <i class="iconfont icon-switch"></i>
              &nbsp;&nbsp;{{isNowWorking?'所有工班':'当前工班'}}
            </div>
          </div>

          <div
            class="aui-flex-item-8 aui-flex-col aui-flex-center aui-flex-offset-2"
            style="position: static;"
          >
            <span class="d-tit">{{itemLeft.PierFlagCaption}}报警情况</span>
          </div>
          <div class="aui-flex-item-2 aui-flex-col d-legend-hd">
            <div class="aui-flex-item-6 aui-flex-col aui-flex-right aui-flex-middle warning">
              <div class="d-square"></div>
              <span class="aui-padded-l-15 d-font-size-25">警告</span>
            </div>
            <div class="aui-flex-item-6 aui-flex-col aui-flex-center aui-flex-middle danger">
              <div class="d-square"></div>
              <span class="aui-padded-l-15 d-font-size-25">报警</span>
            </div>
          </div>
        </div>
        <div class="d-warning-echart">
          <div class="aui-flex-row aui-flex-middle d-overview-bd">
            <div class="aui-flex-item-12 aui-flex-col d-height-100">
              <div class="aui-flex-item-7 aui-flex-col aui-flex-middle d-height-100">
                <div class="d-warnOver-li">
                  <div class="aui-flex-col aui-flex-middle d-warnItem-l">
                    <div class="aui-padded-l-15 aui-flex-col aui-flex-middle">
                      <div class="d-name d-font-size-25">派工报警</div>
                    </div>
                  </div>
                  <div class="aui-flex-row aui-flex-middle d-warnItem-r">
                    <div class="aui-flex-col aui-flex-middle d-warnOver-bar">
                      <div
                        class="aui-flex-col d-barWrap"
                        :style="{width: itemLeft.progressDispathWarn}"
                      >
                        <div class="d-bar warning"></div>
                      </div>
                      <div class="d-barTxt">
                        <span
                          class="warning"
                          :class="itemLeft.DispathWarnCount==0?'':'aui-padded-l-15'"
                        >{{itemLeft.DispathWarnCount}}</span>
                      </div>
                    </div>
                    <div class="aui-flex-col aui-flex-middle d-warnOver-bar aui-margin-t-20">
                      <div
                        class="aui-flex-col d-barWrap"
                        :style="{width: itemLeft.progressDispathErr}"
                      >
                        <div class="d-bar danger"></div>
                      </div>
                      <div class="d-barTxt">
                        <span
                          class="danger"
                          :class="itemLeft.DispathErrCount==0?'':'aui-padded-l-15'"
                        >{{itemLeft.DispathErrCount}}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-warnOver-li">
                  <div class="aui-flex-col aui-flex-middle d-warnItem-l">
                    <div class="aui-padded-l-15 aui-flex-col aui-flex-middle">
                      <div class="d-name d-font-size-25">作业报警</div>
                    </div>
                  </div>
                  <div class="aui-flex-row aui-flex-middle d-warnItem-r">
                    <div class="aui-flex-col aui-flex-middle d-warnOver-bar">
                      <div
                        class="aui-flex-col d-barWrap"
                        :style="{width: itemLeft.progressWorkWarn}"
                      >
                        <div class="d-bar warning"></div>
                      </div>
                      <div class="d-barTxt">
                        <span
                          class="warning"
                          :class="itemLeft.WorkWarnCount==0?'':'aui-padded-l-15'"
                        >{{itemLeft.WorkWarnCount}}</span>
                      </div>
                    </div>
                    <div class="aui-flex-col aui-flex-middle d-warnOver-bar aui-margin-t-20">
                      <div
                        class="aui-flex-col d-barWrap"
                        :style="{width: itemLeft.progressWorkErr}"
                      >
                        <div class="d-bar danger"></div>
                      </div>
                      <div class="d-barTxt">
                        <span
                          class="danger"
                          :class="itemLeft.WorkErrCount==0?'':'aui-padded-l-15'"
                        >{{itemLeft.WorkErrCount}}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-warnOver-li">
                  <div class="aui-flex-col aui-flex-middle d-warnItem-l">
                    <div class="aui-padded-l-15 aui-flex-col aui-flex-middle">
                      <div class="d-name d-font-size-25">顶岗报警</div>
                    </div>
                  </div>
                  <div class="aui-flex-row aui-flex-middle d-warnItem-r">
                    <div class="aui-flex-col aui-flex-middle d-warnOver-bar">
                      <div
                        class="aui-flex-col d-barWrap"
                        :style="{width: itemLeft.progressReplaceWarn}"
                      >
                        <div class="d-bar warning"></div>
                      </div>
                      <div class="d-barTxt">
                        <span
                          class="warning"
                          :class="itemLeft.ReplaceWarnCount==0?'':'aui-padded-l-15'"
                        >{{itemLeft.ReplaceWarnCount}}</span>
                      </div>
                    </div>
                    <div class="aui-flex-col aui-flex-middle d-warnOver-bar aui-margin-t-20">
                      <div
                        class="aui-flex-col d-barWrap"
                        :style="{width: itemLeft.progressReplaceErr}"
                      >
                        <div class="d-bar danger"></div>
                      </div>
                      <div class="d-barTxt">
                        <span
                          class="danger"
                          :class="itemLeft.ReplaceErrCount==0?'':'aui-padded-l-15'"
                        >{{itemLeft.ReplaceErrCount}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="aui-flex-item-5 aui-flex-col aui-flex-right d-height-100">
                <div class="d-warnOver-des aui-padded-30">
                  <div class="d-inner">
                    <p
                      v-for="(detail,d) in detailInfo.WarnList"
                      :key="d"
                      class="aui-padded-0 aui-margin-0 d-font-size-25"
                      style="line-height: 1.3;"
                    >
                      {{detail.WarnTypeCaption}}：警告
                      <span class="d-num warning">{{detail.WarnCount}}</span>次，报警
                      <span class="d-num danger">{{detail.ErrCount}}</span>次；
                      <span @click="linkTo(detail,itemLeft)" class="d-seewaring d-font-size-15">查看</span>
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 两个码头总览 -->
    <section
      v-if="!isGlobal && deptmentlist.length != 0"
      class="d-level-warning aui-flex-col aui-flex-between"
    >
      <div
        v-for="(overitem, idx) in detailInfo.PierList"
        class="d-height-100"
        :class="PierList.length == 1?'aui-flex-item-12':'aui-flex-item-6'"
        :key="idx"
      >
        <div
          class="aui-flex-col aui-flex-center d-warworkToggle"
          style="z-index: 1;"
          v-show="idx == 0"
        >
          <div class="d-changeBtn" @click="toggleDp(overitem)" style="font-size: 1.2rem;">
            <i class="iconfont icon-switch"></i>
            &nbsp;&nbsp;{{isNowWorking?'所有工班':'当前工班'}}
          </div>
        </div>

        <div class="aui-flex-col aui-padded-b-10 aui-padded-r-20">
          <div class="aui-flex-item-9 aui-flex-col aui-flex-center">
            <span class="d-tit">{{overitem.PierFlagCaption}}</span>
          </div>
          <div class="aui-flex-item-3 aui-flex-col d-legend-hd" v-show="idx == 1">
            <div class="aui-flex-item-6 aui-flex-col aui-flex-right aui-flex-middle warning">
              <div class="d-square"></div>
              <span class="aui-padded-l-15">警告</span>
            </div>
            <div class="aui-flex-item-6 aui-flex-col aui-flex-center aui-flex-middle danger">
              <div class="d-square"></div>
              <span class="aui-padded-l-15">报警</span>
            </div>
          </div>
        </div>
        <div class="d-overview-section">
          <div class="aui-flex-item-12 aui-flex-col aui-flex-middle d-height-50">
            <div class="d-warnOver-li">
              <div class="aui-flex-col aui-flex-middle d-warnItem-l">
                <div class="d-name">派工报警</div>
              </div>
              <div class="aui-flex-col aui-flex-middle d-warnItem-r">
                <div class="aui-flex-col aui-flex-middle d-warnOver-bar">
                  <div
                    class="aui-flex-col d-barWrap"
                    :style="{width: overitem.progressDispathWarn}"
                  >
                    <div class="d-bar warning"></div>
                  </div>
                  <div class="d-barTxt">
                    <span
                      class="warning"
                      :class="overitem.DispathWarnCount==0?'':'aui-padded-l-15'"
                    >{{overitem.DispathWarnCount}}</span>
                  </div>
                </div>
                <div class="aui-flex-col aui-flex-middle d-warnOver-bar aui-margin-t-20">
                  <div class="aui-flex-col d-barWrap" :style="{width: overitem.progressDispathErr}">
                    <div class="d-bar danger"></div>
                  </div>
                  <div class="d-barTxt">
                    <span
                      class="danger"
                      :class="overitem.DispathErrCount==0?'':'aui-padded-l-15'"
                    >{{overitem.DispathErrCount}}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-warnOver-li">
              <div class="aui-flex-col aui-flex-middle d-warnItem-l">
                <div class="d-name">作业报警</div>
              </div>
              <div class="aui-flex-col aui-flex-middle d-warnItem-r">
                <div class="aui-flex-col aui-flex-middle d-warnOver-bar">
                  <div class="aui-flex-col d-barWrap" :style="{width: overitem.progressWorkWarn}">
                    <div class="d-bar warning"></div>
                  </div>
                  <div class="d-barTxt">
                    <span
                      class="warning"
                      :class="overitem.WorkWarnCount==0?'':'aui-padded-l-15'"
                    >{{overitem.WorkWarnCount}}</span>
                  </div>
                </div>
                <div class="aui-flex-col aui-flex-middle d-warnOver-bar aui-margin-t-20">
                  <div class="aui-flex-col d-barWrap" :style="{width: overitem.progressWorkErr}">
                    <div class="d-bar danger"></div>
                  </div>
                  <div class="d-barTxt">
                    <span
                      class="danger"
                      :class="overitem.WorkErrCount==0?'':'aui-padded-l-15'"
                    >{{overitem.WorkErrCount}}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-warnOver-li">
              <div class="aui-flex-col aui-flex-middle d-warnItem-l">
                <div class="d-name">顶岗报警</div>
              </div>
              <div class="aui-flex-col aui-flex-middle d-warnItem-r">
                <div class="aui-flex-col aui-flex-middle d-warnOver-bar">
                  <div
                    class="aui-flex-col d-barWrap"
                    :style="{width: overitem.progressReplaceWarn}"
                  >
                    <div class="d-bar warning"></div>
                  </div>
                  <div class="d-barTxt">
                    <span
                      class="warning"
                      :class="overitem.ReplaceWarnCount==0?'':'aui-padded-l-15'"
                    >{{overitem.ReplaceWarnCount}}</span>
                  </div>
                </div>
                <div class="aui-flex-col aui-flex-middle d-warnOver-bar aui-margin-t-20">
                  <div class="aui-flex-col d-barWrap" :style="{width: overitem.progressReplaceErr}">
                    <div class="d-bar danger"></div>
                  </div>
                  <div class="d-barTxt">
                    <span
                      class="danger"
                      :class="overitem.ReplaceErrCount==0?'':'aui-padded-l-15'"
                    >{{overitem.ReplaceErrCount}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="aui-flex-item-12 aui-flex-col aui-flex-right d-height-50">
            <div class="d-warnOver-des aui-padded-30 aui-margin-l-0 aui-margin-r-0">
              <div class="d-inner">
                <div v-for="(items, sindex) in detailInfo.WarnList" :key="sindex">
                  <span v-if="overitem.PierFlag == items.PierFlag" class="d-font-size-25">
                    {{items.WarnTypeCaption}}：警告
                    <span class="d-num warning">{{items.WarnCount}}</span>次，报警
                    <span class="d-num danger">{{items.ErrCount}}</span>次；
                    <span @click="linkTo(items,overitem)" class="d-seewaring d-font-size-15">查看</span>
                    <br />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>
<script>

import cPaging from "@/components/cPaging";
import cWarning from "@/components/cWarning";

let userInfo = jsTools.SessionStorage.getVal("loginUser");

export default {
  components: { cWarning, cPaging },
  data() {
    return {
      warnList: this.$parent.warnList,
      userInfo: userInfo,
      DpId:
        userInfo.Department.DP_ID == userInfo.Department.DP_ID_ORA
          ? userInfo.Department.DP_ID
          : "", //部门
      PierFlag: null,
      IsNowShift: 0, //是否为当前工班,1:是  0:否
      results: {
        //所有码头监控的数据
        PierList: [],
        WarnList: [],
        maxValue: null //最大值
      },
      detailInfo: {
        //详情数据
        PierList: [],
        WarnList: [],
        maxValue: null //最大值
      },
      deptmentlist: userInfo.Deptmentlist,
      isFirst: true, //是否是总览
      isSecend: false, //是否是二级详情
      isGlobal: userInfo.isGlobal, //码头总览
      PierList: userInfo.PierList,
      isNowWorking: true //默认当前工班
    };
  },
  mounted: function() {
    if (this.isGlobal) {
      this.getWarnMonitor(this.DpId);
    } else {
      this.getwarnDetailList();
    }
  },
  methods: {
    goback: function() {
      this.IsNowShift = 0;
      this.getWarnMonitor();
      this.isSecend = false;
      this.isFirst = true;
    },
    linkTo: function(ret, item) {
      //跳转到
      var param = {
        page: "warningMonitor", //页面标记
        MinCreateTime: ret.MinCreateTime,
        MaxCreateTime: ret.MaxCreateTime,
        WarnParamaType: ret.WarnType, //报警类型
        PierFlag: item.PierFlag, //码头
        WarnStatus: 0,
        //						CraneNo: '',    //桥吊
        //						UserNumber: '', //人员
        fromPage: jsTools.SessionStorage.getVal("defaultPage") //当前页面
      };
      jsTools.SessionStorage.setVal(jsTools.Res.param, param);
      this.$router.push("/warning/warninglist");
    },
    toggleDp: function(item) {
      //切换
      this.isNowWorking = !this.isNowWorking;

      if (this.isNowWorking) {
        //所有
        this.IsNowShift = 0;
      } else {
        //当前工班
        this.IsNowShift = 1;
      }
      this.getwarnDetailList();
    },
    showNext: function(item) {
      this.PierFlag = item.PierFlag;
      this.isFirst = false;
      this.isSecend = true;

      this.getwarnDetailList();
    },
    getwarnDetailList() {
      //报警监控
      var dat = {
        serviceName: jsRes.Server.WarnMonitorDetailService,
        data: {
          Parameter: {
            DpId: this.DpId,
            PierFlag: this.PierFlag,
            IsNowShift: this.IsNowShift
          }
        }
      };

      jsTools.ajax(dat, result => {
        //获取报警参数里最大值
        var copyPierList = [];
        result.PierList.map(function(li) {
          copyPierList.push(
            li.DispathErrCount,
            li.DispathWarnCount,
            li.ReplaceErrCount,
            li.ReplaceWarnCount,
            li.WorkErrCount,
            li.WorkWarnCount
          );
        });

        copyPierList.sort(function(a, b) {
          return a - b;
        });
        this.detailInfo.maxValue = copyPierList[copyPierList.length - 1];

        result.PierList.map(li => {
          li.progressDispathErr =
            li.DispathErrCount == 0
              ? "0%"
              : ((li.DispathErrCount * 100) / this.detailInfo.maxValue).toFixed(
                  2
                ) + "%";
          li.progressDispathWarn =
            li.DispathWarnCount == 0
              ? "0%"
              : (
                  (li.DispathWarnCount * 100) /
                  this.detailInfo.maxValue
                ).toFixed(2) + "%";
          li.progressReplaceErr =
            li.ReplaceErrCount == 0
              ? "0%"
              : ((li.ReplaceErrCount * 100) / this.detailInfo.maxValue).toFixed(
                  2
                ) + "%";
          li.progressReplaceWarn =
            li.ReplaceWarnCount == 0
              ? "0%"
              : (
                  (li.ReplaceWarnCount * 100) /
                  this.detailInfo.maxValue
                ).toFixed(2) + "%";
          li.progressWorkErr =
            li.WorkErrCount == 0
              ? "0%"
              : ((li.WorkErrCount * 100) / this.detailInfo.maxValue).toFixed(
                  2
                ) + "%";
          li.progressWorkWarn =
            li.WorkWarnCount == 0
              ? "0%"
              : ((li.WorkWarnCount * 100) / this.detailInfo.maxValue).toFixed(
                  2
                ) + "%";
        });

        this.detailInfo = result;
      });
    },
    getWarnMonitor() {
      //报警总览
      var dat = {
        serviceName: jsRes.Server.WarnMonitorService,
        data: {
          Parameter: {
            DpId: this.DpId,
            IsNowShift: this.IsNowShift
          }
        }
      };

      jsTools.ajax(dat, result => {
        //获取报警参数里最大值
        var copyPierList = [];
        result.PierList.map(li => {
          copyPierList.push(
            li.DispathErrCount,
            li.DispathWarnCount,
            li.ReplaceErrCount,
            li.ReplaceWarnCount,
            li.WorkErrCount,
            li.WorkWarnCount
          );
        });

        copyPierList.sort(function(a, b) {
          return a - b;
        });
        this.results.maxValue = copyPierList[copyPierList.length - 1];

        result.PierList.map(li => {
          li.progressDispathErr =
            li.DispathErrCount == 0
              ? "0%"
              : ((li.DispathErrCount * 100) / this.results.maxValue).toFixed(
                  2
                ) + "%";
          li.progressDispathWarn =
            li.DispathWarnCount == 0
              ? "0%"
              : ((li.DispathWarnCount * 100) / this.results.maxValue).toFixed(
                  2
                ) + "%";
          li.progressReplaceErr =
            li.ReplaceErrCount == 0
              ? "0%"
              : ((li.ReplaceErrCount * 100) / this.results.maxValue).toFixed(
                  2
                ) + "%";
          li.progressReplaceWarn =
            li.ReplaceWarnCount == 0
              ? "0%"
              : ((li.ReplaceWarnCount * 100) / this.results.maxValue).toFixed(
                  2
                ) + "%";
          li.progressWorkErr =
            li.WorkErrCount == 0
              ? "0%"
              : ((li.WorkErrCount * 100) / this.results.maxValue).toFixed(2) +
                "%";
          li.progressWorkWarn =
            li.WorkWarnCount == 0
              ? "0%"
              : ((li.WorkWarnCount * 100) / this.results.maxValue).toFixed(2) +
                "%";
        });

        this.results = result;
      });
    }
  }
};

function max(prev, next) {
  return Math.max(prev, next);
}
</script>
    