import request from '@/utils/request'

export default {
  getKey,
  getWholeKey,
  copyPreYear,
  checkPreYear,
  getUserByTicket,
  getLoginUrl,
  checkAndLogin,
  getLoginOutUrl,
  setTaskClassIds,
  createContestFoundInfo,
  checkProject,
  getProjectSpecialityIndustry,
  changeViewNum,
  chooseProject,
  changeOrderStatus,
  batchPass
}

function getKey() {
  return request({
    url: '/common/getKey',
    method: 'post'
  })
}

function getWholeKey(key, value) {
  value = value > 9 ? value : '0' + value
  return key + value + key.split('').reverse().join('')
}

/**
 * 复制上一年节假日信息
 * @param {*} dateYear 年份
 * @returns
 */
function copyPreYear(dateYear) {
  return request({
    url: '/school-holidays/copy-pre-year',
    method: 'post',
    data: {
      dateYear: dateYear
    }
  })
}

/**
 * 检查上一年是否有节假日信息
 * @param {*} dateYear 年份
 * @returns
 */
function checkPreYear(dateYear) {
  return request.get(`/school-holidays/check-pre-year/${dateYear}`)
}

/**
 * 通过ticket获取用户信息
 */
function getUserByTicket(url) {
  return request({
    url: '/sign/get-user-by-ticket',
    method: 'POST',
    data: {
      url
    }
  })
}

/**
 *
 * @returns 获取登录的url
 */
function getLoginUrl() {
  return request.get('/sign/get-login-url')
}

/**
 *
 * @param {*} account 账号
 * @returns
 */
function checkAndLogin(account) {
  return request({
    url: '/sign/check-and-login',
    method: 'POST',
    data: {
      account
    }
  })
}

/**
 *
 * @returns 获取登出的url
 */
function getLoginOutUrl() {
  return request.get('/sign/get-login-out-url')
}

/**
 * 设置信息登记对象
 * @param {*} id
 * @param {*} classIds
 */
function setTaskClassIds(id, classIds) {
  return request({
    url: '/registerTask/set-task-classIds',
    method: 'POST',
    data: {
      id,
      classIds
    }
  })
}

// 课题创建
function createContestFoundInfo(node) {
  return request({
    url: '/ProjectFlow/createFoundInfo',
    method: 'post',
    data: {
      node
    }
  })
}

// 课题批量审核
function checkProject(node) {
  return request({
    url: `/ProjectFlow/checkProject`,
    method: 'post',
    data: {
      node
    }
  })
}

// 课题批量审核
function getProjectSpecialityIndustry() {
  return request.get('/projectChoose/getProjectSpecialityIndustry')
}

// 学生浏览量增加
function changeViewNum(id) {
  return request({
    url: `/projectChoose/changeViewNum`,
    method: 'post',
    data: {
      id
    }
  })
}

// 课题选择
function chooseProject(teacherId, projectId) {
  return request({
    url: `/projectChoose/createOrder`,
    method: 'post',
    data: {
      teacherId,
      projectId
    }
  })
}

// 课题订单提交
function changeOrderStatus(id) {
  return request({
    url: `/projectChoose/changeOrderStatus?id=${id}`,
    method: 'post'
  })
}
// 一键通过
function batchPass(applyId) {
  return request({
    url: '/administrator/batchPass',
    method: 'post',
    data: applyId
  })
}
