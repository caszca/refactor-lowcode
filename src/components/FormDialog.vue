<template>
  <DlgBasic ref="dlgBasic" :default-props="defaultProps" show-close :show-cancel="true" :show-confirm="true" :dlgbasic-spec-confirm="dlgbasicSpecConfirm">
    <template #mainForm>

      <div ref="orderForm">
        <el-form ref="form" :model="form" label-suffix=":" :label-width="labelWidth">
          <el-form-item v-for="(item, index) in formItems" :key="index" :label="item.name">
            <div v-if="item.field instanceof Array" class="item-line">
              <div v-if="item.field.length">
                <span v-for="(fitem, findex) in item.field" :key="findex">{{ form[fitem] }}</span>
              </div>
              <div v-else>--</div>
            </div>
            <div v-else-if="item.field === 'pyccType'">
              {{ form[item.field] === 1?'专科': form[item.field] === 2?'本科':'研究生' }}
            </div>
            <div v-else>{{ form[item.field] || '--' }}</div>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="4">附件:</el-col>
          <el-col :span="20">
            <div class="pic">
              <el-image v-for="item in imgList" :key="item" style="width: 100px; height: 100px" :src="item" :preview-src-list="imgList" :z-index="9999" />
            </div>
          </el-col>
        </el-row>
        <div class="audit">
          <header>审批意见</header>
          <el-timeline>
            <el-timeline-item v-for="(item, index) in auditList" :key="index" :timestamp="item.createTime?formatTime(item.createTime):''">
              {{ item.applyUser }} ({{ item.result }})
            </el-timeline-item>
          </el-timeline>
          <div v-if="form.currentStatus ==0" style="display: flex;justify-content: end;">
            <el-radio v-model="operation" :label="1">同意</el-radio>
            <el-radio v-model="operation" :label="2">拒绝</el-radio>
          </div>
        </div>
      </div>
    </template>
    <template v-if="form.isRecepit" #otherBtn>
      <el-button size="small" @click="pdfDownload">导出至本地</el-button>
    </template>
  </DlgBasic>
</template>

