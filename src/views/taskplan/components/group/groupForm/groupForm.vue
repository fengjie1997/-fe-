<template>
  <el-form ref="form" :model="group" label-width="300px" label-position="left">
    <el-form-item :label="$t('taskPlan.label.taskGroupName')">
      <el-input v-model="group.groupName" style="width: 350px;" />
    </el-form-item>
    <el-form-item :label="$t('taskPlan.label.groupSequence')">
      <el-input-number v-model="group.groupSequence" :min="0" style="width: 350px;" />
    </el-form-item>
    <el-form-item :label="$t('taskPlan.label.synchronizationTimeWindow')">
      <el-switch v-model="group.allModuleSync" :active-value="1" :inactive-value="0" />
    </el-form-item>
    <el-form-item :label="$t('taskPlan.label.buildOnlyOnePpp')">
      <el-switch v-model="group.buildOnlyOnePpp" :active-value="1" :inactive-value="0" />
    </el-form-item>
    <el-form-item :label="$t('taskPlan.label.numberOfCycles')">
      <el-input-number v-model="group.groupRepeatCount" :min="1" style="width: 350px;" />
    </el-form-item>
    <el-form-item :label="$t('taskPlan.label.timeslot')">
      <el-table
        ref="timeTable"
        v-col-width-limit
        :data="group.taskExecuteDurations"
        :header-cell-class-name="tableRowClassName"
        style="width: 500px;"
        border
      >
        <el-table-column label="label" class="filter-time-row">
          <template slot="header" slot-scope="scope">
            <el-select
              v-model="timeRegion[0]"
              style="width: 180px"
              :placeholder="$t('analyze.placeholder.startDt')"
              @change="startTimeChange"
            >
              <el-option v-for="item in startTimeOptions" :key="item.key" :label="item.label" :value="item.value" />
            </el-select>
            -
            <el-select
              v-model="timeRegion[1]"
              style="width: 180px"
              :placeholder="$t('analyze.placeholder.endDt')"
            >
              <el-option v-for="item in endTimeOptions" :key="item.key" :label="item.label" :value="item.value" />
            </el-select>
            <el-tooltip :content="$t('common.add')">
              <el-button icon="el-icon-plus" style="margin-left:20px" type="primary" :name="scope.row" @click="addTimeRegion()" />
            </el-tooltip>
          </template>
          <el-table-column type="index" width="60" :label="$t('common.num')" fixed="left" min-width="60" />
          <el-table-column prop="startTime" :label="$t('analyze.placeholder.startDt')" min-width="100" />
          <el-table-column prop="duration" :label="$t('analyze.placeholder.endDt')" min-width="100" />
          <el-table-column :label="$t('common.actions')" fixed="right" :resizable="false" width="70">
            <template slot-scope="scope">
              <el-tooltip :content="$t('common.delete')">
                <el-button type="danger" plain icon="el-icon-delete" @click="handleDel(scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
</template>
<script>

import js from './groupForm.js'
export default {
  ...js
}
</script>
<style scoped>
  .el-table >>> .el-table__body .el-button,
  .el-table >>> .el-table__body .el-button--mini {
    padding: 5px;
  }
  .el-table >>> .filter-time-table{
    background: #fff;
    padding: 10px 0 !important;
  }
  .el-table >>> thead.is-group th {
    background: #fff;
  }
</style>
