<template>
  <el-table-column align="center" label="操作" width="125" fixed="right" v-if="operation">
    <template scope="scope">
      <el-button v-if="scope.row.status!='启用'" size="small" type="success" @click="handleModifyStatus(scope.row,'启用')">启用</el-button>
      <el-button v-if="scope.row.status!='禁用'" size="small" type="danger" @click="handleModifyStatus(scope.row,'禁用')">禁用</el-button>
      <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
    </template>
  </el-table-column>
</template>
<script>
  import bus from "@/utils/bus";
  export default {
    props: ['operation'],
    methods: {
      handleModifyStatus(row, status) { //改变状态
        this.$message.success("操作成功");
        row.status = status;
      },
      handleEdit(row) { //显示编辑界面
        bus.$emit("jh-edit-form", row); //发送事件的组件
      }
    }
  }
</script>