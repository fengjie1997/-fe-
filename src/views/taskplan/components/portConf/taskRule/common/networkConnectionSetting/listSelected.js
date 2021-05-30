import Vue from 'vue'
import i18n from '@/lang'
import { commonOptions } from '../common'
const rules = [
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.useSet'),
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
        open: 'yes',
        close: 'no'
      }
    }
  },
  {
    type: 'input',
    field: 'connectionName',
    title: i18n.t('taskPlan.label.connectionName'),
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'apn',
    title: 'APN',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  }
]
const selectedConnectionList = [
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{title}}</el-divider>',
    vm: new Vue({
      data: {
        title: i18n.t('taskPlan.label.dialSelect')
      }})
  },
  {
    type: 'template',
    name: 'childrenArray',
    field: 'currentConnectionInfos',
    value: [],
    col: { span: 24, xs: 24 },
    template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
    vm: new Vue({
      data: {
        modelForm: {},
        rule: rules,
        option: commonOptions
      }})
  }

]
export { selectedConnectionList }
