import Vue from 'vue'
import { commonOption } from '../commonOption'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import i18n from '@/lang'
const rules = [
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.useSet'),
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
    field: 'band',
    title: i18n.t('taskPlan.label.dialCreationMethod'),
    value: getDictByLanguage('Band')[0].value,
    options: getDictByLanguage('Band'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'apnName',
    title: 'apnName',
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
    },
    props: {
      type: 'password'
    }
  },
  {
    type: 'select',
    field: 'loginType',
    title: i18n.t('taskPlan.label.loginType'),
    value: getDictByLanguage('LoginType')[0].value,
    options: getDictByLanguage('LoginType'),
    col: {
      span: 12,
      xs: 12
    }
  },
  // 运营商
  {
    type: 'select',
    field: 'operator',
    title: i18n.t('analyze.label.operator'),
    value: getDictByLanguage('Operator')[0].value,
    options: getDictByLanguage('Operator'),
    col: {
      span: 12,
      xs: 24
    }
  },
  // 加密方式
  {
    type: 'select',
    field: 'encryptType',
    title: i18n.t('taskPlan.label.encryptType'),
    value: 'AutoScan',
    options: [{ label: 'AutoScan', value: 'AutoScan' }, { label: 'Open', value: 'Open' }, { label: 'WEP', value: 'WEP' }, { label: 'WPA', value: 'WPA' }, { label: 'WPA2', value: 'WPA2' }, { label: 'WPA&WPA2', value: 'WPA&WPA2' }],
    col: {
      span: 12,
      xs: 24
    }
  }
]
const wifiConnectionList = [
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{title}}</el-divider>',
    vm: new Vue({
      data: {
        title: i18n.t('taskPlan.label.dialNetwork')
      }})
  },
  {
    type: 'template',
    name: 'childrenArray',
    hasChildren: true,
    field: 'wifiConnectionInfos',
    value: [],
    col: { span: 24, xs: 24 },
    template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
    vm: new Vue({
      data: {
        modelForm: {},
        rule: rules,
        option: commonOption
      }})
  }
]
export { wifiConnectionList }
