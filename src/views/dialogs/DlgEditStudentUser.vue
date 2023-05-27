<template>
  <!-- -->
  <SimpleDialog ref="simpleStudentDlg" :default-props.sync="defaultProps" @update-record="initDataList">
    <template slot="bottomItems">
      <el-form-item prop="gradeId" label="年级">
        <el-date-picker
          v-model="gradeId"
          type="year"
          value-format="yyyy"
          placeholder="选择年级" />
      </el-form-item>
      <el-form-item prop="collegeId" label="所属学院">
        <el-select v-model="collegeId" placeholder="请选择" clearable>
          <el-option
            v-for="item in collegeList"
            :key="item.id"
            :label="item.name"
            :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="majorId" label="所属专业">
        <el-select v-model="majorId" placeholder="请选择" clearable>
          <el-option
            v-for="item in majorList"
            :key="item.id"
            :label="item.name"
            :value="item.zyh" />
        </el-select>
      </el-form-item>
      <el-form-item prop="classId" label="所属班级">
        <el-select v-model="classId" v-loading="loading" placeholder="请选择" clearable @change="setClassId()">
          <el-option
            v-for="item in classList"
            :key="item.id"
            :label="item.name"
            :value="item.bh" />
        </el-select>
      </el-form-item>
    </template>
  </SimpleDialog>
</template>

<script>
import SimpleDialog from '@/components/SimpleDialog'
import _ from 'lodash'
import listApi from '@/api/list'
export default {
  name: 'DlgEditStudentUser',
  components: { SimpleDialog },
  props: {
  },
  data() {
    return {
      editForm: {},
      loading: false,
      classId: '',
      classList: [],
      gradeId: '',
      gradeList: [],
      collegeId: '',
      collegeList: [],
      majorId: '',
      majorList: [],
      defaultProps: {
        keyWord: 'StudentUserInfo',
        formItems: [
          { name: '学生姓名', field: 'name', type: 'input' },
          { name: '学号', field: 'xh', type: 'input' },
          { name: '身份证号', field: 'sfzjh', type: 'input' }
        ],
        formRules: {
          name: { required: true, message: '学生姓名不能为空', trigger: 'blur' },
          xh: { required: true, message: '学号不能为空', trigger: 'blur' },
          sfzjh: { required: true, message: '身份证号不能为空', trigger: 'blur' },
          gradeId: { required: true, message: '所属年级不能为空', trigger: 'blur' },
          collegeId: { required: true, message: '所属学院不能为空', trigger: 'blur' },
          majorId: { required: true, message: '所属专业不能为空', trigger: 'blur' },
          classId: { required: true, message: '所属班级不能为空', trigger: 'blur' }
        },
        defaultDBProps: {
          footButtons: { repeatAdd: { show: false }}
        }
      }
    }
  },
  watch: {
    'gradeId': function(newValue, oldValue) {
      this.$set(this.$refs.simpleStudentDlg.form, 'gradeId', newValue)
      this.$set(this.$refs.simpleStudentDlg.form, 'classId', '')
      this.classId = ''
      this.classList = []
      this.showClassList()
    },
    'collegeId': function(newValue, oldValue) {
      this.$set(this.$refs.simpleStudentDlg.form, 'collegeId', newValue)
      this.$set(this.$refs.simpleStudentDlg.form, 'classId', '')
      this.classId = ''
      this.classList = []
      this.majorId = ''
      this.majorList = []
      if (newValue) {
        this.getMajorList()
      }
      this.showClassList()
    },
    'majorId': function(newValue, oldValue) {
      this.$set(this.$refs.simpleStudentDlg.form, 'majorId', newValue)
      this.$set(this.$refs.simpleStudentDlg.form, 'classId', '')
      this.classId = ''
      this.classList = []
      this.showClassList()
    }
  },
  created() {
  },
  methods: {
    async initDataList() {
      this.$emit('update-record', this.form)
    },
    async getMajorList() {
      const majorResp = await listApi.getSomeRecords({
        keyWords: 'SchoolMajorInfo',
        searchKey: { dwh: this.collegeId }
      })
      this.majorList = majorResp.data.content
    },
    async showClassList() {
      const form = this.$refs.simpleStudentDlg.form
      const gradeId = form.gradeId
      const collegeId = form.collegeId
      const majorId = form.majorId
      if (gradeId && collegeId && majorId) {
        this.loading = true
        const resp = await listApi.getSomeRecords({
          keyWords: 'ViewSchoolClass',
          searchKey: { gradeId: gradeId, dwh: collegeId, zyh: majorId }
        })
        this.classList = resp.data.content
        this.loading = false
      } else {
        this.classList = []
        this.classId = ''
        this.$set(this.$refs.simpleStudentDlg.form, 'classId', this.classId)
      }
    },
    setClassId() {
      this.$set(this.$refs.simpleStudentDlg.form, 'classId', this.classId)
    },
    async beforOpenDialog(nowForm) {
      const collegeResp = await listApi.getSomeRecords({
        keyWords: 'SchoolCollegeInfo'
      })
      this.collegeList = collegeResp.data.content
      if (nowForm && nowForm.id) {
        this.gradeId = nowForm.gradeId
        this.majorId = nowForm.zyh
        this.collegeId = nowForm.collegeId
        this.editForm = _.cloneDeep(nowForm)
        this.classId = nowForm.bh
      }
    },
    async showDialog(val, nowForm) {
      this.beforOpenDialog(nowForm)
      this.$refs.simpleStudentDlg.showDialog(val, nowForm, true)
    }
  }
}
</script>

