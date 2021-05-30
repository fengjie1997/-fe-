<template>
  <div>
    <el-row>

      <el-tooltip :content="$t('report.fileList')">
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAdd()" />
      </el-tooltip>

      <el-tooltip :content="$t('reportFile.remove')">
        <el-button type="warning" size="mini" icon="el-icon-minus" @click="removeSelected" />
      </el-tooltip>

      <el-tooltip :content="$t('reportFile.removeAll')">
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeAll" />
      </el-tooltip>

    </el-row>
    <el-table
      ref="selectedTable"
      v-col-width-limit
      :data="selectedTableData"
      border
      fit
      highlight-current-row
      height="353"
      style="width: 100%;margin: 5px 0 10px 0"
    >
      <el-table-column type="selection" align="center" width="35" fixed />
      <el-table-column prop="srcFileName" :label="$t('reportFile.filePathName')" show-overflow-tooltip align="left" min-width="300" />
      <el-table-column prop="deviceName" :label="$t('reportFile.deviceName')" show-overflow-tooltip align="left" min-width="100" width="100" />
      <el-table-column prop="port" :label="$t('reportFile.port')" show-overflow-tooltip align="left" min-width="75" width="75" />
      <el-table-column :label="$t('reportFile.testSummary')" show-overflow-tooltip align="left" min-width="200" width="200">
        <template slot-scope="scope">
          {{ getMutiDictByComma(scope.row.testSummary,testSummary) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.testStartDate')" show-overflow-tooltip align="left" min-width="150" width="150">
        <template slot-scope="scope">
          {{ formatDate(scope.row.testStartDate) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('report.testEndDate')" show-overflow-tooltip align="left" min-width="150" width="150">
        <template slot-scope="scope">
          {{ formatDate(scope.row.testEndDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="dataNetTypes" :label="$t('reportFile.dataNetTypes')" show-overflow-tooltip align="left" min-width="150" width="150">
        <template slot-scope="scope">
          {{ getMutiDictByComma(scope.row.dataNetTypes,netTypeDict) }}
        </template>
      </el-table-column>
      <el-table-column prop="operators" :label="$t('reportFile.operators')" show-overflow-tooltip align="left" min-width="120" width="120">
        <template slot-scope="scope">
          {{ getOperatorName(scope.row.operators) }}
        </template>
      </el-table-column>
      <el-table-column prop="totalDistance" :label="$t('reportFile.totalDistance')" show-overflow-tooltip align="left" min-width="130" width="130">
        <template slot-scope="scope">
          {{ getReadableDistance(scope.row.totalDistance) }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('reportFile.uploadTime')" show-overflow-tooltip align="left" min-width="150" width="150">
        <template slot-scope="scope">
          {{ formatDate(scope.row.createDt) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('reportFile.fileSize')" show-overflow-tooltip align="left" min-width="100" width="100">
        <template slot-scope="scope">
          {{ getfilesize(scope.row.fileSize) }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="true"
      :page-sizes="[10, 20, 30, 50]"
      :current-page="selectedParams.pageIndex"
      :page-size="selectedParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="selectedTableId.length"
      @size-change="val => {selectedParams.pageSize = val}"
      @current-change="val => {selectedParams.pageIndex = val}"
    />
  </div>
</template>
<script>

import js from './file.js'
export default {
  ...js
}
</script>
<style scoped>
  .remove-link {
    font-weight: bold;
    margin-left:10px;
    margin-bottom: 10px;
  }
  >>> .el-button--mini {
    margin: 0;
    padding: 7px 10px;
  }

  >>> .el-tabs__header  {
    display: block;
  }

</style>
