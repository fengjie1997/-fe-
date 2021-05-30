// MOC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'
const taskRule = [
  {
    type: 'input',
    field: 'sendText',
    title: '发送内容',
    value: 'how are you?',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'friendName',
    title: '好友名称',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'InputNumber',
    field: 'timeOut',
    title: '超时(s)',
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
    type: 'select',
    field: 'testType',
    title: '短信测试类型',
    value: getDictByTagName('whatsappPictureQuality')[0].value,
    options: getDictByTagName('whatsappPictureQuality'),
    col: {
      span: 12,
      xs: 12
    }
  }
]
var taskWhatsApp =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'wapPageTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'Whats App测试配置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }
    })
  }

export { taskWhatsApp }
