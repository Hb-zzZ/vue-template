<template>
  <el-table-column
    v-if="type"
    class-name="el-custom-column"
    width="60"
    align="center"
    :label="label"
    :type="type"
    :show-overflow-tooltip="showOverflowTooltip"
  />
  <el-table-column
    v-else-if="enableScope"
    class-name="el-custom-column"
    :fixed="fixed"
    :min-width="minWidth"
    align="left"
    :label="label"
    :prop="prop"
    :sortable="sortable"
    :show-overflow-tooltip="showOverflowTooltip"
  >
    <template slot-scope="scope">
      <slot :row="scope.row" :column="scope.column" :$index="scope.$index" />
    </template>
  </el-table-column>
  <el-table-column
    v-else
    class-name="el-custom-column"
    :fixed="fixed"
    :min-width="minWidth"
    :label="label"
    align="left"
    :prop="prop"
    :sortable="sortable"
    :show-overflow-tooltip="showOverflowTooltip"
  >
    <template slot-scope="scope">{{ $common.lodash.get(scope.row,prop) | isNillFilter}}</template>
  </el-table-column>
</template>

<script>
export default {
  props: {
    prop: {
      type: String,
      default: ''
    },
    enableScope: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Boolean],
      default: false
    },
    sortable: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: [Boolean, String],
      default: false
    },
    showOverflowTooltip: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    minWidth() {
      return this.autoGetWidth(this.width)
    }
  },
  methods: {
    autoGetWidth(width) {
      if (!width) {
        const { label, sortable } = this

        const initWidth = sortable ? 48 : 20
        const width = label.length * 15 + initWidth

        return width
      } else {
        return width
      }
    }
  }
}
</script>