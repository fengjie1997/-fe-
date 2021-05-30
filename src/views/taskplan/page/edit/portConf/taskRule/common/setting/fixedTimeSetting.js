import Vue from 'vue'
import { commonOption } from './commonOption.js'
const fixedTimeSetting = [
  {
    type: 'InputNumber',
    field: 'taskDuration',
    title: '任务持续时长(ms)',
    value: 0,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'interval',
    title: '任务间隔(ms)',
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
// as rule
const fixedTimeSettingRule = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'fixedTimeSetting',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      data: {},
      title: '固定时长设置',
      active: ['1'],
      modelForm: {},
      rule: fixedTimeSetting,
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
export { fixedTimeSettingRule }
