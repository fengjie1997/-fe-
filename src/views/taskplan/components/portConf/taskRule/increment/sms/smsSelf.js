// MOC基础任务配置
import Vue from 'vue'
import i18n from '@/lang'
import { commonOptions } from '../../common/common'
// import { customPioneer } from './customPioneer' 老平台界面无
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const taskRule = [
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
  // 老平台界面无显示
  {
    type: 'hidden',
    field: 'smsFormat',
    title: '短信格式',
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
  // 接收超时(s)
  {
    type: 'InputNumber',
    field: 'receiveTimeout',
    title: i18n.t('taskPlan.SMS.receiveTimeout'),
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
    value: 15,
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
  }

]
// 老平台界面无
var rules = taskRule
// var rules = taskRule.concat(customPioneer)
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
        data: {},
        title: i18n.t('taskPlan.SMS.selfTitle'),
        active: ['1'],
        modelForm: {},
        rule: rules,
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
      }
    })
  }

export { taskSmsSelf }
