// MOC基础任务配置
import Vue from 'vue'
import List from './list/spectrum.vue'
// import { getDictByTagName } from '@/utils/dictCache.js'
import { channelInfoList } from '@/taskplan/components/portConf/taskRule/common/channelInfoList/list'
import { commonOptions } from '../../common/common'
console.log(channelInfoList)
var cwRule = [
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
    value: 'SPECTRUM'
  },
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'spectrumConfig',
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
var taskSpectrumScanner = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'scannerTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: 'SPECTRUM频谱测试',
      active: ['1'],
      modelForm: {},
      rule: taskRule,
      option: commonOptions
    }})
}

export { taskSpectrumScanner }
