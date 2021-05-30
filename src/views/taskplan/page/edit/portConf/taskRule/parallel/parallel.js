// MOC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../../common/common'
const taskRule = [
  {
    type: 'InputNumber',
    field: 'voiceAheadData',
    title: '语音提前数据业务时长(ms)',
    value: 5000,
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
    field: 'totalTimeout',
    title: '单次并发总超时密码(ms)',
    value: 10000,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  }

]
var taskParallel =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'parallelServiceTestConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: 'ParallelService 测试配置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      }
    })
  }

export { taskParallel }
