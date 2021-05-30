<template>
  <div class="full-hw">
    <fleet-single-table
      :show-tool-bar="false"
      :show-page="true"
      :filter-default-data="filterDefaultData"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"
      @filter-handle="handleFilter"
    >

      <div slot="main-table" class="full-hw">

        <el-table
          v-loading="listLoading"
          v-col-width-limit
          :data="list"
          tooltip-effect="dark"
          border
          highlight-current-row
          height="100%"
        >

          <el-table-column type="index" :label="$t('common.num')" align="left" width="80" fixed="left" :resizable="false" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ (listData.page - 1) * listData.limit + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column v-for="(item,index) in tableHead" :key="index" show-overflow-tooltip align="left" :width="item.width" :min-width="item.minWidth" :prop="item.property" :label="item.label">
            <template slot-scope="scope">
              <span v-if="item.property === 'groupId'">{{ getTableDeviceGroupId(scope.row[item.property]) }}</span>
              <span v-else-if="item.property === 'deviceType'">{{ getTableDeviceType(scope.row[item.property]) }}</span>
              <span v-else-if="item.property === 'createDt'">{{ getTableTime(scope.row[item.property]) }}</span>
              <span v-else>{{ scope.row[item.property] }}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column :label="$t('common.actions')" fixed="right" width="70" min-width="70" :resizable="false">
            <template slot-scope="scope">
              <el-tooltip :content="$t('common.download')">
                <el-button icon="el-icon-download" @click="handleExport(scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
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
import Pagination from '@/components/Pagination'
import { fetchDeviceLogList, fetchLogDown } from '@/api/monitored/monitored'
import { getDeviceType } from '@/utils/MonitoredTable'
import { getCacheDict } from '@/utils/dictCache'
import { getTime } from '@/utils/timeZone'
import waves from '@/directive/waves/waves'
import { mapGetters } from 'vuex'
export default {
  name: 'DeviceLog',
  directives: { waves },
  components: { Pagination, FleetSingleTable },
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
        deviceTypes: null,
        deviceName: null
      },

      filterFieldList: [
        { label: this.$t('device.deviceType'), type: 'select', value: 'deviceTypes', list: 'deviceTypesOptions', width: '150px', multiple: true, collapseTags: true },
        { label: this.$t('device.name'), type: 'input', value: 'deviceName', width: '120px' }
      ],

      listTypeInfo: {
        deviceTypesOptions: [],
        deviceIdsOptions: []
      },
      groupIds: [],
      listLoading: false,

      listData: {
        limit: 20,
        page: 1,
        groupIds: [],
        deviceName: '',
        deviceTypes: []
      },
      list: [],
      total: 0,
      tableHead: [{
        property: 'srcFilename', label: this.$t('deviceLog.srcFilename'), minWidth: '140'
      }, {
        property: 'creator', label: this.$t('deviceLog.creator'), width: '100', minWidth: '100'
      }, {
        property: 'deviceType', label: this.$t('deviceLog.type'), width: '100', minWidth: '100'
      }, {
        property: 'groupId', label: this.$t('deviceLog.groupId'), width: '100', minWidth: '100'
      }, {
        property: 'createDt', label: this.$t('deviceLog.createDt'), width: '140', minWidth: '140'
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
      this.getList()
    },
    async getList() {
      this.listLoading = true
      const params = Object.assign({}, this.listData, { groupIds: this.model.groupIds })
      fetchDeviceLogList(params).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.total = data.data.total
          this.list = data.data.records
        }
        this.listLoading = false
      })
    },
    handleGetType() {
      // for (const i in this.listData.deviceTypes) {
      //   this.listData.deviceTypes[i] = Number(this.listData.deviceTypes[i])
      // }
    },
    getFormOptions() {
      for (let i = 0; i < getCacheDict('deviceType').length; i++) {
        this.listTypeInfo.deviceTypesOptions[i] = {}
        this.listTypeInfo.deviceTypesOptions[i]['label'] = getCacheDict('deviceType')[i].name
        this.listTypeInfo.deviceTypesOptions[i]['value'] = getCacheDict('deviceType')[i].code
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
      this.listData.deviceName = ''
      this.listData.deviceIds = []
      this.listData.deviceTypes = []
    },
    // 所属分组转换
    getTableDeviceGroupId(groupId) {
      const group = this.flattenGroups[groupId]
      if (!group) return groupId
      return group.name
    },
    handleExport(data) {
      fetchLogDown(data.id, data.srcFilename)
    },
    getTableTime(time) {
      return getTime(time, this.$store.getters.timezone)
    }
  }
}
</script>

<style scoped>
</style>
