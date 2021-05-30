<template>
  <div class="full-hw">

    <fleet-single-table
      :show-tool-bar="false"
      :filter-show-count="2"
      :show-page="true"
      :filter-default-data="filterDefaultData"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"
      @filter-handle="handleFilter"
      @filter-event-handle="handleEvent"
    >
      <div slot="main-table" class="full-hw">
        <el-table
          ref="stateStatisticsTable"
          v-loading="listLoading"
          v-col-width-limit
          :data="list"
          style="width: 100%;"
          border
          highlight-current-row
          height="100%"
        >
          <template v-for="(item,index) in tableHead">
            <el-table-column v-if="item.property !== 'id'" :key="index" show-overflow-tooltip align="left" :width="item.width" :min-width="item.minWidth" :prop="item.property" :label="item.label">
              <template slot-scope="scope">
                <span v-if="item.property === 'group_id'">{{ getTableDeviceGroupId(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'device_type'">{{ getTableDeviceType(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'device_id'">{{ (scope.row[item.property] === '汇总' && $store.getters.language === 'en') ? 'Summary' : scope.row[item.property] }}</span>
                <span v-else-if="item.property === 'total_time'">{{ getTimeFix(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'total_distance'">{{ getDistanceFix(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'file_size'">{{ getSizeFix(scope.row[item.property]) }}</span>
                <span v-else>{{ scope.row[item.property] }}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <div slot="footer-page">
        <pagination :total="total" :page.sync="listData.page" :limit.sync="listData.limit" @pagination="getList" />
      </div>

    </fleet-single-table>
  </div>
</template>

<script>
import FleetSingleTable from '@/components/FleetCardTable/single-table'
import {
  fetchStateStatisticsListByGroup,
  fetchStateStatisticsListByDevice
} from '@/api/monitored/monitored'
import { getDeviceType, getDeviceStatus } from '@/utils/MonitoredTable'
import { getCacheDict } from '@/utils/dictCache'
import { getTime, getTimeZone, getTimeStamp } from '@/utils/timeZone'
import waves from '@/directive/waves/waves'
import Pagination from '@/components/Pagination'
import store from '@/store'
import { mapGetters } from 'vuex'
export default {
  name: 'StateStatistics',
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

      filterDefaultData: {
        page: 1,
        deviceIds: null,
        deviceTypes: null,
        deviceName: null,
        actionSelect: 1,
        time: null
      },
      filterFieldList: [
        { label: this.$t('loginLog.select'), type: 'select', value: 'actionSelect', list: 'actionSelectOptions', width: '150px' },
        { label: this.$t('common.time'), type: 'date', value: 'time', dateType: 'datetimerange', startPlaceholder: this.$t('common.startPlaceholder'), endPlaceholder: this.$t('common.endPlaceholder'), clearable: true, width: '250px', valueFormat: 'timestamp' },
        { label: this.$t('device.deviceType'), type: 'select', value: 'deviceTypes', list: 'deviceTypesOptions', width: '150px', multiple: true, collapseTags: true, disabled: true, customControl: 'device' },
        { label: this.$t('device.select'), type: 'select', value: 'deviceIds', list: 'deviceIdsOptions', width: '160px', multiple: true, collapseTags: true, disabled: true, customControl: 'device' },
        { label: this.$t('device.portNum'), type: 'select', value: 'ports', list: 'portsOptions', width: '150px', multiple: true, collapseTags: true, disabled: true, customControl: 'device' }
      ],
      listTypeInfo: {
        deviceTypesOptions: [],
        deviceIdsOptions: [],
        portsOptions: [
          { label: 1, value: 1 },
          { label: 2, value: 2 },
          { label: 3, value: 3 },
          { label: 4, value: 4 },
          { label: 5, value: 5 },
          { label: 6, value: 6 },
          { label: 7, value: 7 },
          { label: 8, value: 8 },
          { label: 9, value: 9 },
          { label: 10, value: 10 },
          { label: 11, value: 11 },
          { label: 12, value: 12 },
          { label: 13, value: 13 }
        ],
        actionSelectOptions: [{ label: this.$t('stateStatistics.group'), value: 1 }, { label: this.$t('stateStatistics.device'), value: 0 }],
        deviceStatusOptions: []
      },

      disable: true,
      actionSelect: 1,
      cutId: '',
      groupIds: [],
      listLoading: false,
      groupIdsOptions: [],
      time: [],
      defaultTime: getTimeZone(this.$store.getters.timezone),
      listData: {
        limit: 20,
        page: 1,
        actionSelect: 1,
        groupIds: [],
        deviceIds: [],
        ports: [],
        deviceTypes: [],
        startTime: 0,
        endTime: getTimeStamp(new Date())
      },
      list: [],
      total: 0,
      deviceTableHead: [{
        property: 'device_id', label: this.$t('stateStatistics.devices'), minWidth: '200'
      }, {
        property: 'device_type', label: this.$t('device.type'), width: '120', minWidth: '120'
      }, {
        property: 'total_time', label: this.$t('stateStatistics.totalTime'), width: '150', minWidth: '150'
      }, {
        property: 'total_distance', label: this.$t('stateStatistics.totalDistance'), width: '150', minWidth: '150'
      }, {
        property: 'file_count', label: this.$t('stateStatistics.fileCount'), width: '120', minWidth: '120'
      }, {
        property: 'file_size', label: this.$t('stateStatistics.fileSize'), width: '120', minWidth: '120'
      }],
      groupTableHead: [{
        property: 'group_id', label: this.$t('device.group'), minWidth: '200'
      }, {
        property: 'total_time', label: this.$t('stateStatistics.totalTime'), width: '150', minWidth: '150'
      }, {
        property: 'total_distance', label: this.$t('stateStatistics.totalDistance'), width: '150', minWidth: '150'
      }, {
        property: 'file_count', label: this.$t('stateStatistics.fileCount'), width: '120', minWidth: '120'
      }, {
        property: 'file_size', label: this.$t('stateStatistics.fileSize'), width: '120', minWidth: '120'
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
    /** 搜索 */
    handleFilter(row) {
      this.listData = { ...this.listData, ...row }
      this.time = row.time
      this.getTimes()
      this.getList()
    },

    /** 过滤失去焦点时触发 */
    handleEvent(data) {
      if (data.$_item.value === 'actionSelect') {
        const disabled = data.value !== 0
        data.$_fieldList.forEach(item => {
          if (item.customControl === 'device') {
            item.disabled = disabled
          }
        })
      }
    },
    async getList() {
      if (this.time === null || this.time.length === 0) {
        this.listData.endTime = getTimeStamp(new Date())
        this.listData.startTime = 0
      }

      // 这里要处理一下，是否为设备维度
      if (this.listData.actionSelect !== 0) {
        this.filterFieldList.forEach(item => {
          if (item.customControl === 'device') {
            this.listData[item.value] = null
          }
        })
      }

      this.listLoading = true
      this.listData.groupIds = this.model.groupIds
      if (this.listData.actionSelect === 1) {
        this.tableHead = this.groupTableHead
        fetchStateStatisticsListByGroup(this.listData).then(response => {
          const data = response.data
          if (data.code === 1) {
            this.list = data.data.records
            this.total = data.data.total
          }
        }).finally(() => {
          this.$refs.stateStatisticsTable.doLayout()
          this.listLoading = false
        })
      } else {
        this.tableHead = this.deviceTableHead
        fetchStateStatisticsListByDevice(this.listData).then(response => {
          const data = response.data
          if (data.code === 1) {
            this.list = data.data.records
            this.total = data.data.total
          }
        }).finally(() => {
          this.$refs.stateStatisticsTable.doLayout()
          this.listLoading = false
        })
      }
    },
    getTimeFix(remain) {
      if (remain !== undefined && remain !== null && remain !== '') {
        const data = Number(remain)
        return (Math.round(data * 10000 / 60 / 60) / 10000.00).toFixed(2)
      } else {
        return
      }
    },
    getDistanceFix(remain) {
      if (remain !== undefined && remain !== null && remain !== '') {
        const data = Number(remain)
        return (Math.round(data * 10000 / 1000) / 10000.00).toFixed(2)
      } else {
        return
      }
    },
    getSizeFix(remain) {
      if (remain !== undefined && remain !== null && remain !== '') {
        const data = Number(remain)
        return (Math.round(data * 10000 / 1024 / 1024 / 1024) / 10000.00).toFixed(2)
      } else {
        return
      }
    },
    getFormOptions() {
      fetchStateStatisticsListByDevice(this.listData).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.listTypeInfo.deviceIdsOptions = []
          for (let i = 0; i < data.data.records.length - 1; i++) {
            this.listTypeInfo.deviceIdsOptions[i] = {}
            this.listTypeInfo.deviceIdsOptions[i].value = data.data.records[i + 1].device_id
            this.listTypeInfo.deviceIdsOptions[i].label = data.data.records[i + 1].creator
          }
        }
      })
      for (let i = 0; i < getCacheDict('deviceType').length; i++) {
        this.listTypeInfo.deviceTypesOptions[i] = {}
        this.listTypeInfo.deviceTypesOptions[i]['label'] = getCacheDict('deviceType')[i].name
        this.listTypeInfo.deviceTypesOptions[i]['value'] = getCacheDict('deviceType')[i].code
      }
      for (let j = 0; j < getCacheDict('deviceStatus').length; j++) {
        this.listTypeInfo.deviceStatusOptions[j] = {}
        this.listTypeInfo.deviceStatusOptions[j]['label'] = getCacheDict('deviceStatus')[j].name
        this.listTypeInfo.deviceStatusOptions[j]['value'] = getCacheDict('deviceStatus')[j].code
      }
    },
    getTableDeviceType(data) {
      if (isNaN(data)) {
        return getDeviceType(data)
      } else {
        return getDeviceType(data.toString())
      }
    },
    getTableDeviceStatus(data) {
      return getDeviceStatus(data)
    },
    getCreator(data) {
      console.log(data)
      if (data === '汇总') {
        if (store.getters.language === 'zh') {
          data = '汇总'
        } else {
          data = 'Summary'
        }
        return data
      }
    },
    getTableDeviceGroupId(id) {
      if (id === '汇总') {
        if (store.getters.language === 'zh') {
          id = '汇总'
        } else {
          id = 'Summary'
        }
        return id
      } else {
        const group = this.flattenGroups[id]
        if (!group) return id
        return group.name
      }
    },
    handleActionSelect() {
      this.disable = this.actionSelect === 1
      this.handleClearSearchForm()
      this.getList()
    },
    handleExport() {
      // exportLoginLogList('x.csv', this.listData)
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
    }
  }
}
</script>

<style scoped>
</style>
