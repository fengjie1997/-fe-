<template>
  <div class="full-hw">
    <fleet-card-table
      :show-left-panel="false"
      :filter-default-data="listQuery"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"
      @filter-handle="handleFilter"
    >
      <div slot="tool-bar">
        <el-tooltip v-if="pageParams.isException == 0" :content="$t('operateLog.failView')">
          <el-button icon="el-icon-view" type="warning" @click="switchView(1)" />
        </el-tooltip>
        <el-tooltip v-if="pageParams.isException == 1" :content="$t('operateLog.successView')">
          <el-button icon="el-icon-view" type="primary" @click="switchView(0)" />
        </el-tooltip>
        <el-tooltip v-perm="'/operateLog/clearAll'" :content="$t('operateLog.truncate')">
          <el-button icon="el-icon-delete" type="danger" @click="truncateLog" />
        </el-tooltip>
      </div>
      <div slot="main-table" class="full-hw">
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          v-col-width-limit
          :data="list"
          border
          fit
          highlight-current-row
          height="100%"
          style="width: 100%;"
        >
          <!-- 数据 -->
          <el-table-column :label="$t('operateLog.id')" show-overflow-tooltip min-width="80" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('operateLog.userAccount')" show-overflow-tooltip min-width="120" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.userAccount }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('operateLog.model')" show-overflow-tooltip min-width="200" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.model }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('operateLog.startTime')" show-overflow-tooltip min-width="180" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}.{c}') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('operateLog.endTime')" show-overflow-tooltip min-width="180" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.endTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}.{c}') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('operateLog.duration')" show-overflow-tooltip min-width="120" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.duration }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="pageParams.isException == 0" :label="$t('operateLog.logDescription')" show-overflow-tooltip min-width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.logDescription }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="pageParams.isException == 1" :label="$t('operateLog.exception')" show-overflow-tooltip min-width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.exception }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('operateLog.operateResult')" show-overflow-tooltip width="110" min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.operateResult }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('operateLog.userIp')" show-overflow-tooltip width="110" min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.userIp }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer-page">
        <pagination :total="total" :page.sync="pageParams.page" :limit.sync="pageParams.limit" @pagination="getList()" />
      </div>
    </fleet-card-table>
  </div>
</template>

<script>
import { fetchList, truncate } from '@/api/system/operateLog'
import Pagination from '@/components/Pagination'
import FleetCardTable from '@/components/FleetCardTable'

export default {
  name: 'TableoperateLog',
  components: { Pagination, FleetCardTable },
  data() {
    return {
      filterFieldList: [
        { label: `${this.$t('operateLog.userAccount')} / ${this.$t('operateLog.logDescription')}`, placeholder: this.$t('common.inputTip'), type: 'input', value: 'search', width: '200px' },
        { label: this.$t('common.field'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'field', list: 'fieldOptions', optionKey: 'key' },
        { label: this.$t('common.sort'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'isAsc', list: 'orderOptions', optionKey: 'key' }
      ],
      listTypeInfo: {
        fieldOptions: [
          { key: 'id', label: 'ID', value: 'id' }
        ],
        orderOptions: [
          { label: this.$t('common.asc'), key: 1, value: 1 },
          { label: this.$t('common.desc'), key: 0, value: 0 }
        ]
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      pageParams: {
        page: 1,
        limit: 20,
        isException: 0
      },
      listQuery: {
        search: undefined,
        field: 'id',
        isAsc: 0
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(filterData) {
      this.listLoading = true
      const filterDataCopy = filterData ? { ...filterData } : this.tempParams
      const params = this.tempParams = Object.assign({}, this.listQuery, filterDataCopy, this.pageParams)
      fetchList(params).then(response => {
        this.list = response.data.data.records
        this.total = response.data.data.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    handleFilter(filterData) {
      this.pageParams.page = 1
      this.getList(filterData)
    },
    switchView(isException) {
      this.pageParams.isException = isException
      this.pageParams.page = 1
      this.getList()
    },
    truncateLog() {
      this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
        center: false
      }).then(() => {
        truncate().then(response => {
          if (response.data.code === 1) {
            this.getList()
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.deleteSuccess'),
              type: 'success',
              duration: 2000
            })
          }
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
