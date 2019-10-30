<template>
  <div class="d-height-100">
    <div class="d-login">
      <div class="wrap">
        <div class="d-login-bg">&nbsp;</div>
        <div class="content">
          <h3 v-if="menuPos == 'D'">
            <img src="../../static/Images/logo/logo_login.png" alt="登录图片" class="d-login-logo" />
          </h3>
          <div>
            <div class="d-warning">
              <p class="warning" v-cloak>
                <span v-show="isComplete">{{warningText}}</span>
              </p>
            </div>
            <div class="d-input">
              <label for="loginusername">
                <i class="iconfont icon-login-user"></i>
              </label>
              <input
                placeholder="用户名"
                @keyup.enter="next(1)"
                type="text"
                id="loginusername"
                v-model="loginusername"
              />
            </div>
            <div class="d-input">
              <label for="loginpassword">
                <i class="iconfont icon-login-pwd"></i>
              </label>
              <input
                placeholder="密码"
                @keyup.enter="next(2)"
                type="password"
                id="loginpassword"
                v-model="loginpassword"
              />
            </div>

            <div class="d-input">
              <el-radio v-model="menuPos" label="D" style="background:transparent">demo菜单</el-radio>
              <el-radio v-model="menuPos" label="H" style="background:transparent">水平菜单</el-radio>
              <el-radio v-model="menuPos" label="V" style="background:transparent">垂直菜单</el-radio>
            </div>

             <div class="d-input" v-if="menuPos == 'V' || menuPos == 'H'">
              <el-radio v-model="mode" label="page" style="background:transparent">page</el-radio>
              <el-radio v-model="mode" label="tab" style="background:transparent">tab</el-radio>
            </div>

            <div class="d-input">
              <el-button type="primary" style="width:100%" @click="login">登录</el-button>
              <!-- <div class="assign" @click="login">登录</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import { mapGetters } from "vuex";
import { resetRouter } from "@/router";

export default {
  name: "login",

  data() {
    return {
      loginusername: "LHB",
      loginpassword: "LHB",
      warningText: "",
      isComplete: false
    };
  },
  computed: {
    menuPos:{
      get(){
        return this.$store.state.app.menuPos;
      },
      set(val){
        // this.$store.state.app.menuPos = val;
        this.$store.dispatch('app/changeMenuPos', { menuPos: val });
      }
    },
    mode:{
      get(){
        return this.$store.state.app.mode;
      },
      set(val){
        this.$store.dispatch('app/changeMode', { mode: val });
      }
    }
  },
  methods: {
    login: function() {
      var that = this;
      
      jsTools.initConfig(phAjax);

      if (!this.loginusername) {
        this.isComplete = true;
        this.warningText = "请输入用户名";
        return;
      } else if (!this.loginpassword) {
        this.isComplete = true;
        this.warningText = "请输入密码";
        return;
      }
      
      // //测试代码
      // resetRouter(this.$store.state.app.menuPos);

      //登录
      //that.$router.push('main');
      phAjax.logOn(this.loginusername, this.loginpassword, xmlHttpRequest => {
        if (xmlHttpRequest.status === 200) {
          jsTools.SessionStorage.setVal(
            jsTools.Res.userNumber,
            that.loginusername
          );
          this.getUserInfo(() => {
            that.$router.push("/notice/noticeInfo");
          });
        } else {
          that.$router.push("/base/dialog");
          jsTools.onErrorFunc(xmlHttpRequest);
        }
      });
    },
    next: function(num) {
      if (num == 1) {
        $("#loginpassword").focus();
        return;
      }
      this.login();
    },
    getUserInfo(callback) {
      var userData = {
        data: {
          Parameter: null,
          ResultModel: {}
        },
        serviceName: jsRes.Server.GetUserInfoService
      };
      jsTools.ajax(userData, function(result) {
        var userInfo = result;

        //获取部门列表
        var dat = {
          serviceName: jsRes.Server.GetBaseDataService,
          data: {
            Parameter: 0
          }
        };

        jsTools.ajax(dat, function(result) {
          //增加部门列表
          userInfo.Deptmentlist = JSON.parse(result);
          //备份传入部门ID
          userInfo.Department.DP_ID_ORA = userInfo.Department.DP_ID;

          //判断当前选中部门是否在下拉列表中
          var dp = Enumerable.From(userInfo.Deptmentlist).FirstOrDefault(
            null,
            "x=>x.DP_ID == " + userInfo.Department.DP_ID
          );
          if (dp == null) {
            userInfo.Department.DP_ID = "";
          }

          //是否是全部权限
          var deptDisable = false;
          if (
            userInfo.Department.DP_ID != "" &&
            !jsTools.Res.Debug &&
            !userInfo.Department.InHeadQuarters
          ) {
            deptDisable = true;
          } else {
            deptDisable = false;
          }
          userInfo.isGlobal = !deptDisable;

          if (userInfo.Department.DP_ID == "") {
            //如果部门为空，则初始化部门为第一个
            userInfo.Department.DP_ID = userInfo.Deptmentlist[0].DP_ID;
          }

          jsTools.SessionStorage.setVal("loginUser", userInfo);

          callback();
        });
      });
    }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}
</style>>



