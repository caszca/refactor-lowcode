<template>
  <BaseTreeList ref="baseTreeList" :default-props="defaultProps" @append-click="appendClick" @edit-click="editClick" />
</template>
<script>

import BaseTreeList from '@/views/master-page/BaseTreeList'
import CONSTANT from '@/constant'

export default {
  name: 'User',
  components: { BaseTreeList },

  data() {
    return {
      defaultProps: {
        treeRelColName: 'departmentId',
        defaultDTLProps: {
          title: { mainTitle: '人员列表' },
          someFlags: {
            noAdvancedSearch: false
          },
          searchItems: [
            // { name:'单位名称', field: 'schoolName', type: 'input' },
            { name: '姓名', field: 'name', type: 'input' },
            { name: '手机号', field: 'phone', type: 'input' }
          ],
          // searchPanel: {
          //   name: 'name',
          //   placeholder: '请输入用户姓名',
          // },
          defaultDTHProps: {
            keyWord: { edit: 'BaseUser', view: 'ViewBaseUser' },
            allTableColumns: { },
            buttonProps: { update: { show: true }, create: { show: true }, delete: { show: true }, export: { show: false }, search: { show: true }, batchCreate: { show: false }},
            searchPanel: false
          }
        },
        defaultSDProps: {
          keyWord: 'BaseUser',
          formItems: [
            { name: '账号', field: 'account', placeholder: '账号不能为空', type: 'input' },
            { name: '密码', field: 'password', placeholder: '密码不能为空', type: 'password' },
            { name: '身份证号', field: 'idCard', placeholder: '身份证号', type: 'input' },
            { name: '姓名', field: 'name', placeholder: '姓名不能为空', type: 'input' },
            { name: '性别', field: 'sex', type: 'select_noremote', options: [{ id: '男', name: '男' }, { id: '女', name: '女' }] },
            { name: '单位部门', field: 'departmentId', keyWords: 'BaseDepartment', type: 'cascader' },
            { name: '身份类型', field: 'jobId', keyWords: 'BaseDuty', type: 'select' },
            { name: '手机号', field: 'phone', placeholder: '手机号不能为空', type: 'input' },
            { name: '备注', field: 'remarks', type: 'textarea' }
          ],
          formRules: {
            account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
            // password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
            phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
            name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }]
          },
          defaultDBProps: {

          }
        },
        defaultDTProps: {
          keyWord: 'BaseDepartment',
          title: { mainTitle: '单位部门列表' }
        }
      },
      regKey: { roleIds: CONSTANT.SEARCH_OPERATOR.NOT_IN },
    }
  },
  created() {
    this.allTableColumns = this.defaultProps.defaultDTLProps.defaultDTHProps.allTableColumns
    // console.log(this.allTableColumns)
    Object.assign(this.allTableColumns, [
      { id: 1, showName: '单位', theOrder: 1, columnName: 'departmentName' },
      { id: 2, showName: '姓名', theOrder: 2, columnName: 'name', sortable: true },
      { id: 3, showName: '职务', theOrder: 3, columnName: 'jobName' },
      { id: 4, showName: '手机号', theOrder: 4, columnName: 'phone', sortable: true }
    ])
    // console.log(this.allTableColumns)
  },
  methods: {
    async initDataList() {
      this.$refs.baseTreeList.initDataList()
    },
    appendClick() {
      this.form = { id: null, workId: null, name: '' }
      // console.log(this.form)
      this.$refs.baseTreeList.showDialog(true, this.form)
    },
    editClick(val) {
      // console.log(val)
      this.form = { ...val }
      // console.log(this.form)
      this.$refs.baseTreeList.showDialog(true, this.form)
    }
  }
}
</script>

