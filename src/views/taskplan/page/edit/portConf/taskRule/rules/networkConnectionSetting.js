import { getDictByTagName } from '@/utils/dictCache.js'
export const networkConnectionSetting = [
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.enable'),
    field: 'isAvailable',
    value: true,
    col: {
      span: 8,
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
    type: 'switch',
    title: '启用WIFI',
    field: 'connectionUseWifi',
    value: false,
    col: {
      span: 8,
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
    type: 'switch',
    title: 'Detach策略',
    field: 'detachStrategy',
    value: false,
    col: {
      span: 8,
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
    type: 'select',
    field: 'connectionType',
    title: '拨号创建方式',
    value: getDictByTagName('ConnectionProtocol')[0].value,
    options: getDictByTagName('ConnectionProtocol'),
    col: {
      span: 12,
      xs: 12
    }
  },
  // { ConnectionType
  //   type: 'select',
  //   field: 'connectionProtocol',
  //   title: '拨号连接的协议类型',
  //   value: getDictByTagName('ConnectionProtocol')[0].value,
  //   options: getDictByTagName('ConnectionProtocol'),
  //   col: {
  //     span: 12,
  //     xs: 12
  //   }
  // },
  // {
  //   type: 'switch',
  //   title: 'Detach策略',
  //   field: 'detachStrategy',
  //   value: false,
  //   col: {
  //     span: 12,
  //     xs: 24
  //   },
  //   props: {
  //     'trueValue': true,
  //     'falseValue': false,
  //     slot: {
  //       open: '是',
  //       close: '否'
  //     }
  //   }
  // },
  // {
  //   type: 'select',
  //   field: 'detachStrategy',
  //   title: 'Detach策略',
  //   value: getDictByTagName('DetachStrategy')[0].value,
  //   options: getDictByTagName('DetachStrategy'),
  //   col: {
  //     span: 8,
  //     xs: 12
  //   }
  // },
  {
    type: 'select',
    field: 'connectionDisconnectStrategy',
    title: '拨号断开策略',
    value: getDictByTagName('ConnectionDisconnectStrategy')[0].value,
    options: getDictByTagName('ConnectionDisconnectStrategy'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'singleTimeout',
    title: '单次拨号命令超时',
    value: 0,
    col: {
      span: 6,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'reconnectCount',
    title: '最大重拨次数',
    value: 0,
    col: {
      span: 6,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'totalTimeout',
    title: '拨号总超时',
    value: 10,
    col: {
      span: 6,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'port',
    title: '设备MODEL端口',
    value: 0,
    col: {
      span: 6,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'switch',
    title: '每次断开拨号连接',
    field: 'discontEveryTime',
    value: false,
    col: {
      span: 6,
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
    type: 'input',
    field: 'modemFriendName',
    title: 'PPP拨号',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  }

]
