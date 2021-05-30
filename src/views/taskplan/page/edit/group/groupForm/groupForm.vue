<template>
  <el-row :gutter="5">
    <el-col :span="24">
      <el-form ref="form" :model="group" label-width="160px" label-position="right" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务组名称">
              <el-input v-model="group.groupName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="GroupSequence">
              <el-input-number v-model="group.groupSequence" :min="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="同步时间窗">
              <el-switch v-model="group.allModuleSync" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('taskPlan.label.buildOnlyOnePpp')">
              <el-switch v-model="group.buildOnlyOnePpp" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="时间间隔(ms)">
              <el-input-number v-model="group.interval" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="循环次数">
              <el-input-number v-model="group.groupRepeatCount" :min="1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="时间段">
              <el-table
                ref="timeTable"
                :data="group.taskExecuteDurations"
                :header-cell-class-name="tableRowClassName"
                style="width: 72%"
                border
              >
                <el-table-column label="label" class="filter-time-row">
                  <template slot="header" slot-scope="scope">
                    <el-time-picker
                      v-model="timeRegion"
                      is-range
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围"
                      value-format="HH:mm"
                    />
                    <el-button style="margin-left:20px" size="mini" type="primary" :name="scope.row" @click="addTimeRegion()">添加</el-button>
                  </template>
                  <el-table-column align="center" type="index" width="50" label="序号" fixed="left" />
                  <el-table-column prop="startTime" label="开始时间" width="200" align="center" />
                  <el-table-column prop="duration" label="结束时间" width="200" align="center" />
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDel(scope.row)" />
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>

import js from './groupForm.js'
export default {
  ...js
}
</script>
<style>
.filter-time-table{
  background: #fff !important;
  padding: 15px 0px !important;
}
</style>
