// MOC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../common/common'
const taskRule = [
  {
    type: 'input',
    field: 'country',
    title: '国家',
    value: 'China',
    col: {
      span: 12,
      xs: 12
    }
  },

  {
    type: 'input',
    field: 'city',
    title: '城市',
    value: 'guangzhou',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'url',
    title: 'URL',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'Input',
    field: 'sponsor',
    title: '服务器赞助商',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'downloadFile',
    title: '下载时用的文件',
    value: '4000*4000',
    col: {
      span: 12,
      xs: 12
    }
  },

  {
    type: 'InputNumber',
    field: 'downloadThreadCountCount',
    title: '下载线程数',
    value: 2,
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
    field: 'uploadThreadCount',
    title: '上传线程数',
    value: 1,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0

    }
  }

]
var taskSpeed = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'speedTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: 'Speed 测试设置',
      active: ['1'],
      modelForm: {},
      rule: taskRule,
      option: commonOptions
    }

  })
}

export { taskSpeed }
