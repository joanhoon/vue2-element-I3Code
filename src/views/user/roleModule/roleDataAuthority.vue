<template>
  <el-dialog id="roleDA" title="角色数据管理" v-model="dataAuthority" size='large' top='5%'>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-table class="dialog" :data="roleList" border fit highlight-current-row>
          <el-table-column type="selection" align="center" width="40">
          </el-table-column>
          <el-table-column prop="roleName" label="工厂名称" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="150" align="center">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table class="dialog" :data="roleList" border fit highlight-current-row>
          <el-table-column type="selection" align="center" width="40">
          </el-table-column>
          <el-table-column prop="roleName" label="仓库名称" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="150" align="center">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dataAuthority = false">取 消</el-button>
      <el-button type="primary" @click="dataAuthority = false">确 定</el-button>
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
        roleList: [ //角色维护虚拟数据
          {
            roleName: "管理员",
            createTime: "2011-11-11",
            describe: ""
          },
          {
            roleName: "超级管理员",
            createTime: "2011-11-11",
            describe: ""
          }
        ],
        dataAuthority: false
      };
    },
    created() {
      let _this = this;
      bus.$on("dataAuthority", function (row) { //接收事件的组件
        _this.dataAuthority = true;
      });
    },
    updated() {
      // let roleDA = document.querySelector("#roleDA");
      let table = document.querySelectorAll("#roleDA .el-table__body-wrapper");
      table[0].style.height = document.documentElement.clientHeight - 270 + "px"; //改变表格高度
      table[1].style.height = document.documentElement.clientHeight - 270 + "px"; //改变表格高度
      window.onresize = function () {
        table[0].style.height = document.documentElement.clientHeight - 270 + "px"; //改变表格高度
        table[1].style.height = document.documentElement.clientHeight - 270 + "px"; //改变表格高度
      }
    }
  };

</script>

