// MOC基础任务配置
import i18n from '@/lang'
import Vue from 'vue'
import ftpDownForm from './ftpDownload.vue'
import { ftpHostSetting } from './ftpHostSetting'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import { commonOptions } from '../../common/common'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const taskRule = [
  //  测试模式
  {
    type: 'select',
    field: 'psCallMode',
    title: i18n.t('taskPlan.ftpUpload.psCallMode'),
    value: 'By Time',
    options: [{ label: 'By File', value: 'By File' }, { label: 'By Time', value: 'By Time' }],
    col: {
      span: 12,
      xs: 12
    },
    emit: ['change']
  },
  //  下载文件
  {
    type: 'input',
    field: 'downloadFile',
    title: i18n.t('taskPlan.ftpDownload.downloadFile'),
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  //  无流量超时
  {
    type: 'InputNumber',
    field: 'noDataTimeout',
    title: i18n.t('taskPlan.ftpUpload.noDataTimeout'),
    value: 60,
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 1
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  //  下载线程数
  {
    type: 'InputNumber',
    field: 'threadCount',
    title: i18n.t('taskPlan.ftpDownload.threadCount'),
    value: 5,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 1
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  //  保存文件
  {
    type: 'switch',
    field: 'isSaveFile',
    title: i18n.t('taskPlan.ftpDownload.isSaveFile'),
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
    },
    emit: ['change']
  },
  //  保存目录
  {
    type: 'input',
    field: 'saveDirectory',
    title: i18n.t('taskPlan.ftpDownload.saveDirectory'),
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  //  传输协议
  {
    type: 'select',
    field: 'transferProtocol',
    title: i18n.t('taskPlan.ftpUpload.transferProtocol'),
    value: getDictByLanguage('ftpuploadTransferProtocol')[0].value,
    options: getDictByLanguage('ftpuploadTransferProtocol'),
    col: {
      span: 12,
      xs: 12
    },
    emit: ['change']
  },
  //  重连次数
  {
    type: 'InputNumber',
    field: 'reConnectCount',
    title: i18n.t('taskPlan.ftpUpload.reConnectCount'),
    value: 3,
    col: {
      span: 12,
      xs: 12
    },
    props: {
      min: 1
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  //  数据模式
  // {
  //   type: 'select',
  //   field: 'dataMode',
  //   title: i18n.t('taskPlan.ftpUpload.DataMode'),
  //   value: getDictByLanguage('ftpuploadDataMode')[0].value,
  //   options: getDictByLanguage('ftpuploadDataMode'),
  //   col: {
  //     span: 12,
  //     xs: 12
  //   }
  // },
  {
    type: 'hidden',
    field: 'downloadTimeout',
    title: i18n.t('taskPlan.ftpDownload.downloadTimeout'),
    value: 30,
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  },

  // {
  //   type: 'InputNumber',
  //   field: 'samplesInterval',
  //   title: i18n.t('taskPlan.ftpUpload.samplesInterval'),
  //   value: 1000,
  //   col: {
  //     span: 12,
  //     xs: 24
  //   },
  //   props: {
  //     min: 0
  //   }
  // },
  //  测试任务重复次数
  // {
  //   type: 'InputNumber',
  //   field: 'taskRepeatCount',
  //   title: i18n.t('taskPlan.ftpUpload.taskRepeatCount'),
  //   value: 3,
  //   col: {
  //     span: 12,
  //     xs: 24
  //   },
  //   props: {
  //     min: 0
  //   }
  // },
  // {
  //   type: 'InputNumber',
  //   field: 'maxDialNum',
  //   title: i18n.t('taskPlan.ftpUpload.maxDialNum'),
  //   value: 3,
  //   col: {
  //     span: 12,
  //     xs: 24
  //   },
  //   props: {
  //     min: 0
  //   }
  // },
  // {
  //   type: 'InputNumber',
  //   field: 'maxLandNum',
  //   title: i18n.t('taskPlan.ftpUpload.maxLandNum'),
  //   value: 3,
  //   col: {
  //     span: 12,
  //     xs: 24
  //   },
  //   props: {
  //     min: 0
  //   }
  // },
  // 下载时长
  {
    type: 'InputNumber',
    field: 'downloadDuration',
    title: i18n.t('taskPlan.ftpDownload.downloadDuration'),
    value: 300,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 1
    },
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    }
  },
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'ftpHostSetting',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create ref="host" v-model="modelForm" :rule="rule" :option="option" @template-host-button-click="click" @template-host-select-change="change" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        title: i18n.t('taskPlan.ftpUpload.ftpHostSetting'),
        active: ['1'],
        modelForm: {},
        rule: ftpHostSetting,
        option: commonOptions
      },
      methods: {
        click() {
          this.getHostObject(this.$refs.host, true)
        },
        change() {
          this.getHostObject(this.$refs.host, false)
        },
        // 触发taskForm中的对话框打开事件
        getHostObject(obj, bool) {
          if (bool) {
            if (obj.hasOwnProperty('clickHost')) {
              obj.clickHost()
            } else {
              this.getHostObject(obj.$parent, true)
            }
          } else {
            if (obj.hasOwnProperty('changeHost')) {
              obj.changeHost()
            } else {
              this.getHostObject(obj.$parent, false)
            }
          }
        }
      }
    })
  }
]
var taskFtpDownload =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'ftpDownloadTestConfig',
    col: { span: 24, xs: 24 },
    template: '<ftpDownForm ref="ftpDownFrom" :rule="rule" @hostClick="hostClick" @hostChange="hostChange" />',
    // template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      components: { ftpDownForm },
      data: {
        data: {},
        title: i18n.t('taskPlan.ftpDownload.ftpDownload'),
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
          this.$refs.ftpDownFrom.modelForm.rule.forEach(item => {
            if (item.field === 'ftpHostSetting') {
              item.vm.$refs.host.$f.rule.forEach(model => {
                if (newData['ftpHostSetting'][model.field]) {
                  console.log('1')
                  if (model.parse) {
                    item.vm.$refs.host.$f.setValue(model.field, newData['ftpHostSetting'][model.field] / 1000)
                  } else {
                    item.vm.$refs.host.$f.setValue(model.field, newData['ftpHostSetting'][model.field])
                  }
                }
              })
            } else if (newData[item.field]) {
              if (item.parse) {
                this.$refs.ftpDownFrom.modelForm.setValue(item.field, newData[item.field] / 1000)
              } else {
                this.$refs.ftpDownFrom.modelForm.setValue(item.field, newData[item.field])
              }
            }
          })
        }
      },
      methods: {
        hostClick() {
          this.$parentFC.hostClick()
        },
        hostChange() {
          this.$parentFC.hostChange()
        }
      }
    })
  }
export { taskFtpDownload }
