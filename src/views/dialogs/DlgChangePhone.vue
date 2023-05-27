<template>
  <DlgBasic ref="dlgBasic" :default-props="defaultDBProps" :dlgbasic-confirm="submit">
    <template slot="mainForm">
      <el-form ref="editForm" :model="form" :rules="formRules" label-width="80px">
        <el-form-item prop="phone" label="新手机号">
          <el-input v-model.trim="form.phone" placeholder="请输入手机号" maxlength="11" />
        </el-form-item>
        <el-form-item prop="verCode" label="验证码">
          <el-input v-model.number="form.verCode" style="width: 55%" placeholder="输入验证码" maxlength="6" auto-complete="off" />
          <BtnGetVerCode :phone="form.phone" style="float: right; width: 40%; padding: 12px 0" />
        </el-form-item>
      </el-form>
    </template>
  </DlgBasic>
</template>

<script>
import DlgBasic from '@/components/DlgBasic'
import { checkPhone } from '@/utils/formRules'
import BtnGetVerCode from '@/components/BtnGetVerCode'

export default {
  name: 'DlgChangePhone',
  components: { DlgBasic, BtnGetVerCode },
  props: {

  },
  data() {
    return {
      defaultDBProps: {
        dlgTitle: '更换手机号',
        footButtons: { repeatAdd: { show: false }}
      },
      form: { phone: '', verCode: '' },
      formRules: {
        phone: {
          required: true, validator: checkPhone, trigger: ['blur', 'change']
        },
        verCode: { required: true, message: '请输入验证码', trigger: 'blur' }
      }

    }
  },
  watch: {
    form: {
      handler(val, oldVal) {
        this.verifyValid()
      },
      deep: true
    }
  },
  mounted() {

  },
  methods: {
    showDialog(val) {
      this.$refs.dlgBasic.showDialog(val, this.form)
      setTimeout(() => { this.$refs.editForm.clearValidate() }, 20)
    },
    verifyValid() {
      this.$nextTick(() => {
        this.$refs.editForm.validate((valid) => {
          this.$refs.dlgBasic.validate = !valid
        })
      })
    },
    async submit() {
      await this.$refs['editForm'].validate(async valid => {
        if (valid) {
          try {
            // await UserAPI.checkVerCode(this.editForm)
            this.showDialog(false, this.editForm)
            this.$emit('update-phone', this.form.phone)
          } catch (error) {
            error
          }
        }
      })
    }
  }
}
</script>
