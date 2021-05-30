<template>
  <div class="full-hw">
    <!--
    改造/使用 问题注意点：
    1、隐藏ID列，增加Index。
    2、组是否为条件，是的话增加左侧组树。
    3、改造请注意一下样式是否全局。
    4、toolbar是为图标形式。
    5、分页统一设置20行。
    6、请根据实际列，调整列宽，最后一列为固定不可resizable。
    7、统一更改操作栏名称为Actions。
    -->
    <fleet-card-table
      :show-left-panel="true"
      :filter-default-data="filterData"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"
      @filter-handle="handleFilter"
      @filter-reset-handle="handleReset"
      @left-refresh-handle="handleRefresh"
      @filter-event-handle="handleEvent"
    >
      <span slot="left-title">Default Title</span>

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
        <el-tooltip :content="$t('common.edit')">
          <el-button type="primary" size="mini" icon="el-icon-edit" />
        </el-tooltip>
        <el-tooltip :content="$t('common.delete')">
          <el-button type="primary" size="mini" icon="el-icon-delete" />
        </el-tooltip>
        <el-tooltip :content="$t('common.search')">
          <el-button type="primary" size="mini" icon="el-icon-search" />
        </el-tooltip>
      </div>

      <div slot="main-table" class="full-hw">
        <el-table
          ref="multipleTable"
          v-loading="tableLoading"
          v-col-width-limit
          :data="list"
          height="100%"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column type="selection" align="center" width="35" fixed />
          <el-table-column label="ID" show-overflow-tooltip width="100" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.name')" show-overflow-tooltip min-width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.type')" show-overflow-tooltip min-width="200">
            <template slot-scope="scope">
              <span>{{ getTableDeviceType(scope.row.type) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.portCount')" show-overflow-tooltip width="100" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.portCount }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.actions')" fixed="right" width="100" :resizable="false">
            <template slot-scope="scope">
              <el-tooltip :content="$t('common.edit')">
                <el-button icon="el-icon-edit" @click="handleEditDeviceView(scope.row.type,scope.row.id)" />
              </el-tooltip>
              <el-tooltip :content="$t('device.testPlan')">
                <el-button icon="el-icon-edit" @click="handleTestPlanView(scope.row.name,scope.row.id,scope.row.type)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div slot="footer-page">
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="getDeviceList" />
      </div>

    </fleet-card-table>
  </div>

</template>

<script>

import Pagination from '@/components/Pagination'
import FleetCardTable from '@/components/FleetCardTable'
import { fetchDeviceList } from '@/api/device/device'
import { getDeviceType } from '@/utils/MonitoredTable'
export default {
  name: 'Index',
  components: {
    Pagination,
    FleetCardTable
  },
  data() {
    return {
      tableLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        search: undefined,
        field: 'id',
        isAsc: 0
      },
      list: [],
      total: 0,

      filterData: {

        name: null,
        age: null,
        count: 0,
        sex: 1,
        date: null,
        dateTime: null,
        range: null
      },

      filterFieldList: [
        { label: '姓名', type: 'input', value: 'name', width: '100px', display: true },
        { label: '年龄', type: 'input', value: 'age', disabled: true, width: '80px' },
        { label: '性别', type: 'select', value: 'sex', list: 'sexList', width: '80px' },
        { label: '日期', type: 'date', value: 'date' },
        { label: '时间选择', type: 'date', value: 'dateTime', dateType: 'datetime', clearable: true, width: '250px' },
        { label: '时间区间', type: 'date', value: 'range', dateType: 'daterange', width: '200px' },
        { label: '计数', type: 'inputNumber', value: 'count', min: 1, max: 10 }
      ],

      listTypeInfo: {
        sexList: [
          { id: 1, label: '男' },
          { id: 2, label: '女' },
          { id: 3, label: '保密' }
        ]
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
    this.getDeviceList()
  },
  methods: {
    /** 搜索 */
    handleFilter(row) {
      console.log(row)
    },
    /** 重置 */
    handleReset(row) {
      console.log(row)
    },
    /** 树选中 */
    handleNodeClick(data) {
      console.log(data)
    },
    /** 刷新左侧菜单 */
    handleRefresh() {
      this.$store.dispatch('refreshGroupTree')
    },
    /** 过滤失去焦点时触发 */
    handleEvent(data) {
      console.log(data)
    },
    // 获取设备列表
    getDeviceList() {
      this.tableLoading = true
      fetchDeviceList(this.listQuery, []).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          this.list.forEach(item => {
            Object.freeze(item)
          })
          this.total = parseInt(data.data.total)
          this.tableLoading = false
        }
      })
    },
    // 设备类型转换
    getTableDeviceType(data) {
      return getDeviceType(data.toString())
    }
  }
}
</script>

<style scoped>
  .el-table >>> .el-button, .el-table >>> .el-button--mini {
    padding: 5px;
  }
</style>
