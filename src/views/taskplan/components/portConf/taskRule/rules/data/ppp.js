// MOC基础任务配置
import i18n from '@/lang'
import Vue from 'vue'
// import { urlListRule } from './taskRules/urlList'
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../../common/common'
const taskRule = [
  {
    type: 'switch',
    field: 'collectData',
    title: '是否采集数据',
    value: true,
    col: {
      span: 8,
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
    field: 'duration',
    title: '任务时长(ms)',
    value: 100,
    col: {
      span: 8,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'select',
    field: 'dialType',
    title: '拨号类型',
    value: getDictByTagName('pppDialType')[0].value,
    options: getDictByTagName('pppDialType'),
    col: {
      span: 8,
      xs: 12
    }
  }

]
var taskPPP = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'pppTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: 'PPP 测试设置',
      active: ['1'],
      modelForm: {},
      rule: taskRule,
      option: commonOptions
    }

  })
}

export { taskPPP }
