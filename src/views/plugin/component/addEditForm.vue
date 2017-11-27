<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :model="temp" label-width="80px" :rules="formRules" ref="temp">
      <el-form-item label="父级菜单" prop="pluginName">
        <el-select v-model="temp.value" placeholder="请选择">
          <el-option v-for="item in dataArr" :key="item.id" :label="item.pluginName" :value="item.id" :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模块" prop="module">
        <el-select class="filter-item" v-model="temp.module" placeholder="请选择">
          <el-option v-for="item in  moduleOptions" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-for="item in formColumns" :key='item.prop' :label="item.label" :prop="item.prop">
        <el-input type="text" v-model="temp[item.prop]"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('temp')">取 消</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
      <el-button v-else type="primary" @click="update">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import bus from "@/utils/bus"; //组件中央通信

  export default {
    props: ["dataSource"],

    data() {
      return {
        formColumns: [{ //表单列


            label: '插件名称',
            prop: 'pluginName'
          },
          {
            label: '地址',
            prop: 'site'
          },
          {
            label: '描述',
            prop: 'describe'
          },
          {
            label: '图标',
            prop: 'menuIcon'
          }
        ],
        textMap: { //弹出层title
          create: "新增",
          update: "编辑"
        },
        dialogStatus: "", //弹出层title
        dialogFormVisible: false, //弹出层隐藏
        temp: { //表单默认数据
          id: '',
          value: '',

          module: "是",
          status: "启用"
        },
        formRules: { //表单验证
        },

        moduleOptions: ["是", "否"],
        operation: false,
        dataArr: []

      };
    },
    created() {
      let _this = this;
      bus.$on("add-form", (row, temp) => { //接收事件的组件
        if (_this.dataArr.length === 0) {
          for (const v of row) {
            if (v.children) _this.dataArr.push(v)
          }
        }
        _this.temp = temp
        _this.dialogStatus = "create";
        _this.dialogFormVisible = true;
      });
      bus.$on("edit-form", function (row, dataSource) { //接收事件的组件
        _this.temp = Object.assign({}, row); //表单数据
        _this.dialogStatus = "update"; //弹出层title
        _this.dialogFormVisible = true; //弹出层显示
      });
    },
    methods: {
      create() { //新增
        this.$refs.temp.validate(valid => {
          if (valid) { //判断表单验证条件
            let para = Object.assign({}, this.temp); //获取表单数据
            for (const v of this.dataArr) {

              if (v.id == para.value) { //数据替换
                this.temp.id = (v.children[v.children.length - 1].id) + 1
                v.children.unshift(para)
              }
            }
            this.resetForm('temp') //移除表单 校验结果&隐藏表单界面
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }
        });
      },
      update() { //编辑
        this.$refs.temp.validate(valid => {
          let para = Object.assign({}, this.temp); //获取表单数据
          if (valid) { //判断表单验证条件

            for (const v of this.dataArr) {
              if (v.id === para.id) { //数据替换
                for (const k in para) {
                  v[k] = para[k]

                }
              }
            }
            this.resetForm('temp') //移除表单 校验结果&隐藏表单界面
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          }
        });
      },
      resetForm(formName) { //移除表单 校验结果
        this.dialogFormVisible = false; //隐藏界面
        this.$refs[formName].resetFields(); //移除表单 校验结果
      }
    }
  };

</script>

