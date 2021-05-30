import Vue from 'vue'
import i18n from '@/lang'
import { commonOptions } from './common'
import { getDictByTagName } from '@/utils/dictCache.js'
const rules = [
  {
    type: 'switch',
    title: '是否使用该设置',
    field: 'isCheck',
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
    field: 'pppName',
    title: '拨号连接名称',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'rasNumber',
    title: '拨号号码',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'apn',
    title: 'APN',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'username',
    title: 'username',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'password',
    title: 'password',
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    props: {
      type: 'password'
    }
  },
  {
    type: 'input',
    field: 'ulueRate',
    title: '上行请求速率',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'dlueRate',
    title: '下行请求速率',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'select',
    field: 'connectionType',
    title: '业务等级',
    value: getDictByTagName('TrafficClass')[0].value,
    options: getDictByTagName('TrafficClass'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'ipType',
    title: 'IP类型',
    value: getDictByTagName('IpType')[0].value,
    options: getDictByTagName('IpType'),
    col: {
      span: 12,
      xs: 12
    }
  }

]
const createdConnectionList = [
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{title}}</el-divider>',
    vm: new Vue({
      data: {
        title: '拨号设置-创建连接信息'
      }})
  },
  {
    type: 'template',

    name: 'childrenArray',
    field: 'createdConnectionInfos',
    value: [],
    col: { span: 24, xs: 24 },
    template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
    vm: new Vue({
      data: {
        modelForm: {},
        rule: rules,
        option: commonOptions
      }})
  }

]
export { createdConnectionList }
