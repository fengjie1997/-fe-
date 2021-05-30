// MOC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'
import { customPioneer } from './public/customPioneer'
import { gatewaySetting } from './public/gatewaySetting'
const taskRule = [
  {
    type: 'input',
    field: 'receiverNumber',
    title: '接收方号码',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'ccNumber',
    title: '抄送号码',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'subject',
    title: 'MMS主题',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'content',
    title: 'MMS文本',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'priority',
    title: '优先级',
    value: getDictByTagName('mmsselfPriority')['1'].value,
    options: getDictByTagName('mmsselfPriority'),
    col: {
      span: 12,
      xs: 12
    }
  },

  {
    type: 'input',
    field: 'LocalFile',
    title: '本地文件',
    value: '',
    col: {
      span: 12,
      xs: 24
    }

  },
  {
    type: 'input',
    field: 'mmsc',
    title: '彩信信中心号码',
    value: '',
    col: {
      span: 12,
      xs: 24
    }

  },
  {
    type: 'input',
    field: 'imageFile',
    title: '附件',
    value: '',
    col: {
      span: 12,
      xs: 24
    }

  },
  {
    type: 'select',
    field: 'fileSource',
    title: '文件来源',
    value: getDictByTagName('mmsselfFileSource')['1'].value,
    options: getDictByTagName('mmsselfFileSource'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'fileSize',
    title: '发送超时(s)',
    value: 2048,
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
    field: 'sendTimeout',
    title: '发送超时(s)',
    value: 60,
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
    field: 'pushTimeout',
    title: 'PUSH超时(s)',
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
    field: 'receiveTimeout',
    title: '接收超时(s)',
    value: 60,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  }

]
var rules = taskRule.concat(customPioneer, gatewaySetting)
var taskMmsSelf =
  {
    type: 'template',
    name: 'children',
    field: 'mmsSelfTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'MMS Self 测试配置',
        active: ['1'],
        modelForm: {},
        rule: rules,
        option: commonOptions
      }
    })
  }

export { taskMmsSelf }
