<template>
  <div class="no-support-wrap">
    <div class="no-support-inner">
      <div class="img-wrap">
        <img class="pic-http__parent" src="./images/no-support/no-support.png" alt="no-support" />
      </div>
      <div class="des-wrap">您当前的浏览器版本过低，可能存在安全风险，建议升级谷歌浏览器</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoSupport'
}
</script>

<style lang="scss" scoped>
.no-support-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  min-width: 1000px;

  .no-support-inner {
    max-width: 1200px;
    width: 80%;
    padding: 20px 50px;
    display: table;
    margin: 0 auto;
    height: 100%;

    .img-wrap {
      width: 60%;
      max-width: 600px;
      display: table-cell;
      vertical-align: middle;
    }
    .des-wrap {
      display: table-cell;
      vertical-align: middle;
      word-break: break-all;
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
    }
  }
}
</style>