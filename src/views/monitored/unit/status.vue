<template>
  <div>
    <div class="filter-container">
      <el-select v-model="listQuery.type" style="width: 20%" class="filter-item">
        <el-option v-for="item in statusTableType" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-select v-model="statusListQuery.type" disabled style="width: 20%;display:none;" class="filter-item">
        <el-option v-for="item in statusTableType" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-select v-model="statusListQuery.status" multiple filterable style="width: 20%" class="filter-item">
        <el-option v-for="item in tableStatus" :key="item.value" :label="item.text" :value="item.value" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">{{ $t('common.search') }}</el-button>
    </div>
    <div class="filter-container">
      <el-button-group>
        <el-button class="filter-item" type="primary" icon="el-icon-delete" size="small" @click="getList">{{ $t('tagsView.refresh') }}</el-button>
      </el-button-group>
      <el-button-group>
        <el-button class="filter-item" type="danger" icon="el-icon-delete" size="small" @click="handleDisconnect">{{ $t('device.disconnect') }}</el-button>
      </el-button-group>
      <el-button-group>
        <el-button class="filter-item" type="danger" icon="el-icon-delete" size="small" @click="handleReboot">{{ $t('device.restart') }}</el-button>
      </el-button-group>
      <el-button-group>
        <el-button class="filter-item" type="primary" icon="el-icon-delete" size="small" @click="handleUpatePlan">{{ $t('device.updatePlan') }}</el-button>
      </el-button-group>
      <el-button-group>
        <el-button class="filter-item" type="primary" icon="el-icon-delete" size="small" @click="handlePlay">{{ $t('device.play') }}</el-button>
      </el-button-group>
      <el-button-group>
        <el-button class="filter-item" type="danger" icon="el-icon-delete" size="small" @click="handlePause">{{ $t('device.pause') }}</el-button>
      </el-button-group>
      <el-button-group>
        <el-button class="filter-item" type="danger" icon="el-icon-delete" size="small" @click="handleStop">{{ $t('device.stop') }}</el-button>
      </el-button-group>
      <el-button-group>
        <el-button class="filter-item" type="primary" icon="el-icon-delete" size="small" @click="handleDownload">{{ $t('common.export') }}</el-button>
      </el-button-group>
    </div>

    <el-table
      ref="statusTable"
      v-loading="listLoading"
      :data="list.filter(function(data) {
        if(statusListQuery == []) { return true } // 空的情况下，直接返回
        if (data.status == undefined) { return statusListQuery.status.includes(Number(data.isOnline)) }
        else { return statusListQuery.status.includes(Number(data.status)) }
      })"
      :height="tableHeight"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-bottom:20px"
      @filter-change="handleFilterChange"
    >
      <!-- 数据 -->
      <el-table-column type="selection" align="center" width="40" fixed="left" />
      <el-table-column :label="$t('deviceStatus.name')" fixed="left" align="center" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('deviceStatus.type')" align="center" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('deviceStatus.status')"
        align="center"
        width="110"
        column-key="status"
      >
        <!-- :filters="tableStatus" -->
        <!-- :filter-method="filterTag" -->
        <template slot-scope="scope">
          <span v-if="scope.row.status == undefined ? scope.row.status = scope.row.isOnline : true">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('deviceStatus.onlineDuration')" align="center" width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.onlineDuration > -1">{{ scope.row.onlineDuration }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('deviceStatus.lastLogoutDatetime')" align="center" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.lastLogoutDatetime !== undefined">{{ scope.row.lastLogoutDatetime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('deviceStatus.speed')" align="center" width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.speed > -1">{{ scope.row.speed }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('deviceStatus.longitude')" align="center" width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.realtimeLongitude > -1">{{ scope.row.realtimeLongitude }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('deviceStatus.latitude')" align="center" width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.realtimeLatitude > -1">{{ scope.row.realtimeLatitude }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('deviceStatus.version')" align="center" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.version !== undefined">{{ scope.row.version }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('deviceStatus.system')" align="center" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.systemInfo !== undefined">{{ scope.row.systemInfo }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.actions')" fixed="right" align="center" width="200" class-name="small-padding fixed-width">
        actions
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import statusJs from './status'

export default {
  ...statusJs
}

</script>
