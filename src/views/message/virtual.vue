<template>
  <div class="app-container">
    <tool-bar :multipleSelection='multipleSelection'></tool-bar>
    <data-grid :columns='columns' :dataSource='dataSource'></data-grid>
    <paging :dataSource='dataSource'></paging>
    <add-edit-form :formColumns='formColumns' :formRules='formRules' :dataSource='dataSource'></add-edit-form>
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
    paging
  } from './virtualModule'
  export default {
    components: {
      toolBar,
      dataGrid,
      addEditForm,
      paging
    },
    data() {
      return {
        columns: [ //数据表头
          {
            value: 'virtualMachineName',
            label: '虚拟机名称',
            width: 100
          },
          {
            value: 'serverName',
            label: '服务器名称',
            width: 100
          },
          {
            value: 'loginAccount',
            label: '登陆账号',
            width: 100
          },
          {
            value: 'loginPassword',
            label: '登陆密码',
            width: 80
          },
          {
            value: 'status',
            label: '状态',
            width: 60
          },
          {
            value: 'creatorName',
            label: '创建人',
            width: 70
          },
          {
            value: 'createTime',
            label: '创建时间',
            width: 80
          },
          {
            value: 'modifierName',
            label: '更新人',
            width: 70
          },
          {
            value: 'modifyTime',
            label: '更新时间',
            width: 80
          },
        ],
        dataSource: [ //数据列表
        ],

        formRules: {},
        formColumns: [{
            label: '虚拟机名称',
            prop: 'virtualMachineName'
          },
          {
            label: '服务器名称',
            prop: 'serverName'
          },
          {
            label: '登陆账号',
            prop: 'loginAccount'
          },
          {
            label: '登陆密码',
            prop: 'loginPassword'
          },
        ],
        multipleSelection: []
      }
    },
    created() {
      for (let i = 1; i <= 100; i++) {
        this.dataSource.push({
          id: i + '',
          virtualMachineName: Math.random().toString(36).substr(2).slice(0, 6),
          serverName: Math.random().toString(36).substr(2).slice(0, 6),
          loginAccount: Math.random().toString(36).substr(2).slice(0, 6),
          loginPassword: Math.random().toString(36).substr(2).slice(0, 6),
          status: Math.floor(Math.random() * 2) ? '启用' : '禁用',
          creatorName: Math.random().toString(36).substr(2).slice(0, 6),
          createTime: getLocalTime(parseInt(Math.random() * 10000000000 + 1500000000000)),
          modifierName: Math.random().toString(36).substr(2).slice(0, 6),
          modifyTime: getLocalTime(parseInt(Math.random() * 10000000000 + 1500000000000))
        })
      }
      let that = this;
      bus.$on("multipleSelection", (v) => { //勾选框选取
        that.multipleSelection = v
      })
      bus.$on("handleFilter", (v) => { //过滤条件
        bus.$emit("filterCondition", v, that.dataSource.filter(item => {
          if (
            item.roleName.indexOf(v) > -1 ||
            item.describe.indexOf(v) > -1
          ) {
            return true;
          }
        }));
      })
    },
    mounted() {
      clientHeight('#datagrid', '.toolbar', 115)

    }
  }

</script>

