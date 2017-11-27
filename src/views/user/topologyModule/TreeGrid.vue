<template>
  <el-table id="topologyGrid" :data="data" @selection-change="changeFun" border style="width: 100%" :row-style="showTr" height=x stripe>
    <el-table-column type="selection" align="center" width="40"></el-table-column>
    <el-table-column type="index" label="序号" align="center" width="40" fixed="left"></el-table-column>
    <el-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text" :min-width="column.width" show-overflow-tooltip>
      <template scope="scope">
        <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>
        <button class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-caret-right" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>
        </button>
        <span v-else-if="index===0" class="ms-tree-space"></span>
        {{scope.row[column.dataIndex]}}
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作" width="125" fixed="right" v-if="operation">
      <template scope="scope">
        <el-button v-if="scope.row.status!='启用'" size="small" type="success" @click="handleModifyStatus(scope.row,'启用')">启用</el-button>
        <el-button v-if="scope.row.status!='禁用'" size="small" type="danger" @click="handleModifyStatus(scope.row,'禁用')">禁用</el-button>
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import Utils from "@/views/utils/index.js";
  import bus from "@/utils/bus";
  export default {
    props: ["treeStructure", "columns", "dataSource", "defaultExpandAll"],
    data() {
      return {
        operation: true,
        mockList: undefined,
      };
    },
    created() {
      let _this = this;
            this.$emit('ievent', this.data);

      bus.$on("filtrate", mockList => {
        //接收事件的组件
        _this.mockList = mockList;
      });
      bus.$on("operation", () => {
        _this.operation = !_this.operation;
      });
      bus.$on("handle-download", () => {
        _this.handleDownload();
      });
    },
    computed: {
      data: function () { // 格式化数据源
        if (this.mockList == undefined) {
          if (this.treeStructure)
            return Utils.MSDataTransfer.treeToArray(
              this.dataSource,
              null,
              null,
              this.defaultExpandAll
            );
          return this.dataSource;
        } else {
          return this.mockList;
        }
      }
    },
    methods: {
      changeFun(val) {
        // this.multipleSelection = val;
        // console.log(val)
        bus.$emit("multiple-selection",val)
      },
      handleModifyStatus(row, status) { //改变状态
        this.$message.success("操作成功");
        row.status = status;
      },
      handleEdit(index, row) { //显示编辑界面
        bus.$emit("jh-edit-form", row, this.dataSource); //发送事件的组件
      },

      handleDownload() { //数据导出
        require.ensure([], () => {
          const {
            export_json_to_excel
          } = require("vendor/Export2Excel");
          const list = Utils.MSDataTransfer.treeToArray(
            this.dataSource,
            null,
            null,
            this.defaultExpandAll
          );
          const tHeader = ["插件名称", "模块", "地址", "菜单图标", "描述", "状态", "创建人", "创建时间", "更新人", "更新时间"];
          const filterVal = ["pluginName", "module", "site", "menuIcon", "describe", "status", "creatorName", "createTime", "modifierName", "modifyTime"];
          const data = list.map(v =>
            filterVal.map(j => {
              return v[j];
            })
          );
          export_json_to_excel(tHeader, data, "table数据");
        });
      },

      showTr: function (row, index) { // 显示行
        let show = row._parent ?
          row._parent._expanded && row._parent._show :
          true;
        row._show = show;
        return show ? "" : "display:none;";
      },
      toggle: function (trIndex) { // 展开下级
        let record = this.data[trIndex];
        record._expanded = !record._expanded;
      },

      spaceIconShow(index) { // 显示层级关系的空格和图标
        if (this.treeStructure && index === 0) return true;
        return false;
      },

      toggleIconShow(index, record) { // 点击展开和关闭的时候，图标的切换
        if (
          this.treeStructure &&
          index === 0 &&
          record.children &&
          record.children.length > 0
        )
          return true;
        return false;
      }
    }
  };

</script>

