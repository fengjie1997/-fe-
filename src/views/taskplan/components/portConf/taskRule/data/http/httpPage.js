// MOC基础任务配置
import Vue from 'vue'
import i18n from '@/lang'
import httpPage from './httpPage.vue'
// import { urlListRule } from './taskRules/urlList'
import { commonOptions } from '../../common/common'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import { proxySetting } from './proxySetting'
import { urlListRule } from './urlList'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const taskRule = [
  // 测试模式
  {
    type: 'select',
    field: 'mode',
    title: i18n.t('taskPlan.voice.testType'),
    value: getDictByLanguage('HTTPPageMode')[0].value,
    options: getDictByLanguage('HTTPPageMode'),
    col: {
      span: 13,
      xs: 12
    }
  },
  // 打开浏览器（老平台不显示）
  {
    type: 'hidden',
    title: i18n.t('taskPlan.httpPage.showBrowser'),
    field: 'showBrowser',
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
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.ftpUpload.remoteDirectoryMessage'),
      trigger: 'blur'
    }]
  },
  {
    type: 'InputNumber',
    field: 'pageTimeout',
    title: i18n.t('taskPlan.httpPage.pageTimeout'),
    value: 0,
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
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.ftpUpload.remoteDirectoryMessage'),
      trigger: 'blur'
    }]
  },
  {
    type: 'InputNumber',
    field: 'noDataTimeout',
    title: i18n.t('taskPlan.ftpUpload.noDataTimeout'),
    value: 180,
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.ftpUpload.remoteDirectoryMessage'),
      trigger: 'blur'
    }]
  },
  {
    type: 'InputNumber',
    field: 'connectTimeout',
    title: i18n.t('taskPlan.httpPage.connectTimeout'),
    value: 20,
    col: {
      span: 13,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.ftpUpload.remoteDirectoryMessage'),
      trigger: 'blur'
    }]
  },
  {
    type: 'InputNumber',
    field: 'port',
    title: i18n.t('device.port'),
    value: 80,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.ftpUpload.remoteDirectoryMessage'),
      trigger: 'blur'
    }]
  },
  {
    type: 'InputNumber',
    field: 'browserInterval',
    title: i18n.t('taskPlan.httpPage.browserInterval'),
    value: 2,
    col: {
      span: 13,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'randomUrlCount',
    title: i18n.t('taskPlan.httpPage.randomUrlCount'),
    value: 4,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  }

]
var rules = taskRule.concat(urlListRule, {
  type: 'switch',
  title: i18n.t('taskPlan.httpPage.useProxy'),
  field: 'useProxy',
  value: false,
  col: {
    span: 13,
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
}, proxySetting)
var taskHttpPage =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'httpPageTestConfig',
    col: { span: 24, xs: 24 },
    template: '<httpPage ref="refHttpPage" :rule="rule" />',
    vm: new Vue({
      components: { httpPage },
      data: {
        data: {},
        title: i18n.t('taskPlan.httpPage.title'),
        active: ['1'],
        modelForm: {},
        rule: rules,
        option: commonOptions
      },
      computed: {
        formData() {
          var data = this.$refs.refHttpPage.formData
          return data
        }
      },
      watch: {
        // 编辑表单
        data(newData) {
          console.log(this)
          console.log(newData)
          this.$refs.refHttpPage.modelForm.rule.forEach(item => {
            if (newData[item.field]) {
              if (item.field === 'urlList') {
                item.vm.list = newData[item.field]
              }
              if (item.parse) {
                this.$refs.refHttpPage.modelForm.setValue(item.field, newData[item.field] / 1000)
              } else {
                this.$refs.refHttpPage.modelForm.setValue(item.field, newData[item.field])
              }
            }
          })
          // this.rule.forEach(item => {
          //   if (item.reverseParse) {
          //     console.log(item.field)
          //     newData[item.field] = item.reverseParse(newData[item.field])
          //   }
          // })
          // this.$refs.refHttpPage.setForm(newData)
        }
      }
    })
  }

export { taskHttpPage }
