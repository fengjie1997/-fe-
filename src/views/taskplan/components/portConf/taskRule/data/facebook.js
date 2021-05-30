import Vue from 'vue'
// import { urlListRule } from './taskRules/urlList'
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../common/common'
const taskRule = [
  {
    type: 'InputNumber',
    field: 'duration',
    title: '持续时长(s)',
    value: 10,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'select',
    field: 'sendPicSizeLevel',
    title: '发送图片大小级别',
    value: getDictByTagName('facebookSendPicSizeLevel')[0].value,
    options: getDictByTagName('facebookSendPicSizeLevel'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'appId',
    title: 'APP ID',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'appSecret',
    title: 'AppSecret',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'sendContent',
    title: '发送内容',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  }

]
var taskFacebook =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'facebookTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'Facebook 测试设置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }

    })
  }

export { taskFacebook }
