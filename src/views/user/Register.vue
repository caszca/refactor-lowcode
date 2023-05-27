<template>
  <div class="login-container">
    <div class="login-form">
      <h1 style="margin-top: 0">欢迎注册</h1>

      <el-form ref="regForm" :model="regForm" :rules="regRule">
        <el-form-item prop="phone">
          <el-input v-model="regForm.phone" placeholder="请输入手机号" maxlength="11" />
        </el-form-item>
        <el-form-item prop="verCode">
          <el-input v-model.number="regForm.verCode" placeholder="输入验证码" style="width: 55%" maxlength="6" />
          <BtnGetVerCode :phone="regForm.phone" style="float: right" />
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="regForm.username" placeholder="请输入用户名" :maxlength="CONSTANT.INFO_MAX_LENGTH" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="regForm.password" type="password" placeholder="请输入密码" :maxlength="CONSTANT.INFO_MAX_LENGTH" />
          <!-- <el-progress show-text="false" :text-inside="true" :percentage="passwordPercent" :stroke-width="16" :color="customColors" style="margin-top:8px" /> -->
        </el-form-item>
        <el-form-item prop="password2">
          <el-input v-model.trim="regForm.password2" type="password" placeholder="请再次输入密码" :maxlength="CONSTANT.INFO_MAX_LENGTH" />
        </el-form-item>
      </el-form>
      <el-button :loading="loading" type="primary" style="width: 100%; margin-top: 20px; margin-bottom: 20px" @click="handleRegister">
        <span v-if="!loading">注 册</span>
        <span v-else>注 册 中...</span>
      </el-button>
      <div style="display: flex">
        <span>已有账号？</span>
        <el-link>
          <router-link class="new-account" to="/Login">登录</router-link>
        </el-link>
      </div>
    </div>
  </div>
</template>
<script>
import userAPI from '@/api/user'
import { checkPhone, checkPassword, checkIsEmpty } from '@/utils/formRules'
import BtnGetVerCode from '@/components/BtnGetVerCode'
export default {
  name: 'Register',
  components: { BtnGetVerCode },
  data() {
    const checkPassword2 = (rule, value, callback) => {
      if (!checkIsEmpty(value)) {
        callback(new Error('密码不能为空'))
      }
      if (value !== this.regForm.password) {
        callback(new Error('两次密码输入不一致，请检查后重新输入'))
      }
      callback()
    }
    return {
      passwordPercent: 0,
      customColors: [
        { color: '#f56c6c', percentage: 20 }, { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 }, { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      regForm: { username: '', phone: '', password: '', password2: '', verCode: '' },
      loading: false,
      regRule: {
        phone: [{ required: true, validator: checkPhone, trigger: ['blur', 'change'] }],
        verCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, validator: checkPassword, trigger: 'blur' }],
        password2: [{ required: true, validator: checkPassword2, trigger: 'blur' }]
      },
      btnValue: '获取验证码',
      btnDisabled: false,
      redirect: undefined
    }
  },

  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleRegister() {
      this.$refs.regForm.validate(async valid => {
        if (valid) {
          try {
            this.loading = true
            this.regForm.phone = this.form.phone
            await userAPI.register(this.regForm)
            this.$message.success('注册成功')
            this.$router.push({ path: this.redirect || '/' })
          } catch (error) {
            console.log(error)
          }
          this.loading = false
        } else {
          return false
        }
      })
    }
  }
}
</script>
