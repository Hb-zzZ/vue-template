<template>
  <nav class="overall-nav">
    <div class="nav-scrollwrap">
      <div class="nav">
        <div class="nav__logo">
          <svg-icon icon-class="logotubiao" />
          <div class="nav__logo--des">
            <h3 class="nav__logo--des-title">xxxx</h3>
            <!-- <p class="nav__logo--des-detail">Government Public Property Assets Service Platform</p> -->
          </div>
        </div>
        <div class="nav__info">
          <p>xxxx</p>
          <!-- <div class="nav__info--helper">
          <svg-icon icon-class="chucuozhushi" />
          <p>帮助中心</p>
          </div>-->
          <div class="nav__info--handle">
            <el-button v-if="!name" size="small" type="primary" @click="toLogin">登录/注册</el-button>
            <el-dropdown v-else class="user-info" trigger="click" placement="bottom">
              <div class="flex-row-center-center cursor-p">
                <svg-icon icon-class="morentouxiangx" class-name="user-avatar" />
                <p class="limit-user-name" :title="name">{{name}}</p>
                <i class="el-icon-caret-bottom dropdown-icon" />
              </div>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <router-link to="/">
                  <el-dropdown-item>首页</el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                  <span style="display:block;" @click="logout">退出账号</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['name', 'avater'])
  },
  methods: {
    toLogin() {
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/`)
    }
  }
}
</script>


<style lang="scss" scoped>
.user-dropdown {
  z-index: 2200 !important;
}
.overall-nav {
  $navBeside: 20px;
  background: #f9fcff;
  height: $overallNavHeight;
  width: 100%;
  overflow: hidden;

  .nav-scrollwrap {
    height: calc(100% + 18px);
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .nav {
    margin: 0 auto;
    min-width: 780px;
    height: $overallNavHeight;
    width: 100%;
    padding: 0px $navBeside;
    max-width: ($appMaxWidth + $navBeside * 2);
    @include createFlex($content: between, $items: center);

    &__logo {
      @include createFlex($items: center);

      .svg-icon {
        width: 39px;
        height: 36px;
      }

      &--des {
        margin-left: 10px;
        @include createFlex($direction: col, $content: center);

        &-title {
          font-size: $text-h6;
          margin-bottom: 2px;
          // letter-spacing: 0px;
        }
        &-detail {
          @include shrink(10 / 13);
          transform-origin: left;
        }
      }
    }

    &__info {
      @include createFlex($items: center);
      height: 100%;

      &--helper {
        @include createFlex($items: center);
        margin-left: 20px;

        .svg-icon {
          margin-right: 5px;
        }
      }

      &--handle {
        margin-left: 20px;
        height: 100%;
        @include createFlex($items: center);

        .user-info {
          height: 100%;
          @include createFlex($items: center);
          @include createTransition($mode: fast);
          background: transparent;
          padding: 0px 14px;

          &:hover {
            background: #f0f4ff;
          }

          .limit-user-name {
            @include singleOverHidden();
            max-width: 120px;
          }

          .user-avatar {
            font-size: 40px;
            margin-right: 10px;
          }

          .dropdown-icon {
            font-size: 12px;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
