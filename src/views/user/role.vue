<template>
  <div class="app-container">
    <tool-bar :multipleSelection='multipleSelection'></tool-bar>
    <data-grid :columns='columns' :dataSource='dataSource'></data-grid>
    <paging :dataSource='dataSource'></paging>
    <add-edit-form :formColumns='formColumns' :formRules='formRules' :dataSource='dataSource'></add-edit-form>
    <role-maintain></role-maintain>
    <role-data-authority></role-data-authority>
  </div>
</template>

<script>
  import bus from "@/utils/bus";
  import { clientHeight, getLocalTime } from "@/utils";
  import {
    toolBar,
    dataGrid,
    addEditForm,
    roleMaintain,
    roleDataAuthority,
    paging
  } from './roleModule'

  export default {
    components: {
      toolBar,
      dataGrid,
      addEditForm,
      roleMaintain,
      roleDataAuthority,
      paging
    },

    data() {
      return {
        columns: [ //数据表头
          {
            value: 'roleName',
            label: '角色名称',
            width: 100
          },
          {
            value: 'describe',
            label: '描述',
            width: 60
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
        formRules: { //表单验证
        },
        formColumns: [ //表单
          {
            label: '角色名称',
            prop: 'roleName'
          },
          {
            label: '描述',
            prop: 'describe'
          },
          {
            label: '状态',
            prop: 'status'
          }
        ],
        multipleSelection: [ //勾选框选取
        ]
      }
    },
    created() {
      for (let i = 1; i <= 100; i++) {
        this.dataSource.push({
          id: i + '',
          roleName: Math.random().toString(36).substr(2).slice(0, 6),
          describe: Math.random().toString(36).substr(2).slice(0, 6),
          contacts: Math.random().toString(36).substr(2).slice(0, 6),
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