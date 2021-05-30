import Vue from 'vue'
import { commonOptions } from '../../common/common'
const taskRule = [
  {
    type: 'InputNumber',
    field: 'duration',
    title: '持续时长(ms)',
    value: 10000,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'timeout',
    title: '超时时长(ms)',
    value: 15000,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'input',
    field: 'hostAddress',
    title: 'Host Address',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  }

]
var taskDns = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'dnsTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: 'DNS测试设置',
      active: ['1'],
      modelForm: {},
      rule: taskRule,
      option: commonOptions
    }

  })
}

export { taskDns }
