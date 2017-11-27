<template>
  <div>
    <el-table id="datagrid" :data="data" border height=x stripe @selection-change="changeFun">
      <el-table-column type="selection" align="center" width="40"></el-table-column>
      <el-table-column type="index" label="序号" align="center" width="40" fixed="left"></el-table-column>
      <el-table-column v-for="(column, index) in columns" :key="column.value" :label="column.label" :min-width="column.width" v-if="showColumn[column.value]"
        align="center" show-overflow-tooltip>
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
  import {
    timestamp
  } from "@/utils";
  export default {
    props: ["columns", "dataSource", 'showColumn'],
    components: {
      operation
    },

    data() {
      return {
        data: [],
        dataList: [],
        operation: true,
        filterList: undefined,
        multipleSelection: [],
        dataFilter: '',
        listQuery: {},
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
      bus.$on("resetFilter", () => { //新增或编辑后
        that.dataFilter = ''
        that.listQuery.page = 1; //重置页码
        that.getList()
      });
      bus.$on("operation", () => {
        that.operation = !that.operation;
      });
      bus.$on("handleFilter", (v, f) => { //筛选
        that.dataList = that.dataSource.filter(item => {
          if (v && v.length > 0) {
            if (
              item.workNo.indexOf(v) > -1 ||
              item.userName.indexOf(v) > -1 ||
              item.loginName.indexOf(v) > -1 ||
              item.email.indexOf(v) > -1 ||
              item.mobile.indexOf(v) > -1
            ) {
              return true;
            }
          } else {
            if (f['workNo'] && item.workNo.indexOf(f['workNo']) < 0) return false
            if (f['userName'] && item.userName.indexOf(f['userName']) < 0) return false
            if (f['loginName'] && item.loginName.indexOf(f['loginName']) < 0) return false
            if (f['positionName'] && item.positionName.indexOf(f['positionName']) < 0) return false
            if (f['email'] && item.email.indexOf(f['email']) < 0) return false
            if (f['mobile'] && item.mobile.indexOf(f['mobile']) < 0) return false
            if (f['status'] && item.status.indexOf(f['status']) < 0) return false
            if (f['loginFailCount'] && item.loginFailCount.indexOf(f['loginFailCount']) < 0) return false
            if (f['last_login_timeS'] && f['last_login_timeE']) {
              if (timestamp(item.last_login_time) > timestamp(f['last_login_timeE'])) return false
              if (timestamp(item.last_login_time) < timestamp(f['last_login_timeS'])) return false
            }
            if (f['creatorName'] && item.creatorName.indexOf(f['creatorName']) < 0) return false
            if (f['createTimeS'] && f['createTimeE']) {
              if (timestamp(item.createTime) > timestamp(f['createTimeE'])) return false
              if (timestamp(item.createTime) < timestamp(f['createTimeS'])) return false
            }
            if (f['modifierName'] && item.modifierName.indexOf(f['modifierName']) < 0) return false
            if (f['modifyTimeS'] && f['modifyTimeE']) {
              if (timestamp(item.modifyTime) > timestamp(f['modifyTimeE'])) return false
              if (timestamp(item.modifyTime) < timestamp(f['modifyTimeS'])) return false
            }
            return true
          }
        });
        that.dataFilter = f
        that.getList(f)
      });
    },
    methods: {
      changeFun(val) {
        bus.$emit("multipleSelection", val); //发送事件的组件
      },
      getList(v) { //数据渲染
        let limit = this.listQuery.limit //每页条数
        let page = this.listQuery.page //当前页
        if (typeof v == 'object') {
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

