import Vue from 'vue'
import i18n from '@/lang'
import { commonOptions } from '../public/common'
import { getDictByTagName } from '@/utils/dictCache.js'
const constraIntSetting = [
  {
    type: 'switch',
    title: '启用设置',
    field: 'isAvailable',
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
    type: 'switch',
    title: '是否根据场强进行控制',
    field: 'controlByCoverageCondition',
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
    field: 'coverageControlAction',
    title: '场强控制触发行为',
    value: getDictByTagName('CoverageControlAction')[0].value,
    options: getDictByTagName('CoverageControlAction'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'coverageThreshold',
    title: '场强控制阈值(dBm/dB)',
    value: 20,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: '',
      trigger: 'blur'
    }]
  },
  {
    type: 'InputNumber',
    field: 'coveragePenalty',
    title: '触发控制行为前场强阈值持续时长(ms)',
    value: 0,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'switch',
    title: '是否根据LAC或者SID信息进行控制',
    field: 'controlByLACSIDCondition',
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
    type: 'InputNumber',
    field: 'LACSIDPenalty',
    title: '触发控制行为前LAC/SID设定值需要满足的持续时长',
    value: 15,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0
    }
  }
]
// as rule
const constraIntSettingRule = {
  type: 'template',
  name: 'children',
  field: 'constraIntSetting',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: '约束设置',
      active: ['1'],
      modelForm: {},
      rule: constraIntSetting,
      option: commonOptions
    }})
}
export { constraIntSetting, constraIntSettingRule }
