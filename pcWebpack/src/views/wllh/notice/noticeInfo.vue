<template>
  <article id="g-notice" class="d-noticeBody">
    <header class="d-secLevel-hd d-zoom">
      <div>
        <!--<c-search-title class="d-float-right" title=""></c-search-title>-->
      </div>
      <div class="aui-flex-col aui-flex-right d-zoom">
        <div class="d-dropdown-item">
          <el-select
            v-model="model.DpId"
            clearable
            :disabled="!userInfo.isGlobal"
            placeholder="总部"
            size="mini"
            style="width: 160px;"
            filterable
            popper-class="d-selectUl-com"
            @change="getData()">
            <el-option
              v-for="item in deptmentlist"
              :key="item.DP_ID"
              :label="item.Name"
              :value="item.DP_ID"
            ></el-option>
          </el-select>
        </div>
      </div>
    </header>

    <section class="d-noticeMain">
      <div class="d-noticebd">
        <div class="ponint-lt point"></div>
        <div class="ponint-rt point"></div>
        <div class="ponint-lb point"></div>
        <div class="ponint-rb point"></div>
        <div class="d-nTit">
          <div class="inner d-font-size-35">
            公&nbsp;告
            <div class="line"></div>
          </div>
        </div>
        <c-maqtext class="d-list aui-margin-t-40" showtitle='true' :list="results.NoticeList"></c-maqtext>
      </div>
    </section>

    <div class="editfooter">
      <c-paging :results="results" @searchclick="getData"></c-paging>
    </div>
  </article>
</template>
		
<script>

import cMaqtext from '@/components/cMaqtext'
import cPaging from '@/components/cPaging'

let userInfo = jsTools.SessionStorage.getVal('loginUser');

export default {
  name: "noticeInfo",
  components:{cMaqtext,cPaging},
  data() {
    return {
      userInfo : userInfo,
      results: {
        NoticeList: []
      },
      deptmentlist: userInfo.Deptmentlist,
      model: {
        DpId: userInfo.isGlobal ? "" : userInfo.Department.DP_ID, //部门
        CurrentPage: 1
      }
    };
  },
  methods: {
    getData: function(ret) {
      //更新数据及结构初始化
      var that = this;
      if (ret) that.model.CurrentPage = ret;
      var queryData = {
        data: {
          Parameter: that.model
        },
        serviceName: jsRes.Server.TopNoticeShowService
      };

      jsTools.ajax(queryData, function(result) {
        that.results = result;
        that.results.curRecord = result.NoticeList.length;
      });
    }
  },
  mounted: function() {
    this.getData();
  }
};
</script>
