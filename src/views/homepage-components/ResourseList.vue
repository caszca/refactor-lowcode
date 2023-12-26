<template>
  <div>
    <div class="mainArea">
      <div class="imgBox">
        <img :src="cover(data.sysOssFile)" class="img" />
      </div>
      <div class="detail">
        <div class="activeHeader" @click="$emit('to-detail', data)">{{ data.name }}</div>
        <div class="ltlDetails">
          <span class="ltlDetail">班主任：{{ data.teacherName }}</span>
        </div>
        <div class="teacherInfos">
          <span class="teacherInfo">报名时间：{{ date(data.trainApplyStartDay) }} ~ {{ date(data.trainApplyEndDay) }}</span>
          <span class="teacherInfo">开课时间：{{ date(data.studyStartDay) }} ~ {{ date(data.studyEndDay) }}</span>
        </div>
      </div>
      <div class="btnGroup">
        <div class="viewBtn" @click="$emit('to-detail', data)">详情</div>
        <div v-if="!isTeacher" :class="data.flag ? 'chooseBtn' : 'chooseBtnTrue'" @click="$emit('to-detail', data)">{{ data.flag ? '已报名' : '报名' }}</div>
      </div>
    </div>
    <div class="divider" />
  </div>
</template>

<script>
import defaultImage from '@/assets/img/login_background.jpg'
import moment from 'moment'
export default {
  name: 'ResourseList',
  props: {
    data: { type: Object, default: () => {} }
  },
  data() {
    return {
      isTeacher: false,
      image: defaultImage
    }
  },
  created() {
    const roles = this.$store.getters.roles
    if (roles.includes(3)) {
      this.isTeacher = false
    } else {
      this.isTeacher = true
    }
  },
  methods: {
    cover(val) {
      if (val) {
        return val.url
      } else {
        return this.image
      }
    },
    date(val) {
      return moment(val).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss" scoped>
.imgBox{
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.divider{
  width: 100%;
  border-bottom: 1px dashed #efefef;
  height: 20px;
  margin-bottom: 20px;
}
.mainArea{
  display: flex;
  justify-content: space-between;
}
.img{
  width: 200px;
  height: 100px;
}
.detail{
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px;
}
.ltlDetails{
  display: grid;
}
.ltlDetail{
  color: #797979;
}
.teacherInfos{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.teacherInfo{
  color: #797979;
}
.viewBtn{
  border: 1px solid #d7d7d7;
  width: 115px;
  height: 35px;
  text-align: center;
  line-height: 30px;
  color: #928a8a;
  border-radius: 20px;
  cursor: pointer;
}
.viewBtn:hover{
  border-color: #02a7f0;
  color: #02a7f0;
}
.viewIcon{
  margin-right: 5px;
}
.btnGroup{
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
  gap: 20px;
}
.activeHeader{
  font-size: 18px;
  cursor: pointer;
  user-select: none;
}
.activeHeader:hover{
  text-decoration: underline;
}
.checkIcon{
    margin-right: 5px;
  }
.chooseBtnTrue{
  border: 1px solid #f59a23;
  cursor: pointer;
  user-select: none;
  width: 115px;
  height: 35px;
  text-align: center;
  line-height: 30px;
  border-radius: 20px;
  color: #fff;
  background-color: #f59a23;
}
.chooseBtnTrue:hover{
  background-color: #f59a23bb;
}
.chooseBtn{
  border: 1px solid #f59a23;
  cursor: pointer;
  width: 115px;
  user-select: none;
  height: 35px;
  text-align: center;
  line-height: 30px;
  color: #f59a23;
  border-radius: 20px;
}
.chooseBtn:hover{
  border: 1px solid #f59a23bb;
  color: #f59a23bb;
}
</style>
