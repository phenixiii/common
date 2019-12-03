<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <template v-if="mode == 'page'">
        <router-view :key="key" />
      </template>
      <template v-else-if="mode == 'tab'">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </template>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    mode() {
      return this.$store.state.app.mode;
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 110px);
  width: 100%;
  height: calc(100vh - 110px); /*为适配外理*/
  position: relative;
  /* overflow: hidden; */
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
