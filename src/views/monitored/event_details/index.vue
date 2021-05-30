<template>
  <div class="full-hw">
    <fleet-single-table
      :filter-show-count="2"
      :filter-default-data="listQuery"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"
      @filter-handle="handleFilter"
    >
      <div slot="tool-bar">
        <el-tooltip v-if="refresh" :content="$t('common.stopRefresh')">
          <el-button icon="el-icon-loading" type="primary" @click="handleStopRefresh" />
        </el-tooltip>
        <el-tooltip v-if="!refresh" :content="$t('common.autoRefresh')">
          <el-button icon="el-icon-d-arrow-right" type="primary" @click="handleRefresh" />
        </el-tooltip>
      </div>
      <div slot="main-table" class="full-hw">
        <el-table
          ref="multipleTable"
          v-col-width-limit
          v-loading="listLoading"
          :data="list"
          style="width: 100%;"
          border
          highlight-current-row
          height="100%"
        >
          <template v-for="(item,index) in tableHead">
            <el-table-column v-if="item.property !== 'id'" :key="index" :prop="item.property" :label="item.label" :width="item.width" :min-width="item.minWidth" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- 时间 -->
                <span v-if="item.property === 'groupId'">{{ getTableDeviceGroupId(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'deviceType'">{{ $t('eventDetails.time') }}</span>
                <span v-else-if="item.property === 'eventDatetime'">{{ getTableTime(scope.row[item.property]) }}</span>
                <span v-else-if="item.time && scope.row[item.property] !== undefined">{{ getTime(scope.row[item.property]) }}</span>
                <!-- 按钮 -->
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
import { fetchEventDetailsList } from '../../../api/monitored/monitored'
import { getTimeZone, getTime, getTimeStamp } from '../../../utils/timeZone'
// import { getCacheDict } from '../../../utils/dictCache'
import waves from '../../../directive/waves/waves'
import Pagination from '@/components/Pagination'
import FleetSingleTable from '@/components/FleetCardTable/single-table'
import { mapGetters } from 'vuex'
export default {
  name: 'EventDetails',
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
      refresh: false,
      filterFieldList: [
        { label: this.$t('device.name'), placeholder: this.$t('common.inputTip'), type: 'input', value: 'deviceName' },
        { label: this.$t('device.portNum'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'ports', list: 'portOptions', optionKey: 'key', multiple: true, clearable: true, collapseTags: true },
        { label: this.$t('eventDetails.eventTime'), startPlaceholder: this.$t('common.startPlaceholder'), endPlaceholder: this.$t('common.endPlaceholder'), type: 'date', value: 'time', dateType: 'daterange', width: '250px', clearable: true, valueFormat: 'timestamp' },
        { label: this.$t('eventDetails.eventCode'), placeholder: this.$t('eventDetails.eventCodePlaceholder'), type: 'input', value: 'codes' },
        { label: this.$t('eventDetails.name'), placeholder: this.$t('common.inputTip'), type: 'input', value: 'content' },
        { label: this.$t('common.sort'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'isAsc', list: 'orderOptions', optionKey: 'key' }
      ],
      listTypeInfo: {
        portOptions: [],
        orderOptions: [
          { label: this.$t('common.asc'), key: 0, value: 0 },
          { label: this.$t('common.desc'), key: 1, value: 1 }
        ]
      },
      defaultTime: getTimeZone(this.$store.getters.timezone),
      listLoading: false,
      groupName: '',
      alarmLevelsOptions: [],
      deviceTypesOptions: [],
      deviceIdsOptions: [],
      groupIdsOptions: [],
      deviceStatusOptions: [],
      fieldOptions: [{ label: this.$t('deviceLog.groupId'), key: 'id' }],
      listQuery: {
        limit: 20,
        page: 1,
        field: 'event_datetime',
        isAsc: 1,
        deviceIds: [],
        ports: [],
        content: '',
        endTime: getTimeStamp(new Date()),
        startTime: 0
      },
      list: [],
      total: 0,
      tableHead: [{
        property: 'deviceName', label: this.$t('device.deviceName'), minWidth: 250
      }, {
        property: 'groupId', label: this.$t('device.deviceGroup'), width: 120, minWidth: 120
      }, {
        property: 'devicePort', label: this.$t('device.portNum'), width: 100, minWidth: 100
      }, {
        property: 'deviceType', label: this.$t('device.deviceType'), width: 120, minWidth: 120
      }, {
        property: 'eventCode', label: this.$t('eventDetails.eventCode'), width: 120, minWidth: 120
      }, {
        property: 'eventContent', label: this.$t('eventDetails.name'), minWidth: 300
      }, {
        property: 'eventDatetime', label: this.$t('eventDetails.eventTime'), width: 180, minWidth: 180
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
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    getFormOptions() {
      // 设备端口
      for (let i = 0; i < 13; i++) {
        this.listTypeInfo.portOptions.push({
          label: i + 1,
          key: i + 1,
          value: i + 1
        })
      }
    },
    async getList(filterData) {
      const filterDataCopy = Object.assign({}, filterData || this.tempParams)
      delete filterDataCopy.page
      delete filterDataCopy.limit
      const params = this.tempParams = Object.assign({}, this.listQuery, filterDataCopy)
      if (!filterDataCopy || !filterDataCopy.time || filterDataCopy.time.length === 0) {
        params.endTime = getTimeStamp(new Date())
        params.startTime = 0
      } else {
        params.endTime = filterDataCopy.time[1]
        params.startTime = filterDataCopy.time[0]
      }
      if (filterDataCopy && filterDataCopy.codes) {
        if (Array.isArray(filterDataCopy.codes)) {
          params.codes = filterDataCopy.codes
        } else {
          params.codes = filterDataCopy.codes.split(',').map(item => Number(item))
        }
      } else {
        params.codes = []
      }
      // 加入分组参数
      params.groupIds = this.model.groupIds
      if (!this.refresh) {
        this.listLoading = true
      }
      fetchEventDetailsList(params).then(res => {
        const data = res.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = data.data.total
        }
      }).finally(() => {
        this.listLoading = false
      })
    },
    getTableTime(time) {
      return getTime(time, this.$store.getters.timezone)
    },
    getTimes() {
      if (this.time !== null) {
        if (this.time.length > 1) {
          this.listQuery.startTime = this.time[0]
          this.listQuery.endTime = this.time[1]
        }
      }
    },
    handleFilter(filterData) {
      this.listQuery.page = 1
      this.getList(filterData)
    },
    handleSelectionChange() {

    },
    // 所属分组转换
    getTableDeviceGroupId(groupId) {
      const group = this.flattenGroups[groupId]
      if (!group) return groupId
      return group.name
    },
    handleClearSearchForm() {
      this.listQuery.ports = []
      this.code = []
      this.listQuery.content = ''
    },
    handleStopRefresh() {
      this.refresh = false
      clearInterval(this.timer)
    },
    handleRefresh() {
      this.refresh = true
      if (this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.getList()
      }, 5000)
    }
  }
}
</script>

<style scoped>
</style>
