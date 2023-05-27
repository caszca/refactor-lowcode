<template>
  <header id="title-bar" class="title-bar fixed-title-bar" :style="bgColor">
    <div class="headline">
      <hamburger id="hamburger-container" :is-active="sideBar.opened" class="hamburger-container" :title="sideBar.opened ? '收起侧栏' : '展开侧栏'" @toggleClick="toggleSideBar" />
      <el-divider direction="vertical" />
      <span class="headline-sign">{{ "A" }}</span>
      <span>{{ settings.title }}</span>
    </div>
    <div class="right-menu">
      <el-avatar v-if="$store.getters.userInfo.headImage" :size="36" :src="$store.getters.userInfo.headImage" />
      <el-avatar v-else :size="36" icon="el-icon-user-solid" />
      <el-dropdown trigger="click">
        <div class="title-user-name">
          <span>{{ $store.getters.userInfo.name || "先生" }}，你好&nbsp;</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item @click.native="personalInfo">
            <span>个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import defaultSettings from '@/settings'
// import DlgBasic from '@/components/DlgBasic'
// import BtnGetVerCode from '@/components/BtnGetVerCode'
import default_avatar from '@/assets/img/avatar.png'
import Hamburger from '../Hamburger'
import userAPI from '@/api/user'
import other from '@/api/other'
import { mapGetters } from 'vuex'
// import listAPI from '@/api/list'
import { checkIsEmpty, checkPassword } from '@/utils/formRules'
import logo from '@/assets/img/logo.png'

export default {
  components: { Hamburger },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      logo,
      title: '',
      userInfo: { ...this.$store.getters.userInfo },
      form: { phone: this.$store.getters.userInfo.phone, verCode: '', password: '', checkPass: '' },
      defaultDBProps: {
        dlgTitle: '修改密码',
        footButtons: { repeatAdd: { show: false }},
        someFlags: {
          needValidate: false
        }
      },
      defaultAvatar: default_avatar,
      rules: {
        verCode: [{ required: true, message: '请输入', trigger: 'blur' }],
        password: [{ required: true, validator: checkPassword, trigger: ['change', 'blur'] }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      },
      btnDisabled: false, // 获取二维码按钮点击状态
      phoneFocus: false, // 手机输入框焦点
      verCodeFocus: false, // 验证码输入框焦点
      passwordFocus: false, // 密码输入框焦点
      passwordsFocus: false // 密码输入框焦点
    }
  },
  computed: {
    bgColor() {
      return { backgroundColor: this.$store.getters.userInfo.themeColor }
    },
    ...mapGetters(['sideBar', 'device', 'user', 'avatar', 'sex']),
    settings() {
      return defaultSettings
    },
    headImage() {
      return this.$store.getters.userInfo.headImage
    }
  },
  watch: {
    bgColor(color) {
      this.$emit('bgColor', this.$store.getters.userInfo.themeColor)
    }
  },
  created() {
    this.getTitle()
  },
  methods: {
    async themeChange(color) {
      this.userInfo.themeColor = color
      await userAPI.editUserInfo(this.userInfo.id, this.userInfo)
      this.$store.dispatch('user/updateUserInfo', this.userInfo)
      document.getElementsByTagName('body')[0].style.setProperty('--color-primary', color)
    },
    async getTitle() {
      this.title = defaultSettings.title
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    personalInfo() {
      this.$router.push('/User/Personal')
    },
    updatePassword() {
      this.$refs.dlgPassword.showDialog(true, this.form)
    },
    async logout() {
      const isSupwisdomCasLogin = sessionStorage.getItem('isSupwisdomCasLogin')
      if (isSupwisdomCasLogin) {
        sessionStorage.removeItem('isSupwisdomCasLogin')
        sessionStorage.removeItem('supwisdomCasLoginUser')
        const resp = await other.getLoginOutUrl()
        window.location.href = resp
      } else {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/Login`)
      }
    },
    async getVerCode() {
      try {
        // 判断是否输入过手机号
        if (!checkIsEmpty(this.phone)) {
          return this.$message.warning('请输入手机号')
        }
        // 判断手机号格式是否正确
        const phoneReg = /^1[0-9]{10}$/s
        if (!phoneReg.test(this.phone)) {
          this.$message.warning('手机号码格式不正确')
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
    async submit() {
      await this.$refs['form'].validate(async valid => {
        if (valid) {
          await userAPI.editPassword(this.form)
          this.$message.success('修改成功！')
          this.$refs.form.resetFields()
          this.$refs.dlgPassword.showDialog(false, this.form)
        }
      })
    },
    closeDialog(data) {
      this.$emit('closeDialog', data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
.title-bar {
  width: 100%;
  height: $titleBarHeight;
  display: flex;
  justify-content: space-between;
  background-color: #4575FF;
  .headline {
  img {
    width: 40px;
    height: 50px;
  }
  span + span {
    margin-left: 10px;
  }
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  font-size: 16px;
  color: $headlineColor;
  margin-left: 1em;
}
.right-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-avatar ::v-deep img {
      width: 100%;
    }
    .el-avatar + .el-dropdown {
      margin-left: 15px;
    }
    margin-right: 1em;
    .el-dropdown {
      cursor: pointer;
    }
  }
  .title-user-name {
    color: $headlineColor;
  }
.hamburger-container {
  cursor: pointer;
  margin-left: 4px;
}
.headline-sign {
  display: inline-block;
  height: 30px;
  width: 30px;
  line-height: 30px;
  box-sizing: border-box;
  background: #ffffff33;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  font-size: 18px;
  line-height: 30px;
  font-family: Arial Normal,Arial,sans-serif;
}
// .fixed-title-bar {
//   position: fixed;
//   top: 0;
// }
.el-divider--vertical{
  margin: 0 16px !important;
}
}
</style>