<script>
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import moment from 'moment'
import DlgBasic from '@/components/DlgBasic'
import flowApi from '@/api/flow'
export default {
  name: 'DlgView',
  components: { DlgBasic },
  props: {
    formItems: {
      type: Array,
      default: () => [
        { name: '名称', field: 'name', type: 'input' },
        { name: '代号', field: 'code', type: 'input' },
        { name: '备注', field: 'remarks', type: 'textarea' }
      ]
    },
    labelWidth: { type: String, default: '100px' }
  },
  data() {
    return {
      operation: 1,
      auditList: [],
      imgList: [],
      form: {},
      dialog: { show: false, title: '查看', option: 'view' },
      defaultProps: {
        someFlags: {
          needValidate: false },
        keyWords: '',
        dlgTitle: '查看',
        footButtons: {
          confirm: { show: false, name: '确定', type: 'primary' },
          repeatAdd: { show: false, name: '继续添加', type: 'warning' },
          cancel: { show: true, name: '取 消', type: '' }
        },
        selfImport: false
      }
    }
  },
  methods: {
    formatTime(val) {
      return moment(val).format('YYYY-MM-DD HH:mm')
    },
    async showDialog(val, form) {
      // 查看流程节点 跟附件
      this.form = form
      let processInstanceId = this.form.processInstanceId
      if (form.isReport) {
        processInstanceId = this.form.reportProcessInstanceId
      }
      const resp = await flowApi.getFlowList(processInstanceId)
      if (this.form.currentStatus === 0) {
        this.defaultProps.footButtons.confirm.show = true
      } else {
        this.defaultProps.footButtons.confirm.show = false
      }

      this.auditList = resp.data.flowList
      this.imgList = resp.data.imgList
      this.$refs.dlgBasic.showDialog(val)
    },
    async dlgbasicSpecConfirm() {
      this.$confirm('提交以后不能修改，确定提交吗？', '注意')
        .then(async _ => {
          const data = { operation: this.operation, processInstanceId: this.form.processInstanceId }
          await flowApi.singleOperation(data)
          this.$refs.dlgBasic.dialogShow = false
          this.$refs.dlgBasic.$parent.$parent.initDataList()
        }).catch(_ => { })
    },
    pdfDownload() {
      this.fullScreenLoading()
      try {
        const vm = this
        const A4_WIDTH = 592.28
        const A4_HEIGHT = 841.89
        vm.$nextTick(() => {
          // dom的id。
          const target = this.$refs.orderForm
          const pageHeight = target.scrollWidth / A4_WIDTH * A4_HEIGHT
          // 获取分割dom，此处为class类名为item的dom
          const lableListID = document.getElementsByClassName('item')
          // 进行分割操作，当dom内容已超出a4的高度，则将该dom前插入一个空dom，把他挤下去，分割
          for (let i = 0; i < lableListID.length; i++) {
            const multiple = Math.ceil((lableListID[i].offsetTop + lableListID[i].offsetHeight) / pageHeight)
            if (this.isSplit(lableListID, i, multiple * pageHeight)) {
              const divParent = lableListID[i].parentNode // 获取该div的父节点
              const newNode = document.createElement('div')
              newNode.className = 'emptyDiv'
              newNode.style.background = '#fff'
              const _H = multiple * pageHeight - (lableListID[i].offsetTop + lableListID[i].offsetHeight)
              newNode.style.height = _H + 30 + 'px'
              newNode.style.width = '100%'
              const next = lableListID[i].nextSibling // 获取div的下一个兄弟节点
              // 判断兄弟节点是否存在
              if (next) {
                // 存在则将新节点插入到div的下一个兄弟节点之前，即div之后
                divParent.insertBefore(newNode, next)
              } else {
                // 不存在则直接添加到最后,appendChild默认添加到divParent的最后
                divParent.appendChild(newNode)
              }
            }
          }
          this.pdf()
        })
      } catch (error) {
        this.fullScreenLoading().close()
      }
    },
    // 判断是否需要添加空白div
    isSplit(nodes, index, pageHeight) {
      // 计算当前这块dom是否跨越了a4大小，以此分割
      if (nodes[index].offsetTop + nodes[index].offsetHeight < pageHeight && nodes[index + 1] && nodes[index + 1].offsetTop + nodes[index + 1].offsetHeight > pageHeight) {
        return true
      }
      return false
    },
    pdf() {
      try {
        // const that = this
        const target = this.$refs.orderForm
        // 避免出现浏览器滚动条导致的内容不全处理
        document.body.scrollTop = 0
        // div内部滚动导致内容不全处理
        document.getElementById('app').style.height = 'auto'
        setTimeout(() => {
          html2canvas(target, {
            useCORS: true,
            background: '#fff',
            dpi: 300,
            allowTaint: true
          }).then(canvas => {
            var contentWidth = canvas.width
            var contentHeight = canvas.height

            // 一页pdf显示html页面生成的canvas高度;
            var pageHeight = contentWidth / 592.28 * 841.89
            // 未生成pdf的html页面高度
            var leftHeight = contentHeight
            console.log(leftHeight)
            // 页面偏移
            var position = 0
            // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            var imgWidth = 595.28
            var imgHeight = 592.28 / contentWidth * contentHeight

            var pageData = canvas.toDataURL('image/jpeg', 1.0)

            var pdf = new JsPDF('', 'pt', 'a4')

            // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            // 当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
              pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
            } else {
              while (leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight
                position -= 841.89
                // 避免添加空白页
                if (leftHeight > 0) {
                  pdf.addPage()
                }
              }
            }
            pdf.save(`回执单.pdf`)
            this.fullScreenLoading().close()
            this.$refs.dlgBasic.closeDlg()
            document.getElementById('app').style.height = '100%'
          })
        }, 300)
      } catch (error) {
        this.fullScreenLoading().close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
.item-line {
  span + span {
    margin-left: 15px;
  }
}
 .audit {
      margin-top: 15px;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 10px 20px;
      header {
          font-size: 18px;
          margin-bottom: 20px;
      }
  }
</style>
