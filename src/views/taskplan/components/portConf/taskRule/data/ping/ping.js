// MOC基础任务配置
import Vue from 'vue'
import i18n from '@/lang'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import { urlListRule } from './urlList'
import { commonOptions } from '../../common/common'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const taskRule = [
  // 数据包大小
  {
    type: 'InputNumber',
    field: 'packetSizeB',
    title: i18n.t('taskPlan.ping.packetSize_B'),
    value: 256,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      disabled: false,
      min: 0
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.ftpUpload.remoteDirectoryMessage'),
      trigger: 'blur'
    }]
  },
  // TTL
  {
    type: 'InputNumber',
    field: 'ttl',
    title: 'TTL',
    value: 64,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 1,
      max: 255
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.ftpUpload.remoteDirectoryMessage'),
      trigger: 'blur'
    }]
  },
  // HSPing
  {
    type: 'switch',
    title: 'HSPing',
    field: 'hsPing',
    value: true,
    col: {
      span: 11,
      xs: 24
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
  // UEState
  {
    type: 'select',
    field: 'ueState ',
    title: 'UEState',
    value: getDictByLanguage('pingUEState')[0].value,
    options: getDictByLanguage('pingUEState'),
    col: {
      span: 13,
      xs: 12
    }
  },

  // AT+Ping
  {
    type: 'switch',
    title: 'ATPing',
    field: 'atPing',
    value: false,
    col: {
      span: 11,
      xs: 24
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
  // 超时时间
  {
    type: 'InputNumber',
    field: 'timeout',
    title: i18n.t('taskPlan.ping.timeout'),
    value: 5,
    col: {
      span: 13,
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
    }
  }
]
var rules = taskRule.concat(urlListRule)
console.log(rules)
var taskPing =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'pingTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue(
      {
        data: {
          data: {},
          title: i18n.t('taskPlan.ping.title'),
          active: ['1'],
          modelForm: {},
          rule: rules,
          option: commonOptions
        },
        computed: {
          formData() {
            var formData = this.modelForm.formData()
            console.log('1')
            this.rule.forEach(item => {
              if (item.field === 'pingAddressList') {
                formData['pingAddressList'] = item.vm.list
              }
            })
            return formData
          }
        },
        // created() {
        //   console.log(this.modelForm)
        // },
        watch: {
          // 监控旧数据
          data(newData) {
            console.log(newData)
            console.log(this)
            this.rule.forEach(item => {
              if (item.reverseParse) {
                newData[item.field] = item.reverseParse(newData[item.field])
              }
            })
            this.modelForm.setValue(newData)
            this.rule.forEach(item => {
              if (item.field === 'pingAddressList' && newData['pingAddressList']) {
                if (newData['pingAddressList'].hasOwnProperty('pingAddress')) {
                  item.vm.list = newData['pingAddressList']
                }
              }
            })
          }
        }
      })
  }

export { taskPing }
