// MTC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../common/common'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import i18n from '@/lang'
const taskRule = [
  // MOS测试
  {
    type: 'switch',
    title: i18n.t('taskPlan.voice.mosTest'),
    field: 'mosTest',
    value: true,
    col: {
      span: 12,
      xs: 24
    },
    emit: ['change']
  },
  // MOS算法
  {
    type: 'select',
    field: 'mosAlgorithm',
    title: i18n.t('taskPlan.voice.mosAlgorithm'),
    value: getDictByLanguage('mosAlgorithm')['1'].value,
    options: getDictByLanguage('mosAlgorithm'),
    col: {
      span: 12,
      xs: 12
    },
    emit: ['change']
  },
  // POLQA样本
  {
    type: 'select',
    field: 'sampleType',
    title: i18n.t('taskPlan.voice.sampleType'),
    value: getDictByLanguage('mosSampleType')['2'].value,
    options: getDictByLanguage('mosSampleType'),
    col: {
      span: 12,
      xs: 12
    }
  },
  // POLQA算法
  {
    type: 'select',
    field: 'calcMode',
    title: i18n.t('taskPlan.voice.calcMode'),
    value: getDictByLanguage('mocCalcMode')['0'].value,
    options: getDictByLanguage('mocCalcMode'),
    col: {
      span: 12,
      xs: 12
    }
  },
  // MOS低保存阈值
  {
    type: 'InputNumber',
    field: 'lowMosThreshold',
    title: i18n.t('taskPlan.voice.lowMosThreshold'),
    value: 2,
    col: {
      span: 12,
      xs: 24
    }
    // props: {
    //   min: 0
    // }
  },
  // APN
  {
    type: 'input',
    field: 'apn',
    title: 'APN',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  // 被叫号码
  {
    type: 'input',
    field: 'calledNumber',
    title: i18n.t('taskPlan.voice.calledNumber'),
    value: '',
    props: {

    },
    col: {
      span: 12,
      xs: 24
    }
  }
  // 测试类型，老平台界面无显示
  // {
  //   type: 'select',
  //   field: 'testType',
  //   title: i18n.t('taskPlan.voice.testType'),
  //   value: getDictByLanguage('mtcTestType')[0].value,
  //   options: getDictByLanguage('mtcTestType'),
  //   col: {
  //     span: 12,
  //     xs: 12
  //   }
  // }
]
var taskMtc =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'mtcTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" @mos-test-change="change" @mos-algorithm-change="change" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        data: {},
        title: i18n.t('taskPlan.voice.title'),
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
          this.rule.forEach(item => {
            if (item.reverseParse) {
              newData[item.field] = item.reverseParse(newData[item.field])
            }
          })
          this.modelForm.setValue(newData)
        }
      },
      methods: {
        change() {
          if (this.modelForm.getValue('mosTest')) {
            this.modelForm.disabled(false, ['mosAlgorithm', 'lowMosThreshold'])
          } else {
            this.modelForm.disabled(true, ['mosAlgorithm', 'lowMosThreshold'])
          }
          if (this.modelForm.getValue('mosAlgorithm') === 'POLQA') {
            this.modelForm.disabled(false, ['sampleType', 'calcMode'])
          } else {
            this.modelForm.disabled(true, ['sampleType', 'calcMode'])
          }
        }
      }
    })
  }

export { taskMtc }
