<template>
  <div>
    <el-table id="datagrid" :data="data" border height=x stripe @selection-change="changeFun">
      <el-table-column type="selection" align="center" width="40"></el-table-column>
      <el-table-column type="index" label="序号" align="center" width="40" fixed="left"></el-table-column>
      <el-table-column v-for="(column, index) in columns" :key="column.value" :label="column.label" :min-width="column.width" align="left" show-overflow-tooltip>
        <template scope="scope">
          <el-tag v-if="scope.row[column.value]==scope.row.status" :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
          <span v-if="scope.row[column.value]!=scope.row.status">{{scope.row[column.value]}}</span>
        </template>
      </el-table-column>
      <operation :operation='operation'></operation>
    </el-table>
  </div>
</template>
<script>
  import bus from "@/utils/bus";
  import operation from '@/views/components/operation'

  export default {
    props: ["columns", "dataSource"],
    components: { operation },
    data() {
      return {
        data: [],
        dataList: [],
        operation: true,
        filterList: undefined,
        multipleSelection: [],
        dataFilter: '',
        listQuery: {}
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
      let that = this;
      bus.$on("listQuery", (v) => {
        that.listQuery = v
        that.getList(that.dataFilter)
      });
      bus.$on("formData", () => { //新增或编辑后
        that.dataFilter = '' //清空筛选内容
        bus.$emit("resetFilter"); //重置筛选
        that.listQuery.page = 1; //重置页码
        that.getList()
      });
      bus.$on("operation", () => { //是否显示操作
        that.operation = !that.operation;
      });
      bus.$on("filterCondition", (v,dataList) => { //筛选
        that.dataList = dataList
        that.dataFilter = v
        that.getList(v)
      });
    },
    methods: {
      changeFun(val) { //勾选框选取
        bus.$emit("multipleSelection", val); //发送事件的组件
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
    }
  }

</script>

