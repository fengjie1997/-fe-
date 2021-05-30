import Vue from 'vue'
import { commonOption } from '../commonOption'
import { getDictByTagName } from '@/utils/dictCache.js'
const rules = [
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
        open: '是',
        close: '否'
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
const wifiConnectionList = [
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{title}}</el-divider>',
    vm: new Vue({
      data: {
        title: '拨号设置-网络连接信息'
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
