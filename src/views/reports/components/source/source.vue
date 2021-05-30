<template>
  <div>
    <el-row style="padding-bottom:5px">
      <el-tooltip :content="$t('report.addDataSource')">
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="addRow()" />
      </el-tooltip>

      <el-tooltip :content="$t('report.clearDataSource')">
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="clearRow()" />
      </el-tooltip>
    </el-row>

    <el-table
      v-loading="listLoading"
      v-col-width-limit
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :row-style="{height: '40px'}"
      height="200"
    >
      <!-- 数据 -->
      <el-table-column
        type="index"
        :label="$t('common.num')"
        align="left"
        width="60"
        fixed="left"
        :resizable="false"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200" align="left" :label="$t('common.item')">
        <template slot-scope="{row}">
          <el-cascader
            v-model="row.groupIds"
            :options="groupPro"
            :props="props"
            collapse-tags
            style="width:100%"
            @change="row.isReq = true"
          />
        </template>
      </el-table-column>

      <el-table-column align="left" :label="$t('device.name')" show-overflow-tooltip min-width="260" width="260">
        <template slot-scope="{row}">
          <!-- <el-input v-model="row.title" class="edit-input" size="small" /> -->
          <el-select
            v-model="row.deviceIds"
            style="width:100%"
            filterable
            multiple
            :loading="row.isReq === true"
            collapse-tags
            :placeholder="$t('common.pleaseSelect')"
            @visible-change="fetchDeviceListByGroupIds(arguments,row.groupIds,row)"
          >
            <el-option v-for="item in tmpDeviceOptions[row.uuid]" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column align="left" :label="$t('deviceLog.type')" min-width="200" width="200">
        <template slot-scope="{row}">
          <!-- <el-input v-model="row.title" class="edit-input" size="small" /> -->
          <el-select v-model="row.deviceType" style="width:100%" filterable multiple collapse-tags :placeholder="$t('common.pleaseSelect')">
            <el-option v-for="item in deviceTypeOptions" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </template>
      </el-table-column>

      <!-- <el-table-column  align="left" label="设备名称" width="110">
        <template slot-scope="{row}">
          <el-select v-model="row.deviceName" filterable multiple collapse-tags :placeholder="$t('common.pleaseSelect')">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </template>
      </el-table-column> -->

      <el-table-column align="left" :label="$t('device.portNum')" min-width="150" width="150">
        <template slot-scope="{row}">
          <el-select v-model="row.port" style="width:100%" filterable multiple collapse-tags :placeholder="$t('common.pleaseSelect')">
            <el-option v-for="item in devicePortOptions" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </template>
      </el-table-column>

      <!--  协议版本
      <el-table-column  align="left" label="协议版本" width="110">
        <template slot-scope="{row}">
          <el-select v-model="" filterable multiple collapse-tags :placeholder="$t('common.pleaseSelect')">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </template>
      </el-table-column> -->

      <el-table-column align="left" :label="$t('report.business')" min-width="200" width="200">
        <template slot-scope="{row}">
          <el-select v-model="row.testSummary" style="width:100%" filterable multiple collapse-tags :placeholder="$t('common.pleaseSelect')">
            <el-option v-for="item in testSummaryOptions" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column align="left" :label="$t('reportFile.time')" min-width="340" width="340">
        <template slot-scope="{row}">
          <el-date-picker
            v-model="row.testTime"
            type="datetimerange"
            value-format="timestamp"
            range-separator="-"
            :start-placeholder="$t('common.startPlaceholder')"
            :end-placeholder="$t('common.endPlaceholder')"
            style="width:100%"
          />
        </template>
      </el-table-column>

      <el-table-column align="left" :label="$t('reportFile.operators')" min-width="150" width="150">
        <template slot-scope="{row}">
          <el-select v-model="row.operator" style="width:100%" filterable collapse-tags clearable :placeholder="$t('common.pleaseSelect')">
            <el-option v-for="item in operatorsOptions" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column align="left" :label="$t('reportFile.dataNetTypes')" min-width="200" width="200">
        <template slot-scope="{row}">
          <el-select v-model="row.dataNetTypes" style="width:100%" multiple collapse-tags :placeholder="$t('common.pleaseSelect')">
            <el-option v-for="item in dataNetTypeOptions" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column align="left" :label="$t('device.key')" min-width="110" width="110">
        <template slot-scope="{row}">
          <el-input v-model="row.search" class="edit-input" />
        </template>
      </el-table-column>

      <el-table-column align="left" fixed="right" :label="$t('common.actions')" width="80" :resizable="false">
        <template slot-scope="scope">
          <el-tooltip :content="$t('common.delete')">
            <el-button type="danger" plain icon="el-icon-delete" @click="delRow(scope.$index)" />
          </el-tooltip>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
import js from './source.js'
export default {
  ...js
}
</script>
<style scoped>
  >>> .el-button--mini{
    margin: 0;
    padding: 7px 10px;
  }

</style>
