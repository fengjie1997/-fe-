// import { getDictByTagName } from '@/utils/dictCache.js'
// import { getDictByTagName } from '@/utils/dictCache.js'
import i18n from '@/lang'
const ftpHostSetting = [
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.enable'),
    field: 'isCheck',
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
    type: 'switch',
    title: i18n.t('taskPlan.server.authentication'),
    field: 'IsAnonymous',
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
    type: 'InputNumber',
    field: 'port',
    title: '端口',
    value: 21,
    col: {
      span: 8,
      xs: 24
    }
  },
  // {
  //   type: 'select',
  //   field: 'transferMode',
  //   title: '传输模式',
  //   value: getDictByTagName('ftpdownloadConnectionMode')[0].value,
  //   options: getDictByTagName('ftpdownloadConnectionMode'),
  //   col: {
  //     span: 12,
  //     xs: 12
  //   }
  // },
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
    type: 'input',
    field: 'siteName',
    title: i18n.t('taskPlan.server.siteName'),
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'address',
    title: i18n.t('taskPlan.mftpDown.address'),
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },

  {
    type: 'input',
    field: 'username',
    title: 'Username',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'password',
    title: 'Password',
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    props: {
      type: 'password'
    }
  }

]
export { ftpHostSetting }
