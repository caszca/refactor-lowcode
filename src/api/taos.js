import request from '@/utils/request'
// import { getEncryptKeyWord } from '@/utils/rsaEncrypt'
// import constant from '@/constant'

export default {
  getTaosData
}
// 获得所有树节点
async function getTaosData({}) {
  // keyWords = await getEncryptKeyWord(keyWords)
  return request({
    url: '/taos/getTaosData',
    method: 'post',
    data: {

    }
  })
}
