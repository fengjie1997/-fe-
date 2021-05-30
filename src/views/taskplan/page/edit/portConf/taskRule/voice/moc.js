// MOC基础任务配置
import Vue from 'vue'
import MocForm from './moc.vue'
import { commonOptions } from '../../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'
import i18n from '@/lang'
const taskRule = [
  {
    type: 'switch',
    title: '长呼',
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
        open: '是',
        close: '否'
      }
    }
  },
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
        open: '是',
        close: '否'
      }
    }
  },

  {
    type: 'InputNumber',
    field: 'connection',
    title: '接入时长(ms)',
    value: 15000,
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
    field: 'duration',
    title: '通话时长(ms)',
    value: 60000,
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
    type: 'InputNumber',
    field: 'mtcDevicePort',
    title: '被叫端口',
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
    value: getDictByTagName('mocTestType')[0].value,
    options: getDictByTagName('mocTestType'),
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
    field: 'callType',
    title: '呼叫类型',
    value: getDictByTagName('mocCallType')[0].value,
    options: getDictByTagName('mocCallType'),
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
    value: getDictByTagName('mosAlgorithm')[0].value,
    options: getDictByTagName('mosAlgorithm'),
    col: {
      span: 12,
      xs: 12
    },
    validate: [{
      required: true,
      message: '请选择MOS算法',
      trigger: 'change'
    }]
  },
  {
    type: 'select',
    field: 'mosDeviceVer',
    title: 'MOS设备型号',
    value: getDictByTagName('MOSDeviceVer')[0].value,
    options: getDictByTagName('MOSDeviceVer'),
    col: {
      span: 12,
      xs: 12
    },
    validate: [{
      required: true,
      message: '请选择MOS算法',
      trigger: 'change'
    }]
  },
  {
    type: 'select',
    field: 'sampleType',
    title: 'PLOAQ样本',
    value: getDictByTagName('mosSampleType')[0].value,
    options: getDictByTagName('mosSampleType'),
    col: {
      span: 12,
      xs: 12
    },
    validate: [{
      required: true,
      message: 'PLOAQ样本',
      trigger: 'change'
    }]
  },
  {
    type: 'select',
    field: 'calcMode',
    title: 'PLOAQ算分',
    value: getDictByTagName('mocCalcMode')[0].value,
    options: getDictByTagName('mocCalcMode'),
    col: {
      span: 12,
      xs: 12
    },
    emit: ['change'],
    emitPrefix: 'gi',
    validate: [{
      required: true,
      message: '请选择测试模式',
      trigger: 'change'
    }]
  },

  {
    type: 'select',
    field: 'cdmaAmrRate',
    title: 'CDMA语音编码',
    value: getDictByTagName('mocCDMAAMRRate')[0].value,
    options: getDictByTagName('mocCDMAAMRRate'),
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
    field: 'voiceType',
    title: '语音类型',
    value: getDictByTagName('mocVoiceType')[0].value,
    options: getDictByTagName('mocVoiceType'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'umtsAmrRate',
    title: 'WCDMA语音编码',
    value: getDictByTagName('mocWCDMA')['1'].value,
    options: getDictByTagName('mocWCDMA'),
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
    field: 'callingNumber',
    title: '主叫号码',
    value: '13500900090',
    props: {

    },
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'calledNumber',
    title: '被叫号码',
    value: '10086',
    col: {
      span: 12,
      xs: 24
    },
    props: {

    },
    validate: [{
      required: true,
      message: '请填写拨打号码',
      trigger: 'blur'
    }]
  }

]
var taskMoc =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'mocTestConfig',
    col: { span: 24, xs: 24 },
    template: '<MocForm ref="refMoc" :rule="rule" @update="update"  />',
    vm: new Vue({
      components: { MocForm },
      data: {
        data: {},
        title: i18n.t('taskPlan.voice.mosTest'),
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
          this.$refs.refMoc.modelForm.setValue(newData)
        }
      },
      methods: {
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
