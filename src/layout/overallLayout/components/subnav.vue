<template>
  <div class="overall-subnav">
    <el-scrollbar wrap-class="menu-wrapper">
      <el-menu
        ref="menu"
        :default-active="activeIndex"
        class="custom-el-menu"
        mode="horizontal"
        :background-color="variables.subnavBg"
        :text-color="variables.text"
        :active-text-color="variables.activeText"
        @select="handleSelect"
      >
        <el-menu-item index="Home">首页</el-menu-item>
        <el-menu-item v-if="display.async" index="xxx">xxx</el-menu-item>
        <el-menu-item index="xx">xxx</el-menu-item>
        <el-menu-item v-show="false" index="no">no</el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import variables from './variables.scss'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      variables: variables,
      activeIndex: 'Home'
    }
  },
  computed: {
    ...mapGetters(['token', 'role']),
    display() {
      const visitorMode = !this.token

      return {
        async: visitorMode || this.role.includes('async')
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.updateActiveTab()
      }
    }
  },
  methods: {
    getActiveTab() {
      const searchList = this.$route.matched
      let activeTab

      for (let i = searchList.length - 1; i >= 0; i--) {
        const item = searchList[i]

        activeTab = this.$common.lodash.get(item, 'meta.activeTab')
        if (activeTab) {
          break
        }
      }

      const filter = {
        async: 'xxx'
      }

      return filter[activeTab] || 'no'
    },
    handleSelect(key, keyPath) {
      this.$router.push({ name: key })

      this.updateActiveTab()
    },
    updateActiveTab() {
      const $menu = this.$refs['menu']
      const activeTab = this.getActiveTab()

      if ($menu) {
        $menu.activeIndex = activeTab
      } else {
        this.activeIndex = activeTab
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './variables.scss';
/deep/ .menu-wrapper {
  overflow-y: hidden !important;
  background: $subnavBg;

  .custom-el-menu {
    white-space: nowrap;

    .el-menu-item {
      float: none;
      display: inline-block;

      &:first-child {
        margin-left: 25px;
      }
      &:nth-last-child(2) {
        margin-right: 25px;
      }
    }
  }
}
/deep/ .el-scrollbar__thumb {
  background-color: rgba(255, 255, 255, 0);
}
.overall-subnav {
  @include createFlex($content: center);
  background: $subnavBg;

  .el-menu.el-menu--horizontal {
    border-bottom: none;

    > .el-menu-item {
      height: $overallSubNavHeight;
      overflow: hidden;
      line-height: $overallSubNavHeight;
      position: relative;
      border-bottom-color: transparent !important;

      &:after {
        content: '';
        position: absolute;
        bottom: 10%;
        left: 0px;
        width: 100%;
        height: 2px;
        background: transparent;
        transform: translateY(120%);
        border-radius: 3px;
        @include createTransition();
      }

      &.is-active {
        &:after {
          background: rgba(250, 217, 97, 1);
          background: linear-gradient(
            90deg,
            rgba(250, 217, 97, 1) 0%,
            rgba(247, 107, 28, 1) 100%
          );
          transform: translateY(0%);
        }
      }
    }
  }
}
</style>
