<template>
  <search class="home-search">
    <div slot="button" class="custom-search-button">
      <svg-icon icon-class="sousuo" />
      <span>搜索</span>
    </div>
  </search>
</template>


<script>

</script>


<style lang="scss" scoped>
$inputBg: rgba(255, 255, 255, 0.27);
$serachButtonBg: rgba(240, 66, 108, 1);

.home-search {
  max-width: 904px;
  width: 59%;

  /deep/ .el-input__inner {
    background: $inputBg;
    border-radius: 2px;
    border: none;
    color: white;
  }

  /deep/ .search-button {
    width: percentage(89 / 752);
    min-width: 88px;
  }
  .custom-search-button {
    width: 100%;
    height: 100%;
    @include createFlex($items: center, $content: center);
    @include createTransition($mode: fast);
    background: $serachButtonBg;
    color: white;
    font-size: $text-body-maxus;
    opacity: 1;

    .svg-icon {
      margin-right: 6px;
    }

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>