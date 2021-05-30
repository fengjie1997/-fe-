<template>
  <div v-loading="mapLoading" class="network-params-container">
    <split-pane split="vertical" :min-percent="1" :default-percent="15">
      <template slot="paneL" :max-percent="15">
        <el-card class="tree-box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('baseData.baseStationData') }}</span>
          </div>
          <div class="base-station-tree">
            <el-scrollbar style="height:100%;">
              <el-tree
                ref="stationTree"
                class="card-tree"
                :default-checked-keys="afterDelete"
                node-key="id"
                :data="baseStationTree"
                :props="props"
                check-on-click-node
                default-expand-all
                show-checkbox
                @check="handleNodeClick"
              >
                <span slot-scope="{ node, data }">
                  <span class="station-node-label">{{ data.city.length > 0 ? data.city :data.province }}（{{ data.count }}）</span>
                </span>
              </el-tree>
            </el-scrollbar>
          </div>
        </el-card>
      </template>
      <template slot="paneR">
        <div class="map-table-container">
          <div class="filter-container">
            <el-input v-model="listParams.cellName" :placeholder="$t('baseData.cellName')" style="width: 200px;" class="filter-item" />
            <el-select v-model="listParams.networkTypes" multiple collapse-tags style="width: 140px" class="filter-item" :placeholder="$t('baseData.networkType')">
              <el-option v-for="item in netTypeOptions" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
            <el-select v-model="listParams.cellTypes" multiple collapse-tags style="width: 140px" class="filter-item" :placeholder="$t('baseData.btsType')">
              <el-option v-for="item in cellOptions" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
            <el-select v-model="listParams.providers" multiple collapse-tags style="width: 140px" class="filter-item" :placeholder="$t('baseData.deviceShop')">
              <el-option v-for="item in providersOp" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('common.search') }}</el-button>
            <el-button class="filter-item" type="primary" icon="el-icon-import" @click="dialogVisible = true">{{ $t('baseData.improve') }}</el-button>
            <el-button class="filter-item" type="primary" icon="el-icon-import" @click="exportData">{{ $t('common.export') }}</el-button>
            <el-button v-if="viewType === 'table' ? true : false " class="filter-item" type="danger" icon="el-icon-import" @click="todeleteData">{{ $t('common.deleted') }}</el-button>
            <el-button v-if="viewType === 'table' ? true : false " class="filter-item" type="danger" icon="el-icon-import" @click="todeleteAllData">{{ $t('common.deletedAll') }}</el-button>
            <el-button-group class="filter-item fr">
              <el-button :type="viewType === 'map' ? 'primary' : 'default'" icon="el-icon-location" @click="viewType = 'map'">{{ $t('baseData.map') }}</el-button>
              <el-button :type="viewType === 'table' ? 'primary' : 'default'" icon="el-icon-s-grid" @click="viewType = 'table'">{{ $t('baseData.table') }}</el-button>
            </el-button-group>
          </div>
          <div v-show="viewType === 'map'" class="station-map">
            <StationMap ref="refCellMap" :tables="lookupTableData" :search-params="listParams" :tree="checkedList" />
          </div>
          <div v-show="viewType === 'table'" v-loading="listLoading" class="station-table">
            <el-table
              ref="stationTableDatas"
              :data="stationTableData"
              border
              height="calc(100vh - 84px - 49px - 62px)"
              style="width: 100%"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column prop="province" :label="$t('baseData.province')" width="100" fixed />
              <el-table-column prop="city" :label="$t('baseData.city')" width="100" fixed />
              <el-table-column :label="$t('baseData.btsName')" prop="btsName" align="center" min-width="110" show-overflow-tooltip />
              <el-table-column :label="$t('baseData.cellName')" prop="cellName" align="center" min-width="110" show-overflow-tooltip />
              <el-table-column :label="$t('baseData.rruName')" prop="rruName" align="center" min-width="110" show-overflow-tooltip />
              <el-table-column :label="$t('baseData.lac')" prop="lac" align="center" min-width="110" show-overflow-tooltip />
              <el-table-column :label="$t('baseData.cellId')" prop="cellId" align="center" min-width="110" />
              <el-table-column :label="$t('baseData.sectorId')" prop="sectorId" align="center" min-width="110" />
              <el-table-column :label="$t('baseData.earfcn')" prop="earfcn" align="center" min-width="110" />
              <el-table-column :label="$t('baseData.cpi')" prop="cpi" align="center" min-width="110" />
              <el-table-column :label="$t('baseData.azimuth')" prop="azimuth" align="center" min-width="110" />
              <el-table-column :label="$t('baseData.networkType')" prop="networkType" align="center" min-width="110" />
              <el-table-column :label="$t('baseData.btsType')" prop="outdoorIndoor" align="center" min-width="110" />
              <el-table-column :label="$t('baseData.deviceShop')" prop="provider" align="center" min-width="110" />
              <el-table-column :label="$t('common.actions')" align="center" min-width="210">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" :name="scope.row.name" @click="Edit(scope.row)">{{ $t('common.edit') }}</el-button>
                  <el-button type="danger" size="mini" :name="scope.row.name" @click="todeleteDataOne(scope.row)">{{ $t('common.delete') }}</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="margin-top:10px"
              background
              :current-page="listQuery.page"
              :page-sizes="[50, 100, 300, 500]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="val => {listQuery.limit = val}"
              @current-change="val => { listQuery.page = val}"
            />
          </div>
        </div>
      </template>
    </split-pane>
    <el-dialog
      :title="$t('baseData.improveData')"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <div v-loading="stationUploading" class="station-uploader">
        <el-row>
          <el-col :span="3">
            <el-upload
              ref="upload"
              class="cell-upload"
              multiple
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :auto-upload="false"
              :data="{importType:importType,modelType:0}"
              :headers="{Authorization:token}"
              :action="apiUrl"
              :show-file-list="false"
              :file-list="fileList"
              :on-change="handleChange"
            >
              <el-button class="filter-item" size="mini" type="primary" @click="uploadState = true">{{ $t('baseData.addFile') }}</el-button>
            </el-upload>
          </el-col>
          <el-col :span="3">
            <el-button class="filter-item" type="danger" icon="el-icon-delete" @click="handleFileDel">{{ $t('common.deleted') }}</el-button>
          </el-col>
        </el-row>
        <div>
          <el-table ref="fileTable" :data="fileList" fit style="width: 100%" @selection-change="selectionChange">
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column type="index" />
            <el-table-column prop="name" :label="$t('common.name')" />
            <el-table-column prop="status" :label="$t('common.state')" />
            <el-table-column prop="response.code" :formatter="codeTO" :label="$t('baseData.uploadResult')" />
            <el-table-column prop="response" :label="$t('baseData.details')">
              <template slot-scope="scope">
                <span>{{ getMessage(scope.row.response) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-radio-group v-model="importType" style="margin-top:10px">
          <el-radio :label="0">{{ $t('baseData.add') }}</el-radio>
          <el-radio :label="1">{{ $t('baseData.cover') }}</el-radio>
        </el-radio-group>
        <div class="el-dialog__footer">
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false, fileList = [], uploadState = true">{{ $t('common.cancel') }}</el-button>
            <el-button v-if="uploadState" type="success" :disabled="fileList.length <=0" @click="submitUpload">{{ $t('common.confirmUpload') }}</el-button>
            <el-button v-if="!uploadState" type="success" @click="dialogVisible = false, fileList = [], uploadState = true">{{ $t('tagsView.close') }}</el-button>
          </span>
        </div>
      </div>
    </el-dialog>
    <!-- 基站的编辑 -->
    <el-dialog :title="$t('baseData.btsEdit')" :visible.sync="editShow">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ $t('baseData.baseInformation') }}</span>
        </div>
        <el-form :model="editStationData" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label=" $t('baseData.province')">
                <span>  {{ editStationData.province }}  </span>
              </el-form-item>
            </el-col>
            <el-form-item :label=" $t('baseData.city')">
              <span>   {{ editStationData.city }} </span>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label=" $t('baseData.cellName')">
                <span>  {{ editStationData.cellName }} </span>
              </el-form-item>
            </el-col>
            <el-form-item :label="$t('baseData.cell')">
              <span> {{ editStationData.district }}</span>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('baseData.btsName')">
                <span>  {{ editStationData.btsName }} </span>
              </el-form-item>
            </el-col>
            <el-form-item :label="$t('baseData.btsID')">
              <span> {{ editStationData.cellId }}</span>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('baseData.networkType')">
                <span>  {{ editStationData.networkType }} </span>
              </el-form-item>
            </el-col>
            <el-form-item label="TAC:">
              <span> {{ editStationData.id }}</span>
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="box-card" style="margin-top:20px">
        <div slot="header" class="clearfix">
          <span>{{ $t('baseData.cellInf') }}</span>
        </div>
        <el-form :model="editStationData" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="PCI">
                <el-input
                  v-model="editStationData.cpi"
                  style="width:170px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('baseData.azimuth')">
                <el-input-number v-model="editStationData.azimuth" :min="0" :max="360" :label="$t('baseData.azimuth')" style="width:170px" @change="handleChange" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('baseData.longitude')">
                <el-input-number v-model="editStationData.longitude" :precision="4" :step="0.0001" style="width:170px" :max="180" :min="-180" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('baseData.latitude')">
                <el-input-number v-model="editStationData.latitude" style="width:170px" :precision="4" :step="0.0001" :max="90" :min="-90" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('baseData.cellStatus')">
                <el-select v-model="editStationData.cellStatus" :placeholder="$t('common.pleaseSelect')">
                  <el-option value="Active" label="Active" />
                  <el-option value="Block" label="Block" />
                  <el-option value="Breakdown" label="Breakdown" />
                  <el-option value="Remove" label="Remove" />
                  <el-option value="Plan" label="Plan" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('baseData.outdoorIndoor')">
                <el-select v-model="editStationData.outdoorIndoor" :placeholder="$t('common.pleaseSelect')">
                  <el-option value="Outdoor" label="Outdoor" />
                  <el-option value="Indoor" label="Indoor" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('baseData.coverType')">
                <el-select v-model="editStationData.coverType" :placeholder="$t('common.pleaseSelect')">
                  <el-option value="Urban" label="Urban" />
                  <el-option value="Suburban" label="Suburban" />
                  <el-option value="County" label="County" />
                  <el-option value="Countryside" label="Countryside" />
                  <el-option value="Highway" label="Highway" />
                  <el-option value="Railroad" label="Railroad" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-row>
        <el-col :offset="21">
          <el-button type="primary" style="margin-top:20px" @click="submit">{{ $t('baseData.submit') }}</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      :title="$t('common.export')"
      :visible.sync="exportShow"
      width="30%"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ $t('baseData.city') }}</span>
        </div>
        <el-checkbox-group v-model="cityOption">
          <el-checkbox v-for="city in cityList" :key="city" style="margin-top:10px" :label="city">{{ city }}</el-checkbox>
        </el-checkbox-group>
      </el-card>
      <!-- <el-card class="box-card" style="margin-top:20px">
        <div slot="header" class="clearfix">
          <span>网络类型</span>
        </div>
        <el-radio-group v-model="network">
          <el-radio v-for="network in netTypeList" :key="network" style="margin-top:10px;margin-left:3px" :label="network">{{ network }}</el-radio>
        </el-radio-group>
      </el-card> -->

      <el-button type="primary" style="margin-top:20px" @click="submitExport">{{ $t('common.export') }}</el-button>
      <el-button type="primary" style="margin-top:20px" @click="exportShow = false">{{ $t('common.cancel') }}</el-button>
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
  .fr{
    float:right
  }
  .station-map {
    height: 100%;
    width: 100%;
  }
  .station-node-label{
    font-size: 14px;
    padding-left: 10px;
  }
  .network-params-container{
    padding: 15px;
    position: relative;
    height: calc(100vh - 84px);
  }
  .map-table-container{
    padding-left: 10px;
  }
  .base-station-tree {
    height: calc(100vh - 84px - 30px - 55px);
  }
</style>
<style lang="less" scoped>
.network-params-container{
  .vue-splitter-container{
    .splitter-pane-resizer{
      background: #C0C4CC;
      width: 1px;
      height: 100%;
      border-left: 0px solid hsla(0,0%,100%,0);
      border-right: 0px solid hsla(0,0%,100%,0);
      cursor: col-resize;
      }
  }
  }
.station-table{
    margin-bottom: 10px;
  }
  .cell-upload{
    .el-upload {
      width: 100%;
      .el-upload-dragger{
      width: 100%;
    }
    }
  }

.filter-container .filter-item{
  margin-bottom: 0;
}
.station-uploader {
  margin-bottom: -10px;
  /deep/ .el-dialog__footer {
    padding: 40px 0 0 0;
  }
}
</style>
