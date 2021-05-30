import moment from 'moment-timezone'
import Pagination from '@/components/Pagination'
import { fetchDetails } from '@/api/report/file'
import { getCacheDict } from '@/utils/dictCache'
export default {
  components: {
    Pagination
  },
  props: {
    scenes: {
      type: Array,
      default: function() {
        return []
      }
    },
    sourceGroupId: { // sourceGroupId
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      sourceTableData: [], // 待选视图数据
      selectedTableData: [], // 已选视图数据
      containerSourceId: [], // 待选ID容器
      selectedTableId: [], // 已选ID容器
      activeName: 'selectedPane',
      selectedParams: {
        pageSize: 10,
        pageIndex: 1
      },
      sourceTableParams: {
        pageSize: 10,
        pageIndex: 1
      },
      sourceTable: [],
      activeScene: null,
      testSummary: getCacheDict('testSummary'),
      netTypeDict: getCacheDict('TNetworkType'),
      operatorsOptions: getCacheDict('operators')
    }
  },
  computed: {
    // 场景类型
    taskData() {
      var forms = {}
      if (this.scenes.length > 0) {
        this.scenes.forEach(item => {
          forms[item.name] = []
        })
      }
      return forms
    },
    isSingleScene() {
      return !(this.scenes.length > 0)
    },
    // source table ids
    updateSourceTableIds() {
      return this.containerSourceId.slice((this.sourceTableParams.pageIndex - 1) * this.sourceTableParams.pageSize, this.sourceTableParams.pageIndex * this.sourceTableParams.pageSize)
    },
    updateSelectedTableIds() {
      return this.selectedTableId.slice((this.selectedParams.pageIndex - 1) * this.selectedParams.pageSize, this.selectedParams.pageIndex * this.selectedParams.pageSize)
    }
  },
  watch: {
    sourceGroupId(newIds) {
      if (this.isSingleScene) {
        this.activeName = 'selectedPane'
        this.activeScene = 'SJDL_DEFAULT_TEMPLATE' // fixed the single scene
        this.taskData[this.activeScene] = newIds
        this.selectedTableId = newIds
      } else {
        this.containerSourceId = newIds
      }
    },
    // update table data
    updateSourceTableIds(ids) {
      if (this.activeScene === null) {
        this.activeName = 'sourcePane'
        this.activeScene = this.scenes[0].name
      }
      if (ids.length <= 0) {
        this.sourceTableData = []
      } else {
        fetchDetails(ids).then(res => {
          this.sourceTableData = res.data.data
        })
      }
    },
    updateSelectedTableIds(ids) {
      if (ids.length <= 0) {
        this.selectedTableData = []
      } else {
        fetchDetails(ids).then(res => {
          this.selectedTableData = res.data.data
        })
      }
    }
  },
  created() {},
  methods: {
    toPage(index) {
      this.selectedParams.pageIndex = index
    },
    // 添加全部
    addAll() {
      if (this.scenes.length < 2) {
        return false
      }
      var data = this.taskData[this.activeScene].concat(this.containerSourceId)
      this.taskData[this.activeScene] = Array.from(new Set(data)) // 视图
      this.selectedTableId = this.taskData[this.activeScene]
      this.containerSourceId = []
    },
    // 添加选中
    addSelected() {
      if (this.scenes.length < 0) {
        return false
      }
      if (this.$refs.sourceTable.selection.length > 0) {
        // 过滤
        var arr = []
        this.$refs.sourceTable.selection.forEach(item => {
          arr.push(item.id)
        })
        // 剔除
        this.containerSourceId = this.delEleArray(Object.assign([], this.containerSourceId), arr)
        // // 并入当前场景
        var data = this.taskData[this.activeScene].concat(arr)
        this.taskData[this.activeScene] = Array.from(new Set(data))
        this.selectedTableId = this.taskData[this.activeScene]
      } else {
        this.$message({
          message: this.$t('report.noSelect'),
          type: 'warning'
        })
      }
    },
    // 移除全部
    removeAll() {
      this.containerSourceId = Object.assign([], this.taskData[this.activeScene])
      this.selectedTableId = []
      this.taskData.length = 0
      this.taskData[this.activeScene] = []
    },
    // 移除选中
    removeSelected() {
      if (this.$refs.selectedTable.selection.length > 0) {
        // 过滤
        var arr = []
        this.$refs.selectedTable.selection.forEach(item => {
          arr.push(item.id)
        })
        // 剔除
        this.taskData[this.activeScene] = this.delEleArray(Object.assign([], this.taskData[this.activeScene]), arr)
        console.log(this.taskData)
        // // // 并入当前场景
        var data = this.containerSourceId.concat(arr)
        this.containerSourceId = Array.from(new Set(data))
        this.selectedTableId = this.taskData[this.activeScene]
      } else {
        this.$message({
          message: this.$t('report.noSelect'),
          type: 'warning'
        })
      }
    },
    // 切换场景
    handleChangeScene(name) {
      this.activeScene = name
      this.selectedTableId = this.taskData[this.activeScene]
      console.log(name)
    },
    // 文件单位转换
    getfilesize(size) {
      if (!size) { return '' }
      var num = 1024.00 // byte
      if (size < num) { return size + 'B' }
      if (size < Math.pow(num, 2)) { return (size / num).toFixed(2) + 'K' } // kb
      if (size < Math.pow(num, 3)) { return (size / Math.pow(num, 2)).toFixed(2) + 'M' } // M
      if (size < Math.pow(num, 4)) { return (size / Math.pow(num, 3)).toFixed(2) + 'G' } // G
      return (size / Math.pow(num, 4)).toFixed(2) + 'T' // T
    },
    // 从arr移除eleArray的全部元素
    delEleArray(arr, eleArray) {
      if (arr.length <= 0 || eleArray.length <= 0) {
        return false
      } else {
        eleArray.forEach(item => {
          arr.map((val, i) => {
            if (val === item) {
              arr.splice(i, 1)
            }
          })
        })
      }
      return arr
    },
    handleAdd() {
      this.$emit('sources')
    },
    getMutiDictByComma(type, dictArr) {
      if (type === undefined || !(dictArr instanceof Array)) {
        return ''
      }

      var dictName = []
      var typeArr = type.split(',')
      typeArr.forEach(typeCode => {
        dictArr.forEach(item => {
          if (item.code === typeCode) {
            dictName.push(item.name)
          }
        })
      })

      return dictName.join(',')
    },
    getReadableDistance(meters) {
      if (typeof meters !== 'number') return
      const kilometers = Math.floor(meters / 1000)// 计算出公里数
      const remain = this.roundFun(meters - kilometers * 1000, 3) // 计算天数后剩余的米数
      let result = ''
      if (kilometers) result += (this.roundFun(meters / 1000, 3) + ' ' + 'km ')
      else result += (remain + ' ' + 'm ')
      return result
    },
    roundFun(value, n) {
      if (typeof value !== 'number') return 0
      return Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
    },
    getOperatorName(operator) {
      if (this.operatorsOptions == null) return ''
      for (const operators of this.operatorsOptions) {
        if (operators.code === operator) {
          return operators.name
        }
      }
    },
    formatDate(st) {
      return moment(st).format('YYYY-MM-DD HH:mm:ss')
    }

  }
}
