import { fetchList, deleteSources, batchSetTag, reDecode, exportSourcefiles } from '@/api/data/sourcefile'
import { downloadByFrame } from '@/utils/downloadByFrame'
import { getCacheDict } from '@/utils/dictCache.js'
import splitPane from 'vue-splitpane'
import Pagination from '@/components/Pagination'
import { fetchGroupList } from '@/api/monitored/monitored'
import { getDevicesByDeviceType } from '@/api/device/device.js'
import { getTime, getTimeZone } from '@/utils/timeZone'
import { checkNodeEquals } from '@/utils'
import FleetCardTable from '@/components/FleetCardTable'
export default {
  name: 'TableSourceFile',
  components: { splitPane, Pagination, FleetCardTable },
  data() {
    return {
      filterFieldList: [
        { label: this.$t('common.type'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'timeType', list: 'timeTypeOptions', optionKey: 'key', multiple: false, clearable: false },
        { label: this.$t('common.time'), startPlaceholder: this.$t('common.startPlaceholder'), endPlaceholder: this.$t('common.endPlaceholder'), type: 'date', value: 'time', dateType: 'daterange', width: '300px', clearable: true, valueFormat: 'timestamp' },
        { label: this.$t('sourcefile.filename'), placeholder: this.$t('common.inputTip'), type: 'input', value: 'search' },
        { label: this.$t('common.state'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'testDataStatus', list: 'testDataStatusOptions', optionKey: 'key', multiple: true, clearable: true, collapseTags: true },
        { label: this.$t('common.testType'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'testTypeId', list: 'testTypeOptions', optionKey: 'key', multiple: true, clearable: true, collapseTags: true },
        { label: this.$t('common.deviceType'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'deviceTypeId', list: 'deviceTypeOptions', optionKey: 'key', multiple: true, clearable: true, collapseTags: true },
        { label: this.$t('common.device'), placeholder: this.$t('common.inputTip'), type: 'input', value: 'deviceName' },
        { label: this.$t('baseData.attribute'), placeholder: this.$t('common.inputTip'), type: 'input', value: 'tagSearch' }
      ],
      listTypeInfo: {
        testTypeOptions: [],
        deviceTypeOptions: [],
        testDataStatusOptions: [],
        timeTypeOptions: [
          { key: 'upload', label: this.$t('baseData.uploadTime'), value: 'upload' },
          { key: 'test', label: this.$t('baseData.testTime'), value: 'test' }
        ]
      },
      bool: false,
      tableKey: 0,
      list: null,
      total: 0,
      ids: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        field: 'createDate',
        isAsc: 0
      },
      listParam: {
        deviceName: '',
        search: '',
        testTypeId: [],
        deviceTypeId: [],
        testDataStatus: [],
        groupId: [],
        timeType: 'upload'
      },
      fieldOptions: [{ label: 'ID', key: 'id' }],
      deviceOptions: [],
      testDataValidateTypesOptions: [],
      isAscOptions: [{ label: this.$t('common.asc'), key: 1 }, { label: this.$t('common.desc'), key: 0 }],
      temp: {
        userInfoId: '',
        account: '',
        email: '',
        phone: '',
        name: '',
        company: ''
      },
      title: '',
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.create')
      },
      downloadLoading: false,
      multipleSelection: [],
      groupIds: [],
      groupIdName: '',
      deviceGroupList: [],
      deviceProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      dialogVisible: false,
      tagModel: {
        tag1: '',
        tag2: '',
        tag3: ''
      },
      // 数据
      defaultTime: getTimeZone(this.$store.getters.timezone),
      /**
       * 大小
       */
      spanLeft: 4,
      spanRight: 20
    }
  },
  created() {
    this.getList()
    this.getGroupList()
    this.getDeviceTypes()
    this.getTestDataStatus()
    this.getTestTypes()
    this.handleDeviceFilter()
    // this.getTestDataValidateTypes()
  },
  methods: {
    handleRefresh() {
      this.listQuery.page = 1
      this.listParam.groupId = []
      if (this.tempParams) this.tempParams.groupId = []
      this.getGroupList()
      this.getList()
    },
    handleFilter(filterData) {
      this.listQuery.page = 1
      // 移除旧的时间参数
      this._removeTimeParam(filterData)
      this.getList(filterData)
    },
    getDeviceName() {
      this.bool = true
    },
    querySearch(queryString, cb) {
      const restaurants = []
      this.deviceOptions.forEach(item => {
        restaurants.push({
          'value': item.label,
          'label': item.key
        })
      })
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    deviceNameChange() {
      this.bool = true
    },
    async getList(filterData) {
      if (this.bool) {
        this.deviceOptions.forEach(item => {
          if (this.listParam.deviceName === item.label) {
            this.listParam.deviceId = item.key
            this.listParam.deviceName = undefined
          }
        })
      }
      if (!this.listParam.deviceName) {
        this.listParam.deviceId = undefined
      }
      this.listLoading = true

      let filterDataCopy
      if (filterData) {
        filterDataCopy = { ...filterData }
        // 组装时间过滤条件
        const timeType = filterDataCopy.timeType
        const time = filterDataCopy.time
        if (timeType) {
          this._buildTimeCondition(timeType, time)
        }
        delete filterDataCopy.timeType
        delete filterDataCopy.time
      } else {
        if (this.tempParams) {
          delete this.tempParams.limit
          delete this.tempParams.page
        }
        filterDataCopy = this.tempParams
      }
      if (filterDataCopy) delete filterDataCopy.groupId
      const params = Object.assign({}, this.listParam, filterDataCopy)
      this.tempParams = params
      fetchList(this.listQuery, params).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = data.data.total
        }
      }).finally(() => {
        this.listLoading = false
      })
    },
    redecode(type) {
      // eslint-disable-next-line no-undef
      reDecode(BigInt(type.sourceId)).then(res => {
        if (res.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.actionSuccess'),
            type: 'success'
          })
        }
        this.getList()
      })
    },
    handleDelete() {
      const vals = this.multipleSelection
      if (vals.length === 0) {
        this.$alert(this.$t('common.mustSelectData'), this.$t('common.error'), {
          confirmButtonText: this.$t('common.confirm'),
          type: 'error'
        })
        return
      }
      this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'info'
      }).then(() => {
        const ids = []
        vals.forEach(it => {
          ids.push(it.sourceId)
        })
        this.listLoading = true
        deleteSources(ids).then(r => {
          this.listLoading = false
          this.getList()
          this.$message({
            type: 'success',
            message: this.$t('common.deleteSuccess')
          })
        }).catch(() => {
          this.listLoading = false
        })
      })
    },
    handleBlukdownload() {
      const vals = this.multipleSelection
      if (vals.length === 0) {
        this.$alert(this.$t('common.mustSelectData'), this.$t('common.error'), {
          confirmButtonText: this.$t('common.confirm'),
          type: 'error'
        })
        return
      }
      const ids = []
      vals.forEach(it => {
        ids.push('ids=' + it.sourceId)
      })
      downloadByFrame('/sourcefile/download_pack?' + ids.join('&'))
    },
    filterNode(value, data) {
      if (!value) return true
      return checkNodeEquals(data, value)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDownload(row) {
      downloadByFrame('/sourcefile/download/' + row.sourceId)
    },
    /**
     * 导出测试数据文件列表
     */
    handleExportSourcefile() {
      exportSourcefiles(this.listQuery, this.tempParams)
    },
    handleDeviceFilter() {
      if (this.listQuery.deviceTypeId) {
        getDevicesByDeviceType(this.listQuery.deviceTypeId).then(res => {
          if (res.data.code === 1) {
            const data = res.data.data
            for (let i = 0; i < data.length; i++) {
              this.deviceOptions.push({
                label: data[i].name,
                key: data[i].id
              })
            }
          }
        })
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    getGroupList() {
      fetchGroupList().then(res => {
        if (res.data.code === 1) {
          this.deviceGroupList = res.data.data
        }
      })
    },
    getDeviceTypes() {
      const data = getCacheDict('deviceType')
      for (let i = 0; i < data.length; i++) {
        this.listTypeInfo.deviceTypeOptions.push({
          label: data[i].name,
          key: data[i].code,
          value: data[i].code
        })
      }
    },
    getTestTypes() {
      const data = getCacheDict('testType')
      for (let i = 0; i < data.length; i++) {
        this.listTypeInfo.testTypeOptions.push({
          label: data[i].name,
          key: data[i].code,
          value: data[i].code
        })
      }
    },
    getTestDataStatus() {
      const data = getCacheDict('testDataStatus')
      for (let i = 0; i < data.length; i++) {
        this.listTypeInfo.testDataStatusOptions.push({
          label: data[i].name,
          key: data[i].code,
          value: data[i].code
        })
      }
    },
    getTableDeviceGroupId(id) {
      let name = ''
      for (const i in this.groupIds) {
        if (id === this.groupIds[i].id) {
          name = this.groupIds[i].name
        }
      }
      return name
    },
    getTimes(time) {
      return getTime(time, this.$store.getters.timezone)
    },
    testDataStatusFormat(status) {
      const data = getCacheDict('testDataStatus')
      const mapped = data.find(item => item.code === status)
      if (!mapped) return status
      return mapped.name
    },
    /**
     * @private
     * @param type 时间类型， upload = 上传时间， test = 测试时间
     * @param time 时间段
     */
    _buildTimeCondition(type, time) {
      if (type === 'upload') {
        if (time) {
          this.listParam.uploadStartTime = time[0]
          this.listParam.uploadEndTime = time[1]
        } else {
          this.listParam.uploadStartTime = ''
          this.listParam.uploadEndTime = ''
        }
      } else {
        if (time) {
          this.listParam.testStartTime = time[0]
          this.listParam.testEndTime = time[1]
        } else {
          this.listParam.testStartTime = ''
          this.listParam.testEndTime = ''
        }
      }
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // const tempData = Object.assign({}, this.temp)
        }
      })
    },
    checkGroupCh(id) {
      fetchGroupList().then(res => {
        const data = res.data
        if (data.code === 1) {
          for (let i = 0; i < data.data.length; i++) {
            if (id === data.data[i].id) {
              this.ids = []
              for (let j = 0; j < data.data[i].children.length; j++) {
                this.ids[j] = data.data[i].children[j].id
              }
            }
          }
        }
      })
    },
    handleSelectGroupId(data) {
      const selectGroupIds = []
      // 收集分组ID
      const collectGroups = (data) => {
        selectGroupIds.push(data.id)
        if (data.children) {
          for (const item of data.children) {
            collectGroups(item)
          }
        }
      }
      collectGroups(data)
      this.listParam.groupId = selectGroupIds
      this.getList()
    },
    setTags() {
      const vals = this.multipleSelection
      if (vals.length === 0) {
        this.$alert(this.$t('common.mustSelectData'), this.$t('common.error'), {
          confirmButtonText: this.$t('common.confirm'),
          type: 'error'
        })
        return
      }
      this.tagModel.tag1 = vals[0].tag1
      this.tagModel.tag2 = vals[0].tag2
      this.tagModel.tag3 = vals[0].tag3
      this.width = '40%'
      this.title = this.$t('baseData.setFile')
      this.dialogVisible = true
    },
    saveTags() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const vals = this.multipleSelection
          if (vals.length === 0) {
            this.$alert(this.$t('common.mustSelectData'), this.$t('common.err'), {
              confirmButtonText: this.$t('common.confirm'),
              type: 'error'
            })
            return
          }
          let ids = ''
          vals.forEach(it => {
            ids = ids + it.sourceId + ','
          })
          // alert(ids)
          batchSetTag(ids, this.tagModel.tag1, this.tagModel.tag2, this.tagModel.tag3).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.createSuccess'),
                type: 'success',
                duration: 2000
              })
              this.getList()
              this.dialogVisible = false
            }
          })
        } else {
          this.$alert(this.$t('common.submitErr'), this.$t('common.tip'), {
            confirmButtonText: this.$t('common.confirm'),
            callback: action => {
            }
          })
        }
      })
    },
    cancelForm() {
      this.dialogVisible = false
    },
    /**
     * 大小
     */
    handleSwitchSpan() {
      if (this.spanLeft === 4) {
        this.spanLeft = 1
        this.spanRight = 23
        this.$store.dispatch('closeSideBar', {
          withoutAnimation: false
        })
      } else {
        this.spanLeft = 4
        this.spanRight = 20
      }
    },
    /**
     * 移除请求参数中的 时间参数
     * @param [filterData] {Object} 查询参数
     * @private
     */
    _removeTimeParam(filterData) {
      delete this.listParam.timeType
      delete this.listParam.uploadStartTime
      delete this.listParam.uploadEndTime
      delete this.listParam.testStartTime
      delete this.listParam.testEndTime
      if (filterData) {
        delete filterData.uploadStartTime
        delete filterData.uploadEndTime
        delete filterData.testStartTime
        delete filterData.testEndTime
      }
    }
  }
}
