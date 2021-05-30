import Vue from 'vue'
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../common/common'
const taskRule = [

  {
    type: 'InputNumber',
    field: 'playTimeout',
    title: '下载超时(s)',
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
    field: 'connectTimeout',
    title: '连接超时时间(s)',
    value: 60,
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
  },
  {
    type: 'select',
    field: 'psCallMode',
    title: '测试模式',
    value: getDictByTagName('PSCallMode')['1'].value,
    options: getDictByTagName('PSCallMode'),
    col: {
      span: 12,
      xs: 12
    }
  }

]
var taskBass = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'bassTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: 'Bass 测试设置',
      active: ['1'],
      modelForm: {},
      rule: taskRule,
      option: commonOptions
    }

  })
}
export { taskBass }
