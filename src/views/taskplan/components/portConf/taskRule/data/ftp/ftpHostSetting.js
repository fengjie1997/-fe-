// import { getDictByTagName } from '@/utils/dictCache.js'
// import { getDictByTagName } from '@/utils/dictCache.js'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import i18n from '@/lang'
const ftpHostSetting = [
  // 服务设置的模板select
  {
    type: 'select',
    field: 'templateHostSelect',
    title: i18n.t('route.template'),
    value: '',
    options: '',
    col: {
      span: 8,
      xs: 24
    },
    emit: ['change']
  },
  // 服务设置的模板button
  {
    type: 'el-button',
    field: 'templateHostButton',
    children: [i18n.t('route.template')],
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    emit: ['click']
  },
  // 地址
  {
    type: 'input',
    field: 'address',
    title: i18n.t('taskPlan.mftpDown.address'),
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  // 端口
  {
    type: 'InputNumber',
    field: 'port',
    title: i18n.t('uploadFileList.port'),
    value: 21,
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  // 匿名登录
  {
    type: 'switch',
    title: i18n.t('taskPlan.server.authentication'),
    field: 'isAnonymous',
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
    },
    emit: ['change']
  },
  // 用户名
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
  // 密码
  {
    type: 'input',
    field: 'password',
    title: 'password',
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    props: {
      type: 'password'
    }
  },
  // 连接模式
  {
    type: 'select',
    field: 'connectionMode',
    title: i18n.t('taskPlan.mftpDown.connectionMode'),
    value: 'Passive',
    options: [{ label: 'Passive', value: 'Passive' }, { label: 'Port', value: 'Port' }],
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'select',
    field: 'transferMode',
    title: i18n.t('taskPlan.mftpDown.transferMode'),
    value: getDictByLanguage('ftpdownloadConnectionMode')[0].value,
    options: getDictByLanguage('ftpdownloadConnectionMode'),
    col: {
      span: 12,
      xs: 24
    }
  },
  // {
  //   type: 'select',
  //   field: 'connectionMode',
  //   title: '连接模式',
  //   value: getDictByTagName('ftpdownloadTransferMode')[0].value,
  //   options: getDictByTagName('ftpdownloadTransferMode'),
  //   col: {
  //     span: 12,
  //     xs: 12
  //   }
  // },
  {
    type: 'hidden',
    field: 'siteName',
    title: i18n.t('taskPlan.server.siteName'),
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  // isCheck
  {
    type: 'hidden',
    title: i18n.t('taskPlan.label.enable'),
    field: 'isCheck',
    value: true,
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
  }
]
export { ftpHostSetting }
