import Vue from 'vue'
import List from './list/tds.vue'
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../common/common'
var demodulationSetRule = [
  {
    type: 'select',
    field: 'rf',
    title: '天线端口',
    value: getDictByTagName('scannerGsmRf')[0].value,
    options: getDictByTagName('scannerGsmRf'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'l3Msg',
    title: '信令列表',
    value: getDictByTagName('l3Msg')[0].value,
    options: getDictByTagName('l3Msg'),
    col: {
      span: 12,
      xs: 12
    }
  }
]
var cwRule = [
  {
    title: '扫描速率(Hz/S)',
    type: 'InputNumber',
    field: 'rate',
    value: 200,
    props: {
      max: 800,
      min: 0.5
    },
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'rf',
    title: '天线端口',
    value: getDictByTagName('scannerGsmRf')[0].value,
    options: getDictByTagName('scannerGsmRf'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'outputMode',
    title: '输出模式',
    value: getDictByTagName('outputMode')[0].value,
    options: getDictByTagName('outputMode'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'wcdmaMeasMode',
    title: '测量模式',
    value: getDictByTagName('wcdmaMeasMode')[0].value,
    options: getDictByTagName('wcdmaMeasMode'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'demodulationSet',
    col: { span: 24, xs: 24 },
    template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
    vm: new Vue({
      data: {
        modelForm: {},
        rule: demodulationSetRule,
        option: commonOptions
      },
      methods: {
        setChannelList(arr) {
          console.log(arr)
          this.$set(this.list, 'channelInfos', arr)
        }
      }
    })
  },
  {
    type: 'template',
    title: '频段信息',
    name: 'childrenArrays',
    field: 'channelInfoList',
    eleField: 'channelInfos',
    col: { span: 24, xs: 24 },
    template: '<div><List :list="list.channelInfos" @setList="setChannelList" /><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
    vm: new Vue({
      components: { List },
      data: {
        list: {
          channelInfos: []
        },
        formArray: [],
        modelForm: {},
        rule: [],
        option: commonOptions
      },
      methods: {
        setChannelList(arr) {
          console.log(arr)
          this.$set(this.list, 'channelInfos', arr)
        }
      }
    })
  }
  // channelInfoList
]
var taskRule = [
  {
    type: 'hidden',
    field: 'scanType',
    value: 'TDSCDMA_pilot'
  },
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'tdsTopNConfig',
    col: { span: 24, xs: 24 },
    template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
    vm: new Vue({
      data: {
        modelForm: {},
        rule: cwRule,
        option: commonOptions
      }})
  }

]
var taskTdscdmaScanner = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'scannerTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: 'TDSCDMA_pilot',
      active: ['1'],
      modelForm: {},
      rule: taskRule,
      option: commonOptions
    }})
}

export { taskTdscdmaScanner }
