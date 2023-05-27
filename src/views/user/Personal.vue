<!-- <template>
  <div v-loading="pageLoading" class="fix-height">
    <el-form :model="form" label-position="right" label-width="100px" class="personal-form">
      <el-form-item class="headicon">
        <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="()=>{}" :before-upload="beforeAvatarUpload">
          <el-avatar v-if="headImage" :size="100" :src="headImage" />
          <el-avatar v-else :size="100" icon="el-icon-user-solid" />
        </el-upload>
      </el-form-item>
      <el-form-item label="姓名">
        <div>{{ form.name || '--' }}</div>
      </el-form-item>
      <el-form-item v-if="form.isInstructor || form.isTeacher" label="个人校外获奖">
        <div>{{ form.individualExtramuralAward || '--' }}</div>
      </el-form-item>
      <el-form-item v-if="form.isInstructor || form.isTeacher" label="毕业学校">
        <div>{{ form.graduation || '--' }}</div>
      </el-form-item>
      <el-form-item v-if="form.isInstructor || form.isTeacher" label="入党时间">
        <div>{{ time(form.joinPartyTime) || '--' }}</div>
      </el-form-item>
      <el-form-item label="工号">
        <div>{{ form.workId || '--' }}</div>
      </el-form-item>
      <el-form-item label="所属学院">
        <div>{{ form.collegeName || '--' }}</div>
      </el-form-item>
      <el-form-item label="角色">
        <div>{{ form.roleNames || '--' }}</div>
      </el-form-item>
      <el-form-item label="联系方式">
        <div>{{ form.phone || '--' }}</div>
      </el-form-item>
      <el-form-item label="登录密码">
        <span>
          <span>**********</span>
        </span>
      </el-form-item>
      <el-form-item label="所带班级">
        <div>{{ form.classNames || '--' }}</div>
      </el-form-item>
      <el-form-item v-if="form.isInstructor || form.isTeacher" label="考核结果">
        <div><el-button :loading="resultLoading" size="mini" @click="openAssess">查看</el-button></div>
      </el-form-item>
    </el-form>
    <div class="button-group">
      <el-button size="mini" type="primary" round :loading="loading" @click="openDlg">
        信息修改
      </el-button>
      <el-button size="mini" plain round @click="$router.go(-1)">
        返 回
      </el-button>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user'
import listApi from '@/api/list'
import _ from 'lodash'
import moment from 'moment'
import customAPI from '@/api/customizeSearch'

