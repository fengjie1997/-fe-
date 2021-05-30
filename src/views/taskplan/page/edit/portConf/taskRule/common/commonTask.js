import i18n from '@/lang'
// 公共规则
import { fixedTimeSettingRule } from './setting/fixedTimeSetting.js'
import { timeWindowSettingRule } from './setting/timeWindowSetting.js'
import { networkLockSettingRule } from './setting/networkLockSetting.js'
import { tcpipCaptureSettingRule } from './setting/tcpipCaptureSetting.js'
import { networkConnectionSettingRule } from './setting/networkConnectionSetting'
// 任务节点模板
var commonTask = [
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider><label>基本信息</label></el-divider>'
  },
  {
    type: 'hidden',
    field: 'isCheck',
    value: true
  },
  {
    type: 'input',
    field: 'taskName',
    title: i18n.t('taskPlan.label.taskName'),
    value: 'taskName',
    col: {
      span: 13,
      xs: 24
    },
    validate: [{
      required: true,
      message: '请填写任务名称',
      trigger: 'blur'
    }]
  },
  {
    type: 'switch',
    title: '循环执行',
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
        open: '是',
        close: '否'
      }
    }
  },
  {
    type: 'InputNumber',
    field: 'taskSequence',
    title: '执行顺序',
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
    value: 1,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'interval',
    title: i18n.t('taskPlan.label.testInterval'),
    value: 15000,
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
    field: 'failInterval',
    title: '失败间隔(s)',
    value: 15,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'waitTime',
    title: '等待时长(s)',
    value: 0,
    col: {
      span: 13,
      xs: 24
    },
    props: {
      min: 0
    }
  }
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

