import Vue from 'vue'
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../../../common/common'
const rules = [
  {
    type: 'select',
    field: 'wapVersion',
    title: '短信测试类型',
    value: getDictByTagName('mmsreceiveWapVersion')[0].value,
    options: getDictByTagName('mmsreceiveWapVersion'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'gatewayIP',
    title: '网关地址',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'InputNumber',
    field: 'gatewayPort',
    title: '网关端口',
    value: 0,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  }

]
const gatewaySetting = {
  type: 'template',
  name: 'children',
  field: 'gatewaySetting',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: '网关设置',
      active: ['1'],
      modelForm: {},
      rule: rules,
      option: commonOptions
    }})
}
export { gatewaySetting }
