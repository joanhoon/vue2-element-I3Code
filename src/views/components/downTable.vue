<template>
<el-dropdown trigger="click">
  <el-input v-model="value" class="el-dropdown-link">
    
  </el-input>
  <el-dropdown-menu slot="dropdown">
        <el-table :data="dataSource" border highlight-current-row @current-change="handleCurrentChange" height=500 style="width: 100%">
          <el-table-column v-for="(column, index) in columns" :key="column.value" :label="column.label" :min-width="column.width" align="center"
            show-overflow-tooltip >
            <template scope="scope">
              <span >{{scope.row[column.value]}}</span>
            </template>
          </el-table-column>
        </el-table>
  </el-dropdown-menu>
</el-dropdown>
</template>
<script>
  import bus from "@/utils/bus"; //组件中央通信

  export default {
    data() {
      return {
        value:'下拉菜单',
        FM: false,
        columns: [{
            value: "ip",
            label: "IP",
            width: "80"
          },
          {
            value: "port",
            label: "端口号",
            width: "80"
          },
          {
            value: "name",
            label: "名称",
            width: "80"
          },
          {
            value: "describe",
            label: "描述",
            width: "80"
          },
          {
            value: "filePath",
            label: "文件路径",
            width: "80"
          },
          {
            value: "status",
            label: "状态",
            width: "80"
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
        dataSource: [{
            id: '1',
            ip: '127.0.0.1',
            port: '8082',
            name: 'localhost',
            describe: '',
            filePath: '/var/i3plus/authority',
            status: '启用',
            creatorName: 'jh',
            createTime: '2017/11/07',
            modifierName: 'jh',
            modifyTime: '2017/11/07',
          },
          {
            id: '2',
            ip: '127.0.0.1',
            port: '8083',
            name: 'test',
            describe: '',
            filePath: '/var/i3plus/authority',
            status: '启用',
            creatorName: 'jh',
            createTime: '2017/11/07',
            modifierName: 'jh',
            modifyTime: '2017/11/07',
          }
        ],
      }
    },
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
            handleCurrentChange(val) {
              console.log(this.value=val.name)
      }
    }
  }

</script>

