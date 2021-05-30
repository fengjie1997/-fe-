// MOC基础任务配置
import Vue from 'vue'
import i18n from '@/lang'
import MultiFtpUpForm from './multiFtpUpload.vue'
import { ftpHostSetting } from './ftpHostSetting'
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../../common/common'
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
    field: 'fileSource',
    title: '文件来源',
    value: getDictByTagName('FileSource')[0].value,
    options: getDictByTagName('FileSource'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'transferProtocol',
    title: '传输协议',
    value: getDictByTagName('ftpuploadTransferProtocol')[0].value,
    options: getDictByTagName('ftpuploadTransferProtocol'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'DataMode',
    title: '数据模式',
    value: getDictByTagName('ftpuploadDataMode')[0].value,
    options: getDictByTagName('ftpuploadDataMode'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'uploadTimeout',
    title: '上传超时(s)',
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
    field: 'uploadTimeout',
    title: '上传时长(s)',
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
    field: 'fileSize',
    title: '文件大小(KB)',
    value: 2048,
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
    field: 'lockss',
    title: '上传线程数',
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
    field: 'samplesInterval',
    title: '采样间隔(ms)',
    value: 1,
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
    field: 'reConnectCount',
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
    field: 'lockss',
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
    type: 'switch',
    title: '完成后删除文件',
    field: 'saveByPort',
    value: false,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: i18n.t('taskPlan.label.true'),
        close: i18n.t('taskPlan.label.false')
      }
    }
  },
  {
    type: 'input',
    field: 'remoteDirectory',
    title: '远程目录',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'input',
    field: 'localFile',
    title: '本地文件',
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
var taskMultiFtpUpload =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'ftpUploadTestConfig',
    col: { span: 24, xs: 24 },
    template: '<MultiFtpUpForm ref="ftpDownFrom" :rule="rule" />',
    // template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      components: { MultiFtpUpForm },
      data: {
        data: {},
        title: '多路FTP上传测试配置',
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
export { taskMultiFtpUpload }
