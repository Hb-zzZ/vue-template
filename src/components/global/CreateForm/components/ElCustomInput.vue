<template>
  <el-input
    :value="value"
    :disabled="disabled"
    :class="className"
    :maxlength="maxlength"
    :minlength="minlength"
    :placeholder="placeholder"
    :type="type"
    resize="none"
    class="el-custom-size el-custom-input"
    @blur="blur"
    @keyup.enter.native="enterCode"
    @input="change($event)"
  />
</template>

<script>
import defaultConfig from '@/components/global/CreateForm/default'
const config = defaultConfig['input']

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
    maxlength: {
      type: String,
      default: config.maxlength
    },
    minlength: {
      type: String,
      default: config.minlength
    },
    type: {
      type: String,
      default: config.type
    }
  },
  methods: {
    change: function(val) {
      this.$emit('change', val)
    },
    enterCode: function() {
      const cleanVal = this.filterVal(this.value)

      this.change(cleanVal)
      this.$emit('enterCode', cleanVal)
    },
    blur: function() {
      const cleanVal = this.filterVal(this.value)

      this.change(cleanVal)
    },
    filterVal(val) {
      return this.$common.lodash.isString(val) ? val.trim() : ''
    }
  }
}
</script>
