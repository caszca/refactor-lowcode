import request from '@/utils/request'
import qs from 'qs'

export default {
  upload2,
  upload,
  deleteFile,
  uploadMany,
  downloadFile,
  getProgressPercent,
  merge,
  preSignUrl,
  uploadChunk,
  taskInfo,
  initTask,
  bindFile,
  deleteBig,
  uploadPart
}

var nowProgressPercent = 0
/*
 * oss文件上传-上传到public
 * @param file
 * @param tabName
 * @param relIds
 */
function upload(params, fileTypes = ['文档', '图片', '视频']) {
  const formData = new FormData()
  Object.keys(params).forEach(key => {
    if (typeof (params[key]) === 'object') {
      Object.keys(params[key]).forEach(keys => {
        formData.append('file', params[key][keys])
      })
    } else {
      formData.append(key, params[key])
    }
  })
  formData.append('fileTypes', fileTypes)
  return request({
    url: '/common/minio/upload',
    method: 'post',
    data: formData,
    onUploadProgress: progressEvent => {
      nowProgressPercent = (progressEvent.loaded / progressEvent.total * 99 | 0)
    }
  })
}

function getProgressPercent() {
  return nowProgressPercent
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
    url: `/common/minio/uploadMany`,
    method: 'post',
    data: formData
  })
}

function deleteFile(fileIds) {
  return request.delete(`/common/minio/deleteFile?ossFileIds=${fileIds}`)
}

// oss文件流下载oss-ykt
export function downloadFile(id) {
  return request({
    url: '/common/oss/downloadFile',
    method: 'post',
    data: { id: id },
    responseType: 'blob'
  })
  // return request.get(`/common/oss/downloadFile?ossFileId=${id}`, { responseType: 'blob' })
}

export function upload2(params) {
  const form = new FormData()

  form.append('file', params.file)
  form.append('type', params.type)
  form.append('fileTypes', ['文档', '图片', '视频'])

  return request.post(
    '/common/minio/upload',
    form,
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

/**
 * 根据文件的md5获取未上传完的任务
 * @param identifier 文件md5
 * @returns {Promise<AxiosResponse<any>>}
 */
export function taskInfo(identifier) {
  return request.get(`/minio/tasks/${identifier}`)
}

/**
 * 合并分片
 * @param identifier
 * @returns {Promise<AxiosResponse<any>>}
 */
export function merge(identifier, relationId, type) {
  return request.post(`/minio/tasks/merge/${identifier}?${qs.stringify({ relationId, type })}`)
}

/**
 * 获取预签名分片上传地址
 * @param identifier 文件md5
 * @param partNumber 分片编号
 * @returns {Promise<AxiosResponse<any>>}
 */
export function preSignUrl({ identifier, partNumber }) {
  return request.get(`/minio/tasks/${identifier}/${partNumber}`)
}

export function uploadChunk(url, blob) {
  return request.put(
    url,
    blob,
    {
      headers: { 'Content-Type': 'application/octet-stream' }
    }
  )
}
/**
 * 上传分片任务
 * @param {*} param0
 * @returns
 */
export function uploadPart({ identifier, partNumber }, blob) {
  const formData = new FormData()
  formData.append('file', blob)
  return request.post(`/minio/tasks/uploadPart/${identifier}/${partNumber}`, formData)
}

/**
 * 初始化一个分片上传任务
 * @param identifier 文件md5
 * @param fileName 文件名称
 * @param totalSize 文件大小
 * @param chunkSize 分块大小
 * @param customNode 自定义参数
 * @returns {Promise<AxiosResponse<any>>}
 */
export function initTask({ identifier, fileName, totalSize, chunkSize, uploadId, ossPath }, customNode) {
  return request.post('/minio/tasks', { identifier, fileName, totalSize, chunkSize, uploadId, ossPath, ...customNode })
}

export function bindFile(identifier, data) {
  return request.post(`/minio/tasks/bind/${identifier}?${qs.stringify(data)}`)
}

/**
 * 删除上传大文件
 * @param identifier 文件md5
 * @param relationId 文件绑定id
 * @param type 文件类型
 */

export function deleteBig(identifier, data) {
  // return request.get(`/minio/tasks/delete/${identifier}`)
  return request.delete(`/minio/tasks/delete/${identifier}?${qs.stringify(data)}`)
}
