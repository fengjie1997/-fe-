import Vue from 'vue'
// import { urlListRule } from './taskRules/urlList'
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../../common/common'
const taskRule = [

  {
    type: 'InputNumber',
    field: 'duration',
    title: '业务总时长(s)',
    value: 0,
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'noDataTimeout',
    title: '无流量超时(s)',
    value: 0,
    col: {
      span: 12,
      xs: 12
    }
  },

  {
    type: 'InputNumber',
    field: 'serverPort',
    title: '服务器端',
    value: 0,
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'upPacketSize_B',
    title: '上行包大小',
    value: 256,
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
    field: 'downPacketSize_B',
    title: '下行包大小',
    value: 256,
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
    field: 'sendPacketDuration',
    title: '持续发包时长(s)',
    value: 0,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  },

  {
    type: 'inputNumber',
    field: 'sendPacketInterval',
    title: '发包间隔(ms)',
    value: 0,
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
    field: 'baudRate',
    title: '串口波特率(bps)',
    value: 57600,
    col: {
      span: 12,
      xs: 24
    }
  },

  {
    type: 'InputNumber',
    field: 'sampleFrequency',
    title: '测量的采样频率(HZ)',
    value: 10,
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
    field: 'sampleFrequency',
    title: '测量的采样频率(HZ)',
    value: 10,
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
    field: 'sampleFrequency',
    title: '测量的采样频率(HZ)',
    value: 10,
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
    field: 'sampleFrequency',
    title: '测量的采样频率(HZ)',
    value: 10,
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
    field: 'sampleFrequency',
    title: '测量的采样频率(HZ)',
    value: 10,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  }, {
    type: 'select',
    field: 'testType',
    title: '呼叫类型',
    value: getDictByTagName('videotelephonyTestType')[0].value,
    options: getDictByTagName('videotelephonyTestType'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'testMode',
    title: '测试模式',
    value: getDictByTagName('udpTestMode')[0].value,
    options: getDictByTagName('udpTestMode'),
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'select',
    field: 'videoCodec',
    title: '视频文件类型',
    value: getDictByTagName('videotelephonyVideoCodec')[0].value,
    options: getDictByTagName('videotelephonyVideoCodec'),
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
    field: 'serverIP',
    title: '服务器IP',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'customPioneer',
    title: 'Pioneer配置',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'Input',
    field: 'localVideoFile',
    title: '播放视频样本文件路径',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'LocalAudioFile',
    title: '播放音频样本文件路径',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  }

]
var taskUdp =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'udpTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'UDP测试设置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }

    })
  }

export { taskUdp }
