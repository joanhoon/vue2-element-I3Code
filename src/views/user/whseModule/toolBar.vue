<template>
  <div class="toolbar">
    <div class="tool-container clearfix">
      <el-button class="filter-item" type="primary" v-waves @click="handleCreate">
        <icon-svg icon-class="add"></icon-svg>&nbsp;新增 </el-button>
      <el-button class="filter-item" type="primary" v-waves @click="operation">
        <icon-svg icon-class="edit"></icon-svg>&nbsp;编辑 </el-button>
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
      handleCreate() { //显示新增界面
        bus.$emit("jh-add-form"); //发送事件的组件
      },
      handleDownload() { //数据导出
        bus.$emit('handle-download'); //发送事件的组件
      }
    }
  };

</script>

