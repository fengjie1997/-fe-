import {
  fetchDeviceStatusList,
  updateDisconnect,
  updateReboot,
  updatePlan,
  updatePlay,
  updatePause,
  updateStop
} from '@/api/monitored/status'
import {
  parseTime
} from '@/utils'
export default {
  data() {
    return {
      /**
       * 列表
       */
      headerHeight: 320,
      tableHeight: window.innerHeight - 320,
      listLoading: false,
      list: [],
      listQuery: {
        type: -1,
        id: undefined,
        status: undefined,
        groupId: -1,
        search: undefined
      },
      statusListQuery: {
        type: undefined,
        status: [1]
      },
      statusTableType: [{
        label: 'ALL',
        key: -1
      },
      {
        label: 'RCU',
        key: 0
      },
      {
        label: 'ATU',
        key: 1
      },
      {
        label: 'Walktour',
        key: 2
      },
      {
        label: 'Scout 1.0',
        key: 3
      },
      {
        label: 'VIP',
        key: 4
      },
      {
        label: 'Pioneer',
        key: 5
      },
      {
        label: 'Walktour Pack',
        key: 6
      },
      {
        label: 'Indoor ATU',
        key: 7
      },
      {
        label: 'Scout 2.0',
        key: 8
      },
      {
        label: 'RCU Light',
        key: 9
      },
      {
        label: 'BTU',
        key: 10
      },
      {
        label: 'CTU',
        key: 11
      },
      {
        label: 'ASPS',
        key: 12
      },
      {
        label: 'LiteProbe',
        key: 13
      }
      ],
      tableStatus: [{
        text: this.$t('trajectory.onLine'),
        value: 1
      }, {
        text: this.$t('trajectory.offLine'),
        value: 0
      }]
    }
  },
  mounted() { // element banner 高度自适应
    window.addEventListener('resize', () => { //  resize:当调整浏览器窗口的大小时触发事件
      this.tableHeight = window.innerHeight - 320
    })
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.groupId = this.$store.getters.monitoredGroupId
      fetchDeviceStatusList(this.listQuery).then(res => {
        if (res.data.code === 1) {
          this.list = res.data.data
        }
      })
      this.listLoading = false
    },
    handleFilterChange(filters) {
      console.log(filters)
      console.log('筛选条件变化')
    },
    /**
     * 事件
     */
    handleDisconnect() {
      const data = this.getTableRowId()
      if (data.length > 0) {
        data.forEach(device => {
          updateDisconnect(device.id, device.type).then(res => {
            // 成功后执行操作
            this.$notify.success({
              title: this.$t('common.success'),
              message: 'ok',
              duration: 1000
            })
          })
        })
      }
    },
    handleReboot() {
      const data = this.getTableRowId()
      if (data.length > 0) {
        data.forEach(device => {
          updateReboot(device.id, device.type).then(res => {
            // 成功后执行操作
            this.$notify.success({
              title: this.$t('common.success'),
              message: 'ok',
              duration: 1000
            })
          })
        })
      }
    },
    handleUpatePlan() {
      const data = this.getTableRowId()
      if (data.length > 0) {
        data.forEach(device => {
          updatePlan(device.id, device.type).then(res => {
            // 成功后执行操作
            this.$notify.success({
              title: this.$t('common.success'),
              message: 'ok',
              duration: 1000
            })
          })
        })
      }
    },
    handlePlay() {
      const data = this.getTableRowId()
      if (data.length > 0) {
        data.forEach(device => {
          updatePlay(device.id, device.type).then(res => {
            // 成功后执行操作
            this.$notify.success({
              title: this.$t('common.success'),
              message: 'ok',
              duration: 1000
            })
          })
        })
      }
    },
    handlePause() {
      const data = this.getTableRowId()
      if (data.length > 0) {
        data.forEach(device => {
          updatePause(device.id, device.type).then(res => {
            // 成功后执行操作
            this.$notify.success({
              title: this.$t('common.success'),
              message: 'ok',
              duration: 1000
            })
          })
        })
      }
    },
    handleStop() {
      const data = this.getTableRowId()
      if (data.length > 0) {
        data.forEach(device => {
          updateStop(device.id, device.type).then(res => {
            // 成功后执行操作
            this.$notify.success({
              title: this.$t('common.success'),
              message: 'ok',
              duration: 1000
            })
          })
        })
      }
    },
    getTableRowId() {
      const row = this.$refs.statusTable.selection
      if (row.length > 0) {
        const arr = []
        row.forEach(element => {
          arr.push({ id: element.id, type: element.type })
        })
        console.log(arr)
        return arr
      } else {
        alert('没有选中')
        return null
      }
    },
    /**
     * 下载
     */
    handleDownload() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [this.$t('deviceStatus.name'), this.$t('deviceStatus.type'), this.$t('deviceStatus.onlineDuration'), this.$t('deviceStatus.lastLogoutDatetime'), this.$t('deviceStatus.speed'), this.$t('deviceStatus.longitude'), this.$t('deviceStatus.latitude'), this.$t('deviceStatus.version'), this.$t('deviceStatus.system')]
        const filterVal = ['name', 'type', 'onlineDuration', 'lastLogoutDatetime', 'speed', 'longitude', 'latitude', 'version', 'system']
        const data = this.formatJson(filterVal, this.$refs.statusTable.selection)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-deviceStatus'
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        // 此处是时间格式化
        switch (j) {
          case 'lastLogoutDatetime':
            return parseTime(v[j])
          case 'type':
            this.statusTableType.forEach(element => {
              if (element.key === v[j]) {
                return element.label
              }
            })
            return v[j]
          default:
            break
        }
        return v[j]
      }))
    }
  }
}
