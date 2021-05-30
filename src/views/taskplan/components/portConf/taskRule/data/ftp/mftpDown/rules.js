// import Vue from 'vue'
// import { mftpDownConfigRule } from './mftpDownConfigRule'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import i18n from '@/lang'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
// import { commonOptions } from '../../common/common'
const rules = [
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
  {
    type: 'InputNumber',
    field: 'downloadTimeout',
    title: i18n.t('taskPlan.ftpDownload.downloadTimeout'),
    value: 1200,
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
  {
    type: 'InputNumber',
    field: 'downloadDuration',
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
      min: 0
    }
  },

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
    }
  },
  {
    type: 'input',
    field: 'saveDirectory',
    title: i18n.t('taskPlan.ftpDownload.saveDirectory'),
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  }
]

export { rules }
