<template>
  <div>
    <el-form ref="mainForm" :model="form" :rules="formRule" label-position="right" label-width="120px" class="personal-form" label-suffix=":">
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="单位部门" prop="departmentId">
        <el-cascader
          v-model="form.departmentId"
          :props="{value: 'id', label: 'name', checkStrictly: true}"
          :options="departmentList"
          clearable
          filterable
          @change="handleChangeSchool" />
      </el-form-item>
      <el-form-item label="手机号">
        <span>
          <span>{{ form.phone || '--' }}</span>
          <svg-icon icon-class="axt-edit" title="编辑" @click="editPhone" />
        </span>
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
import treeAPI from '@/api/tree'
import DlgChangePhone from '@/views/dialogs/DlgChangePhone'
import listApi from '@/api/list'
export default {
  name: 'Personal',
  components: { DlgChangePhone },
  data() {
    return {
      idCardList: [],
      departmentList: [],
      editable: false,
      userId: this.$store.getters.userInfo.id,
      form: JSON.parse(JSON.stringify(this.$store.getters.userInfo)),
      formRule: {
        account: [{ required: true, trigger: 'blur', message: '请输入登录账号' }],
        name: [{ required: true, trigger: 'blur', message: '请输入用户姓名' }],
        departmentId: [{ required: true, trigger: 'change', message: '请选择所在学校信息' }],
        majorInfo: [{ required: true, trigger: 'change', message: '请选择专业' }]
      },
      loading: false

    }
  },
  computed: {
    searchKey() {
      return { parentId: this.form.schoolId, theLevel: 3 }
    }
  },
  created() {
    if (this.form.department) {
      this.$set(this.form, 'department', this.form.department.split(',').map(Number))
    }
    this.getSchool()
    this.getParentNode(this.form.departmentId)
  },
  methods: {
    handleChangeSpeciality(val) {
      // console.log(val)
    },
    handleChangeSchool(val) {
      console.log(val)
    },
    async getParentNode(val) {
      if (val) {
        const res = await treeAPI.getAllParentIndex('SysOrganizationInfo', val)
        if (res.data.length > 0) {
          this.$set(this.form, 'departmentId', res.data.map(item => item.id).reverse())
        }
      }
    },
    async getSchool() {
      const res = await treeAPI.getAllNodes({
        keyWords: 'SysOrganizationInfo'
      })
      this.departmentList = this._.cloneDeep(res.data[0].children)
    },
    async getIdTypeInfo() {
      const res = await listApi.getSomeRecords({ keyWords: 'IdTypeInfo' })
      this.idCardList = res.data.content
    },
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
            this.$set(this.form, 'departmentId', this.form.departmentId[this.form.departmentId.length - 1])
            const obj = JSON.parse(JSON.stringify(this.form))
            await UserAPI.editUserInfo(this.userId, obj)
            this.$store.dispatch('user/updateUserInfo', obj)
            this.$message.success('保存成功！')
            this.loading = false
            this.$router.go(-1)
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
  width: 30%;
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
  padding-bottom: 50px;
}
</style>
