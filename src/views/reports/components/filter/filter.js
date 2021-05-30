import moment from 'moment-timezone'
export default {
  data() {
    return {
      activeName: 'time',
      timeRegion: [],
      timeForm: {},
      // area data
      area1: [],
      area2: [],
      areaList: [],
      // table data
      timeFilterList: [],
      regionFilterList: [],
      regionDialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      regionValue: '',
      regionIdName: {}
    }
  },
  created() {
    this.getAreaList()
  },
  methods: {
    getAreaList() {
      this.areaList = this.$store.getters.regionTree
      this.handleRegionIdName(this.areaList)
    },
    handleRegionIdName(list) {
      var param = {}
      list.forEach(item => {
        param[item.id] = item.name
        if (item.hasOwnProperty('children')) {
          item.children.forEach(eleItem => {
            param[eleItem.id] = eleItem.name
          })
        }
      })
      this.regionIdName = param
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'filter-time-table'
      }
    },
    regionTableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'filter-region-table'
      }
    },
    handleTimeAdd() {
      // 判断
      if (this.timeFilterList.length > 0) {
        this.timeFilterList.forEach(item => {
          console.log(item)
          this.compareDateTime(item, this.timeRegion)
        })
      }
      var m = {
        beginTime: 0,
        dateType: 'DateTime',
        endTime: 0,
        timeType: 'ComputerTime'
      }
      var arr = Object.assign([], this.timeRegion)
      m.beginTime = arr[0]
      m.endTime = arr[1]
      this.timeFilterList.push(JSON.parse(JSON.stringify(m)))
    },
    formatTimeStamp(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    /**
     * 判断两个日期时间是否重叠
     * @param {*} startDt
     * @param {*} endDt
     */
    compareDateTime(startDt, endDt) {
      var start = []
      var end = []
      start[0] = moment(startDt.beginTime).format('YYYY-MM-DD')
      start[1] = moment(startDt.endTime).format('YYYY-MM-DD')
      end[0] = moment(endDt[0]).format('YYYY-MM-DD')
      end[1] = moment(endDt[1]).format('YYYY-MM-DD')

      var begin = start.sort()
      var over = end.sort()
      console.log(begin)
      console.log(over)
    },
    handleDel(index) {
      this.timeFilterList.splice(index, 1)
    },
    addRegion() {
      if (this.regionValue <= 0) {
        this.$message({
          message: this.$t('common.noSelect'),
          type: 'warning'
        })
      } else {
        var arr = this.regionFilterList
        arr.push(this.regionValue)
        this.regionFilterList = Array.from(new Set(arr))
      }
    },
    handleAdd2() {
      if (this.$refs.selectRegionTable.selection.length <= 0) {
        this.$message({
          message: this.$t('report.noSelect'),
          type: 'warning'
        })
      } else {
        var arr = []
        this.$refs.selectRegionTable.selection.forEach(item => {
          arr.push(item.id)
        })
        this.regionFilterList = arr
        this.regionDialogVisible = false
      }
    },
    getRegionName(id) {
      var list = Object.assign([], this.areaList)
      list.forEach(item => {
        if (item.id === id) {
          return item.name
        }
        if (item.hasOwnProperty('children')) {
          item.children.forEach(eleItem => {
            if (eleItem.id === id) {
              return eleItem.name
            }
          })
        }
      })
    },
    delRegion(index) {
      this.regionFilterList.splice(index, 1)
    }

  }
}
