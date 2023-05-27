<template>
  <DlgBasic ref="dlgBasic" :default-props="defaultProps" :dlgbasic-spec-confirm="submit">
    <template slot="mainForm">
      <el-upload ref="upload" class="upload-demo" drag action :limit="1" :show-file-list="true" :http-request="()=>{}" :on-exceed="handleExceed" :before-upload="beforeUpload" :on-remove="()=>file={}">
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div v-show="noFile" slot="tip" class="el-upload__tip" style="color:red">请上传文件！</div>
        <div v-if="isNeedExport" slot="tip" class="el-upload__tip">请先进行<span class="download">“导出”</span>或<span class="download">“全部导出”</span>操作获取模板</div>
        <div slot="tip" class="el-upload__tip">
          <span v-show="!isNeedExport" class="download" @click="downloadTemplate">下载模板</span>
          <span>导入文件不能超过5M，仅允许导入“xls”或“xlsx”格式文件</span>
        </div>
      </el-upload>
    </template>
  </DlgBasic>
</template>

<script>
// import downAPI from '@/api/common'
import customAPI from '@/api/customizeSearch'
import IEAPI from '@/api/importAndExport'
import DlgBasic from '@/components/DlgBasic'

export default {
  name: 'DlgBatchImport',
  components: { DlgBasic },
  props: {
    defaultProps: {
      type: Object,
      default: () => {
        return {
          keyWords: '',
          dlgTitle: '',
          footButtons: {
            confirm: { show: true, name: '保 存', type: 'primary' },
            repeatAdd: { show: false, name: '继续添加', type: 'warning' },
            cancel: { show: true, name: '取 消', type: '' }
          },
          selfImport: false
        }
      }
    },
    importDialog: { type: Object, default: () => { } },
    templateFile: {
      type: Object, default: () => { return { id: null, name: '' } }
    },
    // 是否需要先执行导出操作
    isNeedExport: { type: Boolean, default: false },
    keyWords: { type: String, default: '' }
  },
  data() {
    return {
      file: {},
      fileFlag: false,
      dialogFull: false,
      comfimLoading: false
    }
  },
  computed: {
    noFile() {
      if (!this.file.type && this.fileFlag) return true
      return false
    }
  },
  watch: {
    file: {
      handler() {
        this.$refs.dlgBasic.validate = !this.file.type
      },
      deep: true
    }
  },
  created() {
  },
  methods: {
    async showDialog(val) {
      if (this.$refs.upload) {
        await this.$refs.upload.clearFiles()
        this.file = {}
      }
      this.$refs.dlgBasic.showDialog(val)
    },
    // The parameter of the hook before uploading a file is the uploaded file.
    // If false or promise is returned and rejected, the upload will stop.
    // 上传文件前调用的钩子函数
    beforeUpload(file) {
      const fileTypes = ['xls', 'xlsx']
      const splitArr = file.name.split('.')
      const fileType = splitArr[splitArr.length - 1]
      const isLtSize = file.size / 1024 / 1024 < this.CONSTANT.FILE_MAX_SIZE

      if (!fileTypes.includes(fileType)) {
        this.$message.error('上传文件只能是 xls/xlsx 格式!')
        return false
      }
      if (!isLtSize) {
        return this.$message.error(`上传图片大小不能超过 ${this.CONSTANT.FILE_MAX_SIZE} MB!`)
      }
      this.fileFlag = false
      this.file = file
    },
    // 上传文件数量超过限制时触发的钩子函数
    // Hook when the number of files exceeds the limit
    handleExceed(files, fileList) {
      this.$message.warning('当前限制选择 1 个文件，请删除后继续上传')
    },
    // 关闭弹窗
    // Close the pop-up window
    closeDialog() {
      console.log(this.file)
      this.file = {}
      this.$refs.dlgBasic.showDialog(false)
    },
    // Download the template, judge which interface to call according to different bellongpage fields,
    // and obtain the templates belonging to different pages
    async downloadTemplate() {
      // 更新为以后的模板 都是后端代码生成
      // const templateFile = getTemplateFile(this.keyWords, '.xls')
      try {
        // this.importDialog.show = false
        this.showDialog(false)
        this.fullScreenLoading()
        let content
        if (this.defaultProps.keyWords) {
          if (this.defaultProps.keyWords === 'workManage') {
            content = await customAPI.template()
          } else if (this.defaultProps.keyWords === 'shiftArrange') {
            content = await customAPI.leaderTemplate()
          }
        }

        this.fullScreenLoading().close()
        this.downloadFile(content, '批量导入模板.xls')
      } catch (error) {
        this.fullScreenLoading().close()
      }
    },
    // Override the default upload behavior and customize the implementation of upload
    // According to different bellongpage fields, determine which page's upload interface to call,
    // or change it to emit event to process the event on each page, depending on the requirements
    // 确认上传
    async submit() {
      if (!this.file.type) {
        return (this.fileFlag = true)
      }
      if (this.defaultProps.selfImport) {
        this.$emit('selfImport', this.file)
        return
      }
      try {
        this.showDialog(false)
        this.fullScreenLoading()
        if (this.defaultProps.keyWords === 'workManage') {
          await customAPI.batchImport(this.file)
        } else if (this.defaultProps.keyWords === 'shiftArrange') {
          await customAPI.leaderBatchImport(this.file)
        } else {
          await IEAPI.importInfo(this.defaultProps.keyWords, this.file)
        }
        this.fullScreenLoading().close()
        this.$message.success('导入成功')
        this.$set(this.$refs.dlgBasic.buttonLoading, 'confirm', false)
        if (this.defaultProps.keyWords === 'SchoolOrganizationInfo') {
          this.$parent.$refs.DataTableTree.initDataTree()
        } else {
          this.$parent.$refs.dataTableList.$refs.table.clearSelection()
          this.$parent.$refs.dataTableList.initDataList()
        }
      } catch (error) {
        this.fullScreenLoading().close()
      }
      this.file = {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";

::v-deep .el-dialog__body {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-upload__tip {
  display: flex;
  .download {
    margin-right: 5px;
    color: $--color-primary;
    cursor: pointer;
  }
}
.view-dialog {
  ::v-deep .el-dialog__body {
    max-height: unset;
    height: calc(100vh - 108px);
  }
}
</style>
