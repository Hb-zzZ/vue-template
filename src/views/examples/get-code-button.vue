<template>
  <div class="example-wrap">
    <div class="example-inner">
      <get-code-button
        code-key="testKey"
        :disabled.sync="disabled"
        class="button-size"
        @getCode="getCode"
      />
    </div>
  </div>
</template>

<script>
import { GetCodeButton } from '@/components'

export default {
  components: {
    GetCodeButton
  },
  data() {
    return {
      disabled: false
    }
  },
  methods: {
    getCode() {
      // 发送验证码操作
      this.disabled = true
      this.$message.info(`发送成功！`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './layout.scss';

.button-size {
  width: 120px;
  height: 38px;
}
</style>