// MOC基础任务配置
import Vue from 'vue'
import MocForm from './moc.vue'
// import { randomTimeSectionListRule } from './randomTimeSection'
import { commonOptions } from '../common/common'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import i18n from '@/lang'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const taskRule = [
  // 测试类型-测试模式(老平台)
  {
    type: 'select',
    field: 'testType',
    title: i18n.t('taskPlan.voice.testType'),
    value: getDictByLanguage('mocTestType')[0].value,
    options: getDictByLanguage('mocTestType'),
    col: {
      span: 12,
      xs: 24
    },
    style: 'width:100px',
    emit: ['change']
  },
  // 呼叫类型
  {
    type: 'select',
    field: 'callType',
    title: i18n.t('taskPlan.voice.callType'),
    value: getDictByLanguage('mocCallType')[0].value,
    options: getDictByLanguage('mocCallType'),
    col: {
      span: 12,
      xs: 24
    }
  },
  // 被叫端口
  {
    type: 'select',
    field: 'mtcDevicePort',
    title: i18n.t('taskPlan.voice.mtcDevicePort'),
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    options: [{ label: i18n.t('taskPlan.label.custom'), value: -2 }, { label: 1, value: 1 }, { label: 3, value: 3 }, { label: 4, value: 4 }, { label: 5, value: 5 }]
  },
  // 被叫号码-拨打号码(老平台)
  {
    type: 'input',
    field: 'calledNumber',
    title: i18n.t('taskPlan.voice.calledNumber'),
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    props: {
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  // 长呼
  {
    type: 'switch',
    title: i18n.t('taskPlan.voice.longCall'),
    field: 'longCall',
    value: false,
    col: {
      span: 12,
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
  // MOS测试
  {
    type: 'switch',
    title: i18n.t('taskPlan.voice.mosTest'),
    field: 'mosTest',
    value: false,
    col: {
      span: 12,
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
    emit: ['change']
  },
  // MOS算法
  {
    type: 'select',
    field: 'mosAlgorithm',
    title: i18n.t('taskPlan.voice.mosAlgorithm'),
    value: getDictByLanguage('mosAlgorithm')[0].value,
    options: getDictByLanguage('mosAlgorithm'),
    col: {
      span: 12,
      xs: 24
    },
    emit: ['change']
  },
  // POLQA样本
  {
    type: 'select',
    field: 'sampleType',
    title: i18n.t('taskPlan.voice.sampleType'),
    value: getDictByLanguage('mosSampleType')[2].value,
    options: getDictByLanguage('mosSampleType'),
    col: {
      span: 12,
      xs: 24
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
  },
  // PLOAQ算分
  {
    type: 'select',
    field: 'calcMode',
    title: i18n.t('taskPlan.voice.calcMode'),
    value: getDictByLanguage('mocCalcMode')[0].value,
    options: getDictByLanguage('mocCalcMode'),
    col: {
      span: 12,
      xs: 24
    },
    emit: ['change'],
    emitPrefix: 'gi'
  },
  // CDMA语音编码
  {
    type: 'select',
    field: 'cdmaAmrRate',
    title: i18n.t('taskPlan.voice.cdmaAmrRate'),
    value: 11,
    options: getDictByLanguage('mocCDMAAMRRate', true),
    col: {
      span: 12,
      xs: 24
    }
  },
  // WCDMA语音编码
  {
    type: 'select',
    field: 'umtsAmrRate',
    title: i18n.t('taskPlan.voice.umtsAmrRate'),
    value: getDictByLanguage('mocWCDMA', true)['1'].value,
    options: getDictByLanguage('mocWCDMA', true),
    col: {
      span: 12,
      xs: 24
    }
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
  // 语音类型
  {
    type: 'select',
    field: 'voiceType',
    title: i18n.t('taskPlan.voice.voiceType'),
    value: getDictByLanguage('mocVoiceType')[0].value,
    options: getDictByLanguage('mocVoiceType'),
    col: {
      span: 12,
      xs: 24
    }
  },
  // 接入时长, 此字段于老平台中位于时间设置中
  {
    type: 'InputNumber',
    field: 'connection',
    title: i18n.t('taskPlan.voice.connection'),
    value: 20,
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
  // 主叫号码
  {
    type: 'input',
    field: 'callingNumber',
    title: i18n.t('taskPlan.voice.callingNumber'),
    value: '',
    props: {

    },
    col: {
      span: 12,
      xs: 24
    }
  },
  // 通话时长，即moc业务的业务时长
  {
    type: 'InputNumber',
    field: 'duration',
    title: i18n.t('taskPlan.voice.duration'),
    value: 90,
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
    },
    emit: ['change']
  },
  // MOS设备类型，老平台界面中无
  {
    type: 'select',
    field: 'mosDeviceVer',
    title: i18n.t('taskPlan.voice.mosDeviceVer'),
    value: getDictByLanguage('MOSDeviceVer')[0].value,
    options: getDictByLanguage('MOSDeviceVer'),
    col: {
      span: 12,
      xs: 24
    }
  }
]
// taskRule = taskRule.concat(randomTimeSectionListRule)
console.log(taskRule)
var taskMoc =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'mocTestConfig',
    col: { span: 24, xs: 24 },
    template: '<MocForm ref="refMoc" :rule="rule" @update="update" @getDuration="getDuration" />',
    vm: new Vue({
      components: { MocForm },
      data: {
        data: {},
        title: i18n.t('taskPlan.voice.mocTestConfig'),
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions,
        mocTestConfig: {},
        form: {}
      },
      computed: {
        formData() {
          return this.$refs.refMoc.modelForm.formData()
        }
      },
      watch: {
        data(newData) {
          this.rule.forEach(item => {
            if (item.reverseParse) {
              newData[item.field] = item.reverseParse(newData[item.field])
            }
          })
          this.$refs.refMoc.modelForm.setValue(newData)
        }
      },
      methods: {
        // 监听到moc业务的duration变化，并同步至时间窗
        getDuration(data) {
          console.log(this)
          this.$parentFC.modelForm.rule.forEach(item => {
            if (item.field === 'fixedTimeSetting') {
              item.vm.$refs.refFix.modelForm.setValue('duration', data)
            }
          })
        },
        update(data) {
          this.form = data
        },
        getForm() {
          return this.$refs.refMoc.modelForm.formData()
        }
      }
    })
  }

export { taskMoc }
