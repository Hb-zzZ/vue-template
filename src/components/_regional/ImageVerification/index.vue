<template>
  <button
    :value="value"
    class="random-code"
    title="点击更换验证码"
    @click.prevent="createRandomCode"
    @input="change($event)"
  >{{value}}</button>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      randomCode: '点击更换'
    }
  },
  created() {
    this.createRandomCode()
  },
  methods: {
    createRandomCode() {
      var code = ''
      var codeLength = 4 // 验证码的长度
      var random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // 随机数
      for (var i = 0; i < codeLength; i++) {
        // 循环操作
        var index = Math.floor(Math.random() * 10) // 取得随机数的索引（0~9）
        code += random[index] // 根据索引取得随机数加到code上
      }

      this.change(code)
    },
    change(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.random-code {
  width: 100%;
  height: 100%;
  background: rgba(242, 244, 249, 1);
  border-radius: 4px;
  color: #af4949;
  font-size: $text-h6;
  @include createFlex($content:center,$items:center);
}
</style>
