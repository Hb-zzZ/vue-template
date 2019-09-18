<template>
  <el-date-picker
    :value="value"
    :disabled="disabled"
    type="date"
    format="yyyy-MM-dd"
    value-format="yyyy-MM-dd"
    class="el-custom-size el-custom-date"
    :class="className"
    :placeholder="placeholder"
    @input="change($event)"
  />
</template>

<script>
import defaultConfig from '@/components/global/CreateForm/default'
const config = defaultConfig['date']

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
    },
    placeholder: {
      type: String,
      default: config.placeholder
    }
  },
  methods: {
    change: function(val) {
      this.$emit('change', val)
    }
  }
}
</script>
