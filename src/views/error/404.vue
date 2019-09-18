<template>
  <base-template>
    <template #picture>
      <img class="pic-http__parent" src="./images/404/404.png" alt="404" />
    </template>

    <template>
      <div class="bullshit__headline">你要访问的页面找不到，点击下面按钮回到首页</div>
      <router-link class="bullshit__return-home" :to="{name: 'Home'}">回到首页</router-link>
    </template>
  </base-template>
</template>

<script>
import BaseTemplate from './BaseTemplate'

export default {
  name: 'Page404',
  components: {
    BaseTemplate
  }
}
</script>