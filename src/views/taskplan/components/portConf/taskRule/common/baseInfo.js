// import { getDictByTagName } from '@/utils/dictCache.js'
import i18n from '@/lang'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const timeWindowSetting = [
  {
    type: 'switch',
    title: i18n.t('taskPlan.form.isAvailable'),
    field: 'IsLockBand',
    xx: '11',
    value: false,
    col: {
      span: 24,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: i18n.t('taskPlan.label.true'),
        close: i18n.t('taskPlan.label.false')
      }
    }
  },
  {
    type: 'InputNumber',
    field: 'WindowSize',
    title: i18n.t('taskPlan.form.windowSize'),
    value: 20,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0
    },
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
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
    title: i18n.t('taskPlan.form.guardDuration'),
    value: 90,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0
    },
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    }
    // validate: [{
    //   required: true,
    //   message: '通话时长',
    //   trigger: 'blur'
    // }]
  },
  {
    type: 'InputNumber',
    field: 'duration',
    title: i18n.t('taskPlan.form.taskDuration'),
    value: 15,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0
    }
    // validate: [{
    //   required: true,
    //   message: '间隔时长',
    //   trigger: 'blur'
    // }]
  }
]
export { timeWindowSetting }
