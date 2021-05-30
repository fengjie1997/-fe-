import store from '@/store/index.js'
import i18n from '@/lang'
import {
  updateTestPlan,
  testPlanUploadUrl,
  switchDeviceStatus,
  deleteTestPlanApi,
  exportTestPlanXml,
  fetchtActiveTestPlanList,
  fetchtExpiredTestPlanList,
  fetchtHistoryTestPlanList
} from '@/api/device/testPlanList.js'
import { getToken } from '@/utils/auth'
import { exportTxtToZip } from '@/vendor/Export2Txt'
// import { formatJson } from '@/utils/formatUtil'
import Pagination from '@/components/Pagination'
// import { TestPlanEditView } from './components/addTestPlan/addTestPlan'
import { mapMutations, mapState } from 'vuex'
import FleetCardTable from '@/components/FleetCardTable'
import TpDeviceList from './components/device'
import { copyTestPlanToDevice } from '@/api/device/testPlanList'

export default {
  components: { Pagination, FleetCardTable, TpDeviceList },
  data() {
    return {
      applyToOtherDevicesDialogVisible: false,
      filterFieldList: [
        { label: this.$t('common.type'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'nowTableHead', list: 'typeList', optionKey: 'id', width: '200px' },
        { label: this.$t('taskPlan.label.name'), placeholder: this.$t('common.inputTip'), type: 'input', value: 'name', width: '250px' }
      ],
      listTypeInfo: {
        typeList: [
          { key: 'active', label: this.$t('testPlan.activeList'), value: 'active' },
          { key: 'expired', label: this.$t('testPlan.expiredList'), value: 'expired' },
          { key: 'history', label: this.$t('testPlan.historyList'), value: 'history' }
        ]
      },
      authHeader: {
        Authorization: getToken()
      },
      uploadUrl: store.getters.apiUrl + testPlanUploadUrl + this.$route.params.deviceId,
      // 数据
      total: 0,
      listLoading: false,
      deviceId: 2189,
      filterDefaultData: {
        page: 1,
        limit: 20,
        name: undefined,
        field: 'id',
        isAsc: 1,
        nowTableHead: 'active'
      },
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        field: 'id',
        isAsc: 1,
        nowTableHead: 'active'
      },
      exportDialogVisible: false, // 导出 dialog
      configTextArea: '', // 导出配置
      list: [],
      drawer: false, // 测试
      formActName: this.$t('device.createTaskPlan'),
      nowTableHead: 'active',
      tableHead: {
        'history': [{
          property: 'name', label: this.$t('testPlan.name'), minWidth: 200
        }, {
          property: 'id', label: this.$t('testPlan.version'), width: 130
        }, {
          property: 'startDt', label: this.$t('testPlan.startDt'), time: true, width: 150
        }, {
          property: 'endDt', label: this.$t('testPlan.endDt'), time: true, width: 150
        }, {
          property: 'retrieveDt', label: this.$t('testPlan.retrieveDt'), time: true, width: 150
        }],
        'active': [{
          property: 'name', label: this.$t('testPlan.name'), minWidth: 200
        }, {
          property: 'lastVersion', label: this.$t('testPlan.version'), width: 130
        }, {
          property: 'startDt', label: this.$t('testPlan.startDt'), time: true, width: 150
        }, {
          property: 'endDt', label: this.$t('testPlan.endDt'), time: true, width: 150
        }, {
          property: 'updateDt', label: this.$t('testPlan.updateDt'), time: true, width: 150
        }, {
          property: 'createDt', label: this.$t('testPlan.createDt'), time: true, width: 150
        }, {
          property: 'creator', label: this.$t('reportList.creator'), minWidth: 150
        }],
        'expired': [{
          property: 'name', label: this.$t('testPlan.name'), minWidth: 200
        }, {
          property: 'lastVersion', label: this.$t('testPlan.version'), width: 130
        }, {
          property: 'startDt', label: this.$t('testPlan.startDt'), time: true, width: 130
        }, {
          property: 'endDt', label: this.$t('testPlan.endDt'), time: true, width: 130
        }, {
          property: 'createDt', label: this.$t('testPlan.createDt'), time: true, width: 130
        }, {
          property: 'creator', label: this.$t('reportList.creator'), minWidth: 150
        }]
      },
      selectedTaskPlan: undefined,
      selectedDevices: []
    }
  },
  mounted() {
    this.updateData(this.$route.params.deviceId)
  },
  computed: {
    ...mapState({
      testPlanId: state => state.deviceList.testPlanId
    })
  },
  created() {
    console.log(testPlanUploadUrl, store, store.getters.apiUrl, (store && store.getters.apiUrl))
    var basicRule = [
      {
        type: 'template',
        col: { span: 24, xs: 24 },
        template: '<el-divider><label>Base Info</label></el-divider>'
      },
      {
        type: 'hidden',
        field: 'isCheck',
        value: true
      },
      {
        type: 'input',
        field: 'taskName',
        title: i18n.t('taskPlan.label.taskName'),
        value: 'taskName',
        col: {
          span: 13,
          xs: 24
        },
        validate: [{
          required: true,
          message: '请填写任务名称',
          trigger: 'blur'
        }]
      },
      {
        type: 'switch',
        title: '循环执行',
        field: 'infinite',
        value: false,
        col: {
          span: 11,
          xs: 24
        },
        props: {
          'trueValue': true,
          'falseValue': false,
          slot: {
            open: this.$t('taskPlan.label.true'),
            close: this.$t('taskPlan.label.false')
          }
        }
      },
      {
        type: 'InputNumber',
        field: 'taskSequence',
        title: '执行顺序',
        value: 1,
        col: {
          span: 13,
          xs: 24
        },
        props: {
          min: 0
        }
      },
      {
        type: 'InputNumber',
        field: 'taskRepeatCount',
        title: i18n.t('taskPlan.commonTask.taskRepeatCount'),
        value: 1,
        col: {
          span: 11,
          xs: 24
        },
        props: {
          min: 0
        }
      },
      {
        type: 'InputNumber',
        field: 'interval',
        title: i18n.t('taskPlan.label.testInterval'),
        value: 15,
        col: {
          span: 13,
          xs: 24
        },
        props: {
          min: 0
        }
      },
      {
        type: 'InputNumber',
        field: 'failInterval',
        title: i18n.t('taskPlan.label.failInterval'),
        value: 15,
        col: {
          span: 11,
          xs: 24
        },
        props: {
          min: 0
        }
      },
      {
        type: 'InputNumber',
        field: 'waitTime',
        title: '等待时长(s)',
        value: 0,
        col: {
          span: 13,
          xs: 24
        },
        props: {
          min: 0
        }
      }
    ]
    localStorage.setItem('basicRule', JSON.stringify(basicRule))
  },
  methods: {
    ...mapMutations({
      SET_TEST_PLAN_ID: 'deviceList/SET_TEST_PLAN_ID'
    }),
    handleFilter(filterData) {
      this.listQuery = { ...this.listQuery, ...filterData }
      this.listQuery.page = 1
      this.getList()
    },
    async getList() {
      this.listLoading = true
      this.nowTableHead = this.listQuery.nowTableHead
      console.log(this.nowTableHead)
      // delete params.nowTableHead
      switch (this.nowTableHead) {
        case 'history':
          fetchtHistoryTestPlanList(this.deviceId, this.listQuery).then(res => {
            if (res.data.code === 1) {
              this.list = res.data.data.records
              this.total = parseInt(res.data.data.total)
            }
          }).finally(() => {
            this.listLoading = false
          })
          break
        case 'active':
          fetchtActiveTestPlanList(this.deviceId, this.listQuery).then(res => {
            if (res.data.code === 1) {
              this.list = res.data.data.records
              this.total = parseInt(res.data.data.total)
            }
          }).finally(() => {
            this.listLoading = false
          })
          break
        case 'expired':
          fetchtExpiredTestPlanList(this.deviceId, this.listQuery).then(res => {
            if (res.data.code === 1) {
              this.list = res.data.data.records
              this.total = parseInt(res.data.data.total)
            }
          }).finally(() => {
            this.listLoading = false
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
     * 导出XML
     */
    handleExportXml(row) {
      exportTestPlanXml(this.deviceId, row.id, this.nowTableHead === 'expired' ? 1 : 0).then(res => {
        if (res.data.code === 1) {
          this.configTextArea = res.data.data
          this.exportDialogVisible = true
        }
      })
    },
    handleExportZip() {
      exportTxtToZip(this.configTextArea, 'config', 'config')
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
       * 编辑测试计划
       */
    handleTestEdit(planId) {
      store.dispatch('setTestPlanId', planId)
      this.SET_TEST_PLAN_ID({ testPlanId: planId })
      this.$router.push({
        path: `/testPlan/conf/${this.$route.params.deviceName}/${this.$route.params.deviceId}/${planId}`
      })
    },
    /**
       * 新建测试计划
       * @param deviceId
       */
    handleTestCreate() {
      store.dispatch('setTestPlanId', null)
      console.log(this.$route.params)
      this.$router.push({
        path: `/testPlan/conf/${this.$route.params.deviceName}/${this.$route.params.deviceId}/-1`
      })
    },
    handleSwitch(bool, id) {
      switchDeviceStatus(this.$route.params.deviceId, id, bool).then(res => {
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
    /**
     * 更新设备测试计划
     */
    handleTestRefresh() {
      console.log(this.$route.params)
      updateTestPlan(this.$route.params.deviceId, this.$route.params.deviceType).then(res => {
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
    // upload error
    handleUploadError(err, file, fileList) {
      this.$notify({
        title: this.$t('common.error'),
        message: this.$t('common.actionFailed'),
        type: 'error',
        duration: 2000
      })
      console.log(err)
      console.log(file)
    },
    // upload success
    handleUploadSuccess(res) {
      if (res.code === 1) {
        this.updateData(this.$route.params.deviceId)
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success',
          duration: 2000
        })
      }
    },
    // 批量删除
    handleDelAll() {
      this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
        center: false
      }).then(() => {
        if (this.$refs.testPlan.selection.length > 0) {
          // console.log(this.$refs.testPlan.selection)
          var paramArr = []
          this.$refs.testPlan.selection.forEach(item => {
            paramArr.push(item.id)
          })
          console.log(paramArr)
          deleteTestPlanApi(this.deviceId, paramArr, this.nowTableHead).then(res => {
            if (res.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        } else {
          this.$message({
            message: this.$t('common.noSelect'),
            type: 'warning'
          })
        }
      })
    },
    handleApplyToDevices(row) {
      this.applyToOtherDevicesDialogVisible = true
      this.selectedTaskPlan = row
    },
    applyTaskPlanToDevices() {
      this.$confirm(this.$t('taskPlan.tip.applyTaskPlanToDevices'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'info'
      }).then(() => {
        const deviceId = this.$route.params.deviceId
        if (deviceId && this.selectedTaskPlan && this.selectedDevices.length > 0) {
          copyTestPlanToDevice(deviceId, { planId: this.selectedTaskPlan.id }, this.selectedDevices.map(item => item.id)).then(res => {
            if (res.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.updateSuccess'),
                type: 'success',
                duration: 2000
              })
              this.applyToOtherDevicesDialogVisible = false
              this.selectedTaskPlan = undefined
              this.selectedDevices = []
            }
          })
        }
      }).catch(() => {})
    },
    handleDeviceSelectionChange(selection) {
      this.selectedDevices = selection
    }
  }

}

