<template>
  <div class="home-wrap adaptation-layout">
    <div class="info-public">
      <div class="public-header">
        <div class="title">
          <h5>O-O</h5>
        </div>
      </div>

      <div class="public-view">
        <card v-for="(card,index) in cardText" :key="index" :data="card" class="card-size" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from './components/Card'

export default {
  components: {
    Card
  },
  data() {
    return {
      cardText: [
        {
          title: '我',
          content: '',
          footer: ''
        },
        {
          title: '是',
          content:
            'Hb-zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
          footer: ''
        },
        {
          title: '模版',
          content: '',
          footer: ''
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.home-wrap {
  height: 100%;

  .info-public {
    padding: 50px 20px 60px;
    width: 100%;
    max-width: $appMaxWidth;
    @include createFlex($direction: col, $items: center);
    @include create-bg($url: './images/backgroundline.svg', $size: 100% auto, $position: top center);

    .public-header {
      width: 100%;
      @include createFlex($content: between);
      margin-bottom: 36px;

      .title {
        h5 {
          font-size: $text-h3;
          margin-bottom: 2px;
        }
      }
    }

    .public-view {
      width: 100%;
      @include createFlex($content: between);

      .card-size {
        width: calc(33% - 22px);
      }
    }
  }
}
</style>
