import Vue from 'vue'
import List from './list/list.vue'
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../common/common'
var cwRule = [
  {
    title: '扫描速率(Hz/S)',
    type: 'InputNumber',
    field: 'rate',
    value: 200,
    props: {
      max: 5000,
      min: 0.1
    },
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'networkType',
    title: '网络类型',
    value: getDictByTagName('cwNetworkType')[0].value,
    options: getDictByTagName('cwNetworkType'),
    col: {
      span: 12,
      xs: 12
    }
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
    value: 'LTE_pilot'
  },
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'lteTopNConfig',
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
var taskLteScanner = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'scannerTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: 'LTE_pilot',
      active: ['1'],
      modelForm: {},
      rule: taskRule,
      option: commonOptions
    }})
}

export { taskLteScanner }
