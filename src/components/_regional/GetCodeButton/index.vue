<template>
  <div class="count-down-wrap">
    <button v-if="!disabled" class="link" @click.prevent="getCode">获取验证码</button>
    <span v-else>
      剩余
      <i class="count-down">{{countDownCount}}秒</i>
    </span>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    isMemory: {
      type: Boolean,
      default: true
    },
    codeKey: {
      type: [String, Boolean],
      default: false
    },
    initCount: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      countDownTimer: null,
      countDownCount: null,
      memoryCount: null
    }
  },
  computed: {
    cookieCode() {
      const { codeKey } = this

      if (codeKey) {
        return `getCode-${codeKey}-memory`
      } else {
        return null
      }
    }
  },
  watch: {
    disabled: {
      handler() {
        if (this.disabled) {
          this.beginCountDown()
        } else {
          this.clearCountDown()
        }
      },
      immediate: true
    }
  },
  created() {
    window.addEventListener('beforeunload', this.saveMemory)
    this.memoryCount = this.getMemory()
    this.memoryCount && this.$emit('update:disabled', true)
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.saveMemory)
    this.saveMemory()
  },
  methods: {
    getCode() {
      this.$emit('getCode')
    },
    beginCountDown() {
      if (this.memoryCount) {
        this.countDownCount = this.memoryCount
        this.memoryCount = null
      } else {
        this.countDownCount = this.initCount
      }

      this.$emit('update:disabled', true)

      if (this.countDownTimer) {
        window.clearInterval(this.countDownTimer)
      }

      this.countDownTimer = window.setInterval(() => {
        this.countDownCount -= 1

        if (this.countDownCount <= 0) {
          window.clearInterval(this.countDownTimer)
          this.$emit('update:disabled', false)
        }
      }, 1000)
    },
    clearCountDown() {
      window.clearInterval(this.countDownTimer)
      this.$emit('update:disabled', false)
    },
    getTimestamp() {
      return new Date().getTime()
    },
    saveMemory() {
      const { isMemory, cookieCode, disabled, countDownCount, initCount } = this

      if (isMemory && disabled) {
        if (!cookieCode) {
          throw new Error('codeKey is required')
        } else {
          if (!this.getMemory()) {
            const hasBeginTime = initCount - countDownCount >= 0 ? initCount - countDownCount : 0
            const beginTimestamp = this.getTimestamp() - hasBeginTime * 1000
            Cookies.set(cookieCode, beginTimestamp, { expires: 1 })
          }
        }
      } else {
        Cookies.set(cookieCode, null, { expires: 0 })
      }
    },
    getMemory() {
      const { isMemory, cookieCode, initCount } = this

      if (isMemory) {
        if (!cookieCode) {
          throw new Error('codeKey is required')
        } else {
          const memoryTimestamp = Cookies.get(cookieCode)

          if (memoryTimestamp) {
            const latestTimestamp = this.getTimestamp()

            const surplus = Math.floor((latestTimestamp - Number(memoryTimestamp)) / 1000)

            if (surplus > 0 && surplus < initCount) {
              return this.$common.lodash.isNaN(initCount - surplus) ? null : initCount - surplus
            } else {
              return null
            }
          } else {
            return null
          }
        }
      } else {
        return null
      }
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
