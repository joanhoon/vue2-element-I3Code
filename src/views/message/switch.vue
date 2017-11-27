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
  } from './switchModule'
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
            value: 'switchName',
            label: '交换机名称',
            width: 100
          },
          {
            value: 'SwitchType',
            label: '交换机类型',
            width: 100
          },
          {
            value: 'species',
            label: '种类',
            width: 60
          },
          {
            value: 'switchPersistence',
            label: '交换机持久性',
            width: 100
          },
          {
            value: 'autoDelete',
            label: '自动删除',
            width: 80
          },
          {
            value: 'parameter',
            label: '参数',
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

        formRules: {},
        formColumns: [{
            label: '虚拟机名称',
            prop: 'virtualMachineName'
          },
          {
            label: '交换机名称',
            prop: 'switchName'
          },
          {
            label: '交换机类型',
            prop: 'SwitchType'
          },
          {
            label: '种类',
            prop: 'species'
          },
          {
            label: '交换机持久性',
            prop: 'switchPersistence'
          },
          {
            label: '自动删除',
            prop: 'autoDelete'
          },
          {
            label: '参数',
            prop: 'parameter'
          }
        ],
        multipleSelection: []
      }
    },
    created() {
      for (let i = 1; i <= 100; i++) {
        this.dataSource.push({
          id: i + '',
          virtualMachineName: Math.random().toString(36).substr(2).slice(0, 6),
          switchName: Math.random().toString(36).substr(2).slice(0, 6),
          SwitchType: Math.random().toString(36).substr(2).slice(0, 6),
          species: Math.random().toString(36).substr(2).slice(0, 6),
          switchPersistence: Math.random().toString(36).substr(2).slice(0, 6),
          autoDelete: Math.random().toString(36).substr(2).slice(0, 6),
          parameter: Math.random().toString(36).substr(2).slice(0, 6),
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

