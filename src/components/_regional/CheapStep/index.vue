<script>
import step from './components/step'

export default {
  components: {
    step
  },
  props: {
    active: {
      type: Number,
      required: true
    }
  },
  render(h) {
    const $slots = this.$slots.default
    let stepNumber = 0

    return h(
      'div',
      {
        class: 'cheap-step'
      },
      [
        $slots.map((item) => {
          if (item.tag) {
            stepNumber += 1
            return h(
              'step',
              { props: { index: stepNumber, active: this.active } },
              [item]
            )
          }
        })
      ]
    )
  }
}
</script>

<style lang="scss" scoped>
.cheap-step {
  position: relative;
  @include createFlex($items: center);

  &:after {
    @include absolute-bl;
    width: 100%;
    content: '';
    height: 3px;
    z-index: 1;
    background: rgba(242, 244, 249, 1);
  }

  .step {
    &:not(:first-child) {
      padding: {
        left: 15px;
        right: 15px;
      }
    }

    &:first-child {
      padding: {
        right: 15px;
      }
    }
  }
}
</style>
