<template>
  <div v-loading="dataRegionLoading" class="network-params-container region-box">
    <split-pane split="vertical" :min-percent="1" :default-percent="15">
      <template slot="paneL" :max-percent="15">
        <el-card class="tree-box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('baseData.areaData') }}</span>
          </div>
          <div class="data-region-tree">
            <el-scrollbar style="height:100%;">
              <el-tree
                ref="regionTree"
                :default-checked-keys="checkedRegionKeys"
                :default-expanded-keys="expandedRegionKeys"
                :data="dataRegionTree"
                :props="props"
                node-key="id"
                check-strictly
                check-on-click-node
                :auto-expand-parent="false"
                show-checkbox
                @check="handleRegionTreeCheck"
                @node-expand="handleNodeExpand"
                @node-collapse="handleNodeCollapse"
              />
            </el-scrollbar>
          </div>
        </el-card>
      </template>
      <template slot="paneR">
        <div class="map-table-container">
          <div class="filter-container">
            <el-input v-model="keyword" :placeholder="$t('baseData.areaName')" style="width: 200px;" class="filter-item" />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="regionFilter">{{ $t('common.search') }}</el-button>
            <el-button class="filter-item" type="primary" icon="el-icon-import" @click="dialogVisible = true">{{ $t('baseData.improveData') }}</el-button>
            <el-button class="filter-item" type="primary" icon="el-icon-import" @click="exportDialogVisible=true"> {{ $t('common.export') }} </el-button>
            <el-button v-if="viewType === 'table' ? true : false " class="filter-item" type="danger" icon="el-icon-import" @click="todeleteData">{{ $t('common.delete') }}</el-button>
            <el-button v-if="viewType === 'table' ? true : false " class="filter-item" type="danger" icon="el-icon-import" @click="todeleteAllData">{{ $t('common.deletedAll') }}</el-button>
            <el-button-group class="filter-item fr">
              <el-button :type="viewType === 'map' ? 'primary' : 'default'" icon="el-icon-location" @click="viewType = 'map'">{{ $t('baseData.map') }}</el-button>
              <el-button :type="viewType === 'table' ? 'primary' : 'default'" icon="el-icon-s-grid" @click="viewType = 'table'">{{ $t('baseData.table') }}</el-button>
            </el-button-group>
          </div>
          <div v-show="viewType === 'map'" class="region-map">
            <standard-map ref="refRegionMap" @successSaveRegion="handleSuccessSaveRegion" />
          </div>
          <div v-show="viewType === 'table'" class="region-table">
            <el-table
              :data="regionTableDataPage"
              border
              height="calc(100vh - 84px - 49px - 62px)"
              style="width: 100%"
              @selection-change="selectDeleteOption"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column prop="name" :label="$t('baseData.areaName')" />
              <el-table-column prop="parentId" :label="$t('baseData.attributionArea')" :formatter="translateParentId" />
              <el-table-column prop="type" :label="$t('baseData.areaType')" :formatter="translateRegionType" />
              <el-table-column :label="$t('baseData.action')" align="center" min-width="110">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" :name="scope.row.name" @click="handleRegionTableEdit(scope.row)">{{ $t('common.edit') }}</el-button>
                  <el-button v-show="scope.row.type !== 0" type="danger" size="mini" :name="scope.row.name" @click="handleDel(scope.row)">{{ $t('common.delete') }}</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="margin-top:10px"
              background
              :current-page="listQuery.page"
              :page-sizes="[20, 50, 100]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="regionCount"
              @size-change="val => {listQuery.limit = val}"
              @current-change="val => { listQuery.page = val}"
            />
          </div>
        </div>
      </template>
    </split-pane>
    <!-- upload -->
    <el-dialog
      :title="$t('baseData.improveAreaData')"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <div v-loading="regionUploading" class="region-uploader">
        <div class="filter-container">
          <el-cascader
            v-model="regionTypeId"
            clearable
            class="filter-item"
            :options="adminRegions"
            :props="{
              label: 'name',
              value: 'id'
            }"
          />
          <el-select v-model="importParams.type" class="filter-item" clearable :placeholder="$t('baseData.areaType')">
            <el-option
              v-for="(item,idx) in regionTypes"
              :key="idx"
              :label="item.name"
              :value="Number(item.code)"
            />
          </el-select>
          <el-upload
            ref="upload"
            class="filter-item region-upload"
            :action="apiUrl"
            :auto-upload="false"
            multiple
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :data="getImportParams"
            :show-file-list="false"
            :on-change="handleChange"
            :headers="{Authorization:token}"
            :file-list="fileList"
          >
            <el-button class="filter-item" size="small" type="primary" @click="uploadState = true">{{ $t('baseData.addFile') }}</el-button>
          </el-upload>
          <el-button class="filter-item" size="small" type="danger" icon="el-icon-delete" @click="handleFileDel">{{ $t('common.deleted') }}</el-button>
          <el-checkbox v-model="importParams.splitMifFile" style="margin-left:15px">{{ $t('baseData.splitRegion') }}</el-checkbox>
        </div>
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
            <el-table-column :label="$t('baseData.details')">
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
      </div>
    </el-dialog>
    <!-- edit -->
    <el-dialog
      :title="$t('baseData.areaEdit')"
      :visible.sync="regionEditVisible"
      width="410px"
    >
      <region-property ref="regionPropertyForm" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="regionEditVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleRegionTableEditSubmit">{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="exportDialogVisible"
      width="30%"
    >
      <el-radio-group v-model="radio" style="margin-bottom:2rem">
        <el-radio label="mif">mif</el-radio>
        <el-radio label="kml">kml</el-radio>
        <el-radio label="kmz">kmz</el-radio>
      </el-radio-group>
      <div>
        <span>是否合并:</span>
        <el-switch
          v-model="checkList"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exportDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportData">确 定</el-button>
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
  .fr{
    float:right
  }
  .region-map {
    height: calc(100vh - 150px);
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
.region-table{
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
.region-tree{
  width:260px;
  .region-tree-ele{
    height: 100%;
    padding: 0px;
  }

}
  .region-box{
    .region-tree-ele{
      height: 100%;
    }
  }
  .data-region-tree{
    height: calc(100vh - 84px - 30px - 55px);
  }
  .filter-container .filter-item{
    margin-bottom: 0;
  }
  .region-uploader {
    margin-bottom: -10px;
    /deep/ .el-dialog__footer {
      padding: 40px 0 0 0;
    }
  }
</style>

