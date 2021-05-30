import Vue from 'vue'
import { commonOptions } from '../../common/common'
const taskRule = [
  {
    type: 'InputNumber',
    field: 'packetSize_B',
    title: '包大小(Byte)',
    value: 64,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'hopProbeNumer',
    title: '节点探测次数',
    value: 1,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'hopTimeout',
    title: '节点超时(s)',
    value: 5,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'hopInterval',
    title: '每个节点间隔时长(s)',
    value: 1,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 0
    }
  },
  {
    type: 'input',
    field: 'address',
    title: i18n.t('taskPlan.mftpDown.address'),
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  }

]
var taskTracert = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'tracertTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: 'Tracert测试设置',
      active: ['1'],
      modelForm: {},
      rule: taskRule,
      option: commonOptions
    }

  })
}

export { taskTracert }
