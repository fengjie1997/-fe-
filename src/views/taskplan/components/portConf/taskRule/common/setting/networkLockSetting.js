import i18n from '@/lang'
import Vue from 'vue'
import { commonOption } from './commonOption.js'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
const networkLockSetting = [
  {
    type: 'switch',
    title: i18n.t('taskPlan.form.saveByPort'),
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
        open: i18n.t('taskPlan.label.true'),
        close: i18n.t('taskPlan.label.false')
      }
    }
  },
  {
    type: 'select',
    field: 'lockNetwork',
    title: i18n.t('taskPlan.form.lockNetwork'),
    value: 'Auto',
    options: [{ label: 'Auto', value: 'Auto' }, { label: 'GSM', value: 'GSM' }, { label: 'CDMA1X', value: 'CDMA1X' }, { label: 'WCDMA', value: 'WCDMA' }, { label: 'TDSCDMA', value: 'TDSCDMA' }, { label: 'EVDO', value: 'EVDO' }, { label: 'LTE', value: 'LTE' }, { label: 'FDD-LTE', value: 'FDD-LTE' }, { label: 'TDD-LTE', value: 'TDD-LTE' }, { label: '5G AUTO', value: '5G AUTO' }, { label: '5G NSA', value: '5G NSA' }, { label: '5G SA', value: '5G SA' }],
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'callControl',
    title: i18n.t('taskPlan.form.CallControl'),
    value: getDictByLanguage('CallControl')[0].value,
    options: getDictByLanguage('CallControl'),
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'select',
    field: 'testControl',
    title: i18n.t('taskPlan.form.testControl'),
    value: getDictByLanguage('CallControl')[0].value,
    options: getDictByLanguage('CallControl'),
    col: {
      span: 12,
      xs: 12
    }
  },
  // 锁频
  {
    type: 'switch',
    title: i18n.t('taskPlan.form.isLockBand'),
    field: 'isLockBand',
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
  {
    type: 'select',
    field: 'lteBand',
    title: i18n.t('taskPlan.form.lteBand'),
    value: '',
    options: getDictByLanguage('LTEBand'),
    col: {
      span: 12,
      xs: 24
    },
    props: {
      'multiple': true
    }
  },
  // 锁频点测试
  {
    type: 'switch',
    title: i18n.t('taskPlan.form.isLockArfcn'),
    field: 'isLockArfcn',
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
  {
    type: 'InputNumber',
    field: 'lockArfcn',
    title: i18n.t('taskPlan.form.lockArfcn'),
    value: undefined,
    col: {
      span: 12,
      xs: 24
    }
    // validate: [{
    //   required: true,
    //   message: '请填写任务次数',
    //   trigger: 'blur'
    // }]
  },
  // 锁小区测试
  {
    type: 'switch',
    title: i18n.t('taskPlan.form.isLockCell'),
    field: 'isLockCell',
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
  {
    type: 'InputNumber',
    field: 'lockCellFrequency',
    title: i18n.t('taskPlan.form.lockCellFrequency'),
    value: undefined,
    col: {
      span: 12,
      xs: 24
    }
    // validate: [{
    //   required: true,
    //   message: '小区频点',
    //   trigger: 'blur'
    // }]
  },
  {
    type: 'InputNumber',
    field: 'lockCellPSC',
    title: i18n.t('taskPlan.form.lockCellPSC'),
    value: undefined,
    col: {
      span: 8,
      xs: 24
    }
  }
]
// as rule
const networkLockSettingRule = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'networkLockSetting',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" @is-lock-arfcn-change="change" @is-lock-cell-change="change" @is-lock-band-change="change" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      data: {},
      title: i18n.t('taskPlan.form.networkLockSetting'),
      active: ['1'],
      modelForm: {},
      rule: networkLockSetting,
      option: commonOption
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
    },
    created() {
    },
    methods: {
      change() {
        if (this.modelForm.form.isLockBand) {
          this.modelForm.disabled(false, 'lteBand')
        } else {
          this.modelForm.disabled(true, 'lteBand')
        }
        if (this.modelForm.form.isLockArfcn) {
          this.modelForm.disabled(false, 'lockArfcn')
        } else {
          this.modelForm.disabled(true, 'lockArfcn')
        }
        if (this.modelForm.form.isLockCell) {
          this.modelForm.disabled(false, 'lockCellFrequency')
          this.modelForm.disabled(false, 'lockCellPSC')
        } else {
          this.modelForm.disabled(true, 'lockCellFrequency')
          this.modelForm.disabled(true, 'lockCellPSC')
        }
      }
    }
  })
}
export { networkLockSetting, networkLockSettingRule }
