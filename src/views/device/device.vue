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
  } from './deviceModule'

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
            value: 'deviceLibraryNo',
            label: '设备库编号',
            width: 100
          },
          {
            value: 'deviceLibraryName',
            label: '设备库名称',
            width: 100
          },
          {
            value: 'deviceName',
            label: '设备名称',
            width: 80
          },
          {
            value: 'interfaceTypeNo',
            label: '接口类型编号',
            width: 120
          },
          {
            value: 'interfaceTypeName',
            label: '接口类型名称',
            width: 120
          },
          {
            value: 'mark',
            label: '标志',
            width: 60
          },
          {
            value: 'connectType',
            label: '连接类型',
            width: 80
          },
          {
            value: 'collectMode',
            label: '采集方式',
            width: 80
          },
          {
            value: 'ip',
            label: 'IP',
            width: 60
          },
          {
            value: 'portNumber',
            label: '端口号',
            width: 70
          },
          {
            value: 'mac',
            label: 'MAC',
            width: 60
          },
          {
            value: 'parameter1',
            label: '参数一',
            width: 70
          },
          {
            value: 'parameter2',
            label: '参数二',
            width: 70
          },
          {
            value: 'parameter3',
            label: '参数三',
            width: 70
          },
          {
            value: 'parameter4',
            label: '参数四',
            width: 70
          },
          {
            value: 'parameter5',
            label: '参数五',
            width: 70
          },
          {
            value: 'parameter6',
            label: '参数六',
            width: 70
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
            label: '设备库编号',
            prop: 'deviceLibraryNo'
          },
          {
            label: '设备库名称',
            prop: 'deviceLibraryName'
          },
          {
            label: '设备名称',
            prop: 'deviceName'
          },
          {
            label: '接口类型',
            prop: 'interfaceTypeName'
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
          deviceLibraryNo: Math.random().toString(36).substr(2).slice(0, 6),
          deviceLibraryName: Math.random().toString(36).substr(2).slice(0, 6),
          deviceName: Math.random().toString(36).substr(2).slice(0, 6),
          interfaceTypeNo: Math.random().toString(36).substr(2).slice(0, 6),
          interfaceTypeName: Math.random().toString(36).substr(2).slice(0, 6),
          mark: Math.random().toString(36).substr(2).slice(0, 6),
          connectType: Math.random().toString(36).substr(2).slice(0, 6),
          collectMode: Math.random().toString(36).substr(2).slice(0, 6),
          ip: Math.random().toString(36).substr(2).slice(0, 6),
          portNumber: Math.random().toString(36).substr(2).slice(0, 6),
          mac: Math.random().toString(36).substr(2).slice(0, 6),
          parameter1: Math.random().toString(36).substr(2).slice(0, 6),
          parameter2: Math.random().toString(36).substr(2).slice(0, 6),
          parameter3: Math.random().toString(36).substr(2).slice(0, 6),
          parameter4: Math.random().toString(36).substr(2).slice(0, 6),
          parameter5: Math.random().toString(36).substr(2).slice(0, 6),
          parameter6: Math.random().toString(36).substr(2).slice(0, 6),
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
            item.deviceLibraryNo.indexOf(v) > -1 ||
            item.deviceLibraryName.indexOf(v) > -1
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

