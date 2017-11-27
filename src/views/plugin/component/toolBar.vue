<template>
  <div class="toolbar">
    <div class="tool-container clearfix">
      <el-button class="filter-item" type="primary" v-waves @click="handleCreate">
        <icon-svg icon-class="add"></icon-svg>&nbsp;新增</el-button>
      <el-button class="filter-item" type="primary" icon="document" v-waves @click="handleDownload">数据导出</el-button>
      <el-button class="filter-item" type="primary" icon="document" v-waves @click="operation">编辑模式</el-button>
      <el-dropdown @command="handleCommand">
        <el-button type="primary">
          <icon-svg icon-class="add"></icon-svg>
          配置
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='SManage'>服务管理</el-dropdown-item>
          <el-dropdown-item command="FManage">功能管理</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="filter-input">
        <el-input icon="search" size="small" placeholder="插件名称" @change='handleClick' v-model="filtrate"></el-input>
      </div>
    </div>
    <s-f-manage :columns='columns' :formColumns='formColumns'></s-f-manage>
  </div>
</template>
<script>
  import bus from "@/utils/bus"; //中央通信组件
  import Utils from "@/views/utils/index.js";
  import waves from "@/directive/waves.js"; // 水波纹指令
  import SFManage from './SFManage'

  export default {
    directives: {
      waves
    }, //水波纹
    components: {
      SFManage
    },
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
      bus.$on("multiple-selection", (v) => {//checkbox选中数据
        this.multipleSelection = v;
      });
    },
    methods: {
      handleCommand(command) {
        if (command == 'FManage') { //功能管理数据
          this.columns = [{
              value: "functionName",
              label: "功能名称",
              width: "80"
            },
            {
              value: "controlName",
              label: "控件名称",
              width: "80"
            },
            {
              value: "describe",
              label: "描述",
              width: "80"
            },
            {
              value: "icon",
              label: "图标的css",
              width: "80"
            },
            {
              value: "status",
              label: "状态",
              width: "80"
            },
            {
              value: "creatorName",
              label: "创建人",
              width: "70"

            },
            {
              value: "createTime",
              label: "创建时间",
              width: "80"

            },
            {
              value: "modifierName",
              label: "修改人",
              width: "70"

            },
            {
              value: "modifyTime",
              label: "修改时间",
              width: "80"

            }
          ]
          this.dataSourceSFM = [{
              id: '1',
              functionName: 'a',
              controlName: 'sdfsab',
              describe: 'a',
              icon: '/var/i3plus/authority',
              status: '启用',
              creatorName: 'jh',
              createTime: '2017/11/07',
              modifierName: 'jh',
              modifyTime: '2017/11/07',
            },
            {
              id: '2',
              functionName: 'a3',
              controlName: 'fdgfdgb',
              describe: 'a',
              icon: '/var/i3plus/authority',
              status: '启用',
              creatorName: 'jh',
              createTime: '2017/11/07',
              modifierName: 'jh',
              modifyTime: '2017/11/07',
            },
            {
              id: '3',
              functionName: '4a',
              controlName: 'bhgjghj',
              describe: 'a',
              icon: '/var/i3plus/authority',
              status: '启用',
              creatorName: 'jh',
              createTime: '2017/11/07',
              modifierName: 'jh',
              modifyTime: '2017/11/07',
            },
          ]
          this.formColumns = [{
              label: '功能名称',
              prop: 'functionName'
            },
            {
              label: '控件名称',
              prop: 'controlName'
            },
            {
              label: '描述',
              prop: 'describe'
            },
            {
              label: '图标的css',
              prop: 'icon'
            }
          ]
        // bus.$emit("sf-manage", command)
        bus.$emit("sf-manage", command ,this.dataSourceSFM)
          
        } else { //服务管理数据
          this.columns = [{
              value: "ip",
              label: "IP",
              width: "80"
            },
            {
              value: "port",
              label: "端口号",
              width: "80"
            },
            {
              value: "name",
              label: "名称",
              width: "80"
            },
            {
              value: "describe",
              label: "描述",
              width: "80"
            },
            {
              value: "filePath",
              label: "文件路径",
              width: "80"
            },
            {
              value: "status",
              label: "状态",
              width: "80"
            },
            {
              value: "creatorName",
              label: "创建人",
              width: "70"

            },
            {
              value: "createTime",
              label: "创建时间",
              width: "80"

            },
            {
              value: "modifierName",
              label: "修改人",
              width: "70"

            },
            {
              value: "modifyTime",
              label: "修改时间",
              width: "80"

            }
          ]
          this.dataSourceSFM = [{
              id: '1',
              ip: '127.0.0.2',
              port: '8082',
              name: 'locaafsaflhost',
              describe: 'a',
              filePath: '/var/i3plus/authority',
              status: '启用',
              creatorName: 'jh',
              createTime: '2017/11/07',
              modifierName: 'jh',
              modifyTime: '2017/11/07',
            },
            {
              id: '2',
              ip: '127.0.0.1',
              port: '8083',
              name: 'test',
              describe: 'b',
              filePath: '/var/i3plus/authority',
              status: '启用',
              creatorName: 'jh',
              createTime: '2017/11/07',
              modifierName: 'jh',
              modifyTime: '2017/11/07',
            }
          ]
          this.formColumns = [{
              label: 'ip',
              prop: 'ip'
            },
            {
              label: '端口号',
              prop: 'port'
            },
            {
              label: '名称',
              prop: 'name'
            },
            {
              label: '描述',
              prop: 'describe'
            },
            {
              label: '文件路径',
              prop: 'filePath'
            }
          ]
        bus.$emit("sf-manage", command ,this.dataSourceSFM)
        }
      },
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
        bus.$emit("add-form", this.dataSourceArr(), {
          id: '',
          value: '',
          module: "是",
          pluginName: '',
          site: '',
          describe: '',
          menuIcon: '',
          status: "启用"
        }); //发送事件的组件
      },
      handleDownload() { //数据导出
        bus.$emit("handle-download"); //发送事件的组件
      }
    }
  };

</script>

