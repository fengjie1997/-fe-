<template>
  <div class="cell-lookup">
    <div class="filter-container" style="padding:6px 0px;margin-bottom:-5px">
      <el-row :gutter="5">
        <el-col :span="10">
          <el-select v-model="filterValue" clearable style="width: 100%" class="filter-item" placeholder="搜索类型" @change="handleFilter">
            <el-option v-for="item in filterType" :key="item.key" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="14">
          <el-input v-model="keyword" placeholder="关键词" style="width: 100%;" class="filter-item" />
        </el-col>
      </el-row>
    </div>
    <el-table border :data="tableData" height="320" style="width: 100%" class="cell-panel-table" @row-click="handleSetView">
      <el-table-column label="ID" width="80" prop="id" :render-header="renderHeader" />
      <!-- :render-header="renderHeader" -->
      <el-table-column label="小区名称" prop="cellName" show-overflow-tooltip />
    </el-table>
    <el-pagination
      small
      layout="prev, pager, next"
      :total="data.length"
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

