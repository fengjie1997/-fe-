// MOC基础任务配置
import Vue from 'vue'
import MultiFtpDownForm from './multiFtpDownload.vue'
// import { ftpHostSetting } from './ftpHostSetting'
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../../common/common'
var mftpDownConfigRule = [
  {
    type: 'switch',
    field: 'isCheck'
  }
]
const taskRule = [
  {
    type: 'select',
    field: 'psCallMode',
    title: '测试模式',
    value: getDictByTagName('PSCallMode')[0].value,
    options: getDictByTagName('PSCallMode'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'endCondition',
    title: '结束条件',
    value: getDictByTagName('mhttpdownEndCondition')[0].value,
    options: getDictByTagName('mhttpdownEndCondition'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'downloadTimeout',
    title: '下载超时(ms)',
    value: 1200,
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
    field: 'downloadDuration',
    title: '下载时长(ms)',
    value: 300,
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
    title: '无流量超时(S)',
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
    field: 'waitTime',
    title: '开始等待时间(ms)',
    value: 300,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
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
  },
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'mftpDownConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: '服务设置',
        active: ['1'],
        modelForm: {},
        rule: mftpDownConfigRule,
        option: commonOptions
      }})
  }

]
var taskMultiFtpDownload =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'mftpDownList',
    col: { span: 24, xs: 24 },
    template: '<MultiFtpDownForm ref="ftpDownFrom" :rule="rule" />',
    vm: new Vue({
      components: { MultiFtpDownForm },
      data: {
        data: {},
        title: '多路FTP下载测试配置',
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      },
      computed: {
        formData() {
          return this.$refs.ftpDownFrom.formData
        }
      },
      watch: {
        // 编辑表单
        data(newData) {
          this.$refs.ftpDownFrom.setForm(newData)
        }
      }
    })
  }

export { taskMultiFtpDownload }
