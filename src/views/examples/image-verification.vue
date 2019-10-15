<template>
  <div class="example-wrap">
    <div class="example-inner">
      <image-verification v-model="value" class="button-size" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import { ImageVerification } from '@/components'

export default {
  components: {
    ImageVerification
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    handleChange(val) {
      this.$message.info(`changeVal:${val}`)
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