import Vue from 'vue'
import { commonOptions } from '../../common/common'
const taskRule = [
  {
    type: 'InputNumber',
    field: 'duration',
    title: '业务时长(s)',
    value: 30000,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'noDataTimeout',
    title: '无流量超时(s)',
    value: 10000,
    col: {
      span: 13,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'downSampleRatio',
    title: '下行采样占比(%)',
    value: 10,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 1,
      max: 255
    }
  },
  {
    type: 'InputNumber',
    field: 'upSampleRatio',
    title: '上行采样占比(%)',
    value: 5,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 1,
      max: 255
    }
  }

]
var taskPbm = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'pbmTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: 'PBM 测试配置',
      active: ['1'],
      modelForm: {},
      rule: taskRule,
      option: commonOptions
    }

  })
}

export { taskPbm }
