// MOC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../../common/common'
// import { getDictByTagName } from '@/utils/dictCache.js'
const taskRule = [
  {
    type: 'InputNumber',
    field: 'timeOut',
    title: '单业务超时(s)',
    value: 60,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  }

]
var taskWhatsAppMtc =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'whatsAppMocTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'Whats App MTC测试配置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }
    })
  }

export { taskWhatsAppMtc }
