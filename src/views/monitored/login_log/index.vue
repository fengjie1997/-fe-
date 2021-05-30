<template>
  <div class="full-hw">
    <fleet-single-table
      :show-tool-bar="false"
      :filter-show-count="2"
      :filter-default-data="listData"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"
      @filter-handle="handleFilter"
    >
      <div slot="main-table" class="full-hw">
        <el-table
          ref="deviceLoginLogTable"
          v-loading="listLoading"
          v-col-width-limit
          :data="list"
          border
          highlight-current-row
          height="100%"
        >
          <template v-for="(item,index) in tableHead">
            <el-table-column v-if="item.property !== 'id'" :key="index" :prop="item.property" :label="item.label" :width="item.width" :min-width="item.minWidth" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="item.property === 'device_type'">{{ getTableDeviceType(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'group_id'">{{ getTableDeviceGroupId(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'deviceType'">{{ getTableDeviceType(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'groupId'">{{ getTableDeviceGroupId(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'logDatetime'">{{ getTableTime(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'extendCode'">{{ getTableExtendCode(scope.row[item.property]) }}</span>
                <span v-else>{{ scope.row[item.property] }}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div slot="footer-page">
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="getList()" />
      </div>
    </fleet-single-table>
  </div>

</template>

<script>
import { fetchLoginLogListByDevice, exportLoginLogList, fetchLoginLogList } from '../../../api/monitored/monitored'
import { getCacheDict } from '../../../utils/dictCache'
import { getTime, getTimeZone, getTimeStamp } from '../../../utils/timeZone'
import waves from '../../../directive/waves/waves'
import Pagination from '@/components/Pagination'
import { getDeviceType } from '../../../utils/MonitoredTable'
import FleetSingleTable from '@/components/FleetCardTable/single-table'
import { mapGetters } from 'vuex'
export default {
  name: 'LoginLog',
  components: { Pagination, FleetSingleTable },
  directives: { waves },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      filterFieldList: [
        { label: this.$t('common.deviceType'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'deviceTypes', list: 'deviceTypeOptions', optionKey: 'key', multiple: true, clearable: true, collapseTags: true },
        { label: this.$t('device.name'), placeholder: this.$t('common.inputTip'), type: 'input', value: 'deviceName' },
        { label: this.$t('common.time'), startPlaceholder: this.$t('common.startPlaceholder'), endPlaceholder: this.$t('common.endPlaceholder'), type: 'date', value: 'time', dateType: 'daterange', width: '250px', clearable: true, valueFormat: 'timestamp' },
        { label: this.$t('common.sort'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'isAsc', list: 'orderOptions', optionKey: 'key' },
        { label: this.$t('loginLog.select'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'actionSelect', list: 'actionSelectOptions', optionKey: 'key', multiple: false }
      ],
      listTypeInfo: {
        deviceTypeOptions: [],
        actionSelectOptions: [
          { label: this.$t('loginLog.device'), key: 1, value: 1 },
          { label: this.$t('loginLog.status'), key: 0, value: 0 }
        ],
        orderOptions: [
          { label: this.$t('common.asc'), key: 1, value: 1 },
          { label: this.$t('common.desc'), key: 0, value: 0 }
        ]
      },
      actionSelect: 1,
      isAscOptions: [{ label: this.$t('common.asc'), key: 1 }, { label: this.$t('common.desc'), key: 0 }],
      cutId: '',
      groupIds: [],
      listLoading: false,
      deviceIdsOptions: [],
      groupIdsOptions: [],
      fieldOptions: [{ label: this.$t('device.deviceID'), value: 'id' }],
      pickerOptions: {
        shortcuts: [{
          text: this.$t('loginLog.week'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('loginLog.month'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('loginLog.months'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      time: [],
      defaultTime: getTimeZone(this.$store.getters.timezone),
      listData: {
        actionSelect: 0,
        deviceIds: [],
        deviceTypes: [],
        deviceName: '',
        startTime: 0,
        endTime: getTimeStamp(new Date()),
        isAsc: 1
      },
      listQuery: {
        limit: 20,
        page: 1,
        field: 'log_datetime',
        isAsc: 1
      },
      list: [],
      total: 0,
      tableHead: [],
      deviceTableHead: [{
        property: 'device_name', label: this.$t('device.name'), minWidth: 250
      }, {
        property: 'device_type', label: this.$t('device.deviceType'), width: 200, minWidth: 200
      }, {
        property: 'group_id', label: this.$t('device.deviceGroup'), minWidth: 200
      }, {
        property: 'loginCount', label: this.$t('loginLog.times'), width: 200, minWidth: 200
      }],
      detailsTableHead: [{
        property: 'deviceName', label: this.$t('device.name')
      }, {
        property: 'deviceType', label: this.$t('device.deviceType')
      }, {
        property: 'groupId', label: this.$t('device.deviceGroup')
      }, {
        property: 'extendCode', label: this.$t('loginLog.state')
      }, {
        property: 'logDatetime', label: this.$t('loginLog.time')
      }]
    }
  },
  computed: {
    ...mapGetters({
      flattenGroups: 'flattenGroups'
    })
  },
  created() {
    this.getList()
    this.getFormOptions()
  },
  methods: {
    async getList(filterData) {
      const filterDataCopy = Object.assign({}, filterData || this.tempParams)
      const params = this.tempParams = Object.assign({}, this.listData, filterDataCopy)
      if (!filterDataCopy || !filterDataCopy.time || filterDataCopy.time.length === 0) {
        params.endTime = getTimeStamp(new Date())
        params.startTime = 0
      } else {
        params.endTime = filterDataCopy.time[1]
        params.startTime = filterDataCopy.time[0]
      }
      if (filterDataCopy && filterDataCopy.isAsc !== undefined) {
        this.listQuery.isAsc = filterDataCopy.isAsc
      }
      params.groupIds = this.model.groupIds
      this.listLoading = true
      if (params.actionSelect === 1) {
        this.tableHead = this.deviceTableHead
        this.listQuery.field = 'device_id'
        fetchLoginLogListByDevice(this.listQuery, params).then(response => {
          const data = response.data
          if (data.code === 1) {
            this.list = data.data.records
            this.total = data.data.total
            this.$refs.deviceLoginLogTable.doLayout()
          }
        }).finally(() => {
          this.listLoading = false
        })
      } else {
        this.tableHead = this.detailsTableHead
        this.listQuery.field = 'log_datetime'
        fetchLoginLogList(this.listQuery, params).then(response => {
          const data = response.data
          if (data.code === 1) {
            this.list = data.data.records
            this.total = data.data.total
            this.$refs.deviceLoginLogTable.doLayout()
          }
        }).finally(() => {
          this.listLoading = false
        })
      }
    },
    // 所属分组转换
    getTableDeviceGroupId(groupId) {
      const group = this.flattenGroups[groupId]
      if (!group) return groupId
      return group.name
    },
    getFormOptions() {
      // 设备类型
      const deviceTypes = getCacheDict('deviceType')
      for (let i = 0; i < deviceTypes.length; i++) {
        this.listTypeInfo.deviceTypeOptions.push({
          label: deviceTypes[i].name,
          key: deviceTypes[i].code,
          value: deviceTypes[i].code
        })
      }
    },
    getTableDeviceType(data) {
      if (isNaN(data)) {
        return getDeviceType(data)
      } else {
        return getDeviceType(data.toString())
      }
    },
    handleClearSearchForm() {
      this.listData.name = ''
      this.listData.statuses = []
      this.listData.types = []
      this.time = []
    },
    handleFilter(filterData) {
      this.listQuery.page = 1
      this.getList(filterData)
    },
    handleExport() {
      exportLoginLogList('x.csv', this.listData)
    },
    getTableTime(time) {
      return getTime(time, this.$store.getters.timezone)
    },
    getTimes() {
      if (this.time !== null) {
        if (this.time.length > 1) {
          this.listData.startTime = this.time[0]
          this.listData.endTime = this.time[1]
        }
      }
    },
    getTableExtendCode(data) {
      if (!data) {
        return this.$t('loginLog.connect')
      } else {
        return this.$t('loginLog.disconnect')
      }
    }
  }
}
</script>

<style scoped>
</style>
