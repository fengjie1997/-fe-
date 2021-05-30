import Vue from 'vue'
import { commonOption } from './commonOption.js'
import { getDictByTagName } from '@/utils/dictCache.js'
const tcpipCaptureSetting = [
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.enable'),
    field: 'isAvailable',
    value: false,
    col: {
      span: 8,
      xs: 24
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
    type: 'select',
    field: 'captureMode',
    title: '抓包模式',
    value: getDictByTagName('CaptureMode')[0].value,
    options: getDictByTagName('CaptureMode'),
    col: {
      span: 8,
      xs: 12
    },
    validate: [{
      required: true,
      message: '请选择测试模式',
      trigger: 'change'
    }]
  },
  {
    type: 'select',
    field: 'fileSwitch',
    title: '抓包分割方式',
    value: getDictByTagName('FileSwitch')[0].value,
    options: getDictByTagName('FileSwitch'),
    col: {
      span: 8,
      xs: 12
    },
    validate: [{
      required: true,
      message: '请选择测试模式',
      trigger: 'change'
    }]
  }
]
// as rule
const tcpipCaptureSettingRule = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'tcpIpCaptureSetting',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      data: {},
      title: 'TCP/IP抓包设置',
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
    }
  })
}
export { tcpipCaptureSettingRule }
