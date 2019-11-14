<template>
  <div class="d-height-100">
    <div class="d-login">
      <div class="wrap">
        <div class="d-login-bg">&nbsp;</div>
        <div class="content">
          <h3>
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
import { resetRouter } from "@/router/index.js";

export default {
  name: "demo",

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
  mounted(){
    this.$store.dispatch('app/changeMenuPos', { menuPos: 'H' });
  },
  methods: {
    login: function() {
      var that = this;
      
      jsTools.initConfig('192.18.28.235','80');

      if (!this.loginusername) {
        this.isComplete = true;
        this.warningText = "请输入用户名";
        return;
      } else if (!this.loginpassword) {
        this.isComplete = true;
        this.warningText = "请输入密码";
        return;
      }
      jsTools.SessionStorage.setVal(jsTools.Res.userNumber,this.loginusername);
      resetRouter(this.$store.state.app.menuPos);
      // that.$router.push("/base/dialog");
      that.$router.push({
        path:"/base/dialog",
        query: {
            name: 'test'
          }
      })
      
    },
    next: function(num) {
      if (num == 1) {
        $("#loginpassword").focus();
        return;
      }
      this.login();
    },
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



