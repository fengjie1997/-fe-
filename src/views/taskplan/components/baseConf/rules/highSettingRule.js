/**
 * Form-Create 高级设置
 */
import Vue from 'vue'
import { getDictByLanguage } from '@/utils/dictByLanguage'
import i18n from '@/lang'
const highSettingRuleForm = [
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{ title }}</el-divider>',
    vm: new Vue({
      data: {
        title: i18n.t('taskPlan.title.DataTransferConfig')
      }})
  },
  {
    type: 'select',
    field: 'dataTransmit',
    title: i18n.t('template.dataTransOption'),
    value: getDictByLanguage('dataTransferType')[0].value,
    options: getDictByLanguage('dataTransferType'),
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'select',
    title: i18n.t('template.portNumber'),
    field: 'modemPort',
    value: 1,
    options: [],
    col: { span: 12, xs: 24 },
    validate: [{
      required: true,
      message: i18n.t('common.pleaseSelect'),
      trigger: 'blur'
    }],
    emit: [{
      name: 'change',
      inject: {}
    }]
  },
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{ title }}</el-divider>',
    vm: new Vue({
      data: {
        title: i18n.t('taskPlan.title.fileSplit')
      }})
  },
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.saveByPort'),
    field: 'saveByPort',
    value: true,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: 'yes',
        close: 'no'
      }
    }
  },
  {
    type: 'template',
    field: 'switchType',
    title: i18n.t('taskPlan.label.swicthType'),
    col: { span: 24, xs: 24 },
    template: '<el-row :gutter="5"><el-col :span="6"><el-select v-model="switchType" @change="((val)=>{handleSwitchType(val)})" ><el-option v-for="item in switchTypeOption" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select></el-col><el-col :span="8" v-show="switchType === \'By Time\'"><el-input-number v-model="duration" :min="1"></el-input-number></el-col><el-col :span="8" v-show="switchType === \'By Size\'"><el-input-number v-model="size" :min="1"></el-input-number></el-col></el-row>',
    vm: new Vue({
      data: {
        size: 10,
        duration: 60,
        switchType: getDictByLanguage('switchingType')[0].value,
        switchTypeOption: getDictByLanguage('switchingType')
      },
      created() {
        console.log(this)
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
        title: i18n.t('taskPlan.title.fileSave')
      }})
  },
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.saveRCU'),
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
        open: 'yes',
        close: 'no'
      }
    }
  },
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.saveORGRCU'),
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
        open: 'yes',
        close: 'no'
      }
    }
  },
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.saveDCF'),
    field: 'saveDCF',
    value: true,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: 'yes',
        close: 'no'
      }
    }
  },
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.saveCTI'),
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
        open: 'yes',
        close: 'no'
      }
    }
  },
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.saveDTlog'),
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
        open: 'yes',
        close: 'no'
      }
    }
  },
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.saveCU'),
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
        open: 'yes',
        close: 'no'
      }
    }
  },
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{ title }}</el-divider>',
    vm: new Vue({
      data: {
        title: i18n.t('taskPlan.title.fileUpload')
      }})
  },
  {
    type: 'select',
    field: 'uploadDataFileFormat',
    title: i18n.t('taskPlan.label.uploadDataFileFormat'),
    value: getDictByLanguage('uploadDocType')[1].value,
    options: getDictByLanguage('uploadDocType'),
    col: {
      span: 24,
      xs: 24
    }
  },
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.uploadPCAPFile'),
    field: 'uploadPCAPFile',
    value: false,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: 'yes',
        close: 'no'
      }
    }
  },
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.uploadMOSFile'),
    field: 'uploadMOSFile',
    value: false,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: 'yes',
        close: 'no'
      }
    }
  },
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.uploadDataFileZip'),
    field: 'uploadDataFileZip',
    value: false,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: 'yes',
        close: 'no'
      }
    }
  },
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{ title }}</el-divider>',
    vm: new Vue({
      data: {
        title: i18n.t('taskPlan.title.speedControl')
      }})
  },
  {
    type: 'switch',
    title: i18n.t('taskPlan.label.isSpeedLimit'),
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
    title: i18n.t('taskPlan.label.speedAction'),
    value: getDictByLanguage('overRateAction')[0].value,
    options: getDictByLanguage('overRateAction'),
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'InputNumber',
    field: 'max',
    title: i18n.t('taskPlan.label.max'),
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
    title: i18n.t('taskPlan.label.maxSpeedPenaltyDuration'),
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
    title: i18n.t('taskPlan.label.least'),
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
    title: i18n.t('taskPlan.label.leastSpeedPenaltyDuration'),
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
        title: i18n.t('taskPlan.title.otherConfig')
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
    title: i18n.t('taskPlan.label.smaAlarmRecvNum'),
    props: { placeholder: i18n.t('common.inputTip'), maxlength: '11' },
    col: { span: 6, xs: 24 }
  },
  {
    type: 'select',
    field: 'testAction',
    title: i18n.t('taskPlan.label.testAction'),
    value: 0,
    options: [{ label: i18n.t('taskPlan.label.testBeginOption0'), value: 0 }, { label: i18n.t('taskPlan.label.testBeginOption1'), value: 1 }],
    col: {
      span: 19,
      xs: 24
    }
  },
  {
    type: 'template',
    field: 'upsAction',
    title: i18n.t('taskPlan.label.upsAction'),
    col: { span: 19, xs: 24 },
    template: '<el-row ><el-col :span="8"><el-select v-model="upsAction" class="ups-action"><el-option v-for="item in upsActionOption" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select></el-col><el-col :span="8" v-show="Number(upsAction) === 2">{{ specifiedTime }} <el-input-number v-model="size" :min="1"></el-input-number></el-col></el-row>',
    vm: new Vue({
      data: {
        specifiedTime: i18n.t('taskPlan.label.specifiedTime'),
        size: 15,
        upsAction: getDictByLanguage('upsOptionAfterPowerCut')[0].value,
        upsActionOption: getDictByLanguage('upsOptionAfterPowerCut')
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
    title: i18n.t('taskPlan.label.gpsStaticAction'),
    field: 'gpsStaticAction',
    props: { min: 0, title: i18n.t('taskPlan.title.gpsStaticActionTitle') },
    col: { span: 12, xs: 24 }
  },
  {
    type: 'InputNumber',
    title: i18n.t('taskPlan.label.gpsMissAction'),
    field: 'gpsMissAction',
    props: { min: 0, title: i18n.t('taskPlan.title.gpsMissActionTitle') },
    col: { span: 12, xs: 24 }
  },
  {
    type: 'InputNumber',
    title: i18n.t('taskPlan.label.gpsMissAlarm'),
    field: 'gpsMissAlarm',
    props: { min: 0, title: i18n.t('taskPlan.title.gpsMissAlarmTitle') },
    col: { span: 12, xs: 24 }
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
