<template>
  <el-menu class="navbar" mode="horizontal">
    <!-- 导航折叠按钮 -->
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <!-- 面包屑 -->
    <levelbar></levelbar>
    <!-- tab标签 -->
    <tabs-view></tabs-view>
    <!-- <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log> -->
    <!-- 全屏 -->
    <screenfull class='screenfull'></screenfull>
    <!-- 头像 -->
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/">
          <el-dropdown-item>
            项目地址
          </el-dropdown-item>
        </a>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Levelbar from './Levelbar'
  import TabsView from './TabsView'
  import Hamburger from 'components/Hamburger'
  import Screenfull from 'components/Screenfull'
  // import ErrorLog from 'components/ErrLog'
  // import errLogStore from 'store/errLog'
  import {
    IsPhone
  } from "@/utils";
  export default {
    components: {
      Levelbar,
      TabsView,
      Hamburger,
      // ErrorLog,
      Screenfull
    },
    data() {
      return {

        // log: errLogStore.state.errLog
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar'
      ])
    },
    methods: {
			toggleSideBar() { //点击折叠左侧导航栏
				// this.sidebar.opened=!this.sidebar.opened
        this.$store.dispatch('ToggleSideBar')
      },
      logout() { //退出登录
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
    },
    mounted() {
      if (IsPhone()) {
        this.sidebar.opened=false
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

</style>

