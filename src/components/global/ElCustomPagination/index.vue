<template>
  <el-pagination
    class="el-custom-pagination"
    :current-page="tempCurrentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :layout="layout"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>


<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tempCurrentPage: 1
    }
  },
  watch: {
    currentPage: {
      immediate: true,
      handler() {
        this.tempCurrentPage = this.currentPage
      }
    },
    tempCurrentPage() {
      this.$emit('update:currentPage', this.tempCurrentPage)
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('update:pageSize', val)
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('update:currentPage', val)
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>
