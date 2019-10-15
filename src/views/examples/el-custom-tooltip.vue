<template>
  <div class="example-wrap">
    <div class="example-inner">
      <el-custom-tooltip content="我就是提示">
        <span>悬浮我可以获得提示</span>
      </el-custom-tooltip>
    </div>
  </div>
</template>

<script>
import { ElCustomTooltip } from '@/components'

export default {
  components: {
    ElCustomTooltip
  }
}
</script>

<style lang="scss" scoped>
@import './layout.scss';
</style>