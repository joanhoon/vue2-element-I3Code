<template>
  <div class="toolbar">
    <div class="tool-container clearfix">
      <el-button class="filter-item" type="primary" v-waves @click="handleCreate">
        <icon-svg icon-class="add"></icon-svg>&nbsp;新增 </el-button>
      <el-button class="filter-item" type="primary" v-waves @click="operation">
        <icon-svg icon-class="edit"></icon-svg>&nbsp;编辑 </el-button>
      <el-button class="filter-item" type="primary" v-waves @click="start(multipleSelection)">
        <icon-svg icon-class="roleMaintaining"></icon-svg>&nbsp;启动 </el-button>
      <el-button class="filter-item" type="primary" v-waves @click="close(multipleSelection)">
        <icon-svg icon-class="roleMaintaining"></icon-svg>&nbsp;关闭 </el-button>
      <el-button class="filter-item" type="primary" v-waves @click="initialize(multipleSelection)">
        <icon-svg icon-class="roleMaintaining"></icon-svg>&nbsp;初始化 </el-button>
      <el-button class="filter-item" type="primary" icon="document" v-waves @click="handleDownload">导出</el-button>
      <div class="filter-input">
        <el-input icon="search" size="small" placeholder="输入关键字进行过滤" @change="handleFilter" v-model="dataFilter"></el-input>
      </div>
    </div>
  </div>
</template>
<script>
  import bus from "@/utils/bus"; //组件中央通信
  import waves from "@/directive/waves.js"; // 水波纹指令

  export default {
    directives: { //水波纹
      waves
    },
    props: ["dataSource", "multipleSelection", "showColumn", "listQuery"],
    data() {
      return {
        dataFilter: ''
      };
    },
    created() {
      bus.$on("resetFilter", (v) => { //筛选
        this.dataFilter = ''
      })
    },
    methods: {
      handleFilter(v) { //筛选
        bus.$emit("handleFilter", v);
      },
      operation() {
        bus.$emit("operation");
      },
      start(row) {
        if (row.length > 0) {
          this.$message.success("启动");
        } else {
          this.$message.error("请选择要启动");
        }
      },
      close(row) {
        if (row.length > 0) {
          this.$message.success("关闭");
        } else {
          this.$message.error("请选择要关闭");
        }
      },
      initialize(row) {
        if (row.length > 0) {
          this.$message.success("初始化");
        } else {
          this.$message.error("请选择要初始化");
        }
      },
      handleCreate() { //显示新增界面
        bus.$emit("jh-add-form"); //发送事件的组件
      },
      handleDownload() { //数据导出
        bus.$emit('handle-download'); //发送事件的组件
      }
    }
  };

</script>

