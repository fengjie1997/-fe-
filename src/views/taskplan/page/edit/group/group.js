import MenuTree from './menuTree.vue'
import GroupForm from './groupForm/groupForm.vue'
import { taskTypeMenu } from '../portConf/rules/taskType'
import { fetchtTaskGroupList, addTaskGroup } from '@/api/device/testPlanList.js' // addTask
import { delTaskGroupById, delTask } from '@/api/device/testPlanTask' // fetchTaskFromTaskGroup

export default {
  components: { MenuTree, GroupForm },
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
      taskGroupId: '',
      addDialogVisible: false,
      taskGroup: [],
      groupForm: {},
      menuList: []
    }
  },
  created() {
    this.menuList = null
    this.menuList = taskTypeMenu()
    console.log(this.menuList)
  },
  computed: { },
  watch: {
    schemaId(schemaId) {
      // console.log(schemaId)
      this.getGroupList(schemaId)
    }
  },
  methods: {
    handleHeaderclass(row, column, rowIndex, columnIndex) {
      console.log(row, column, rowIndex, columnIndex)
      return 'test'
    },
    addNewTask(name) {
      this.$emit('addtask', name)
    },
    // 任务组或任务编辑
    handleEditFormShow(row) {
      var form = Object.assign({}, row)
      if (row.hasOwnProperty('children')) {
        this.groupForm = JSON.parse(JSON.stringify(form))
        console.log(this.groupForm)
        this.addDialogVisible = true
      } else {
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
      } else {
        this.$emit('refreshTaskId', val.id)
        this.$emit('refreshGroupId', val.taskGroupId)
      }
    },
    getGroupList(schemaId) {
      fetchtTaskGroupList(schemaId, this.planId).then(res => {
        this.taskGroup = res.data.data
        // console.log('任务组', this.taskGroup)
      })
    },
    // 添加任务组
    onSubmitGroupForm() {
      console.log(this.schemaId)
      if (this.schemaId === null) {
        this.$message({
          type: 'info',
          message: '未选择任务组'
        })
        return false
      }
      addTaskGroup(this.schemaId, this.groupForm).then(res => {
        if (res.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.success'),
            type: 'success',
            duration: 2000
          })
          this.getGroupList(this.schemaId)
          this.addDialogVisible = false
        }
      })
    },
    setGroupForm(form) {
      this.groupForm = form
    },
    // 删除任务或任务组
    delTaskGroup(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
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
                message: '删除成功!'
              })
              this.getGroupList(this.schemaId)
            }
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

  }
}
