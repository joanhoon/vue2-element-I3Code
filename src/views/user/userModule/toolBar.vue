<template>
  <div class="toolbar">
    <div class="tool-container clearfix">
      <el-button class="filter-item" type="primary" v-waves @click="handleCreate">
        <icon-svg icon-class="add"></icon-svg>&nbsp;新增 </el-button>
      <el-button class="filter-item" type="primary" v-waves @click="operation">
        <icon-svg icon-class="edit"></icon-svg>&nbsp;编辑 </el-button>
      <el-button class="filter-item" type="primary" v-waves @click="accountUnlock(multipleSelection)">
        <icon-svg icon-class="deblocking"></icon-svg>&nbsp;账号解锁 </el-button>
      <el-button class="filter-item" type="primary" v-waves @click="initialize(multipleSelection)">
        <icon-svg icon-class="initialization"></icon-svg>&nbsp;密码初始化 </el-button>
      <el-button class="filter-item" type="primary" v-waves @click="userRoleMaintain(multipleSelection)">
        <icon-svg icon-class="roleMaintaining"></icon-svg>&nbsp;用户角色维护 </el-button>
      <el-button class="filter-item" type="primary" v-waves @click="userJurisdiction(multipleSelection)">
        <icon-svg icon-class="userAuthority"></icon-svg>&nbsp;用户权限 </el-button>
      <el-button class="filter-item" type="primary" v-waves @click="userDataAuthority(multipleSelection)">
        <icon-svg icon-class="dataAuthority"></icon-svg>&nbsp;用户数据权限管理 </el-button>
      <el-button class="filter-item" type="primary" icon="document" v-waves @click="handleDownload">导出</el-button>
      <el-button class="filter-item" type="primary" v-waves @click="showBox = !showBox">
        <icon-svg icon-class="hiddenList"></icon-svg>&nbsp;隐藏列 </el-button>
      <el-dialog class="clearfix show-column-box hidden-columns" title="隐藏列" :visible.sync="showBox" height='100px'>
        <ul>
          <li v-for="item in columns" :key='item.label'>
            <span style="line-height: 35px;">
              {{item.label}}
            </span>
            <el-button class="filter-item fr" v-if="showColumn[item.value]==true" type="danger" @change='tableKey=tableKey+1' @click="showColumn[item.value]=!showColumn[item.value]">
              隐藏
            </el-button>
            <el-button class="filter-item fr" v-if="showColumn[item.value]==false" type="success" @change='tableKey=tableKey+1' @click="showColumn[item.value]=!showColumn[item.value]">
              显示
            </el-button>
          </li>
        </ul>
      </el-dialog>
      <el-button class="filter-item" type="primary" v-waves @click="filterDialog">
        <icon-svg icon-class="filter"></icon-svg>&nbsp;筛选</el-button>
      <el-dialog id="filter" title='数据筛选' v-model='filterCondition' top=5%>
        <div v-for="item in columns" :key='item.value'>
          <el-row v-if="item.value!='loginPassword'&&item.value!='photo'&&item.value!='last_login_time'&&item.value!='createTime'&&item.value!='modifyTime'"
            class="filter-item">
            <el-col :span='4' :sm='6' :xs='8'>
              <span>{{item.label}}:</span>
            </el-col>
            <el-col :span='20' :sm='18' :xs='16'>
              <el-input v-if="item.value!='status'" v-model="listFilter[item.value]"></el-input>
              <el-select v-else v-model="listFilter[item.value]" placeholder="请选择">
                <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row v-if="item.value=='last_login_time'||item.value=='createTime'||item.value=='modifyTime'" class="filter-item">
            <el-col :span='4' :sm='6' :xs='8'>
              <span>{{item.label}}:</span>
            </el-col>
            <el-col :span='10' :sm='9' :xs='8'>
              <el-date-picker v-model="listFilter[(item.value+'S')]" placeholder="选择日期范围"></el-date-picker>
            </el-col>
            <el-col :span='10' :sm='9' :xs='8'>
              <el-date-picker v-model="listFilter[item.value+'E']" placeholder="选择日期范围"></el-date-picker>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" v-waves icon="search" @click='handleFilter'>筛选</el-button>
          <el-button type="primary" v-waves icon="search" @click='resetForm(listFilter)'>重置</el-button>
        </div>
      </el-dialog>
      <div class="filter-input" style="">
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
    props: ["columns", "multipleSelection", "showColumn", "dataSource"],
    data() {
      return {
        dataFilter: '',
        showBox: false, //列隐藏
        filterCondition: false,
        statusOptions: ['启用', '禁用'],
        listFilter: {
          workNo: '',
          userName: '',
          loginName: '',
          positionName: '',
          email: '',
          mobile: '',
          status: '',
          loginFailCount: '',
          last_login_timeS: '',
          last_login_timeE: '',
          creatorName: '',
          createTimeS: '',
          createTimeE: '',
          modifierName: '',
          modifyTimeS: '',
          modifyTimeE: ''
        }
      };
    },
    created() {
      bus.$on("formData", (v) => { //筛选
        bus.$emit("resetFilter"); //重置筛选
        this.dataFilter = ''
      })
    },
    methods: {
      filterDialog() {
        bus.$emit("resetFilter"); //重置筛选
        this.dataFilter = ''
        this.filterCondition = true
      },
      handleFilter(v) { //筛选
        bus.$emit("handleFilter", v,this.listFilter);
        this.filterCondition = false
      },
      resetForm(formName) { //重置筛选条件
        this.listFilter= formName
      },
      operation() {
        bus.$emit("operation");
      },
      handleCreate() { //显示新增界面
        bus.$emit("jh-add-form");
      },
      accountUnlock(row) { //账号解锁
        if (row.length > 1) {
          this.$message.success("账号解锁成功");
        } else {
          this.$message.error("请选择要解锁的数据");
        }
      },
      initialize(row) { //密码初始化
        if (row.length > 0) {
          for (var i = 0; i < this.dataSource.length; i++) {
            if (row[i] != undefined) {
              for (const v of this.dataSource) {
                if (v.id === row[i].id) {
                  v.loginPassword = "123456";
                }
              }
            }
          }
          this.$notify({
            title: "密码初始化成功",
            message: "密码为:123456",
            type: "success",
            duration: 2000
          });
        } else {
          this.$message.error("请选择要初始化的数据");
        }
      },
      userRoleMaintain(row) { //角色维护
        if (row.length == 1) {
          bus.$emit("anchor");
        } else {
          this.$message.error("请选择要用户角色维护的用户");
        }
      },
      userJurisdiction(row) { //用户权限
        if (row.length == 1) {
          bus.$emit("jurisdiction");
        } else {
          this.$message.error("请选择要配置权限的用户");
        }
      },
      userDataAuthority(row) { //数据权限
        if (row.length == 1) {
          bus.$emit("dataAuthority");
        } else {
          this.$message.error("请选择需要配置用户数据权限的用户");
        }
      },
      handleDownload() { //数据导出
        bus.$emit('handle-download');
      }
    }
  };

</script>

