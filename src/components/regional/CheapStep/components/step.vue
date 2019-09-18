<template>
  <div class="step" :class="{'is-active':active>=index}">
    <span v-if="index" class="stepNumber">{{index}}</span>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: NaN
    },
    active: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.step {
  $color-green: rgba(40, 204, 139, 1);
  $color-grey: #e9e9e9;
  @include createFlex($items: center);
  padding-bottom: 15px;
  position: relative;
  overflow: hidden;

  .stepNumber {
    width: 26px;
    height: 26px;
    background: $color-grey;
    color: white;
    @include createFlex($items: center, $content: center);
    font-size: $text-h6;
    border-radius: 50%;
    margin-right: 10px;
    @include createTransition($mode: fast);
  }

  &:after {
    content: '';
    @include absolute-bl;
    bottom: 0px;
    height: 3px;
    z-index: 2;
    width: 100%;
    background: $color-green;
    transform: translateX(-100%);
    @include createTransition($mode: fast);
  }

  &.is-active {
    font-weight: bold;

    .stepNumber {
      background: $color-green;
    }

    &:after {
      transform: translateX(0%);
    }
  }
}
</style>

