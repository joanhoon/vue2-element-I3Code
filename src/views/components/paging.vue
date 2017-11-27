<template>
  <div class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
      :page-sizes="listQuery.pageSizes" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.total">
    </el-pagination>
  </div>
</template>
<script>
  import bus from "@/utils/bus";
  export default {
    props: ["dataSource"],
    data() {
      return {
        data: null,
        listQuery: {
          total: null,
          page: 1,
          limit: 50,
          pageSizes: [1, 2, 20, 50, 100, 300],
        }
      }
    },
    created() {
      this.listQuery.total = this.dataSource
      bus.$emit('listQuery', this.listQuery);
    },
    methods: {
      handleSizeChange(val) { //每页条数
        this.listQuery.limit = val;
        bus.$emit("listQuery", this.listQuery)
      },
      handleCurrentChange(val) { //当前页
        this.listQuery.page = val;
        bus.$emit("listQuery", this.listQuery)

      },
    },
  }
</script>

