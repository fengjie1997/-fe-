// MOC基础任务配置
import Vue from 'vue'
import i18n from '@/lang'
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../../common/common'
const taskRule = [
  {
    type: 'InputNumber',
    field: 'packetSize_B',
    title: '数据包大小(Byte)',
    value: 256,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'timeout',
    title: '超时时长(ms)',
    value: 5,
    col: {
      span: 13,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'ttl',
    title: 'TTL',
    value: 64,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 1,
      max: 255
    }
  },
  {
    type: 'select',
    field: 'ueState ',
    title: 'UEState',
    value: getDictByTagName('pingUEState')[0].value,
    options: getDictByTagName('pingUEState'),
    col: {
      span: 13,
      xs: 12
    }
  },
  {
    type: 'switch',
    title: 'hsPing',
    field: 'HSPing',
    value: true,
    col: {
      span: 11,
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
    title: 'atPing',
    field: 'ATPing',
    value: false,
    col: {
      span: 11,
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
  }

]
var taskPing =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'pingTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'Ping 测试设置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }

    })
  }

export { taskPing }
