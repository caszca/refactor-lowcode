<template>
  <BaseList :default-props="defaultProps" />
</template>

<script>
import BaseList from '@/views/master-page/BaseList'

export default {
  name: 'Keywords',
  components: { BaseList },
  data() {
    return {
      defaultProps: {
        defaultDTLProps: {
          someFlags: {
            noAdvancedSearch: false
          },
          searchItems: [
            // { name: '编码', field: 'code', type: 'input' },
            { name: '名称', field: 'name', type: 'input' }
          ],
          defaultDTHProps: {
            keyWord: { edit: 'BaseKeywords' },
            buttonProps: { update: { show: true }, create: { show: true }, delete: { show: true }, up: { show: false }, down: { show: false }, batchCreate: { show: false }},
            searchPanel: false
          }

        },
        defaultSDProps: {
          keyWord: 'BaseKeywords'
        }
      }
    }
  }
}
</script>

