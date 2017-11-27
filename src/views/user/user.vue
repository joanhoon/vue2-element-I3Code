<template>
  <div class="app-container">
    <tool-bar :columns='columns' :dataSource='dataSource' :showColumn='showColumn' :multipleSelection='multipleSelection'></tool-bar>
    <data-grid :columns='columns' :dataSource='dataSource' :showColumn='showColumn'></data-grid>
    <paging :dataSource='dataSource'></paging>
    <add-edit-form :formColumns='formColumns' :formRules='formRules' :dataSource='dataSource'></add-edit-form>
    <user-role-maintain></user-role-maintain>
    <user-jurisdiction></user-jurisdiction>
    <user-data-authority></user-data-authority>
  </div>
</template>

<script>
  import bus from "@/utils/bus";

  import {
    clientHeight,
    getLocalTime
  } from "@/utils";

  import {
    toolBar,
    dataGrid,
    addEditForm,
    paging,
    userRoleMaintain,
    userJurisdiction,
    userDataAuthority
  } from './userModule'

  export default {
    components: {
      toolBar,
      dataGrid,
      addEditForm,
      paging,
      userRoleMaintain,
      userJurisdiction,
      userDataAuthority
    },

    data() {
      return {
        columns: [{
            value: "workNo",
            label: "用户工号",
            width: "80"
          },
          {
            value: "userName",
            label: "用户名称",
            width: "80"
          },
          {
            value: "loginName",
            label: "登录名称",
            width: "80"
          },
          {
            value: "loginPassword",
            label: "登录密码",
            width: "80"
          },
          {
            value: "positionName",
            label: "单位名称",
            width: "80"
          },
          {
            value: "email",
            label: "邮箱地址",
            width: "80"
          },
          {
            value: "mobile",
            label: "手机号",
            width: "70"
          },
          {
            value: "photo",
            label: "照片",
            width: "60"
          },
          {
            value: "status",
            label: "状态",
            width: "60"
          },
          {
            value: "loginFailCount",
            label: "登录失败次数",
            width: "100"
          },
          {
            value: "last_login_time",
            label: "上次登录时间",
            width: "100"

          },
          {
            value: "creatorName",
            label: "创建人",
            width: "70"

          },
          {
            value: "createTime",
            label: "创建时间",
            width: "80"

          },
          {
            value: "modifierName",
            label: "修改人",
            width: "70"

          },
          {
            value: "modifyTime",
            label: "修改时间",
            width: "80"

          }
        ],
        dataSource: [ //数据列表
        ],
        formRules: { //表单验证
          workNo: [{
            required: true,
            message: '请输入用户工号',
            trigger: 'blur'
          }],
          userName: [{
              required: true,
              message: '请输入用户名称',
              trigger: 'blur'
            },
            {
              pattern: /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/,
              message: '用户名称格式有误！',
              trigger: 'blur'
            },
          ],
          loginName: [{
              required: true,
              message: '请输入登录名称',
              trigger: 'blur'
            },
            {
              pattern: /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/,
              message: '登录名称格式有误！',
              trigger: 'blur'
            },
          ],
          loginPassword: [{
              required: true,
              message: '请输入登录密码',
              trigger: 'blur'
            },
            {
              pattern: /^\d{5,17}$/,
              message: '登录密码格式有误！',
              trigger: 'blur'
            },
          ],
          positionName: [{
              required: true,
              message: '请输入单位名称',
              trigger: 'blur'
            },

          ],
          email: [{
              required: true,
              message: '请输入邮箱地址',
              trigger: 'blur'
            },
            {
              pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
              message: '邮箱地址格式有误！',
              trigger: 'blur'
            },
          ],
          mobile: [{
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              pattern: /^1[34578]\d{9}$/,
              message: '手机号格式有误！',
              trigger: 'blur'
            }
          ],

        },
        formColumns: [ //form表单
          {
            label: '用户工号',
            prop: 'workNo'
          },
          {
            label: '用户名称',
            prop: 'userName'
          },
          {
            label: '登录名称',
            prop: 'loginName'
          },
          {
            label: '登录密码',
            prop: 'loginPassword'
          },
          {
            label: '单位名称',
            prop: 'positionName'
          },
          {
            label: '邮箱地址',
            prop: 'email'
          },
          {
            label: '手机号',
            prop: 'mobile'
          },
          {
            label: '状态',
            prop: 'status'
          }
        ],
        multipleSelection: [],
        showColumn: {
          workNo: true,
          userName: true,
          loginName: true,
          loginPassword: false,
          positionName: true,
          email: true,
          mobile: true,
          photo: false,
          status: true,
          loginFailCount: true,
          last_login_time: true,
          creatorName: true,
          createTime: true,
          modifierName: true,
          modifyTime: true
        }
      }
    },
    created() {
      for (let i = 1; i <= 100; i++) {
        this.dataSource.push({
          id: i + '',
          workNo: parseInt(Math.random() * 9000 + 1000) + '',
          userName: Math.random().toString(36).substr(2).slice(0, 6),
          loginName: Math.random().toString(36).substr(2).slice(0, 6),
          loginPassword: parseInt(999999 * Math.random()) + '',
          positionName: Math.floor(Math.random() * 2) ? '单位A' : '单位B',
          email: Math.random().toString(36).substr(2).slice(0, 4) + '@email.com',
          mobile: '150' + Math.floor(Math.random() * 90000000 + 10000000),
          photo: parseInt(100 * Math.random()) + '',
          status: Math.floor(Math.random() * 2) ? '启用' : '禁用',
          last_login_time: getLocalTime(parseInt(Math.random() * 10000000000 + 1500000000000)),
          loginFailCount: parseInt(100 * Math.random()) + '',
          creatorName: parseInt(100 * Math.random()) + '',
          createTime: getLocalTime(parseInt(Math.random() * 10000000000 + 1500000000000)),
          modifierName: parseInt(100 * Math.random()) + '',
          modifyTime: getLocalTime(parseInt(Math.random() * 10000000000 + 1500000000000))
        })
      }
      let _this = this;
      bus.$on("multipleSelection", (v) => {
        this.multipleSelection = v
      })
    },
    mounted() {
      clientHeight('#datagrid', '.toolbar', 115)

    }
  }

</script>

