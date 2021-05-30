import { fetchList } from '@/api/report/file' // reportTask
import { DataSourceView, DataFileView, DataFilterView, GroupFilterView } from '../../index'

export default {
  components: {
    DataSourceView,
    DataFileView,
    DataFilterView,
    GroupFilterView
  },
  props: {
    scene: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      areaList: [],
      sourceData: [],
      display: false,
      // report form
      reportForm: {
        sources: {},
        task: {
          data: [],
          id: 0,
          priority: 0,
          regionFilter: [],
          timeFilter: [],
          type: 0
        }
      },
      scenes: [],
      sqlReport: {},
      // send to listView
      sourceGroupId: [],
      activeNames: ['1', '2'],
      rangeDatetime: [],
      ruleForm: {
        endDateTime: null,
        startDateTime: null,
        city: null
      },
      rules: {
        city: [
          { required: true, message: this.$t('report.selectArea'), trigger: 'change' }
        ],
        startDateTime: [
          { required: true, message: this.$t('report.selectTime'), trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    rangeDatetime(newRange) {
      this.ruleForm.startDateTime = newRange[0]
      this.ruleForm.endDateTime = newRange[1]
      console.log(newRange)
    }
  },
  // #1E9B91
  created() {
    this.getAreaList()
  },
  computed: {
    // 场景数据源
    sourcesForm() {
      return this.sourceData
    },
    sceneForm() {
      return this.$refs.groupFilterView.groupFilter
    },
    dataForm() {
      var modelData = {
        data: this.$refs.fileView.selectedTableId,
        groupFilter: this.$refs.groupFilterView.groupFilter,
        timeFilterList: this.$refs.filterView.timeFilterList,
        regionFilterList: this.$refs.filterView.regionFilterList
      }
      if (this.scene.dataSourceType === 'SJDL_DEFAULT_DATABASE') {
        return this.ruleForm
      } else {
        return JSON.parse(JSON.stringify(modelData))
      }
    },
    filterTimeForm() {
      return this.$refs.filterView.timeFilterList
    },
    filterRegionForm() {
      return this.$refs.filterView.regionFilterList
    }
  },
  methods: {
    closeAllTags() {
      this.activeNames = []
    },
    getAreaList() {
      this.areaList = this.$store.getters.regionTree
    },
    // 处理数据源
    handleSourceList() {
      const list = JSON.parse(JSON.stringify(this.$refs.datasourceView.list))
      const sourceListVos = []
      if (list.length > 0) {
        list.forEach(item => {
          // 有效数据
          if (item.groupIds.length > 0) {
            const row = Object.assign({}, item)
            const groups = new Set()
            row.groupIds.forEach(el => {
              el.forEach(elI => {
                groups.add(elI)
              })
            })
            if (row.testTime instanceof Array && row.testTime.length > 1) {
              row['startTime'] = row.testTime[0]
              row['endTime'] = row.testTime[1]
            }

            row['groupIds'] = groups
            sourceListVos.push(row)
            console.log(sourceListVos)
            this.sourceData = Object.assign([], sourceListVos) // 数据源
            // 获取列表数据
            if (sourceListVos.length > 0) {
              fetchList(sourceListVos).then(res => {
                this.sourceGroupId = res.data.data
                this.$refs.fileView.toPage(1)
              })
              // this.$refs.fileView.getList(sourceListVos)
            }
          } else {
            this.$notify.error({
              title: this.$t('common.error'),
              message: this.$t('common.nodata'),
              duration: 2000
            })
          }
        })
      } else {
        this.$notify.warning({
          title: this.$t('common.error'),
          message: this.$t('report.noDataSource'),
          duration: 2000
        })
      }
    }

  }
}
