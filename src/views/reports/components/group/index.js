import moment from 'moment-timezone'
import { getCacheDict } from '@/utils/dictCache'
export default {
  data() {
    return {
      regionTypeList: getCacheDict('groupRegionType'),
      regionType: null,
      activeName: 'time',
      timeRegion: [],
      timeForm: {},
      // area data
      areaList: [],
      // table data
      timeFilterList: {
        type: 'time',
        alias: '',
        auto: true,
        name: '',
        range: '',
        timeFilter: []
      },
      regionFilterList: {
        type: 'region',
        alias: '',
        auto: true,
        name: '',
        range: '',
        regionFilter: []
      },
      regionDialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      regionValue: '',
      regionIdName: {}
    }
  },
  computed: {
    groupFilter() {
      var arr = []
      arr.push(this.regionFilterList)
      arr.push(this.timeFilterList)
      return arr
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
      if (this.timeFilterList.timeFilter.length > 0) {
        this.timeFilterList.timeFilter.forEach(item => {
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
      this.timeFilterList.timeFilter.push(JSON.parse(JSON.stringify(m)))
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
      this.timeFilterList.timeFilter.splice(index, 1)
    },
    addRegion() {
      if (this.regionValue === null || this.regionType === null) {
        this.$message({
          message: '请正确选择数据',
          type: 'warning'
        })
      } else {
        var param = {
          city: '',
          province: '',
          provinceAndCity: '',
          regionFile: '',
          regionFilter: [],
          type: ''
        }
        param.type = this.regionType
        switch (this.regionType) {
          case 'province':
            param.province = this.regionValue
            break
          case 'city':
            param.city = this.regionValue
            break
          case 'provinceAndCity':
            var provinceName = null
            this.areaList.forEach(item => {
              if (item.hasOwnProperty('children')) {
                item.children.forEach(item2 => {
                  if (item2.name === this.regionValue) {
                    provinceName = item.name
                  }
                })
              }
            })
            param.provinceAndCity = provinceName + '-' + this.regionValue
            break
          default:
            break
        }
        this.regionFilterList.regionFilter.push(param)
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
      this.regionFilterList.regionFilter.splice(index, 1)
    }

  }
}
