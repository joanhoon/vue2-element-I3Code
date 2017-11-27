<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :model="temp" label-width="100px" :rules="formRules" ref="temp">
      <el-form-item v-for="item in formColumns" :key='item.prop' :label="item.label" :prop="item.prop">
        <el-select v-if="item.prop=='parentMenu'" v-model="temp.value" placeholder="请选择">
          <el-option v-for="item in dataArr" :key="item.id" :label="item.unitName" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-if="item.prop=='status'" class="filter-item" v-model="temp.status" placeholder="请选择">
          <el-option v-for="item in  moduleOptions" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
        <el-input v-else type="text" v-model="temp[item.prop]"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm()">取 消</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
      <el-button v-else type="primary" @click="update">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'
  import bus from "@/utils/bus"; //组件中央通信
  import { getLocalTime } from "@/utils";

  export default {
    props: ['treeGridForm', 'formColumns', 'formRules', 'dataSource'],
    
    data() {
      return {
        dialogFormVisible: false, //弹出层隐藏
        textMap: { //弹出层title
          create: "新增",
          update: "编辑"
        },
        dialogStatus: "", //弹出层title
        temp: {},
        moduleOptions: ["启用", "禁用"],
        dataArr: []
      }
    },

    computed: { //使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters([
        'name',
        'avatar',
        'roles'
      ])
    },
    
    mapGetters() { //映射 this.name 为 store.getters.name
      name: 'name'
    },

    created() {
      let _this = this
      bus.$on("jh-add-form", (row) => {
        if (row != undefined && _this.dataArr.length === 0) {
          for (const v of row) {
            if (v.children) _this.dataArr.push(v)
          }
        }
        this.temp = {
          id: '',
          value: '',
          module: "是",
          status: "启用",
        }
        _this.dialogStatus = "create";
        _this.dialogFormVisible = true
      });
      bus.$on("jh-edit-form", (row) => {
        _this.temp = Object.assign({}, row); //表单数据
        _this.dialogStatus = "update";
        _this.dialogFormVisible = true
      });
    },

    methods: {
      create() { //新增
        this.$refs.temp.validate(valid => {
          if (valid) { //判断表单验证条件
            this.temp.id = this.dataSource.length + 1
            this.temp.creatorName = this.name //创建人
            this.temp.createTime = getLocalTime(new Date()) //创建时间
            let para = Object.assign({}, this.temp); //获取表单数据
            if (this.treeGridForm) {
              for (const v of this.dataArr) {
                if (v.id == para.value) { //数据替换
                  this.temp.id = (v.children[v.children.length - 1].id) + 1
                  v.children.unshift(para)
                }
              }
            } else {
              this.dataSource.unshift(para)
            }
            this.resetForm() //移除表单 校验结果&隐藏表单界面
            bus.$emit("formData"); //更新数据表格
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
          this.temp.modifierName = this.name //更新人
          this.temp.modifyTime = getLocalTime(new Date()) //更新时间
          let para = Object.assign({}, this.temp); //获取表单数据
          if (valid) { //判断表单验证条件
            for (const v of this.dataSource) {
              if (v.id === para.id) { //数据替换
                for (const k in para) {
                  v[k] = para[k]
                }
              }
            }
            this.resetForm() //移除表单 校验结果&隐藏表单界面
            bus.$emit("formData"); //更新数据表格
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          }
        });
      },
      resetForm() { //移除表单 校验结果
        this.dialogFormVisible = false; //隐藏界面
        this.$refs['temp'].resetFields(); //移除表单 校验结果
      },
    }

  }

</script>