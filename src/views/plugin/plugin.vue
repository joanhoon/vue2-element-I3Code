<template>
  <div class="app-container tree-grid">
    <tool-bar :data-source="dataSource"></tool-bar>
    <tree-grid :columns="columns" :tree-structure="true" :data-source="dataSource" :default-expand-all="defaultExpandAll"></tree-grid>
    <add-edit-form :data-source="dataSource"></add-edit-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    clientHeight
  } from "@/utils";
  import {
    toolBar,
    TreeGrid,
    addEditForm,
  } from './component'
  export default {
    components: {
      toolBar,
      TreeGrid,
      addEditForm,
    },
    data() {
      return {
        treeStructure: false, //树形格式化
        columns: [], //数据表头
        dataSource: [], //数据列表
        defaultExpandAll: true //是否默认展开所有树
      }
    },
    methods: {
      getGoodsList() { //获取本地json数据
        var that = this
        axios.get('/goods').then((res) => {
          console.log(res)
          that.columns = res.data.columns
          that.dataSource = res.data.dataSource
        })
      },
    },
    mounted() {
      this.getGoodsList()
      clientHeight('#treegrid','.toolbar', 75)

    }
  }

</script>


<style lang="scss">
  .tree-grid .el-table__row {
    >td:nth-child(3) {
      text-align: left;
      button {
        cursor: pointer;
        border: none;
        background: transparent;
        outline: none;
      }
    }
  }

  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }

  .ms-tree-space::before {
    content: ""
  }

  table td {
    line-height: 26px;
  }

</style>

