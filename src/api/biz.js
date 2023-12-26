import request from '@/utils/request'

export default {
  upload2,
  getSomeRecords2

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

// 采集字段配置任务列表
function getSomeRecords2({ keyWords, pageInfo, treeInfo, searchKey, sort, reg, andor }) {
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
