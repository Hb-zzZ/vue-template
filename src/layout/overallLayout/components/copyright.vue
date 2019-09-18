<template>
  <div class="overall-copyright">
    <p class="copyright-des">xxx</p>
    <p class="copyright-des">xxx</p>
    <p class="copyright-des">xxx</p>
  </div>
</template>

<style lang="scss" scoped>
@import './variables.scss';

.overall-copyright {
  width: 100%;
  color: $textColor;
  flex-shrink: 0;
  background: $subnavBg;
  padding: 30px $large-gutter;
  @include createFlex($content: center);
  flex-wrap: wrap;
  line-height: 1.3;

  .copyright-des {
    margin-right: 10px;
  }
}
</style>

