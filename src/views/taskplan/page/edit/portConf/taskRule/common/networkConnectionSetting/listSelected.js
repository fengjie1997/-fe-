import Vue from 'vue'
import { commonOptions } from '../common'
const rules = [
  {
    type: 'switch',
    title: '是否使用该设置',
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
        open: '是',
        close: '否'
      }
    }
  },
  {
    type: 'input',
    field: 'connectionName',
    title: '连接名称',
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
        title: '拨号设置-可选连接信息'
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
