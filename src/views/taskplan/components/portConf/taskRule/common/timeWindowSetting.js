import Vue from 'vue'
import { commonOptions } from './common'
import i18n from '@/lang'
const timeWindowSetting = [
  {
    type: 'switch',
    title: '启用时间窗设置',
    field: 'isAvailable',
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
    type: 'InputNumber',
    field: 'windowSize',
    title: '时间窗总时长',
    value: 20,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: '',
      trigger: 'blur'
    }]
  },
  {
    type: 'InputNumber',
    field: 'guardDuration',
    title: '保护时长',
    value: 90,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: '通话时长',
      trigger: 'blur'
    }]
  },
  {
    type: 'InputNumber',
    field: 'duration',
    title: '任务持续时长',
    value: 15,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: '间隔时长',
      trigger: 'blur'
    }]
  }
]
// as rule
const timeWindowSettingRule = {
  type: 'template',
  name: 'children',
  field: 'timeWindowSetting',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: '时间窗设置',
      active: ['1'],
      modelForm: {},
      rule: timeWindowSetting,
      option: commonOptions
    }})
}
export { timeWindowSetting, timeWindowSettingRule }
