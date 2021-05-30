<template>
  <div class="port-list-view">
    <el-table
      ref="portListTable"
      v-col-width-limit
      height="100%"
      style="width: 100%"
      row-key="id"
      :data="portList"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column type="index" width="50" />
      <el-table-column :label="$t('uploadFileList.port')" width="150">
        <template slot-scope="scope">
          {{ handleNetType(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.actions')" width="110">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            :disabled="modemPort ? scope.row.portNumber === modemPort : scope.row.portNumber === 1"
            :active-value="1"
            :inactive-value="0"
            @change="handlePortStatus(scope.row)"
          />
          <el-tooltip :content="$t('common.edit')">
            <el-button
              icon="el-icon-edit"
              @click.stop.native="handlePortEdit(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!--端口编辑窗口-->
    <el-dialog
      :title="(schemaInfoVo.portNumber ? schemaInfoVo.portNumber + ' ' : '') + $t('taskPlan.title.portBasicConfig')"
      :visible.sync="portFormVisible"
      width="500px"
    >
      <el-form :model="schemaInfoVo" label-width="150px" label-position="left">
        <el-form-item :label="$t('taskPlan.label.schemaName')">
          <el-input v-model="schemaInfoVo.schemaName" />
        </el-form-item>
        <el-form-item :label="$t('taskPlan.label.deviceModel')">
          {{ schemaInfoVo.deviceModel }}
        </el-form-item>
        <el-form-item :label="$t('taskPlan.label.portDeviceType')">
          {{ formatPortDeviceName(schemaInfoVo.portDeviceType) }}
        </el-form-item>
        <el-form-item :label="$t('taskPlan.label.networkType')">
          {{ formatNetworkType(schemaInfoVo.netWorkType) }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="portFormVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="savePortBasicConfig">{{ $t('common.save') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import js from './port.js'
export default {
  ...js
}
</script>
<style scoped>
.port-list-view {
  height: 100%;
  width: 100%;
}
.port-list-view table tbody tr{
  cursor: pointer;
}
.el-table >>> .el-button,
.el-table >>> .el-button--mini {
  margin-left: 10px;
  padding: 5px;
}
</style>
