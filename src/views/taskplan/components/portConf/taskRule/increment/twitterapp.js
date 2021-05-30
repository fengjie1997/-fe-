// MOC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'

const taskRule = [
  {
    type: 'select',
    field: 'tweetImage',
    title: '推特图像质量:',
    value: getDictByTagName('twitterappTweetImage')[0].value,
    options: getDictByTagName('twitterappTweetImage'),
    col: {
      span: 12,
      xs: 12
    }
  },

  {
    type: 'input',
    field: 'tweetText',
    title: '推特内容',
    value: 'how are you?',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'searchTweet',
    title: '搜索推文标识',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'InputNumber',
    field: 'timeOut',
    title: '单业务超时(s)',
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
var taskTwitterapp =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'twitterAppTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'Twitter App测试配置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }})
  }

export { taskTwitterapp }
