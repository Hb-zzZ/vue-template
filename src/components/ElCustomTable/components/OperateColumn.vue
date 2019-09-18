<template>
  <el-table-column
    class-name="el-custom-column"
    :fixed="fixed"
    :min-width="width"
    align="center"
    :label="label"
    :resizable="false"
  >
    <template slot-scope="scope">
      <slot :row="scope.row" :column="scope.column" :$index="scope.$index" />
    </template>
  </el-table-column>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '120px'
    },
    fixed: {
      type: [Boolean, String],
      default: false
    }
  }
}
</script>