<template>
  <div class="login-layout flex-col-center-center w-full h-full">
    <span>user:admin</span>
    <el-button size="normal" type="save" class="submit mellow" @click="handleLogin">登录</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogin() {
      const userData = { username: 'admin', password: 'admin' }

      this.$store.dispatch('user/login', userData).then(() => {
        this.$router.push({ path: '/' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-layout {
  min-height: 100vh;
  background: rgb(50, 184, 224);
  color: $color-white;

  .el-button {
    margin-top: 40px;
  }
}
</style> 