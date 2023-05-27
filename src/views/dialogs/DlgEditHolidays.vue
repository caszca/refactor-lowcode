<template>
  <!-- -->
  <SimpleDialog ref="simpleSemesterDlg" :default-props.sync="defaultProps" @update-record="initDataList">
    <template slot="bottomItems">
      <el-form-item prop="name" label="节日名称">
        <el-input v-model="name" :maxlength="20" placeholder="请输入" />
      </el-form-item>
      <el-form-item prop="holidayTime" label="节日时间">
        <el-date-picker
          v-model="holidayTime"
          type="date"
          placeholder="选择日期"
          format="MM 月 dd 日"
          value-format="MM-dd" />
      </el-form-item>
      <el-form-item prop="restTime" label="放假时间">
        <el-date-picker
          v-model="restTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="MM 月 dd 日"
          value-format="MM-dd" />
      </el-form-item>
      <el-form-item prop="holidayType" label="是否调班">
        <el-radio-group v-model="holidayType">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="holidayType === 1">
        <el-form-item prop="dateTime" label="调班时间">
          <el-date-picker
            v-model="dateTime"
            type="dates"
            placeholder="请选择，支持选择多个日期"
            format="MM 月 dd 日"
            value-format="MM-dd" />
        </el-form-item>
      </div>

    </template>
  </SimpleDialog>
</template>

<script>
import SimpleDialog from '@/components/SimpleDialog'
export default {
  name: 'DlgEditHolidays',
  components: { SimpleDialog },
  props: {
  },
  data() {
    return {
      dateTime: '',
      holidayType: 1,
      restTime: '',
      holidayTime: '',
      name: '',
      defaultProps: {
        keyWord: 'SchoolHolidaysInfo',
        formItems: [
        ],
        formRules: {
          name: { required: true, message: '节日名称不能为空', trigger: 'blur' },
          holidayTime: { required: true, message: '节日时间不能为空', trigger: 'blur' },
          restTime: { required: true, message: '放假时间不能为空', trigger: 'blur' },
          holidayType: { required: true, message: '是否调班不能为空', trigger: 'blur' },
          dateTime: { required: true, message: '调班时间不能为空', trigger: 'blur' }
        },
        defaultDBProps: {
          footButtons: { repeatAdd: { show: false }}
        }
      }
    }
  },
  watch: {
    dateTime: function(newValue, oldValue) {
      this.$set(this.$refs.simpleSemesterDlg.form, 'dateTime', newValue)
    },
    holidayType: function(newValue, oldValue) {
      this.$set(this.$refs.simpleSemesterDlg.form, 'holidayType', newValue)
    },
    restTime: function(newValue, oldValue) {
      this.$set(this.$refs.simpleSemesterDlg.form, 'restTime', newValue)
    },
    holidayTime: function(newValue, oldValue) {
      this.$set(this.$refs.simpleSemesterDlg.form, 'holidayTime', newValue)
    },
    name: function(newValue, oldValue) {
      this.$set(this.$refs.simpleSemesterDlg.form, 'name', newValue)
    }
  },
  created() {
  },
  methods: {
    async initDataList() {
      this.$emit('update-record', this.form)
    },
    async beforOpenDialog(nowForm) {
      if (nowForm && nowForm.id) {
        this.dateTime = nowForm.dateTimeStr.split(',')
        this.holidayType = nowForm.holidayType
        this.restTime = nowForm.restTimes.split('~')
        this.holidayTime = nowForm.holidayTimes
        this.name = nowForm.name
      }
      this.$set(this.$refs.simpleSemesterDlg.form, 'semesterId', nowForm.semesterId)
    },
    async showDialog(val, nowForm) {
      this.beforOpenDialog(nowForm)
      this.$refs.simpleSemesterDlg.showDialog(val, nowForm, true)
    }
  }
}
</script>

