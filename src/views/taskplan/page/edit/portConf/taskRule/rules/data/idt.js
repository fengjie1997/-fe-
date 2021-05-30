import Vue from 'vue'
// import { urlListRule } from './taskRules/urlList'
// import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../../common/common'
const taskRule = [
  {
    type: 'InputNumber',
    field: 'duration',
    title: '业务总时长(s)',
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
    field: 'noDataTimeout',
    title: '无流量超时(s)',
    value: 30,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  }

]
var taskIdt = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'idtTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: 'IDT 测试设置',
      active: ['1'],
      modelForm: {},
      rule: taskRule,
      option: commonOptions
    }

  })
}

export { taskIdt }
