import Vue from 'vue'
import { commonOptions } from '../../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'

const taskRule = [
  {
    type: 'switch',
    title: 'Video MOS',
    field: 'videoMos',
    value: false,
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'switch',
    title: '手动应答',
    field: 'manualAnswer',
    value: false,
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'switch',
    title: '自动应答',
    field: 'autoAnswer',
    value: true,
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'select',
    field: 'testType',
    title: '测试模式',
    value: getDictByTagName('videotelephonyTestType')[0].value,
    options: getDictByTagName('videotelephonyTestType'),
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
    field: 'saveFileFormat',
    title: '视频保存格式',
    value: getDictByTagName('videotelephonySaveFileFormat')[0].value,
    options: getDictByTagName('videotelephonySaveFileFormat'),
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
    field: 'videoMosAlgorithm',
    title: 'VMOS算分方式',
    value: getDictByTagName('videotelephoneVideoMOSAlgorithm')[0].value,
    options: getDictByTagName('videotelephoneVideoMOSAlgorithm'),
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
    type: 'InputNumber',
    field: 'mtcDevicePort',
    title: '被叫端口',
    value: 0,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },

  {
    type: 'InputNumber',
    field: 'connection',
    title: '接入时长（ms）',
    value: 0,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'duration',
    title: '通话时长（ms）',
    value: 6000,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'h245Timeout',
    title: 'H245超时（ms）',
    value: 3000,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'setupTimeout',
    title: '建立超时（ms）',
    value: 1000,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'sampleFrequency',
    title: '采样频率',
    value: 10,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'baudRate',
    title: '波特率(bps)',
    value: 57600,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'noDataTimeout',
    title: '无流量超时(ms)',
    value: 10000,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'input',
    field: 'calledNumber',
    title: '被叫号码',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'callingNumber',
    title: '主叫号码',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'localVideoFile',
    title: '视频样本',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'localAudioFile',
    title: '音频样本',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  }
]
var taskVideoTelephony =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'videoTelephonyTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        data: {},
        title: 'Video Telephony 测试配置',
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

export { taskVideoTelephony }
