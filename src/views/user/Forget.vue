<template>
  <el-container>
    <el-header height="100px">
      <span class="title-span">{{ settings.title }}</span>
    </el-header>
    <el-main>
      <div class="body">
        <!-- 头部分布条 -->
        <el-steps v-if="active!==2" :active="active" finish-status="success" class="step" align-center>
          <el-step title="验证身份" />
          <el-step title="输入新密码" />
          <el-step title="完成" />
        </el-steps>
        <div v-if="active === 0" style="display:flex;justify-content:center;">
          <el-input v-model="phone" class="axt-phone" type="text" auto-complete="on" placeholder="请输绑定手机号" @focus="phoneFocus=true" @blur="phoneFocus=false">
            <svg-icon slot="prefix" icon-class="phone" :class="{'is-active':phoneFocus}" />
          </el-input>
        </div>
        <div v-if="active === 0" class="axt-verCode">
          <el-input v-model="verCode" class="verCode-input" type="text" auto-complete="on" placeholder="请输入验证码" @focus="verCodeFocus=true" @blur="verCodeFocus=false">
            <svg-icon slot="prefix" icon-class="verCode" :class="{'is-active':verCodeFocus}" />
          </el-input>
          <el-button :disabled="btnDisabled" class="verCode-btn" type="primary" @click="getVerCode">{{ btnValue }}</el-button>
        </div>
        <div v-if="active === 1" class="step-two">
          <el-input v-model="newPassword" class="axt-phone" type="password" auto-complete="on" placeholder="请输入新密码" show-password @focus="passwordFocus=true" @blur="passwordFocus=false">
            <svg-icon slot="prefix" icon-class="axt-s-password" :class="{'is-active':passwordFocus}" />
          </el-input>
          <el-input v-model="confirmNewPassword" class="axt-phone1" type="password" auto-complete="on" placeholder="请再次输入密码" show-password @focus="newPasswordFocus=true" @blur="newPasswordFocus=false">
            <svg-icon slot="prefix" icon-class="axt-s-password" :class="{'is-active':newPasswordFocus}" />
          </el-input>
        </div>
        <div class="step-two">
          <svg-icon v-if="active === 2" slot="prefix" icon-class="finish" class="finish-img" />
          <span v-if="active === 2" class="finish-span">修改密码成功，请使用新密码登录</span>
        </div>
        <!-- 底部按钮 -->
        <div class="body-foot">
          <el-button v-if="active !== 2" type="primary" @click="confirm">确定</el-button>
          <el-button plain @click="cancel">{{ active===2?'返回登录页面':'取消' }}</el-button>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import userAPI from '@/api/user'
