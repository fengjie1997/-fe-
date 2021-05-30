import Vue from 'vue'
import i18n from '@/lang'
import { commonOption } from './commonOption.js'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const timeWindowSetting = [
  {
    type: 'hidden',
    title: i18n.t('taskPlan.form.isAvailable'),
    field: 'isCheck',
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
    title: i18n.t('taskPlan.form.windowSize'),
    value: 20,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0,
      disabled: false
    },
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
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
    title: i18n.t('taskPlan.form.guardDuration'),
    value: 90,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      disabled: false,
      min: 0
    },
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    }
    // validate: [{
    //   required: true,
    //   message: '通话时长',
    //   trigger: 'blur'
    // }]
  },
  {
    type: 'InputNumber',
    field: 'duration',
    title: i18n.t('taskPlan.form.duration'),
    value: 15,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0,
      disabled: false
    }
    // validate: [{
    //   required: true,
    //   message: '间隔时长',
    //   trigger: 'blur'
    // }]
  },
  // 时间窗设置-接入时长
  {
    type: 'InputNumber',
    field: 'accessTime',
    title: i18n.t('taskPlan.voice.connection'),
    value: 10,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      disabled: false,
      min: 0
    },
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    validate: [{
      required: true,
      message: '通话时长',
      trigger: 'blur'
    }]
  }
]
// as rule
const timeWindowSettingRule = {
  type: 'template',
  name: 'children',
  field: 'timeWindowSetting',
  hasChildren: true,
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      data: {},
      title: i18n.t('taskPlan.form.timeWindowSetting'),
      active: ['1'],
      modelForm: {},
      rule: timeWindowSetting,
      option: commonOption
    },
    computed: {
      formData() {
        return this.modelForm.formData()
      }
    },
    watch: {
      data(newData) {
        this.modelForm.setValue(newData)
      }
    }
  })
}
export { timeWindowSetting, timeWindowSettingRule }
