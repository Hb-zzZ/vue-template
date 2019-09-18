<template>
  <div class="card-wrap">
    <div class="card-header">
      <div class="header-embellish" />
      <div class="header-content">
        <slot name="header">
          <div class="text-wrap" :title="data.title">
            <div class="inner">{{data.title}}</div>
          </div>
        </slot>
      </div>
    </div>

    <div class="cut-off" />
    <div class="card-content">
      <slot>
        <div class="text-wrap" :title="data.content">
          <div class="inner">{{data.content}}</div>
        </div>
      </slot>
    </div>

    <div class="card-footer">
      <slot name="footer">
        <span class="text-bold" :title="data.footer">{{data.footer}}</span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-wrap {
  $card-beside: 20px;

  background: white;
  box-shadow: 0px 2px 6px 0px rgba(42, 68, 186, 0.23);
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  @include createFlex($direction: col, $items: center);

  .card-header {
    $header-bg-color: #3a68f8;

    height: 97px;
    width: 100%;
    position: relative;
    background: $header-bg-color;
    overflow: hidden;
    color: $color-white;
    font-size: $text-body-maxus;

    .text-wrap {
      cursor: pointer;
      width: 100%;
      z-index: 2;
      @include multiOverHidden($line-number: 2, $bg: $header-bg-color, $line-height: 1.6);
    }

    .header-embellish {
      width: 100%;
      height: 100%;
      @include absolute-tr();
      @include create-bg($url: '../images/tbac_pic@2x.png', $size: 99% 56%, $position: top right);
      z-index: 0;
    }
    .header-content {
      width: 100%;
      height: 100%;
      @include absolute-tr();
      padding: 0px 46px;
      @include createFlex($content: center, $items: center);
      z-index: 2;
    }
  }

  .cut-off {
    width: 100%;
    height: 7px;
    background: rgba(250, 217, 97, 1);
    background: linear-gradient(90deg, rgba(250, 217, 97, 1) 0%, rgba(247, 107, 28, 1) 100%);
  }

  .card-content {
    @include createFlex($content: center, $items: center);
    padding: 0px $card-beside;
    height: 128px;
    width: 100%;

    .text-wrap {
      width: 100%;
      @include multiOverHidden();
    }
  }

  .card-footer {
    width: 100%;
    padding: 0px $card-beside;
    @include createFlex($content: end);
    margin-bottom: 20px;
  }
}
</style>