import { checkIsEmpty } from '@/utils/formRules'
import defaultSettings from '@/settings'
export default {
  name: 'Forget',
  data() {
    return {
      active: 0, // 当前进行的步骤
      phone: '', // 绑定的手机号
      verCode: '', // 验证码
      btnValue: '发送验证码',
      newPassword: '', // 新密码
      btnDisabled: false, // 获取二维码按钮点击状态
      confirmNewPassword: '', // 二次输入
      phoneFocus: false, // 手机输入框焦点
      verCodeFocus: false, // 验证码输入框焦点
      passwordFocus: false, // 密码输入框焦点
      newPasswordFocus: false,
      passwordsFocus: false // 密码输入框焦点
    }
  },
  computed: {
    settings() {
      return defaultSettings
    }
  },
  methods: {
    confirm() {
      if (this.active === 0) {
        this.oneStep()
      }
      if (this.active === 1) {
        this.twoStep()
      }
    },
    // 获取验证码
    async getVerCode() {
      try {
        // 判断是否输入过手机号
        if (!checkIsEmpty(this.phone)) {
          return this.$message.warning('请输入手机号')
        }
        // 判断手机号格式是否正确
        const phoneReg = /^1[0-9]{10}$/s
        if (!phoneReg.test(this.phone)) {
          return this.$message.warning('手机号码格式不正确')
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
      } catch (error) {
        console.log(error)
      }
    },
    // 第一步确认
    async oneStep() {
      // 判断手机号格式是否正确
      const phoneReg = /^1[0-9]{10}$/s
      // 判断是否输入过手机号
      if (!checkIsEmpty(this.phone)) {
        return this.$message.warning('请输入手机号')
      } else if (!phoneReg.test(this.phone)) {
        this.$message.warning('手机号码格式不正确')
      } else if (this.verCode === '') {
        this.$message.warning('请输入验证码')
      } else {
        try {
          await userAPI.verifyVerCode({
            phone: this.phone,
            verCode: this.verCode
          })
          this.active++
        } catch (error) {
          this.$message.warning(error)
        }
      }
    },
    // 第二步确认
    async twoStep() {
      if (this.newPassword !== this.confirmNewPassword) {
        this.$message.warning('两次输入的密码不一样')
      } else {
        try {
          await userAPI.editPassword1(this.phone, this.confirmNewPassword)
          this.active++
        } catch (error) {
          this.$message.warning(error)
        }
      }
    },
    // 取消
    cancel() {
      this.$router.replace('/Login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";

.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: $--color-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 55px;
    height: 70px;
  }
  .title-span {
    line-height: 60px;
    font-size: 24px;
    color: white;
    font-weight: bold;
    margin-left: 10px;
  }
}
.el-main {
  background-color: #e9eef3;
  color: #999;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.body {
  position: relative;
  width: 442px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 520px;
}
.step {
  position: absolute;
  top: 0;
  width: 457px;
  margin-top: 52px;
  // margin-left: -21px;
}
.axt-phone {
  width: 336px;
}
.axt-phone1 {
  width: 336px;
  margin-top: 16px;
  display: flex;
}
::v-deep .el-step__title {
  font-size: 16px;
  color: #333;
}
.axt-verCode {
  margin-top: 16px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  .verCode-input {
    width: 223px;
  }
  .verCode-btn {
    width: 90px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -27px;
  }
}
::v-deep .el-input__prefix {
  top: 12px;
  left: 10px;
}
.finish-img {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 120px;
}
::v-deep .el-button + .el-button {
  margin-left: 0;
}

.body-foot {
  height: 96px;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .el-button {
    height: 40px;
    width: 336px;
    font-size: 18px;
  }
  .el-button + .el-button {
    margin-top: 16px;
    margin-left: 0;
  }
  .el-button.is-plain {
    background: #e9eef3;
    border-color: #999;
  }
  .el-button.is-plain:hover {
    border-color: $--color-primary;
  }
}
.step-two {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.finish-span {
  margin-top: 36px;
  color: #333;
}
.el-steps.el-steps--horizontal
  ::v-deep
  .el-step.is-horizontal.is-center
  ::v-deep
  .el-step__head.is-process {
  color: white;
  // background-color: $--color-primary;
  border-color: $--color-primary !important;
  ::v-deep .el-step__icon.is-text {
    background-color: $--color-primary;
    width: 32px;
    height: 32px;
    font-size: 18px;
  }
}
.el-steps.el-steps--horizontal
  ::v-deep
  .el-step.is-horizontal.is-center
  ::v-deep
  .el-step__head.is-success {
  color: white;
  // background-color: $--color-primary;
  border-color: grey;
  ::v-deep .el-step__icon.is-text {
    background-color: grey;
    width: 32px;
    height: 32px;
    font-size: 18px;
  }
}
.el-steps.el-steps--horizontal
  ::v-deep
  .el-step.is-horizontal.is-center
  ::v-deep
  .el-step__head.is-wait {
  color: white;
  // background-color: $--color-primary;
  border-color: grey;
  ::v-deep .el-step__icon.is-text {
    background-color: grey;
    width: 32px;
    height: 32px;
    font-size: 18px;
  }
}
::v-deep .el-step.is-horizontal .el-step__line {
  top: 16px;
}
::v-deep .el-step__line {
  background-color: grey;
  margin-left: 25px !important;
  margin-right: 25px !important;
}

.is-active {
  color: $--color-primary;
}
</style>
