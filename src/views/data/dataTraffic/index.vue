<template>
  <div v-loading="mapLoading" class="network-params-container">
    <split-pane split="vertical" :min-percent="1" :default-percent="15">
      <template slot="paneL">
        <el-card class="tree-box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('route.dataTraffic') }}</span>
          </div>
          <div class="data-traffic-tree">
            <el-scrollbar style="height:100%;">
              <el-tree
                ref="stationTree"
                :default-checked-keys="afterDelete"
                node-key="id"
                :data="stationTree"
                :props="props"
                check-on-click-node
                default-expand-all
                show-checkbox
                @check="handleNodeClick"
              >
                <span slot-scope="{ node, data }">
                  <span class="station-node-label">{{ (typeof(data.roadType) === 'number') ? roadTypeSwitch(data.roadType) + '('+data.count+')': data.name }}</span>
                </span>
              </el-tree>
            </el-scrollbar>
          </div>
        </el-card>
      </template>
      <template slot="paneR">
        <div class="map-table-container">
          <div class="filter-container">
            <el-input v-model="listQuery.roadName" :placeholder="$t('baseData.road')" style="width: 200px;" class="filter-item" />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="mapFilter">{{ $t('common.search') }}</el-button>
            <el-button class="filter-item" type="primary" icon="el-icon-import" @click="dialogVisibleShow">{{ $t('common.import') }}</el-button>
            <el-button v-if="viewType === 'table' ? false : true " class="filter-item" type="danger" icon="el-icon-import" @click="clearop">{{ $t('common.clearSearch') }}</el-button>
            <el-button v-if="viewType === 'table' ? true : false " class="filter-item" type="danger" icon="el-icon-import" @click="todeleteData">{{ $t('common.delete') }}</el-button>
            <el-button v-if="((viewType === 'table') && (listQuery.roadName === undefined )) ? true : false " class="filter-item" type="danger" icon="el-icon-import" @click="todeleteAllData">{{ $t('common.deletedAll') }}</el-button>
            <el-button-group class="filter-item fr">
              <el-button :type="viewType === 'map' ? 'primary' : 'default'" icon="el-icon-location" @click="viewType = 'map'">{{ $t('baseData.map') }}</el-button>
              <el-button :type="viewType === 'table' ? 'primary' : 'default'" icon="el-icon-s-grid" @click="viewType = 'table'">{{ $t('baseData.table') }}</el-button>
            </el-button-group>
          </div>
          <div v-show="viewType === 'map'" class="road-map">
            <RoadMap ref="refRoadMap" :tables="stationTree" :search-params="listParams" :tree="checkedList" />
          </div>
          <div v-show="viewType === 'table'" class="station-table">
            <el-table
              ref="stationTableDatas"
              v-loading="listLoading"
              :data="stationTableData"
              borders
              height="calc(100vh - 84px - 49px - 62px)"
              style="width: 100%"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column prop="areaName" :label="$t('baseData.city')" width="100" />
              <el-table-column :label="$t('baseData.roadName')" prop="name" align="center" min-width="110" show-overflow-tooltip />
              <el-table-column :label="$t('baseData.roadType')" prop="type" :formatter="roadTypeSwitch" align="center" min-width="110" show-overflow-tooltip />
              <el-table-column :label="$t('baseData.roadLength')" prop="length" align="center" min-width="110" show-overflow-tooltip />
              <el-table-column :label="$t('common.actions')" align="center" min-width="110">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" :name="scope.row.name" @click="todeleteDataOne(scope.row)">{{ $t('common.delete') }}</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="margin-top:10px"
              background
              :current-page="listParams.page"
              :page-sizes="[50, 100, 300, 500]"
              :page-size="listParams.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="val => {listParams.limit = val}"
              @current-change="val => { listParams.page = val}"
            />
          </div>
        </div>
      </template>
    </split-pane>
    <!-- 导入弹窗 -->
    <el-dialog
      :title="$t('baseData.improveRoad')"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <div v-loading="trafficUploading" class="traffic-uploader">
        <el-row>
          <el-col :span="6">
            <el-cascader
              v-model="chooseAreaId"
              :options="treeList"
              clearable
              :props="{label:'name',value:'id'}"
            />
          </el-col>
          <el-col :span="6">
            <el-select v-model="valueType" clearable :placeholder="$t('baseData.roadType')">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-upload
              ref="upload"
              class="road-upload"
              multiple
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :auto-upload="false"
              :data="{importType:importType,areaId:chooseAreaId[1],roadType:valueType}"
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
            <!-- <el-table-column prop="msg" :label="$t('common.actions')">
              <template slot-scope="scope">
                <el-button class="filter-item" type="danger" icon="el-icon-delete" @click="handleFileDel(scope.row.$index)">{{ $t('common.deleted') }}</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
        <div class="el-dialog__footer">
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false, fileList = [], uploadState = true">{{ $t('common.cancel') }}</el-button>
            <el-button v-if="uploadState" type="success" :disabled="fileList.length <=0" @click="submitUpload">{{ $t('common.confirmUpload') }}</el-button>
            <el-button v-if="!uploadState" type="success" @click="dialogVisible = false, fileList = [], uploadState = true">{{ $t('tagsView.close') }}</el-button>
          </span>
        </div>
        <!-- <el-radio-group v-model="importType" style="margin-top:10px">
          <el-radio :label="true">{{ $t('baseData.add') }}</el-radio>
          <el-radio :label="false">{{ $t('baseData.cover') }}</el-radio>
        </el-radio-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button>
          <el-button type="success" @click="submitUpload">{{ $t('baseData.upload2') }}</el-button>
        </span> -->
      </div>
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
  .road-map {
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
  .left-container {
    background-color: #F38181;
    height: 100%;
  }

  .right-container {
    background-color: #FCE38A;
    height: 200px;
  }

  .top-container {
    background-color: #FCE38A;
    width: 100%;
    height: 100%;
  }

  .bottom-container {
    width: 100%;
    background-color: #95E1D3;
    height: 100%;
  }
  /* .filter-container{
    padding-top: 5px;
  } */

  .data-traffic-tree {
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
  .road-upload{
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
.traffic-uploader {
  margin-bottom: -10px;
  /deep/ .el-dialog__footer {
    padding: 40px 0 0 0;
  }
}
</style>
