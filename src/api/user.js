
import request from '@/utils/request'
import qs from 'qs'

export default {
  getUserRoles,
  saveUserRoles,
  saveUserContest,
  register,
  login,
  logout,
  getUserInfo,
  checkVerCode,
  verifyVerCode,
  editUserInfo,
  getVerCode,
  editPassword,
  editPassword1,
  getDepartment,
  uploadAvatar
}
// 注册 { phone, account, password, verCode }
function register(node) {
  return request({
    url: '/sign/register',
    method: 'post',
    data: { node: JSON.stringify(node) }
  })
  // return request.post(`/sign/register/${phone}?${qs.stringify({ password, account, verCode })}`)
}
// 登录
function login({ account, password, rememberMe }) { // 记住密码
  return request({
    url: '/sign/login',
    method: 'post',
    data: {
      account: account,
      password: password,
      rememberMe: rememberMe
    }
  })
}
// 退出
function logout() {
  return request.post('/sign/logout')
}
// 获取用户权限信息
function getUserRoles(userId) {
  return request({
    url: '/sign/getUserRoles',
    method: 'post',
    data: { userId }
  })
}

// 保存用户权限信息
function saveUserRoles(userId, roleIds) {
  return request({
    url: '/sign/saveUserRoles',
    method: 'post',
    data: { userId, roleIds }
  })
}
// 保存用户竞赛类型信息
function saveUserContest(userId, roleId, ContestTypeIds) {
  return request({
    url: '/sign/saveUserContest',
    method: 'post',
    data: { userId, roleId, ContestTypeIds }
  })
}
// 获取个人用户信息
function getUserInfo() {
  return request.get('/sign/info')
  // var date = new Date()
  // var userAgent = navigator.userAgent
  // return request({
  //   url: '/sign/info',
  //   method: 'post',
  //   data: { date, userAgent }
  // })
}

// 验证码（用于更换手机号）
function checkVerCode({ phone, verCode }) {
  console.log(1223333333)
  return request.post(`/sign/checkVerCode/${phone}?${qs.stringify({ verCode })}`)
}

// 验证码（用于验证验证码）
function verifyVerCode({ phone, verCode }) {
  return request.post(`/sign/checkVerCode/`, qs.stringify({ phone, verCode }))
}

// 编辑用户信息(body)
function editUserInfo(userId, data) {
  return request.post(`/sign/editUserInfo/${userId}`, data)
}
// 发送验证码
function getVerCode(phone) {
  return request.get(`/sign/verCode/${phone}`)
}
// 修改密码
function editPassword({ phone, verCode, password }) {
  return request.post(`/sign/editPassword/${phone}?${qs.stringify({ password, verCode })}`)
}
// 忘记密码，设置新密码
function editPassword1(phone, password) {
  return request.post(`/sign/editPassword?${qs.stringify({ phone, password })}`)
}

// 修改密码
function getDepartment(parentId) {
  return request({
    url: '/sign/getDepartment',
    method: 'post',
    data: { parentId }
  })
}

// 头像上传
function uploadAvatar(file) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: `/sign/oss/uploadAvatar`,
    method: 'post',
    data: formData
  })
}
