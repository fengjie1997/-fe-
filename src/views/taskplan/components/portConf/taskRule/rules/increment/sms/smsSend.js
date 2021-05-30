// MOC基础任务配置
import Vue from 'vue'
import i18n from '@/lang'
import { commonOptions } from '../../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'
const taskRule = [
  {
    type: 'select',
    field: 'testType',
    title: '短信测试类型',
    value: getDictByTagName('smsSendTestType')[0].value,
    options: getDictByTagName('smsSendTestType'),
    col: {
      span: 13,
      xs: 12
    }
  },
  {
    type: 'switch',
    title: 'SP',
    field: 'isSMSSP',
    value: false,
    col: {
      span: 11,
      xs: 12
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
    type: 'input',
    field: 'receiverNumber',
    title: '接收方号码',
    value: '13500001111',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'smsText',
    title: 'SMS文本',
    value: 'Hello',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'smsc',
    title: '短信中心号码',
    value: '13800005000',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'smsFormat',
    title: 'SMS格式',
    value: 'PDU',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'sendTimeout',
    title: '发送超时(ms)',
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
    field: 'sendPort',
    title: '发送方串口号',
    value: 15,
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
    title: '发送串口波特率',
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
    field: 'mtcDevicePort',
    title: '被叫设备端口',
    value: 2,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  }

]
var taskSmsSend =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'smsSendTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'SMS Send 测试配置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }
    })
  }

export { taskSmsSend }
