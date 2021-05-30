<template>
  <div class="port-list-view">
    <el-table
      height="600"
      style="width: 100%"
      row-key="id"
      :data="portList"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column type="index" width="50" align="center" />
      <el-table-column label="端口名" width="100">
        <template slot-scope="scope">
          {{ handleNetType(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enable" :disabled="scope.row.portNumber === 1" size="mini" :active-value="1" :inactive-value="0" @click.stop.native="handlePortStatus(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="primary" circle @click.stop.native="handlePortEdit(scope.row.port)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

import js from './port.js'
export default {
  ...js
}
</script>
<style>
.port-list-view table tbody tr{
  cursor: pointer;
}
</style>
