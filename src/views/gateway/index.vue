<template>
  <div class="gateway">
    <el-row class="gateway-header">
      <el-col :offset="3" :span="20" class='text-left'>
        <img :src="logo" alt="I3制作数据化平台">
        <span>I3制作数据化平台</span>
      </el-col>
    </el-row>
    <el-row class="gateway-main">
      <el-col :span="8" class='text-center' v-for="item in dataOperation" :key="item.label">
        <router-link :to="item.goTo">
          <img :src="item.src" :alt="item.label">
          <span>{{item.label}}</span>
        </router-link>
      </el-col>
    </el-row>
    <el-row class="gateway-notice" type="flex" justify="center">
      <el-col :span="9" :xs="10">
        <div class="notice">
          <div class="notice-header">
            <h4>公告</h4>
            <a href="javascript:;" class="fr ">更多</a>
          </div>
          <ul>
            <li v-for="item in listOperation" :key="item.title">
              <a :href="item.href">{{item.title}}</a>
              <span class="fr pr-5 red-color">{{item.date}}</span>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="9" :xs="10">
        <div class="notice">
          <div class="notice-header">
            <h4>通知</h4>
            <a href="" class="fr ">更多</a>
          </div>
          <ul>
            <li v-for="item in listOperation" :key="item.title">
              <a :href="item.href">{{item.title}}</a>
              <span class="fr pr-5 red-color">{{item.date}}</span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import logo from '@/assets/gateway/logo-small@2x.png'
  import les from '@/assets/gateway/les.png'
  import mes from '@/assets/gateway/mes.png'
  import sys from '@/assets/gateway/systemsetting.png'
  export default {
    data() {
      return {
        logo,
        les,
        mes,
        sys,
        dataOperation: [{
            goTo: '/dashboard',
            src: sys,
            label: '系统管理'
          },
          {
            goTo: '/dashboard',
            src: mes,
            label: '制作执行系统'
          },
          {
            goTo: '/dashboard',
            src: les,
            label: '物流执行系统'
          }
        ],
        listOperation: [{
            title: '啊啊啊啊啊',
            href: 'javascript:;',
            date: '2017/11/07'
          },
          {
            title: '谁谁谁水水水水',
            href: 'javascript:;',
            date: '2017/11/07'
          },
          {
            title: '的点点滴滴多多多多多',
            href: 'javascript:;',
            date: '2017/11/07'
          },
          {
            title: '反反复复付付付付付付',
            href: 'javascript:;',
            date: '2017/11/07'
          },
          {
            title: '灌灌灌灌灌过过',
            href: 'javascript:;',
            date: '2017/11/07'
          },
        ]
      }
    }

  }

</script>
<style lang="scss" scoped>
  .gateway {
    .gateway-header {
      margin-top: 30px;

      img {
        vertical-align: bottom;
      }
      span {
        font-size: 30px;
        font-weight: 600;
        color: #006aaa;
      }
    }
    .gateway-main {
      margin: 50px 0;
      a {
        display: inline-block;
        width: 120px;
        height: 130px;
        img {
          width: 100px;
          transform: scale(1);
          transition: 1s;
        }
        span {
          display: block;
          font-size: 18px;
          line-height: 40px;
        }
      }
      a:hover {
        img {
          transform: scale(1.1);
          transition: 1s;
        }
      }
    }
    .gateway-notice {
      .notice {
        border: 1px solid #ddd;
        border-radius: 4px;
        margin: 0 10px;
        .notice-header {
          background: #F5F5F5;

          h4 {
            color: #474747;
            line-height: 0;
            display: inline-block;
          }
          line-height: 42px;
          padding: 0 5px;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          li {
            border-top: 1px solid #ddd;
            text-indent: 5px;
            line-height: 35px;
            a:hover {
              border-bottom: 1px solid #4D91CD;
            }
          }
        }
      }
    }
    a {
      color: #4D91CD;
    }
    .red-color {
      color: #C03639;
    }
  }

</style>

