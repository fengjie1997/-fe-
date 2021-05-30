// MOC基础任务配置
import Vue from 'vue'
import i18n from '@/lang'
import { commonOptions } from '../../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const taskRule = [
  {
    type: 'select',
    field: 'testType',
    title: i18n.t('taskPlan.SMS.testType'),
    value: getDictByTagName('smsRecvTestType')[0].value,
    options: getDictByTagName('smsRecvTestType'),
    col: {
      span: 12,
      xs: 12
    }
  },
  // 接收超时
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
  }
]
var taskSmsReceive =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'smsReceiveTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        data: {},
        title: i18n.t('taskPlan.SMS.receiveTitle'),
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      },
      watch: {
        data(newData) {
          console.log(newData)
          console.log(this)
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

export { taskSmsReceive }
