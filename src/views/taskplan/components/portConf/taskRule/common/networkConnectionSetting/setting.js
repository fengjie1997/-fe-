import Vue from 'vue'
import store from '@/store/index.js'
import { commonOptions } from '../common'
import { wifiConnectionList } from './listWifi'
import { createdConnectionList } from './listCreated'
import { selectedConnectionList } from './listSelected'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import i18n from '@/lang'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const networkConnectionSetting = [
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
        open: i18n.t('taskPlan.label.true'),
        close: i18n.t('taskPlan.label.false')
      }
    }
  },
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.enableWIFI'),
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
        open: i18n.t('taskPlan.label.true'),
        close: i18n.t('taskPlan.label.false')
      }
    }
  },
  {
    type: 'switch',
    title: i18n.t('taskPlan.form.detachStrategy'),
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
        open: i18n.t('taskPlan.label.true'),
        close: i18n.t('taskPlan.label.false')
      }
    }
  },
  {
    type: 'select',
    field: 'connectionType',
    title: i18n.t('taskPlan.form.dialCreationMethod'),
    value: getDictByLanguage('ConnectionProtocol')[0].value,
    options: getDictByLanguage('ConnectionProtocol'),
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
  //       open: i18n.t('taskPlan.label.true'),
  //       close: i18n.t('taskPlan.label.false')
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
    title: i18n.t('taskPlan.form.connectionDisconnectStrategy'),
    value: getDictByLanguage('ConnectionDisconnectStrategy')[0].value,
    options: getDictByLanguage('ConnectionDisconnectStrategy'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'singleTimeout',
    title: i18n.t('taskPlan.form.singleTimeout'),
    value: 0,
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
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
    title: i18n.t('taskPlan.form.reconnectCount'),
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
    title: i18n.t('taskPlan.form.totalTimeout'),
    value: 1,
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
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
    title: i18n.t('taskPlan.form.port'),
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
    title: i18n.t('taskPlan.form.discontEveryTime'),
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
        open: i18n.t('taskPlan.label.true'),
        close: i18n.t('taskPlan.label.false')
      }
    }
  },
  {
    type: 'input',
    field: 'modemFriendName',
    title: i18n.t('taskPlan.form.modemFriendName'),
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },

  {
    type: 'template',
    name: 'children',
    field: 'wifiConnectionList',
    col: { span: 24, xs: 24 },
    template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
    vm: new Vue({
      data: {
        modelForm: {},
        rule: wifiConnectionList,
        option: commonOptions
      }})
  },
  {
    type: 'template',
    name: 'children',
    field: 'selectedConnectionList',
    col: { span: 24, xs: 24 },
    template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
    vm: new Vue({
      data: {
        modelForm: {},
        rule: selectedConnectionList,
        option: commonOptions
      }})
  },
  {
    type: 'template',
    name: 'children',
    field: 'createdConnectionList',
    col: { span: 24, xs: 24 },
    template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
    vm: new Vue({
      data: {
        modelForm: {},
        rule: createdConnectionList,
        option: commonOptions
      }})
  }

]
// as rule
const networkConnectionSettingRule = {
  type: 'template',
  name: 'children',
  field: 'networkConnectionSetting',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: i18n.t('taskPlan.label.networkConnectionSettings'),
      active: ['1'],
      modelForm: {},
      rule: networkConnectionSetting,
      option: commonOptions
    },
    computed: {
      taskForm() {
        return store.state.testPlan.taskForm
      }
    },
    watch: {
      taskForm(taskForm) {
        if (taskForm !== null) {
          // console.log(typeof this.modelForm.setValue())
          console.log(this.modelForm)
          // Object.keys(taskForm).forEach(idx => {
          //   if (idx === 'networkConnectionSetting') {
          //     this.modelForm.setValue(store.state.testPlan.taskForm[idx])
          //   }
          // })
        }
      }
    }
  })
}
export { networkConnectionSetting, networkConnectionSettingRule }
