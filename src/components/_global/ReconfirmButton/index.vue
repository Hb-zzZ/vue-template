<template>
  <div class="reconfirm-message">
    <div class="reconfirm-button-wrap" @click="openMessage">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 自带数据传入，确认后再接收
    data: {
      type: [Object, Array, String, Number],
      default() {
        return {}
      }
    },
    handleConfirm: {
      type: Function,
      default() {
        return {}
      }
    },
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: '请您再次确认操作？'
    }
  },
  methods: {
    defaultConfirm() {
      this.$emit('handleConfirm', this.data)
    },
    openMessage() {
      this.$confirm(this.content, {
        title: this.title,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning',
        customClass: 'reconfirm-message-box',
        center: true
      }).then(() => {
        this.defaultConfirm()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.reconfirm-message {
  display: inline-block;
}
</style>

<style lang="scss">
.el-message-box.reconfirm-message-box {
  padding: 0px 27px;
  width: 380px;
  color: $color-black;
  .el-message-box__header {
    // display: none;
    // padding-top: 17px;
    padding: 17px 0px 0px;
    text-align: left;
    font-size: $text-h6;

    .el-message-box__status {
      display: none;
    }
    .el-message-box__title {
      display: block;
      text-align: left;
      color: $color-black;
      font-weight: bold;
    }
  }
  .el-message-box__content {
    padding: 0px;
    font-weight: bold;
    color: $color-black;
    height: 102px;
    display: table;
    width: 100%;

    .el-message-box__message {
      display: table-cell;
      vertical-align: middle;
    }
  }
  .el-message-box__btns {
    padding: 0px;
    margin-bottom: 20px;
    @include createFlex($content: end, $items: center);

    button {
      cursor: pointer;
      height: 40px;
      padding: 0px 28px;
      border-color: #d7d7d7;

      &.el-button--primary {
        background: $main-color;
        color: white;
      }
    }
  }
}
</style>
