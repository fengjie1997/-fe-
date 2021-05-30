// MOC基础任务配置
import Vue from 'vue'
// import { urlListRule } from './taskRules/urlList'
import { commonOptions } from '../../common/common'
import i18n from '@/lang'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
// import { baiduyunAccount } from './baiduyunAccount'
// import { youtubeAccount } from './youtubeAccount'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const taskRule = [
  {
    type: 'select',
    field: 'psCallMode',
    title: i18n.t('taskPlan.voice.testType'),
    value: getDictByLanguage('PSCallMode')['1'].value,
    options: getDictByLanguage('PSCallMode'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'hidden',
    field: 'websiteType',
    title: i18n.t('taskPlan.httpWeb.websiteType'),
    value: 'baiduyun'
    // value: getDictByTagName('httpupWebsiteType')[0].value,
    // options: getDictByTagName('httpupWebsiteType'),
    // col: {
    //   span: 12,
    //   xs: 12
    // }
  },
  {
    type: 'hidden',
    field: 'fileSource',
    title: i18n.t('taskPlan.httpWeb.fileSource'),
    value: 'Create File'
  },
  {
    type: 'select',
    field: 'businessType',
    title: i18n.t('taskPlan.httpWeb.businessType'),
    value: getDictByLanguage('httpupBusinessType')[0].value,
    options: getDictByLanguage('httpupBusinessType'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'uploadTimeout',
    title: i18n.t('taskPlan.httpWeb.uploadTimeout'),
    value: 1000,
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
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
    field: 'uploadDuration',
    title: i18n.t('taskPlan.httpWeb.uploadDuration'),
    value: 300,
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
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
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  },

  // {
  //   type: 'switch',
  //   title: '保存文件',
  //   field: 'isSaveFile',
  //   value: false,
  //   col: {
  //     span: 12,
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
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'fileSize',
    title: i18n.t('taskPlan.httpWeb.fileSize'),
    value: 2048,
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
    field: 'httpUpUrl',
    title: i18n.t('taskPlan.httpWeb.httpUpUrl'),
    value: '',
    col: {
      span: 20,
      xs: 24
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.httpWeb.httpUpUrlMessage'),
      trigger: 'blur'
    }]
  }
]
var rules = taskRule
var taskHttpUpload = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'httpUpTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      data: {},
      title: i18n.t('taskPlan.httpWeb.upTitle'),
      active: ['1'],
      modelForm: {},
      rule: rules,
      option: commonOptions
    },
    computed: {
      formData() {
        var formData = this.modelForm.formData()
        this.rule.forEach(item => {
          if (item.field === 'youtubeAccount') {
            formData['youtubeAccount'] = item.vm.modelForm.formData()
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
          }
        })
        this.modelForm.setValue(newData)
        this.rule.forEach(item => {
          if (item.field === 'youtubeAccount') {
            item.vm.modelForm.setValue(newData['youtubeAccount'])
          }
          if (item.field === 'baiduyunAccount') {
            item.vm.modelForm.setValue(newData['baiduyunAccount'])
          }
        })
      }
    }
  })
}
export { taskHttpUpload }
