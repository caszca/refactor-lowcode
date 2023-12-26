import SparkMD5 from 'spark-md5'
const DEFAULT_SIZE = 30 * 1024 * 1024
const md5 = (file, chunkSize = DEFAULT_SIZE) => {
  return new Promise((resolve, reject) => {
    const blobSlice =
            File.prototype.slice ||
            File.prototype.mozSlice ||
            File.prototype.webkitSlice
    const chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0
    const spark = new SparkMD5.ArrayBuffer() // 追加数组缓冲区。
    const fileReader = new FileReader() // 读取文件
    fileReader.onload = function(e) {
      spark.append(e.target.result)
      currentChunk++
      if (currentChunk < chunks) {
        loadNext()
      } else {
        const md5 = spark.end() // 完成md5的计算，返回十六进制结果。
        resolve(md5)
      }
    }
    fileReader.onerror = function(e) {
      reject(e)
    }

    function loadNext() {
      const start = currentChunk * chunkSize
      let end = start + chunkSize;
      (end > file.size) && (end = file.size)
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }
    loadNext()
  })
}

export default md5
