<template>
  <el-tooltip class="tooltip-item" effect="dark" :content="content" :placement="placement">
    <slot />
  </el-tooltip>
</template>

<script>
export default {
  props: {
    placement: {
      type: String,
      default: 'right'
    },
    content: {
      type: String,
      required: true,
      default: '提示'
    }
  }
}
</script>
