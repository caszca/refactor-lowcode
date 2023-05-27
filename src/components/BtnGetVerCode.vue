<template>
  <el-button :type="type" :disabled="btnDisabled" @click="getVerCode">{{ btnValue }}</el-button>
</template>
<script>
import userAPI from '@/api/user'
import { checkIsEmpty } from '@/utils/formRules'
export default {
  name: 'BtnGetVercode',
  props: {
    phone: { type: String, default: '' },
    type: { type: String, default: 'primary' }
  },
  data() {
    return {
      btnValue: '获取验证码',
      btnDisabled: false
    }
  },

  methods: {
    async getVerCode() {
      try {
        if (!checkIsEmpty(this.phone)) {
          return this.$message.warning('请输入手机号')
        }
        await userAPI.getVerCode(this.phone)
        this.btnDisabled = true
        let count = 60
        const timer = setInterval(() => {
          this.btnValue = `${--count}秒后重新获取`
          if (count === 0) {
            this.btnValue = '重新获取验证码'
            this.btnDisabled = false
            clearInterval(timer)
          }
        }, 1000)
      } catch (error) { error }
    }
  }
}
</script>
