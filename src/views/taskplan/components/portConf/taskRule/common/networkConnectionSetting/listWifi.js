import Vue from 'vue'
import { commonOptions } from '../common'
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
    field: 'connectionType',
    title: i18n.t('taskPlan.label.dialCreate'),
    value: getDictByLanguage('Band')[0].value,
    options: getDictByLanguage('Band'),
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
    },
    props: {
      type: 'password'
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
    field: 'wifiConnectionInfos',
    value: [],
    col: { span: 24, xs: 24 },
    template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
    vm: new Vue({
      data: {
        modelForm: {},
        rule: rules,
        option: commonOptions
      }
    })
  }

]
export { wifiConnectionList }
