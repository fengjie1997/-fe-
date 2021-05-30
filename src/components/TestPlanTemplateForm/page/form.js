
import Vue from 'vue'
import { getCacheDict } from '@/utils/dictCache.js'

/**
 * 获取并替换字典属性名称
 * @param string name
 * @return obj
 */
function getDictByTagName(name) {
  if (getCacheDict(name) === null) {
    console.log(name)
    return []
  } else {
    const a = JSON.stringify(getCacheDict(name)).replace(/name/g, 'label') // JSON.parse()
    return JSON.parse(a.replace(/code/g, 'value'))
  }
}

// topForm name/recurrenctType
const topFormRule = [
  {
    type: 'input',
    field: 'name',
    title: '计划名称',
    props: { placeholder: '请输入计划名称', hidden: true },
    validate: [{
      required: true,
      message: '请输入计划名称',
      trigger: 'blur'
    }],
    col: { span: 20, xs: 24, classname: 'form-test' }
  },
  {
    type: 'select',
    field: 'recurrenctType',
    title: '执行周期',
    value: getDictByTagName('repeatType')['0'].value,
    options: getDictByTagName('repeatType'),
    col: {
      span: 8,
      xs: 24
    },
    emit: ['change'],
    emitPrefix: 'sct',
    validate: [{
      required: true,
      message: '请选择执行周期',
      trigger: 'change'
    }]
  }
]
// testFormRule
const testFormRule = [
  {
    type: 'datePicker',
    field: 'startTime',
    title: '开始时间',
    value: '',
    options: getDictByTagName('repeatType'),
    col: {
      span: 12,
      xs: 24
    },
    props: {
      'type': 'datetime',
      'format': 'yyyy-MM-dd HH:mm:ss'
    },
    validate: [{
      required: true,
      message: '请选择开始时间',
      trigger: 'blur'
    }]
  },
  {
    type: 'datePicker',
    field: 'endTime',
    title: '结束时间',
    col: {
      span: 6,
      xs: 24
    },
    props: {
      'type': 'datetime',
      'format': 'yyyy-MM-dd HH:mm:ss',
      'placeholder': '请选择结束时间'
    }
  },
  {
    type: 'select',
    field: 'testType',
    title: '测试类型',
    value: getDictByTagName('testType')['0'].value,
    options: getDictByTagName('testType'),
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: '请选择测试类型',
      trigger: 'change'
    }]
  },
  {
    type: 'select',
    field: 'testLevel',
    title: '测试级别',
    value: getDictByTagName('testLevel')['0'].value,
    options: getDictByTagName('testLevel'),
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: '请选择测试级别',
      trigger: 'change'
    }]
  },
  {
    type: 'select',
    field: 'testScenario',
    title: '测试场景',
    value: getDictByTagName('areaTag')['0'].value,
    options: getDictByTagName('areaTag'),
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: '请选择测试场景',
      trigger: 'change'
    }]
  },
  {
    type: 'select',
    field: 'timeZone',
    title: '测试时区',
    value: getDictByTagName('timeZone')['0'].value,
    options: getDictByTagName('timeZone'),
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: '请选择测试时区',
      trigger: 'change'
    }]
  }
]
const weekRule = {
  type: 'select',
  field: 'weektype',
  title: '选择星期',
  value: getDictByTagName('dateWeek')['0'].value,
  options: getDictByTagName('dateWeek'),
  col: {
    span: 8
  },
  props: {
    'multiple': true,
    'type': 'datetime',
    'format': 'yyyy-MM-dd HH:mm:ss'
  },
  validate: [{
    required: true,
    message: '请选择星期',
    trigger: 'blur'
  }
  ]
}
const multipleRule = {
  type: 'inputNumber',
  field: 'inputNumber',
  title: '天数',
  validate: [{
    required: true,
    message: '请输入天数',
    trigger: 'blur'
  }
  ],
  col: { span: 6, xs: 24 }
}
const customizeRule = {
  type: 'select',
  field: 'customize',
  title: '自定义日期',
  value: [],
  options: [],
  col: {
    span: 12,
    xs: 12
  },
  props: {
    'multiple': true,
    'type': 'datetime',
    'format': 'yyyy-MM-dd HH:mm:ss',
    'placeholder': ''
  },
  validate: [{
    required: true,
    message: '日期不能为空',
    trigger: 'change'
  }]
}
const customizePickerRule = {
  type: 'datePicker',
  field: 'PickDate',
  title: '',
  value: '',
  emit: ['change'],
  emitPrefix: 'picker',
  col: {
    span: 4,
    labelWidth: 0,
    xs: 12
  },
  props: {
    'placeholder': '请选择日期',
    'type': 'date',
    'format': 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd'
  }
}
// transferForm
const transferFormRule = [
  {
    type: 'select',
    field: 'testType',
    title: '数据传输方式',
    value: getDictByTagName('dataTransferType')['0'].value,
    options: getDictByTagName('dataTransferType'),
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'select',
    field: 'testLevel',
    title: '回传模块端口',
    value: getDictByTagName('transferPort')['0'].value,
    options: getDictByTagName('transferPort'),
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: '请选择测试级别',
      trigger: 'change'
    }]
  }
]
// modemFormRule
const modemFormRule = [
  {
    type: 'input',
    field: 'mobilephone',
    title: '电话号码',
    value: '',
    col: {
      span: 8,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'smsmobisle',
    title: '短信中心号码',
    value: '',
    col: {
      span: 8,
      xs: 24,
      push: 4
    }
  }
]
// 高级设置
const highSettingFormRule = [
  // docSeparate
  [
    {
      type: 'switch',
      title: '分端口保存',
      field: 'saveport',
      value: '0',
      col: {
        span: 8,
        xs: 24
      },
      props: {
        'trueValue': '1',
        'falseValue': '0',
        slot: {
          open: '是',
          close: '否'
        }
      }
    },
    {
      type: 'select',
      field: 'sparatetype',
      title: '切换类型',
      value: getDictByTagName('switchingType')['0'].value,
      options: getDictByTagName('switchingType'),
      emit: ['change'],
      emitPrefix: 'sst',
      col: {
        span: 8,
        xs: 24
      }
    },
    {
      type: 'InputNumber',
      field: 'intDocSparate',
      title: '时间(min)/大小(MB)',
      value: 60,
      props: {
        min: 0
      },
      col: {
        span: 8,
        xs: 24,
        labelWidth: 150
      }
    }

  ],
  // 文件保存
  [
    {
      type: 'switch',
      title: '保存RCU文件',
      field: 'saveport2',
      value: '0',
      col: {
        span: 8,
        xs: 24
      },
      props: {
        'trueValue': '1',
        'falseValue': '0',
        slot: {
          open: '是',
          close: '否'
        }
      }
    },
    {
      type: 'switch',
      title: '保存原始RCU文件',
      field: 'saveport22',
      value: '0',
      col: {
        span: 8,
        xs: 24,
        labelWidth: 135
      },
      props: {
        'trueValue': '1',
        'falseValue': '0',
        slot: {
          open: '是',
          close: '否'
        }
      }
    },
    {
      type: 'switch',
      title: '保存DCF文件',
      field: 'saveport332',
      value: '0',
      col: {
        span: 8,
        xs: 24
      },
      props: {
        'trueValue': '1',
        'falseValue': '0',
        slot: {
          open: '是',
          close: '否'
        }
      }
    },
    {
      type: 'switch',
      title: '保存CTI文件',
      field: 'savepo332rt',
      value: '0',
      col: {
        span: 8,
        xs: 24
      },
      props: {
        'trueValue': '1',
        'falseValue': '0',
        slot: {
          open: '是',
          close: '否'
        }
      }
    },
    {
      type: 'switch',
      title: '保存DTlog文件',
      field: 'save3321port',
      value: '0',
      col: {
        span: 8,
        xs: 24
      },
      props: {
        'trueValue': '1',
        'falseValue': '0',
        slot: {
          open: '是',
          close: '否'
        }
      }
    },
    {
      type: 'switch',
      title: '保存CU文件',
      field: 'savep43ort',
      value: '0',
      col: {
        span: 8,
        xs: 24
      },
      props: {
        'trueValue': '1',
        'falseValue': '0',
        slot: {
          open: '是',
          close: '否'
        }
      }
    }
  ],
  // docUpload
  [
    {
      type: 'select',
      field: 'recurrenctsType',
      title: '上传文件类型',
      value: getDictByTagName('uploadDocType')['0'].value,
      options: getDictByTagName('uploadDocType'),
      col: {
        span: 6,
        xs: 24
      }
    },
    {
      type: 'switch',
      title: '上传PCAP文件',
      field: 'sfsd',
      value: '0',
      col: {
        span: 6,
        xs: 24
      },
      props: {
        'trueValue': '1',
        'falseValue': '0',
        slot: {
          open: '是',
          close: '否'
        }
      }
    },
    {
      type: 'switch',
      title: '上传MOS文件',
      field: 'ssss',
      value: '0',
      col: {
        span: 6,
        xs: 24
      },
      props: {
        'trueValue': '1',
        'falseValue': '0',
        slot: {
          open: '是',
          close: '否'
        }
      }
    },
    {
      type: 'switch',
      title: '上传文件是否压缩传输',
      field: 'tttt',
      value: '0',
      col: {
        span: 6,
        xs: 24,
        labelWidth: 135
      },
      props: {
        'trueValue': '1',
        'falseValue': '0',
        slot: {
          open: '是',
          close: '否'
        }
      }
    }
  ],
  // areaControl
  [
    {
      type: 'switch',
      title: '使用区域控制',
      field: 'areaControl',
      value: '0',
      col: {
        span: 6,
        xs: 24
      },
      props: {
        'trueValue': '1',
        'falseValue': '0',
        disabled: true,
        slot: {
          open: '是',
          close: '否'
        }
      }
    },
    {
      type: 'template',
      template: '<el-button type="primary" :disabled=disabled>{{text}}</el-button>',
      vm: new Vue({
        data: {
          disabled: true,
          type: 'primary',
          text: '编辑区域'
        }
      }),
      col: {
        span: 6,
        xs: 24,
        labelWidth: 135
      }
    },
    {
      type: 'select',
      field: 'testTsype',
      title: '离开指定区域后行为',
      value: getDictByTagName('afterAwayAction')['0'].value,
      options: getDictByTagName('afterAwayAction'),
      props: {
        disabled: true
      },
      col: {
        span: 12,
        xs: 24,
        labelWidth: 135
      }
    }
  ],
  // speedControl
  [
    {
      type: 'switch',
      title: '使用车速控制',
      field: 'areaControl',
      value: '0',
      col: {
        span: 12,
        xs: 24
      },
      props: {
        'trueValue': '1',
        'falseValue': '0',
        slot: {
          open: '是',
          close: '否'
        }
      }
    },
    {
      type: 'select',
      field: 'testTssype',
      title: '超出速率范围后行为',
      value: getDictByTagName('overRateAction')['0'].value,
      options: getDictByTagName('overRateAction'),
      col: {
        span: 12,
        xs: 24,
        labelWidth: 135
      }
    },
    {
      type: 'InputNumber',
      field: 'tsesstTsype',
      title: '最高时速(m/h)',
      value: 0,
      props: {
        min: 0
      },
      col: {
        span: 12, xs: 24, labelWidth: 160
      }
    },
    {
      type: 'InputNumber',
      field: 'tesstTsypse',
      title: '最高时速持续时间(min)',
      value: 0,
      props: {
        min: 0
      },
      col: {
        span: 12,
        xs: 24,
        labelWidth: 135
      }
    },
    {
      type: 'InputNumber',
      field: 'testTsypse',
      title: '最低时速(m/h)',
      value: 0,
      props: {
        min: 0
      },
      col: {
        span: 12,
        xs: 24,
        labelWidth: 135
      }
    },
    {
      type: 'InputNumber',
      field: 'tesstTsype',
      title: '最低时速持续时间(min)',
      value: 0,
      props: {
        min: 0
      },
      col: {
        span: 12,
        xs: 24,
        labelWidth: 135
      }
    }
  ],
  // otherForm
  [
    {
      type: 'input',
      field: 'name',
      title: '短信告警接收号码',
      props: { placeholder: '请输入', hidden: true },
      col: { span: 12, xs: 24 }
    },
    {
      type: 'select',
      field: 'testTsype',
      title: '开始测试选项',
      value: getDictByTagName('TestBeginOption')['0'].value,
      options: getDictByTagName('TestBeginOption'),
      col: {
        span: 12,
        xs: 24,
        labelWidth: 135
      }
    },
    {
      type: 'select',
      field: 'testTsype',
      title: '外部电源停止后，UPS选项',
      value: getDictByTagName('upsOptionAfterPowerCut')['0'].value,
      options: getDictByTagName('upsOptionAfterPowerCut'),
      col: {
        span: 8,
        xs: 24,
        labelWidth: 135
      }
    },
    {
      type: 'InputNumber',
      field: 'intDocSparaste',
      title: '指定时间(min)',
      value: 0,
      props: {
        min: 0
      },
      col: {
        span: 4,
        xs: 12
      }
    },
    {
      type: 'template',
      title: 'GPS静止行为:',
      field: 'gpsaction',
      template: '<div><el-input-number v-model="num" :min="0"></el-input-number> (s)后暂停测试</div>',
      vm: new Vue({
        data: {
          num: 0,
          text: '正在加载中'
        }
      })
    },
    {
      type: 'template',
      title: 'GPS丢失行为:',
      field: 'gpsactsion',
      template: '<div><el-input-number v-model="num" :min="0"></el-input-number> (s)后暂停测试；<el-input-number v-model="num2" :min="0"></el-input-number> (s)后发送告警</div>',
      vm: new Vue({
        data: {
          num: 0,
          num2: 5,
          text: '正在加载中'
        }
      })
    }

  ]
]
export { topFormRule, testFormRule, weekRule, multipleRule, customizeRule, customizePickerRule, transferFormRule, modemFormRule, highSettingFormRule }
