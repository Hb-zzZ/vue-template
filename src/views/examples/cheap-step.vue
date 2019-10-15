<template>
  <div class="example-wrap">
    <cheap-step :active="active" class="example-inner">
      <span>我</span>
      <span>是</span>
      <span>自</span>
      <span>制</span>
      <span>步骤</span>
      <span>条</span>
    </cheap-step>
  </div>
</template>

<script>
import { CheapStep } from '@/components'

export default {
  components: {
    CheapStep
  },
  data() {
    return {
      active: 0
    }
  },
  mounted() {
    this.changeActive()
  },
  methods: {
    changeActive() {
      const MAX = 5

      setInterval(() => {
        if (this.active <= MAX) {
          this.active += 1
        } else {
          this.active = 0
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './layout.scss';

.example-inner {
  background: rgb(18, 44, 49) !important;
  color: white !important;
}
</style>