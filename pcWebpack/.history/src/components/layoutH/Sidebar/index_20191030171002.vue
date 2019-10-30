<template>
  <div class="aui-flex-col">
    <div class="aui-flex-item-2">
      <logo v-if="showLogo" />
    </div>
    <div class="aui-flex-item-10 aui-flex-col aui-flex-right">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="horizontal"
      >
        <template v-for="item in routes">
          <template v-if="item.isShow">
            <!-- <el-menu-item v-if="item.children == null" :index="item.path" :key="item.path">
              <template slot="title" v-if="item.meta">
                <i class="aui-margin-r-20" :class="item.meta && item.meta.icon"></i>
                <span class="d-tit" slot="title">{{item.meta.title}}</span>
              </template>
            </el-menu-item>-->

            <el-submenu :key="item.path" :index="item.path" class="submenu-title-noDropdown">
              <template slot="title" v-if="item.meta">
                <i class="aui-margin-r-20" :class="item.meta && item.meta.icon"></i>
                <span class="d-tit" slot="title">{{item.meta.title}}</span>
              </template>
              <template v-for="li in item.children">
                <router-link :to="item.path + '/' + li.path" :key="item.path + '/' + li.path">
                  <el-menu-item :index="li.path" :key="li.path">
                    <template slot="title" v-if="li.meta">
                      <i :class="childIcon"></i>
                      <span class="d-tit" slot="title">{{li.meta.title}}</span>
                    </template>
                  </el-menu-item>
                </router-link>
              </template>
            </el-submenu>
          </template>
        </template>

        <el-menu-item class="el-menu-item" @click="toLogin">
          <template slot="title">
            {{loginUserName}}
            <i class="iconfont icon-signout"></i>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import p from "path";
import { mapGetters } from "vuex";
import Logo from "./Logo";
import { isExternal } from "@/utils/validate";
import variables from "@/styles/variables.scss";

export default {
  components: { Logo },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    loginUserName(){
      return jsTools.userNumber();
    } 
  },
  methods:{
    toLogin: function() {
      jsTools.Alertify.confirm({
        title: "提示",
        message: "是否要退出？",
        callback: () => {
           jsTools.SessionStorage.removeVal(
            jsTools.Res.userNumber
          );
          this.$router.push("/");
        }
      });
    }
  }
};
</script>
