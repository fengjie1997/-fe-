// MOC基础任务配置
import Vue from 'vue'
import List from './list/blind.vue'
import { getDictByTagName } from '@/utils/dictCache.js'
import { channelInfoList } from '../common/channelInfoList/list'
import { commonOptions } from '../common/common'
console.log(channelInfoList)
var cwRule = [
  {
    type: 'select',
    field: 'acdMeasMode',
    title: 'ACD测量模式',
    value: getDictByTagName('acdMeasMode')[0].value,
    options: getDictByTagName('acdMeasMode'),
    col: {
      span: 8,
      xs: 8
    }
  },
  {
    type: 'select',
    field: 'sensitivity',
    title: 'Sensitivity',
    value: getDictByTagName('sensitivity')[0].value,
    options: getDictByTagName('sensitivity'),
    col: {
      span: 8,
      xs: 8
    }
  },
  {
    type: 'select',
    field: 'minBandWidth',
    title: '最小带宽',
    value: 5,
    options: getDictByTagName('minBandWidth'),
    col: {
      span: 8,
      xs: 8
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
    value: 'BLIND'
  },
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'acdConfig',
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
var taskBlindScanner = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'scannerTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: 'Blind盲扫测试',
      active: ['1'],
      modelForm: {},
      rule: taskRule,
      option: commonOptions
    }})
}

export { taskBlindScanner }
