// MOC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../../common/common'
var taskRule = [
  {
    type: 'InputNumber',
    field: 'duration',
    title: '持续时长(s)',
    value: 100000,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'switch',
    title: '保存数据',
    field: 'collectData',
    value: true,
    col: {
      span: 12,
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
  }

]
var taskIdle = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'idleTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: 'Idle 测试配置',
      active: ['1'],
      modelForm: {},
      rule: taskRule,
      option: commonOptions
    }
  })
}

export { taskIdle }
