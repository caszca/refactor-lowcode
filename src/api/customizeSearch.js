import request from '@/utils/request'
import qs from 'qs'

export default {
  checkDetails,
  addOrEdit,
  handle,
  submit,
  batchImport,
  retrieve,
  template,
  retrieveList,
  schoolAdd,
  studentPortrait,
  studentAdd,
  studentEdit,
  studentRetrieveList,
  retrieveByCollegeManage,
  retrieveByInstructor,
  retrieveClasses,
  saveSomeRecords,
  getSomeRecords2,
  retrieveTeachers,
  configuration,
  leaderBatchImport,
  leaderTemplate,
  saveOneRecord,
  classStatus
}
// 工作人员查看详情
function classStatus(query) {
  return request({
    url: `class-leader/classStatus`,
    // url: `class-leader/classStatus?${qs.stringify(data)}`,
    method: 'post',
    params: query,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}
// 工作人员查看详情
function checkDetails(userId) {
  return request.get(`/worker/CheckDetails?userId=${userId}`)
}
// 工作人员添加或编辑
function addOrEdit(userVO) {
  return request({
    url: `/worker/addOrEdit`,
    method: 'post',
    data: userVO
  })
}
// 工作人员申请处理
function handle(editStatus, recordId) {
  return request({
    url: `/worker/application/handle`,
    method: 'post',
    params: {
      editStatus: editStatus,
      recordId: recordId
    }
  })
}
// 工作人员提交申请
function submit(userVO) {
  return request({
    url: `/worker/applications/submit`,
    method: 'post',
    data: userVO
  })
}
// 工作人员批量导入
function batchImport(file) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: `/worker/batchImport`,
    method: 'post',
    data: formData
  })
}
// 带班配置批量导入
function leaderBatchImport(file) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: `/class-leader/batchConfiguration`,
    method: 'post',
    data: formData
  })
}
// 工作人员列表查询
function retrieve({ pageNum, pageSize, roleId, searchKey }) {
  // return request({
  //   url: `/worker/retrieve`,
  //   method: 'get',
  //   data: { pageNum, pageSize, roleId, searchKey, sortName, sortOrder }
  // })
  return request.get(`/worker/retrieve?searchKey=${searchKey}&roleId=${roleId}&pageNum=${pageNum}&pageSize=${pageSize}`)
}
// 工作人员模板下载
function template() {
  return request({
    url: `/worker/template`,
    method: 'post',
    responseType: 'blob'
  })
}
// 带班配置模板下载
function leaderTemplate() {
  return request({
    url: `/class-leader/template`,
    method: 'post',
    responseType: 'blob'
  })
}
// 带班配置列表查询
function retrieveList({ pageNum, pageSize, collegeId, gradeId, searchKey }) {
  return request.get(`/class-leader/retrieveList?searchKey=${searchKey}&collegeId=${collegeId}&gradeId=${gradeId}&pageNum=${pageNum}&pageSize=${pageSize}`)
}

// 带班配置老师列表查询
function retrieveTeachers({ searchKey, type }) {
  return request({
    url: `/class-leader/retrieveTeachers?searchKey=${searchKey}&type=${type}`,
    method: 'post'
  })
}

// 带班配置老师
function configuration({ classId, coordinatorId, instructorId }) {
  return request({
    url: `/class-leader/configuration?classId=${classId}&coordinatorId=${coordinatorId}&instructorId=${instructorId}`,
    method: 'post'
  })
}

// 学籍新增 /school-role
function schoolAdd({ backTime, quitTime, rollReason, rollType, studentUserId }) {
  return request({
    url: `/school-roll/add`,
    method: 'post',
    params: { backTime, quitTime, rollReason, rollType, studentUserId }
  })
}

// 学生画像
function studentPortrait({ studentUserId }) {
  return request.get(`/school-roll/studentPortrait?studentUserId=${studentUserId}&web=true`)
}

// 重点学生添加 /emphasis-student
function studentAdd(emphasisStudentVO) {
  return request({
    url: `/emphasis-student/add`,
    method: 'post',
    data: emphasisStudentVO
  })
}

// 重点学生编辑
function studentEdit(emphasisStudentVO) {
  return request({
    url: `/emphasis-student/edit`,
    method: 'post',
    data: emphasisStudentVO
  })
}

// 学生列表查询
function studentRetrieveList({ pageNum, pageSize, classId, collegeId, majorId, type, searchKey }) {
  return request.get(`/emphasis-student/retrieveList?searchKey=${searchKey}&classId=${classId}&collegeId=${collegeId}&majorId=${majorId}&type=${type}&pageNum=${pageNum}&pageSize=${pageSize}`)
}

function retrieveByCollegeManage({ pageNum, pageSize, collegeId, searchKey }) {
  return request.get(`/role/retrieveByCollegeManage?searchKey=${searchKey}&collegeId=${collegeId}&pageNum=${pageNum}&pageSize=${pageSize}`)
}

function retrieveByInstructor({ pageNum, pageSize, classId, searchKey }) {
  return request.get(`/role/retrieveByInstructor?searchKey=${searchKey}&classId=${classId}&pageNum=${pageNum}&pageSize=${pageSize}`)
}

function retrieveClasses({ baseUserId }) {
  return request.get(`/role/retrieve?baseUserId=${baseUserId}`)
}

function saveSomeRecords(tblName, array) {
  return request({
    url: `/common/saveSomeRecords`,
    method: 'post',
    data: { tblName, array }
  })
}

// 采集字段配置任务列表
async function getSomeRecords2({ keyWords, pageInfo, treeInfo, searchKey, sort, reg, andor }) {
  // console.log(searchKey)
  // keyWords = await getEncryptKeyWord(keyWords)
  return request({
    url: '/dataList/getSomeRecords2',
    method: 'post',
    data: {
      keyWords,
      pageInfo,
      treeInfo,
      // searchKey: await getEncryptKeyWord(JSON.stringify(searchKey)),
      searchKey: searchKey,
      sort,
      // reg: await getEncryptKeyWord(JSON.stringify(reg)),
      reg: reg,
      andor
    }
  })
}

function saveOneRecord(tblName, data) {
  return request({
    url: `/common/saveOneRecord?tblName=${tblName}`,
    method: 'put',
    data
  })
}
