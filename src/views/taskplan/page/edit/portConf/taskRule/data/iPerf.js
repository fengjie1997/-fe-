
import Vue from 'vue'
// import { urlListRule } from './taskRules/urlList'
// import { getDictByTagName } from '@/utils/dictCache.js'
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
    type: 'InputNumber',
    field: 'port',
    title: '发命令串口',
    value: 0,
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
    field: 'baudRate',
    title: '串口波特率(bps)',
    value: 57600,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  }

]
var taskIperf = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'iperfTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: 'IPerf测试设置',
      active: ['1'],
      modelForm: {},
      rule: taskRule,
      option: commonOptions
    }

  })
}

export { taskIperf }
