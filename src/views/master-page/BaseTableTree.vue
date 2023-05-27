<template>
  <div>
    <!-- :search-key="searchKey"  -->
    <DataTableTree ref="DataTableTree" :default-props="defaultProps.defaultDTTProps" @edit-click="editClick" @append-click="appendClick" @batch-create="batchCreate">
      <template #titleName>
        <slot name="titleName" />
      </template>
      <template slot="left">
        <slot name="left" />
      </template>
    </DataTableTree>
    <slot name="dlg">
      <!-- 简单窗口 -->
      <SimpleDialog ref="simpleDialog" :default-props="defaultProps.defaultSDProps" @update-record="updateDataTree" />
    </slot>
    <slot name="batch">
      <!-- 批量录入窗口 -->
      <DlgBatchImport ref="batchAppendDlg" :default-props="defaultProps.defaultDBIProps" />
    </slot>
  </div>
</template>
<script>
import DataTableTree from '@/components/DataTableTree'
import SimpleDialog from '@/components/SimpleDialog'
import DlgBatchImport from '@/views/dialogs/DlgBatchImport'
import { resetForm } from '@/utils/common'
import _ from 'lodash'

export default {
  components: { DataTableTree, SimpleDialog, DlgBatchImport },
  props: {
    defaultProps: {
      type: Object,
      default: () => {
        return {
          keyWord: { },
          defaultDTTProps: {
            title: {},
            defaultDTHProps: {
              allTableColumns: []
            }
          },
          defaultSDProps: {
            formItems: [],
            formRules: {},
            defaultDBProps: {
              dialog: { }
            }
          }
        }
      }
    }
  },
  data() {
    return {
      defaultDTTProps: {
      },
      defaultSDProps: {
        formItems: [
          { name: '完整名称', field: 'allNodeNames', type: 'input', disabled: true },
          { name: '编码', field: 'code', type: 'input' },
          { name: '名称', field: 'name', type: 'input' },
          { name: '备注', field: 'remarks', type: 'textarea' }
        ],
        formRules: { name: [{ required: true, message: '名称不能为空', trigger: 'blur' }] },
        defaultDBProps: {
          dialog: { }
        }
      },
      form: {},
      keyWord: {},
      thisEvents: ''
    }
  },
  created() {
    if (Object.prototype.hasOwnProperty.call(this.defaultProps, 'defaultSDProps')) {
    // if (this.defaultProps.hasOwnProperty('defaultSDProps')) {
      this.dialog = this.defaultProps.defaultSDProps.defaultDBProps.dialog // 关联dialog
    }
  },
  mounted() {
    this.thisEvents = JSON.parse(JSON.stringify(this._events))
  },
  methods: {
    batchCreate() {
      this.$refs.batchAppendDlg.showDialog(true, this.form)
    },
    async updateDataTree(row) {
      this.$refs.DataTableTree.updatePartTree(row)
    },
    _appendClick(data) {
      this.form.allNodeNames = data ? data.allNodeNames : '全部'
      this.form.parentId = data ? data.id : -1
      this.form.isLeaf = true
      this.form.childNum = 0
      this.$refs.simpleDialog.showDialog(true, this.form)
    },
    appendClick(data) {
      if (Object.prototype.hasOwnProperty.call(this._events, 'append-click')) {
        this.$emit('append-click', data)
      } else {
        this.form = resetForm(this.form)
        this._appendClick(data)
      }
    },
    editClick(data) {
      if (Object.prototype.hasOwnProperty.call(this._events, 'edit-click')) {
        this.$emit('edit-click', data)
      } else {
        this.form = _.cloneDeep(data)
        this.$refs.simpleDialog.showDialog(true, this.form)
      }
    }
  }
}
</script>

