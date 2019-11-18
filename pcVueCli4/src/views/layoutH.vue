<template>
  <div :class="classObj" class="app-wrapper">
    
    <sidebar class="bar-container" />
    <div class="main-container-h">
      <div >
        <navbar v-if="!needTagsView" />
        <tags-view v-else />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>

import '@/styles/index.scss' // global css  
// import '@/styles/blue.scss'
import { Navbar, Sidebar, AppMain,TagsView } from '@/components/layoutH'

export default {
  name: 'layoutH',
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
        withoutAnimation: this.sidebar.withoutAnimation,
      }
    }
  },
  methods: {
   
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
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
