import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import i18n from '@/lang'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const rules = [
  // 测试模式
  {
    type: 'select',
    field: 'psCallMode',
    title: i18n.t('taskPlan.voice.testType'),
    value: getDictByLanguage('PSCallMode')[0].value,
    options: getDictByLanguage('PSCallMode'),
    col: {
      span: 12,
      xs: 12
    }
  },
  // 结束条件
  {
    type: 'select',
    field: 'endCondition',
    title: i18n.t('taskPlan.mftpDown.endCondition'),
    value: getDictByLanguage('mhttpdownEndCondition')[0].value,
    options: getDictByLanguage('mhttpdownEndCondition'),
    col: {
      span: 12,
      xs: 12
    }
  },
  // 上传超时时间-老平台无
  // {
  //   type: 'InputNumber',
  //   field: 'uploadTimeout',
  //   title: i18n.t('taskPlan.ftpDownload.downloadTimeout'),
  //   value: 1.2,
  //   parse: (value) => {
  //     return getMillionSecond(value)
  //   },
  //   getMillionSecond: (value) => {
  //     return getSecond(value)
  //   },
  //   col: {
  //     span: 12,
  //     xs: 24
  //   },
  //   props: {
  //     min: 0
  //   }
  // },
  // 业务的时长
  {
    type: 'InputNumber',
    field: 'uploadDuration',
    title: i18n.t('taskPlan.ftpDownload.downloadDuration'),
    value: 300,
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  // 无流量超时
  {
    type: 'InputNumber',
    field: 'noDataTimeout',
    title: i18n.t('taskPlan.ftpUpload.noDataTimeout'),
    value: 60,
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 1
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  // 开始等待时间
  {
    type: 'InputNumber',
    field: 'waitTime',
    title: i18n.t('taskPlan.mftpDown.waitTime'),
    value: 3,
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  }
]

export { rules }
