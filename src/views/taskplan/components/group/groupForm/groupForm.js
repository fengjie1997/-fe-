import { addTaskGroup } from '@/api/device/testPlanList.js'
import { mapState } from 'vuex'
import { timeRange } from '@/utils/timeZone'
export default {
  name: 'groupForm',
  props: {
    form: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      startTimeOptions: [],
      // 结束时间的option由开始时间决定
      endTimeOptions: [],
      timeRegion: [0, 0],
      key: false,
      startTime: null,
      endTime: null,
      group: {
        allModuleSync: 1,
        buildOnlyOnePpp: 0,
        groupName: 'taskgroup name',
        groupRepeatCount: 9999,
        groupSequence: 1,
        interval: 15000,
        isCheck: true,
        taskExecuteDurations: [
          {
            startTime: '00:00',
            duration: '23:59'
          }
        ]
      }
    }
  },
  created() {
    this.startTimeOptions = timeRange
    this.endTimeOptions = timeRange
    console.log(this.startTimeOptions, this.endTimeOptions)
  },
  watch: {
    form: {
      handler(newData) {
        this.group = newData
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      schemaId: state => state.testPlan.schemaId
    })
  },
  methods: {
    startTimeChange() {
      // select代替时间段picker
      if (this.timeRegion[0] < 46) {
        this.timeRegion[1] = this.timeRegion[0] + 1
      } else {
        this.timeRegion[1] = ''
      }
    },
    setForm(data) {
      this.group = data
    },
    addTimeRegion() {
      // 验证是否一致
      if (this.timeRegion === null || this.timeRegion[0] >= this.timeRegion[1]) {
        this.$notify({
          title: this.$t('common.error'),
          message: this.$t('taskPlan.message.timeConflict'),
          type: 'warning',
          duration: 2000
        })
        return false
      } else {
        this.startTime = this.startTimeOptions[this.timeRegion[0]].label.substring(0, 5)
        console.log(this.timeRegion[1])
        this.endTime = this.endTimeOptions[this.timeRegion[1]].label.substring(0, 5)
        console.log(this.endTime)
      }
      // 重复验证
      if (this.group.taskExecuteDurations.length > 0) {
        this.key = true
        // 时间段冲突验证
        // this.group.taskExecuteDurations.forEach(item => {
        //   if (parseFloat(this.startTime.replace(':', '.')) < parseFloat(item.duration.replace(':', '.'))) {
        //     this.$notify({
        //       title: this.$t('common.error'),
        //       message: this.$t('taskPlan.message.timeConflict'),
        //       type: 'warning',
        //       duration: 2000
        //     })
        //     this.key = false
        //     return false
        //   }
        // })
        if (this.key) {
          this.handleAddTime()
        }
      } else {
        this.handleAddTime()
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'filter-time-table'
      }
    },
    onSubmit() {
      addTaskGroup(this.schemaid, this.group).then(res => {
        this.$emit('updateTaskGroup')
        if (res.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.success'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 添加时段
    handleAddTime() {
      this.group.taskExecuteDurations.push({
        duration: this.endTime,
        startTime: this.startTime
      })
    },
    // 删除时段
    handleDel(scope) {
      this.group.taskExecuteDurations.splice(scope.$index, 1)
    }

  }
}
