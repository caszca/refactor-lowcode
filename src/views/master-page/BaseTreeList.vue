<template>
  <div>
    <tree-list>
      <template #aside>
        <slot name="aside">
          <DataTree :default-props="defaultProps.defaultDTProps" @node-click="handleNodeClick" />
        </slot>
      </template>
      <template #main>
        <!-- 列表1 -->
        <DataTableList ref="dataTableList" :default-props="defaultProps.defaultDTLProps" @view-click="viewClick" @edit-click="editClick" @append-click="appendClick" @self-init="selfInit" @clean-out-value="onCleanOutValue" @batch-create="batchCreate">
          <template #beforeSearch>
            <slot name="beforeSearch" />
          </template>
        </DataTableList>
      </template>
    </tree-list>
    <slot name="dlg">
      <!-- 简单窗口 -->
      <SimpleDialog ref="simpleDialog" :default-props="defaultProps.defaultSDProps" />
    </slot>
    <slot name="batch">
      <!-- 批量录入窗口 -->
      <DlgBatchImport ref="batchAppendDlg" :default-props="defaultProps.defaultDBIProps" />
    </slot>
  </div>
</template>

<script>
import DataTree from '@/components/DataTree'
import DataTableList from '@/components/DataTableList'
import SimpleDialog from '@/components/SimpleDialog'
import DlgBatchImport from '@/views/dialogs/DlgBatchImport'
// import { customize } from '@/utils/common'
// import _ from 'lodash'
export default {
  name: 'BaseTreeList',
  components: { DataTableList, DataTree, SimpleDialog, DlgBatchImport },
  props: {
    defaultProps: {
      type: Object,
      default: () => {
        return {
          keyWord: {},
          treeRelColName: '',
          defaultDTLProps: {
            title: {},
            defaultDTHProps: {
              tableColumns: {}
            }
          },
          defaultSDProps: {
            formItems: [],
            formRules: {},
            defaultDBProps: {

            }
          }
        }
      }
    }
  },
  data() {
    return {
      defaultDTProps: {},
      defaultDTLProps: {
        treeInfo: {},
        searchItems: []
      },
      treeInfo: {}

    }
  },
  computed: {
    // calRegKey: {
    //   get: function() {
    //     return this.regKey
    //   },
    //   set: function() {

    //   }
    // }
  },
  created() {
    this.treeInfo = this.defaultDTLProps.treeInfo
  },
  mounted() {
    this.thisEvents = JSON.parse(JSON.stringify(this._events))
  },
  methods: {
    batchCreate() {
      this.$refs.batchAppendDlg.showDialog(true, this.form)
    },
    async initDataList() {
      this.$refs.dataTableList.initDataList()
    },
    handleNodeClick(val) {
      Object.assign(this.treeInfo, { treeKeyWords: this.defaultDTProps.keyWord, treeNodeId: val.id, treeRelColName: this.defaultProps.treeRelColName })
      this.$emit('set-type', val)
      this.initDataList()
    },
    appendClick() {
      if (Object.prototype.hasOwnProperty.call(this._events, 'append-click')) {
        this.$emit('append-click')
      } else {
        // this.form = resetForm(this.form)
      }
    },
    //
    editClick(row) {
      if (Object.prototype.hasOwnProperty.call(this._events, 'edit-click')) {
        this.$emit('edit-click', row)
      } else {
        // this.form = _.cloneDeep(row)
      }
    },
    viewClick(row) {
      if (Object.prototype.hasOwnProperty.call(this._events, 'view-click')) {
        this.$emit('view-click', row)
      } else {
        // this.form = _.cloneDeep(row)
      }
    },
    onCleanOutValue() {
      // 由外部搜索框和内部组合 重置时需要一并清除数据
      this.$emit('clean-out-value')
    },
    selfInit(page, sort, searchWords) {
      this.$emit('self-init', page, sort, searchWords)
    },
    searchClick(val) {
      this.regKey = { name: '≈', ...this.regKey }
      this.searchKey = { name: val, ...this.searchKey }
      // 父子组件传递数据不及时的问题
      setTimeout(() => {
        this.$refs.dataTableList.initDataList()
      }, 500)
    },
    showDialog(val, data) {
      this.$refs.simpleDialog.showDialog(val, data)
    }
  }
}
</script>
