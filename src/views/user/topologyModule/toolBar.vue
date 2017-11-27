<template>
  <div class="toolbar">
    <div class="tool-container clearfix">
      <el-button class="filter-item" type="primary" v-waves @click="handleCreate">
        <icon-svg icon-class="add"></icon-svg>&nbsp;新增</el-button>
      <el-button class="filter-item" type="primary" icon="document" v-waves @click="handleDownload">数据导出</el-button>
      <el-button class="filter-item" type="primary" icon="document" v-waves @click="operation">编辑模式</el-button>
      <div class="filter-input">
        <el-input icon="search" size="small" placeholder="插件名称" @change='handleClick' v-model="filtrate"></el-input>
      </div>
    </div>
  </div>
</template>
<script>
  import Utils from "@/views/utils/index.js";

  import bus from "@/utils/bus"; //中央通信组件
  import waves from "@/directive/waves.js"; // 水波纹指令

  export default {
    directives: {
      waves
    }, //水波纹
    props: ["dataSource"],
    data() {
      return {
        filtrate: undefined,
        dataArr: undefined,
        multipleSelection: [],
        columns: [],
        dataSourceSFM: [],
        formColumns: []
      };
    },
    created() {
      bus.$on("multiple-selection", (v) => {
        //checkbox选中数据
        this.multipleSelection = v;
      });
    },
    methods: {
      dataSourceArr() { //获取数据源
        return Utils.MSDataTransfer.treeToArray(this.dataSource, null, null, true);
      },
      handleClick(v) { //筛选
        let dataArr = this.dataArr,
          filtrate = this.filtrate;
        if (dataArr === undefined) dataArr = this.dataSourceArr();

        let mockList = dataArr.filter(item => {
          if (
            item.pluginName.indexOf(filtrate) > -1 ||
            item.module.indexOf(filtrate) > -1
          )
            return true;
        });
        if (filtrate != undefined) bus.$emit("filtrate", mockList);
      },
      operation() {
        bus.$emit("operation");
      },
      handleCreate() { //显示新增界面
        bus.$emit("jh-add-form", this.dataSourceArr()); //发送事件的组件
      },
      handleDownload() { //数据导出
        bus.$emit("handle-download"); //发送事件的组件
      }
    }
  };

</script>

