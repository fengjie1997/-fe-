import Vue from 'vue'
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../common/common'
const taskRule = [
  {
    type: 'input',
    field: 'sendText',
    title: '发送内容',
    value: 'how are you?',
    col: {
      span: 12,
      xs: 12
    }
  },

  {
    type: 'select',
    field: 'pictureQuality',
    title: '图像质量',
    value: getDictByTagName('facebookSendPicSizeLevel')[0].value,
    options: getDictByTagName('facebookSendPicSizeLevel'),
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'voiceDuration',
    title: '语音持续时长',
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
    type: 'InputNumber',
    field: 'timeOut',
    title: '单业务超时',
    value: 30,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'videoDuration',
    title: '视频持续时长',
    value: 10,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  }

]
var taskSkype =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'skypeTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'Skype 测试设置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }

    })
  }

export { taskSkype }
