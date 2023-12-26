<template>
  <BaseTreeList ref="baseTreeList" :default-props="defaultProps" @append-click="appendClick" @edit-click="editClick" @set-type="setSearchKey" @self-init="selfInit" />
</template>
<script>

import BaseTreeList from '@/views/master-page/BaseTreeList'
import CONSTANT from '@/constant'
import bizApi from '@/api/biz'

export default {
  name: 'User',
  components: { BaseTreeList },

  data() {
    return {
      reg: {},
      searchName: {},
      defaultProps: {
        treeRelColName: 'departmentId',
        defaultDTLProps: {
          title: { mainTitle: '人员列表' },
          someFlags: {
            noAdvancedSearch: false,
            hasOwnGet: true
          },
          searchItems: [
            // { name:'单位名称', field: 'schoolName', type: 'input' },schoolId
            { name: '姓名/账号搜索', field: 'name', type: 'input', doubleWords: ['account'] }
            // { name: '手机号', field: 'phone', type: 'input' }
          ],
          // searchPanel: {
          //   name: 'name',
          //   placeholder: '请输入用户姓名',
          // },
          defaultDTHProps: {
            keyWord: { edit: 'BaseUser', view: 'ViewBaseUser' },
            allTableColumns: {},
            buttonProps: { update: { show: true }, create: { show: true }, delete: { show: true }, export: { show: false }, search: { show: true }, _batchCreate: { show: true }},
            searchPanel: false
          }
        },
        defaultSDProps: {
          keyWord: 'BaseUser',
          formItems: [
            { name: '账号', field: 'account', placeholder: '账号不能为空', type: 'input' },
            { name: '姓名', field: 'name', placeholder: '姓名不能为空', type: 'input' },
            { name: '性别', field: 'sex', type: 'select_noremote', options: [{ id: '男', name: '男' }, { id: '女', name: '女' }] },
            { name: '单位部门', field: 'departmentId', keyWords: 'SysOrganizationInfo', type: 'cascader' },
            { name: '角色', field: 'roleId', type: 'select_noremote', options: [{ id: 1, name: '管理员' }, { id: 2, name: '老师' }, { id: 3, name: '学生' }] },
            { name: '密码', field: 'password', placeholder: '密码不能为空', type: 'password' },
            { name: '手机号', field: 'phone', placeholder: '手机号不能为空', type: 'input' },
            { name: '备注', field: 'remarks', type: 'textarea' }
          ],
          formRules: {
            account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
            phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
            name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
            roleId: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
            password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
          },
          defaultDBProps: {

          }
        },
        defaultDBIProps: {
          keyWords: 'BaseUser'
        },
        defaultDTProps: {
          keyWord: 'SysOrganizationInfo',
          title: { mainTitle: '单位部门列表' }
        }
      },
      regKey: { roleIds: CONSTANT.SEARCH_OPERATOR.NOT_IN }
    }
  },
  created() {
    this.allTableColumns = this.defaultProps.defaultDTLProps.defaultDTHProps.allTableColumns
    // console.log(this.allTableColumns)
    Object.assign(this.allTableColumns, [
      { id: 1, showName: '姓名', theOrder: 1, columnName: 'name', sortable: true },
      { id: 2, showName: '性别', theOrder: 2, columnName: 'sex', sortable: true },
      { id: 3, showName: '单位', theOrder: 3, columnName: 'departmentName', sortable: true },
      { id: 4, showName: '角色', theOrder: 4, columnName: 'roleName', sortable: true },
      { id: 5, showName: '账号', theOrder: 5, columnName: 'account', sortable: true },
      { id: 6, showName: '手机号', theOrder: 6, columnName: 'phone', sortable: true }
    ])
    // console.log(this.allTableColumns)
  },
  methods: {
    async initDataList() {
      this.$refs.baseTreeList.initDataList()
    },
    appendClick() {
      this.form = { }
      this.$refs.baseTreeList.showDialog(true, this.form)
    },
    editClick(val) {
      this.form = { ...val }
      this.$refs.baseTreeList.showDialog(true, this.form)
    },
    setSearchKey(val) {
      // val 树节点的信息
      if (val.theLevel === 1) {
        this.searchName = { departmentId: val.id }
      } else if (val.theLevel === 2) {
        this.searchName = { schoolId: val.id }
      } else if (val.theLevel === 3) {
        this.searchName = { departmentId: val.id }
      } else if (val.theLevel === 4) {
        this.searchName = { classId: val.id }
      }
    },
    async selfInit(page, sort, searchWords) {
      const that = this.$refs.baseTreeList.$refs.dataTableList
      try {
        const res = await bizApi.getSomeRecords2({ keyWords: 'ViewBaseUser', searchKey: { ...searchWords.searchKey, ...this.searchName }, reg: { ...searchWords.regKey, ...this.reg }, andor: searchWords.andor, pageInfo: page, sort: sort })
        that.dataList = this._.cloneDeep(res.data.content)
        that.totalSize = res.data.totalElements
        that.loading = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

