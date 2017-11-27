<template>
  <el-dialog id="roleRM" title="用户角色维护" v-model="anchor" size='large' top="5%">
    <el-table :data="roleList" border fit highlight-current-row height=x>
      <el-table-column type="selection" align="center" width="40">
      </el-table-column>
      <el-table-column v-for="column in roleColumns" :key="column.prop" :label="column.label" :min-width="column.width" align="center">
        <template scope="scope">
          <span>{{scope.row[column.prop]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="anchor = false">取 消</el-button>
      <el-button type="primary" @click="anchor = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import bus from "@/utils/bus"; //组件中央通信
  import {
    clientHeight
  } from "@/utils";
  export default {
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
        anchor: false
      };
    },
    created() {
      let _this = this;
      bus.$on("anchor", function (row) { //接收事件的组件
        _this.anchor = true;
      });
    },
    updated() {
      // clientHeight('#roleRM .el-table__body-wrapper',270)
      // let roleRM = document.querySelector("#roleRM ");
      let table = document.querySelector("#roleRM .el-table__body-wrapper");
      table.style.height = document.documentElement.clientHeight - 270 + "px"; //改变表格高度
      window.onresize = function () {
        table.style.height = document.documentElement.clientHeight - 270 + "px"; //改变表格高度
      }
    }
  };

</script>

