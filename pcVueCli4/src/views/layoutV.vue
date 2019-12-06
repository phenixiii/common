<template>
  <div :class="classObj" class="app-wrapper">
    
    <sidebar class="sidebar-container" />
    <div class="main-container-v" :class="{hasTagsView:needTagsView}">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>

// import '@/styles/index.scss' // global css  
import { Navbar, Sidebar, AppMain,TagsView } from '@/components/layoutV'

export default {
  name: 'layoutV',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },

  computed: {
    needTagsView(){
      let mode = this.$store.state.app.mode;
      if(mode == 'page')
        return false;
      else if(mode == 'tab')
        return true;
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.app.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
      }
    }
  },
  methods: {
   
  }
}
</script>

<style lang="scss" scoped>

  @import "~@/styles/variables.scss";

  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
