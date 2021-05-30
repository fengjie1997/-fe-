import { getDictByTagName } from '@/utils/dictCache.js'
import i18n from '@/lang'
export const tcpipCaptureSetting = [
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.enable'),
    field: 'isAvailable',
    value: false,
    col: {
      span: 8,
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
    type: 'select',
    field: 'captureMode',
    title: '抓包模式',
    value: getDictByTagName('CaptureMode')[0].value,
    options: getDictByTagName('CaptureMode'),
    col: {
      span: 8,
      xs: 12
    },
    validate: [{
      required: true,
      message: '请选择测试模式',
      trigger: 'change'
    }]
  },
  {
    type: 'select',
    field: 'fileSwitch',
    title: '抓包分割方式',
    value: getDictByTagName('FileSwitch')[0].value,
    options: getDictByTagName('FileSwitch'),
    col: {
      span: 8,
      xs: 12
    },
    validate: [{
      required: true,
      message: '请选择测试模式',
      trigger: 'change'
    }]
  }
]
