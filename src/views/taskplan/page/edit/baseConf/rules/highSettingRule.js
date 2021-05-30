/**
 * Form-Create 高级设置
 */
import Vue from 'vue'
import { getDictByTagName } from '@/utils/dictCache.js'
import { getDictByLanguage } from '@/utils/dictByLanguage'

const highSettingRuleForm = [
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{ title }}</el-divider>',
    vm: new Vue({
      data: {
        title: '数据传输设置'
      }})
  },
  {
    type: 'select',
    field: 'dataTransmit',
    title: '数据传输方式',
    value: getDictByTagName('dataTransferType')[0].value,
    options: getDictByTagName('dataTransferType'),
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'InputNumber',
    title: '回传模块端口',
    field: 'modemPort',
    value: 1,
    props: { min: 1, max: 11 },
    col: { span: 12, xs: 24 },
    validate: [{
      required: true,
      message: '请选择端口',
      trigger: 'blur'
    }]
  },
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{ title }}</el-divider>',
    vm: new Vue({
      data: {
        title: '文件分割'
      }})
  },
  {
    type: 'switch',
    title: '分端口保存',
    field: 'saveByPort',
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
    type: 'template',
    field: 'switchType',
    title: '切换类型',
    col: { span: 12, xs: 24 },
    template: '<el-row :gutter="5"><el-col :span="6"><el-select v-model="switchType" @change="((val)=>{handleSwitchType(val)})" :placeholder="$t('common.pleaseSelect')"><el-option v-for="item in switchTypeOption" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select></el-col><el-col :span="8" v-show="switchType === \'By Time\'"><el-input-number v-model="duration" :min="1"></el-input-number></el-col><el-col :span="8" v-show="switchType === \'By Size\'"><el-input-number v-model="size" :min="1"></el-input-number></el-col></el-row>',
    vm: new Vue({
      data: {
        size: 10,
        duration: 60,
        switchType: getDictByTagName('switchingType')[0].value,
        switchTypeOption: getDictByTagName('switchingType')
      },
      methods: {
        handleSwitchType(v) {
          console.log(v)
        }
      }
    })
  },
  {
    type: 'hidden',
    field: 'testAfterSych',
    value: 0
  },
  {
    type: 'hidden',
    field: 'allSync',
    value: true
  },
  {
    type: 'hidden',
    field: 'size',
    value: ''
  },
  {
    type: 'hidden',
    field: 'duration',
    value: ''
  },
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{ title }}</el-divider>',
    vm: new Vue({
      data: {
        title: '文件保存'
      }})
  },
  {
    type: 'switch',
    title: '保存RCU文件',
    field: 'saveRCU',
    value: false,
    col: {
      span: 8,
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
    title: '保存原始RCU文件',
    field: 'saveORGRCU',
    value: false,
    col: {
      span: 8,
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
    title: '保存DCF文件',
    field: 'saveDCF',
    value: false,
    col: {
      span: 8,
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
    title: '保存CTI文件',
    field: 'saveCTI',
    value: false,
    col: {
      span: 8,
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
    title: '保存DTlog文件',
    field: 'saveDTLog',
    value: false,
    col: {
      span: 8,
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
    title: '保存CU文件',
    field: 'saveCU',
    value: false,
    col: {
      span: 8,
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
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{ title }}</el-divider>',
    vm: new Vue({
      data: {
        title: '文件上传'
      }})
  },
  {
    type: 'select',
    field: 'uploadDataFileFormat',
    title: '上传文件类型',
    value: getDictByTagName('uploadDocType')[0].value,
    options: getDictByTagName('uploadDocType'),
    col: {
      span: 6,
      xs: 24
    }
  },
  {
    type: 'switch',
    title: '上传PCAP文件',
    field: 'uploadPCAPFile',
    value: false,
    col: {
      span: 6,
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
    title: '上传MOS文件',
    field: 'uploadMOSFile',
    value: false,
    col: {
      span: 6,
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
    title: '上传文件压缩',
    field: 'uploadDataFileZip',
    value: false,
    col: {
      span: 6,
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
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{ title }}</el-divider>',
    vm: new Vue({
      data: {
        title: '车速控制'
      }})
  },
  {
    type: 'switch',
    title: '使用车速控制',
    field: 'isSpeedLimit',
    value: false,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      'trueValue': '1',
      'falseValue': '0',
      slot: {
        open: true,
        close: false
      }
    }
  },
  {
    type: 'select',
    field: 'speedAction',
    title: '超出速率范围后行为',
    value: getDictByTagName('overRateAction')[0].value,
    options: getDictByTagName('overRateAction'),
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'InputNumber',
    field: 'max',
    title: '最高时速(m/h)',
    value: 0,
    props: {
      min: 0
    },
    col: {
      span: 12, xs: 24
    }
  },
  {
    type: 'InputNumber',
    field: 'maxSpeedPenaltyDuration',
    title: '最高时速持续时间(min)',
    value: 0,
    props: {
      min: 0
    },
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'InputNumber',
    field: 'least',
    title: '最低时速(m/h)',
    value: 0,
    props: {
      min: 0
    },
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'InputNumber',
    field: 'leastSpeedPenaltyDuration',
    title: '最低时速持续时间(min)',
    value: 0,
    props: {
      min: 0
    },
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{ title }}</el-divider>',
    vm: new Vue({
      data: {
        title: '其他设置'
      }})
  },
  {
    type: 'hidden',
    field: 'testAfterSych',
    value: 0
  },
  {
    type: 'input',
    field: 'smsAlarmRecvNum',
    title: '短信告警接收号码',
    props: { placeholder: '请输入', maxlength: '11' },
    col: { span: 6, xs: 24 }
  },
  {
    type: 'select',
    field: 'testAction',
    title: '开始测试选项',
    value: getDictByLanguage('TestBeginOption')[0].value,
    options: getDictByLanguage('TestBeginOption'),
    col: {
      span: 19,
      xs: 24
    }
  },
  {
    type: 'template',
    field: 'upsAction',
    title: '外部停电UPS选项',
    col: { span: 19, xs: 24 },
    template: '<el-row ><el-col :span="8"><el-select v-model="upsAction" class="ups-action"><el-option v-for="item in upsActionOption" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select></el-col><el-col :span="8" v-show="Number(upsAction) === 2">指定时间(min)： <el-input-number v-model="size" :min="1"></el-input-number></el-col></el-row>',
    vm: new Vue({
      data: {
        size: 15,
        upsAction: getDictByTagName('upsOptionAfterPowerCut')[0].value,
        upsActionOption: getDictByTagName('upsOptionAfterPowerCut')
      },
      methods: {
        handleSwitchType(v) {
          console.log(typeof v)
        }
      }
    })
  },
  {
    type: 'InputNumber',
    title: 'GPS静止n(s)后暂停测试',
    field: 'gpsStaticAction',
    props: { min: 0 },
    col: { span: 8, xs: 24 }
  },
  {
    type: 'InputNumber',
    title: 'GPS丢失止n(s)后暂停',
    field: 'gpsMissAction',
    props: { min: 0 },
    col: { span: 8, xs: 24 }
  },
  {
    type: 'InputNumber',
    title: 'GPS丢失止n(s)后发送警告',
    field: 'gpsMissAlarm',
    props: { min: 0 },
    col: { span: 8, xs: 24 }
  },
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{ title }}</el-divider>',
    vm: new Vue({
      data: {
        title: ''
      }})
  }
]

export { highSettingRuleForm }
