import Vue from 'vue'
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../../common/common'
const rules = [
  {
    type: 'select',
    field: 'testType',
    title: '短信测试类型',
    value: getDictByTagName('smsRecvTestType')[0].value,
    options: getDictByTagName('smsRecvTestType'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'switch',
    title: '检查回执',
    field: 'checkReceiptMsg ',
    value: false,
    col: {
      span: 6,
      xs: 12
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
    type: 'switch',
    title: 'SP',
    field: 'isSMSSP',
    value: false,
    col: {
      span: 6,
      xs: 12
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: '是',
        close: '否'
      }
    }
  }

]
const customPioneer = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'customPioneer',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: 'Custom Pioneer设置',
      active: ['1'],
      modelForm: {},
      rule: rules,
      option: commonOptions
    }})
}
export { customPioneer }
