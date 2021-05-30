<template>
  <div class="cell-lookup">
    <div class="filter-container" style="padding:6px 0px;margin-bottom:-5px">
      <el-row :gutter="5">
        <el-col :span="10">
          <el-select v-model="filterValue" style="width: 100%" class="filter-item" :placeholder="$t('baseData.searchType')">
            <el-option v-for="item in filterType" :key="item.key" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="10">
          <el-input v-model="keyword" :placeholder="$t('device.key')" style="width: 100%;" class="filter-item" />
        </el-col>
        <el-col :span="4">
          <el-button size="mini" type="primary" icon="el-icon-search" @click="handleSearch" />
        </el-col>
      </el-row>
    </div>
    <el-table border :data="tableData" height="320" style="width: 100%" class="cell-panel-table" @filter-change="filterChange" @row-click="handleSetView">
      <el-table-column label="ID" width="80" prop="id" :column-key="'id'" />
      <!-- :render-header="renderHeader" -->
      <el-table-column :label="$t('baseData.cellName')" prop="cellName" show-overflow-tooltip />
    </el-table>
    <el-pagination
      small
      :hide-on-single-page="true"
      layout="prev, pager, next"
      :total="tables.length"
      @current-change="val => {queryParams.pageIndex = val}"
    />
  </div>
</template>
<script>

import js from './index.js'
export default {
  ...js
}
</script>
<style lang="less">
  .cell-panel-table{
    td{
      cursor: pointer;
    }
    .el-table__row{
      cursor: pointer;
    }
  }
</style>

