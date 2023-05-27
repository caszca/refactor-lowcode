<template>
  <el-dialog v-dialogDrag title="详情" :visible.sync="dialogVisible" width="40%" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-row v-for="item in header" :key="item.id">
      <el-col :span="3">{{ item.showName }}:</el-col>
      <el-col :span="21">{{ row[item.columnName] || '--' }}</el-col>
    </el-row>
    <slot name="bottom" />
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getTableColumns } from '@/utils/tableColumns'
export default {
  name: 'DlgViewCommon',
  props: {
    row: { type: Object, default: () => { return {} } },
    keyWord: { type: String, default: '' }
  },
  data() {
    return {
      dialogVisible: false,
      header: []
    }
  },
  watch: {
    dialogVisible: {
      handler() {
      }
    }
  },
  created() {
    this.header = this._.cloneDeep(getTableColumns(this.keyWord))
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.el-row+.el-row {
  margin-top: 20px;
}
</style>

