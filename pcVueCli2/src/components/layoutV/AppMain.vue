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
  name: 'AppMain',
  computed: {
    mode(){
        return this.$store.state.app.mode;
    },

     cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

