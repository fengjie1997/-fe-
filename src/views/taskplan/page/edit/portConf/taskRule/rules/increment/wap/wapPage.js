// MOC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'
const taskRule = [
  {
    type: 'select',
    field: 'psCallMode',
    title: '是否pscall',
    value: getDictByTagName('PSCallMode')['1'].value,
    options: getDictByTagName('PSCallMode'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'Mode',
    title: '登陆或刷新',
    value: getDictByTagName('wappageMode')['1'].value,
    options: getDictByTagName('wappageMode'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'RefreshType',
    title: '测试模式',
    value: getDictByTagName('wappageRefreshType')['1'].value,
    options: getDictByTagName('wappageRefreshType'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'userAgent',
    title: '浏览器类型',
    value: getDictByTagName('wappageUserAgent')['1'].value,
    options: getDictByTagName('wappageUserAgent'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'refreshURLLayer',
    title: 'WAP页面测试刷新层数',
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
    field: 'pageTimeout',
    title: 'WAP页面测试刷新层数',
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
    field: 'noDataTimeout',
    title: '无数据超时时间',
    value: 0,
    col: {
      span: 24,
      xs: 24
    },
    props: {
      min: 0
    }
  },

  {
    type: 'input',
    field: 'saveDirectory',
    title: '保存目录',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'homePage',
    title: '主页',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'switch',
    title: '加载图片',
    field: 'loadImage',
    value: true,
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
    title: '清除缓存',
    field: 'clearCache',
    value: true,
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
    title: '保存文件',
    field: 'isSaveFile',
    value: true,
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
    title: '保存文件',
    field: 'useGateway',
    value: true,
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
  }

]
var taskWapPage =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'wapPageTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'Wap Page测试配置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }
    })
  }

export { taskWapPage }
