<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="sizeAttr.width"
    :close-on-click-modal="false"
    append-to-body
    :custom-class="`el-custom-dialog ${sizeAttr.class}`"
  >
    <main v-loading="dialogLoading" class="el-dialog__body--inner">
      <!-- 用于检测是否有footer，以便更新content高度 -->
      <div v-if="$slots.footer" v-show="false" class="has-footer" />
      <div class="dialog-content">
        <div class="content-inner">
          <slot />
        </div>
      </div>
      <div class="dialog-footer">
        <slot name="footer" />
      </div>
    </main>
  </el-dialog>
</template>


<script>
export default {
  props: {
    title: {
      type: String,
      default: '提示'
    },
    visible: {
      type: Boolean,
      required: true
    },
    size: {
      type: String,
      default: 'normal'
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    dialogLoading() {
      const { type, loading } = this.$store.getters.isLoading

      if (type === 'dialog') {
        return loading
      } else {
        return false
      }
    },
    sizeAttr() {
      const filter = {
        normal: {
          width: '70%',
          class: ''
        },
        small: {
          width: '60%',
          class: 'small'
        }
      }

      return filter[this.size]
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler() {
        this.dialogVisible = this.visible
      }
    },
    dialogVisible: {
      handler() {
        this.$emit('update:visible', this.dialogVisible)
      }
    }
  }
}
</script>
