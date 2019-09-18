<template>
  <div class="overall-wrap text-body">
    <div class="overall-header">
      <nav-bar />
      <subnav />
    </div>
    <div class="overall-container">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" v-loading="overallLoading" class="overall-main" />
      </transition>
      <copyright v-show="copyrightDisplay" key="copyright" />
    </div>
  </div>
</template>

<script>
import { copyright, navBar, subnav } from './components'

export default {
  components: {
    copyright,
    navBar,
    subnav
  },
  computed: {
    overallLoading() {
      const { type, loading } = this.$store.getters.isLoading

      if (type === 'overall') {
        return loading
      } else {
        return false
      }
    },
    key() {
      return this.$route.path
    },
    copyrightDisplay() {
      return this.$common.lodash.get(this.$route, 'meta.copyright', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.overall-wrap {
  position: relative;
  padding-top: $overallSubNavHeight + $overallNavHeight;
  height: 100%;
  width: 100%;
  color: $color-black;

  .overall-container {
    min-width: $appMaxWidth;
    background: $body-bg;
    height: 100%;
    width: 100%;
    // overflow: hidden;
    // @include createFlex($direction: col, $content: between, $items: center);
    overflow-y: auto;
    overflow-x: hidden;

    .overall-main {
      width: 100%;
      position: relative;
      margin: 0 auto;
      // height: calc(100% - #{$copyrightHeight} + 10px);
      // flex: 1 0 1;
      // @include createFlex($direction: col, $items: center);
    }

    .overall-copyright {
      height: $copyrightHeight;
    }
  }

  .overall-header {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 2002;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.28);
  }
}
</style>
