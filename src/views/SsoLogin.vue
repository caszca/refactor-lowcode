<template>
  <div />
</template>
<script>
import { isLogin, hasTicket, getServiceValidateUrl } from '@/utils/casUtils'
import { setToken, removeToken } from '@/utils/auth'
import other from '@/api/other'
export default {
  name: 'SsoLogin',
  created() {
    // 判断是否登录
    this.login()
  },
  methods: {
    async login() {
      if (isLogin()) {
        // 当前系统已登录，直接跳转至主页
        this.$router.push('/Homepage')
      } else {
        // 首先判断是否携带ticket
        if (hasTicket()) {
          // 根据ticket获取登录的用户信息
          const resp = getServiceValidateUrl()
          const users = await other.getUserByTicket(resp)
          const result = await this.customLogin(users)
          if (users.login && result) {
            setToken('login success')
            this.$router.push('/Homepage')
          } else {
            // 如果失败，前端自行处理
            removeToken()
            this.$router.push('/404')
          }
        } else {
          // 获取跳转的路径
          const url = await other.getLoginUrl()
          console.log(url)
          window.location.href = url
        }
      }
    },
    async customLogin(users) {
      // 业务系统进行登录 根据account来判断用户是否存在
      const resp = await other.checkAndLogin(users.account)
      if (resp.isLogin) {
        sessionStorage.setItem('isSupwisdomCasLogin', true)
        sessionStorage.setItem('supwisdomCasLoginUser', JSON.stringify(resp.userInfo))
      } else {
        return false
      }
      return true
    }
  }
}
</script>
