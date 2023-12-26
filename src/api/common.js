import request from '@/utils/request'

export default {
  upload,
  deleteFile,
  uploadMany,
  downloadFile,
  templateFile,
  templateIndustry,
  templateBaseUser
}

// minio文件上传-上传到public
// type: 文件上传的类型 比如，1表示头像。relationId 关联表id,如果type=1 则relationId则表示userId
/**
 * minio文件上传-上传到public
 * @param file
 * @param relationId
 * @param type
 */
function upload(params) {
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

// 上传多个文件到minio
function uploadMany(params) {
  const formData = new FormData()
  Object.keys(params).forEach(key => {
    if (typeof (params[key]) === 'object') {
      Object.keys(params[key]).forEach(keys => {
        formData.append('files', params[key][keys])
      })
    } else {
      formData.append(key, params[key])
    }
  })
  return request({
    url: `/common/minio/uploadMany`,
    method: 'post',
    data: formData
  })
}

// 上传新头像并删除上个头像
function deleteFile(fileIds) {
  return request.delete(`/common/minio/deleteFile?ossFileIds=${fileIds}`)
}

// minio文件流下载minio-ykt
function downloadFile(id) {
  return request({
    url: '/common/minio/downloadFile',
    method: 'post',
    data: { id: id },
    responseType: 'blob'
  })
  // return request.get(`/common/minio/downloadFile?ossFileId=${id}`, { responseType: 'blob' })
}

// 面向专业模板下载
function templateFile() {
  return request({
    url: `/importAndExport/speciality/template`,
    method: 'post',
    responseType: 'blob'
  })
}

// 面向专业模板下载
function templateIndustry() {
  return request({
    url: `/importAndExport/industry/template`,
    method: 'post',
    responseType: 'blob'
  })
}

// 用户模板下载
function templateBaseUser() {
  return request({
    url: `/importAndExport/user/template`,
    method: 'post',
    responseType: 'blob'
  })
}
