<template>
  <div v-if="type === 'input'" class="input-search">
    <el-custom-input v-model="query" :placeholder="placeholder" @enterCode="handleSearch" />
    <button class="search-button" @click="handleSearch">
      <slot name="button">
        <div class="search-button-inner">
          <svg-icon icon-class="sousuo" />
        </div>
      </slot>
    </button>
  </div>
</template>


<script>
import ElCustomInput from '@/components/global/CreateForm/components/ElCustomInput'

export default {
  components: {
    ElCustomInput
  },
  props: {
    type: {
      type: String,
      default: 'input'
    },
    placeholder: {
      type: String,
      default: '请输入要搜索的内容'
    }
  },
  data() {
    return {
      query: null
    }
  },
  methods: {
    resetQuery() {
      this.query = null
    },
    handleSearch() {
      this.$emit('handleSearch', this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-search {
  max-width: 368px;
  min-width: 210px;
  width: 100%;
  position: relative;

  .search-button {
    @include absolute-tr();
    font-size: $text-h6;
    height: 100%;
    cursor: pointer;
    color: #8591c1;

    &-inner {
      padding: 0px 10px;
    }
  }
}
</style>
