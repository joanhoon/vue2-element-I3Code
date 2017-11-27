<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import "babel-polyfill"; //兼容IE

export default {
  name: "APP",
};
</script>

<style lang="scss">
@import "~normalize.css/normalize.css"; // normalize.css 样式格式化
@import "./styles/index.scss"; // 全局自定义的css样式
</style>

