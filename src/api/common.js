import request from '@/utils/request'

export default {
  upload,
  deleteFile,
  uploadMany,
  downloadFile,
  templateFile
}

// oss文件上传-上传到public
// type: 文件上传的类型 比如，1表示头像。relationId 关联表id,如果type=1 则relationId则表示userId
/**
 * oss文件上传-上传到public
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

// 上传多个文件到oss
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
    url: `/common/oss/uploadMany`,
    method: 'post',
    data: formData
  })
}

// 上传新头像并删除上个头像
function deleteFile(fileIds) {
  return request.delete(`/common/minio/deleteFile?ossFileIds=${fileIds}`)
}

// oss文件流下载oss-ykt
function downloadFile(id) {
  return request.get(`/common/minio/downloadFile?ossFileId=${id}`, { responseType: 'blob' })
}

// 工作人员模板下载
function templateFile() {
  return request({
    url: `/worker/template`,
    method: 'post',
    responseType: 'blob'
  })
}
