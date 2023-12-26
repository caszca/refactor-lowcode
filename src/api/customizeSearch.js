import request from '@/utils/request'
import qs from 'qs'

export default {
  getStudyPlatform,
  getStudentTrainApply,
  getStudentExamTrainApply,
  getCourseResources,
  getDetails,
  createStudentTrainApply,
  batchPassTrain,
  getExamApplyTime,
  applyCourse,
  getExamPlan,
  teasRegistration,
  getStudentClass,
  certificateQuery,
  template,
  getStudentCode,
  paymentInquiry,
  editSysOssFile
}

function getStudyPlatform(data) {
  return request({
    url: '/student/getStudyPlatform',
    method: 'post',
    data
  })
}

// 获取学生培训报名信息
function getStudentTrainApply(classId, examPlanId, studentId) {
  return request({
    url: `/student/getStudentTrainApply?classId=${classId}&examPlanId=${examPlanId}&studentId=${studentId}`,
    method: 'post'
  })
}

// 获取学生培训报名信息
function getStudentExamTrainApply(signTaskId, examPlanId, studentId) {
  return request({
    url: `/student/getStudentExamTrainApply?signTaskId=${signTaskId}&examPlanId=${examPlanId}&studentId=${studentId}`,
    method: 'post'
  })
}

// 获取学生培训报名信息（thl）
function getCourseResources(courseId, trainApplyId) {
  return request({
    url: `/student/getCourseResources?courseId=${courseId}&trainApplyId=${trainApplyId}`,
    method: 'post'
  })
}

// 获取报名时间(thl)
function getExamApplyTime(classId) {
  return request({
    url: `/student/getExamApplyTime?classId=${classId}`,
    method: 'post'
  })
}

// 获取报名编号
function getStudentCode(examPlanId) {
  return request({
    url: `/student/getStudentCode?examPlanId=${examPlanId}`,
    method: 'post'
  })
}

function getDetails(classId) {
  return request({
    url: `/student/getDetails?classId=${classId}`,
    method: 'post'
  })
}

function createStudentTrainApply(signTaskId) {
  return request({
    url: `/student/createStudentTrainApply?signTaskId=${signTaskId}`,
    method: 'post'
  })
}

// 一键通过
function batchPassTrain(applyId) {
  return request({
    url: '/student/trainBatchPass',
    method: 'post',
    data: applyId
  })
}

// 获取付款二维码
function applyCourse({ trainApplyId, courseMoney }) {
  return request({
    url: '/student/apply-course',
    method: 'post',
    data: { trainApplyId, courseMoney }
  })
}

// 考试报名平台
function getExamPlan(data) {
  return request({
    url: '/exam/getExamPlan',
    method: 'post',
    data
  })
}

// 考试报名
function teasRegistration(data) {
  return request({
    url: '/exam/teasRegistration',
    method: 'post',
    data
  })
}

// 考试报名
function getStudentClass() {
  return request({
    url: '/exam/getStudentClass',
    method: 'post'
  })
}

// 查询证书
function certificateQuery(data) {
  return request({
    url: `/exam/certificateQuery?${qs.stringify(data)}`,
    method: 'post'
  })
}

// 证书管理模板下载
function template() {
  return request({
    url: `/importAndExport/certificate/template`,
    method: 'post',
    responseType: 'blob'
  })
}

// paymentInquiry
function paymentInquiry(orderNo) {
  return request({
    url: `/student/paymentInquiry?orderNo=${orderNo}`,
    method: 'post'
  })
}

function editSysOssFile(data) {
  return request({
    url: '/student/editSysOssFile',
    method: 'post',
    data
  })
}
