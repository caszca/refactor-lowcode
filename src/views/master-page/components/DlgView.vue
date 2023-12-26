<template>
  <DlgBasic ref="dlgBasic" :default-props="defaultProps" show-close :show-cancel="true" :show-confirm="true">
    <template #mainForm>
      <el-form ref="form" :model="form" label-suffix=":" :label-width="labelWidth">
        <el-form-item v-for="(item, index) in formItems" :key="index" :label="item.name">
          <div v-if="item.field instanceof Array" class="item-line">
            <div v-if="item.field.length">
              <span v-for="(fitem, findex) in item.field" :key="findex">{{ form[fitem] }}</span>
            </div>
            <div v-else>--</div>
          </div>
          <div v-else-if="item.field === 'img'">
            <img style="width: 210px; height: 120px;" :src="form[item.field]" />
          </div>
          <div v-else-if="item.field === 'pyccType'">
            {{ form[item.field] === 1?'专科': form[item.field] === 2?'本科':'研究生' }}
          </div>
          <div v-else>{{ form[item.field] || '--' }}</div>
        </el-form-item>
      </el-form>
    </template>
    <template #other>
      <slot name="other" />
    </template>
  </DlgBasic>
</template>

<script>
import DlgBasic from '@/components/DlgBasic'

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
    labelWidth: { type: String, default: 'auto' }
  },
  data() {
    return {
      form: {},
      dialog: { show: false, title: '查看', option: 'view' },
      defaultProps: {
        keyWords: '',
        dlgTitle: '查看',
        footButtons: {
          confirm: { show: false, name: '保 存', type: 'primary' },
          repeatAdd: { show: false, name: '继续添加', type: 'warning' },
          cancel: { show: true, name: '取 消', type: '' }
        },
        selfImport: false
      }
    }
  },
  methods: {
    async showDialog(val, form) {
      this.form = form
      this.$refs.dlgBasic.showDialog(val)
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
</style>
