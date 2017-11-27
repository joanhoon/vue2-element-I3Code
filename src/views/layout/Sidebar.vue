<template>
  <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path" :collapse="isCollapse">
    <!-- logo -->
    <div class="logo">
      <img src="./logo.png" alt="">
      <span>制造数据化平台</span>
    </div>
    <!-- 导航 -->
    <sidebar-item :routes='permission_routers'></sidebar-item>
  </el-menu>
</template>


<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
// @import "src/styles/mixin.scss";

div.logo {
  position: relative;
  img {
    width: 24px;
    height: 30px;
    margin: 10px 15px;
  }
  span {
    position: absolute;
    top: 20px;
    left: 45px;
    font-size: 18px;
    color: #bfcbd9;
    font-weight: 600;
  }
}
</style>
