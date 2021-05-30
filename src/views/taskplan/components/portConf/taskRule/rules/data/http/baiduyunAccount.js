import Vue from 'vue'
import i18n from '@/lang'
import { commonOptions } from '../../common/common'
const rules = [
  {
    type: 'switch',
    title: i18n.t('taskPlan.baidu.isKey'),
    field: 'isDeveloperAccount',
    value: false,
    col: {
      span: 24,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: i18n.t('taskPlan.label.true'),
        close: i18n.t('taskPlan.label.false')
      }
    }
  },
  {
    type: 'input',
    field: 'apiKey',
    title: 'API key',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'secretKey',
    title: i18n.t('taskPlan.baidu.Key'),
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  }

]
const baiduyunAccount = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'baiduyunAccount',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      data: {},
      title: i18n.t('taskPlan.baidu.title'),
      active: ['1'],
      modelForm: {},
      rule: rules,
      option: commonOptions
    },
    watch: {
      data(newData) {
        console.log(newData)
        this.modelForm.setValue(newData)
      }
    }
  })
}
export { baiduyunAccount }
