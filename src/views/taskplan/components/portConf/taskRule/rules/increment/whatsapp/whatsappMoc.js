// MOC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../../common/common'
const taskRule = [
  {
    type: 'InputNumber',
    field: 'mtcDevicePort',
    title: '被叫设备端口',
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
    field: 'duration',
    title: '通话时长(s)',
    value: 60,
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
  },
  {
    type: 'input',
    field: 'friendName',
    title: '好友名称',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  }

]
var taskWhatsAppMoc =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'whatsAppMocTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'Whats MOC测试配置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }
    })
  }

export { taskWhatsAppMoc }
