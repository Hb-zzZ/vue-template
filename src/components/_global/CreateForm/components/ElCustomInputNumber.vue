<template>
  <el-input-number
    :value="value"
    :disabled="disabled"
    :max="max"
    :min="min"
    :step="1 / ((Math.pow(10,precision)) || 1)"
    :precision="precision"
    :class="className"
    :controls="false"
    :placeholder="placeholder"
    class="el-custom-size el-custom-input-number"
    @input="change($event)"
  />
</template>

<script>
import defaultConfig from '@/components/_global/CreateForm/default'
const config = defaultConfig['inputNumber']

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
    },
    max: {
      type: Number,
      default: config.max
    },
    min: {
      type: Number,
      default: config.min
    },
    precision: {
      type: Number,
      default: config.precision
    }
  },
  methods: {
    change: function(val) {
      this.$emit('change', val)
    }
  }
}
</script>
