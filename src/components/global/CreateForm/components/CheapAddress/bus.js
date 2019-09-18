import Vue from 'vue'

export default new Vue({
  data() {
    return {
      hasUpdate: 0
    }
  },
  created() {
    this.$on('updateAddress', (data) => {
      const { id, tier, parentCode } = data

      if (!id) {
        throw Error`no id`
      }

      if (!this[id]) {
        this[id] = {}
      }

      this[id][tier] = parentCode

      this.hasUpdate += 1
    })
  }
})
