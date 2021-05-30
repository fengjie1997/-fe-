// MTC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'
import i18n from '@/lang'
const taskRule = [
  {
    type: 'switch',
    title: i18n.t('taskPlan.voice.mosTest'),
    field: 'mosTest',
    value: true,
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'InputNumber',
    field: 'lowMosThreshold',
    title: 'MOS低保存阈值',
    value: 2,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'select',
    field: 'testType',
    title: '测试模式',
    value: getDictByTagName('mtcTestType')[0].value,
    options: getDictByTagName('mtcTestType'),
    col: {
      span: 12,
      xs: 12
    },
    validate: [{
      required: true,
      message: '请选择测试模式',
      trigger: 'change'
    }]
  },

  {
    type: 'select',
    field: 'mosAlgorithm',
    title: 'MOS算法',
    value: getDictByTagName('mosAlgorithm')['1'].value,
    options: getDictByTagName('mosAlgorithm'),
    col: {
      span: 12,
      xs: 12
    },
    validate: [{
      required: true,
      message: '请选择测试模式',
      trigger: 'change'
    }]
  },
  {
    type: 'select',
    field: 'sampleType',
    title: 'PLOAQ样本',
    value: getDictByTagName('mosSampleType')['2'].value,
    options: getDictByTagName('mosSampleType'),
    col: {
      span: 12,
      xs: 12
    },
    validate: [{
      required: true,
      message: '请选择测试模式',
      trigger: 'change'
    }]
  },
  {
    type: 'select',
    field: 'calcMode',
    title: 'PLOAQ算分',
    value: getDictByTagName('mocCalcMode')['1'].value,
    options: getDictByTagName('mocCalcMode'),
    col: {
      span: 12,
      xs: 12
    }
  },

  {
    type: 'input',
    field: 'apn',
    title: 'APN',
    value: 'apn',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'calledNumber',
    title: '被叫号码',
    value: '13500900090',
    props: {

    },
    col: {
      span: 8,
      xs: 24
    }
  }

]
var taskMtc =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'mtcTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        data: {},
        title: 'MTC测试配置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      },
      computed: {
        formData() {
          return this.modelForm.formData()
        }
      },
      watch: {
        data(newData) {
          this.modelForm.setValue(newData)
        }
      }
    })
  }

export { taskMtc }
