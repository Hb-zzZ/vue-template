<template>
  <div class="home-wrap adaptation-layout">
    <div class="home-banner">
      <div class="banner-bg" />
      <div class="banner-title">
        <h2>{{bannerText.title}}</h2>
      </div>
      <!-- <div class="banner-des">
        <p v-for="(des,index) in bannerText.des" :key="index" class="des-text">{{des.text}}</p>
      </div>-->
      <search-input class="banner-search" />
    </div>
    <div class="info-public">
      <div class="public-header">
        <div class="title">
          <h5>信息</h5>
        </div>
        <div class="public-handle">
          <el-button size="small" type="primary" class="mellow">
            <svg-icon icon-class="sousuo" />
            <span>查看更多</span>
          </el-button>
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
import SearchInput from './components/SearchInput'

export default {
  components: {
    Card,
    SearchInput
  },
  data() {
    return {
      bannerText: {
        title: 'xxxx',
        des: [
          { text: 'placeholder' },
          { text: 'placeholder' },
          { text: 'placeholder' },
          { text: 'placeholder' },
          { text: 'placeholder' },
          { text: 'placeholder' },
          { text: 'placeholder' }
        ]
      },
      cardText: [
        {
          title: 'xxxxxxx',
          content:
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          footer: ''
        },
        {
          title: 'xxxxxx',
          content: '',
          footer: ''
        },
        {
          title: 'xxxxxxx',
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
  color: #0f1a4d;
  @include createFlex($direction: col, $items: center);

  .home-banner {
    width: 100%;
    position: relative;
    background: linear-gradient(360deg, rgba(24, 27, 125, 1) 0%, rgba(49, 98, 246, 1) 100%);
    color: $color-white;
    @include createFlex($direction: col, $items: center);

    .banner-bg {
      @include absolute-tl();
      width: 100%;
      height: 100%;
      @include create-bg(
        $url: './images/building_pic@2x.png',
        $size: $appMaxWidth auto,
        $position: center calc(100% + 3px)
      );
      z-index: 0;
    }
    .banner-title {
      margin: 40px 0px 20px;
      width: $contentWidth;
      z-index: 2;
      max-width: $appMaxWidth;
      @include createFlex($content: center, $items: center);
    }

    .banner-search {
      z-index: 2;
      margin-bottom: 140px;
    }
    .banner-des {
      z-index: 2;
      width: $contentWidth;
      max-width: $appMaxWidth;
      background: rgba(51, 89, 206, 0.8);
      background: linear-gradient(270deg, rgba(51, 89, 206, 1) 0%, rgba(23, 45, 160, 1) 100%);
      border-radius: 7px;
      opacity: 0.7559999999999999;
      border: 1px solid rgba(78, 110, 214, 1);
      margin-bottom: 50px;
      padding: 20px 56px;

      .des-text {
        position: relative;

        &:not(:last-child) {
          margin-bottom: 10px;
        }

        &:before {
          content: '';
          position: absolute;
          left: -16px;
          top: 50%;
          margin-top: -3px;
          border: 3px solid transparent;
          border-left-color: #f9be50;
        }
      }
    }
  }

  .info-public {
    padding: 50px 0px 60px;
    width: $contentWidth;
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
