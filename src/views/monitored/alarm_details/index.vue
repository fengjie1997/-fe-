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
          v-loading="listLoading"
          v-col-width-limit
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
                <span v-if="item.property === 'alarmLevel'">{{ getTableAlarmLevel(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'groupId'">{{ getTableDeviceGroupId(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'alarmClearDateTime'">{{ getTableTime(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'alarmDatetime'">{{ getTableTime(scope.row[item.property]) }}</span>
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
import { fetchAlarmDetailsList } from '../../../api/monitored/monitored'
import { getCacheDict } from '../../../utils/dictCache'
import { getAlarmLevel } from '../../../utils/MonitoredTable'
import { getTime, getTimeZone, getTimeStamp } from '../../../utils/timeZone'
import waves from '../../../directive/waves/waves'
import Pagination from '@/components/Pagination'
import FleetSingleTable from '@/components/FleetCardTable/single-table'
import { mapGetters } from 'vuex'
export default {
  name: 'AlarmDetails',
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
        { label: this.$t('alarmDetails.alarmTime'), startPlaceholder: this.$t('common.startPlaceholder'), endPlaceholder: this.$t('common.endPlaceholder'), type: 'date', value: 'time', dateType: 'daterange', width: '250px', clearable: true, valueFormat: 'timestamp' },
        { label: this.$t('alarmDetails.alarmLevel'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'alarmLevels', list: 'alarmLevelsOptions', optionKey: 'key', multiple: true, clearable: true, collapseTags: true },
        { label: this.$t('alarmDetails.alarmCode'), placeholder: this.$t('common.inputTip'), type: 'input', value: 'alarmCodes' },
        { label: this.$t('alarmDetails.alarmContent'), placeholder: this.$t('common.inputTip'), type: 'input', value: 'alarmContent' },
        { label: this.$t('common.sort'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'isAsc', list: 'orderOptions', optionKey: 'key' }
      ],
      listTypeInfo: {
        alarmLevelsOptions: [],
        orderOptions: [
          { label: this.$t('common.asc'), key: 0, value: 0 },
          { label: this.$t('common.desc'), key: 1, value: 1 }
        ]
      },
      defaultTime: getTimeZone(this.$store.getters.timezone),
      listLoading: false,
      deviceIdsOptions: [],
      fieldOptions: [{ label: this.$t('device.deviceID'), key: 'id' }],
      listQuery: {
        limit: 20,
        page: 1,
        field: 'alarm_datetime',
        isAsc: 1,
        deviceName: '',
        alarmLevels: [],
        alarmContent: '',
        deviceIds: [],
        startTime: 0,
        endTime: getTimeStamp(new Date())
      },
      list: [],
      groupIds: [],
      groupIdName: '',
      total: 0,
      tableHead: [{
        property: 'alarmLevel', label: this.$t('alarmDetails.alarmLevel'), width: 120, minWidth: 120
      }, {
        property: 'deviceName', label: this.$t('device.name'), minWidth: 250
      }, {
        property: 'groupId', label: this.$t('deviceLog.groupId'), width: 120, minWidth: 120
      }, {
        property: 'devicePort', label: this.$t('device.portNum'), width: 80, minWidth: 80
      }, {
        property: 'alarmCode', label: this.$t('alarmDetails.alarmCode'), width: 120, minWidth: 120
      }, {
        property: 'alarmContent', label: this.$t('alarmDetails.alarmContent'), minWidth: 300
      }, {
        property: 'alarmDatetime', label: this.$t('alarmDetails.alarmTime'), time: true, width: 180, minWidth: 180
      }, {
        property: 'alarmClearDatetime', label: this.$t('alarmDetails.clearTime'), time: true, width: 180, minWidth: 180
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
  // mounted() {
  //   if (this.timer) {
  //     clearInterval(this.timer)
  //   } else {
  //     this.timer = setInterval(() => {
  //       this.getList()
  //     }, 5000)
  //   }
  // },
  // destroyed() {
  //   clearInterval(this.timer)
  // },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
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
      if (filterDataCopy && filterDataCopy.alarmCodes) {
        if (Array.isArray(filterDataCopy.alarmCodes)) {
          params.alarmCodes = filterDataCopy.alarmCodes
        } else {
          params.alarmCodes = filterDataCopy.alarmCodes.split(',').map(item => Number(item))
        }
      } else {
        params.alarmCodes = []
      }
      // 加入分组参数
      params.groupIds = this.model.groupIds
      if (!this.refresh) {
        this.listLoading = true
      }
      fetchAlarmDetailsList(params).then(res => {
        const data = res.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = data.data.total
        }
      }).finally(() => {
        this.listLoading = false
      })
    },
    getFormOptions() {
      // 告警级别
      const alarmLevels = getCacheDict('alarmLevel')
      for (let i = 0; i < alarmLevels.length; i++) {
        this.listTypeInfo.alarmLevelsOptions.push({
          label: alarmLevels[i].name,
          key: alarmLevels[i].code,
          value: alarmLevels[i].code
        })
      }
    },
    handleFilter(filterData) {
      this.listQuery.page = 1
      this.getList(filterData)
    },
    // 所属分组转换
    getTableDeviceGroupId(groupId) {
      const group = this.flattenGroups[groupId]
      if (!group) return groupId
      return group.name
    },
    handleClearSearchForm() {
      this.time = []
      this.listQuery.alarmCodes = []
      this.listQuery.alarmLevels = []
      this.listQuery.alarmContent = ''
      this.listQuery.deviceIds = []
    },
    getTableAlarmLevel(data) {
      return getAlarmLevel(data)
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
