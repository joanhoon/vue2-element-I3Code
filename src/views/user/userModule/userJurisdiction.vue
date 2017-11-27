<template>
  <el-dialog title="用户权限" v-model="jurisdiction" size='large' top="5%">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>
        <el-tree class="filter-tree" :data="data2" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree2">
        </el-tree>
      </el-col>
      <el-col :span="18">
      
      <el-table id="userJ" :data="roleList" border fit highlight-current-row height=x>
        <el-table-column type="selection" align="center" width="40">
        </el-table-column>
        <el-table-column v-for="column in roleColumns" :key="column.prop" :label="column.label" :min-width="column.width" align="center">
          <template scope="scope">
            <span>{{scope.row[column.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
      </el-col>
      
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="jurisdiction = false">取 消</el-button>
      <el-button type="primary" @click="jurisdiction = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import bus from "@/utils/bus"; //组件中央通信
  import {
    clientHeight
  } from "@/utils";
  export default {
    watch: {
      filterText(val) { //树桩控件筛选
        this.$refs.tree2.filter(val);
      }
    },
    data() {
      return {
        roleColumns: [{
            prop: "roleName",
            label: "角色名",
            width: "150"
          },
          {
            prop: "status",
            label: "状态",
            width: "150"
          },
          {
            prop: "describe",
            label: "描述",
            width: "250"
          }
        ],
        roleList: [ //角色维护虚拟数据
          {
            roleName: "管理员",
            status: "禁用",
            describe: ""
          },
          {
            roleName: "超级管理员",
            status: "禁用",
            describe: ""
          }
        ],
        filterText: "",
        data2: [ //插件树数据
          {
            id: 1,
            label: "平台管理",
            children: [{
                id: 2,
                label: "插件管理",
                children: [{
                  id: 4,
                  label: "插件管理"
                }, {
                  id: 5,
                  label: "用户权限管理"
                }]
              },
              {
                id: 3,
                label: "用户管理",
                children: [{
                    id: 6,
                    label: "test"
                  },
                  {
                    id: 7,
                    label: "仓库管理"
                  },
                  {
                    id: 8,
                    label: "企业拓扑图"
                  },
                  {
                    id: 9,
                    label: "用户管理"
                  },
                  {
                    id: 10,
                    label: "角色管理"
                  }
                ]
              }
            ]
          }
        ],
        defaultProps: {
          children: "children",
          label: "label"
        },
        jurisdiction: false
      };
    },
    created() {
      let _this = this;
      bus.$on("jurisdiction", function (row) { //接收事件的组件
        _this.jurisdiction = true;
      });
    },
    methods: {
      filterNode(value, data) { //用户权限树状控件筛选
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },
    updated() {
      let tree = document.querySelector(".filter-tree");
      let userJ = document.querySelector("#userJ");
      let table = userJ.querySelector(".el-table__body-wrapper");
      table.style.height = document.documentElement.clientHeight - 270 + "px"; //改变表格高度
      tree.style.height = document.documentElement.clientHeight - 270 + "px"; //改变表格高度
      window.onresize = function () {
        table.style.height = document.documentElement.clientHeight - 270 + "px"; //改变表格高度
        tree.style.height = document.documentElement.clientHeight - 270 + "px"; //改变表格高度
      }
    }
  };

</script>
<style lang="scss" scoped>
.filter-tree{
  overflow: auto;
}
</style>

