import cutomAPI from '@/api/customizeSearch'
// 几种最常用的tableColumns
// id, showName, theOrder, columnName 必选
// firstVisible：默认true； sortable：默认false； width：默认200
export function getTableColumns(tableName, type) {
  switch (tableName) {
    case 'exportRecrd':
      return [
        { id: 1, showName: '个人/单位名称', theOrder: 1, columnName: 'name', width: 200 },
        { id: 2, showName: '导出用途', theOrder: 2, columnName: 'remarks', width: 350 },
        { id: 3, showName: '导出内容', theOrder: 3, columnName: 'exportContent', width: 300 },
        { id: 4, showName: '导出时间', theOrder: 4, columnName: 'updateTime', width: 150 }
      ]
    case 'TeacherUserInfo':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'name' },
        { id: 2, showName: '工号', theOrder: 2, columnName: 'gh' },
        { id: 3, showName: '组织机构', theOrder: 3, columnName: 'organizationName' },
        { id: 4, showName: '联系方式', theOrder: 4, columnName: 'phone' }
      ]
    case 'SchoolMajorInfo':
      return [
        { id: 1, showName: '专业名称', theOrder: 1, columnName: 'zymc' },
        { id: 2, showName: '专业代码', theOrder: 2, columnName: 'zyh' },
        { id: 3, showName: '培养层次', theOrder: 3, columnName: 'pyccType' },
        { id: 2, showName: '所属学院', theOrder: 4, columnName: 'collegeName' },
        { id: 5, showName: '备注', theOrder: 5, columnName: 'remarks' }
      ]
    case 'SchooClassInfo':
      return [
        { id: 1, showName: '班级名称', theOrder: 1, columnName: 'name' },
        { id: 2, showName: '班级代码', theOrder: 2, columnName: 'bh' },
        { id: 3, showName: '年级', theOrder: 3, columnName: 'gradeName' },
        { id: 4, showName: '班级人数', theOrder: 3, columnName: 'studentNums' },
        { id: 5, showName: '所属学院', theOrder: 3, columnName: 'collegeName' },
        { id: 6, showName: '所属专业', theOrder: 3, columnName: 'majorName' }
      ]
    case 'StudentUserInfo':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'name' },
        { id: 2, showName: '学号', theOrder: 2, columnName: 'xh' },
        { id: 8, showName: '宿舍号', theOrder: 8, columnName: 'ssh' },
        { id: 3, showName: '身份证', theOrder: 3, columnName: 'sfzjh' },
        { id: 4, showName: '年级', theOrder: 4, columnName: 'gradeName' },
        { id: 5, showName: '所属学院', theOrder: 5, columnName: 'collegeName' },
        { id: 6, showName: '所属专业', theOrder: 6, columnName: 'majorName' },
        { id: 7, showName: '班级名称', theOrder: 7, columnName: 'className' }
      ]
    case 'rolePhManage':
      return [
        { id: 1, showName: '页面', theOrder: 1, columnName: 'name' },
        { id: 2, showName: '可查字段', theOrder: 2, columnName: 'fields' }
      ]
    case 'SchoolHolidaysInfo':
      return [
        { id: 1, showName: '节日名称', theOrder: 1, columnName: 'name' },
        { id: 2, showName: '节日时间', theOrder: 2, columnName: 'holidayTimes' },
        { id: 3, showName: '放假时间', theOrder: 3, columnName: 'restTimes' },
        { id: 4, showName: '是否调班', theOrder: 4, columnName: 'holidayTypeName' },
        { id: 5, showName: '调班时间', theOrder: 5, columnName: 'dateTimeStr' },
        { id: 6, showName: '更新时间', theOrder: 5, columnName: 'updateTime' }
      ]
    case 'SelfEvaluation':
      return [
        { id: 1, showName: '评分项', theOrder: 1, columnName: 'name' },
        { id: 2, showName: '细则', theOrder: 2, columnName: 'remarks' },
        { id: 3, showName: '分值', theOrder: 3, columnName: 'score' },
        { id: 4, showName: '自我评分', theOrder: 3, columnName: 'customize-selfScore' }
      ]
    case 'LeaveReturnTaskInfo':
      if (type === 1) {
        return [
          { id: 1, showName: '名称', theOrder: 1, columnName: 'name' },
          { id: 2, showName: '开始时间', theOrder: 2, columnName: 'startDay' },
          { id: 3, showName: '结束时间', theOrder: 3, columnName: 'endDay' },
          { id: 4, showName: '使用范围', theOrder: 3, columnName: 'scopeName' }
        ]
      } else {
        return [
          { id: 1, showName: '名称', theOrder: 1, columnName: 'name' },
          { id: 2, showName: '开始时间', theOrder: 2, columnName: 'startDay' },
          { id: 3, showName: '结束时间', theOrder: 3, columnName: 'endDay' }
        ]
      }
    case 'LeaveReturnRegisterInfo':
      if (type === 1) {
        return [
          { id: 1, showName: '姓名', theOrder: 1, columnName: 'studentName' },
          { id: 2, showName: '学号', theOrder: 2, columnName: 'xh' },
          { id: 3, showName: '宿舍号', theOrder: 3, columnName: 'ssh' },
          { id: 4, showName: '手机号', theOrder: 4, columnName: 'phone' },
          { id: 5, showName: '详细去向', theOrder: 5, columnName: 'registerTargetDetailAddress' },
          { id: 6, showName: '是否回家', theOrder: 6, columnName: 'leaveTypeName' },
          { id: 7, showName: '家庭住址', theOrder: 7, columnName: 'registerHomeDetailAddress' },
          { id: 8, showName: '交通方式', theOrder: 8, columnName: 'trafficTypeName' },
          { id: 9, showName: '车次/航班', theOrder: 9, columnName: 'trafficNumber' },
          { id: 10, showName: '离校时间', theOrder: 10, columnName: 'startTime' },
          { id: 11, showName: '返校时间', theOrder: 11, columnName: 'endTime' },
          { id: 12, showName: '应急联系人', theOrder: 12, columnName: 'linkman' },
          { id: 13, showName: '联系人电话', theOrder: 13, columnName: 'linkmanPhone' },
          { id: 14, showName: '状态', theOrder: 14, columnName: 'currentStatusName' }
        ]
      } else {
        return [
          { id: 1, showName: '姓名', theOrder: 1, columnName: 'studentName' },
          { id: 2, showName: '学号', theOrder: 2, columnName: 'xh' },
          { id: 3, showName: '宿舍号', theOrder: 3, columnName: 'ssh' },
          { id: 4, showName: '手机号', theOrder: 4, columnName: 'phone' },
          { id: 5, showName: '出发详细地址', theOrder: 5, columnName: 'registerTargetDetailAddress' },
          { id: 6, showName: '返校交通方式', theOrder: 8, columnName: 'trafficTypeName' },
          { id: 7, showName: '返校车次/航班', theOrder: 9, columnName: 'trafficNumber' },
          { id: 8, showName: '返校出发时间', theOrder: 10, columnName: 'returnStartTime' },
          { id: 9, showName: '返校到达时间', theOrder: 11, columnName: 'returnEndTime' },
          { id: 10, showName: '应急联系人', theOrder: 12, columnName: 'linkman' },
          { id: 11, showName: '联系人电话', theOrder: 13, columnName: 'linkmanPhone' },
          { id: 12, showName: '状态', theOrder: 14, columnName: 'currentStatusName' }
        ]
      }
    case 'ShiftArrangement':
      return [
        { id: 1, showName: '学院名称', theOrder: 1, columnName: 'collegeName' },
        { id: 2, showName: '班级名称', theOrder: 2, columnName: 'name' },
        { id: 3, showName: '班级代码', theOrder: 3, columnName: 'bh' },
        { id: 4, showName: '年级', theOrder: 4, columnName: 'gradeName' },
        { id: 5, showName: '班级人数', theOrder: 5, columnName: 'studentNums' },
        { id: 6, showName: '所属专业', theOrder: 6, columnName: 'majorName' },
        { id: 7, showName: '班主任', theOrder: 7, columnName: 'teacherName' },
        { id: 8, showName: '辅导员', theOrder: 8, columnName: 'instructorName' }
      ]
    case 'InformSearch':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'name' },
        { id: 2, showName: '工号', theOrder: 2, columnName: 'workId' },
        { id: 4, showName: '角色', theOrder: 4, columnName: 'roleNames' },
        { id: 5, showName: '联系方式', theOrder: 5, columnName: 'phone' }
      ]
    case 'TaskStatic':
      return [
        { id: 1, showName: '学院名称', theOrder: 1, columnName: 'NAME' },
        { id: 2, showName: '区间报道人数', theOrder: 2, columnName: 'sectionNum' },
        { id: 3, showName: '累计报到人数', theOrder: 3, columnName: 'totalNum' },
        { id: 4, showName: '未报道人数', theOrder: 4, columnName: 'restNum' },
        { id: 5, showName: '累计报道率', theOrder: 5, columnName: 'efficiency' }
      ]
    case 'TeacherSearch':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'name' },
        { id: 2, showName: '学号', theOrder: 2, columnName: 'xh' },
        { id: 3, showName: '所在学院', theOrder: 3, columnName: 'collegeName' },
        { id: 4, showName: '联系方式', theOrder: 4, columnName: 'phone' },
        { id: 5, showName: '宿舍号', theOrder: 5, columnName: 'ssh' }
      ]
    case 'StudentDisciplinePunishInfo':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'STUDENTNAME' },
        { id: 2, showName: '学号', theOrder: 2, columnName: 'XH' },
        { id: 3, showName: '身份证号', theOrder: 3, columnName: 'SFZJH' },
        { id: 4, showName: '院系', theOrder: 4, columnName: 'COLLEGENAME' },
        { id: 5, showName: '专业', theOrder: 5, columnName: 'MAJORNAME' },
        { id: 6, showName: '班级', theOrder: 6, columnName: 'CLASSNAME' },
        { id: 7, showName: '处分原因', theOrder: 7, columnName: 'REASON' },
        { id: 8, showName: '处分结果', theOrder: 8, columnName: 'customize-RESULT_NAME' },
        { id: 9, showName: '处分时间', theOrder: 9, columnName: 'DISCIPLINE_TIME' },
        { id: 10, showName: '处分文号', theOrder: 10, columnName: 'DISCIPLINE_NUMBER' },
        { id: 11, showName: '解除时间', theOrder: 11, columnName: 'RELIEVE_TIME' },
        { id: 12, showName: '解除提醒', theOrder: 12, columnName: 'customize-STATUS' }
      ]
    case 'relieveTips':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'STUDENTNAME' },
        { id: 2, showName: '学号', theOrder: 2, columnName: 'XH' },
        { id: 3, showName: '处分结果', theOrder: 3, columnName: 'RESULT_NAME' },
        { id: 4, showName: '解除时间', theOrder: 4, columnName: 'RELIEVE_TIME' }
      ]
    case 'StudentDisciplineAppealInfo':
      return [
        { id: 1, showName: '处分号', theOrder: 1, columnName: 'disciplineNumber' },
        { id: 2, showName: '处分结果', theOrder: 2, columnName: 'punishResultName' },
        { id: 3, showName: '申诉人', theOrder: 3, columnName: 'studentName' },
        { id: 4, showName: '学号', theOrder: 4, columnName: 'xh' },
        { id: 5, showName: '申诉时间', theOrder: 5, columnName: 'createTime' },
        { id: 6, showName: '申诉理由', theOrder: 6, columnName: 'remarks' },
        { id: 7, showName: '申诉结果', theOrder: 7, columnName: 'resultName' }
      ]
    case 'StudentDisciplineStaticDetail':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'STUDENTNAME' },
        { id: 2, showName: '学号', theOrder: 2, columnName: 'XH' },
        { id: 3, showName: '性别', theOrder: 3, columnName: 'XBM' },
        { id: 4, showName: '院系', theOrder: 4, columnName: 'COLLEGENAME' },
        { id: 5, showName: '专业', theOrder: 5, columnName: 'MAJORNAME' },
        { id: 6, showName: '班级', theOrder: 6, columnName: 'CLASSNAME' },
        { id: 7, showName: '违纪事实', theOrder: 7, columnName: 'REASON' },
        { id: 8, showName: '处分结果', theOrder: 8, columnName: 'DISCIPLINE_RESULTNAME' },
        { id: 9, showName: '处分时间', theOrder: 9, columnName: 'DISCIPLINE_TIME' },
        { id: 10, showName: '处分文号', theOrder: 10, columnName: 'DISCIPLINE_NUMBER' },
        { id: 11, showName: '班主任', theOrder: 11, columnName: 'TEACHERNAME' },
        { id: 12, showName: '辅导员', theOrder: 12, columnName: 'INSTRUCTORNAME' }
      ]
    case 'TeacherAssessItemInfo':
      return [
        { id: 1, showName: '评价项', theOrder: 1, columnName: 'name' },
        { id: 2, showName: '评价分值', theOrder: 2, columnName: 'score' },
        { id: 3, showName: '评价细则', theOrder: 3, columnName: 'remarks' }
      ]
    case 'RelTeacherAssessTaskUser':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'NAME' },
        { id: 2, showName: '工号', theOrder: 2, columnName: 'WORKID' },
        { id: 3, showName: '所属学院', theOrder: 3, columnName: 'ORGANIZATIONNAME' },
        { id: 4, showName: '角色', theOrder: 4, columnName: 'ROLENAME' },
        { id: 5, showName: '分数', theOrder: 5, columnName: 'SCORE' }
      ]
    case 'RelTeacherAssessTaskUserResult':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'NAME' },
        { id: 2, showName: '工号', theOrder: 2, columnName: 'WORKID' },
        { id: 3, showName: '所属学院', theOrder: 3, columnName: 'ORGANIZATIONNAME' },
        { id: 4, showName: '角色', theOrder: 4, columnName: 'ROLENAME' },
        { id: 5, showName: '加减分', theOrder: 5, columnName: 'NUM' },
        { id: 6, showName: '总分', theOrder: 6, columnName: 'SCORE' },
        { id: 7, showName: '定级', theOrder: 7, columnName: 'LEVELNAME' }
      ]
    case 'TeacherAssessTaskUserRecord':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'userName' },
        { id: 2, showName: '工号', theOrder: 2, columnName: 'workId' },
        { id: 3, showName: '加减分项', theOrder: 3, columnName: 'itemName' },
        { id: 4, showName: '类型', theOrder: 4, columnName: 'name' },
        { id: 5, showName: '分值', theOrder: 5, columnName: 'score' }
      ]
    case 'ViewLeaveVacationInfo':
      if (type === 1) {
        return [
          { id: 1, showName: '姓名', theOrder: 1, columnName: 'studentName' },
          { id: 2, showName: '年级', theOrder: 2, columnName: 'gradeName' },
          { id: 3, showName: '班级', theOrder: 3, columnName: 'className' },
          { id: 4, showName: '请假类型', theOrder: 4, columnName: 'typeName' },
          { id: 5, showName: '请假开始时间', theOrder: 5, columnName: 'startTime' },
          { id: 5, showName: '请假结束时间', theOrder: 5, columnName: 'endTime' },
          { id: 6, showName: '时长', theOrder: 5, columnName: 'leaveHours' },
          { id: 7, showName: '是否离校', theOrder: 5, columnName: 'leaveStatusName' },
          { id: 8, showName: '状态', theOrder: 5, columnName: 'currentStatusName' }
        ]
      } else {
        return [
          { id: 1, showName: '姓名', theOrder: 1, columnName: 'studentName' },
          { id: 2, showName: '年级', theOrder: 2, columnName: 'gradeName' },
          { id: 3, showName: '班级', theOrder: 3, columnName: 'className' },
          { id: 4, showName: '请假类型', theOrder: 4, columnName: 'typeName' },
          { id: 5, showName: '请假开始时间', theOrder: 5, columnName: 'startTime' },
          { id: 5, showName: '请假结束时间', theOrder: 5, columnName: 'endTime' },
          { id: 6, showName: '时长', theOrder: 5, columnName: 'leaveHours' },
          { id: 8, showName: '状态', theOrder: 5, columnName: 'currentStatusName' }
        ]
      }
    case 'SysLogger':
      return [
        { id: 1, showName: '时间', theOrder: 1, columnName: 'createTime' },
        { id: 2, showName: '操作类型', theOrder: 2, columnName: 'operationTypeName' },
        { id: 3, showName: '操作账号', theOrder: 3, columnName: 'userName' },
        { id: 4, showName: '操作IP', theOrder: 4, columnName: 'ip' },
        { id: 5, showName: '操作内容', theOrder: 5, columnName: 'actionDetail' },
        { id: 6, showName: '操作状态', theOrder: 6, columnName: 'result' }
      ]
    case 'SysDataModifyLogger':
      return [
        { id: 1, showName: '时间', theOrder: 1, columnName: 'createTime' },
        { id: 2, showName: '操作类型', theOrder: 2, columnName: 'operationTypeName' },
        { id: 3, showName: '操作账号', theOrder: 3, columnName: 'userName' },
        { id: 4, showName: '操作IP', theOrder: 4, columnName: 'ipAddress' },
        { id: 5, showName: '接口', theOrder: 5, columnName: 'api' },
        { id: 6, showName: '操作状态', theOrder: 6, columnName: 'result' }
      ]
    case 'RentHouseManage':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'studentName' },
        { id: 2, showName: '学号', theOrder: 2, columnName: 'xh' },
        { id: 3, showName: '学院', theOrder: 3, columnName: 'collegeName' },
        { id: 4, showName: '班级', theOrder: 4, columnName: 'className' },
        { id: 12, showName: '宿舍号', theOrder: 3, columnName: 'ssh' },
        { id: 5, showName: '校内/校外租房', theOrder: 5, columnName: 'isInSchoolName' },
        { id: 6, showName: '租房详细地址', theOrder: 6, columnName: 'address' },
        { id: 7, showName: '申请理由', theOrder: 7, columnName: 'reason' },
        { id: 8, showName: '是否退宿', theOrder: 8, columnName: 'isRetreatName' },
        { id: 9, showName: '租房开始时间', theOrder: 9, columnName: 'startTime' },
        { id: 10, showName: '租房结束时间', theOrder: 9, columnName: 'endTime' },
        { id: 11, showName: '状态', theOrder: 10, columnName: 'currentStatusName' }
      ]
    case 'DayManage':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'studentName' },
        { id: 2, showName: '学号', theOrder: 2, columnName: 'xh' },
        { id: 3, showName: '学院', theOrder: 3, columnName: 'collegeName' },
        { id: 4, showName: '班级', theOrder: 4, columnName: 'className' },
        { id: 12, showName: '宿舍号', theOrder: 3, columnName: 'ssh' },
        { id: 6, showName: '住房详细地址', theOrder: 6, columnName: 'address' },
        { id: 7, showName: '申请理由', theOrder: 7, columnName: 'reason' },
        { id: 8, showName: '走读开始时间', theOrder: 8, columnName: 'startTime' },
        { id: 9, showName: '走读结束时间', theOrder: 8, columnName: 'endTime' },
        // { id: 9, showName: '紧急联系人', theOrder: 9, columnName: 'contacts' },
        { id: 10, showName: '是否退宿', theOrder: 10, columnName: 'isRetreatName' },
        { id: 11, showName: '状态', theOrder: 11, columnName: 'currentStatusName' }
      ]
    case 'StudentIdCard':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'studentName' },
        { id: 2, showName: '学号', theOrder: 2, columnName: 'xh' },
        { id: 3, showName: '学院', theOrder: 3, columnName: 'collegeName' },
        { id: 4, showName: '班级', theOrder: 4, columnName: 'className' },
        { id: 5, showName: '学生证号', theOrder: 6, columnName: 'studentId' },
        { id: 6, showName: '乘车区间', theOrder: 9, columnName: 'ridingInterval' },
        { id: 7, showName: '申请理由', theOrder: 10, columnName: 'reason' },
        { id: 8, showName: '申请时间', theOrder: 11, columnName: 'applyTime' },
        { id: 9, showName: '状态', theOrder: 12, columnName: 'currentStatusName' }
      ]
    case 'SysFlowTypeInfo':
      return [
        { id: 1, showName: '流程名称', theOrder: 1, columnName: 'name' },
        { id: 2, showName: '备注', theOrder: 2, columnName: 'remarks' }
      ]
    case 'registrationHomepage':
      return [
        { id: 1, showName: '学年学期', theOrder: 1, columnName: 'semesterYearName' },
        { id: 2, showName: '辅导员', theOrder: 2, columnName: 'instructorName' },
        { id: 3, showName: '注册学院', theOrder: 3, columnName: 'collegeName' },
        { id: 4, showName: '注册专业', theOrder: 4, columnName: 'majorName' },
        { id: 5, showName: '注册班级', theOrder: 5, columnName: 'className' },
        { id: 6, showName: '注册时间', theOrder: 6, columnName: 'createTime' },
        { id: 7, showName: '缴费状态', theOrder: 7, columnName: 'jfzt' },
        { id: 8, showName: '注册状态', theOrder: 8, columnName: 'zczt' }
      ]
    case 'getFreeOrDelayApply':
      return [
        { id: 1, showName: '申请时间', theOrder: 1, columnName: 'createTime' },
        { id: 2, showName: '申请类型', theOrder: 2, columnName: 'typeName' },
        { id: 3, showName: '缓缴金额', theOrder: 3, columnName: 'applyMoney' },
        { id: 4, showName: '缓缴时间', theOrder: 4, columnName: 'time' },
        { id: 5, showName: '审批状态', theOrder: 5, columnName: 'statusName' }
      ]
    case 'FreeOrDelayApply':
      return [
        { id: 1, showName: '学号', theOrder: 1, columnName: 'XH' },
        { id: 2, showName: '姓名', theOrder: 2, columnName: 'STUDENTNAME' },
        { id: 3, showName: '班级', theOrder: 3, columnName: 'CLASSNAME' },
        { id: 4, showName: '学籍状态', theOrder: 4, columnName: 'XJZT' },
        { id: 5, showName: '当前状态', theOrder: 5, columnName: 'ZXZT' },
        { id: 6, showName: '缓/免缴', theOrder: 6, columnName: 'TYPENAME' },
        { id: 7, showName: '缓缴金额', theOrder: 7, columnName: 'DELAYMONEY' },
        { id: 8, showName: '免缴金额', theOrder: 8, columnName: 'FREEMONEY' },
        { id: 9, showName: '申请时间', theOrder: 9, columnName: 'CREATETIME' },
        { id: 10, showName: '缓缴日期', theOrder: 10, columnName: 'TIME' }
      ]
    case 'Registration':
      return [
        { id: 1, showName: '学号', theOrder: 1, columnName: 'XH' },
        { id: 2, showName: '姓名', theOrder: 2, columnName: 'STUDENTNAME' },
        { id: 3, showName: '班级', theOrder: 3, columnName: 'CLASSNAME' },
        { id: 4, showName: '学籍状态', theOrder: 4, columnName: 'XJZT' },
        { id: 5, showName: '当前状态', theOrder: 5, columnName: 'ZXZT' },
        { id: 6, showName: '缓/免缴', theOrder: 6, columnName: 'TYPENAME' },
        { id: 7, showName: '注册时间', theOrder: 7, columnName: 'REGISTERTIME' },
        { id: 8, showName: '学年学期', theOrder: 8, columnName: 'SEMESTERYEAR' },
        { id: 9, showName: '缴费状态', theOrder: 9, columnName: 'JFZT' },
        { id: 10, showName: '注册状态', theOrder: 10, columnName: 'STATUSNAME' },
        { id: 11, showName: '提醒状态', theOrder: 11, columnName: 'DISCIPLINE_NUMBER' }
      ]
    case 'PayCalc':
      return [
        { id: 1, showName: '学院', theOrder: 1, columnName: 'XH' },
        { id: 2, showName: '总人数', theOrder: 2, columnName: 'STUDENTNAME' },
        { id: 3, showName: '已缴费', theOrder: 3, columnName: 'CLASSNAME' },
        { id: 4, showName: '未缴清', theOrder: 4, columnName: 'XJZT' },
        { id: 5, showName: '无需缴费项', theOrder: 5, columnName: 'ZXZT' },
        { id: 6, showName: '未缴费', theOrder: 6, columnName: 'TYPENAME' },
        { id: 7, showName: '缴费完成率', theOrder: 7, columnName: 'REGISTERTIME' }
      ]
    case 'StudentPayInfo':
      return [
        { id: 1, showName: '学年学期', theOrder: 1, columnName: 'XH' },
        { id: 2, showName: '应缴金额', theOrder: 2, columnName: 'STUDENTNAME' },
        { id: 3, showName: '实缴金额', theOrder: 3, columnName: 'CLASSNAME' },
        { id: 4, showName: '减免金额', theOrder: 4, columnName: 'XJZT' },
        { id: 5, showName: '未缴金额', theOrder: 5, columnName: 'ZXZT' }
      ]

    case 'Registration2':
      return [
        { id: 1, showName: '学号', theOrder: 1, columnName: 'XH' },
        { id: 2, showName: '姓名', theOrder: 2, columnName: 'STUDENTNAME' },
        { id: 3, showName: '班级', theOrder: 3, columnName: 'CLASSNAME' },
        { id: 4, showName: '学籍状态', theOrder: 4, columnName: 'XJZT' },
        { id: 5, showName: '当前状态', theOrder: 5, columnName: 'ZXZT' },
        { id: 6, showName: '缓/免缴', theOrder: 6, columnName: 'TYPENAME' },
        { id: 7, showName: '注册时间', theOrder: 7, columnName: 'REGISTERTIME' },
        { id: 8, showName: '学年学期', theOrder: 8, columnName: 'SEMESTERYEAR' },
        { id: 9, showName: '缴费状态', theOrder: 9, columnName: 'JFZT' },
        { id: 10, showName: '注册状态', theOrder: 10, columnName: 'STATUSNAME' }
      ]
    case 'FreeOrDelayApply2':
      return [
        { id: 1, showName: '学号', theOrder: 1, columnName: 'XH' },
        { id: 2, showName: '姓名', theOrder: 2, columnName: 'STUDENTNAME' },
        { id: 3, showName: '班级', theOrder: 3, columnName: 'CLASSNAME' },
        { id: 4, showName: '学籍状态', theOrder: 4, columnName: 'XJZT' },
        { id: 5, showName: '当前状态', theOrder: 5, columnName: 'ZXZT' },
        { id: 6, showName: '缓/免缴', theOrder: 6, columnName: 'TYPENAME' },
        { id: 7, showName: '缓缴金额', theOrder: 7, columnName: 'DELAYMONEY' },
        { id: 8, showName: '免缴金额', theOrder: 8, columnName: 'FREEMONEY' },
        { id: 9, showName: '申请时间', theOrder: 9, columnName: 'CREATETIME' },
        { id: 10, showName: '缓缴日期', theOrder: 10, columnName: 'TIME' },
        { id: 11, showName: '审批状态', theOrder: 11, columnName: 'STATUSNAME' }
      ]
    case 'ViewSchoolClass':
      return [
        { id: 1, showName: '班级编号', theOrder: 1, columnName: 'bh' },
        { id: 2, showName: '班级名称', theOrder: 2, columnName: 'name' },
        { id: 3, showName: '院系', theOrder: 3, columnName: 'collegeName' },
        { id: 4, showName: '专业', theOrder: 4, columnName: 'majorName' },
        { id: 5, showName: '年级', theOrder: 5, columnName: 'gradeName' }
      ]
    case 'ViewSchoolClass2':
      return [
        { id: 1, showName: '班级编号', theOrder: 1, columnName: 'bh' },
        { id: 2, showName: '班级名称', theOrder: 2, columnName: 'name' },
        { id: 3, showName: '辅导员工号', theOrder: 3, columnName: 'workId' },
        { id: 4, showName: '辅导员', theOrder: 4, columnName: 'userName' },
        { id: 5, showName: '院系', theOrder: 5, columnName: 'collegeName' },
        { id: 6, showName: '专业', theOrder: 6, columnName: 'majorName' },
        { id: 7, showName: '年级', theOrder: 7, columnName: 'gradeName' }
      ]
    case 'StudentRegistrationStatic':
      return [
        { id: 1, showName: '学院', theOrder: 1, columnName: 'NAME' },
        { id: 2, showName: '总人数', theOrder: 2, columnName: 'COLLEGENUM' },
        { id: 3, showName: '已注册', theOrder: 3, columnName: 'NUM' },
        { id: 4, showName: '暂缓注册', theOrder: 3, columnName: 'MIDDLENUM' },
        { id: 5, showName: '未注册', theOrder: 4, columnName: 'RESTNUM' },
        { id: 6, showName: '注册完成率', theOrder: 5, columnName: 'customize-EFFICIENCY' }
      ]
    case 'ViewStudentRollInfo':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'studentName' },
        { id: 2, showName: '学号', theOrder: 2, columnName: 'xh' },
        { id: 3, showName: '所属学院', theOrder: 3, columnName: 'collegeName' },
        { id: 4, showName: '所属专业', theOrder: 4, columnName: 'majorName' },
        { id: 5, showName: '所属班级', theOrder: 5, columnName: 'className' },
        { id: 6, showName: '异动类型', theOrder: 6, columnName: 'typeValue' },
        { id: 7, showName: '审核状态', theOrder: 7, columnName: 'currentStatusName' }
      ]
    case 'SchoolCollegeInfo':
      return [
        { id: 1, showName: '学院名称', theOrder: 1, columnName: 'name' },
        { id: 2, showName: '学院代码', theOrder: 2, columnName: 'code' },
        { id: 3, showName: '备注', theOrder: 3, columnName: 'remarks' }
      ]
    case 'ViewTeacherAssessResultInfo':
      return [
        { id: 1, showName: '年份', theOrder: 2, columnName: 'year' },
        { id: 2, showName: '姓名', theOrder: 3, columnName: 'teacherName' },
        { id: 3, showName: '工号', theOrder: 3, columnName: 'workId' },
        { id: 4, showName: '考核结果', theOrder: 4, columnName: 'assessResult' }
      ]
    case 'WorkLog':
      return [
        { id: 1, showName: '日志名称', theOrder: 1, columnName: 'name' },
        { id: 2, showName: '提交状态', theOrder: 2, columnName: 'customize-commitStatus' },
        { id: 3, showName: '提交时间', theOrder: 3, columnName: 'commitTime' }
      ]
    case 'ViewInstructorUser':
      return [
        { id: 1, showName: '姓名', theOrder: 1, columnName: 'instructorName' },
        { id: 2, showName: '工号', theOrder: 2, columnName: 'workId' },
        { id: 3, showName: '所属学院', theOrder: 3, columnName: 'collegeName' },
        { id: 4, showName: '所带班级', theOrder: 4, columnName: 'classNames' },
        { id: 5, showName: '联系方式', theOrder: 5, columnName: 'phone' }
      ]
    case 'WorkLog2':
      return [
        { id: 1, showName: '日志名称', theOrder: 1, columnName: 'name' },
        { id: 2, showName: '提交时间', theOrder: 2, columnName: 'commitTime' }
      ]
    case 'ViewFlowCaseInfo':
      return [
        { id: 1, showName: '学生姓名', theOrder: 1, columnName: 'studentName' },
        { id: 2, showName: '学号', theOrder: 2, columnName: 'xh' },
        { id: 9, showName: '身份证号码', theOrder: 2, columnName: 'sfzjh' },
        { id: 3, showName: '申请名称', theOrder: 3, columnName: 'name' },
        { id: 4, showName: '所属年级', theOrder: 4, columnName: 'ssnj' },
        { id: 5, showName: '所属学院', theOrder: 5, columnName: 'collegeName' },
        { id: 6, showName: '所属专业', theOrder: 6, columnName: 'majorName' },
        { id: 7, showName: '所属班级', theOrder: 7, columnName: 'className' },
        { id: 8, showName: '班级班号', theOrder: 7, columnName: 'bh' }
      ]
    default:
      return [
        { id: 1, showName: '编码', theOrder: 1, columnName: 'code', width: 150 },
        { id: 2, showName: '名称', theOrder: 2, columnName: 'name', width: 250 },
        { id: 3, showName: '备注', theOrder: 3, columnName: 'remarks' }
      ]
  }
}

export async function remoteGetTableColumn(id, roles) {
  const rsp = JSON.stringify(roles)
  try {
    let tableColumn = []
    const resp = await cutomAPI.getSomeRecords2({
      keyWords: 'MenuFieldInfo',
      searchKey: {
        menuId: id,
        roleId: rsp.replace(/\[|]/g, '')
      },
      sort: { properties: 'theOrder', direction: 'DESC' },
      reg: ''
    })
    tableColumn = resp.data
    return tableColumn
  } catch (error) {
    console.log(error)
  }
}
