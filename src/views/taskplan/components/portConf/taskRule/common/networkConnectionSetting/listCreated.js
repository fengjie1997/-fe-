import Vue from 'vue'
import { commonOptions } from '../common'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import i18n from '@/lang'
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
        close: 'yes'
      }
    }
  },
  {
    type: 'input',
    field: 'pppName',
    title: i18n.t('taskPlan.label.dialName'),
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'rasNumber',
    title: i18n.t('taskPlan.label.dialTel'),
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
    type: 'input',
    field: 'ulueRate',
    title: i18n.t('taskPlan.label.uplinkRequestRate'),
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'dlueRate',
    title: i18n.t('taskPlan.label.downlinkRequestRate'),
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'select',
    field: 'connectionType',
    title: i18n.t('taskPlan.label.taskLevel'),
    value: getDictByLanguage('TrafficClass')[0].value,
    options: getDictByLanguage('TrafficClass'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'ipType',
    title: i18n.t('taskPlan.label.IPType'),
    value: getDictByLanguage('IpType')[0].value,
    options: getDictByLanguage('IpType'),
    col: {
      span: 12,
      xs: 12
    }
  }

]
const createdConnectionList = [
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{title}}</el-divider>',
    vm: new Vue({
      data: {
        title: i18n.t('taskPlan.label.taskLevel')
      }})
  },
  {
    type: 'template',
    name: 'childrenArray',
    field: 'createdConnectionInfos',
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
export { createdConnectionList }
