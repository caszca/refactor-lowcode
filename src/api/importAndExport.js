import request from '@/utils/request'
import qs from 'qs'

// 导入
function importInfo(keyWord, file, searchKey) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: `/importAndExport/importInfo?keyWord=${keyWord}&${qs.stringify(searchKey)}`,
    method: 'post',
    data: formData
  })
}

// 导出
function exportInfo(keyWords, nodes, allTableColumns, searchWords) {
  return request({
    url: `/importAndExport/exportInfo`,
    method: 'post',
    data: {
      keyWords,
      nodes,
      allTableColumns,
      searchWords
    },
    responseType: 'blob'
  })
}

export default {
  importInfo,
  exportInfo
}
