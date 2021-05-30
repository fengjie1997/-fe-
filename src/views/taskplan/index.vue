<template>
  <div class="full-hw">
    <fleet-card-table
      :show-left-panel="false"
      :filter-default-data="filterDefaultData"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"
      @filter-handle="handleFilter"
    >
      <div slot="tool-bar">
        <el-tooltip :content="$t('common.set')">
          <el-button type="primary" icon="el-icon-plus" @click="handleTestCreate()" />
        </el-tooltip>
        <el-tooltip :content="$t('common.delete')">
          <el-button type="danger" icon="el-icon-delete" @click="handleDelAll()" />
        </el-tooltip>
        <!-- <el-button type="primary" icon="el-icon-upload">导入</el-button> -->
        <el-tooltip :content="$t('device.updateTaskPlan')">
          <el-button type="primary" icon="el-icon-refresh" @click="handleTestRefresh()" />
        </el-tooltip>
        <el-upload
          class="testplan-upload"
          :headers="authHeader"
          :action="uploadUrl"
          :on-error="handleUploadError"
          accept="xml"
          :on-success="handleUploadSuccess"
          :limit="1"
        >
          <el-tooltip :content="$t('taskPlan.common.exportXml')">
            <el-button type="primary" icon="el-icon-upload" />
          </el-tooltip>
        </el-upload>
      </div>
      <div slot="main-table" class="full-hw">
        <el-table
          ref="testPlan"
          v-loading="listLoading"
          v-col-width-limit
          :data="list"
          border
          height="100%"
          highlight-current-row
        >
          <el-table-column type="selection" align="center" width="40" fixed />
          <template v-for="(item,index) in tableHead[nowTableHead]">
            <el-table-column v-if="item.property !== 'ID'" :key="index" :width="item.width" :min-width="item.minWidth" :prop="item.property" :label="item.label">
              <template slot-scope="scope">
                <!-- 时间 -->
                <span v-if="item.time && scope.row[item.property] !== undefined">{{ scope.row[item.property] | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                <!-- 按钮 -->
                <span v-else-if="item.switch && false">
                  <el-switch
                    v-model="scope.row[item.property]"
                    @change="handleSwitch(scope.row[item.property],scope.row.id)"
                  />
                </span>
                <span v-else>{{ scope.row[item.property] }}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column v-if="nowTableHead === 'active'" :label="$t('common.state')" width="80" fixed="right">
            <template slot-scope="scope">
              <!-- 按钮 -->
              <span>
                <el-switch
                  v-model="scope.row.enable"
                  @change="handleSwitch(scope.row.enable,scope.row.id)"
                />
              </span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column :label="$t('common.actions')" width="158" fixed="right">
            <template slot-scope="scope">
              <el-tooltip :content="$t('common.edit')">
                <el-button icon="el-icon-edit" @click="handleTestEdit(scope.row.id)" />
              </el-tooltip>
              <el-tooltip :content="$t('common.export')">
                <el-button icon="el-icon-download" @click="handleExportXml(scope.row)" />
              </el-tooltip>
              <el-tooltip :content="$t('taskPlan.common.applyToOtherDevices')">
                <el-button icon="el-icon-document-copy" @click="handleApplyToDevices(scope.row)" />
              </el-tooltip>
              <el-tooltip :content="$t('common.delete')">
                <el-button icon="el-icon-delete" plain type="danger" @click="handleDelete(scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer-page">
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="getList" />
      </div>
    </fleet-card-table>
    <!-- 导出配置，生成TXT -->
    <div>
      <el-dialog
        :title="$t('taskPlan.common.exportXML')"
        :visible.sync="exportDialogVisible"
        width="30%"
        center
        :modal-append-to-body="false"
      >
        <el-input
          v-model="configTextArea"
          type="textarea"
          :rows="10"
          :readonly="true"
          placeholder="config"
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="exportDialogVisible = false">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleExportZip(), exportDialogVisible = false">{{ $t('testPlan.genTxtFile') }}</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 抽屉，编辑与新建 【重绘问题】 -->
    <!-- <el-drawer
      :visible.sync="drawer"
      direction="ltr"
      :wrapper-closable="false"
      size="80%"
    >
      <div slot="title" class="drawer-title">
        <img :src="require('@/assets/logo/logo.png')">
        <span>
          {{ $t('testPlan.testPlan') +'：'+ formActName }}
        </span>
      </div>
      <TestPlanEditView />
    </el-drawer> -->
    <!-- 应用测试计划到其他设备 -->
    <el-dialog
      :title="$t('taskPlan.common.applyToOtherDevices')"
      :visible.sync="applyToOtherDevicesDialogVisible"
      width="940px"
      :modal-append-to-body="false"
      class="apply-to-other-devices-dialog"
    >
      <tp-device-list @selection-change="handleDeviceSelectionChange" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="applyToOtherDevicesDialogVisible = false, selectedTaskPlan = undefined">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="applyTaskPlanToDevices">{{ $t('common.save') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import js from './index.js'
export default {
  ...js
}
</script>
<style scoped>
  .testplan-upload {
    display: inline-block;
  }
  .apply-to-other-devices-dialog >>> .el-dialog__body {
    padding: 0 20px;
  }
</style>
