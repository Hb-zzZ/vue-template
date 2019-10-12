<template>
  <div>
    <button v-if="!getMobileCodeIng" class="link" @click.prevent="getMobileCode">获取验证码</button>
    <span v-else>
      剩余
      <i class="count-down">{{countDownCount}}秒</i>
    </span>
  </div>
</template>

<script>
const initCountDownCount = 60

export default {
  props: {
    getMobileCodeIng: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      countDownTimer: null,
      countDownCount: initCountDownCount
    }
  },
  watch: {
    getMobileCodeIng: {
      handler() {
        if (this.getMobileCodeIng) {
          this.beginCountDown()
        } else {
          this.clearCountDown()
        }
      },
      immediate: true
    }
  },
  methods: {
    getMobileCode() {
      this.$emit('getMobileCode')
    },
    beginCountDown(callback) {
      this.countDownCount = initCountDownCount
      this.$emit('update:getMobileCodeIng', true)

      if (this.countDownTimer) {
        window.clearInterval(this.countDownTimer)
      }

      this.countDownTimer = window.setInterval(() => {
        this.countDownCount -= 1

        if (this.countDownCount <= 0) {
          window.clearInterval(this.countDownTimer)
          this.$emit('update:getMobileCodeIng', false)
          callback && callback()
        }
      }, 1000)
    },
    clearCountDown() {
      window.clearInterval(this.countDownTimer)
      this.$emit('update:getMobileCodeIng', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  color: $link-color;
}
.count-down {
  color: $error-color;
}
</style>
