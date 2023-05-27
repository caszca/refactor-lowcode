<template>
  <BaseTableTree :default-props="defaultProps" />
</template>
<script>
import BaseTableTree from '@/views/master-page/BaseTableTree.vue'
export default {
  name: 'Speciality',
  components: { BaseTableTree },
  data() {
    return {
      defaultProps: {
        defaultDTTProps: {
          // sort: { properties: 'name', direction: 'DESC' },
          sort: { properties: 'code', direction: 'ASC' },
          defaultDTHProps: {
            keyWord: { edit: 'BaseSpeciality' },
            buttonProps: { update: { show: true }, create: { show: true }, delete: { show: true }, up: { show: true }, down: { show: true }},
            searchPanel: false
          }
        },
        defaultSDProps: {
          keyWord: 'BaseSpeciality',
          formItems: [
            { name: '完整名称', field: 'allNodeNames', type: 'input', disabled: true },
            { name: '编码', field: 'code', type: 'input' },
            { name: '名称', field: 'name', type: 'input' },
            { name: '备注', field: 'remarks', type: 'textarea' }
          ],
          formRules: { name: [{ required: true, message: '名称不能为空', trigger: 'blur' }] },
          defaultDBProps: {
          }
        }
      }
    }
  }

}
</script>
