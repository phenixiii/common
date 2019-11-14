<template>
  <article id="div-body" class="d-pubBody">
    <section class="aui-flex-row aui-flex-middle d-restrainMain d-inputStyle">
      <div class="aui-flex-col aui-flex-middle aui-margin-b-20 d-li">
        <div class="aui-flex-item-4 d-name">原密码：</div>
        <div class="aui-flex-item-3 d-position-relative">
          <el-input
            :type="pwdType"
            placeholder="请输入原密码"
            v-model="ruleForm.oldPassword"
            autocomplete="off"
            style="font-size: 12px;"
            show-password
          ></el-input>
          <span
            class="iconfont d-changePwd-icon"
            :class="pwdType == 'password'? 'icon-eyes-close': 'icon-eyes-open'"
            @click="changePwdType()"
          ></span>
        </div>
      </div>

      <div class="aui-flex-col aui-flex-middle aui-margin-b-20 d-li">
        <div class="aui-flex-item-4 d-name">新密码：</div>
        <div class="aui-flex-item-3 d-position-relative">
          <el-input
            :type="pwdnewType"
            placeholder="请输入新密码"
            v-model="ruleForm.newPassword"
            autocomplete="off"
            style="font-size: 12px;"
            show-password
          ></el-input>
          <span
            class="iconfont d-changePwd-icon"
            :class="pwdnewType == 'password'? 'icon-eyes-close': 'icon-eyes-open'"
            @click="changePwdnewType()"
          ></span>
        </div>
      </div>

      <div class="aui-flex-col aui-flex-middle aui-margin-b-20 d-li">
        <div class="aui-flex-item-4 d-name">确认密码：</div>
        <div class="aui-flex-item-3 d-position-relative">
          <el-input
            :type="pwdnewConfirmType"
            placeholder="请再次输入新密码"
            v-model="ruleForm.confirmPassword"
            autocomplete="off"
            style="font-size: 12px;"
            show-password
          ></el-input>
          <span
            class="iconfont d-changePwd-icon"
            :class="pwdnewConfirmType == 'password'? 'icon-eyes-close': 'icon-eyes-open'"
            @click="changePwdnewConfirmType()"
          ></span>
        </div>
      </div>

      <div class="aui-flex-col aui-padded-t-25">
        <div class="aui-flex-item-4 d-name"></div>
        <div class="aui-flex-item-3">
          <div class="d-btn-com aui-flex-col aui-flex-middle aui-flex-center" @click="submitForm()">
            <span>确定</span>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
let userInfo = jsTools.SessionStorage.getVal("loginUser");

export default {
  data() {
    return {
      userInfo: userInfo,
      loginUserName: jsTools.userNumber(),
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      pwdType: "password", //原密码类型
      pwdnewType: "password", //新密码类型
      pwdnewConfirmType: "password" //确认新密码类型
    }
  },
  methods: {
    changePwdType: function() {
      this.pwdType = this.pwdType === "password" ? "text" : "password";
    },
    changePwdnewType: function() {
      this.pwdnewType = this.pwdnewType === "password" ? "text" : "password";
    },
    changePwdnewConfirmType: function() {
      this.pwdnewConfirmType =
        this.pwdnewConfirmType === "password" ? "text" : "password";
    },
    submitForm: function() {
      if (!this.ruleForm.oldPassword) {
        jsTools.Alertify.msgTip("error", "请输入原密码！");
        return;
      }

      if (!this.ruleForm.newPassword) {
        jsTools.Alertify.msgTip("error", "请输入新密码！");
        return;
      }

      if (!this.ruleForm.confirmPassword) {
        jsTools.Alertify.msgTip("error", "请再次输入密码！");
        return;
      }

      if (this.ruleForm.confirmPassword != this.ruleForm.newPassword) {
        jsTools.Alertify.msgTip("error", "两次密码输入不一致！");
        return;
      }

      if (this.ruleForm.oldPassword == this.ruleForm.newPassword) {
        jsTools.Alertify.msgTip("error", "新旧密码不能相同！");
        return;
      }

      var user = phAjax.userNumber;
      phAjax.changePassword(
        user,
        this.ruleForm.oldPassword,
        this.ruleForm.newPassword,
        function(xmlHttpRequest) {
          if (xmlHttpRequest.status === 200) {
            jsTools.Alertify.alert({
              title: "提示",
              message: "密码修改成功!",
              closable: true,
              callback: function() {
                jsTools.Storage.removeVal(jsTools.Res.userNumber);
                var a = document.createElement("a");
                a.href = "../index.html";
                a.click();
              }
            });
          } else {
            jsTools.onErrorFunc(xmlHttpRequest);
          }
        }
      );
    }
  }
};
</script>

<style>
.d-inputStyle .d-btn-com {
  height: 40px;
  box-sizing: border-box;
}
@media (min-width: 1918px) {
  .d-inputStyle .d-li {
    margin-bottom: 2rem !important;
  }
}
</style>

		