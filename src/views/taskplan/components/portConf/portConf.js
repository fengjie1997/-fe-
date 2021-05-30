// PortForm
import { copy } from 'copy-anything'
import taskForm from './taskForm/index.vue'
import { PortListView, GroupLIstView, MenuTree } from '../index.js'
import { taskTypeMenu } from './taskRule/taskType'
import { fetchTaskFromTaskGroup } from '@/api/device/testPlanTask' // fetchTaskFromTaskGroup
import { taskFormRules, typeFormName } from './taskRule/index.js'
import { mapActions } from 'vuex'

export default {
  name: 'PortConf',
  components: { PortListView, GroupLIstView, MenuTree, taskForm },
  props: {
    planId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      // 保存或者保存模板的标识
      template: false,
      dialogTaskForm: false,
      isSubmit: false,
      schemaId: null,
      taskGroupId: null,
      selectedTaskGroup: undefined,
      actionName: null,
      update: true,
      disabled: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      portList: [],
      taskGroup: [],
      activeForm: {
        rule: [],
        model: {},
        option: {}
      },
      formRule: taskFormRules.tdscdmaScanner,
      modelForm: {},
      menuList: null,
      taskId: null,
      taskForm: {},
      reset: false
    }
  },
  created() {
    localStorage.setItem('taskTypeMenu', JSON.stringify(taskTypeMenu))
    this.menuList = null
    this.menuList = taskTypeMenu()
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      saveTaskGroup: 'deviceList/saveTaskGroup'
    }),
    refreshPortList(planId) {
      console.log('refresh', planId)
      this.$refs.portListView.getPortList(planId)
    },
    // 新建任务
    addNewTask(name) {
      console.log(taskFormRules[name])
      console.log(name)
      if (this.taskGroupId === null) {
        this.$notify({
          title: this.$t('common.error'),
          message: this.$t('taskPlan.common.selectTaskGroup'),
          type: 'warning',
          duration: 2000
        })
        return false
      }
      this.dialogTaskForm = true
      this.taskId = null
      // this.handleFormShow(name)
      this.isSubmit = true
      if (taskFormRules[name] !== undefined) {
        this.formRule = []
        this.reset = false
        this.$nextTick(() => {
          this.reset = true
          const temp = copy(taskFormRules[name])
          // if (name === 'ping') {
          //   console.log(1)
          //   temp.forEach(item => {
          //     if (item.field === 'timeWindowSetting') {
          //       item.vm.rule[1].title = this.$t('taskPlan.form.windowSizePing')
          //       item.vm.rule[2].title = this.$t('taskPlan.form.guardPingDuration')
          //       item.vm.rule[3].title = this.$t('taskPlan.form.taskPingDuration')
          //     }
          //     if (item.field === 'fixedTimeSetting') {
          //       item.vm.rule[0].title = this.$t('taskPlan.form.taskPingDuration')
          //       item.vm.rule[1].title = this.$t('taskPlan.form.intervalPing')
          //     }
          //   })
          // }
          console.log(temp)
          this.formRule = temp
        })
      }
    },
    refreshTaskId(tid) {
      this.taskId = tid
    },
    refreshGroupId(tgId) {
      this.taskGroupId = tgId
    },
    handleSelectTaskGroup(taskGroup) {
      this.selectedTaskGroup = taskGroup
    },
    refreshSchemaId(schemaId) {
      this.schemaId = schemaId
    },
    // show form
    handleFormShow(name, data) {
      this.dialogTaskForm = true
      this.isSubmit = true
      if (taskFormRules[name] !== undefined) {
        // this.formRule = copy(taskFormRules[name])
        this.reset = false
        const temp = copy(taskFormRules[name])
        // if (name === 'ping') {
        //   temp.forEach(item => {
        //     if (item.field === 'timeWindowSetting') {
        //       item.vm.rule[1].title = this.$t('taskPlan.form.windowSizePing')
        //       item.vm.rule[2].title = this.$t('taskPlan.form.guardPingDuration')
        //       item.vm.rule[3].title = this.$t('taskPlan.form.taskPingDuration')
        //     }
        //     if (item.field === 'fixedTimeSetting') {
        //       item.vm.rule[0].title = this.$t('taskPlan.form.taskPingDuration')
        //       item.vm.rule[1].title = this.$t('taskPlan.form.intervalPing')
        //     }
        //   })
        // }
        // console.log(temp)
        this.formRule = temp
        this.$nextTick(() => {
          this.reset = true
          this.handleEleForm(data)
          // this.$refs.taskFormss.handleTaskForm(data)
        })
      }
    },
    handleEleForm(data) {
      setTimeout(() => {
        var hasCreated = this.$refs.taskFormss
        if (hasCreated) {
          this.$refs.taskFormss.handleTaskForm(data)
        } else {
          this.handleEleForm()
        }
      }, 300)
    },
    handleEditFormShow(val) {
      console.log(val)
      // task
      if (!val.hasOwnProperty('isCheck')) {
        fetchTaskFromTaskGroup(val.id).then(res => {
          if (res.data.code === 1) {
            this.taskId = val.id
            this.taskGroupId = val.taskGroupId
            this.taskForm = res.data.data
            this.handleFormShow(this.getFormRuleName(res.data.data.taskType))
          }
        })
      }
    },
    // 编辑任务视图
    handleEditTaskFrom(groupId, taskId) {
      fetchTaskFromTaskGroup(taskId).then(res => {
        if (res.data.code === 1) {
          var name = null
          if (res.data.data.taskType === 'Scanner') {
            switch (res.data.data.scannerTestConfig.scanType) {
              case 'cw':
                name = 'cwScanner'
                break
              case 'SPECTRUM':
                name = 'spectrumScanner'
                break
              case 'BLIND':
                name = 'blindScanner'
                break
              case 'GSM_ColorCode':
                name = 'gsmScanner'
                break
              case 'CDMA_pilot':
                name = 'cdmaScanner'
                break
              case 'WCDMA_pilot':
                name = 'wcdmaScanner'
                break
              case 'TDSCDMA_pilot':
                name = 'tdscdmaScanner'
                break
              case 'LTE_pilot':
                name = 'lteScanner'
                break
              case 'NB_pilot':
                name = 'nbScanner'
                break
              default:
                break
            }
          } else {
            typeFormName.forEach(item => {
              if (item.type === res.data.data.taskType) {
                name = item.name
              }
            })
          }
          this.handleFormShow(name, res.data.data)
          console.log(res.data.data)
          this.taskId = taskId
          this.taskGroupId = groupId
          this.taskForm = res.data.data
        }
      })
    },
    updateTaskForm(data) {
      this.$refs.taskFormss.handleTaskForm(data)
    },
    formReField() {
      console.log('清空表单')
      this.$refs.taskFormss.resetForm()
    },
    refTask() {
      // // 如果是默认组（未真实创建的组），先对任务组进行保存
      // if (this.taskGroupId === undefined) {
      //   this.saveTaskGroup({
      //     schemaId: this.schemaId,
      //     taskGroup: this.selectedTaskGroup,
      //     groupId: null,
      //     // 任务组保存成功后才进行任务的保存
      //     success: (data) => {
      //       this.taskGroupId = data.taskGroupId
      //       this.saveTaskData(this.template)
      //     }
      //   })
      // } else {
      //   this.saveTaskData(this.template)
      // }
      this.saveTaskData(this.template)
      console.log(this)
    },
    saveTaskData(template) {
      // this.$refs.taskFormss.onSubmit(this.taskGroupId, this.taskId, this.handleReset.bind(this))
      // console.log(this.$refs.taskFormss.onSubmit(this.taskGroupId, this.taskId, this.handleReset.bind(this)))
      if (this.$refs.taskFormss.onSubmit(template, this.taskGroupId, this.taskId, this.handleReset.bind(this)) !== 1) {
        this.dialogTaskForm = false
      }
    },
    handleReset() {
      this.$refs.groupListView.getGroupList(this.schemaId)
    }
  }

}
