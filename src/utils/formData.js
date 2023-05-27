export function getFormData(typeId) {
  switch (typeId) {
    case 1:
      return {
        id: 'form_1678066387210',
        name: '请假',
        items: [
          {
            id: 'radio_1678066617641',
            type: 'radio',
            title: '请假类型',
            description: '请假类型',
            placeholder: '请选择',
            validate: {
              required: true
            },
            layout: 'vertical',
            options: [{
              id: 'radio_1678066617641_1',
              label: '事假'
            },
            {
              id: 'radio_1678066617641_2',
              label: '病假'
            },
            {
              id: 'radio_1678066617641_3',
              label: '其他'
            }
            ]
          },
          {
            id: 'datetime_1678066860479',
            type: 'datetime',
            title: '开始时间',
            description: '开始时间',
            placeholder: '请选择',
            validate: {
              required: true
            }
          },
          {
            id: 'datetime_1678066904382',
            type: 'datetime',
            title: '结束时间',
            description: '结束时间',
            placeholder: '请选择',
            validate: {
              required: true
            }
          },
          {
            id: 'number_1678066505587',
            type: 'number',
            title: '请假时长',
            description: '请假时长',
            placeholder: '请假时长',
            validate: {
              required: true
            },
            format: {
              comma: true
            }
          },
          {
            id: 'radio_1678067081849',
            type: 'radio',
            title: '需要离校',
            description: '需要离校',
            placeholder: '请选择',
            validate: {
              required: true
            },
            layout: 'vertical',
            options: [{
              id: 'radio_1678067081849_1',
              label: '是'
            },
            {
              id: 'radio_1678067081849_2',
              label: '否'
            }
            ]
          },
          {
            id: 'textarea_1678066446440',
            type: 'textarea',
            title: '请假原因',
            description: '请假原因',
            placeholder: '请输入请假原因',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 100,
                errorMessage: '文本长度需要在0到300之间'
              }
            }
          },
          {
            id: 'image_1677554503371',
            type: 'image',
            title: '上传图片(家长签字记录并注明外出目的地)',
            description: '上传图片',
            placeholder: '请选择',
            validate: {
              required: true,
              count: {
                min: 0,
                max: 9,
                errorMessage: '最多上传4张图片'
              }
            },
            camera: true
          }
        ]
      }
    case 2:
      return {
        id: 'form_1678501402777',
        name: '离校登记',
        items: [
          {
            id: 'datetime_1678501377756',
            type: 'datetime',
            title: '离校时间',
            description: '开始时间',
            placeholder: '请选择',
            validate: {
              required: true
            }
          },
          {
            id: 'datetime_1678501430875',
            type: 'datetime',
            title: '返校时间',
            description: '结束时间',
            placeholder: '请选择',
            validate: {
              required: true
            }
          },
          {
            id: 'number_1678501448009',
            type: 'number',
            title: '离校时长',
            description: '离校时长',
            placeholder: '请假时长',
            validate: {
              required: true
            },
            format: {
              comma: true
            }
          },
          {
            id: 'radio_1678501490163',
            type: 'radio',
            title: '是否回家',
            description: '是否回家',
            placeholder: '请选择',
            validate: {
              required: true
            },
            layout: 'vertical',
            options: [{
              id: 'radio_1678501490163_1',
              label: '是'
            },
            {
              id: 'radio_1678501490163_2',
              label: '否'
            }
            ]
          },
          {
            id: 'address_1678501448009',
            type: 'address',
            title: '离校目的地',
            description: '离校目的地',
            placeholder: '离校目的地',
            validate: {
              required: true
            },
            format: {
              detail: true
            }
          },
          {
            id: 'textarea_1678501679555',
            type: 'textarea',
            title: '详细地址',
            description: '详细地址',
            placeholder: '请输入目的地详细地址',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 100,
                errorMessage: '文本长度需要在0到300之间'
              }
            }
          },
          {
            id: 'address_1678501722574',
            type: 'address',
            title: '家庭住址',
            description: '家庭住址',
            placeholder: '家庭住址',
            validate: {
              required: true
            },
            format: {
              detail: true
            }
          },
          {
            id: 'textarea_1678501782054',
            type: 'textarea',
            title: '详细地址',
            description: '详细地址',
            placeholder: '请输入家庭详细地址',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 100,
                errorMessage: '文本长度需要在0到300之间'
              }
            }
          },
          {
            id: 'input_1678501833686',
            type: 'input',
            title: '应急联系人',
            description: '应急联系人',
            placeholder: '请输入应急联系人',
            validate: {
              required: true
            }
          },
          {
            id: 'input_1678502018283',
            type: 'input',
            title: '应急联系人电话',
            description: '应急联系人电话',
            placeholder: '请输入应急联系人电话',
            validate: {
              required: true,
              pattern: {
                type: 'cellphone',
                errorMessage: '请输入手机号'
              }
            }
          },
          {
            id: 'radio_1678502090953',
            type: 'radio',
            title: '离校交通方式',
            description: '请选择',
            placeholder: '请选择',
            validate: {
              required: true
            },
            layout: 'vertical',
            options: [{
              id: 'radio_1678502090953_1',
              label: '自驾'
            },
            {
              id: 'radio_1678502090953_2',
              label: '火车'
            },
            {
              id: 'radio_1678502090953_3',
              label: '客车'
            },
            {
              id: 'radio_1678502090953_4',
              label: '飞机'
            }
            ]
          },
          {
            id: 'input_1678502306811',
            type: 'input',
            title: '离校车次/航班号',
            description: '离校车次/航班号',
            placeholder: '请输入离校车次/航班号',
            validate: {
              required: true
            }
          },
          {
            id: 'textarea_1678502378328',
            type: 'textarea',
            title: '申请原因',
            description: '申请原因',
            placeholder: '请输入申请原因',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 100,
                errorMessage: '文本长度需要在0到300之间'
              }
            }
          },
          {
            id: 'image_1677554503371',
            type: 'image',
            title: '上传图片',
            description: '上传图片',
            placeholder: '请选择',
            validate: {
              required: true,
              count: {
                min: 0,
                max: 9,
                errorMessage: '最多上传4张图片'
              }
            },
            camera: true
          }
        ]
      }
    case 3:
      return {
        id: 'form_1678171829998',
        name: '学生证补办申请',
        items: [
          {
            id: 'input_1678171931681',
            type: 'input',
            title: '学生证号',
            description: '请输入',
            placeholder: '请输入',
            validate: {
              required: true
            }
          },
          {
            id: 'input_1678171987973',
            type: 'input',
            title: '乘车区间',
            description: '请输入',
            placeholder: '请输入',
            validate: {
              required: true
            }
          },
          {
            id: 'textarea_1678172036653',
            type: 'textarea',
            title: '申请理由',
            description: '请输入',
            placeholder: '请输入申请补办理由',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 300,
                errorMessage: '文本长度需要在0到300之间'
              }
            }
          }
        ]
      }
    case 4:
      return {
        id: 'form_1678172145830',
        name: '走读申请',
        items: [
          {
            id: 'datetime_1678172316349',
            type: 'datetime',
            title: '开始时间',
            description: '开始时间',
            placeholder: '请选择',
            validate: {
              required: true
            }
          },
          {
            id: 'datetime_1678172324985',
            type: 'datetime',
            title: '结束时间',
            description: '结束时间',
            placeholder: '请选择',
            validate: {
              required: true
            }
          },
          {
            id: 'number_1678066505587',
            type: 'number',
            title: '走读时长',
            description: '走读时长',
            placeholder: '走读时长',
            validate: {
              required: true
            },
            format: {
              comma: true
            }
          },
          {
            id: 'radio_1678172334102',
            type: 'radio',
            title: '是否退宿',
            description: '是否退宿',
            placeholder: '请选择',
            validate: {
              required: true
            },
            layout: 'vertical',
            options: [{
              id: 'radio_1678172334102_1',
              label: '是'
            },
            {
              id: 'radio_1678172334102_2',
              label: '否'
            }
            ]
          },
          {
            id: 'radio_1678172520979',
            type: 'radio',
            title: '走读交通方式',
            description: '走读交通方式',
            placeholder: '请选择',
            validate: {
              required: true
            },
            layout: 'vertical',
            options: [{
              id: 'radio_1678172520979_1',
              label: '自行车'
            },
            {
              id: 'radio_1678172520979_2',
              label: '电动车'
            },
            {
              id: 'radio_1678172520979_3',
              label: '公交'
            },
            {
              id: 'radio_1678172520979_4',
              label: '其他'
            }
            ]
          },
          {
            id: 'input_1678172625770',
            type: 'input',
            title: '居住详细地址',
            description: '请输入',
            placeholder: '请输入',
            validate: {
              required: true
            }
          },
          {
            id: 'textarea_1678172656687',
            type: 'textarea',
            title: '走读原因',
            description: '走读原因',
            placeholder: '请输入走读原因',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 100,
                errorMessage: '文本长度需要在0到300之间'
              }
            }
          },
          {
            id: 'image_1678172696328',
            type: 'image',
            title: '上传图片(家长和本人签字承诺书)',
            description: '上传图片',
            placeholder: '请选择',
            validate: {
              required: true,
              count: {
                min: 0,
                max: 3,
                errorMessage: '最多上传4张图片'
              }
            },
            camera: true
          }
        ]
      }
    case 5:
      return {
        id: 'form_1678172873114',
        name: '租房申请',
        items: [
          {
            id: 'datetime_1678172886847',
            type: 'datetime',
            title: '开始时间',
            description: '开始时间',
            placeholder: '请选择',
            validate: {
              required: true
            }
          },
          {
            id: 'datetime_1678172896391',
            type: 'datetime',
            title: '结束时间',
            description: '结束时间',
            placeholder: '请选择',
            validate: {
              required: true
            }
          },
          {
            id: 'number_1678172905721',
            type: 'number',
            title: '租房时长',
            description: '租房时长',
            placeholder: '租房时长',
            validate: {
              required: true
            },
            format: {
              comma: true
            }
          },
          {
            id: 'radio_1678172941337',
            type: 'radio',
            title: '租房地址',
            description: '租房地址',
            placeholder: '请选择',
            validate: {
              required: true
            },
            layout: 'vertical',
            options: [{
              id: 'radio_1678172941337_1',
              label: '校内租房'
            },
            {
              id: 'radio_1678172941337_2',
              label: '校外租房'
            }
            ]
          },
          {
            id: 'radio_1678173055088',
            type: 'radio',
            title: '是否退宿',
            description: '是否退宿',
            placeholder: '请选择',
            validate: {
              required: true
            },
            layout: 'vertical',
            options: [{
              id: 'radio_1678173055088_1',
              label: '是'
            },
            {
              id: 'radio_1678173055088_2',
              label: '否'
            }
            ]
          },
          {
            id: 'input_1678173071811',
            type: 'input',
            title: '租房详细地址',
            description: '请输入',
            placeholder: '请输入',
            validate: {
              required: true
            }
          },
          {
            id: 'textarea_1678173103388',
            type: 'textarea',
            title: '租房原因',
            description: '租房原因',
            placeholder: '请输入租房原因',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 100,
                errorMessage: '文本长度需要在0到300之间'
              }
            }
          },
          {
            id: 'image_1678173192466',
            type: 'image',
            title: '上传图片(本人、家长、房东签字的承诺书)',
            description: '上传图片',
            placeholder: '请选择',
            validate: {
              required: true,
              count: {
                min: 0,
                max: 3,
                errorMessage: '最多上传4张图片'
              }
            },
            camera: true
          }
        ]
      }
    case 6:
      return {
        id: 'form_1678501402777',
        name: '离校登记',
        items: [
          {
            id: 'datetime_1678501377756',
            type: 'datetime',
            title: '离校时间',
            description: '开始时间',
            placeholder: '请选择',
            validate: {
              required: true
            }
          },
          {
            id: 'datetime_1678501430875',
            type: 'datetime',
            title: '返校时间',
            description: '结束时间',
            placeholder: '请选择',
            validate: {
              required: true
            }
          },
          {
            id: 'number_1678501448009',
            type: 'number',
            title: '离校时长',
            description: '离校时长',
            placeholder: '请假时长',
            validate: {
              required: true
            },
            format: {
              comma: true
            }
          },
          {
            id: 'radio_1678501490163',
            type: 'radio',
            title: '是否回家',
            description: '是否回家',
            placeholder: '请选择',
            validate: {
              required: true
            },
            layout: 'vertical',
            options: [{
              id: 'radio_1678501490163_1',
              label: '是'
            },
            {
              id: 'radio_1678501490163_2',
              label: '否'
            }
            ]
          },
          {
            id: 'address_1678501448009',
            type: 'address',
            title: '离校目的地',
            description: '离校目的地',
            placeholder: '离校目的地',
            validate: {
              required: true
            },
            format: {
              detail: true
            }
          },
          {
            id: 'textarea_1678501679555',
            type: 'textarea',
            title: '详细地址',
            description: '详细地址',
            placeholder: '请输入目的地详细地址',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 100,
                errorMessage: '文本长度需要在0到300之间'
              }
            }
          },
          {
            id: 'address_1678501722574',
            type: 'address',
            title: '家庭住址',
            description: '家庭住址',
            placeholder: '家庭住址',
            validate: {
              required: true
            },
            format: {
              detail: true
            }
          },
          {
            id: 'textarea_1678501782054',
            type: 'textarea',
            title: '详细地址',
            description: '详细地址',
            placeholder: '请输入家庭详细地址',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 100,
                errorMessage: '文本长度需要在0到300之间'
              }
            }
          },
          {
            id: 'input_1678501833686',
            type: 'input',
            title: '应急联系人',
            description: '应急联系人',
            placeholder: '请输入应急联系人',
            validate: {
              required: true
            }
          },
          {
            id: 'input_1678502018283',
            type: 'input',
            title: '应急联系人电话',
            description: '应急联系人电话',
            placeholder: '请输入应急联系人电话',
            validate: {
              required: true,
              pattern: {
                type: 'cellphone',
                errorMessage: '请输入手机号'
              }
            }
          },
          {
            id: 'radio_1678502090953',
            type: 'radio',
            title: '离校交通方式',
            description: '请选择',
            placeholder: '请选择',
            validate: {
              required: true
            },
            layout: 'vertical',
            options: [{
              id: 'radio_1678502090953_1',
              label: '自驾'
            },
            {
              id: 'radio_1678502090953_2',
              label: '火车'
            },
            {
              id: 'radio_1678502090953_3',
              label: '客车'
            },
            {
              id: 'radio_1678502090953_4',
              label: '飞机'
            }
            ]
          },
          {
            id: 'input_1678502306811',
            type: 'input',
            title: '离校车次/航班号',
            description: '离校车次/航班号',
            placeholder: '请输入离校车次/航班号',
            validate: {
              required: true
            }
          },
          {
            id: 'textarea_1678502378328',
            type: 'textarea',
            title: '申请原因',
            description: '申请原因',
            placeholder: '请输入申请原因',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 100,
                errorMessage: '文本长度需要在0到300之间'
              }
            }
          },
          {
            id: 'image_1678503454137',
            type: 'image',
            title: '上传图片',
            description: '上传图片',
            placeholder: '请选择',
            validate: {
              required: true,
              count: {
                min: 0,
                max: 9,
                errorMessage: '最多上传4张图片'
              }
            },
            camera: true
          }
        ]
      }
    case 7:
      return {
        id: 'form_1678503185686',
        name: '返校登记',
        items: [
          {
            id: 'datetime_1678503247796',
            type: 'datetime',
            title: '返校出发时间',
            description: '返校出发时间',
            placeholder: '请选择',
            validate: {
              required: true
            }
          },
          {
            id: 'datetime_1678503260763',
            type: 'datetime',
            title: '返校到达时间',
            description: '返校到达时间',
            placeholder: '请选择',
            validate: {
              required: true
            }
          },
          {
            id: 'address_1678503318514',
            type: 'address',
            title: '出发地',
            description: '离校目的地',
            placeholder: '离校目的地',
            validate: {
              required: true
            },
            format: {
              detail: true
            }
          },
          {
            id: 'textarea_1678503332208',
            type: 'textarea',
            title: '详细地址',
            description: '详细地址',
            placeholder: '请输入出发地详细地址',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 100,
                errorMessage: '文本长度需要在0到300之间'
              }
            }
          },
          {
            id: 'input_1678503361870',
            type: 'input',
            title: '应急联系人',
            description: '应急联系人',
            placeholder: '请输入应急联系人',
            validate: {
              required: true
            }
          },
          {
            id: 'input_1678503368039',
            type: 'input',
            title: '应急联系人电话',
            description: '应急联系人电话',
            placeholder: '请输入应急联系人电话',
            validate: {
              required: true,
              pattern: {
                type: 'cellphone',
                errorMessage: '请输入手机号'
              }
            }
          },
          {
            id: 'radio_1678503386179',
            type: 'radio',
            title: '返校交通方式',
            description: '请选择',
            placeholder: '请选择',
            validate: {
              required: true
            },
            layout: 'vertical',
            options: [{
              id: 'radio_1678503386179_1',
              label: '自驾'
            },
            {
              id: 'radio_1678503386179_2',
              label: '火车'
            },
            {
              id: 'radio_1678503386179_3',
              label: '客车'
            },
            {
              id: 'radio_1678503386179_4',
              label: '飞机'
            }
            ]
          },
          {
            id: 'input_1678503411856',
            type: 'input',
            title: '离校车次/航班号',
            description: '离校车次/航班号',
            placeholder: '请输入离校车次/航班号',
            validate: {
              required: true
            }
          },
          {
            id: 'textarea_1678503418770',
            type: 'textarea',
            title: '申请原因',
            description: '申请原因',
            placeholder: '请输入申请原因',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 100,
                errorMessage: '文本长度需要在0到300之间'
              }
            }
          },
          {
            id: 'image_1678503437742',
            type: 'image',
            title: '上传图片',
            description: '上传图片',
            placeholder: '请选择',
            validate: {
              required: true,
              count: {
                min: 0,
                max: 9,
                errorMessage: '最多上传4张图片'
              }
            },
            camera: true
          }
        ]
      }
    case 8:
      return {
        id: 'form_1628503185686',
        name: '销假申请',
        items: [
          {
            id: 'image_1678503437742',
            type: 'image',
            title: '上传图片',
            description: '上传图片',
            placeholder: '请选择',
            validate: {
              required: true,
              count: {
                min: 0,
                max: 4,
                errorMessage: '最多上传4张图片'
              }
            },
            camera: true
          }
        ]
      }
    case 9:
      return {
        id: 'form_1228503185686',
        name: '退学申请',
        items: [
          {
            id: 'input_1378503361870',
            type: 'input',
            title: '籍贯',
            description: '籍贯',
            placeholder: '请输入籍贯',
            validate: {
              required: true
            }
          },
          {
            id: 'date_1678523260763',
            type: 'date',
            title: '出生年月',
            description: '出生年月',
            placeholder: '请选择',
            validate: {
              required: true
            }
          },
          {
            id: 'input_1368503361870',
            type: 'input',
            title: '退学类别',
            description: '退学类别',
            placeholder: '请输入退学类别',
            validate: {
              required: true
            }
          },
          {
            id: 'input_1363503361870',
            type: 'input',
            title: '住址',
            description: '住址',
            placeholder: '住址',
            validate: {
              required: true
            }
          },
          {
            id: 'input_1363513361870',
            type: 'input',
            title: '联系电话',
            description: '联系电话',
            placeholder: '联系电话',
            validate: {
              required: true
            }
          },
          {
            id: 'textarea_1698503418770',
            type: 'textarea',
            title: '退学原因',
            description: '退学原因',
            placeholder: '请输入退学原因',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 100,
                errorMessage: '文本长度需要在0到100之间'
              }
            }
          },
          {
            id: 'image_1278503437742',
            type: 'image',
            title: '上传图片(家长签字、校医院签字的退学呈报表)',
            description: '上传图片',
            placeholder: '请选择',
            validate: {
              required: true,
              count: {
                min: 0,
                max: 4,
                errorMessage: '最多上传4张图片'
              }
            },
            camera: true
          }
        ]
      }
    case 10:
      return {
        id: 'form_1328503185686',
        name: '休学申请',
        items: [
          {
            id: 'input_1378203361870',
            type: 'input',
            title: '申请类别',
            description: '申请类别',
            placeholder: '请输入申请类别',
            validate: {
              required: true
            }
          },
          {
            id: 'radio_1628503386179',
            type: 'radio',
            title: '是否申请退宿舍',
            description: '请选择',
            placeholder: '请选择',
            validate: {
              required: true
            },
            layout: 'vertical',
            options: [{
              id: 'radio_1628503386179_1',
              label: '是'
            },
            {
              id: 'radio_1628503386179_2',
              label: '否'
            }
            ]
          },
          {
            id: 'input_1168503361870',
            type: 'input',
            title: '学生手机号',
            description: '学生手机号',
            placeholder: '请输入学生手机号',
            validate: {
              required: true
            }
          },
          {
            id: 'input_1343503361870',
            type: 'input',
            title: '家长姓名',
            description: '家长姓名',
            placeholder: '家长姓名',
            validate: {
              required: true
            }
          },
          {
            id: 'input_1323513361870',
            type: 'input',
            title: '家长联系方式',
            description: '家长联系方式',
            placeholder: '家长联系方式',
            validate: {
              required: true
            }
          },
          {
            id: 'textarea_1698503418770',
            type: 'textarea',
            title: '休学原因',
            description: '休学原因',
            placeholder: '请输入休学原因',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 100,
                errorMessage: '文本长度需要在0到100之间'
              }
            }
          },
          {
            id: 'image_1378503437742',
            type: 'image',
            title: '上传图片(若属身体原因者，需上传校医院签字文件)',
            description: '上传图片',
            placeholder: '请选择',
            validate: {
              required: true,
              count: {
                min: 0,
                max: 4,
                errorMessage: '最多上传4张图片'
              }
            },
            camera: true
          }
        ]
      }
    case 11:
      return {
        id: 'form_1428503185686',
        name: '复学申请',
        items: [
          {
            id: 'input_1374203361870',
            type: 'input',
            title: '学生手机号',
            description: '学生手机号',
            placeholder: '请输入学生手机号',
            validate: {
              required: true
            }
          },
          {
            id: 'input_1343503361871',
            type: 'input',
            title: '家长姓名',
            description: '家长姓名',
            placeholder: '家长姓名',
            validate: {
              required: true
            }
          },
          {
            id: 'input_1343503361871',
            type: 'input',
            title: '家长联系方式',
            description: '家长联系方式',
            placeholder: '家长联系方式',
            validate: {
              required: true
            }
          },
          {
            id: 'input_1323523361870',
            type: 'input',
            title: '复学后编入班级',
            description: '复学后编入班级',
            placeholder: '复学后编入班级',
            validate: {
              required: true
            }
          },
          {
            id: 'radio_1623503386179',
            type: 'radio',
            title: '复学是否申请调宿舍',
            description: '请选择',
            placeholder: '请选择',
            validate: {
              required: true
            },
            layout: 'vertical',
            options: [{
              id: 'radio_1623503386179_1',
              label: '是'
            },
            {
              id: 'radio_1623503386179_2',
              label: '否'
            }
            ]
          },
          {
            id: 'textarea_1698503418770',
            type: 'textarea',
            title: '复学原因',
            description: '复学原因',
            placeholder: '请输入复学原因',
            validate: {
              required: true,
              length: {
                min: 0,
                max: 100,
                errorMessage: '文本长度需要在0到100之间'
              }
            }
          },
          {
            id: 'image_1478503437742',
            type: 'image',
            title: '上传图片(若属身体原因者，需上传校医院签字文件)',
            description: '上传图片',
            placeholder: '请选择',
            validate: {
              required: true,
              count: {
                min: 0,
                max: 4,
                errorMessage: '最多上传4张图片'
              }
            },
            camera: true
          }
        ]
      }
  }
}
