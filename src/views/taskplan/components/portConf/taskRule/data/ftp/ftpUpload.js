// MOC基础任务配置
import Vue from 'vue'
import i18n from '@/lang'
import FtpUploadForm from './ftpUpload.vue'
import { ftpHostSetting } from './ftpHostSetting'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import { commonOptions } from '../../common/common'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const taskRule = [
  // 测试模式
  {
    type: 'select',
    field: 'psCallMode',
    title: i18n.t('taskPlan.ftpUpload.psCallMode'),
    value: getDictByLanguage('PSCallMode')[0].value,
    options: getDictByLanguage('PSCallMode'),
    col: {
      span: 12,
      xs: 12
    }
  },
  // 文件大小
  {
    type: 'InputNumber',
    field: 'fileSize',
    title: i18n.t('taskPlan.ftpUpload.fileSize'),
    value: 2048,
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
  // 远程目录
  {
    type: 'input',
    field: 'remoteDirectory',
    title: i18n.t('taskPlan.ftpUpload.remoteDirectory'),
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.ftpUpload.remoteDirectoryMessage'),
      trigger: 'blur'
    }]
  },
  // 无流量超时
  {
    type: 'InputNumber',
    field: 'noDataTimeout',
    title: i18n.t('taskPlan.ftpUpload.noDataTimeout'),
    value: 60,
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
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  // 上传线程数
  {
    type: 'InputNumber',
    field: 'threadCount',
    title: i18n.t('taskPlan.ftpUpload.threadCount'),
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
  // 传输协议
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
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  // 重连次数
  {
    type: 'InputNumber',
    field: 'reConnectCount',
    title: i18n.t('taskPlan.ftpUpload.reConnectCount'),
    value: 3,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  // {
  //   type: 'select',
  //   field: 'fileSource',
  //   title: '文件来源',
  //   value: getDictByTagName('FileSource')[0].value,
  //   options: getDictByTagName('FileSource'),
  //   col: {
  //     span: 12,
  //     xs: 12
  //   }
  // },
  // {
  //   type: 'select',
  //   field: 'DataMode',
  //   title: i18n.t('taskPlan.ftpUpload.DataMode'),
  //   value: getDictByLanguage('ftpuploadDataMode')[0].value,
  //   options: getDictByLanguage('ftpuploadDataMode'),
  //   col: {
  //     span: 12,
  //     xs: 12
  //   }
  // },
  // {
  //   type: 'InputNumber',
  //   field: 'uploadTimeout',
  //   title: i18n.t('taskPlan.ftpUpload.uploadTimeout'),
  //   value: 1,
  //   parse: (value) => {
  //     return getMillionSecond(value)
  //   },
  //   reverseParse: (value) => {
  //     return getSecond(value)
  //   },
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
  //   field: 'uploadDuration',
  //   title: i18n.t('taskPlan.ftpUpload.uploadDuration'),
  //   value: 300,
  //   parse: (value) => {
  //     return getMillionSecond(value)
  //   },
  //   reverseParse: (value) => {
  //     return getSecond(value)
  //   },
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
  //   field: 'threadCount',
  //   title: i18n.t('taskPlan.ftpUpload.threadCount'),
  //   value: 3,
  //   col: {
  //     span: 12,
  //     xs: 24
  //   },
  //   props: {
  //     min: 0
  //   }
  // },
  //
  // {
  //   type: 'InputNumber',
  //   field: 'samplesInterval',
  //   title: i18n.t('taskPlan.ftpUpload.samplesInterval'),
  //   value: 1,
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
  // {
  //   type: 'switch',
  //   title: i18n.t('taskPlan.ftpUpload.delAfterFinish'),
  //   field: 'delAfterFinish',
  //   value: false,
  //   col: {
  //     span: 12,
  //     xs: 24
  //   },
  //   props: {
  //     'trueValue': true,
  //     'falseValue': false,
  //     slot: {
  //       open: i18n.t('taskPlan.label.true'),
  //       close: i18n.t('taskPlan.label.false')
  //     }
  //   }
  // },
  // {
  //   type: 'input',
  //   field: 'localFile',
  //   title: i18n.t('taskPlan.ftpUpload.localFile'),
  //   value: '',
  //   col: {
  //     span: 12,
  //     xs: 24
  //   }
  // },
  // 上传时长
  {
    type: 'InputNumber',
    field: 'uploadDuration',
    title: i18n.t('taskPlan.ftpUpload.uploadDuration'),
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
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
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
  },
  {
    type: 'hidden',
    field: 'fileSource',
    value: 'Create File'
  }
]
var taskFtpUpload =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'ftpUploadTestConfig',
    col: { span: 24, xs: 24 },
    template: '<FtpUploadForm ref="ftpUpFrom" :rule="rule" @hostClick="hostClick" @hostChange="hostChange" />',
    vm: new Vue({
      components: { FtpUploadForm },
      data: {
        data: {},
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      },
      computed: {
        formData() {
          return this.$refs.ftpUpFrom.formData
        }
      },
      watch: {
        // 编辑表单
        data(newData) {
          console.log(this)
          this.$refs.ftpUpFrom.modelForm.rule.forEach(item => {
            if (item.field === 'ftpHostSetting') {
              item.vm.$refs.host.$f.rule.forEach(model => {
                if (newData['ftpHostSetting'][model.field]) {
                  if (model.parse) {
                    item.vm.$refs.host.$f.setValue(model.field, newData['ftpHostSetting'][model.field] / 1000)
                  } else {
                    item.vm.$refs.host.$f.setValue(model.field, newData['ftpHostSetting'][model.field])
                  }
                }
              })
            } else if (newData[item.field]) {
              if (item.parse) {
                this.$refs.ftpUpFrom.modelForm.setValue(item.field, newData[item.field] / 1000)
              } else {
                this.$refs.ftpUpFrom.modelForm.setValue(item.field, newData[item.field])
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

export { taskFtpUpload }