export default {
  name: 'Personal',
  components: { },
  data() {
    return {
      editable: false,
      userId: this.$store.getters.userInfo.id,
      workId: this.$store.getters.userInfo.workId,
      file: {},
      form: {},
      // form: JSON.parse(JSON.stringify(this.$store.getters.userInfo)),
      // form: _.cloneDeep(this.$store.getters.userInfo),
      oldHeadImageId: this.$store.getters.userInfo.ossFileId,
      headImage: this.$store.getters.userInfo.headImage,
      loading: false,
      pageLoading: false,
      editForm: { verCode: '', password: '', confirmPassword: '' },
      editFormRules: {
        // phone: {
        //   required: true, validator: checkPhone, trigger: ['blur', 'change']
        // },
        verCode: { required: true, message: '请输入验证码', trigger: 'blur' },
        password: { required: true, message: '请输入新密码', trigger: 'blur' },
        confirmPassword: { required: true, message: '请再次输入密码', trigger: 'blur' }
      },
      dialog: { title: '修改密码', show: false, option: 'edit', loading: false, continueLoading: false },
      resultLoading: false,
      resultForm: []
    }
  },
  async created() {
    this.pageLoading = true
    try {
      const userClass = await customAPI.retrieve({
        pageNum: 1,
        pageSize: 25,
        roleId: '',
        searchKey: this.workId
      })
      this.$set(this, 'form', userClass.data.content[0])
      userClass.data.content[0].roleIds.forEach(e => {
        if (e === 3) {
          this.$set(this.form, 'isTeacher', true)
          this.$set(this.form, 'teacherClassIds', userClass.data.content[0].teacherClassIds)
        } else if (e === 4) {
          this.$set(this.form, 'isInstructor', true)
          this.$set(this.form, 'instructorClassIds', userClass.data.content[0].instructorClassIds)
        }
      })
    } catch (error) {
      console.log(error)
    }
    this.pageLoading = false
  },
  methods: {
    time(val) {
      return val ? moment(val).format('YYYY年M月') : '--'
    },
    openDlg() {
      this.$refs.EditDlg.dialogVisible = true
    },
    async openAssess() {
      this.resultLoading = true
      try {
        const resp = await listApi.getSomeRecords({
          keyWords: 'ViewTeacherAssessResultInfo',
          searchKey: { userId: this.$store.getters.userInfo.id }
        })
        this.resultForm = _.cloneDeep(resp.data.content)
        if (this.resultForm.length === 0) {
          this.$message.warning('暂无考核信息！')
        } else {
          this.$refs.AssessDlg.dialogVisible = true
        }
      } catch (error) {
        this.$message.warning('暂无考核信息！')
      }
      this.resultLoading = false
    },
    async beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < this.CONSTANT.IMAGE_MAX_SIZE

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error(`上传头像图片大小不能超过 ${this.CONSTANT.IMAGE_MAX_SIZE}MB!`)
        return
      }
      if (isJPG && isLt2M) {
        try {
          const res = await userApi.uploadAvatar(file)
          console.log(res)
          this.$set(this.$store.getters.userInfo, 'headImage', res.data.url)
        } catch (error) {
          this.$message.warning('头像上传失败')
        }
      }
      this.headImage = URL.createObjectURL(file)
      this.file = file
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/element-variables.scss";
.el-form {
  width: fit-content;
  margin-left: 12%;
}
.personal-form {
  &::v-deep .el-form-item__label {
    color: #afb1b5;
  }
  &::v-deep .el-form-item__content {
    margin-left: 150px !important;
  }
}
.avatar-uploader {
  position: relative;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  text-align: center;
  overflow: hidden;
  .el-avatar ::v-deep img {
    width: 100%;
  }
  ::v-deep .el-icon-user-solid {
    font-size: 60px;
    line-height: 100px;
  }
  $height: 26px;
  &::after {
    content: "更换头像";
    width: 100%;
    font-size: 12px;
    height: $height;
    line-height: calc(#{$height} - 3px);
    background-color: rgba(0, 0, 0, 0.5);
    transition: 280ms linear;
    color: #fff;
    position: absolute;
    left: 50%;
    bottom: -$height;
    transform: translateX(-50%);
  }
  &:hover::after {
    bottom: 0;
  }
}
input {
  outline: none;
}
.svg-icon {
  cursor: pointer;
  margin-left: 50px;
  color: #1890ff;
  &:hover {
    color: $--color-primary;
  }
}
.button-group {
  margin-left: 36%;
  padding-bottom: 40px;
}

.headicon {
  margin-left: 0;
}
</style> -->
<template>
  <div>
    <el-form ref="mainForm" :model="form" :rules="formRule" label-position="right" label-width="120px" class="personal-form" label-suffix=":">
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="手机号">
        <span>
          <span>{{ form.phone || '--' }}</span>
          <svg-icon icon-class="axt-edit" title="编辑" @click="editPhone" />
        </span>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所在学校/单位">
        <div>{{ form.schoolName || '--' }}</div>
      </el-form-item>
      <el-form-item label="所在院系/部门" prop="departmentId">
        <!-- @update-value="onSimpleSelectChange" @init-finish="simpleSelectInitFinish" -->
        <SimpleSelect v-model="form.departmentId" key-words="BaseDepartment" :search-key="searchKey" />
      </el-form-item>
      <el-form-item label="身份类型">
        <div>{{ form.jobName || '--' }}</div>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.idCard" />
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="联系地址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="邮政编码">
        <el-input v-model="form.postalCode" />
      </el-form-item>
    </el-form>
    <div class="button-group">
      <el-button size="mini" plain round @click="$router.go(-1)">
        返 回
      </el-button>
      <el-button size="mini" type="primary" round :loading="loading" @click="handleSave()">
        保 存
      </el-button>
    </div>
    <slot name="dlg">
      <DlgChangePhone ref="dlgChangePhone" @update-phone="updatePhone" />
    </slot>
  </div>
</template>

<script>

import UserAPI from '@/api/user'
import DlgChangePhone from '@/views/dialogs/DlgChangePhone'

import SimpleSelect from '@/components/SimpleSelect'

export default {
  name: 'Personal',
  components: { SimpleSelect, DlgChangePhone },
  data() {
    return {
      editable: false,
      userId: this.$store.getters.userInfo.id,
      form: JSON.parse(JSON.stringify(this.$store.getters.userInfo)),
      formRule: {
        account: [{ required: true, trigger: 'blur', message: '请输入登录账号' }],
        name: [{ required: true, trigger: 'blur', message: '请输入用户姓名' }],
        departmentId: [{ required: true, trigger: 'blur', message: '部门不能为空' }]
      },
      loading: false

    }
  },
  computed: {
    searchKey() {
      return { parentId: this.form.schoolId, theLevel: 3 }
    }
  },
  methods: {
    editPhone() {
      this.$refs.dlgChangePhone.showDialog(true)
    },
    updatePhone(phone) {
      this.$set(this.form, 'phone', phone)
    },
    // 保存个人信息
    async handleSave() {
      this.$refs.mainForm.validate(async valid => {
        if (valid) {
          this.loading = true
          // 信息保存
          try {
            const obj = JSON.parse(JSON.stringify(this.form))
            await UserAPI.editUserInfo(this.userId, obj)
            this.$store.dispatch('user/updateUserInfo', obj)
            this.$message.success('保存成功！')
            this.loading = false
          } catch (error) {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/element-variables.scss";
.el-form {
  width: fit-content;
  margin-left: 12%;
}
.personal-form {
  &::v-deep .el-form-item__label {
    color: #afb1b5;
  }
  &::v-deep .el-form-item__content {
    margin-left: 150px !important;
  }
}
input {
  outline: none;
}
.svg-icon {
  cursor: pointer;
  margin-left: 50px;
  color: #1890ff;
  &:hover {
    color: $--color-primary;
  }
}
.button-group {
  margin-left: 36%;
  margin-bottom: 40px;
}
</style>
