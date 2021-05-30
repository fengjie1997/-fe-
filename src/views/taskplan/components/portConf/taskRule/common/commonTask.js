import i18n from '@/lang'
// 公共规则
import { fixedTimeSettingRule } from './setting/fixedTimeSetting.js'
import { timeWindowSettingRule } from './setting/timeWindowSetting.js'
import { networkLockSettingRule } from './setting/networkLockSetting.js'
import { tcpipCaptureSettingRule } from './setting/tcpipCaptureSetting.js'
import { networkConnectionSettingRule } from './setting/networkConnectionSetting'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
// 任务节点模板
var commonTask = [
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider><label>Base Info</label></el-divider>'
  },
  {
    type: 'hidden',
    field: 'isCheck',
    value: true
  },
  // 全局设置的模板button
  {
    type: 'input',
    field: 'template',
    title: i18n.t('taskPlan.label.templateName'),
    value: '',
    col: {
      span: 8,
      xs: 24
    }
  },
  {
    type: 'el-button',
    field: 'templateButton',
    children: [i18n.t('route.template')],
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    emit: ['click']
  },
  {
    type: 'input',
    field: 'taskName',
    title: i18n.t('weTest.taskName'),
    value: 'taskName',
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: i18n.t('analyze.placeholder.input'),
      trigger: 'blur'
    }]
  },
  {
    type: 'hidden',
    title: i18n.t('taskPlan.label.cycleExecutionOrNot'),
    field: 'infinite',
    value: false,
    col: {
      span: 11,
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
    type: 'hidden',
    field: 'taskSequence',
    title: i18n.t('taskPlan.commonTask.taskSequence'),
    value: 1,
    col: {
      span: 13,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'taskRepeatCount',
    title: i18n.t('taskPlan.commonTask.taskRepeatCount'),
    value: 10,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'hidden',
    field: 'interval',
    title: i18n.t('taskPlan.label.testInterval'),
    value: 15,
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    col: {
      span: 13,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'hidden',
    field: 'failInterval',
    title: i18n.t('taskPlan.label.failInterval'),
    value: 60,
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  }
  // {
  //   type: 'hidden',
  //   field: 'waitTime',
  //   title: i18n.t('taskPlan.label.waitDuration'),
  //   value: 0,
  //   parse: (value) => {
  //     return getMillionSecond(value)
  //   },
  //   reverseParse: (value) => {
  //     return getSecond(value)
  //   },
  //   col: {
  //     span: 13,
  //     xs: 24
  //   },
  //   props: {
  //     min: 0
  //   }
  // }
]
var taskType = {
  type: 'hidden',
  field: 'taskType',
  value: ''
}
// 组合
// , fixedTimeSettingRule, timeWindowSettingRule, networkConnectionSettingRule, tcpipCaptureSettingRule, networkLockSettingRule
commonTask.push(taskType, fixedTimeSettingRule, timeWindowSettingRule, networkConnectionSettingRule, networkLockSettingRule, tcpipCaptureSettingRule)

export { commonTask }

