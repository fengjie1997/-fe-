// MOC基础任务配置
import i18n from '@/lang'
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
    field: 'downloadFileType',
    title: '文件类型',
    value: getDictByTagName('wapdownloadDownloadFileType')['1'].value,
    options: getDictByTagName('wapdownloadDownloadFileType'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'downloadTimeout',
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
    title: '无流量超时(s)',
    value: 30,
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
    field: 'threadCount',
    title: '线程数',
    value: 1,
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'switch',
    title: '是否保存文件',
    field: 'isSaveFile',
    value: true,
    col: {
      span: 12,
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
    title: '使用网关',
    field: 'useGateway',
    value: true,
    col: {
      span: 12,
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
    title: 'Wap2.0测试',
    field: 'byWap',
    value: true,
    col: {
      span: 12,
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
    type: 'input',
    field: 'saveDirectory',
    title: '保存目录',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  }

]
var taskWapDownload =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'wapDownloadTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'WAP Download 测试配置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }
    })
  }

export { taskWapDownload }
