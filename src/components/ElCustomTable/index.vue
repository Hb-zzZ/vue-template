<template>
  <el-table
    border
    :data="list"
    :fit="tableConfig.fit"
    :stripe="tableConfig.stripe"
    :tooltip-effect="tableConfig.tooltipEffect"
    style="width: 100%"
    class="el-custom-table"
    :show-header="tableConfig.showHeader"
    :class="tableConfig.class"
    :height="tableConfig.height"
    @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="tableConfig.isSelect" :resizable="false" type="selection" width="45" />

    <slot />
    <template slot="empty">
      <span v-if="!isLoading">暂无数据</span>
      <span v-else>加载中…</span>
    </template>
  </el-table>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tableConfig() {
      const defaultConfig = {
        fit: true,
        stripe: false,
        tooltipEffect: 'dark',
        class: '',
        isSelect: false,
        showHeader: true
      }

      return { ...defaultConfig, ...this.config }
    }
  },
  methods: {
    handleSelectionChange(selections) {
      this.$emit('handleSelectionChange', selections)
    }
  }
}
</script>