// PortForm
import { copy } from 'copy-anything'
import { getFormCreateRule } from '@/utils/taskBuilder'
import { PortListView, GroupLIstView, MenuTree } from '../index.js'
import taskForm from './taskForm/index.vue'
import { taskTypeMenu } from './rules/taskType'
import { fetchTaskFromTaskGroup } from '@/api/device/testPlanTask' // fetchTaskFromTaskGroup
import { taskFormRules, typeFormName } from './taskRule/index.js'
import { initTaskFormRule } from './taskRule/rule.js'
import BuildTask from './task.class.js'

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
      dialogTaskForm: false,
      builder: new BuildTask(),
      isSubmit: false,
      schemaId: null,
      taskGroupId: null,
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
    initTaskFormRule()
    console.log(getFormCreateRule(['basicRule']))

    this.menuList = null
    this.menuList = taskTypeMenu()
  },
  mounted() {
  },
  methods: {
    refreshPortList(planId) {
      console.log('refresh', planId)
      this.$refs.portListView.getPortList(planId)
    },
    // 新建任务
    addNewTask(name) {
      console.log(name)
      if (this.taskGroupId === null) {
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
          this.formRule = copy(taskFormRules[name])
        })
      }
    },
    refreshTaskId(tid) {
      this.taskId = tid
    },
    refreshGroupId(tgId) {
      this.taskGroupId = tgId
    },
    refreshSchemaId(schemaId) {
      this.schemaId = schemaId
    },
    // show form
    handleFormShow(name, data) {
      this.dialogTaskForm = true
      this.isSubmit = true
      if (taskFormRules[name] !== undefined) {
        this.formRule = copy(taskFormRules[name])
        this.reset = false
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
      }, 30)
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
          this.taskId = taskId
          this.taskGroupId = groupId
          this.taskForm = res.data.data
        }
      })
    },
    updateTaskForm(data) {
      this.$refs.taskFormss.handleTaskForm(data)
    },
    refTask() {
      this.$refs.taskFormss.onSubmit(this.taskGroupId, this.taskId, this.handleReset.bind(this))
    },
    handleReset() {
      this.$refs.groupListView.getGroupList(this.schemaId)
    }
  }

}
