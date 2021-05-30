import i18n from '@/lang'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
export const basic = [
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
        open: i18n.t('taskPlan.label.true'),
        close: i18n.t('taskPlan.label.false')
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
