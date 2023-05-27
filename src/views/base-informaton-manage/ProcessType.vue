<template>
  <BaseList :default-props="defaultProps" />
</template>
<script>
import BaseList from '@/views/master-page/BaseList.vue'

export default {
  name: 'ProcessType',
  components: { BaseList },
  data() {
    return {
      defaultProps: {
        defaultDTLProps: {
          title: { mainTitle: '毕设流程管理' },
          sortStr: { properties: 'theOrder', direction: 'ASC' },
          someFlags: {
            noAdvancedSearch: false
          },
          searchItems: [
            { name: '编码', field: 'code', type: 'input' },
            { name: '名称', field: 'name', type: 'input' }
          ],
          defaultDTHProps: {
            keyWord: { edit: 'BaseProcessType' },
            searchPanel: false
          }
        },
        defaultSDProps: {
          keyWord: 'BaseProcessType',
          defaultDBProps: {
            dialog: {}
          }
        }
      }
    }
  }
}
</script>
