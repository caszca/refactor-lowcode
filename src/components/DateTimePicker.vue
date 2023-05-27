<template>
  <!-- 这是一个带禁用项的时间范围选择器 -->
  <el-date-picker ref="datePicker" v-model="taskYear" :type="typeOfPicker" :placeholder="placeHolder" :picker-options="{ disabledDate: selectedYear }" />
</template>
<script>
import listAPI from '@/api/list'
import moment from 'moment'

export default {
  props: {
  },
  data() {
    return {
      taskYear: '',
      defaultValue: '',
      typeOfPicker: 'year',
      placeHolder: '请选择日期范围',
      yearOptions: []
    }
  },
  watch: {
    taskYear: function(newVal) {
      if (newVal) {
        this.$set(this, 'taskYear', '')
        this.getAvaYear(newVal)
      }
    }
  },
  async created() {
  },
  methods: {
    async getAvaYear(taskType) {
      if (this.yearOptions !== []) { this.yearOptions = [] }
      if (taskType) {
        try {
          const yearRep = await listAPI.getAvailableYear(2, taskType, this.$store.getters.userInfo.schoolId)
          yearRep.data.forEach(e => {
            this.yearOptions.push(moment(e).format(this.typeOfPicker === 'year' ? 'yyyy' : this.typeOfPicker === 'month' ? 'yyyy-MM' : 'yyyy-MM-dd'))
          })
        } catch (error) {
          this.$message.error('年份禁用器出错！')
        }
      }
    },
    selectedYear(date) {
      const year = new Date(date).getFullYear().toString()
      var beDisabled = false
      if (this.yearOptions) {
        this.yearOptions.forEach(e => {
          if (year === e) {
            beDisabled = true
            return beDisabled
          }
        })
      }
      return beDisabled
    }
  }
}
</script>

