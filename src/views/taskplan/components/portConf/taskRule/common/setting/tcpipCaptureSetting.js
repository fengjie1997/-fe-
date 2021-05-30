import Vue from 'vue'
import { commonOption } from './commonOption.js'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import i18n from '@/lang'
const tcpipCaptureSetting = [
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.enable'),
    field: 'isAvailable',
    value: false,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: i18n.t('taskPlan.label.true'),
        close: i18n.t('taskPlan.label.false')
      }
    },
    emit: ['change']
  },
  {
    type: 'select',
    field: 'captureMode',
    title: i18n.t('taskPlan.form.captureMode'),
    value: getDictByLanguage('CaptureMode')[0].value,
    options: getDictByLanguage('CaptureMode'),
    col: {
      span: 12,
      xs: 12
    }
    // validate: [{
    //   required: true,
    //   message: '请选择测试模式',
    //   trigger: 'change'
    // }]
  },
  {
    type: 'select',
    field: 'fileSwitch',
    title: i18n.t('taskPlan.form.fileSwitch'),
    value: getDictByLanguage('FileSwitch')[0].value,
    options: getDictByLanguage('FileSwitch'),
    col: {
      span: 12,
      xs: 12
    }
    // validate: [{
    //   required: true,
    //   message: '请选择测试模式',
    //   trigger: 'change'
    // }]
  }
]
// as rule
const tcpipCaptureSettingRule = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'tcpIpCaptureSetting',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" @is-available-change="change" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      data: {},
      title: i18n.t('taskPlan.form.tcpipCaptureSetting'),
      active: ['1'],
      modelForm: {},
      rule: tcpipCaptureSetting.concat(),
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
    },
    methods: {
      change() {
        if (this.modelForm.form.isAvailable) {
          this.modelForm.disabled(false, 'captureMode')
          this.modelForm.disabled(false, 'fileSwitch')
        } else {
          this.modelForm.disabled(true, 'captureMode')
          this.modelForm.disabled(true, 'fileSwitch')
        }
      }
    }
  })
}
export { tcpipCaptureSettingRule }
