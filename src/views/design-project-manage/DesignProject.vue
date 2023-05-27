<template>
  <BaseList ref="BaseList" :default-props="defaultProps" :baselist-spec-confirm="baselistConfirm" />
</template>
<script>
import BaseList from '@/views/master-page/BaseList'
import otherAPI from '@/api/other'
import { Message } from 'element-ui'
export default {
  name: 'DesignProject',
  components: { BaseList },
  data() {
    return {
      defaultProps: {
        defaultDTLProps: {
          someFlags: {
            noAdvancedSearch: false
          },
          searchItems: [
            { name: '课题名', field: 'name', type: 'input' },
            { name: '专业', field: 'specialityName', type: 'input' },
            { name: '创建人', field: 'createUserName', type: 'input' },
            { name: '创建时间', field: 'createTime', type: 'date' }
          ],
          defaultDTHProps: {
            keyWord: { edit: 'MainDesignProject', view: 'ViewDesignProject' },
            allTableColumns: [
              { id: 1, showName: '课题名', theOrder: 1, columnName: 'name', sortable: true },
              { id: 2, showName: '专业', theOrder: 2, columnName: 'specialityName', sortable: true },
              { id: 3, showName: '关键字', theOrder: 3, columnName: 'keywordsName', sortable: true },
              { id: 4, showName: '创建人', theOrder: 4, columnName: 'createUserName', sortable: true },
              { id: 5, showName: '创建时间', theOrder: 5, columnName: 'createTime', sortable: true }
              // { id: 6, showName: 'ID', theOrder: 6, columnName: 'id', sortable: true }
            ],
            buttonProps: { create: { show: true, name: '新建课题' }, update: { show: true }, visible: { show: true }, search: { show: true }, delete: { show: true }},
            searchPanel: false
          }
        },
        defaultSDProps: {
          keyWord: 'MainDesignProject',
          formItems: [
            { name: '专业', field: 'specialityId', type: 'select', keyWords: 'BaseSpeciality', multiple: true }, // , multiple: true
            { name: '课题名', field: 'name', type: 'input' },
            { name: '关键字', field: 'keywordsId', type: 'select', keyWords: 'BaseKeywords', multiple: true },
            // { name: '关键字', field: 'keywordsName', type: 'input' },
            { name: '创建人', field: 'createUserName', type: 'input' },
            { name: '课题详情', field: 'remarks', type: 'textarea' }
            // { name: 'ID', field: 'id', type: 'input' }
            // { name: '创建时间', field: 'createTime', type: 'date' }
          ],
          viewFormItems: [
            { name: '专业', field: 'specialityName' },
            { name: '课题名', field: 'name' },
            { name: '关键字', field: 'keywordsName' },
            { name: '创建人', field: 'createUserName' },
            { name: '课题详情', field: 'remarks' }
          ],
          defaultDBProps: {
          }
        }
      }
    }
  },
  methods: {
    // appendClick() {
    //   this.$refs.BaseList.$refs.dataTableList.initDataList()
    //   this.$refs.BaseList.$refs.simpleDialog.showDialog(false)
    // },
    // editClick(val) {
    //   this.$refs.BaseList.$refs.simpleDialog.showDialog(true, val)
    // },
    async baselistConfirm(option, type, form) {
      // console.log(form)
      var op = ''
      switch (option) {
        case 'append': op = '新增'
          break
        case 'edit': op = '修改'
          break
        case 'audit': op = '审核'
          break
        case 'submit': op = '提交'
          break
      }
      const resInfo = await otherAPI.createContestFoundInfo(form)
      // console.log(otherAPI.createContestFoundInfo(form))
      if (resInfo.message === 'successful') {
        Message.success(`${op}成功！`)
        this.$refs.BaseList.$refs.simpleDialog.showDialog(false)
        this.$refs.BaseList.$refs.dataTableList.initDataList()
      } else {
        Message.warning(resInfo.message)
      }
    }
  }
}
</script>

