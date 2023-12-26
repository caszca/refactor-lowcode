<template>
  <div class="page">
    <div v-if="!toRepo">
      <div class="title">班级详情</div>
      <el-divider />
      <div>
        <div class="title_2">班级描述</div>
        <div class="formArea">
          <el-form ref="form" :model="form" label-width="auto" label-suffix=":">
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
              <el-form-item label="班级">
                {{ form.name }}
              </el-form-item>
              <el-form-item label="培训报名时间">
                <span style="white-space: nowrap;">{{ date(form.trainApplyStartDay) }} ~ {{ date(form.trainApplyEndDay) }}</span>
              </el-form-item>
              <el-form-item label="开课时间">
                <span style="white-space: nowrap;">{{ date(form.studyStartDay) }} ~ {{ date(form.studyEndDay) }}</span>
              </el-form-item>
              <el-form-item label="班主任">
                {{ form.teacherName }}
              </el-form-item>
              <el-form-item label="费用">
                {{ form.cost }}元
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="courseList">
          <div v-for="item in form.courseList" :key="item.id">
            <img class="cImg" :src="item.url" />
            <div class="cDescription">
              <div style="font-weight: bold;">{{ item.name }}</div>
              <div>授课教师：{{ item.lecturer }}</div>
              <div>开课时间：{{ date(item.studyStartDay) }} - {{ date(item.studyEndDay) }}</div>
              <div>视频时长：{{ item.schedule }}小时</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnGroup">
        <el-button size="mini" @click="$emit('to-main', '', true)">返回</el-button>
        <el-button v-if="!form.flag && !isTeacher" size="mini" type="primary" @click="chooseResourse">报名</el-button>
      </div>
    </div>
    <div v-if="toRepo">
      <div class="title">培训报名信息填写</div>
      <el-form ref="form" :model="registerInfo" :rules="rules" label-width="auto" label-suffix=":">
        <div class="regForm" style="">
          <el-form-item prop="studentName" label="姓名">
            <el-input v-model="registerInfo.studentName" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="专业职称">
            <el-input v-model="registerInfo.professionalRank" placeholder="请输入专业职称" />
          </el-form-item>
          <el-form-item prop="sex" label="性别">
            <el-select v-model="registerInfo.sex" placeholder="请选择性别">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-input v-model="registerInfo.politic" placeholder="请输入政治面貌" />
            <!-- <el-select v-model="registerInfo.politic" placeholder="请选择政治面貌">
              <el-option v-for="item in dyOptions" :key="item.id + 'zzmm'" :label="item.name" :value="item.name" />
            </el-select> -->
          </el-form-item>
          <el-form-item label="国籍">
            <el-input v-model="registerInfo.nationality" placeholder="请输入国籍" />
          </el-form-item>
          <el-form-item prop="homeAddress" label="居住地址">
            <el-input v-model="registerInfo.homeAddress" placeholder="请输入居住地址" />
          </el-form-item>
          <el-form-item label="民族">
            <el-input v-model="registerInfo.nationId" placeholder="请输入民族" />
          </el-form-item>
          <el-form-item prop="idTypeId" label="证件类型">
            <el-select v-model="registerInfo.idTypeId" placeholder="请选择证件类型">
              <el-option label="中国居民身份证" value="1" />
              <el-option label="外国人永久居留身份证" value="2" />
              <el-option label="港澳台居民居住证" value="3" />
              <el-option label="港澳台居民来往内地通行证" value="4" />
              <el-option label="台湾居民来往大陆通行证" value="5" />
              <el-option label="护照" value="6" />
            </el-select>
          </el-form-item>
          <el-form-item label="出生地">
            <el-input v-model="registerInfo.birthPlace" placeholder="请输入出生地" />
          </el-form-item>
          <el-form-item prop="idCard" label="证件号码">
            <el-input v-model="registerInfo.idCard" placeholder="请输入证件号码" />
          </el-form-item>
          <el-form-item prop="birthday" label="出生日期">
            <el-date-picker v-model="registerInfo.birthday" type="date" placeholder="请选择出生日期" />
          </el-form-item>
          <el-form-item prop="postCode" label="邮政编码">
            <el-input v-model="registerInfo.postCode" placeholder="请输入邮政编码" />
          </el-form-item>
          <el-form-item prop="email" label="电子邮箱">
            <el-input v-model="registerInfo.email" placeholder="请输入电子邮箱" />
          </el-form-item>
          <el-form-item prop="workInfo" label="工作单位及职务">
            <el-input v-model="registerInfo.workInfo" placeholder="请输入工作单位及职务" />
          </el-form-item>
          <el-form-item prop="phone" label="手机电话">
            <el-input v-model="registerInfo.phone" placeholder="请输入手机电话" />
          </el-form-item>
          <el-form-item prop="wxNumber" label="微信号">
            <el-input v-model="registerInfo.wxNumber" placeholder="请输入微信号" />
          </el-form-item>
          <el-form-item prop="major" label="专业">
            <el-input v-model="registerInfo.major" placeholder="请输入专业" />
          </el-form-item>
          <el-form-item prop="educationLevel" label="最高学历">
            <el-input v-model="registerInfo.educationLevel" placeholder="请输入最高学历" />
          </el-form-item>
          <el-form-item prop="graduateSchool" label="毕业院校">
            <el-input v-model="registerInfo.graduateSchool" placeholder="请输入毕业院校" />
          </el-form-item>
          <el-form-item prop="graduateTime" label="毕业时间">
            <el-date-picker v-model="registerInfo.graduateTime" type="month" placeholder="请选择毕业时间" />
          </el-form-item>
          <el-form-item label="上传附件">
            <el-upload class="upload-demo" action :http-request="()=>{}" :on-change="handleChange" accept=".pdf,image/jpg,image/jpeg,image/png" :before-remove="beforeRemove" :on-remove="removeFile" multiple :file-list="fileList">
              <div style="width: 100%; display: flex; justify-content: flex-end;">
                <el-button size="small" type="primary">点击上传</el-button>
              </div>
              <div slot="tip" class="el-upload__tip">请上传身份证正反面,支持pdf、jpg文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item prop="imgUrl" label="证件照" class="is-required">
            <el-upload class="avatar-uploader" action :http-request="() => {}" :show-file-list="false" :on-change="onChange" :before-upload="beforeUpload2">
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
              <div slot="tip" class="el-upload__tip">只能上传jpg文件，一寸蓝底无冠，且不超过500kb,仅限一张</div>
            </el-upload>
          </el-form-item>
        </div>
      </el-form>
      <div class="btnGroup">
        <el-button size="mini" @click="$emit('to-main', '', true)">取消</el-button>
        <el-button size="mini" type="primary" @click="resetForm">重置</el-button>
        <el-button :loading="confirm_loading" size="mini" type="primary" @click="submit">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import otherAPI from '@/api/other'
