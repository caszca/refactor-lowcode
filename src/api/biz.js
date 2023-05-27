import request from '@/utils/request'

export default {
  getSomeRecords,
  upload2,
  semesterYear,
  getRegisterTaskList,
  getCollegeClass,
  getSomeRecords2,
  getFieldList,
  getHeader,
  getTaskSomeRecords,
  taskStatic,
  relieve,
  relieveTips,
  disciplinePunishStatic,
  getAssessTask,
  emptyScore,
  selfAssessment,
  getSelfAssessment,
  gradingSetting,
  selection,
  addPushUser,
  addOrReduce,
  registrationHomepage,
  getFreeOrDelayApply,
  approvalPage,
  approval,
  batchRegister,
  revokeRegister,
  registerStatistics
}

function getSomeRecords(name) {
  return request({
    url: '/schoolYear/getSomeRecords',
    method: 'post',
    data: {
      name
    }
  })
}

function upload2(params) {
  const formData = new FormData()
  Object.keys(params).forEach(key => {
    formData.append(key, params[key])
  })
  return request({
    url: '/common/minio/upload',
    method: 'post',
    data: formData
  })
}

// 学期下拉框
function semesterYear() {
  return request({
    url: '/registerTask/semesterYear',
    method: 'get'
  })
}

// 报道登记任务列表
function getRegisterTaskList(data) {
  return request({
    url: '/registerTask/getSomeRecords',
    method: 'post',
    data
  })
}

// 报道登记任务选择报道对象
function getCollegeClass() {
  return request({
    url: '/registerTask/getCollegeClass',
    method: 'get'
  })
}

// 采集字段配置任务列表
function getSomeRecords2(keyWords, searchKey, pageInfo) {
  return request({
    url: '/dataList/getSomeRecords2',
    method: 'post',
    data: { keyWords, searchKey, pageInfo }
  })
}
// 采集字段配置获取字段
function getFieldList(taskId) {
  return request({
    url: `/registerTask/getFieldList?taskId=${taskId}`,
    method: 'get'
  })
}
// 报到登记查看动态表头
function getHeader(taskId) {
  return request({
    url: `/registerTask/getHeader?taskId=${taskId}`,
    method: 'get'
  })
}
// 报道查看
function getTaskSomeRecords(data) {
  return request({
    url: '/registerTask/getTaskSomeRecords',
    method: 'post',
    data
  })
}
// 报道统计
function taskStatic(data) {
  return request({
    url: '/registerTask/taskStatic',
    method: 'post',
    data
  })
}
// 解除违纪
function relieve(data) {
  return request({
    url: '/disciplinePunish/relieve',
    method: 'post',
    data
  })
}
// 解除违纪弹窗提醒
function relieveTips(data) {
  return request({
    url: '/disciplinePunish/relieveTips',
    method: 'post',
    data
  })
}

// 违纪统计列表
function disciplinePunishStatic(data) {
  return request({
    url: '/disciplinePunish/disciplinePunishStatic',
    method: 'post',
    data
  })
}

// 学工队伍考核任务列表
function getAssessTask(data) {
  return request({
    url: '/assessTask/getAssessTask',
    method: 'post',
    data
  })
}

// 学院考核评分清空分数
function emptyScore(data) {
  return request({
    url: '/assessTask/emptyScore',
    method: 'post',
    data
  })
}

// 自评保存
function selfAssessment(data) {
  return request({
    url: '/assessTask/selfAssessment',
    method: 'post',
    data
  })
}

// 自评列表
function getSelfAssessment(data) {
  return request({
    url: '/assessTask/getSelfAssessment',
    method: 'post',
    data
  })
}

// 定级设置
function gradingSetting(data) {
  return request({
    url: '/assessTask/gradingSetting',
    method: 'post',
    data
  })
}

// 加减分录入人员列表
function selection(taskId) {
  return request({
    url: `/assessTask/selection?taskId=${taskId}`,
    method: 'get'
  })
}

// 创建考核任务选择评价对象
function addPushUser() {
  return request({
    url: `/assessTask/addPushUser`,
    method: 'get'
  })
}

// 加减分添加
function addOrReduce(data) {
  return request({
    url: '/assessTask/addOrReduce',
    method: 'post',
    data
  })
}

// 注册缴费学生端注册信息
function registrationHomepage() {
  return request({
    url: `/registration/registrationHomepage`,
    method: 'get'
  })
}

// 注册缴费学生端缓免缴信息
function getFreeOrDelayApply() {
  return request({
    url: `/registration/getFreeOrDelayApply`,
    method: 'get'
  })
}

// 查询当前学生申请流程结点
function approvalPage(data) {
  return request({
    url: '/registration/approvalPage',
    method: 'post',
    data
  })
}

// 学生申请审批
function approval(data) {
  return request({
    url: '/registration/approval',
    method: 'post',
    data
  })
}

// 辅导员注册学生
function batchRegister(ids) {
  return request({
    url: '/registration/batchRegister',
    method: 'post',
    data: {
      messageIds: ids
    }
  })
}

// 辅导员撤销注册
function revokeRegister(messageId) {
  return request({
    url: `/registration/revokeRegister?messageId=${messageId}`,
    method: 'get'
  })
}

// 注册统计
function registerStatistics(data) {
  return request({
    url: '/registration/registerStatistics',
    method: 'post',
    data
  })
}
