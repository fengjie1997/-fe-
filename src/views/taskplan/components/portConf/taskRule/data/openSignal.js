import Vue from 'vue'
import { commonOptions } from '../common/common'
const taskRule = [
  {
    type: 'InputNumber',
    field: 'DownloadThreadCount',
    title: '下载线程数',
    value: 1,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 1,
      max: 10
    }
  },
  {
    type: 'InputNumber',
    field: 'UploadThreadCount',
    title: '上传线程数',
    value: 1,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 1,
      max: 10
    }
  }

]
var taskOpenSignal =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'openSignalTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'Open Signal测试设置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }

    })
  }

export { taskOpenSignal }
