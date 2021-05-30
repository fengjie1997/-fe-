// MOC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'
const taskRule = [
  {
    type: 'select',
    field: 'testType',
    title: '短信测试类型',
    value: getDictByTagName('mmssendTestType')[0].value,
    options: getDictByTagName('mmssendTestType'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'priority',
    title: '优先级',
    value: getDictByTagName('mmssendPriority')['1'].value,
    options: getDictByTagName('mmssendPriority'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'fileSource',
    title: '文件来源',
    value: getDictByTagName('mmssendFileSource')['1'].value,
    options: getDictByTagName('mmssendFileSource'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'fileSize',
    title: '文件大小(KB)',
    value: 2048,
    col: {
      span: 21,
      xs: 24
    }
  },

  {
    type: 'InputNumber',
    field: 'sendTimeout',
    title: '发送串口波特率',
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
    field: 'mmsc',
    title: '被叫设备端口',
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
    type: 'input',
    field: 'localFile',
    title: '本地彩信文件路径和文件名',
    value: 300,
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
  }

]
var taskMmsSend =
  {
    type: 'template',
    name: 'children',
    field: 'mmsSendTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'MMS Send 测试配置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }
    })
  }

export { taskMmsSend }
