import { addTaskGroup } from '@/api/device/testPlanList.js'
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
      timeRegion: ['00:00', '23:59'],
      key: false,
      startTime: null,
      endTime: null,
      group: {
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
      }
    }
  },
  created() { },
  watch: {
    group: {
      handler() {
        this.$emit('setGroupForm', this.group)
      },
      deep: true
    },
    form(newData) {
      this.group = newData
      console.log(newData)
    }
  },
  methods: {
    addTimeRegion() {
      // 验证是否一致
      if (this.timeRegion === null || this.timeRegion[0] === this.timeRegion[1]) {
        return false
      } else {
        this.startTime = this.timeRegion[0]
        this.endTime = this.timeRegion[1]
      }
      // 重复验证
      if (this.group.taskExecuteDurations.length > 0) {
        this.key = true
        // 时间段冲突验证
        this.group.taskExecuteDurations.forEach(item => {
          if (parseFloat(this.startTime.replace(':', '.')) < parseFloat(item.duration.replace(':', '.'))) {
            this.$notify({
              title: this.$t('common.error'),
              message: '时间段冲突',
              type: 'warning',
              duration: 2000
            })
            this.key = false
            return false
          }
        })
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
      console.log(this.group)
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
