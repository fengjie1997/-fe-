<template>
  <div class="full-hw">
    <fleet-card-table
      :show-left-panel="true"
      :filter-default-data="{}"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"

      @filter-handle="handleFilter"
      @left-refresh-handle="handleRefresh"
    >

      <span slot="left-title">{{ $t('common.groupList') }}</span>

      <div slot="left-tree" class="full-hw scroll-auto">
        <el-tree
          class="full-hw"
          :data="groupTree"
          :props="treeProps"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        />
      </div>

      <div slot="tool-bar">
        <el-tooltip :content="$t('common.export')">
          <el-button type="primary" icon="el-icon-download" @click="downloadExcel()" />
        </el-tooltip>

      </div>

      <div slot="main-table" class="full-hw">
        <el-table
          v-loading="listLoading"
          v-col-width-limit
          :data="list"
          border
          fit
          height="100%"
          highlight-current-row
          style="width: 100%"
        >
          <!-- 数据 -->
          <el-table-column
            type="index"
            :label="$t('common.num')"
            align="left"
            width="80"
            fixed="left"
            :resizable="false"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ (listQuery.page - 1) * listQuery.limit + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.deviceGroup')" show-overflow-tooltip align="left" width="250" min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.groupName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.name')" show-overflow-tooltip align="left" min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.deviceName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('deviceStatus.onlineTime')" show-overflow-tooltip align="left" width="130" min-width="130">
            <template slot-scope="scope">
              <span>{{ getTimeFix(scope.row.onlineTotalTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('circular.numberOfUploadedLogs')" show-overflow-tooltip align="left" width="160" min-width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.sourceFileNum }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('circular.uploadFileSize')" show-overflow-tooltip align="left" width="140" min-width="140">
            <template slot-scope="scope">
              <span>{{ getSizeFix(scope.row.fileSize) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('stateStatistics.totalDistance')" show-overflow-tooltip align="left" width="130" min-width="130">
            <template slot-scope="scope">
              <span>{{ getDistanceFix(scope.row.totalDistance) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div slot="footer-page">
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </div>

    </fleet-card-table>
  </div>

</template>

<script>
import FleetCardTable from '@/components/FleetCardTable'
import { pickerOptions } from '@/utils/timeZone'
import { getStatusNotice } from '@/api/device/device'
import Pagination from '@/components/Pagination'
import { getTimeStamp } from '@/utils/timeZone'
export default {
  name: 'DeviceCircular',
  components: {
    Pagination,
    FleetCardTable
  },
  data() {
    return {
      defaultType: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      type: this.defaultType,
      listQuery: {
        limit: 20,
        page: 1,
        field: 'device.id',
        isAsc: 0,
        startTime: 0,
        endTime: getTimeStamp(new Date()),
        groupId: undefined
      },
      list: [{ groupName: 1, onlineTotalTime: 2, sourFileNum: 3, fileSize: 4, totalDistance: 5, numberOfUploadedLogs: 6 }],
      time: [],
      total: 0,
      listLoading: false,
      pickerOptions: pickerOptions,

      filterFieldList: [
        { label: this.$t('common.deviceType'), type: 'select', value: 'tmpType', list: 'typeOptions', optionKey: 'label', width: '150px' },
        { label: this.$t('common.time'), type: 'date', dateType: 'daterange', valueFormat: 'timestamp', unlinkPanels: true, value: 'tmpTime', startPlaceholder: this.$t('common.startPlaceholder'), pickerOptions: pickerOptions, endPlaceholder: this.$t('common.endPlaceholder'), list: 'typeOptions', optionKey: 'label', width: '250px' }
      ],

      listTypeInfo: {
        typeOptions: [
          { key: 1, label: 'Phone', value: [2, 4] },
          { key: 2, label: 'ATU', value: [1] },
          { key: 3, label: 'RCU', value: [0, 3] },
          { key: 4, label: 'Indoor Atu', value: [7] },
          { key: 5, label: 'Scout', value: [3] },
          { key: 6, label: 'RCU Light', value: [9] }]
      },

      treeProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      }
    }
  },
  computed: {
    groupTree() {
      return this.$store.getters.groupTree
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 搜索 */
    handleFilter(row) {
      this.type = row.tmpType ? row.tmpType : this.defaultType
      this.time = row.tmpTime ? row.tmpTime : []
      this.listQuery = { ...this.listQuery, ...row }
      this.listQuery.tmpType = undefined
      this.listQuery.tmpTime = undefined
      this.getTimes()
      this.getList()
    },
    /** 刷新左侧菜单 */
    handleRefresh() {
      this.$store.dispatch('refreshGroupTree')
      this.listQuery.groupId = undefined
      this.getList()
    },
    /** 树选中 */
    handleNodeClick(data) {
      this.listQuery.groupId = data.id
      this.getList()
    },
    async getList() {
      const type = []
      for (const i in this.type) {
        type.push(this.type[i])
      }
      this.getTimes()
      this.listLoading = true
      getStatusNotice(this.listQuery, type).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = data.data.total
        }
      }).finally(() => {
        this.listLoading = false
      })
    },
    downloadExcel() {
      this.export2Excel()
    },

    // 数据写入excel
    export2Excel() {
      var that = this
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/excel/export2Excel') // 这里必须使用绝对路径，使用@/+存放export2Excel的路径
        const tHeader = [this.$t('device.deviceGroup'), this.$t('device.name'), this.$t('deviceStatus.onlineTime'), this.$t('circular.numberOfUploadedLogs'), this.$t('circular.uploadFileSize'), this.$t('stateStatistics.totalDistance')] // 导出的表头名信息
        const filterVal = ['groupName', 'deviceName', 'onlineTotalTime', 'sourceFileNum', 'fileSize', 'totalDistance'] // 导出的表头字段名，需要导出表格字段名
        const list = that.list
        for (const i in list) {
          list[i].onlineTotalTime = this.getTimeFix(list[i].onlineTotalTime)
          list[i].fileSize = this.getSizeFix(list[i].fileSize)
          list[i].totalDistance = this.getDistanceFix(list[i].totalDistance)
        }
        console.log(list)
        const data = that.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, 'download')// 导出的表格名称，根据需要自己命名
      })
    },
    // 格式转换，直接复制即可
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getTimes() {
      if (this.time !== null) {
        if (this.time.length > 1) {
          this.listQuery.startTime = this.time[0]
          this.listQuery.endTime = this.time[1]
        }
      }
      if (this.time === null || this.time.length === 0) {
        this.listQuery.endTime = getTimeStamp(new Date())
        this.listQuery.startTime = 0
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
    getTimeFix(remain) {
      if (remain !== undefined && remain !== null && remain !== '') {
        const data = Number(remain)
        return (Math.round(data * 10000 / 1000 / 60 / 60) / 10000.00).toFixed(2)
      } else {
        return
      }
    }
  }
}
</script>

<style scoped>
  .el-table >>> .el-button, .el-table >>> .el-button--mini {
    border: none;
    padding: 0;
    background: transparent;
  }
</style>
