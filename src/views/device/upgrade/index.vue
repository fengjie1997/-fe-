<template>
  <div class="full-hw">
    <fleet-card-table
      :show-left-panel="false"
      :filter-default-data="filterData"
      :filter-field-list="filterFieldList"

      @filter-handle="handleFilter"
      @filter-reset-handle="handleReset"
    >
      <div slot="tool-bar">
        <el-tooltip :content="$t('upgrade.upload')">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="dialogVisible=true" />
        </el-tooltip>
        <el-tooltip :content="$t('upgrade.delete')">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteTableData" />
        </el-tooltip>
        <el-tooltip :content="$t('upgrade.upgrade')">
          <el-button type="primary" size="mini" icon="el-icon-date" @click="dialogVisibleUpFunction" />
        </el-tooltip>
      </div>

      <div slot="main-table" class="full-hw">
        <el-table
          ref="multipleTable"
          v-col-width-limit
          :data="list"
          height="100%"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          @row-dblclick="upDataTableData"
        >
          <el-table-column type="selection" align="center" width="40" fixed />
          <el-table-column label="ID" show-overflow-tooltip width="80" min-width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.type')" show-overflow-tooltip min-width="120" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.deviceType }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('upgrade.upMode')" show-overflow-tooltip min-width="200" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.upgradeType }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('upgrade.version')" show-overflow-tooltip width="120" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.firmwareVersion }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('upgrade.fileType')" width="120" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.fileType }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('upgrade.fileSize')" width="120" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ getSizeTalbe(scope.row.fileSize) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('upgrade.remarks')" min-width="250" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.actions')" fixed="right" width="83" :resizable="false">
            <template slot-scope="scope">
              <el-tooltip :content="$t('upgrade.toDevice')">
                <el-button icon="el-icon-s-tools" @click="handleEditDeviceView(scope.row)" />
              </el-tooltip>
              <el-tooltip :content="$t('upgrade.seeJson')">
                <el-button icon="el-icon-tickets" @click="handleTestPlanView(scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div slot="footer-page">
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="getDeviceList" />
      </div>

    </fleet-card-table>
    <!--弹框部分 -->

    <!-- 添加设备 ·······-->
    <el-dialog
      class="addDevice"
      :title="$t('upgrade.upload')"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <div class="updataEdition" style="height:42vh">
        <el-radio-group v-model="value" style="margin-left:3px">
          <el-radio-button :label="true">{{ $t('upgrade.OnFTP') }}</el-radio-button>
          <el-radio-button :label="false">{{ $t('upgrade.OffFTP') }}</el-radio-button>
        </el-radio-group>
        <div v-show="!value && !nextUpload">
          <el-form ref="form" :model="form" label-width="105px" label-position="left">
            <el-form-item :label="$t('upgrade.fixedVersionfile')">
              <el-upload
                ref="upload"
                class="upload-demo"
                :action="apiUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :auto-upload="false"
                :data="formFTPRemark"
                multiple
                :limit="1"
                :headers="{Authorization:token}"
                :on-exceed="handleExceed"
                :on-change="handleChange"
                :file-list="fileList"
              >
                <el-button size="mini" type="primary">{{ $t('upgrade.upload2') }}</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item :label="$t('upgrade.remarks')">
              <el-input
                v-model="formFTPRemark.remark"
                class="FTPRemark"
                type="textarea"
                resize="none"
                style="width:300px; height: 90px;"
              />
            </el-form-item>
          </el-form>
        </div>
        <div v-show="nextUpload && !value">
          <el-form ref="form" :model="form2" label-width="105px" label-position="left">
            <el-form-item :label="$t('device.deviceType')">
              <el-select v-model="form2.deviceTypeId" :placeholder="$t('device.deviceTypePlaceholder')" style="width:300px">
                <!-- <el-option label="RCU" value="0" /> -->
                <el-option label="SCOUT" value="1" />
                <el-option label="Walktour" value="2" />
                <!--<el-option label="Scout 1.0" value="3" />-->
                <!--<el-option label="Pioneer" value="5" />-->
                <!--<el-option label="Walktour Pack" value="6" />-->
                <!--<el-option label="Scout 2.0" value="8" />-->
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('upgrade.fixedVersion')">
              <el-input v-model="form2.firmwareVersion" style="width:300px" />
            </el-form-item>
            <el-form-item :label="$t('upgrade.manufactor')">
              <el-select v-model="form2.vendor" style="width:300px;">
                <el-option label="DingLi" :value="1" />
                <el-option label="Rising" :value="2" />
                <el-option label="Huaxing" :value="3" />
                <el-option label="Knowyou" :value="4" />
                <el-option label="Ericsson" :value="5" />
                <el-option label="Huawei" :value="6" />
                <el-option label="ZTE" :value="7" />
              </el-select>
            </el-form-item>
            <!-- <el-form-item :label="$t('upgrade.remarks')">
              <el-input
                v-model="form2.remark"
                type="textarea"
                resize="none"
                style="width:300px;"
                class="NoFTPRemark"
              />
            </el-form-item> -->
          </el-form>
        </div>
        <div v-show="value">
          <el-form ref="form2" :model="formFTP" :rules="rules" label-width="105px" label-position="left">
            <el-form-item :label="$t('device.deviceType')">
              <el-select v-model="formFTP.deviceTypeId" :placeholder="$t('device.deviceTypePlaceholder')" style="width:300px">
                <el-option label="RCU" value="0" />
                <el-option label="SCOUT" value="1" />
                <el-option label="Walktour" value="2" />
                <!--<el-option label="Scout 1.0" value="3" />-->
                <!--<el-option label="Pioneer" value="5" />-->
                <!--<el-option label="Walktour Pack" value="6" />-->
                <!--<el-option label="Scout 2.0" value="8" />-->
                <!--<el-option label="RCU Light" value="9" />-->
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('upgrade.fixedVersion')" prop="firmwareVersion">
              <el-input v-model="formFTP.firmwareVersion" style="width:300px" />
            </el-form-item>
            <el-form-item :label="$t('upgrade.severInf')" prop="ftpUrl">
              <el-input v-model="formFTP.ftpUrl" style="width:300px" placeholder="61.0.0.84:22" />
            </el-form-item>
            <el-form-item :label="$t('upgrade.Upgradefiles')" prop="ftpFilePath">
              <el-input v-model="formFTP.ftpFilePath" placeholder="/upgrade-100.1.1.1000" style="width:300px" />
            </el-form-item>
            <el-form-item :label="$t('upgrade.userName')">
              <el-input v-model="formFTP.ftpUser" style="width:300px" />
            </el-form-item>
            <el-form-item :label="$t('upgrade.password')">
              <el-input v-model="formFTP.ftpPwd" style="width:300px" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="saveUpdataUseFTP">{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
    <!-- 修改设备 -->
    <el-dialog
      :title="$t('upgrade.upload')"
      :visible.sync="dialogVisibleUpdata"
      width="500px"
    >
      <div class="updataEdition" style="height:42vh">
        <div v-show="!typeUpdata && upDataAddFileShow">
          <el-form ref="form" :model="form2UpdataFTP" label-width="105px" label-position="left">
            <el-form-item :label="$t('upgrade.remarks')">
              <el-input
                v-model="form2UpdataFTP.remark"
                type="textarea"
                style="width:300px"
              />
            </el-form-item>
          </el-form>
        </div>
        <div v-show="!typeUpdata&&!upDataAddFileShow">
          <el-form ref="form" :model="formUpdata" label-width="105px" label-position="left">
            <el-form-item :label="$t('device.deviceType')">
              <el-input
                v-model="deviceTypeShow"
                style="width:300px"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item :label="$t('upgrade.fixedVersion')">
              <el-input v-model="formUpdata.firmwareVersion" style="width:300px" />
            </el-form-item>
            <el-form-item :label="$t('upgrade.manufactor')">
              <el-select v-model="formUpdata.vendor" style="width:300px">
                <el-option label="DingLi" :value="1" />
                <el-option label="Rising" :value="2" />
                <el-option label="Huaxing" :value="3" />
                <el-option label="Knowyou" :value="4" />
                <el-option label="Ericsson" :value="5" />
                <el-option label="Huawei" :value="6" />
                <el-option label="ZTE" :value="7" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('upgrade.remarks')">
              <el-input
                v-model="formUpdata.remark"
                type="textarea"
                style="width:300px"
              />
            </el-form-item>
          </el-form>
        </div>

        <div v-show="typeUpdata">
          <el-form ref="form2" :model="formUpdataFTP" label-width="105px" label-position="left">
            <el-form-item :label="$t('device.deviceType')">
              <el-input
                v-model="deviceTypeShow"
                style="width:300px"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item :label="$t('upgrade.fixedVersion')">
              <el-input v-model="formUpdataFTP.firmwareVersion" style="width:300px" />
            </el-form-item>
            <el-form-item :label="$t('upgrade.severInf')">
              <el-input v-model="formUpdataFTP.ftpUrl" style="width:300px" placeholder="61.0.0.84:22" />
            </el-form-item>
            <el-form-item :label="$t('upgrade.Upgradefiles')">
              <el-input v-model="formUpdataFTP.ftpFilePath" placeholder="/upgrade-100.1.1.1000" style="width:300px" />
            </el-form-item>
            <el-form-item :label="$t('upgrade.userName')">
              <el-input v-model="formUpdataFTP.ftpUser" style="width:300px" />
            </el-form-item>
            <el-form-item :label="$t('upgrade.password')">
              <el-input v-model="formUpdataFTP.ftpPwd" style="width:300px" />
            </el-form-item>
            <el-form-item :label="$t('upgrade.remarks')">
              <el-input
                v-model="formUpdataFTP.remark"
                style="width:300px"
                type="textarea"
                :rows="4"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleUpdata = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="saveUpdataUseFTPOne">{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
    <!-- 设备升级状况 -->
    <el-dialog
      :title="$t('upgrade.upgrade')"
      :visible.sync="dialogVisibleUp"
      width="900px"
    >
      <span class="headerFout">{{ $t('upgrade.state') }}</span>
      <el-select v-model="listQueryNow.status" :placeholder="$t('upgrade.state')" clearable style="margin-right: 10px">
        <el-option
          v-for="item in options"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
      <!--<el-tabs type="border-card" @tab-click="tabChange">-->
      <!--<el-tab-pane :label="$t('upgrade.situation')">-->
      <span class="headerFout">{{ $t('upgrade.search') }}</span>
      <el-input v-model="listQueryNow.key" size="mini" style="width:200px" />
      <el-button type="primary" @click="dialogVisibleUpFunction">{{ $t('common.query') }}</el-button>
      <el-table
        ref="updataNowTable"
        v-col-width-limit
        border
        :data="tableData"
        height="350px"
        style="overflow:auto;margin-top:1rem"
      >
        <el-table-column
          type="selection"
          width="50"
        />
        <el-table-column
          :label="$t('device.name')"
          prop="deviceName"
          min-width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="deviceTypeId"
          :label="$t('device.type')"
          width="100"
          min-width="100"
          :formatter="TOGetdeviceTypeFormat"
          show-overflow-tooltip
        />
        <el-table-column
          width="100"
          prop="fileType"
          :label="$t('upgrade.fileType')"
          min-width="100"
          show-overflow-tooltip
        />
        <el-table-column
          width="100"
          prop="version"
          :label="$t('upgrade.version')"
          min-width="100"
          show-overflow-tooltip
        />
        <el-table-column
          width="100"
          prop="status"
          :label="$t('upgrade.state')"
          min-width="100"
          :formatter="TOgetDeviceUpgradeState"
          show-overflow-tooltip
        />
        <el-table-column
          prop="applyTime"
          :formatter="toGetTimeFormat"
          :label="$t('upgrade.useTime')"
          min-width="150"
          width="162"
          show-overflow-tooltip
        />
      </el-table>
      <Pagination
        style="margin-top:10px"
        background
        :current-page="listQueryNow.page"
        :page-sizes="[20, 40, 50, 100]"
        :page-size="listQueryNow.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNow"
        @size-change="val => {listQueryNow.limit = val}"
        @current-change="val => { listQueryNow.page = val}"
        @pagination="dialogVisibleUpFunction"
      />
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="disabled" @click="cancleDeviceUp">{{ $t('upgrade.cancleUp') }}</el-button>
        <el-button type="primary" @click="dialogVisibleUp = false">{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
    <!-- 应用到设备· -->
    <el-dialog
      :title="$t('upgrade.upgrade')"
      :visible.sync="dialogVisibletoDevice"
      width="900px"
    >

      <el-input v-model="listQueryUp.searchKey" size="mini" style="width:200px" />
      <el-button type="primary" @click="getDeviceListToDevice">{{ $t('common.query') }}</el-button>
      <el-table
        ref="tableToDevice"
        v-col-width-limit
        border
        :data="tableDataToDevice"
        height="350px"
        style="overflow:auto;margin-top:1rem"
      >
        <el-table-column
          type="selection"
          width="50"
        />
        <el-table-column
          prop="name"
          :label="$t('device.name')"
          width="200"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="deviceType"
          :label="$t('device.deviceType')"
          width="100"
          min-width="100"
          show-overflow-tooltip
        />
        <el-table-column
          width="300"
          prop="identifierGuid"
          :label="$t('device.deviceID')"
          min-width="270"
          show-overflow-tooltip
        />
        <el-table-column
          prop="version"
          :label="$t('upgrade.fixedVersion')"
          show-overflow-tooltip
        />
      </el-table>

      <Pagination
        style="margin-top:10px"
        background
        :current-page="listQueryUp.page"
        :page-sizes="[20, 40, 50, 100]"
        :page.sync="listQueryUp.page"
        :limit.sync="listQueryUp.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalUp"
        @pagination="getDeviceListToDevice"
      />
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="disabled" @click="dialogVisibletoDevice = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="saveToDevice">{{ $t('upgrade.toDeviceUp') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('upgrade.seeJson') "
      :visible.sync="dialogVisibleJSON"
      width="40%"
    >
      <el-input
        v-model="jsonData"
        type="textarea"
        :rows="20"
      />
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleDevice"
      width="40%"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="saveUpdata">{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import js from './index'
export default {
  ...js
}
</script>

<style scoped>
  .FTPRemark  >>>.el-textarea__inner{
    height: 90px;
  }
  .NoFTPRemark  >>>.el-textarea__inner{
    height: 160px;
  }
.addDevice >>> .el-dialog__body{
  height: 480px;
}
.allBox{
  display: grid;
  grid-template-columns: auto;
  grid-template-rows:8% 82% 10%;
  padding: 15px;
  height: 100%;
}
.menu{

}
.page{

}
.updataEdition{
  display: grid;
  grid-template-columns: auto;
  grid-template-rows:15% auto;
}
 .headerFout{
   line-height: 1;
   display: inline-block;
   justify-self: end;
   font-size: 13px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   text-align: right;
   margin-right: 12px;
   color: #222222;
   -webkit-font-smoothing: antialiased;
   text-rendering: optimizeLegibility;
   font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
 }
</style>
