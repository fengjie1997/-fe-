// MOC基础任务配置
import Vue from 'vue'
import httpPage from './httpPage.vue'
// import { urlListRule } from './taskRules/urlList'
import { commonOptions } from '../../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'
import { proxySetting } from './proxySetting'
import { urlListRule } from './urlList'
const taskRule = [
  {
    type: 'select',
    field: 'mode',
    title: '测试模式',
    value: getDictByTagName('HTTPPageMode')[0].value,
    options: getDictByTagName('HTTPPageMode'),
    col: {
      span: 13,
      xs: 12
    }
  },
  {
    type: 'switch',
    title: '显示浏览器',
    field: 'showBrowser',
    value: false,
    col: {
      span: 11,
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
    field: 'pageTimeout',
    title: '页面超时(s)',
    value: 0,
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
    field: 'noDataTimeout',
    title: '无流量超时(s)',
    value: 0,
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
    field: 'connectTimeout',
    title: '连接超时(ms)',
    value: 20000,
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
    field: 'port',
    title: '端口',
    value: 80,
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
    field: 'browserInterval',
    title: '浏览间隔时间(s)',
    value: 2,
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
    field: 'randomUrlCount',
    title: '每次执行随机地址个数',
    value: 4,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'switch',
    title: '启用代理',
    field: 'useProxy',
    value: false,
    col: {
      span: 13,
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
  }
]
var rules = taskRule.concat(urlListRule, proxySetting)
var taskHttpPage =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'httpPageTestConfig',
    col: { span: 24, xs: 24 },
    template: '<httpPage ref="refHttpPage" :rule="rule" />',
    vm: new Vue({
      components: { httpPage },
      data: {
        data: {},
        title: 'HTTP Page测试设置',
        active: ['1'],
        modelForm: {},
        rule: rules,
        option: commonOptions
      },
      computed: {
        formData() {
          var data = this.$refs.refHttpPage.formData

          return data
        }
      },
      watch: {
        // 编辑表单
        data(newData) {
          this.$refs.refHttpPage.setForm(newData)
        }
      }
    })
  }

export { taskHttpPage }
