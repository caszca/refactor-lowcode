<!-- <template>
  <div v-loading="pageLoading" style="padding-bottom: 20px;">
    <div v-if="showMain" class="mainPage">
      <div class="topArea">
        <span class="header">欢迎来到心理咨询师培训平台</span>
        <span style="width: 25%; margin-left: 10px; display: flex;">
          <el-input v-model="searchKey.name" size="mini" placeholder="请输入课题关键词搜索" clearable />
          <el-button type="primary" size="mini" style="margin-left: 10px;" icon="el-icon-search" @click="initDataList">搜索</el-button>
        </span>
      </div>
      <el-divider />
      <el-tabs v-if="!isTeacher" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0" />
        <el-tab-pane label="已报名" name="1" />
        <el-tab-pane label="未报名" name="2" />
      </el-tabs>
      <el-form v-model="searchKey" label-suffix=":" label-width="auto">
        <div class="searchArea">
          <el-form-item label="培训报名时间">
            <el-date-picker v-model="searchKey.ReExTime" type="daterange" size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
          <el-form-item label="开课时间">
            <el-date-picker v-model="searchKey.exTime" type="daterange" size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
        </div>
      </el-form>
      <div class="divider" />
      <div v-loading="isPageInit" class="rollContainer">
        <div v-if="!resourceList" style="text-align: center; line-height: 600px;">暂无数据</div>
        <resourse-list v-for="(item, index) in resourceList" :key="index + 'resource'" :data="item" @to-detail="jumpToDetail" />
      </div>
      <v-page align="center" layout="sizes, prev, pager, next, jumper" :total="totalSize" :current-page="pageInfo.page" :page-size="pageInfo.size" :page-sizes="[5, 10, 15, 20]" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <div v-if="!showMain">
      <ListDetail :data="detailData" @to-main="jumpToDetail" />
    </div>
    <el-card v-if="alertStatus" class="box-card">
      <div>
        <div style="float: left;">
          <span>
            <svg-icon style="font-size: 20px;" icon-class="提醒" />
          </span>
          <span style="font-size: 15px; font-weight: bold;">
            提醒
          </span>
        </div>
        <div style="float: right; margin-top: 6px;"><span style="color: #3ba7f0;">{{ timeout }}s</span> 两秒后自动关闭</div>
      </div>
      <div class="showMessage">{{ '报名信息提交后，需待管理员审核，审核成功后才可进行缴费' }}</div>
    </el-card>
  </div>
</template>

<script>
import ResourseList from '@/views/homepage-components/ResourseList'
import ListDetail from '@/views/homepage-components/ListDetail'
import customAPI from '@/api/customizeSearch'
// import otherAPI from '@/api/other'
// import bizApi from '@/api/biz'
import VPage from '@/components/Pagination'
export default {
  name: 'Homepage',
  components: { ListDetail, ResourseList, VPage },
  data() {
    return {
      alertStatus: false,
      isTeacher: false,
      pageLoading: false,
      timeout: 3,
      activeName: '',
      selectedList: [],
      searchKey: {},
      resourceList: [
      ],
      totalSize: 10,
      pageInfo: { page: 1, size: 5 },
      showMain: true,
      isPageInit: false,
      detailData: {},
      id: 0
    }
  },
  computed: {
  },
  watch: {
    'searchKey.name': { handler(val, newVal) {
      this.pageInfo.page = 1
      this.initDataList()
    } },
    'searchKey.exTime': { handler(val, newVal) {
      this.pageInfo.page = 1
      this.initDataList()
    } },
    'searchKey.ReExTime': { handler(val, newVal) {
      this.pageInfo.page = 1
      this.initDataList()
    } }
  },
  created() {
    const roles = this.$store.getters.roles
    if (roles.includes(3)) {
      this.isTeacher = false
    } else {
      this.isTeacher = true
    }
    this.initDataList()
  },
  methods: {
    handleClick() {
      this.pageInfo.page = 1
      this.initDataList()
    },
    async initDataList() {
      this.isPageInit = true
      const node = {
        ...this.pageInfo,
        name: this.searchKey.name
      }
      if (this.searchKey.ReExTime) {
        console.log(this.searchKey.ReExTime)
        this.$set(node, 'trainApplyStartDay', this.searchKey.ReExTime[0])
        this.$set(node, 'trainApplyEndDay', this.searchKey.ReExTime[1])
      }
      if (this.searchKey.exTime) {
        console.log(this.searchKey.exTime)
        this.$set(node, 'studyStartDay', this.searchKey.exTime[0])
        this.$set(node, 'studyEndDay', this.searchKey.exTime[1])
      }
      if (this.activeName && this.activeName !== '0') {
        this.$set(node, 'register', this.activeName === '1')
      }
      const res = await customAPI.getStudyPlatform(node)
      this.resourceList = this._.cloneDeep(res.data.content)
      this.totalSize = res.data.totalElements
      this.isPageInit = false
    },
    // 改变页码
    async handleSizeChange(val) {
      this.pageInfo.size = val
      await this.initDataList()
    },
    async handleCurrentChange(val) {
      this.pageInfo.page = val
      await this.initDataList()
    },
    async jumpToDetail(val, isBack) {
      this.pageLoading = true
      if (val) {
        // 浏览量加一
        const newVal = await customAPI.getDetails(val.id)
        this.detailData = { ...val, courseList: newVal.data }
      } else {
        if (!isBack) {
          this.alertStatus = true
          var timer = setInterval(() => {
            if (this.timeout <= 0) {
              clearInterval(timer)
              this.alertStatus = false
            }
            this.timeout--
          }, 1000)
          this.timeout = 3
        }
        this.initDataList()
      }
      this.showMain = !this.showMain
      this.pageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.mainPage{
  display: flex;
  flex-direction: column;
  height: calc(100vh - 160px);
}
.rollContainer{
  flex: 1;
  overflow: auto;
}
.topArea{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
}
.header{
  font-size: 20px;
  font-weight: bold;
}
.divider{
  width: 100%;
  border-bottom: 1px dashed #efefef;
  height: 1px;
  margin-bottom: 20px;
}
/deep/ .searchArea{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  .el-range-editor--mini .el-range-separator{
    width: 30px !important;
  }
}
.box-card {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
  }
  .showMessage {
    color: #9999a6;
    margin-top: 40px;
    margin-left: 20px;
  }
</style> -->
<template>
  <h1>hello</h1>
</template>
