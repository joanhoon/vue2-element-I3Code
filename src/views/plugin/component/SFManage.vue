<template>
  <div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" size='large' top="5%">
      <div class="toolbar">
        <div class="tool-container clearfix">
          <el-button class="filter-item" type="primary" v-waves @click="handleCreateFM">
            <icon-svg icon-class="add"></icon-svg>&nbsp;新增</el-button>
          <el-button class="filter-item" type="primary" icon="document" v-waves @click="operation=!operation">编辑模式</el-button>
          <div class="filter-input">
            <el-input icon="search" size="small" placeholder="插件名称" @change='handleClick' v-model="dataFilter"></el-input>
          </div>
        </div>
      </div>
      <el-table id="SFManage" :data="data" border height=x style="width: 100%">
        <el-table-column type="selection" align="center" width="40"></el-table-column>
        <el-table-column prop="id" label="序号" align="center" width="40" fixed="left"></el-table-column>
        <el-table-column v-for="column in columns" :key="column.value" :label="column.label" :min-width="column.width" show-overflow-tooltip>
          <template scope="scope">
            <el-tag v-if="scope.row[column.value]==scope.row.status" :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
            <span v-if="scope.row[column.value]!=scope.row.status">{{scope.row[column.value]}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="125" fixed="right" v-if='operation'>
          <template scope="scope">
            <el-button v-if="scope.row.status!='启用'" size="small" type="success" @click="handleModifyStatus(scope.row,'启用')">启用</el-button>
            <el-button v-if="scope.row.status!='禁用'" size="small" type="danger" @click="handleModifyStatus(scope.row,'禁用')">禁用</el-button>
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <paging :dataSource='dataSource'></paging>
    </el-dialog>
    <add-edit-form :formColumns='formColumns' :formRules='formRules' :dataSource='dataSource'></add-edit-form>
  </div>
</template>
<script>
  import bus from "@/utils/bus"; //组件中央通信
  import waves from "@/directive/waves.js"; // 水波纹指令
  import addEditForm from "@/views/components/addEditForm"
  import paging from "@/views/components/paging"

  export default {
    directives: {
      waves
    }, //水波纹
    components: {
      addEditForm,
      paging
    },
    props: ['columns', 'formColumns'],
    data() {
      return {

        dataSource: [],
        SFManage: false,
        operation: true,
        dialogFormVisible: false, //弹出层隐藏

        formRules: { //表单验证
        },
        data: [],
        dataList: [],
        dataFilter: '',

        listQuery: {},
        textMap: { //弹出层title
          SManage: "服务管理",
          FManage: "功能管理"
        },
        dialogStatus: "", //弹出层title
      }
    },
    filters: {
      statusFilter(status) { //状态样式
        const statusMap = {
          启用: "success",
          禁用: "danger"
        };
        return statusMap[status];
      }
    },
    created() {
      let that = this
      bus.$on("sf-manage", (v, o) => { //接收事件的组件
        that.dataSource = o
        that.dialogStatus = v;
        that.dialogFormVisible = true
        that.getList(that.dataFilter)
      });
      bus.$on("listQuery", (v) => {
        that.listQuery = v
        that.getList(that.dataFilter)
      });
      bus.$on("formData", () => { //新增或编辑后
        that.dataFilter = ''
        bus.$emit("resetFilter"); //重置筛选
        that.listQuery.page = 1; //重置页码
        that.getList()
      });
    },
    methods: {
      handleClick(v) { //筛选
        this.dataList = this.dataSource.filter(item => {
          if (this.dialogStatus == 'FManage') {
            if (
              item.functionName.indexOf(v) > -1 ||
              item.controlName.indexOf(v) > -1 ||
              item.describe.indexOf(v) > -1
            ) {
              return true;
            }
          } else {
            if (
              item.ip.indexOf(v) > -1 ||
              item.port.indexOf(v) > -1 ||
              item.name.indexOf(v) > -1 ||
              item.filePath.indexOf(v) > -1 ||
              item.describe.indexOf(v) > -1
            ) {
              return true;
            }
          }
        });
          this.dataFilter = v
          this.getList(v)
      },
      getList(v) { //数据渲染
        let limit = this.listQuery.limit //每页条数
        let page = this.listQuery.page //当前页
        if (v && v.length > 0) {
          this.listQuery.total = this.dataList.length
          this.data = this.dataList.slice((page - 1) * limit, page * limit)
        } else {
          this.listQuery.total = this.dataSource.length
          this.data = this.dataSource.slice((page - 1) * limit, page * limit)
        }
      },
      handleCreateFM() {
        bus.$emit("jh-add-form"); //发送事件的组件
      },

      handleEdit(row) { //
        bus.$emit("jh-edit-form", row); //发送事件的组件
      },

      handleModifyStatus(row, status) { //改变状态
        this.$message.success("操作成功");
        row.status = status;
      },
    },
    updated() {
      let SFManage = document.querySelector("#SFManage");
      if (SFManage) {
        SFManage.style.height = document.documentElement.clientHeight - 250 + "px"; //改变表格高度
        window.onresize = function () {
          SFManage.style.height = document.documentElement.clientHeight - 250 + "px"
        }
      }
    }
  }

</script>

