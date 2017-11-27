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
  } from './serverModule'
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
            value: 'ipAddress',
            label: 'IP地址',
            width: 100
          },
          {
            value: 'backgroundPortNo',
            label: '后台端口号',
            width: 100
          },
          {
            value: 'clientPortNo',
            label: '客户端端口号',
            width: 100
          },
          {
            value: 'serverName',
            label: '服务器名称',
            width: 100
          },
          {
            value: 'runningState',
            label: '运行状态',
            width: 100
          },
          {
            value: 'describe',
            label: '描述',
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
            label: 'IP地址',
            prop: 'ipAddress'
          },
          {
            label: '后台端口号',
            prop: 'backgroundPortNo'
          },
          {
            label: '客户端端口号',
            prop: 'clientPortNo'
          },
          {
            label: '服务器名称',
            prop: 'serverName'
          },
          {
            label: '描述',
            prop: 'describe'
          },
        ],
        multipleSelection: []
      }
    },
    created() {
      for (let i = 1; i <= 100; i++) {
        this.dataSource.push({
          id: i + '',
          ipAddress: Math.random().toString(36).substr(2).slice(0, 6),
          backgroundPortNo: Math.random().toString(36).substr(2).slice(0, 6),
          clientPortNo: Math.random().toString(36).substr(2).slice(0, 6),
          serverName: Math.random().toString(36).substr(2).slice(0, 6),
          runningState: Math.random().toString(36).substr(2).slice(0, 6),
          describe: Math.random().toString(36).substr(2).slice(0, 6),
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

