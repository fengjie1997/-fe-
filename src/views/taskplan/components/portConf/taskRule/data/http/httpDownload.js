// MOC基础任务配置
import i18n from '@/lang'
import Vue from 'vue'
import { commonOptions } from '../../common/common'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import { proxySetting } from './proxySetting'
import { urlListRule } from './urlList'
import { baiduyunAccount } from './baiduyunAccount'
import { getSecond, getMillionSecond } from '@/utils/timeZone'

const taskRule = [
  {
    type: 'select',
    field: 'psCallMode',
    title: i18n.t('taskPlan.voice.testType'),
    value: getDictByLanguage('PSCallMode')['1'].value,
    options: getDictByLanguage('PSCallMode'),
    col: {
      span: 13,
      xs: 12
    }
  },
  {
    type: 'hidden',
    field: 'websiteType',
    value: 'Normal'
  },
  // {
  //   type: 'select',
  //   field: 'websiteType',
  //   title: '网站类型',
  //   value: getDictByTagName('httpdownWebsiteType')[0].value,
  //   options: getDictByTagName('httpdownWebsiteType'),
  //   col: {
  //     span: 11,
  //     xs: 12
  //   }
  // },
  {
    type: 'InputNumber',
    field: 'downloadTimeout',
    title: i18n.t('device.timeOut'),
    value: 1.2,
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
    // parse: (value) => {
    //   return value * 1000
    // },
    // reverseParse: (value) => {
    //   return value / 1000
    // }
  },
  {
    type: 'InputNumber',
    field: 'downloadDuration',
    title: i18n.t('taskPlan.httpWeb.downloadDuration'),
    value: 300,
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
    }
  },
  {
    type: 'InputNumber',
    field: 'noDataTimeout',
    title: i18n.t('taskPlan.ftpUpload.noDataTimeout'),
    value: 0,
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
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
    field: 'threadCount',
    title: i18n.t('taskPlan.ftpDownload.threadCount'),
    value: 1,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'hidden',
    title: i18n.t('taskPlan.mftpDown.doSave'),
    field: 'isSaveFile',
    value: false
  },
  // {
  //   type: 'switch',
  //   title: '保存文件',
  //   field: 'isSaveFile',
  //   value: false,
  //   col: {
  //     span: 13,
  //     xs: 24
  //   },
  //   props: {
  //     'trueValue': true,
  //     'falseValue': false,
  //     slot: {
  //       open: i18n.t('taskPlan.label.true'),
  //       close: i18n.t('taskPlan.label.false')
  //     }
  //   }
  // },

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
}, proxySetting, baiduyunAccount)
var taskHttpDownload =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'httpDownTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        data: {},
        title: i18n.t('taskPlan.httpWeb.downTitle'),
        active: ['1'],
        modelForm: {},
        rule: rules,
        option: commonOptions
      },
      computed: {
        formData() {
          var formData = this.modelForm.formData()
          this.rule.forEach(item => {
            if (item.field === 'urlList') {
              formData['urlList'] = item.vm.list
            }
            if (item.field === 'proxySetting') {
              formData['proxySetting'] = item.vm.modelForm.formData()
            }
            if (item.field === 'baiduyunAccount') {
              formData['baiduyunAccount'] = item.vm.modelForm.formData()
            }
          })
          return formData
        }
      },
      watch: {
        data(newData) {
          this.rule.forEach(item => {
            if (item.reverseParse) {
              newData[item.field] = item.reverseParse(newData[item.field])
            } else {
              if (item.hasChildren) {
                if (item.vm.hasOwnProperty('formData')) {
                  console.log(item)
                  const childRules = item.vm.rule
                  const childFormData = Object.assign({}, item.vm.formData)
                  for (const rule of childRules) {
                    if (this.modelForm.form.taskName !== 'ping') {
                      if (rule.parse && childFormData[rule.field] < 1000) {
                        childFormData[rule.field] = rule.reverseParse(childFormData[rule.field])
                      }
                    }
                  }
                  newData[item.field] = childFormData
                }
              }
            }
            if (item.field === 'urlList') {
              item.vm.list = newData['urlList']
            }
            if (item.field === 'proxySetting') {
              item.vm.modelForm.setValue(newData['proxySetting'])
            }
            if (item.field === 'baiduyunAccount') {
              console.log(item)
              item.vm.data = newData['baiduyunAccount']
              item.vm.modelForm.setValue(newData['baiduyunAccount'])
            }
          })
          this.modelForm.setValue(newData)
        }
      }
    })
  }
export { taskHttpDownload }
