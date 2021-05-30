<template>
  <el-tabs v-model="activeName" style="width: 541px">
    <el-tab-pane :label="$t('report.timeFilter')" name="time">
      <el-table
        ref="timeTable"
        :data="timeFilterList"
        :header-cell-class-name="tableRowClassName"
        border
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="label" class="filter-time-row">
          <template slot="header" slot-scope="scope">
            <el-date-picker
              v-model="timeRegion"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('common.startPlaceholder')"
              :end-placeholder="$t('common.endPlaceholder')"
              value-format="timestamp"
              style="margin-right: 10px"
            />

            <el-tooltip :content="$t('common.add')">
              <el-button type="primary" icon="el-icon-plus" :names="scope.row" @click="handleTimeAdd()" />
            </el-tooltip>
          </template>
          <el-table-column align="left" type="index" width="70" min-width="70" :resizable="false" :label="$t('common.num')" fixed="left" />
          <el-table-column prop="beginTime" :label="$t('common.startPlaceholder')" align="left" show-overflow-tooltip width="140" min-width="140" :resizable="false">
            <template slot-scope="scope">
              {{ formatTimeStamp(scope.row.beginTime) }}
            </template>
          </el-table-column>
          <el-table-column prop="endTime" :label="$t('common.endPlaceholder')" align="left" show-overflow-tooltip width="140" min-width="140" :resizable="false">
            <template slot-scope="scope">
              {{ formatTimeStamp(scope.row.endTime) }}
            </template>
          </el-table-column>
          <el-table-column prop="dateType" :label="$t('common.timeType')" align="left" show-overflow-tooltip width="90" min-width="90" :resizable="false" />
          <el-table-column :label="$t('common.actions')" fixed="right" width="100" :resizable="false">
            <template slot-scope="scope">

              <el-tooltip :content="$t('common.delete')">
                <el-button class="el-padding-5" size="mini" plain icon="el-icon-delete" type="danger" @click="handleDel(scope.$index)" />
              </el-tooltip>

            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <!-- 按区域过滤 -->
    <el-tab-pane :label="$t('report.areaFilter')" name="region">
      <el-table
        ref="regionTable"
        :data="regionFilterList"
        :header-cell-class-name="regionTableRowClassName"
        style="width: 100%"
        border
      >
        <el-table-column label="label">
          <template slot="header" slot-scope="scope">
            <el-select v-model="regionValue" :placeholder="$t('report.selectArea')" class="item-region">
              <el-option-group
                v-for="group in areaList"
                :key="group.id"
                :label="group.name"
              >
                <el-option
                  v-for="item in group.children"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-option-group>
            </el-select>

            <el-tooltip :content="$t('common.add')">
              <el-button type="primary" icon="el-icon-plus" :names="scope.row" @click="addRegion()" />
            </el-tooltip>

          </template>
          <el-table-column align="left" type="index" width="70" min-width="70" :resizable="false" :label="$t('common.num')" fixed="left" />
          <el-table-column prop="beginTime" :label="$t('report.areaName')" min-width="250" align="left">
            <template slot-scope="scope">
              {{ regionIdName[scope.row] }}
            </template>
          </el-table-column>
          <!--<el-table-column prop="endTime" :label="$t('report.uploadTime')" width="250" align="left" />-->
          <el-table-column :label="$t('common.actions')" align="left" show-overflow-tooltip width="90" min-width="90">
            <template slot-scope="scope">
              <el-tooltip :content="$t('common.delete')">
                <el-button size="mini" plain icon="el-icon-delete" type="danger" @click="delRegion(scope.$index)" />
              </el-tooltip>

            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import js from './filter.js'
export default {
  ...js
}
</script>
<style scoped>
  >>>.filter-time-table{
    background: #fff !important;
    padding: 15px 0 !important;
  }
  >>>.filter-region-table{
    background: #fff !important;
    padding: 10px 0 !important;
    height: 30px;
    line-height: 30px;
  }

  >>> .el-button--mini{
    margin: 0;
    padding: 7px 10px;
  }

  .el-padding-5 {
    padding: 5px;
  }

  >>> .el-tabs__header  {
    display: block !important;
  }
</style>
<style lang="less">
.filter-region-table{
  padding: 0 !important;
  .cell{
    padding: 0 !important;
    margin: 5px;
    display: flex !important;
    display: -webkit-flex;
    justify-content:flex-start;
    .item-region{
      margin-right: 10px;
    }
  }
}
</style>
