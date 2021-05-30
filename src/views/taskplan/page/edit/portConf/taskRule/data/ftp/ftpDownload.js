// MOC基础任务配置
import Vue from 'vue'
import ftpDownForm from './ftpDownload.vue'
import { ftpHostSetting } from './ftpHostSetting'
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../../common/common'
const taskRule = [
  // {
  //   type: 'select',
  //   field: 'psCallMode',
  //   title: '测试模式',
  //   value: getDictByTagName('ftpdownloadPSCallMode')[0].value,
  //   options: getDictByTagName('ftpdownloadPSCallMode'),
  //   col: {
  //     span: 12,
  //     xs: 12
  //   },
  //   validate: [{
  //     required: true,
  //     message: '请选择测试模式',
  //     trigger: 'change'
  //   }]
  // },
  {
    type: 'select',
    field: 'transferProtocol',
    title: '传输协议',
    value: getDictByTagName('ftpuploadTransferProtocol')[0].value,
    options: getDictByTagName('ftpuploadTransferProtocol'),
    col: {
      span: 12,
      xs: 12
    },
    validate: [{
      required: true,
      message: '请选择测试模式',
      trigger: 'change'
    }]
  },
  {
    type: 'select',
    field: 'dataMode',
    title: '数据模式',
    value: getDictByTagName('ftpuploadDataMode')[0].value,
    options: getDictByTagName('ftpuploadDataMode'),
    col: {
      span: 12,
      xs: 12
    },
    validate: [{
      required: true,
      message: '数据模式',
      trigger: 'change'
    }]
  },

  {
    type: 'InputNumber',
    field: 'downloadTimeout',
    title: '下载超时(S)',
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
    title: '下载时长(s)',
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
    title: '无数据流量超时',
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
    field: 'threadCount',
    title: '下载线程数',
    value: 5,
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
    field: 'samplesInterval',
    title: '采样间隔(ms)',
    value: 1000,
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
    field: 'taskRepeatCount',
    title: '重连次数',
    value: 3,
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
    field: 'maxDialNum',
    title: '单次业务最多拨号次数',
    value: 3,
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
    field: 'maxLandNum',
    title: '单次业务最多登陆次数',
    value: 3,
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
    field: 'downloadFile',
    title: '下载文件',
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: '下载文件',
      trigger: 'blur'
    }]
  },

  {
    type: 'input',
    field: 'saveDirectory',
    title: '保存目录',
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: '保存目录',
      trigger: 'blur'
    }]
  },
  {
    type: 'switch',
    field: 'isSaveFile',
    title: '是否保存文件',
    value: false,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: '是',
        close: '否'
      }
    }
  },

  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'ftpHostSetting',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: '服务设置',
        active: ['1'],
        modelForm: {},
        rule: ftpHostSetting,
        option: commonOptions
      }})
  }

]
var taskFtpDownload =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'ftpDownloadTestConfig',
    col: { span: 24, xs: 24 },
    template: '<ftpDownForm ref="ftpDownFrom" :rule="rule" />',
    // template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      components: { ftpDownForm },
      data: {
        data: {},
        title: 'FTP下载测试设置',
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
export { taskFtpDownload }
