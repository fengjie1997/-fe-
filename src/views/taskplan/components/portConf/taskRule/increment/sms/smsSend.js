// MOC基础任务配置
import Vue from 'vue'
import i18n from '@/lang'
import { commonOptions } from '../../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const taskRule = [
  // 测试模式
  {
    type: 'select',
    field: 'testType',
    title: i18n.t('taskPlan.SMS.testType'),
    value: getDictByTagName('smsSendTestType')[0].value,
    options: getDictByTagName('smsSendTestType'),
    col: {
      span: 13,
      xs: 12
    },
    emit: ['change']
  },
  // sp
  {
    type: 'switch',
    title: 'SP',
    field: 'isSmssp',
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
  // 接收号码
  {
    type: 'input',
    field: 'receiveNumber',
    title: i18n.t('taskPlan.SMS.receiverNumber'),
    value: '',
    col: {
      span: 12,
      xs: 12
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  // SMS文本
  {
    type: 'input',
    field: 'smsText',
    title: i18n.t('taskPlan.SMS.smsText'),
    value: 'Hello',
    col: {
      span: 12,
      xs: 12
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  // 短信中心号码
  {
    type: 'input',
    field: 'smsc',
    title: i18n.t('taskPlan.SMS.smsc'),
    value: '',
    col: {
      span: 12,
      xs: 12
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  // 短信格式，老平台界面无显示
  {
    type: 'hidden',
    field: 'smsFormat',
    title: i18n.t('taskPlan.SMS.smsFormat'),
    value: 'PDU',
    col: {
      span: 12,
      xs: 12
    }
  },
  // 发送超时(s)
  {
    type: 'InputNumber',
    field: 'sendTimeout',
    title: i18n.t('taskPlan.SMS.sendTimeout'),
    value: 60,
    col: {
      span: 12,
      xs: 24
    },
    props: {
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
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  // 端口
  {
    type: 'InputNumber',
    field: 'sendPort',
    title: i18n.t('taskPlan.SMS.sendPort'),
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  // 串口波特率
  {
    type: 'InputNumber',
    field: 'sendBaudRate',
    title: i18n.t('taskPlan.SMS.sendBaudRate'),
    value: 57600,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  // 短信接收端口
  {
    type: 'InputNumber',
    field: 'mtcDevicePort',
    title: i18n.t('taskPlan.SMS.mtcDevicePort'),
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
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" @test-type-change="change" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        data: {},
        title: i18n.t('taskPlan.SMS.sendTitle'),
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      },
      watch: {
        data(newData) {
          this.modelForm.rule.forEach(item => {
            if (newData[item.field]) {
              if (item.parse) {
                this.modelForm.setValue(item.field, newData[item.field] / 1000)
              } else {
                this.modelForm.setValue(item.field, newData[item.field])
              }
            }
          })
        }
      },
      methods: {
        change() {
          if (this.modelForm.getValue('testType') === 'Send Only') {
            this.modelForm.disabled(true, 'mtcDevicePort')
          } else {
            this.modelForm.disabled(false, 'mtcDevicePort')
          }
        }
      }
    })
  }

export { taskSmsSend }
