<template>
  <div :class="classObj" class="app-wrapper">
    <div class="app-inner">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <!-- <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
        />-->
        <!-- <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        </div>-->
        <div class="app-header">
          <Breadcrumb />
        </div>
        <app-main v-loading="inlineLoading" />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { Sidebar, AppMain } from './components'
// import Hamburger from '@/components/Hamburger'
// import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'InlineLayout',
  components: {
    Sidebar,
    AppMain,
    Breadcrumb
  },
  computed: {
    inlineLoading() {
      const { type, loading } = this.$store.getters.isLoading

      if (type === 'inline') {
        return loading
      } else {
        return false
      }
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  padding: $appBeside;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }

  .app-inner {
    position: relative;
    height: 100%;
    width: 100%;
    max-width: $appMaxWidth;
    margin: 0 auto;
    @include createFlex($direction: col);

    .main-container {
      padding-left: $appBeside;
      // flex: auto;
      height: 100%;
      width: calc(100% - #{$sideBarWidth});
      @include createFlex($direction: col);

      .app-main {
        // flex: auto;
        height: calc(100% - #{$appHeaderHeight + $appBeside});
        width: 100%;
        background: $main-bg;
        box-shadow: 0px 0px 14px 0px rgba(205, 205, 205, 0.5);
        border-radius: 4px;
        color: $color-black;
      }
    }
    .app-header {
      width: 100%;
      height: $appHeaderHeight;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -4px 8px 0px rgba(223, 223, 223, 0.5);
      border-radius: 4px;
      margin-bottom: $appBeside;
      @include createFlex($items: center);
    }
  }
}
.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
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
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
