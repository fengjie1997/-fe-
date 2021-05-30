import { getDictByTagName } from '@/utils/dictCache.js'
import i18n from '@/lang'
export const wifiConnectionList = [
  {
    type: 'switch',
    title: '是否使用该设置',
    field: 'isCheck',
    value: false,
    col: {
      span: 12,
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
    field: 'connectionType',
    title: '拨号创建方式',
    value: getDictByTagName('Band')[0].value,
    options: getDictByTagName('Band'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'apName',
    title: 'apName',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'username',
    title: 'username',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'password',
    title: 'password',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  }
]
