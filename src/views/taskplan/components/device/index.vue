<template>
  <div class="full-hw">
    <fleet-single-table
      :filter-show-count="3"
      :show-tool-bar="false"
      :filter-default-data="queryParams"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"
      @filter-handle="handleFilter"
    >
      <div slot="main-table" class="full-hw">
        <el-table
          ref="deviceListTable"
          v-loading="loading"
          v-col-width-limit
          :data="list"
          height="200"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="40" fixed />
          <el-table-column :label="$t('device.name')" prop="name" show-overflow-tooltip min-width="200" />
          <el-table-column :label="$t('device.type')" show-overflow-tooltip width="150" min-width="150">
            <template slot-scope="scope">
              <span>{{ getTableDeviceType(scope.row.type) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.deviceStatus')" show-overflow-tooltip width="100" min-width="100">
            <template slot-scope="scope">
              <span :class="{ 'device-online': scope.row.status === 1 }">{{ getDeviceStatus(scope.row.status) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.portCount')" prop="portCount" show-overflow-tooltip width="100" min-width="100" />
          <el-table-column :label="$t('device.group')" show-overflow-tooltip min-width="150">
            <template slot-scope="scope">
              <span>{{ getDeviceGroupName(scope.row.groupId) }}</span>
            </template>
          </el-table-column>
          <!--
          <el-table-column :label="$t('device.locked')" show-overflow-tooltip width="110" min-width="110">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.locked === 1 ? $t('device.s_locked'): $t('device.s_unlocked')">
                <el-switch
                  :value="scope.row.locked"
                  :active-value="1"
                  :inactive-value="0"
                  disabled
                />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.isDebug')" show-overflow-tooltip prop="isDebug" width="110" min-width="110">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.isDebug === 1 ? $t('device.s_debugged'): $t('device.s_undebugged')">
                <el-switch
                  :value="scope.row.isDebug"
                  :active-value="1"
                  :inactive-value="0"
                  disabled
                />
              </el-tooltip>
            </template>
          </el-table-column>
          -->
        </el-table>
      </div>
      <div slot="footer-page">
        <pagination :total="total" :page.sync="pageParams.page" :limit.sync="pageParams.limit" class="dialog-pagination" @pagination="getList()" />
      </div>
    </fleet-single-table>
  </div>
</template>

<script>
import { fetchDeviceList } from '@/api/device/device'
import FleetSingleTable from '@/components/FleetCardTable/single-table'
import Pagination from '@/components/Pagination'
import { getCacheDict } from '@/utils/dictCache'
import { getDeviceType } from '@/utils/MonitoredTable'
import { mapGetters } from 'vuex'
export default {
  name: 'TpDeviceList',
  components: { Pagination, FleetSingleTable },
  data() {
    return {
      loading: false,
      list: [],
      pageParams: {
        limit: 20,
        page: 1
      },
      total: 0,
      queryParams: {
        search: undefined,
        type: undefined,
        status: undefined,
        field: 'status',
        isAsc: 0
      },
      filterFieldList: [
        { label: this.$t('device.deviceName'), placeholder: this.$t('common.inputTip'), type: 'input', value: 'search' },
        { label: this.$t('common.deviceType'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'type', list: 'deviceTypeOptions', optionKey: 'key', multiple: false, clearable: true },
        { label: this.$t('device.deviceStatus'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'status', list: 'deviceStatusOptions', optionKey: 'key', multiple: false, clearable: true }
      ],
      listTypeInfo: {
        deviceTypeOptions: [],
        deviceStatusOptions: []
      }
    }
  },
  computed: {
    ...mapGetters({
      flattenGroups: 'flattenGroups'
    })
  },
  created() {
    this.getOptions()
    this.getList()
  },
  mounted() {
  },
  methods: {
    handleFilter(filterData) {
      this.pageParams.page = 1
      this.getList(filterData)
    },
    getList(filterData) {
      this.loading = true
      const params = this.tempParams = Object.assign({}, this.queryParams, filterData || this.tempParams, this.pageParams)
      fetchDeviceList(params, []).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = parseInt(data.data.total)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    getOptions() {
      // 设备类型
      const deviceTypes = getCacheDict('deviceType')
      for (let i = 0; i < deviceTypes.length; i++) {
        this.listTypeInfo.deviceTypeOptions.push({
          label: deviceTypes[i].name,
          key: deviceTypes[i].code,
          value: deviceTypes[i].code
        })
      }
      // 设备状态
      const deviceStatusList = getCacheDict('deviceStatus')
      for (let i = 0; i < deviceStatusList.length; i++) {
        this.listTypeInfo.deviceStatusOptions.push({
          label: deviceStatusList[i].name,
          key: deviceStatusList[i].code,
          value: deviceStatusList[i].code
        })
      }
    },
    // 设备类型转换
    getTableDeviceType(data) {
      return getDeviceType(data.toString())
    },
    // 所属分组转换
    getDeviceGroupName(groupId) {
      const group = this.flattenGroups[groupId]
      if (!group) return groupId
      return group.name
    },
    // 设备状态转换
    getDeviceStatus(status) {
      const dict = getCacheDict('deviceStatus')
      if (!Array.isArray(dict)) return status
      const matched = dict.find(item => parseInt(item.code) === status)
      if (!matched) return status
      return matched.name
    }
  }
}
</script>

<style scoped>
</style>
