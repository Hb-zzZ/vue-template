<template>
  <el-radio-group
    :value="value"
    :disabled="disabled"
    :class="className"
    class="el-custom-size el-custom-radio"
    @input="change($event)"
  >
    <slot />
  </el-radio-group>
</template>

<script>
import defaultConfig from '@/components/global/CreateForm/default'
const config = defaultConfig['radio']

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      required: true
    },
    className: {
      type: String,
      default: config.class
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change: function(val) {
      this.$emit('change', val)
    }
  }
}
</script>
