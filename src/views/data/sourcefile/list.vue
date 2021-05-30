<template>
  <div class="full-hw">
    <fleet-card-table
      :filter-show-count="2"
      :filter-default-data="listParam"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"
      @filter-handle="handleFilter"
      @left-refresh-handle="handleRefresh"
    >
      <span slot="left-title">{{ $t('common.groupList') }}</span>
      <div slot="left-tree" class="full-hw scroll-auto">
        <el-tree
          ref="deviceTree"
          :data="deviceGroupList"
          :props="deviceProps"
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          @node-click="handleSelectGroupId"
        />
      </div>
      <div slot="tool-bar">
        <el-tooltip :content="$t('common.delete')">
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete()" />
        </el-tooltip>
        <el-tooltip :content="$t('common.blukdownload')">
          <el-button type="primary" icon="el-icon-download" @click="handleBlukdownload()" />
        </el-tooltip>
        <el-tooltip :content="$t('baseData.exportList')">
          <el-button type="primary" icon="fe-icon-export" @click="handleExportSourcefile" />
        </el-tooltip>
        <el-tooltip :content="$t('baseData.setFile')">
          <el-button type="primary" icon="fe-icon-property" @click="setTags()" />
        </el-tooltip>
      </div>
      <div slot="main-table" class="full-hw">
        <el-table
          v-loading="listLoading"
          v-col-width-limit
          :data="list"
          border
          fit
          style="width: 100%;"
          height="100%"
          @selection-change="handleSelectionChange"
        >
          <!-- 数据 -->
          <el-table-column type="selection" align="center" width="40" fixed />
          <el-table-column :label="$t('device.name')" align="left" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.deviceName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('group.name')" width="150" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.groupName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('sourcefile.filename')" min-width="350" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.fileName }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="文件名称(非正式)" width="130">
            <template slot-scope="scope">
              <span>{{ scope.row.filename }}</span>
            </template>
          </el-table-column>-->
          <el-table-column :label="$t('sourcefile.fileSize')" width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.fileSize | numberFormatter }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="数据分组" align="center" width="130">
            <template slot-scope="scope">
              <span>{{ getTableDeviceGroupId(scope.row.groupId) }}</span>
            </template>
          </el-table-column>-->
          <el-table-column :label="$t('template.testType')" width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.testType }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.deviceType')" min-width="100" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.deviceType }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('report.uploadTime')" width="150" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="font-size:9pt">{{ getTimes(scope.row.createDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('report.testStartDate')" width="150" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="font-size:9pt">{{ getTimes(scope.row.testStartDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('report.testEndDate')" width="150" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="font-size:9pt">{{ getTimes(scope.row.testEndDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('sourcefile.status')" width="80" min-width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ testDataStatusFormat(scope.row.testDataStatus) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('sourcefile.disable')" width="120" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.isAbnormal === 1 ? $t('baseData.abnormal') : $t('baseData.normal') }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column :label="$t('sourcefile.validate')" align="left" min-width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.testDataValidateType }}</span>
            </template>
          </el-table-column>-->
          <el-table-column :label="$t('common.actions')" fixed="right" width="83" :resizable="false">
            <template slot-scope="scope">
              <el-tooltip :content="$t('common.download')">
                <el-button icon="el-icon-download" @click="handleDownload(scope.row)" />
              </el-tooltip>
              <el-tooltip :content="$t('baseData.reDecode')">
                <el-button icon="el-icon-refresh-left" @click="redecode(scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer-page">
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList()" />
      </div>
    </fleet-card-table>
    <el-dialog
      v-if="dialogVisible"
      :title="title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :width="width"
      style="height: 95%"
    >
      <div class="filter-container">
        <el-form ref="dataForm" :model="tagModel" label-position="left" label-width="150px" style="width: auto; margin-left:50px;">
          <el-form-item :label="$t('baseData.file1')" prop="tag1" style="width: 80%">
            <el-input v-model="tagModel.tag1" />
          </el-form-item>
          <el-form-item :label="$t('baseData.file2')" prop="tag2" style="width: 80%">
            <el-input v-model="tagModel.tag2" />
          </el-form-item>
          <el-form-item :label="$t('baseData.file3')" prop="tag3" style="width: 80%">
            <el-input v-model="tagModel.tag3" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm()">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="saveTags('dataForm')">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import js from './list'
export default {
  ...js
}
</script>
<style scoped>
</style>
