import { addTask } from '@/api/device/testPlanList.js'
import i18n from '@/lang'
import { getDictByLanguage } from '@/utils/dictByLanguage' // addTask
import { fetchTemplateList, fetchTemplateAdd, fetchTemplateDelete, fetchTemplateUpdate, fetchHostTemplateAdd, fetchHostTemplateDelete, fetchHostTemplateList, fetchHostTemplateUpdate, fetchAllTemplateAdd, fetchAllTemplateDelete, fetchAllTemplateList, fetchAllTemplate } from '@/api/testPlan/template'
import Pagination from '../../../../../components/Pagination/index'
import waves from '@/directive/waves'
import 'fleetmap/dist/locale/fleetmap.en'
import { mapState } from 'vuex'
export default {
  name: 'taskForm',
  components: { Pagination },
  directives: { waves },
  props: {
    rules: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // ftp服务模板host的options
      hostOptions: [],
      // 网络模板的options
      networkTemplateOptions: [],
      apiData: {},
      rule: [],
      taskForm: {},
      loaded: false,
      modelForm: {},
      options: {
        submitBtn: false,
        form: {
          inline: false,
          labelPosition: 'left',
          labelSuffix: undefined,
          hideRequiredAsterisk: false,
          labelWidth: '150px',
          showMessage: true,
          inlineMessage: true,
          statusIcon: false,
          validateOnRuleChange: true,
          disabled: false,
          size: 'small'
        },
        row: {
          gutter: 6
        }
      },
      //  网络模板对话框
      //  动态显示表格列
      state: true,
      title: '',
      dialogVisibleDevice: false,
      tableKey: 0,
      multipleTable: [],
      multipleSelection: [],
      disconnectStrategyOptions: getDictByLanguage('ConnectionDisconnectStrategy'),
      ulUeRateOptions: getDictByLanguage('requestRate'),
      dlUeRateOptions: getDictByLanguage('requestRate'),
      ipTypeOptions: getDictByLanguage('IpType'),
      loginTypeOptions: getDictByLanguage('LoginType'),
      operatorOptions: getDictByLanguage('Operator'),
      encryptTypeOptions: getDictByLanguage('EncryptType'),
      list: [],
      template: { name: '', rasNumber: '', apn: '', username: '', password: '', singleTimeout: '', totalTimeout: '', disconnectStrategy: '', ulUeRate: '', dlUeRate: '', ipType: '', loginType: '', ap: '', operator: '', encryptType: '' },
      total: 0,
      // length作为操作单条的记录的条件
      length: 0,
      listQuery: {
        limit: 10,
        page: 1,
        isAsc: 1,
        type: 0
      },
      type: 0,
      // 服务模板对话框
      dialogVisibleHost: false,
      connectionModeOptions: [{ label: 'Passive', value: 'Passive' }, { label: 'Port', value: 'Port' }],
      transferModeOptions: getDictByLanguage('ftpdownloadConnectionMode'),
      //  全局模板对话框
      dialogVisibleAll: false
    }
  },
  computed: {
    ...mapState({
      modemPort: state => state.testPlan.modemPort,
      portNumberList: state => state.testPlan.portNumberList
    })
  },
  // watch: {
  //   modelForm: {
  //     handle() {
  //       console.log(this.modelForm)
  //     }
  //   }
  // },
  created() {
    this.$nextTick(() => {
      this.newRule = {}
      this.modelForm.rule.forEach(item => {
        if (item.field) {
          this.newRule[item.field] = item.value
        }
      })
    })
  },
  watch: {
    rule: {
      handler() {
        console.log(this.rules)
      }
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        console.log(document.documentElement.clientWidth)
      })()
    }
  },
  methods: {
    // select更改网络模板
    networkTemplateChange() {
      this.modelForm.rule.forEach(item => {
        if (item.field === 'networkConnectionSetting') {
          this.networkTemplateOptions.forEach(option => {
            if (option.id === item.vm.modelForm.rule[0].value) {
              this.handleTemplate(option)
              item.vm.change()
            }
          })
        }
      })
    },
    // 测试计划网络模板的选项更新
    getNetworkTemplateOptions() {
      // 对话框title
      this.modelForm.rule.forEach(item => {
        if (item.field === 'networkConnectionSetting') {
          item.vm.rule.forEach(item => {
            if (item.field === 'connectionType') {
              switch (item.value) {
                case 'PPP': this.type = 0; this.state = true; break
                case 'RMNET': this.type = 1; this.state = true; break
                default:
                  this.type = 2
                  this.state = false
              }
              this.listQuery.type = this.type
            }
          })
        }
      })
      fetchTemplateList(this.listQuery).then(response => {
        const data = response.data
        const templateOptions = []
        if (data.code === 1) {
          for (const i in data.data.records) {
            templateOptions[i] = {}
            templateOptions[i]['label'] = data.data.records[i].name
            templateOptions[i]['value'] = data.data.records[i].id
          }
          this.networkTemplateOptions = data.data.records
          this.modelForm.rule.forEach(item => {
            if (item.field === 'networkConnectionSetting') {
              item.vm.modelForm.rule[0].options = templateOptions
            }
          })
        }
      })
    },
    // 打开测试计划网络模板
    click() {
      // 对话框title
      this.modelForm.rule.forEach(item => {
        if (item.field === 'networkConnectionSetting') {
          item.vm.rule.forEach(item => {
            if (item.field === 'connectionType') {
              switch (item.value) {
                case 'PPP': this.type = 0; this.state = true; break
                case 'RMNET': this.type = 1; this.state = true; break
                default:
                  this.type = 2
                  this.state = false
              }
              this.listQuery.type = this.type
              this.title = item.value + this.$t('taskPlan.title.templateManagement')
            }
          })
        }
      })
      fetchTemplateList(this.listQuery).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.networkTemplateOptions = data.data.records
          this.list = data.data.records
          this.total = data.data.total
          this.length = data.data.records.length
        }
      })
      this.dialogVisibleDevice = true
    },
    // 新增测试计划网络模板
    handleTemplateAdd() {
      const length = this.list.length
      this.list.splice(length, 0, { name: '', rasNumber: '', apn: '', username: '', password: '', singleTimeout: '', totalTimeout: '', disconnectStrategy: '', ulueRate: '', dlueRate: '', ipType: '', loginType: '', ap: '', operator: '', encryptType: '' })
    },
    // 更新测试计划网络模板
    handleTemplateSave() {
      if (this.multipleSelection.length === 0) {
        this.$alert(this.$t('taskPlan.message.minRecord'), this.$t('taskPlan.title.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {}
        })
      } else if (this.multipleSelection.length > 1) {
        this.$alert(this.$t('taskPlan.message.record'), this.$t('taskPlan.title.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {}
        })
      } else {
        if (this.multipleSelection[0].id) {
          this.multipleSelection[0]['type'] = this.type
          fetchTemplateUpdate(this.multipleSelection[0].id, this.multipleSelection[0]).then(response => {
            const data = response.data
            if (data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.updateSuccess'),
                type: 'success',
                duration: 2000
              })
            }
            this.click()
          })
        } else {
          // 非空判断
          if (this.multipleSelection[0]['name']) {
            this.multipleSelection[0]['type'] = this.type
            fetchTemplateAdd(this.multipleSelection[0]).then(response => {
              const data = response.data
              if (data.code === 1) {
                this.$notify({
                  title: this.$t('common.success'),
                  message: this.$t('common.createSuccess'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.click()
              this.getNetworkTemplateOptions()
            })
          } else {
            this.$alert(this.$t('taskPlan.message.nameNull'), this.$t('taskPlan.title.tip'), {
              confirmButtonText: this.$t('common.confirm'),
              callback: action => {}
            })
          }
        }
      }
    },
    // 删除测试计划网络模板
    handleTemplateDelete() {
      if (this.multipleSelection.length === 0) {
        this.$alert(this.$t('taskPlan.message.minRecord'), this.$t('taskPlan.title.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {}
        })
      } else if (this.multipleSelection.length > 1) {
        this.$alert(this.$t('taskPlan.message.record'), this.$t('taskPlan.title.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {}
        })
      } else {
        if (this.multipleSelection[0].id) {
          fetchTemplateDelete(this.multipleSelection[0].id).then(res => {
            const data = res.data
            if (data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
            }
            this.click()
            this.getNetworkTemplateOptions()
          })
        } else {
          this.list.splice(this.list.length - 1, 1)
        }
      }
    },
    // 关闭测试计划网络模板
    confirmDevice() {
      this.dialogVisibleDevice = false
    },
    // 测试计划表格第一列的选择记录
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 选择测试计划记录
    handleTemplate(data) {
      this.modelForm.rule.forEach(item => {
        if (item.field === 'networkConnectionSetting') {
          item.vm.rule.forEach(item => {
            if (data[item.field] !== undefined) {
              item.value = data[item.field]
            }
          })
        }
      })
      this.$notify({
        title: this.$t('common.success'),
        message: this.$t('taskPlan.message.templateApply'),
        type: 'success',
        duration: 2000
      })
    },
    // 打开服务设置模板
    hostClick() {
      this.modelForm.rule.forEach(item => {
        if (item.field === 'taskType') {
          this.listQuery.type = item.value
        }
      })
      this.title = 'FTP' + this.$t('taskPlan.title.templateManagement')
      fetchHostTemplateList(this.listQuery).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = data.data.total
          this.length = data.data.records.length
        }
      })
      this.dialogVisibleHost = true
    },
    // 新增测试计划服务模板
    handleHostTemplateAdd() {
      const length = this.list.length
      this.list.splice(length, 0, { name: '', address: '', port: '', username: '', password: '', isAnonymous: false, connectionMode: 'Passive', transferMode: getDictByLanguage('ftpdownloadConnectionMode')[0].value })
    },
    // 更新测试计划服务模板
    handleHostTemplateSave() {
      console.log(this.multipleSelection)
      if (this.multipleSelection.length === 0) {
        this.$alert(this.$t('taskPlan.message.minRecord'), this.$t('taskPlan.title.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {}
        })
      } else if (this.multipleSelection.length > 1) {
        this.$alert(this.$t('taskPlan.message.record'), this.$t('taskPlan.title.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {}
        })
      } else {
        if (this.multipleSelection[0].id) {
          this.multipleSelection[0]['type'] = this.listQuery.type
          fetchHostTemplateUpdate(this.multipleSelection[0].id, this.multipleSelection[0]).then(response => {
            const data = response.data
            if (data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.updateSuccess'),
                type: 'success',
                duration: 2000
              })
            }
            this.hostClick()
            this.updateHost()
          })
        } else {
          // 非空判断
          if (this.multipleSelection[0]['name']) {
            this.multipleSelection[0]['type'] = this.listQuery.type
            fetchHostTemplateAdd(this.multipleSelection[0]).then(response => {
              const data = response.data
              if (data.code === 1) {
                this.$notify({
                  title: this.$t('common.success'),
                  message: this.$t('common.createSuccess'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.hostClick()
              this.updateHost()
            })
          } else {
            this.$alert(this.$t('taskPlan.message.nameNull'), this.$t('taskPlan.title.tip'), {
              confirmButtonText: this.$t('common.confirm'),
              callback: action => {}
            })
          }
        }
      }
    },
    // 删除测试计划服务模板
    handleHostTemplateDelete() {
      if (this.multipleSelection.length === 0) {
        this.$alert(this.$t('taskPlan.message.minRecord'), this.$t('taskPlan.title.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {}
        })
      } else if (this.multipleSelection.length > 1) {
        this.$alert(this.$t('taskPlan.message.record'), this.$t('taskPlan.title.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {}
        })
      } else {
        if (this.multipleSelection[0].id) {
          fetchHostTemplateDelete(this.multipleSelection[0].id).then(res => {
            const data = res.data
            if (data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
            }
            this.hostClick()
            this.updateHost()
          })
        } else {
          this.list.splice(this.list.length - 1, 1)
        }
      }
    },
    // 关闭测试计划服务模板
    confirmHost() {
      this.dialogVisibleHost = false
    },
    // 选择测试计划服务记录
    handleHostTemplate(data) {
      this.modelForm.rule.forEach(item => {
        if (item.field === 'ftpDownloadTestConfig') {
          item.vm.$refs.ftpDownFrom.rule[10].vm.$refs.host.rule.forEach(item => {
            if (data[item.field] !== undefined) {
              item.value = data[item.field]
            }
          })
        } else if (item.field === 'ftpUploadTestConfig') {
          item.vm.$refs.ftpUpFrom.rule[8].vm.$refs.host.rule.forEach(item => {
            if (data[item.field] !== undefined) {
              item.value = data[item.field]
            }
          })
        }
      })
      this.$notify({
        title: this.$t('common.success'),
        message: this.$t('taskPlan.message.templateApply'),
        type: 'success',
        duration: 2000
      })
    },
    // 通过select更新Host
    hostChange() {
      this.modelForm.rule.forEach(item => {
        if (item.field === 'ftpUploadTestConfig') {
          item.vm.$refs.ftpUpFrom.modelForm.rule.forEach(host => {
            if (host.field === 'ftpHostSetting') {
              this.hostOptions.forEach(option => {
                if (option.id === host.vm.$refs.host.rule[0].value) {
                  console.log(option)
                  this.handleHostTemplate(option)
                }
              })
            }
          })
        }
        if (item.field === 'ftpDownloadTestConfig') {
          console.log(item)
          item.vm.$refs.ftpDownFrom.modelForm.rule.forEach(host => {
            if (host.field === 'ftpHostSetting') {
              this.hostOptions.forEach(option => {
                if (option.id === host.vm.$refs.host.rule[0].value) {
                  this.handleHostTemplate(option)
                }
              })
            }
          })
        }
      })
    },
    // 更新host测试模板选项值
    updateHost() {
      this.modelForm.rule.forEach(item => {
        if (item.field === 'taskType') {
          this.listQuery.type = item.value
        }
      })
      fetchHostTemplateList(this.listQuery).then(response => {
        const data = response.data
        const templateOptions = []
        if (data.code === 1) {
          for (const i in data.data.records) {
            templateOptions[i] = {}
            templateOptions[i]['label'] = data.data.records[i].name
            templateOptions[i]['value'] = data.data.records[i].id
          }
          this.hostOptions = data.data.records
          this.modelForm.rule.forEach(item => {
            if (item.field === 'ftpUploadTestConfig') {
              console.log(item)
              item.vm.$refs.ftpUpFrom.modelForm.rule.forEach(host => {
                if (host.field === 'ftpHostSetting') {
                  host.vm.$refs.host.rule[0].options = templateOptions
                }
              })
            }
            if (item.field === 'ftpDownloadTestConfig') {
              console.log(item)
              item.vm.$refs.ftpDownFrom.modelForm.rule.forEach(host => {
                if (host.field === 'ftpHostSetting') {
                  host.vm.$refs.host.rule[0].options = templateOptions
                }
              })
            }
          })
        }
      })
    },
    // 打开全局模板配置
    allClick() {
      this.title = this.$t('route.template')
      let taskType = ''
      this.modelForm.rule.forEach(item => {
        if (item.field === 'taskType') {
          taskType = item.value
        }
      })
      fetchAllTemplateList(taskType).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data
        }
      })
      this.dialogVisibleAll = true
    },
    // 应用全局模板
    handleAllTemplate(id) {
      fetchAllTemplate(id).then(res => {
        if (res.data.code === 1) {
          this.$parent.$parent.$parent.$parent.handleEleForm(res.data.data)
          this.onMounted()
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('taskPlan.message.templateApply'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 删除全局模板
    handleAllTemplateDelete(id) {
      fetchAllTemplateDelete(id).then(res => {
        if (res.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.deleteSuccess'),
            type: 'success',
            duration: 2000
          })
        }
        this.allClick()
      })
    },
    // 时间设置的改变
    change() {
    },
    onMounted() {
      // interval
      const rules = this.modelForm.rule
      // 时间窗节点不在页面显示, 仅用于初始化以及回传数据
      console.log(rules)
      this.modelForm.hidden(true, 'timeWindowSetting')
      for (const rule of rules) {
        // if (rule.field === 'fixedTimeSetting') {
        //   rule.vm.$refs.refFix.modelForm.hidden(false, 'randomTimeSection')
        // }
        if (rule.vm) {
          // 用于设置服务模板的事件
          // if (rule.field === 'ftpDownloadTestConfig') {
          //   // 留爪, 后面优化
          //   rule.vm.$refs.ftpDownFrom.rule[9].vm.$refs.host.$parentFC = this
          // }
          // if (rule.field === 'ftpUploadTestConfig') {
          //   // 留爪, 后面优化
          //   rule.vm.$refs.ftpUpFrom.rule[8].vm.$refs.host.$parentFC = this
          // }
          // 用于设置各业务的时间、模板设置
          if (rule.vm) {
            rule.vm.$parentFC = this
          }
          // fix节点放所有时间字段, 根据time值隐藏/显示特地字段
          if (rule.field === 'fixedTimeSetting') {
            // 此处设置延时器是为解决初始化渲染中modelForm无数据，待优化
            setTimeout(() => {
              // 时间窗界面上的任务持续时长不可编辑，其值与业务本身的任务时长做同步
              rule.vm.$refs.refFix.modelForm.disabled(true, 'duration')
              // 后期优化
              const otherCustomTime = Number(rule.vm.rule[0].value)
              if (otherCustomTime === 2) {
                // 固定时长: 任务持续时长 间隔时长
                rule.vm.$refs.refFix.modelForm.hidden(true, 'taskDuration')
                rule.vm.$refs.refFix.modelForm.hidden(true, 'interval')
                // 时间窗时长: 任务持续时长 时间窗大小 保护时长
                rule.vm.$refs.refFix.modelForm.hidden(true, 'duration')
                rule.vm.$refs.refFix.modelForm.hidden(true, 'guardDuration')
                rule.vm.$refs.refFix.modelForm.hidden(true, 'windowSize')
                rule.vm.$refs.refFix.modelForm.hidden(true, 'accessTime')
                // 随机时长设置
                rule.vm.$refs.refFix.modelForm.hidden(false, 'randomTimeSection')
                rules.forEach(item => {
                  if (item.field === 'mocTestConfig') {
                    rule.vm.rule[7].vm.list.useRandomTimeDial = item.vm.data['useRandomTimeDial']
                  }
                })
              } else if (otherCustomTime === 1) {
                rule.vm.$refs.refFix.modelForm.hidden(true, 'taskDuration')
                rule.vm.$refs.refFix.modelForm.hidden(true, 'interval')
                rule.vm.$refs.refFix.modelForm.hidden(false, 'duration')
                rule.vm.$refs.refFix.modelForm.hidden(false, 'guardDuration')
                rule.vm.$refs.refFix.modelForm.hidden(false, 'windowSize')
                rule.vm.$refs.refFix.modelForm.hidden(false, 'accessTime')
                rule.vm.$refs.refFix.modelForm.hidden(true, 'randomTimeSection')
              } else {
                rule.vm.$refs.refFix.modelForm.hidden(true, 'taskDuration')
                rule.vm.$refs.refFix.modelForm.hidden(false, 'interval')
                rule.vm.$refs.refFix.modelForm.hidden(true, 'duration')
                rule.vm.$refs.refFix.modelForm.hidden(true, 'guardDuration')
                rule.vm.$refs.refFix.modelForm.hidden(true, 'windowSize')
                rule.vm.$refs.refFix.modelForm.hidden(true, 'accessTime')
                rule.vm.$refs.refFix.modelForm.hidden(true, 'randomTimeSection')
              }
              rules.forEach(item => {
                if (item.field === 'mocTestConfig') {
                  console.log(this.portNumberList)
                  rule.vm.$refs.refFix.modelForm.updateRule('otherCustomTime', {
                    options: [
                      { value: 0, label: i18n.t('taskPlan.form.timeSetting'), disabled: false },
                      { value: 1, label: i18n.t('taskPlan.form.timeWindowSetting'), disabled: false },
                      { value: 2, label: i18n.t('taskPlan.title.randomDurationSetting'), disabled: false }
                    ]
                  })
                  throw new Error('此错误为时间设置循环抛出')
                } else {
                  rule.vm.$refs.refFix.modelForm.updateRule('otherCustomTime', {
                    options: [
                      { value: 0, label: i18n.t('taskPlan.form.timeSetting'), disabled: false },
                      { value: 1, label: i18n.t('taskPlan.form.timeWindowSetting'), disabled: false },
                      { value: 2, label: i18n.t('taskPlan.title.randomDurationSetting'), disabled: true }
                    ]
                  })
                }
              })
            }, 500)
          }
          //  用于SMS业务初始化
          if (rule.field === 'smsSendTestConfig') {
            setTimeout(() => {
              if (rule.vm.formData.testType === 'Sebd Only') {
                rule.vm.modelForm.disabled(true, 'mtcDevicePort')
              } else {
                rule.vm.modelForm.disabled(false, 'mtcDevicePort')
              }
            }, 100)
          }
          //  用于mtc业务初始化
          if (rule.field === 'mtcTestConfig') {
            console.log(rules)
            setTimeout(() => {
              // MTC业务中固定时长下任务间隔字段禁用
              if (rule.vm.formData.mosTest) {
                rule.vm.modelForm.disabled(false, ['mosAlgorithm', 'lowMosThreshold'])
              } else {
                rule.vm.modelForm.disabled(true, ['mosAlgorithm', 'lowMosThreshold'])
              }
              if (rule.vm.formData.mosAlgorithm === 'POLQA') {
                rule.vm.modelForm.disabled(false, ['sampleType', 'calcMode'])
              } else {
                rule.vm.modelForm.disabled(true, ['sampleType', 'calcMode'])
              }
            }, 100)
          }
          //  用于锁网设置初始化
          if (rule.field === 'networkLockSetting') {
            setTimeout(() => {
              if (rule.vm.formData.isLockBand) {
                rule.vm.modelForm.disabled(false, 'lteBand')
              } else {
                rule.vm.modelForm.disabled(true, 'lteBand')
              }
              if (rule.vm.formData.isLockArfcn) {
                rule.vm.modelForm.disabled(false, 'lockArfcn')
              } else {
                rule.vm.modelForm.disabled(true, 'lockArfcn')
              }
              if (rule.vm.formData.isLockCell) {
                rule.vm.modelForm.disabled(false, 'lockCellFrequency')
                rule.vm.modelForm.disabled(false, 'lockCellPSC')
              } else {
                rule.vm.modelForm.disabled(true, 'lockCellFrequency')
                rule.vm.modelForm.disabled(true, 'lockCellPSC')
              }
            }, 100)
          }

          //  用于TCP/IP设置初始化
          if (rule.field === 'tcpIpCaptureSetting') {
            setTimeout(() => {
              if (rule.vm.formData.isAvailable) {
                rule.vm.modelForm.disabled(false, 'captureMode')
                rule.vm.modelForm.disabled(false, 'fileSwitch')
              } else {
                rule.vm.modelForm.disabled(true, 'captureMode')
                rule.vm.modelForm.disabled(true, 'fileSwitch')
              }
            }, 100)
          }
          //  用于设置网络连接设置初始化
          if (rule.field === 'networkConnectionSetting') {
            setTimeout(() => {
              rule.vm.rule.forEach(model => {
                if (model.field === 'templateSelect') {
                  let type = 0
                  switch (rule.vm.rule[2].value) {
                    case 'PPP' : type = 0; break
                    case 'RMNET' : type = 1; break
                    default:
                      type = 2
                  }
                  fetchTemplateList({ type: type }).then(res => {
                    const data = res.data
                    const templateOptions = []
                    if (data.code === 1) {
                      for (const i in data.data.records) {
                        templateOptions[i] = {}
                        templateOptions[i]['label'] = data.data.records[i].name
                        templateOptions[i]['value'] = data.data.records[i].id
                      }
                      rule.vm.modelForm.updateRule('templateSelect', { options: templateOptions })
                    }
                  })
                }
                // 为wifiConnectList传值
                // if (model.field === 'wifiConnectionList') {
                //   for (const i in model.vm.rule[1].vm.rule) {
                //     rule.vm.rule.forEach(item => {
                //       if (item.field === model.vm.rule[1].vm.rule[i].field) {
                //         item.value = model.vm.rule[1].vm.rule[i].value
                //       }
                //     })
                //   }
                // }
                // if (model.field === 'createdConnectionList') {
                //   for (const i in model.vm.rule[1].vm.rule) {
                //     rule.vm.rule.forEach(item => {
                //       if (item.field === model.vm.rule[1].vm.rule[i].field) {
                //         item.value = model.vm.rule[1].vm.rule[i].value
                //       }[]
                //     })
                //   }
                // }
              })
              if (rule.vm.modelForm.form.connectionType === 'WLAN') {
                rule.vm.modelForm.hidden(true, 'rasNumber')
                rule.vm.modelForm.hidden(true, 'apn')
                rule.vm.modelForm.hidden(true, 'singleTimeout')
                rule.vm.modelForm.hidden(true, 'reconnectCount')
                rule.vm.modelForm.hidden(true, 'uplinkRequestRate')
                rule.vm.modelForm.hidden(true, 'downlinkRequestRate')
                rule.vm.modelForm.hidden(false, 'loginType')
                rule.vm.modelForm.hidden(false, 'operator')
                rule.vm.modelForm.hidden(false, 'encryptType')
                rule.vm.modelForm.hidden(false, 'band')
                rule.vm.modelForm.hidden(false, 'apnName')
              } else {
                rule.vm.modelForm.hidden(false, 'rasNumber')
                rule.vm.modelForm.hidden(false, 'apn')
                rule.vm.modelForm.hidden(false, 'singleTimeout')
                rule.vm.modelForm.hidden(false, 'reconnectCount')
                rule.vm.modelForm.hidden(false, 'uplinkRequestRate')
                rule.vm.modelForm.hidden(false, 'downlinkRequestRate')
                rule.vm.modelForm.hidden(true, 'loginType')
                rule.vm.modelForm.hidden(true, 'operator')
                rule.vm.modelForm.hidden(true, 'encryptType')
                rule.vm.modelForm.hidden(true, 'band')
                rule.vm.modelForm.hidden(true, 'apnName')
              }
              if (rule.vm.modelForm.form.loginType === 'WebPage') {
                rule.vm.modelForm.disabled(false, 'operator')
              } else {
                rule.vm.modelForm.disabled(true, 'operator')
              }
            }, 100)
          }
        }
      // }
      // this.modelForm.setValue(data)
      // this.modelForm.rule.forEach(item => {
      //   if (item.hasChildren) {
      //     item.vm.data = data[item.field]
      //   }
      // })
      }
      this.updateHost()
    },
    // submit
    onSubmits(groupId, taskId, updateGroup) {
      // var form = this.modelForm
      var rules = this.modelForm.rule
      console.log(rules)
      var modelData = Object.assign({}, this.modelForm.formData())
      rules.forEach(item => {
        // level 1
        if (item.hasChildren) {
          modelData[item.field] = item.vm.modelForm.formData()
          // level 2
          item.vm.rule.forEach(item2 => {
            // if (item2.field === 'networkConnectionSetting') {
            // }
            if (item2.hasChildren) {
              modelData[item.field][item2.field] = item2.vm.modelForm.formData()
              // level 3
              item2.vm.rule.forEach(item3 => {
                // 兼容
                if (item3.hasChildren) {
                  var arr = []
                  var infoObj = {}
                  arr.push(item3.vm.modelForm.formData())
                  infoObj[item3.field] = arr
                  modelData[item.field][item2.field] = infoObj
                  // modelData[item.field][item2.field][item3.field] = item3.vm.modelForm.formData()
                }
                // list
                if (item3.formType === 'list') {
                  modelData[item3.field] = item3.vm.list
                }
              })
            }
            // list
            if (item2.formType === 'list') {
              modelData[item.field][item2.field] = item2.vm.list
            }
          })
        }
      })
      addTask(groupId, modelData, taskId).then(res => {
        if (res.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.success'),
            type: 'success',
            duration: 2000
          })
          updateGroup()
        }
        this.modelForm.resetField()
      })
    },
    // test
    testMe() {
      var fApi = []
      var rules = this.modelForm.rule

      rules.forEach(item => {
        // level 1
        if (item.hasChildren) {
          fApi[item.field] = item.vm.modelForm
          // level 2
          item.vm.rule.forEach(item2 => {
            if (item2.hasChildren) {
              fApi[item2.field] = item2.vm.modelForm
              // level 3
              item2.vm.rule.forEach(item3 => {
                if (item3.hasChildren) {
                  fApi[item3.field] = item3.vm.modelForm
                }
                if (item3.hasChildren && item3.formType === 'list') {
                  fApi[item3.field] = item3.vm.list
                }
              })
            }
            // list
            if (item2.formType === 'list') {
              fApi[item2.field] = item2.vm.modelForm
            }
          })
        }
      })
      return fApi
    },
    onSubmit(template, groupId, taskId, updateGroup) {
      let boolean = true
      this.modelForm.validate(valid => {
        boolean = valid
      })
      // var fApi = []
      var rules = this.modelForm.rule
      console.log(rules)
      // 重写对modelForm的数据解析
      const modelData = {}
      rules.forEach(item => {
        if (item.field && !item.vm) {
          modelData[item.field] = item.value
        }
        if (item.vm) {
          modelData[item.field] = {}
          // 锁频的特殊化处理
          if (item.field === 'mftpDownloadTestConfig') {
            modelData.mftpDownloadTestConfig = {}
            modelData.mftpDownloadTestConfig.mftpDownList = {}
            modelData.mftpDownloadTestConfig.mftpDownList.mftpDownConfigs = item.vm.$refs.nodeForm.tableData
            // 采样间隔的处理
            // 采样间隔的处理
            modelData.mftpDownloadTestConfig.mftpDownList.mftpDownConfigs.forEach(item => {
              item.samplesInterval = item.samplesInterval * 1000
            })
            item.vm.$refs.nodeForm.rule.forEach(model => {
              if (model.parse) {
                modelData['mftpDownloadTestConfig'][model.field] = model.value * 1000
              } else {
                modelData['mftpDownloadTestConfig'][model.field] = model.value
              }
            })
          } else if (item.field === 'mftpUploadTestConfig') {
            modelData.mftpUploadTestConfig = {}
            modelData.mftpUploadTestConfig.mftpUpList = {}
            modelData.mftpUploadTestConfig.mftpUpList.mftpUpConfigs = item.vm.$refs.nodeForm.tableData
            // 采样间隔的处理
            modelData.mftpUploadTestConfig.mftpUpList.mftpUpConfigs.forEach(item => {
              item.samplesInterval = item.samplesInterval * 1000
            })
            item.vm.$refs.nodeForm.rule.forEach(model => {
              if (model.parse) {
                modelData['mftpUploadTestConfig'][model.field] = model.value * 1000
              } else {
                modelData['mftpUploadTestConfig'][model.field] = model.value
              }
            })
          } else if (item.field === 'videoPlayTestConfig') {
            modelData.videoPlayTestConfig.psCallMode = item.vm.$refs.refVideoPlay.$refs.playForm.model.psCallMode
            modelData.videoPlayTestConfig.noDataTimeout = item.vm.$refs.refVideoPlay.$refs.playForm.model.noDataTimeout * 1000
            modelData.videoPlayTestConfig.websiteType = item.vm.$refs.refVideoPlay.$refs.playForm.model.websiteType
            modelData.videoPlayTestConfig.mediaQuality = item.vm.$refs.refVideoPlay.$refs.playForm.model.mediaQuality
            modelData.videoPlayTestConfig.urlList = {}
            modelData.videoPlayTestConfig.urlList.urlInfos = item.vm.$refs.refVideoPlay.$refs.urlTable.data
          } else {
            if (!item.vm.modelForm.rule || item.vm.modelForm.rule.length === 0) {
              for (const key in item.vm.$refs) {
                item.vm.modelForm = item.vm.$refs[key].modelForm
              }
            }
            item.vm.modelForm.rule.forEach(model => {
              if (model.vm) {
                if (model.field === 'ftpHostSetting') {
                  console.log(model)
                  modelData[item.field][model.field] = {}
                  modelData[item.field][model.field] = model.vm.modelForm.form
                  console.log(model.vm.modelForm.form)
                } else {
                  modelData[item.field][model.field] = model.vm.list
                }
              } else {
                if (model.parse) {
                  modelData[item.field][model.field] = model.value * 1000
                } else {
                  modelData[item.field][model.field] = model.value
                }
              }
            })
            item.vm.modelForm.validate(valid => {
              boolean = valid && boolean
            })
          }
        }
      })
      // 删除部分锁频设置的字段
      if (modelData.networkLockSetting) {
        if (!modelData.networkLockSetting.isLockArfcn) {
          modelData.networkLockSetting.lockArfcn = undefined
        }
        if (!modelData.networkLockSetting.isLockCell) {
          modelData.networkLockSetting.lockCellPSC = undefined
          modelData.networkLockSetting.lockCellFrequency = undefined
        }
      }
      // 测试时长的处理
      if (modelData.networkConnectionSetting) {
        // wifiConnectionList的赋值
        modelData['networkConnectionSetting']['wifiConnectionList'] = undefined
        if (modelData.networkConnectionSetting.connectionType === 'WLAN') {
          modelData['networkConnectionSetting']['wifiConnectionList'] = {}
          modelData.networkConnectionSetting.wifiConnectionList.wifiConnectionInfos = [{
            apnName: modelData.networkConnectionSetting.apnName,
            band: modelData.networkConnectionSetting.band,
            encryptType: modelData.networkConnectionSetting.encryptType,
            isCheck: modelData.networkConnectionSetting.connectionType === 'WLAN',
            loginType: modelData.networkConnectionSetting.loginType,
            operator: modelData.networkConnectionSetting.operator,
            password: modelData.networkConnectionSetting.password,
            username: modelData.networkConnectionSetting.username
          }]
        }
        // selectedConnectionList的赋值
        modelData['networkConnectionSetting']['selectedConnectionList'] = {}
        modelData.networkConnectionSetting.selectedConnectionList.currentConnectionInfos = [{ isCheck: modelData.networkConnectionSetting.connectionType !== 'WLAN' }]
        // selectedConnectionList的赋值
        modelData['networkConnectionSetting']['createdConnectionList'] = {}
        modelData.networkConnectionSetting.createdConnectionList.createdConnectionInfos = [{
          apn: modelData.networkConnectionSetting.apn,
          dlUeRate: modelData.networkConnectionSetting.dlUeRate,
          ipType: modelData.networkConnectionSetting.ipType,
          isCheck: modelData.networkConnectionSetting.connectionType !== 'WLAN',
          password: modelData.networkConnectionSetting.password,
          pppName: modelData.networkConnectionSetting.pppName,
          rasNumber: modelData.networkConnectionSetting.rasNumber,
          trafficClass: modelData.networkConnectionSetting.trafficClass,
          ulueRate: modelData.networkConnectionSetting.ulueRate,
          username: modelData.networkConnectionSetting.username
        }]
      }
      if (modelData.fixedTimeSetting) {
        // 拆分fixedTimeSetting
        if (modelData.interval) {
          modelData.interval = modelData.fixedTimeSetting.interval
        }

        // timeWindowSetting赋值
        modelData.timeWindowSetting = {}
        if (modelData.fixedTimeSetting.otherCustomTime === 1) {
          modelData.timeWindowSetting.accessTime = modelData.fixedTimeSetting.accessTime
          // 时间窗节点下的duration填写
          if (modelData.mocTestConfig) {
            modelData.timeWindowSetting.duration = modelData.mocTestConfig.duration
          }
          modelData.timeWindowSetting.duration = modelData.fixedTimeSetting.duration
          modelData.timeWindowSetting.guardDuration = modelData.fixedTimeSetting.guardDuration
          modelData.timeWindowSetting.isCheck = modelData.fixedTimeSetting.otherCustomTime === 1
          modelData.timeWindowSetting.windowSize = modelData.fixedTimeSetting.windowSize
        }
        if (modelData.fixedTimeSetting.otherCustomTime === 2) {
          modelData.mocTestConfig.useRandomTimeDial = {}
          modelData.mocTestConfig.useRandomTimeDial = modelData.fixedTimeSetting.randomTimeSection.useRandomTimeDial
        }
      }
      if (modelData.mocTestConfig) {
        modelData.fixedTimeSetting.taskDuration = modelData.mocTestConfig.duration
      }
      // 谢非写的解析方法
      // var modelData = Object.assign({}, this.modelForm.formData())
      // rules.forEach(item => {
      //   if (item.hasChildren) {
      //     if (item.vm.hasOwnProperty('formData')) {
      //       const childRules = item.vm.rule
      //       const childFormData = Object.assign({}, item.vm.formData)
      //       for (const rule of childRules) {
      //         if (rule.parse && childFormData[rule.field] < 100) {
      //           childFormData[rule.field] = rule.parse(childFormData[rule.field])
      //         }
      //       }
      //       modelData[item.field] = childFormData
      //     }
      //   }
      // })
      if (modelData.fixedTimeSetting) {
        if (modelData.fixedTimeSetting.otherCustomTime === 0) {
          modelData.fixedTimeSetting = {
            otherCustomTime: 0
          }
        }
      }
      // ftp下载的业务时长逻辑
      if (modelData.ftpDownloadTestConfig) {
        if (modelData.ftpDownloadTestConfig.psCallMode === 'By Time') {
          modelData.ftpDownloadTestConfig.downloadTimeout = undefined
        } else {
          modelData.ftpDownloadTestConfig.downloadDuration = undefined
        }
        if (!modelData.ftpDownloadTestConfig.isSaveFile) {
          modelData.ftpDownloadTestConfig.saveDirectory === undefined
        }
      }
      if (modelData.networkLockSetting) {
        modelData.networkLockSetting.isAvailable = true
        // modelData.networkLockSetting.lockNetwork = 'LTE'
      }
      console.log(modelData)
      if (boolean) {
        console.log(template)
        if (template) {
          if (modelData.template) {
            fetchAllTemplateAdd(modelData.template, modelData).then(res => {
              if (res.data.code === 1) {
                this.$notify({
                  title: this.$t('common.success'),
                  message: this.$t('common.success'),
                  type: 'success',
                  duration: 2000
                })
                updateGroup()
              }
            })
            return 0
          } else {
            this.$alert(i18n.t('taskPlan.message.nameNull'), i18n.t('common.tip'), {
              confirmButtonText: i18n.t('common.confirm'),
              callback: action => {
              }
            })
            return 1
          }
        } else {
          addTask(groupId, modelData, taskId).then(res => {
            if (res.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.success'),
                type: 'success',
                duration: 2000
              })
              updateGroup()
            }
            return 0
          })
        }
      } else {
        this.$alert(i18n.t('common.submitErr'), i18n.t('common.tip'), {
          confirmButtonText: i18n.t('common.confirm'),
          callback: action => {
          }
        })
        return 1
      }
      console.log(this.modelForm)
      this.resetForm()
    },
    // 清空表单
    resetForm() {
      this.modelForm.resetFields()
      this.modelForm.rule.forEach(item => {
        switch (item.field) {
          case 'mftpDownloadTestConfig': item.vm.$refs.nodeForm.modelForm.resetFields(); break;
          case 'mftpUploadTestConfig': item.vm.$refs.nodeForm.modelForm.resetFields(); break;
          case 'mocTestConfig': item.vm.$refs.refMoc.modelForm.resetFields(); break;
          case 'mtcTestConfig': item.vm.modelForm.resetFields(); break;
          case 'ftpUploadTestConfig': item.vm.$refs.ftpUpFrom.modelForm.resetFields(); break;
          case 'ftpDownloadTestConfig': item.vm.$refs.ftpDownFrom.modelForm.resetFields(); break;
          default:
            console.log(item)
        }
      })
    },
    testSubmit(data) {
    },
    handleTaskForm(data) {
      this.apiData = data
      this.taskForm = data
      this.modelForm.setValue(data)
      this.modelForm.rule.forEach(item => {
        if (item.hasChildren) {
          item.vm.data = data[item.field]
        }
      })
      this.$refs.refs.$forceUpdate()
      this.loaded = true
      // var fApi = this.testSubmit()
      // this.modelForm.setValue(data)
      // // setValue
      // Object.keys(data).forEach((key) => {
      //   if (typeof fApi[key] === 'object') {
      //     console.log(data[key])
      //     fApi[key].setValue(data[key])
      //     // level2
      //     Object.keys(data[key]).forEach((key2) => {
      //       if (typeof fApi[key2] === 'object') {
      //         console.log(key2)
      //         fApi[key].setValue(data[key][key2])
      //       }
      //     })
      //     // level3
      //   }
      // })
      // //
      // console.log(this.modelForm)
      // this.modelForm.rule.forEach(item => {
      //   if (item.hasChildren) {
      //     item.vm.rule.forEach(item2 => {
      //       if (item2.formType === 'list') {
      //         console.log('list')
      //         item2.vm.list = data[item.field][item2.field]
      //       }
      //     })
      //   }
      // })
    }
  }
}

