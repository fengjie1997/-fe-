
import Vue from 'vue'
import { commonOptions } from './common'
import { getDictByTagName } from '@/utils/dictCache.js'
const networkLockSetting = [
  {
    type: 'switch',
    title: '锁频',
    field: 'isLockBand',
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
    title: '切换结束当前任务',
    field: 'saveByPort',
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
    title: '是否锁频点',
    field: 'isLockArfcn',
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
    title: '是否锁小区',
    field: 'isLockCell',
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
    type: 'InputNumber',
    field: 'lockArfcn',
    title: '被锁的频点',
    value: 10,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: '请填写任务次数',
      trigger: 'blur'
    }]
  },

  {
    type: 'InputNumber',
    field: 'lockCellFrequency',
    title: '小区频点',
    value: 0,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: '小区频点',
      trigger: 'blur'
    }]
  },
  {
    type: 'InputNumber',
    field: 'lockCellPSC',
    title: '锁小区的PSC',
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
    type: 'select',
    field: 'lockNetwork',
    title: '锁网模式',
    value: getDictByTagName('LockNetwork')[0].value,
    options: getDictByTagName('LockNetwork'),
    col: {
      span: 12,
      xs: 12
    }
  },

  {
    type: 'select',
    field: 'callControl',
    title: '起呼控制',
    value: getDictByTagName('CallControl')[0].value,
    options: getDictByTagName('CallControl'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'testControl',
    title: '测试网络控制',
    value: getDictByTagName('CallControl')[0].value,
    options: getDictByTagName('CallControl'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'lteBand',
    title: '频段',
    value: getDictByTagName('LTEBand')[0].value,
    options: getDictByTagName('LTEBand'),
    col: {
      span: 12,
      xs: 12
    },
    props: {
      'multiple': true
    }
  }

]
// as rule
const networkLockSettingRule = {
  type: 'template',
  name: 'children',
  field: 'networkLockSetting',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: '锁网设置',
      active: ['1'],
      modelForm: {},
      rule: networkLockSetting,
      option: commonOptions
    }})
}
export { networkLockSetting, networkLockSettingRule }
