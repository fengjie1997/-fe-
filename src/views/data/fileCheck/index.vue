<template>
  <div class="full-hw">
    <fleet-card-table
      :show-left-panel="true"
      :filter-default-data="filterDefaultData"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"
      :show-right-tool-bar="false"
      @filter-handle="handleFilter"
      @left-refresh-handle="handleRefresh"
      @filter-reset-handle="handleReset"
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
          <el-table-column :label="$t('device.deviceGroup')" show-overflow-tooltip align="left" min-width="110">
            <template slot-scope="scope">
              <span>{{ getDeviceGroupName(scope.row.groupId) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('reportList.createDt')" show-overflow-tooltip align="left" min-width="110">
            <template slot-scope="scope">
              <span>{{ getTableTimeStr(scope.row.createDt) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('reportFile.uploadFileName')" show-overflow-tooltip align="left" min-width="350">
            <template slot-scope="scope">
              <span>{{ scope.row.fileName }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="listParam.type === 0 || listParam.type === 3" :label="$t('reportFile.alisaFileName')" show-overflow-tooltip align="left" min-width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.fileNameAlisa }}</span>
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
import { getDictToNumberByLanguage } from '@/utils/dictByLanguage'
import { fetchUploadedList, fetchNotUploadList, fetchRepeatList, fetchRequiredUploadList } from '@/api/data/fileCheck'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { getTime } from '@/utils/timeZone'

export default {
  name: 'FileCheck',
  components: {
    Pagination,
    FleetCardTable
  },
  data() {
    return {
      // 右侧顶部工具栏不显示
      showRightToolBar: {
        type: Boolean,
        default: false
      },
      listQuery: {
        limit: 20,
        page: 1,
        type: 3
      },
      filterDefaultData: {
        type: 3
      },
      listParam: {
        type: 3
      },
      list: [],
      time: [],
      total: 0,
      listLoading: false,
      filterFieldList: [
        { label: this.$t('upgrade.fileType'), type: 'select', value: 'type', list: 'typeOptions', optionKey: 'label', width: '150px' },
        { label: this.$t('testPlan.startDt'), type: 'date', value: 'startDt', dateType: 'datetime', clearable: true, width: '250px', valueFormat: 'timestamp' }
      ],

      listTypeInfo: {
        typeOptions: getDictToNumberByLanguage('fileCheckType')
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
    },
    ...mapGetters({
      flattenGroups: 'flattenGroups'
    })
  },
  created() {
    this.getList()
  },
  methods: {
    /** 搜索 */
    handleFilter(filterData) {
      this.listQuery = { ...this.listQuery, ...filterData }
      this.listParam = { ...this.listParam, ...filterData }

      this.listQuery.page = 1
      this.getList()
    },
    /** 刷新左侧菜单 */
    handleRefresh() {
      console.log(this.listParam)
      this.$store.dispatch('refreshGroupTree')
      if (this.listParam.hasOwnProperty('groupId')) {
        delete this.listParam.groupId
      }
      this.getList()
    },
    /** 树选中 */
    handleNodeClick(data) {
      this.listParam.groupId = data.id
      this.getList()
    },
    handleReset(row) {
      this.listParam = row
    },
    async getList() {
      console.log(this.listParam)
      this.listLoading = true
      switch (this.listParam.type) {
        case 0: this.getRepeat(this.listParam, this.listQuery); break
        case 1: this.getNoUpload(this.listParam, this.listQuery); break
        case 2: this.getRequiredUpload(this.listParam, this.listQuery); break
        default:
          this.getUploaded(this.listParam, this.listQuery)
      }
    },
    // 重复文件列表
    getRepeat(param, query) {
      fetchRepeatList(param, query).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = data.data.total
        }
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 未上传文件列表
    getNoUpload(param, query) {
      fetchNotUploadList(param, query).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = data.data.total
        }
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 规定上传文件列表
    getRequiredUpload(param, query) {
      fetchRequiredUploadList(param, query).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = data.data.total
        }
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 规定上传文件列表
    getUploaded(param, query) {
      fetchUploadedList(param, query).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          console.log(this.list)
          this.total = data.data.total
        }
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 所属分组转换
    getDeviceGroupName(groupId) {
      const group = this.flattenGroups[groupId]
      if (!group) return groupId
      return group.name
    },
    //  时间戳转字符串
    getTableTimeStr(data) {
      return getTime(data, this.$store.getters.timezone)
    }
  }
}
</script>

<style scoped>
  /*.full-hw /deep/ .tool-bar{*/
  /*  height: 0 !important;*/
  /*}*/
  .el-table >>> .el-button, .el-table >>> .el-button--mini {
    border: none;
    padding: 0;
    background: transparent;
  }
</style>
