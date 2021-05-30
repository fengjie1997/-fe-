import {
  deleteTestPlanApi,
  exportTestPlanConfig,
  fetchtActiveTestPlanList,
  fetchtExpiredTestPlanList,
  fetchtHistoryTestPlanList
} from '@/api/device/testPlanList.js'

import { exportTxtToZip } from '@/vendor/Export2Txt'
// import { formatJson } from '@/utils/formatUtil'
import { TestPlanEditView } from '@/components/TestPlanTemplate'

import Pagination from '@/components/Pagination'

export default {
  components: { Pagination, TestPlanEditView },
  data() {
    return {
      // 数据
      total: 0,
      listLoading: true,
      deviceId: 2189,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        field: 'id',
        isAsc: 1
      },
      exportDialogVisible: false, // 导出 dialog
      configTextArea: '', // 导出配置
      list: [],
      drawer: false, // 测试
      nowTableHead: 'history',
      tableHead: {
        'history': [{
          property: 'name', label: this.$t('testPlan.name')
        }, {
          property: 'version', label: this.$t('testPlan.version')
        }, {
          property: 'startDt', label: this.$t('testPlan.startDt'), time: true
        }, {
          property: 'endDt', label: this.$t('testPlan.endDt'), time: true
        }, {
          property: 'retrieveDt', label: this.$t('testPlan.retrieveDt'), time: true
        }],
        'active': [{
          property: 'name', label: this.$t('testPlan.name')
        }, {
          property: 'version', label: this.$t('testPlan.version')
        }, {
          property: 'startDt', label: this.$t('testPlan.startDt'), time: true
        }, {
          property: 'endDt', label: this.$t('testPlan.endDt'), time: true
        }, {
          property: 'createDt', label: this.$t('testPlan.createDt'), time: true
        }, {
          property: 'updateDt', label: this.$t('testPlan.updateDt'), time: true
        }, {
          property: 'enable', label: this.$t('testPlan.enable'), switch: true
        }],
        'expired': [{
          property: 'name', label: this.$t('testPlan.name')
        }, {
          property: 'version', label: this.$t('testPlan.version')
        }, {
          property: 'startDt', label: this.$t('testPlan.startDt'), time: true
        }, {
          property: 'endDt', label: this.$t('testPlan.endDt'), time: true
        }, {
          property: 'createDt', label: this.$t('testPlan.createDt'), time: true
        }, {
          property: 'updateDt', label: this.$t('testPlan.updateDt'), time: true
        }]
      }
    }
  },
  created() {
  },
  methods: {
    async getList() {
      this.listLoading = true
      switch (this.nowTableHead) {
        case 'history':
          fetchtHistoryTestPlanList(this.deviceId, this.listQuery).then(res => {
            if (res.data.code === 1) {
              this.list = res.data.data.records
              this.total = res.data.data.total
              this.listLoading = false
            }
          })
          break
        case 'active':
          fetchtActiveTestPlanList(this.deviceId, this.listQuery).then(res => {
            if (res.data.code === 1) {
              this.list = res.data.data.records
              this.total = res.data.data.total
              this.listLoading = false
            }
          })
          break
        case 'expired':
          fetchtExpiredTestPlanList(this.deviceId, this.listQuery).then(res => {
            if (res.data.code === 1) {
              this.list = res.data.data.records
              this.total = res.data.data.total
              this.listLoading = false
            }
          })
          break
        default:
          break
      }
    },
    /**
     * 删除测试计划List
     */
    handleDelete(row) {
      this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
        center: false
      }).then(() => {
        if (row.id !== '') {
          deleteTestPlanApi(this.deviceId, [row.id], this.nowTableHead).then(response => {
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
        }
      })
    },
    /**
     * 导出配置
     */
    handleExportConfig(row) {
      exportTestPlanConfig(this.deviceId, row.id).then(res => {
        if (res.data.code === 1) {
          this.configTextArea = res.data.data
          this.exportDialogVisible = true
        }
      })
    },
    handleExportZip() {
      exportTxtToZip(this.configTextArea, 'plan.xml', 'plan')
    },
    /**
     * 切换List
     */
    handleSwitchList() {
      this.list.splice(0)
      this.total = 0
      this.getList()
    },
    updateData(deviceId) {
      this.listQuery.name = ''
      this.deviceId = deviceId
      this.handleSwitchList()
    },
    /**
     * 测试
     */
    handleTest() {
      this.drawer = true
    }
  }
}
