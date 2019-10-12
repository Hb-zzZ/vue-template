<template>
  <div class="custom-table-with-pagination">
    <el-custom-table :list="list" :is-loading="isLoading" :config="tableConfig">
      <slot />
    </el-custom-table>
    <el-custom-pagination
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    initPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    // 用于何场景
    mode: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      layout: 'total, sizes, prev, pager, next, jumper',
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
      currentPage: this.initPage
    }
  },
  computed: {
    tableConfig() {
      const configFilter = {
        default: {},
        appMain: { height: '100%', class: 'limit-table' }
      }

      return configFilter[this.mode]
    }
  },
  created() {
    this.handleGetList()
  },
  methods: {
    handleGetList(customQuery = {}) {
      const { currentPage, pageSize } = this

      this.$emit('getList', { pageNo: currentPage, pageSize, ...customQuery })
    },
    handleSizeChange(val) {
      this.handleGetList()
    },
    handleCurrentChange(val) {
      this.handleGetList()
    },
    resetPage() {
      this.currentPage = this.initPage
    }
  }
}
</script>


<style lang="scss" scoped>
.custom-table-with-pagination {
  width: 100%;

  .el-custom-pagination {
    height: $paginationHeight;
    @include createFlex($items: end, $content: end);
    text-align: right;
  }
}
</style>
