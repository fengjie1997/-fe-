/* eslint-disable no-unreachable */
import { fetchList, deleteReportTask } from '@/api/report/list'
import { downloadByFrame } from '@/utils/downloadByFrame'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import FleetSingleTable from '@/components/FleetCardTable/single-table'
export default {
  name: 'TablereportList',
  components: { Pagination, FleetSingleTable },
  directives: { waves },
  props: {
    typeTree: {
      type: Array,
      default: []
    }
  },
  data() {
    return {

      filterFieldList: [
        { label: this.$t('reportList.reportName'), type: 'input', value: 'name', width: '180px' },
        { label: this.$t('reportList.creator'), type: 'input', value: 'creator', width: '100px' }
      ],
      tableKey: 0,
      list: [],
      total: 0,
      typeSelect: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        creator: undefined,
        field: 'id',
        isAsc: 0
      },
      defaultQueryData: {
        page: 1,
        limit: 20,
        name: '',
        creator: '',
        field: 'id',
        isAsc: 0
      },
      defineReportTypeList: {},
      fieldOptions: [{ label: 'ID', key: 'id' }],
      isAscOptions: [{ label: this.$t('common.asc'), key: 1 }, { label: this.$t('common.desc'), key: 0 }],
      reportProps: {
        children: 'children',
        label: 'name',
        value: 'id',
        expandTrigger: 'hover'
      },
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },
  created() {
    this.foreachTree(this.typeTree)
    this.getList()
  },
  watch: {
    typeTree() {
      this.defineReportTypeList = {}
      this.foreachTree(this.typeTree)
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    /** 搜索 */
    handleFilter(row) {
      this.listQuery = { ...this.listQuery, ...row }
      this.getList()
    },
    // 递归实现
    // @nodes   原始Json数据
    // @path    供递归使用
    foreachTree(nodes, path) {
      if (path === undefined) {
        path = []
      }
      for (var i = 0; i < nodes.length; i++) {
        var tmpPath = path.concat()
        tmpPath.push(nodes[i].id)
        if (nodes[i].type !== undefined) {
          this.defineReportTypeList[nodes[i].type] = (this.language === 'zh' || this.language === 'tw' ? nodes[i].nameCh : nodes[i].nameEh)
        }
        if (nodes[i].children) {
          this.foreachTree(nodes[i].children, tmpPath)
        }
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data.records
        this.total = response.data.data.total
        // 数据读取完毕
        this.listLoading = false
      })
    },
    getQueryList(typeTreeId, type) {
      this.typeSelect = typeTreeId
      this.listQuery.type = type
      this.getList()
    },
    handleRefresh() {
      this.getList()
    },
    handleDelete(row) {
      if (row.id !== '') {
        this.$confirm(this.$t('report.tip.deleteReport'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          deleteReportTask(row.id).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        }).catch(() => {})
      }
    },
    /**
     *
     * 下载报表文件
     */
    handleDownloadFile(id) {
      downloadByFrame('/reportTask/download/report/' + id)
    },
    handleDownload() {
      this.listLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [this.$t('reportList.id'), this.$t('reportList.name'), this.$t('reportList.defineReportType'), this.$t('reportList.createDt'), this.$t('reportList.creator'), this.$t('reportList.autoReportTaskId'), this.$t('reportList.status')]
        const filterVal = ['id', 'name', 'defineReportType', 'createDt', 'creator', 'autoReportTaskId', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-reportList'
        })
        this.listLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        // 此处是时间格式化
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    handleStatus(row) {
      switch (row.status) {
        case 0:
          return this.$t('common.fail')
        case 1:
          return this.$t('common.wait')
        case 2:
          return this.$t('report.pushQueue')
        case 3:
          return this.$t('report.start')
        case 4:
          return this.$t('common.success')
        default:
          return 'null'
      }
    }

  }
}
