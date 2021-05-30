import MenuTree from './menuTree.vue'
import GroupForm from './groupForm/groupForm.vue'
import { taskTypeMenu } from '../portConf/taskRule/taskType'
import { fetchtTaskGroupList, addTaskGroup, moveGroup, moveTask } from '@/api/device/testPlanList.js' // addTask
import { delTaskGroupById, delTask } from '@/api/device/testPlanTask' // fetchTaskFromTaskGroup
import { mapState } from 'vuex'
import contextButton from '@/views/taskplan/components/group/groupForm/contextButton'
// import moment from 'moment-timezone'
// import moment from 'moment'
export default {
  components: { MenuTree, GroupForm, contextButton },
  props: {
    planId: {
      type: Number,
      default: null
    },
    schemaId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      value: '',
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }],
      // 用于编辑任务组的时间冲突
      groupEditId: '',
      taskGroupId: null,
      addDialogVisible: false,
      taskGroup: [],
      groupForm: {
        allModuleSync: 1,
        buildOnlyOnePpp: 0,
        groupName: 'taskgroup name',
        groupRepeatCount: 9999,
        groupSequence: 1,
        interval: 1500,
        isCheck: true,
        taskExecuteDurations: [
          {
            startTime: '00:00',
            duration: '23:59'
          }
        ]
      },
      menuList: [],
      //  右键事件
      rightEventRow: '',
      rightEventColum: '',
      menuVisible: false,
      model: []
    }
  },
  created() {
    this.menuList = null
    this.menuList = taskTypeMenu()
  },
  computed: {
    ...mapState({
      modemPort: state => state.testPlan.modemPort,
      selectedPort: state => state.testPlan.selectedPort,
      deviceId: state => state.testPlan.deviceId
    }),
    updateForm() {
      return this.groupForm
    }
  },
  watch: {
    schemaId(schemaId) {
      // 切换选中端口，将taskGroupId置为null
      this.$emit('refreshGroupId', null)
      this.getGroupList(schemaId)
    },
    selectedPort() {
      this._updateMenuList()
    },
    modemPort(newValue, oldValue) {
      this._updateMenuList()
      // if (newValue !== null && oldValue !== null) {
      //   // 变更传输模块端口
      //   switchModemPort(this.deviceId, this.planId, newValue).then(res => {
      //     if (res.data.code === 1) {
      //       // 更新端口列表
      //       console.log('group:', this)
      //       this.$notify({
      //         title: this.$t('common.success'),
      //         message: this.$t('common.updateSuccess'),
      //         type: 'success',
      //         duration: 2000
      //       })
      //     }
      //   })
      // }
    },
    groupForm: {
      handler(newData) {
        this.groupForm = newData
      },
      deep: true
    }
  },
  methods: {
    rowContextmenu(row, column, event) {
      this.rightEventRow = row
      this.rightEventColum = column
      console.log(row, column, event, this.portChoList)
      this.menuVisible = false
      this.menuVisible = true
      console.log(event)
      // 阻止右键默认行为
      event.preventDefault()
      this.$nextTick(() => {
        this.$refs.contextbutton.init(row, column, event)
      })
    },
    handleRowClick(row) {
      if (row.hasOwnProperty('children')) {
        // 任务组
        this.taskGroupId = row.id
      } else {
        this.taskGroupId = row.taskGroupId
      }
    },
    handleGroupAdd() {
      this.taskGroupId = null
      this.addDialogVisible = true
    },
    getHeaderCellClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'toolbar-container'
      }
    },
    addNewTask(name) {
      this.$emit('addtask', name)
    },
    // 任务组或任务编辑
    handleEditFormShow(row, index) {
      console.log(row, index)
      this.groupEditId = index
      if (row.hasOwnProperty('children')) {
        // 任务组
        this.taskGroupId = row.id
        this.groupForm = Object.assign({}, row)
        this.addDialogVisible = true
      } else {
        // 编辑任务
        console.log(row)
        this.$emit('editTaskFrom', row.taskGroupId, row.id)
      }
    },
    // 切换GroupId或TaskId
    handleTaskGroupChange(val) {
      if (val === null) {
        return false
      }
      if (val.hasOwnProperty('children')) {
        this.$emit('refreshGroupId', val.id)
        this.$emit('selectTaskGroup', val)
      } else {
        this.$emit('refreshTaskId', val.id)
        this.$emit('refreshGroupId', val.taskGroupId)
      }
    },
    getGroupList(schemaId) {
      // 先清空任务列表
      this.taskGroup = []
      fetchtTaskGroupList(schemaId, this.planId).then(res => {
        // // 端口没有任务组的情况下给予一个默认任务组
        // this.taskGroup = res.data.data.length === 0 ? this.getDefaultGroupList() : res.data.data
        res.data.data.forEach(item => {
          for (const i in item.taskExecuteDurations) {
            item.taskExecuteDurations[i].startTime = item.taskExecuteDurations[i].startTime.substring(0, 5)
            item.taskExecuteDurations[i].duration = this.getLocalDuration(Number(item.taskExecuteDurations[i].startTime.substring(0, 2)), Number(item.taskExecuteDurations[i].startTime.substring(3, 5)), Number(item.taskExecuteDurations[i].duration.substring(0, 2)), Number(item.taskExecuteDurations[i].duration.substring(3, 5)))
          }
        })
        this.taskGroup = res.data.data
        this.model = res.data.data
      })
    },
    // 保存任务组信息
    onSubmitGroupForm() {
      var data = this.$refs.groupFrom.group
      console.log(data)
      this.addTaskGroup(this.schemaId, data, this.taskGroupId)
    },
    // 添加任务组
    addTaskGroup(schemaId, data, taskGroupId) {
      data.taskExecuteDurations.forEach(item => {
        console.log(Number(item.duration.substring(0, 2)), Number(item.startTime.substring(0, 2)), Number(item.duration.substring(3, 5)))
        item.duration = this.getDuration(Number(item.startTime.substring(0, 2)), Number(item.startTime.substring(3, 5)), Number(item.duration.substring(0, 2)), Number(item.duration.substring(3, 5)))
      })
      addTaskGroup(schemaId, data, taskGroupId).then(res => {
        if (res.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.success'),
            type: 'success',
            duration: 2000
          })
          this.addDialogVisible = false
          this.groupEditId = ''
        }
        this.getGroupList(this.schemaId)
      })
    },
    getDuration(startHour, startMin, endHour, endMin) {
      let hour = ''; let min = ''
      hour = endHour - startHour
      min = endMin - startMin
      if (min < 0) {
        min = 30
        hour = hour - 1
      }
      if (hour < 10) {
        hour = '0' + hour.toString()
      } else {
        hour = hour.toString()
      }
      if (min === 0) {
        min = '00'
      } else {
        min = min.toString()
      }
      return hour + ':' + min
    },
    getLocalDuration(startHour, startMin, endHour, endMin) {
      console.log(startHour, startMin, endHour, endMin)
      let hour = ''; let min = ''
      hour = endHour + startHour
      min = endMin + startMin
      if (min > 59) {
        min = '00'
        hour = hour + 1
      } else if (min === 0) {
        min = min.toString() + '0'
      } else {
        min = min.toString()
      }
      if (hour < 10) {
        hour = '0' + hour.toString()
        return hour + ':' + min
      } else if (hour > 23) {
        hour = hour - 23
        return hour + ':' + min + '(tomorrow)'
      } else {
        hour = hour.toString()
        return hour + ':' + min
      }
    },
    setGroupForm(form) {
      this.groupForm = form
    },

    handleTimeRegion(row) {
      console.log(row)
    },
    // 删除任务或任务组
    delTaskGroup(row) {
      this.$confirm(this.$t('common.deleteClearRecord'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        // 删除任务组
        if (row.hasOwnProperty('children')) {
          delTaskGroupById(this.planId, row.id).then(res => {
            if (res.data.code === 1) {
              this.getGroupList(this.schemaId)
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.success'),
                type: 'success',
                duration: 2000
              })
            }
          })
        } else {
        // 删除任务
          delTask(row.id).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: this.$t('common.deleteSuccess')
              })
              this.getGroupList(this.schemaId)
            }
          })
        }
      }).catch(() => {
      })
    },
    handleChange(v) {
      console.log(v)
    },
    getDefaultGroupList() {
      return [{
        allModuleSync: 1,
        buildOnlyOnePpp: 0,
        children: [],
        groupName: 'Default Task Group',
        groupRepeatCount: 9999,
        groupSequence: 1,
        interval: 1500,
        isCheck: true,
        taskExecuteDurations: [
          {
            startTime: '00:00',
            duration: '23:59'
          }
        ]
      }]
    },
    _updateMenuList() {
      // 选中端口为modemPort， 则不可添加Modem传输任务
      const dataTransferIndex = this.menuList.findIndex(item => item.value === 'dataTransfer')
      if (dataTransferIndex !== -1) {
        this.menuList[dataTransferIndex].disabled = this.selectedPort !== this.modemPort
        this.$set(this.menuList, dataTransferIndex, this.menuList[dataTransferIndex])
      }
    },
    foo() { // 取消鼠标监听事件 菜单栏
      this.menuVisible = false
      document.removeEventListener('click', this.foo)
    },
    //  右侧点击
    handleMoveUp(row, temp) {
      if (row.hasOwnProperty('groupSequence')) {
        temp.forEach(item => {
          if (item.groupSequence === row.groupSequence - 1) {
            moveGroup(this.deviceId, this.planId, item.id, row.id).then(res => {
              if (res.data.code === 1) {
                this.getGroupList(this.schemaId)
              }
            })
          }
        })
      } else {
        console.log('1')
        console.log(this.model)
        temp.forEach(item => {
          if (item.taskSequence === row.taskSequence - 1) {
            moveTask(this.deviceId, this.planId, item.id, row.id).then(res => {
              if (res.data.code === 1) {
                this.getGroupList(this.schemaId)
              }
            })
          }
        })
      }
    },
    handleMoveDown(row, temp) {
      if (row.hasOwnProperty('groupSequence')) {
        temp.forEach(item => {
          if (item.groupSequence === row.groupSequence + 1) {
            moveGroup(this.deviceId, this.planId, row.id, item.id).then(res => {
              if (res.data.code === 1) {
                this.getGroupList(this.schemaId)
              }
            })
          }
        })
      } else {
        temp.forEach(item => {
          if (item.taskSequence === row.taskSequence + 1) {
            moveTask(this.deviceId, this.planId, row.id, item.id).then(res => {
              if (res.data.code === 1) {
                this.getGroupList(this.schemaId)
              }
            })
          }
        })
      }
    }
  }
}
