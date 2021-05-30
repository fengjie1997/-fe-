// MOC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../../common/common'
import { customPioneer } from './customPioneer'
const taskRule = [
  {
    type: 'input',
    field: 'receiverNumber',
    title: '接收方号码',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'smsText',
    title: '短信内容',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'smsc',
    title: '短信中心号码',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'smsFormat',
    title: '短信格式',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },

  {
    type: 'InputNumber',
    field: 'sendTimeout',
    title: '发送超时(s)',
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
    field: 'receiveTimeout',
    title: '接收超时(s)',
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
    field: 'sendBaudRate',
    title: '发送串口波特率(bps)',
    value: 57600,
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
    field: 'sendPort',
    title: '发送端口',
    value: 15,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  }

]
var rules = taskRule.concat(customPioneer)
var taskSmsSelf =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'smsSelfTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'SMS Self 测试配置',
        active: ['1'],
        modelForm: {},
        rule: rules,
        option: commonOptions
      }
    })
  }

export { taskSmsSelf }
