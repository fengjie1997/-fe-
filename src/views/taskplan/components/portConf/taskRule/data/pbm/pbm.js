import Vue from 'vue'
import i18n from '@/lang'
import { urlListRule } from './urlList'
import { commonOptions } from '../../common/common'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const taskRule = [
  {
    type: 'InputNumber',
    field: 'duration',
    title: i18n.t('taskPlan.pbm.duration'),
    value: 30,
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
    value: 10,
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
    field: 'downSampleRatio',
    title: i18n.t('taskPlan.pbm.downSampleRatio'),
    value: 10,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 1,
      max: 255
    }
  },
  {
    type: 'InputNumber',
    field: 'upSampleRatio',
    title: i18n.t('taskPlan.pbm.upSampleRatio'),
    value: 5,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 1,
      max: 255
    }
  }
]
var rules = taskRule.concat(urlListRule)
var taskPbm = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'pbmTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      data: {},
      title: i18n.t('taskPlan.pbm.title'),
      active: ['1'],
      modelForm: {},
      rule: rules,
      option: commonOptions
    },
    computed: {
      formData() {
        var formData = this.modelForm.formData()
        this.rule.forEach(item => {
          if (item.field === 'serverList') {
            formData['serverList'] = item.vm.list
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
          if (item.field === 'serverList') {
            if (newData['serverList'].hasOwnProperty('servers')) {
              item.vm.list = newData['serverList']
            }
          }
        })
      }
    }

  })
}

export { taskPbm }
