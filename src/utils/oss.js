/* eslint-disable no-undef */
export default {
  init,
  getAcl,
  createMultipartUpload,
  uploadPart,
  completeMultipartUpload,
  abortMultipartUpload,
  listParts
}

var client

function init() {
  client = new OOS.S3({
    accessKeyId: '0f2f764def3c738a2130',
    secretAccessKey: 'ee4b16f0ea9ddb1e4c94d446370bfd239dd2d0e3',
    endpoint: 'oos-hbwh.ctyunapi.cn',
    signatureVersion: 'v4',
    apiVersion: '2006-03-01',
    s3ForcePathStyle: true
  })
}

/**
 * 获取 bucket 的 ACL 信息
 * @param {*} params bucketName
 */
function getAcl(params) {
  client.getBucketAcl(params, function(err, data) {
    if (err) console.log(err, err.stack) // an error occurred
    else return data // successful response
  })
}

/**
 * 初始化一个分片上传（Multipart Upload）操作，并返回一个上传 ID
 * @param {*} params
 */
function createMultipartUpload(params) {
  return new Promise((resolve, reject) => {
    client.createMultipartUpload(params, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)// successful response
      }
    })
  })
}

/**
 * 用于实现分片上传操作中片段的上传
 * @param {*} params
 */
function uploadPart(params) {
  return new Promise((resolve, reject) => {
    client.uploadPart(params, function(err, data) {
      if (err) {
        console.log(err, err.stack) // an error occurred
        reject(err)
      } else {
        resolve({ PartNumber: params.PartNumber, ETag: data.ETag })
      }
    })
  })
//   client.uploadPart(params, function(err, data) {
//     if (err) {
//       console.log(err, err.stack) // an error occurred
//     //   reject(err)
//     } else {
//       MultipartUpload.Parts.push({ PartNumber: params.PartNumber, ETag: data.ETag })
//       console.log(data) // successful response
//       //   resolve(data)
//       return data
//     }
//   })
}

/**
 * 通过合并之前的上传片段来完成一次分片上传过程
 * @param {*} params
 */
function completeMultipartUpload(params) {
  return new Promise((resolve, reject) => {
    // params.MultipartUpload = MultipartUpload
    client.completeMultipartUpload(params, function(err, data) {
      if (err) {
        reject(err)
      } else { // successful response
        resolve(data)
      }
    })
  })
}

/**
 * 用于终止一次分片上传操作
 * @param {*} params
 */
function abortMultipartUpload(params) {
  client.abortMultipartUpload(params, function(err, data) {
    if (err) console.log(err, err.stack) // an error occurred
    else console.log(data) // successful response
  })
}

/**
 * 作用于列出一次分片上传过程中已经上传完成的所有片段
 * @param {*} params
 */
function listParts(params) {
  client.listParts(params, function(err, data) {
    if (err) console.log(err, err.stack) // an error occurred
    else console.log(data) // successful response
  })
}