import fileAPI from '@/api/file'
import customAPI from '@/api/customizeSearch'
import listAPI from '@/api/list'
import moment from 'moment'

export default {
  props: {
    data: { type: Object, default: () => {} }
  },
  data() {
    return {
      form: {},
      isTeacher: false,
      toRepo: false,
      dyOptions: [{ id: 2, name: '中共党员' }, { id: 3, name: '民革党员' }, { id: 4, name: '民盟盟员' }, { id: 5, name: '民建会员' }, { id: 6, name: '民进会员' }, { id: 7, name: '农工党党员' }, { id: 8, name: '致公党党员' }, { id: 9, name: '九三学社社员' }, { id: 10, name: '台盟盟员' }, { id: 11, name: '无党派人士' }, { id: 1, name: '群众' }],
      registerInfo: {},
      fileList: [],
      addFileList: [],
      deleteFileList: [],
      imgUrl: '',
      img: '',
      confirm_loading: false,
      rules: {
        studentName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        homeAddress: [{ required: true, message: '请输入居住地址', trigger: 'blur' }],
        idTypeId: [{ required: true, message: '请选择证件类型', trigger: 'blur' }],
        idCard: [{ required: true, message: '请输入证件号码', trigger: 'blur' }],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
        // postCode: [{ required: true, message: '请输入邮政编码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入电子邮箱', trigger: 'blur' }],
        workInfo: [{ required: true, message: '请输入工作单位及职务', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机电话', trigger: 'blur' }],
        educationLevel: [{ required: true, message: '请输入最高学历', trigger: 'blur' }],
        graduateSchool: [{ required: true, message: '请输入毕业院校', trigger: 'blur' }],
        wxNumber: [{ required: true, message: '请输入微信号', trigger: 'blur' }],
        major: [{ required: true, message: '请输入专业', trigger: 'blur' }],
        graduateTime: [{ required: true, message: '请输入毕业时间', trigger: 'blur' }]
      }
    }
  },
  created() {
    const roles = this.$store.getters.roles
    if (roles.includes(3)) {
      this.isTeacher = false
    } else {
      this.isTeacher = true
    }
    this.form = this._.cloneDeep(this.data)
  },
  methods: {
    date(val) {
      return val ? moment(val).format('YYYY-MM-DD') : '--'
    },
    handleChange(file, fileList) {
      this.addFileList.push(file.raw)
      this.fileList = fileList
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    removeFile(file, fileList) {
      if (file.id) {
        this.deleteFileList.push(file.id)
      }
    },
    onChange(file, fileList) {
      this.img = file
      this.imgUrl = URL.createObjectURL(file.raw)
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或 JPEG 或 PNG 格式!')
      }
      return isJPG
    },
    beforeUpload2(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或 JPEG 或 PNG 格式!')
      }
      return isJPG
    },
    async chooseResourse() {
      this.$confirm(`是否确定报名${this.form.name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.toRepo = !this.toRepo
      })
    },
    resetForm() {
      this.registerInfo = {}
    },
    async submit() {
      this.confirm_loading = true
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          if (this.imgUrl) {
            try {
              const resp = await listAPI.editOneNode('StudentSignTaskInfo', { ...this.registerInfo, classId: this.data.id, studentId: this.$store.getters.userInfo.id })
              try {
                if (this.imgUrl && this.img) {
                  await fileAPI.upload({
                    file: [this.img.raw],
                    relationId: resp.data.id,
                    type: 7
                  })
                }
                try {
                  if (this.addFileList.length > 0) {
                    const node = {
                      relationId: resp.data.id,
                      type: 6,
                      file: this.addFileList
                    }
                    await fileAPI.upload(node)
                  }
                  if (this.deleteFileList.length > 0) {
                    await fileAPI.deleteFile(this.deleteFileList)
                  }
                  try {
                    await customAPI.createStudentTrainApply(resp.data.id)
                    this.$message.success('创建培训报名信息成功！')
                    this.$emit('to-main')
                  } catch (error) {
                    this.$message.error('创建培训报名信息失败')
                  }
                } catch (error) {
                  this.$message.error('附件上传失败，上传已终止')
                }
              } catch (error) {
                this.$message.error('证件照上传失败，上传已终止')
              }
            } catch (error) {
              this.$message.error('编辑信息保存错误')
            }
          } else {
            this.$message.error('证件照未上传')
          }
          this.confirm_loading = false
        } else {
          this.confirm_loading = false
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    font-size: 18px;
    font-weight: 1000;
  }
  .title_2{
    margin-left: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 17px;
  }
  .formArea{
    margin-left: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
  .btnGroup{
    display: flex;
    justify-content: right;
    margin-right: 20px;
  }
  .courseList{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    margin: 0 80px 20px;
  }
  .cImg{
    width: 270px;
    height: 160px;
  }
  .cDescription{
    width: 270px;
    border: 1px solid #efefef;
    border-top: none;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    row-gap: 5px;
    padding: 10px 20px;
  }
  .regForm{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    padding: 20px 60px 0;
    column-gap: 20px;
  }
  /deep/ .avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 140px;
    display: block;
  }
}
</style>
