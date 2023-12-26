<template>
  <div class="BigFileUpload">
    <el-upload ref="upload" class="upload-demo" action="#" :auto-upload="false" :on-remove="handleRemove" :before-remove="beforeRemove" :http-request="handleHttpRequest" :accept="accept.join(',')" :on-change="handleChange" :before-upload="beforeUpload" :file-list="fileList">
      <el-button size="small" type="primary">上传</el-button>
      <div slot="tip" class="el-upload__tip">{{ tip }}</div>
    </el-upload>
  </div>
</template>
<script>
import md5 from '@/utils/md5'
import Queue from 'promise-queue-plus'
import fileApi from '@/api/file'
import oss from '@/utils/oss'
import dayjs from 'dayjs'
export default {
  components: {},
  props: {
    accept: { type: Array, default: () => ([]) },
    value: { type: Array, default: () => ([]) },
    tip: { type: String, default: '' }
  },
  data() {
    return {
      fileUploadChunkQueue: {},
      fileList: [],
      fileUploadPart: [],
      node: {}
    }
  },
  watch: {
    value: {
      handler(val) {
        this.fileList = val
      },
      deep: true
    }
  },
  created() {
    // 初始化oss对象
    oss.init()
    this.fileList = this.value.map(e => {
      return { ...e, name: e.fileName }
    })
  },
  methods: {
    async getTaskInfo(file) {
      let task
      const identifier = await md5(file)
      try {
        // 根据文件的md5获取未上传完的任务
        const { data } = await fileApi.taskInfo(identifier)
        task = data
        if (!task) {
          // 创建上传任务
          var key = dayjs().format('YYYY/MM-DD/HH') + '/' + file.name
          const params = {
            Bucket: 'association',
            Key: key
          }
          const { UploadId } = await oss.createMultipartUpload(params)
          const initTaskData = {
            identifier,
            fileName: file.name,
            totalSize: file.size,
            chunkSize: 20 * 1024 * 1024,
            uploadId: UploadId,
            ossPath: key
          }
          const { data } = await fileApi.initTask(initTaskData, { ...this.node, duration: file.duration })
          task = data
          task.taskRecord.ossPath = key
        }
      } catch (error) {
        console.log(error)
        this.$message.error('文件上传错误')
      }
      return task
    },
    async handleHttpRequest(options) {
      const file = options.file
      const task = await this.getTaskInfo(file)
      if (task) {
        const { finished, path, taskRecord } = task
        const { fileIdentifier: identifier } = taskRecord
        if (finished) {
          await fileApi.bindFile(identifier, { ...this.node, name: file.name })
          this.$parent.getList()
          return path
        } else {
          const uploadData = await this.handleUpload(file, taskRecord, options)
          if (uploadData.failArr.length > 0) {
            this.$message.error('部分分片上传失败，请尝试重新上传文件')
            this.$emit('finish')
            return
          }
          try {
            // 合并文件
            const MultipartUpload = {
              Parts: uploadData.successArr
            }
            var merageParams = {
              Bucket: this.taskRecord.bucketName,
              Key: uploadData.ossPath,
              UploadId: uploadData.uploadId,
              MultipartUpload: MultipartUpload
            }
            await oss.completeMultipartUpload(merageParams)
            await fileApi.merge(identifier, this.node.relationId, this.node.type)
            this.$emit('finish')
            return path
          } catch (error) {
            console.log(error)
            this.$message.error('文件上传错误')
          }
        }
      } else {
        this.$message.error('获取上传任务失败')
      }
    },
    async handleUpload(file, taskRecord, options) {
      let lastUploadedSize = 0 // 上次断点续传时上传的总大小
      let uploadedSize = 0 // 已上传的大小
      // const uploadedSize = 0 // 已上传的大小
      const totalSize = file.size || 0 // 文件总大小
      const startMs = new Date().getTime() // 开始上传的时间
      const { exitPartList, chunkSize, chunkNum, fileIdentifier, fileName, uploadId, bucketName, ossPath } = taskRecord
      this.taskRecord = taskRecord
      // const { exitPartList, chunkSize, chunkNum, fileIdentifier } = taskRecord
      // 获取从开始上传到现在的平均速度（byte/s）
      const getSpeed = () => {
        // 已上传的总大小 - 上次上传的总大小（断点续传）= 本次上传的总大小（byte）
        const intervalSize = uploadedSize - lastUploadedSize
        const nowMs = new Date().getTime()
        // 时间间隔（s）
        const intervalTime = (nowMs - startMs) / 1000
        return intervalSize / intervalTime
      }

      const uploadNext = async(partNumber) => {
        const start = Number(chunkSize) * (partNumber - 1)
        const end = start + Number(chunkSize)
        const blob = file.slice(start, end)
        const partParams = {
          Body: blob,
          Bucket: bucketName,
          Key: ossPath,
          PartNumber: partNumber,
          UploadId: uploadId
        }
        const partdata = await oss.uploadPart(partParams)
        return Promise.resolve({ uploadId, ossPath, partdata, partNumber: partNumber, uploadedSize: blob.size })
        // const { data } = await fileApi.uploadPart({ identifier: fileIdentifier, partNumber: partNumber }, blob)
        // if (data) {
        //   // await fileApi.uploadChunk(data, blob)
        //   return Promise.resolve({ partNumber: partNumber, uploadedSize: blob.size })
        // }
        // return Promise.reject(`分片${partNumber}， 获取上传地址失败`)
      }

      /**
     * 更新上传进度
     * @param increment 为已上传的进度增加的字节量
     */
      const updateProcess = (increment) => {
        increment = Number(increment)
        // const { onProgress } = options
        const factor = 1000 // 每次增加1000 byte
        let from = 0
        // 通过循环一点一点的增加进度
        while (from <= increment) {
          from += factor
          uploadedSize += factor
          // const percent = Math.round(uploadedSize / totalSize * 100).toFixed(2)
          // console.log(percent)
        }

        const speed = getSpeed()
        const remainingTime = speed !== 0 ? Math.ceil((totalSize - uploadedSize) / speed) + 's' : '未知'
        this.$store.commit('bigFileLists/updateProgress', { percent: parseInt(uploadedSize / totalSize * 100), hash: fileIdentifier, fileName, remainingTime })
        // console.log('剩余大小：', (totalSize - uploadedSize) / 1024 / 1024, 'mb')
        // console.log('当前速度：', (speed / 1024 / 1024).toFixed(2), 'mbps')
        // console.log('预计完成：', remainingTime)
        // console.log((uploadedSize / totalSize * 100).toFixed(2))
      }

      return new Promise(resolve => {
        const failArr = []
        const successArr = []
        let ossPath = ''
        let uploadId = ''
        const queue = Queue(1, {
          'retry': 3,
          'retryIsJump': false,
          'workReject': function(reason, queue) {
            failArr.push(reason)
          },
          'queueEnd': function(queue) {
            resolve({ failArr, successArr, ossPath, uploadId })
          }
        })
        this.fileUploadChunkQueue[file.uid] = queue
        for (let partNumber = 1; partNumber <= chunkNum; partNumber++) {
          const exitPart = (exitPartList || []).find(exitPart => exitPart.partNumber === partNumber)
          if (exitPart) {
            // 分片已上传完成，累计到上传完成的总额中,同时记录一下上次断点上传的大小，用于计算上传速度
            lastUploadedSize += Number(exitPart.size)
            updateProcess(exitPart.size)
          } else {
            queue.push(() => uploadNext(partNumber).then(res => {
              // 单片文件上传完成再更新上传进度
              updateProcess(res.uploadedSize)
              ossPath = res.ossPath
              uploadId = res.uploadId
              successArr.push(res.partdata)
            }))
          }
        }
        if (queue.getLength() === 0) {
          // 所有分片都上传完，但未合并，直接return出去，进行合并操作
          resolve({ failArr, successArr })
          return
        }
        queue.start()
      })
    },
    beforeUpload(file) {
      const splitArr = file.name.split('.')
      const fileType = `.${splitArr[splitArr.length - 1]}`
      if (!this.accept.includes(fileType)) {
        this.$message.error('不支持该格式文件')
        return false
      }
      // 获取视频时长
      const url = URL.createObjectURL(file)
      const audioElement = new Audio(url)
      let duration = ''
      audioElement.addEventListener('loadedmetadata',
        function() {
          duration = parseInt(audioElement.duration) // 时长为秒
          file.duration = duration
        })
      const isLtSize = file.size / 1024 / 1024 < 800
      if (!isLtSize) {
        this.$message.warning(`上传文件大小不能超过800MB!`)
        return false
      }
    },
    submit(node) {
      this.node = node
      this.$refs.upload.submit()
    },
    async handleChange(file, fileList) {
      this.fileList = fileList
      this.$emit('input', fileList)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`视频删除后不可取消，确认删除 ${file.name}？`)
    },
    // 删除文件触发事件
    async handleRemove(file, fileList) {
      if (file.fileIdentifier) {
        const node = {
          relationId: file.relationId,
          type: file.type,
          id: file.id
        }
        await fileApi.deleteBig(file.fileIdentifier, node)
      }
    }
  }
}
</script>
