<template>
  <div class="app-container">

    <fleet-single-table

      :show-tool-bar="false"
      :filter-default-data="defaultQueryData"
      :filter-field-list="filterFieldList"
      @filter-handle="handleFilter"
    >

      <div slot="main-table" class="full-hw">

        <el-table
          :key="tableKey"
          v-loading="listLoading"
          v-col-width-limit
          :data="list"
          height="100%"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column type="selection" align="center" width="40" />
          <!-- 数据 -->
          <el-table-column :label="$t('reportList.id')" align="left" show-overflow-tooltip width="100" min-width="100">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('reportList.name')" align="left" show-overflow-tooltip min-width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('reportList.defineReportType')" align="left" show-overflow-tooltip width="300" min-width="300">
            <template slot-scope="scope">
              <span>{{ defineReportTypeList[scope.row.defineReportType] }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('reportList.createDt')" align="left" show-overflow-tooltip width="120" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.createDt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('reportList.creator')" align="left" show-overflow-tooltip width="110" min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.creator }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('reportList.status')" align="left" show-overflow-tooltip width="100" min-width="100">
            <template slot-scope="scope">
              <span>{{ handleStatus(scope.row) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.actions')" align="left" fixed="right" show-overflow-tooltip width="100" min-width="100" :resizable="false">
            <template slot-scope="scope">

              <el-tooltip :content="$t('common.download')">
                <el-button :disabled=" scope.row.status !== 4" icon="el-icon-download" @click="handleDownloadFile(scope.row.id)" />
              </el-tooltip>
              <el-tooltip :content="$t('common.delete')">
                <el-button type="danger" plain icon="el-icon-delete" @click="handleDelete(scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div slot="footer-page">

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

      </div>

    </fleet-single-table>

  </div>
</template>

<script>
import js from './reportList.js'
export default {
  ...js
}

</script>
<style scoped>
  .app-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 70px - 65px);
    padding: 0;
  }
</style>
