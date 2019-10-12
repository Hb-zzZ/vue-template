<template>
  <el-select
    :value="value"
    class="el-custom-size el-custom-select"
    :class="className"
    :filterable="filterable"
    :disabled="disabled"
    :placeholder="placeholder"
    :remote="remote"
    :allow-create="allowCreate"
    :value-key="valueKey"
    :remote-method="remoteMethod"
    :loading="loading"
    @visible-change="handleVisibleChange"
    @input="change($event)"
  >
    <slot />
  </el-select>
</template>

<script>
import defaultConfig from '@/components/_global/CreateForm/default'
const config = defaultConfig['select']

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
    filterable: {
      type: Boolean,
      default: config.filterable
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: config.placeholder
    },
    remote: {
      type: Boolean,
      default: false
    },
    remoteMethod: {
      type: Function,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    allowCreate: {
      type: Boolean,
      default: false
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    visibleChange: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    change: function(val) {
      this.$emit('change', val)
    },
    handleVisibleChange(visible) {
      this.$emit('visible-change', visible)
    }
  }
}
</script>
