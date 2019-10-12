<template>
  <div class="cheap-address-wrap">
    <el-select
      :value="value"
      class="el-custom-size el-custom-select"
      :class="className"
      :disabled="disabled"
      :placeholder="placeholder"
      @focus="lazyOptions"
      @input="change($event)"
    >
      <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code" />
    </el-select>
  </div>
</template>

<script>
import bus from './bus'

import defaultConfig from '@/components/_global/CreateForm/default'
const config = defaultConfig['address']

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      required: true
    },
    id: {
      required: true,
      type: String
    },
    parentCode: {
      type: String,
      default: config.parentCode
    },
    tier: {
      required: true,
      type: String,
      default: config.tier
    },
    className: {
      type: String,
      default: config.class
    }
  },
  data() {
    return {
      bus: bus,
      options: [],
      // 用于和变化后的数值作比较，有变化才发送请求
      parentCodeStore: { tier: null, reqParentCode: null },
      reqParentCode: null
    }
  },
  computed: {
    placeholder() {
      const filter = {
        province: '省份',
        city: '城市',
        area: '区',
        street: '街道',
        community: '社区'
      }

      return filter[this.tier]
    },
    disabled() {
      if (this.tier === 'province' || this.reqParentCode) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    'bus.hasUpdate': {
      handler() {
        this.updateReqParentCode()
        this.lazyOptions()
      }
    },
    value: {
      immediate: true,
      handler() {
        const { tier, id } = this

        this.$nextTick(() => {
          bus.$emit('updateAddress', { id, tier, parentCode: this.value })
        })
      }
    }
  },
  created() {
    this.resetParentCode()
  },
  mounted() {
    this.$nextTick(() => {
      this.autoFillCode()
    })
  },
  methods: {
    updateReqParentCode() {
      const { tier, id, parentCode } = this

      const addressCode = bus[id]

      this.reqParentCode =
        parentCode ||
        (!this.$common.lodash.isEmpty(addressCode) &&
          addressCode[this.getPrevTier(tier)]) ||
        null
    },
    autoFillCode() {
      const filter = {
        province: '440000000000',
        city: '440300000000',
        area: '440305000000'
      }

      if (filter[this.tier]) {
        this.change(filter[this.tier])
      }
    },
    resetParentCode() {
      bus[this.id] = {}
    },
    change: function(val) {
      this.$emit('change', val)
    },
    async getArea(data) {
      return this.$store.dispatch('dict/getArea', data)
    },
    getPrevTier(tier) {
      const filter = {
        province: 'null',
        city: 'province',
        area: 'city',
        street: 'area',
        community: 'street'
      }

      return filter[tier]
    },
    async lazyOptions() {
      const { tier, reqParentCode, parentCodeStore } = this

      if (
        parentCodeStore.tier !== tier ||
        parentCodeStore.reqParentCode !== reqParentCode
      ) {
        // 父code发生变化
        if (parentCodeStore.tier) {
          // 有记录则重置
          this.change(null)
        }

        if (tier === 'province' || reqParentCode) {
          this.parentCodeStore = { reqParentCode, tier }
          this.options = []
          const data = { parentCode: reqParentCode, type: tier }

          return this.getArea(data)
            .then((response) => {
              this.options = response
              return 'success'
            })
            .catch(() => {
              this.parentCodeStore = { reqParentCode: null, tier: null }
            })
        }
        return 'success'
      }
      return 'success'
    }
  }
}
</script>

<style lang="scss" scoped>
.cheap-address-wrap {
  @include createFlex($items: center);
}
</style>
