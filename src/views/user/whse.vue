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
  import { clientHeight, getLocalTime } from "@/utils";
  import {
    toolBar,
    dataGrid,
    addEditForm,
    paging
  } from './whseModule'

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
            value: 'whseName',
            label: '仓库名称',
            width: 100
          },
          {
            value: 'site',
            label: '地址',
            width: 60
          },
          {
            value: 'phone',
            label: '电话',
            width: 60
          },
          {
            value: 'fax',
            label: '传真',
            width: 60
          },
          {
            value: 'contacts',
            label: '联系人',
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
            width: 100
          },
          {
            value: 'modifierName',
            label: '更新人',
            width: 70
          },
          {
            value: 'modifyTime',
            label: '更新时间',
            width: 100
          },
        ],
        dataSource: [ //数据列表
        ],
        formRules: { //表单验证
        },
        formColumns: [ //表单
          {
            label: '仓库名称',
            prop: 'whseName'
          },
          {
            label: '地址',
            prop: 'site'
          },
          {
            label: '电话',
            prop: 'phone'
          },
          {
            label: '传真',
            prop: 'fax'
          },
          {
            label: '联系人',
            prop: 'contacts'
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
          whseName: Math.random().toString(36).substr(2).slice(0, 6),
          site: Math.random().toString(36).substr(2).slice(0, 6),
          phone: parseInt(999999 * Math.random()) + '',
          fax: parseInt(999999 * Math.random()) + '',
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
            item.whseName.indexOf(v) > -1 ||
            item.site.indexOf(v) > -1
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