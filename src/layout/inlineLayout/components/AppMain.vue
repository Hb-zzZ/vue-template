<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      key: ''
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        const { query, path } = this.$route

        this.key = path + query.key
      }
    }
  }
}
</script>

<style scoped lang="scss">
.app-main {
  /*50 = navbar  */
  /* min-height: calc(100vh - 50px); */
  /* padding-left: 10px; */
  width: 100%;
  position: relative;
  overflow: hidden;
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
