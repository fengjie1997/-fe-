export const timeWindowSetting = [
  {
    type: 'switch',
    title: '启用时间窗设置',
    field: 'isAvailable',
    value: false,
    col: {
      span: 24,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: '是',
        close: '否'
      }
    }
  },
  {
    type: 'InputNumber',
    field: 'windowSize',
    title: '时间窗总时长',
    value: 20,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: '',
      trigger: 'blur'
    }]
  },
  {
    type: 'InputNumber',
    field: 'guardDuration',
    title: '保护时长',
    value: 90,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: '通话时长',
      trigger: 'blur'
    }]
  },
  {
    type: 'InputNumber',
    field: 'duration',
    title: '任务持续时长',
    value: 15,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: '间隔时长',
      trigger: 'blur'
    }]
  }
]
