<template>
  <div style="height:100%">
    <div class="titleDiv aui-flex-col aui-flex-middle">
        
        <div>后台管理系统</div>
    </div>
    <div style="height:100%" class="aui-flex-col aui-flex-middle aui-flex-right loginPage">
      <div class="aui-flex-offset-4 aui-flex-item-4 loginDiv">
        <h3 class="aui-text-center">用户登录</h3>

        <el-form ref="loginForm" label-width="80px" class auto-complete="on" label-position="left">
          <el-form-item label="用户名">
            <el-input
              ref="username"
              v-model="loginusername"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginpassword"
              type="password"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item label="菜单类型">
            <el-radio v-model="menuPos" label="H" style="background:transparent">水平菜单</el-radio>
            <el-radio v-model="menuPos" label="V" style="background:transparent">垂直菜单</el-radio>
          </el-form-item>

          <el-form-item label="页面类型" v-if="menuPos == 'V' || menuPos == 'H'">
            <el-radio v-model="mode" label="page" style="background:transparent">page</el-radio>
            <el-radio v-model="mode" label="tab" style="background:transparent">tab</el-radio>
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="login"
          >登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { resetRouter } from "@/router/index.js";

export default {
  name: "Login",
  data() {
    return {
      loginusername: "LHB",
      loginpassword: "LHB",
      warningText: "",

      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  computed: {
    menuPos: {
      get() {
        return this.$store.state.app.menuPos;
      },
      set(val) {
        // this.$store.state.app.menuPos = val;
        this.$store.dispatch("app/changeMenuPos", { menuPos: val });
      }
    },
    mode: {
      get() {
        return this.$store.state.app.mode;
      },
      set(val) {
        this.$store.dispatch("app/changeMode", { mode: val });
      }
    }
  },
  mounted() {
    this.$store.dispatch("app/changeMenuPos", { menuPos: "H" });
  },
  methods: {
    login: function() {
      var that = this;

      jsTools.initConfig("192.18.28.235", "80");

      if (!this.loginusername) {
        this.isComplete = true;
        this.warningText = "请输入用户名";
        return;
      } else if (!this.loginpassword) {
        this.isComplete = true;
        this.warningText = "请输入密码";
        return;
      }
      jsTools.SessionStorage.setVal(jsTools.Res.userNumber, this.loginusername);
      resetRouter(this.$store.state.app.menuPos);
      // that.$router.push("/base/dialog");
      that.$router.push({
        path: "/base/dialog",
        query: {
          name: "test"
        }
      });
    }
  }
};
</script>

<style scoped>
.titleDiv {
  position: fixed;
  width: 100%;
  height: 60px;
  padding-left: 40px;
  font-size: 1.4rem;

  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
}

.loginPage {
  background: url(../assets/images/login/login.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.loginDiv {
  width: 380px;
  border: solid 1px #d6d6d6;
  padding: 20px 50px;
  margin-right: 100px;
  border-radius: 0.3rem;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px;
}
</style>
