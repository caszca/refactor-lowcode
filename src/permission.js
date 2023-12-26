import router from './router/index'

import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, setToken } from '@/utils/auth' // get token from cookie
import { filterAsyncRoutes } from '@/store/modules/permission'
import './utils/forDialog'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/Login', '/Forget', '/sso/ahut', '/404', '/Register'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const isToken = getToken()
  if (to.query.token && isToken !== to.query.token) {
    setToken(to.query.token)
    store.dispatch('user/setUserToken', to.query.token)
    try {
      setToken(to.query.token)
      await store.dispatch('user/getTokenUserInfo')
      const { menuList } = await store.dispatch('user/getUserInfo')
      await loadMenus(menuList, next, to)
      next('/Homepage')
    } catch (error) {
      next('/Login')
    }
    NProgress.done()
  } else {
    const hasToken = getToken()
    if (hasToken) {
      if (to.path === '/Login') {
        next('/Homepage')
        NProgress.done()
      } else {
        // 确定用户是否通过 getUserInfo 获取了权限角色
        const hasRoles = store.getters.roles && store.getters.roles.length > 0
        if (hasRoles) {
          next()
        } else {
          try {
            // 获取菜单信息及用户信息
            const { menuList } = await store.dispatch('user/getUserInfo')
            await loadMenus(menuList, next, to)
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            console.log(error)
            Message.error(error.message || '请求超时，请重试……')
            next(`/Login?redirect=${to.path}`)
            NProgress.done()
            // await store.dispatch('user/logout')
            // location.reload() // 为了重新实例化vue-router对象 避免bug
          }
        }
      }
    } else {
      // has no token
      if (whiteList.indexOf(to.path) !== -1) {
        // 如果需要跳转的页面在 whiteList 中，就直接跳转
        next()
      } else {
        // 否则重定向到登录页
        next(`/Login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  }
  // 确定用户是否已经登录
})

const loadMenus = async(roles, next, to) => {
  const asyncRoutes = await filterAsyncRoutes(roles)
  router.addRoute({ path: '*', redirect: '/404', hidden: true })
  await store.dispatch('generateRoutes', asyncRoutes)

  if (to.path === '/') {
    next({
      path: asyncRoutes[0].children[0].path
      // replace: true
    })
  } else {
    next({
      ...to
      // replace: true
    })
  }
}

router.afterEach(() => {
  NProgress.done()
})
