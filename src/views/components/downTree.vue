<template>
  <el-dropdown trigger="click" menu-align="start">
    <el-input v-model="value" class="el-dropdown-link">

    </el-input>
    <el-dropdown-menu slot="dropdown">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" default-expand-all style="width:200px"></el-tree>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
  import bus from "@/utils/bus"; //组件中央通信

  export default {
    data() {
      return {
        value: '',
        data: [
          {
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {

      handleNodeClick(data,a,b) {
        console.log(this.value=data.label);
      }
    }
  }

</script>

