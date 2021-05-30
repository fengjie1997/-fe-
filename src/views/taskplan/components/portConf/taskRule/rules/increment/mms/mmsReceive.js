// MOC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'
const taskRule = [
  {
    type: 'select',
    field: 'testType',
    title: '短信测试类型',
    value: getDictByTagName('smsRecvTestType')[0].value,
    options: getDictByTagName('smsRecvTestType'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'receiveTimeout',
    title: '接收超时(ms)',
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
var taskMmsReceive =
  {
    type: 'template',
    name: 'children',
    field: 'mmsReceiveTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'MMS Receive 测试配置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }
    })
  }

export { taskMmsReceive }
