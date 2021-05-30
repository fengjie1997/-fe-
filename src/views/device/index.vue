<template>
  <div class="full-hw">
    <fleet-card-table
      :filter-show-count="2"
      :filter-default-data="listQuery"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"
      @filter-handle="handleFilter"
      @left-refresh-handle="handleRefresh"
    >
      <span slot="left-title">{{ $t('common.groupList') }}</span>
      <div slot="left-tree" class="full-hw scroll-auto">
        <el-tree
          ref="deviceTree"
          class="full-hw"
          :data="treeData"
          :props="deviceProps"
          :expand-on-click-node="false"
          highlight-current
          @node-click="handleNodeClick"
        />
      </div>
      <div slot="tool-bar">
        <el-dropdown v-model="typeId" trigger="click" @command="handleDeviceView">
          <el-tooltip :content="$t('device.addDevice')">
            <el-button type="primary" icon="el-icon-plus" /><!--<i class="el-icon-arrow-down el-icon&#45;&#45;right" />-->
          </el-tooltip>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in deviceType" :key="item.code" :command="item.code" :label="item.name" :value="item.code">{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tooltip :content="$t('device.deleteDevice')">
          <el-button type="danger" icon="el-icon-minus" @click="handleDelete" />
        </el-tooltip>
        <el-tooltip :content="$t('device.importDevice')">
          <el-button type="primary" icon="el-icon-upload2" @click="handleImport" />
        </el-tooltip>
        <el-tooltip :content="$t('device.exportDevice')">
          <el-button type="primary" icon="el-icon-download" @click="handleExport" />
        </el-tooltip>
      </div>
      <div slot="main-table" class="full-hw">
        <el-table
          ref="multipleTable"
          :key="tableKey"
          v-loading="listLoading"
          v-col-width-limit
          :data="list"
          height="100%"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <!-- 数据 -->
          <el-table-column type="selection" align="center" width="40" fixed />
          <el-table-column :label="$t('device.name')" show-overflow-tooltip min-width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.type')" show-overflow-tooltip width="150" min-width="150">
            <template slot-scope="scope">
              <span>{{ getTableDeviceType(scope.row.type) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.deviceStatus')" show-overflow-tooltip width="100" min-width="100">
            <template slot-scope="scope">
              <span :class="{ 'device-online': scope.row.status === 1 }">{{ getDeviceStatus(scope.row.status) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.portCount')" show-overflow-tooltip width="100" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.portCount }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.group')" show-overflow-tooltip min-width="150">
            <template slot-scope="scope">
              <span>{{ getDeviceGroupName(scope.row.groupId) }}</span>
            </template>
          </el-table-column>
          <!--
          <el-table-column :label="$t('device.locked')" width="110" min-width="110">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.locked === 1 ? $t('device.tips.locked'): $t('device.tips.unlocked')">
                <el-switch
                  v-model="scope.row.locked"
                  :active-value="1"
                  :inactive-value="0"
                  @change="handleSwitchLock(scope.$index)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.isDebug')" width="110" min-width="110">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.isDebug === 1 ? $t('device.tips.debugged'): $t('device.tips.notDebugged')">
                <el-switch
                  v-model="scope.row.isDebug"
                  :active-value="1"
                  :inactive-value="0"
                  @change="handleSwitchDebug(scope.$index)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
          -->
          <el-table-column :label="$t('common.actions')" fixed="right" width="83" :resizable="false">
            <template slot-scope="scope">
              <el-tooltip :content="$t('common.edit')">
                <el-button icon="el-icon-edit" @click="handleEditDeviceView(scope.row.type,scope.row.id)" />
              </el-tooltip>
              <el-tooltip :content="$t('device.testPlan')">
                <el-button icon="fe-icon-edit-plan" @click="handleTestPlanView(scope.row.name,scope.row.id,scope.row.type)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer-page">
        <pagination :total="total" :page.sync="pageParams.page" :limit.sync="pageParams.limit" class="dialog-pagination" @pagination="getDeviceList()" />
      </div>
    </fleet-card-table>

    <!-- 测试计划浮窗部分 -->
    <el-popover
      v-model="popoverVisible"
      placement="right"
      trigger="click"
      width="1500"
    >
      <TestPlanListView ref="testPlanListView" />
    </el-popover>
    <div>
      <el-dialog :visible.sync="dialogVisible" width="822px" :before-close="handleClear" :modal-append-to-body="alog" :close-on-click-modal="alog" :title="deviceTitle">
        <add-device-view ref="saveDevice" :type-id="typeId" :parent="this" />
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClear()">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="deviceDialogStatus==='update'?updateDevice():createDevice()">{{ $t('common.save') }}</el-button>
        </div>
      </el-dialog>
    </div>
    <!--新建手机设备，已去除-->
    <!--<el-dialog :visible.sync="deviceDialog2" width="800px" :modal-append-to-body="alog" :close-on-click-modal="alog" :title="$t('device.monitorPhoneDevice')">
<add-monitor-phone-device-view ref="MonitorPhoneDevice" :type-id="typeId" :parent="this" :close-on-click-modal="false"/>
<div slot="footer" class="dialog-footer">
  <el-button @click="handleClear()">{{ $t('common.cancel') }}</el-button>
  <el-button type="primary" @click="monitorPhoneDeviceStatus==='update'?updateDevice():createDevice()">{{ $t('common.confirm') }}</el-button>
</div>
</el-dialog>-->

    <el-dialog
      v-if="dialogVisibleImport"
      :title="$t('device.importDevice')"
      :visible.sync="dialogVisibleImport"
      :modal-append-to-body="false"
      width="50%"
      style="height: 95%"
    >
      <el-upload
        ref="upload"
        style="display:inline-block"
        :limit="1"
        class="upload-demo"
        accept=".xls,.xlsx"
        action=""
        :file-list="fileList"
        :http-request="uploadSectionFile"
        :auto-upload="false"
      >
        <el-button slot="trigger" type="primary" plain>{{ $t('device.selectFile') }}</el-button>
        <div slot="tip" class="el-upload__tip">{{ $t('device.tips.excelFileOnly') }}</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancleImport()">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="submitUpload">{{ $t('device.importDevice') }}</el-button>
      </div>
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
</style>
