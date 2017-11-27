<template>
  <div class="app-container tree-grid">
    <tool-bar :data-source="dataSource"></tool-bar>
    <tree-grid @ievent="ievent" :columns="columns" :tree-structure="true" :data-source="dataSource" :default-expand-all="defaultExpandAll"></tree-grid>
    <add-edit-form :treeGridForm='treeGridForm' :data-source="dataSource" :formColumns='formColumns' :formRules='formRules' :data='data'></add-edit-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    clientHeight
  } from "@/utils";
  import {
    toolBar,
    TreeGrid,
    addEditForm,
  } from './topologyModule'
  export default {
    components: {
      toolBar,
      TreeGrid,
      addEditForm,
    },
    data() {
      return {
        data: [],
        treeGridForm: true,
        treeStructure: false, //树形格式化
        columns: [{
            "text": "单位名称",
            "dataIndex": "unitName",
            "width": "200"
          },
          {
            "text": "描述",
            "dataIndex": "describe",
            "width": "80"
          },
          {
            "text": "状态",
            "dataIndex": "status",
            "width": "60"
          },
          {
            "text": "地址",
            "dataIndex": "site",
            "width": "150"
          },
          {
            "text": "电话",
            "dataIndex": "phone",
            "width": "80"
          },
          {
            "text": "传真",
            "dataIndex": "fax",
            "width": "60"
          },
          {
            "text": "联系人",
            "dataIndex": "contacts",
            "width": "60"
          },
          {
            "text": "创建人",
            "dataIndex": "creatorName",
            "width": "80"
          },
          {
            "text": "创建时间",
            "dataIndex": "createTime",
            "width": "80"
          },
          {
            "text": "更新人",
            "dataIndex": "modifierName",
            "width": "80"
          },
          {
            "text": "更新时间",
            "dataIndex": "modifyTime",
            "width": "80"
          }
        ],
        dataSource: [{
          "id": "10001",
          "unitName": "平台管理",
          "site": "否",
          "site": "a",
          "phone": "a",
          "describe": "a",
          "status": "启用",
          "creatorName": "a",
          "createTime": "a",
          "modifierName": "a",
          "modifyTime": "a",
          "children": [{
              "id": "11001",
              "unitName": "任务管理",
              "site": "是",
              "site": "a",
              "phone": "a",
              "describe": "a",
              "status": "启用",
              "creatorName": "a",
              "createTime": "a",
              "modifierName": "a",
              "modifyTime": "a",
              "children": [{
                  "id": "11101",
                  "unitName": "任务执行情况控制器",
                  "site": "否",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                },
                {
                  "id": "11102",
                  "unitName": "任务管理控制器",
                  "site": "否",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                },
                {
                  "id": "11103",
                  "unitName": "表达式模板控制器",
                  "site": "否",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                }
              ]
            },
            {
              "id": "11002",
              "unitName": "插件管理",
              "site": "是",
              "site": "a",
              "phone": "a",
              "describe": "a",
              "status": "启用",
              "creatorName": "a",
              "createTime": "a",
              "modifierName": "a",
              "modifyTime": "a",
              "children": [{
                  "id": "11201",
                  "unitName": "插件管理",
                  "site": "是",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                },
                {
                  "id": "11202",
                  "unitName": "用户权限管理",
                  "site": "是",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                }
              ]
            },
            {
              "id": "11003",
              "unitName": "日志管理",
              "site": "是",
              "site": "a",
              "phone": "a",
              "describe": "a",
              "status": "启用",
              "creatorName": "a",
              "createTime": "a",
              "modifierName": "a",
              "modifyTime": "a",
              "children": [{
                  "id": "11301",
                  "unitName": "日志管理",
                  "site": "是",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                },
                {
                  "id": "11302",
                  "unitName": "日志配置文件",
                  "site": "是",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                }
              ]
            },
            {
              "id": "11004",
              "unitName": "消息队列管理",
              "site": "是",
              "site": "a",
              "phone": "a",
              "describe": "a",
              "status": "启用",
              "creatorName": "a",
              "createTime": "a",
              "modifierName": "a",
              "modifyTime": "a",
              "children": [{
                  "id": "11401",
                  "unitName": "交换机管理",
                  "site": "否",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                },
                {
                  "id": "11402",
                  "unitName": "消息服务管理",
                  "site": "否",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                },
                {
                  "id": "11403",
                  "unitName": "虚拟机管理",
                  "site": "否",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                },
                {
                  "id": "11404",
                  "unitName": "队列管理",
                  "site": "否",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                }
              ]
            },
            {
              "id": "11005",
              "unitName": "用户管理",
              "site": "是",
              "site": "a",
              "phone": "a",
              "describe": "a",
              "status": "启用",
              "creatorName": "a",
              "createTime": "a",
              "modifierName": "a",
              "modifyTime": "a",
              "children": [{
                  "id": "11501",
                  "unitName": "仓库管理",
                  "site": "否",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                },
                {
                  "id": "11502",
                  "unitName": "企业拓扑图",
                  "site": "否",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                },
                {
                  "id": "11503",
                  "unitName": "工厂管理",
                  "site": "否",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                },
                {
                  "id": "11504",
                  "unitName": "用户管理",
                  "site": "否",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                },
                {
                  "id": "11604",
                  "unitName": "角色管理",
                  "site": "否",
                  "site": "a",
                  "phone": "a",
                  "describe": "a",
                  "status": "启用",
                  "creatorName": "a",
                  "createTime": "a",
                  "modifierName": "a",
                  "modifyTime": "a"
                }
              ]
            }
          ]
        }],
        formColumns: [{
            label: '父级菜单',
            prop: 'parentMenu'
          },
          {
            label: '单位名称',
            prop: 'unitName'
          },
          {
            label: '描述',
            prop: 'describe'
          },
          {
            label: '地址',
            prop: 'site'
          },
          {
            label: '电话号码',
            prop: 'phone'
          },
          {
            label: '传真',
            prop: 'fax'
          },
          {
            label: '联系人',
            prop: 'contacts'
          }
        ],
        formRules: { //表单验证
          // parentMenu: [{
          //   required: true,
          //   message: '请选择父级菜单',
          //   trigger: 'change'

          // }],
          //        unitName: [{
          //   required: true,
          //   message: '请输入单位名称',
          //   trigger: 'blur'
          // }]
        },
        defaultExpandAll: true //是否默认展开所有树
      }
    },
    methods: {
      ievent(data) {
        this.data = data
      }
    },
    mounted() {
      clientHeight('#topologyGrid', '.toolbar', 75)
    }
  }

</script>
<style lang="scss">
  .tree-grid .el-table__row {
    >td:nth-child(3) {
      text-align: left;
      button {
        cursor: pointer;
        border: none;
        background: transparent;
        outline: none;
      }
    }
  }

  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }

  .ms-tree-space::before {
    content: ""
  }

  table td {
    line-height: 26px;
  }

</style>

