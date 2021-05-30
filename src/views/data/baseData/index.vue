<template>
  <div>
    <!-- 区域编辑弹框 -->
    <el-dialog title="编辑" :visible.sync="editCellShow">
      <el-form ref="editCellDto" :model="editCellDto">
        <el-card class="cellCard">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
            <el-button style="float: right; padding: 3px 0" type="text">刷新</el-button>
          </div>
          <div class="text item">
            <el-row>
              <el-col :span="12">
                <el-form-item label="省份" label-width="80px">
                  <el-input v-model="editCellDto.province" :disabled="true" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="城市" label-width="80px">
                  <el-input v-model="editCellDto.city" :disabled="true" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="小区名称" label-width="80px">
                  <el-input v-model="editCellDto.cellName" :disabled="true" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="基站名称" label-width="80px">
                  <el-input v-model="editCellDto.cellName" :disabled="true" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="区" label-width="80px">
                  <el-input v-model="editCellDto.district" :disabled="true" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="基站ID" label-width="80px">
                  <el-input v-model="editCellDto.sectorId" :disabled="true" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="网络类型" label-width="80px">
                  <el-input v-model="editCellDto.networkType" :disabled="true" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="LAC" label-width="80px">
                  <el-input v-model="editCellDto.lac" :disabled="true" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="cellCard" style="margin-top:20px">
          <div slot="header" class="clearfix">
            <span>小区信息</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">刷新</el-button> -->
            <el-button type="text" style="float: right; padding: 3px 0" @click="updeteEditCell">保存</el-button>
          </div>
          <div class="text item">
            <el-row>
              <el-col :span="12">
                <el-form-item label="PN" label-width="80px">
                  <el-input-number v-model="editCellDto.cpi" :min="1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="方位角" label-width="80px">
                  <el-input-number v-model="editCellDto.azimuth" :min="1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="经度" label-width="80px">
                  <el-input-number v-model="editCellDto.longitude" :precision="5" :step="0.00001" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="纬度" label-width="80px">
                  <el-input-number v-model="editCellDto.latitude" :precision="5" :step="0.00001" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="扇形状态" label-width="80px">
                  <el-select v-model="editCellDto.cellStatus">
                    <el-option
                      label="Active"
                      value="Active"
                    />
                    <el-option
                      label="Block"
                      value="Block"
                    />
                    <el-option
                      label="Breakdown"
                      value="Breakdown"
                    />
                    <el-option
                      label="Remove"
                      value="Remove"
                    />
                    <el-option
                      label="Plan"
                      value="Plan"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="室内/室外" label-width="80px">
                  <el-select v-model="editCellDto.outdoorIndoor">
                    <el-option
                      label="Outdoor"
                      value="Outdoor"
                    />
                    <el-option
                      label="Indoor"
                      value="Indoor"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="15">
                <el-form-item label="覆盖区域类型" label-width="80px">
                  <el-select v-model="editCellDto.coverType">
                    <el-option
                      label="Urban"
                      value="Urban"
                    />
                    <el-option
                      label="Suburban"
                      value="Suburban"
                    />
                    <el-option
                      label="County"
                      value="County"
                    />
                    <el-option
                      label="Countryside"
                      value="Countryside"
                    />
                    <el-option
                      label="Heighway"
                      value="Heighway"
                    />
                    <el-option
                      label="Railrode"
                      value="Railrode"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>

          </div>
        </el-card>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div> -->
    </el-dialog>
    <el-dialog title="区域编辑" :visible.sync="areaEdit">
      <el-form :model="areaform">
        <el-form-item label="区域名称" :label-width="formLabelWidth">
          <el-input v-model="areaform.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="归属区域" :label-width="formLabelWidth">
          <el-select v-model="areaform.areaChooseData" collapse-tags placeholder="区域归属">
            <el-option v-for="item in getAreaDate" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="区域级别" :label-width="formLabelWidth">
          <el-select v-model="areaform.regionLevel" collapse-tags placeholder="区域级别">
            <el-option label="国家" value="0" />
            <el-option label="省" value="1" />
            <el-option label="市" value="2" />
            <el-option label="区/县" value="3" />
            <el-option label="乡/镇" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="行政级别" :label-width="formLabelWidth">
          <el-select v-model="areaform.level" collapse-tags placeholder="行政级别">
            <el-option label="A类(VIP区域)" value="0" />
            <el-option label="B类(重点区域)" value="1" />
            <el-option label="C类(V普通区域)" value="2" />
            <el-option label="D类(低关注区域)" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="线条宽度" :label-width="formLabelWidth">
          <el-slider
            v-model="areaform.lineWidth"
            show-input
          />
        </el-form-item>
        <el-form-item label="填充颜色" :label-width="formLabelWidth">
          <el-color-picker v-model="areaform.fillColor" />
        </el-form-item>
        <el-form-item label="选透明度" :label-width="formLabelWidth">
          <el-slider
            v-model="areaform.opacity"
            :max="1"
            :step="0.01"
            show-input
          />
        </el-form-item>
        <el-form-item label="线条颜色" :label-width="formLabelWidth">
          <el-color-picker v-model="areaform.lineColor" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="areaEdit = false">取 消</el-button>
        <el-button type="primary" @click="areaEdit = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-row>
      <!--侧边-->
      <el-col :span="4">
        <el-card class="box-card" shadow="always">
          <div slot="header" class="clearfix">
            <span>管理列表</span>
            <el-button style="float: right; padding: 3px 0" type="text" class="el-icon-refresh">刷新</el-button>
          </div>
          <div>
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  基站管理
                </template>
                <div class="cell-header-button">
                  <span>{{ nowSelect }}</span>
                </div>
                <div>
                  <el-tree
                    ref="cellTree"
                    :data="cellTrueData"
                    node-key="id"
                    default-expand-all
                    :props="defaultProps"
                  >
                    <span slot-scope="{ node, data }" class="custom-tree-node">
                      <span>{{ data.networkType }}{{ data.name }}（{{ data.count }}）</span>
                      <span>
                        <el-button
                          type="text"
                          size="mini"
                          @click="() => cellSwitchList(node,data)"
                        >
                          切换
                        </el-button>
                      </span>
                    </span>
                  </el-tree>
                </div>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  区域管理
                </template>
                <el-button-group>
                  <el-button class="btn" type="primary" @click="areaImportDialog = true">添加</el-button>
                  <el-button class="btn" type="primary" @click="areaSwitchList">编辑</el-button>
                  <el-button class="btn" type="primary" @click="daoChu">导出</el-button>
                  <el-button class="btn" type="danger" @click="getdeleteAreaByIds">删除</el-button>
                </el-button-group>
                <el-tree ref="areaTree" :data="listData" :props="defaultProps" show-checkbox node-key="id">
                  <span slot-scope="{ node, data }" class="custom-tree-node">
                    <span>{{ data.name }}{{ data.type }}</span>
                  </span>
                </el-tree>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  道路管理
                </template>
                <el-tree ref="roadTree" :data="roadListData" :props="roadDefaultProps" node-key="id">
                  <span slot-scope="{ node, data }" class="custom-tree-node">
                    <span>{{ data.name }}</span>
                    <!-- <span>{{ data }}</span> -->
                    <span>
                      <el-button
                        type="text"
                        size="mini"
                        @click="() => roadRailwaySwitchList(node,data)"
                      >
                        编辑
                      </el-button>
                    </span>
                  </span>
                </el-tree>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="20">
        <div>
          <!-- 地图 -->
          <el-card class="box-card" :style="mappagestyle">
            <div :style="mappagestyle">
              <Map />
            </div>
          </el-card>
          <!-- road -->
          <el-card v-show="roadCardShow" style="height:340px" class="box-card">
            <div style="margin-bottom:1rem">
              <el-button class="filter-items" type="primary" icon="el-icon-delete" @click="roadImportDialog = true ">导入</el-button>
              <el-button class="filter-items" type="danger" icon="el-icon-delete" @click="roadCardShow = false ,mappagestyle.height = '850px'">关闭</el-button>
            </div>
            <el-table :data="gridData" max-height="200" border>
              <el-table-column property="areaName" label="区域" width="150" />
              <el-table-column property="name" label="名称" width="400" />
              <el-table-column property="type" label="类型" width="100" />
              <el-table-column property="length" label="长度" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="find(scope.$index, scope.row)"
                  >定位</el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination :total="roadListParams.total" :page.sync="roadListParams.pageIndex" :limit.sync="roadListParams.pageSize" class="dialog-pagination" @pagination="roadPassPage" />
          </el-card>
          <!-- 基站弹出 -->
          <el-card v-show="cellcardShow" style="height:340px" class="box-card">
            <div style="margin-bottom:1rem">
              <el-button class="filter-items" type="primary" icon="el-icon-folder-add" @click="stationImportDialog = true">{{ $t('common.import') }}</el-button>
              <el-button class="filter-items" type="primary" icon="el-icon-delete" @click="exportCell()">导出</el-button>
              <el-button class="filter-items" type="danger" icon="el-icon-delete" @click="handleCellDelete()">{{ $t('common.deleted') }}</el-button>
              <el-button class="filter-items" type="danger" icon="el-icon-close" @click="cellcardShow = false ,mappagestyle.height = '850px'">关闭</el-button>

            </div>
            <el-table
              ref="cellListTable"
              v-loading="cellListLoading"
              :data="cellDetailList"
              border
              height="170"
              fit
              highlight-current-row
              style="width: 100%;"
            >
              <!-- 数据 -->
              <el-table-column
                type="selection"
                width="40"
              />
              <el-table-column :label="$t('baseData.province')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.province }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.city')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.city }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.btsName')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.btsName }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.cellName')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.cellName }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.rruName')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.rruName }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.lac')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.lac }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.cellId')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.cellId }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.sectorId')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.sectorId }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.earfcn')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.earfcn }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.cpi')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.cpi }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.azimuth')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.azimuth }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.cellStatus')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.cellStatus }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.outdoorIndoor')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.outdoorIndoor }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.coverType')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.coverType }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.latitude')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.latitude }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.longitude')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.longitude }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.networkType')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.networkType }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.cgi')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.cgi }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.altitude')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.altitude }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.btsId')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.btsId }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.bands')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.bands }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.mechanicalDowntilt')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.mechanicalDowntilt }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.electronicDowntilt')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.electronicDowntilt }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.provider')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.provider }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('baseData.groundHeight')" align="center" min-width="110">
                <template slot-scope="scope">
                  <span>{{ scope.row.groundHeight }}</span>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="editCellData(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- Page -->
            <pagination :total="cellListParams.total" :page.sync="cellListParams.pageIndex" :limit.sync="cellListParams.pageSize" class="dialog-pagination" @pagination="getCellDetailList" />
            <el-button slot="reference" class="el-icon-arrow-right" type="primary" circle @click="popoverVisible = true" />

          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 抽屉 -->
    <div>
      <!-- 基站 -->
      <el-drawer
        direction="ltr"
        custom-class="demo-drawer"
        title="基站导入"
        :visible.sync="stationImportDialog"
      >
        <div class="demo-drawer__content">
          <div style="margin-left:4%;width:90%;">
            <el-card class="box-card">
              <div slot="header">
                <span>{{ $t('baseData.stationImport') }}</span>
              </div>
              <div>
                <el-upload
                  ref="stationUpload"
                  :action="getUrl('/cell/import')"
                  :data="stationImport.select"
                  :on-success="handleStationSuccess"
                  :file-list="stationImport.file"
                  :headers="myHeaders"
                  :auto-upload="false"
                >
                  <el-button slot="trigger" size="small" type="primary">{{ $t('common.selectFile') }}</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitStationUpload">{{ $t('common.upload') }}</el-button>
                  <div style="padding:20px 20px 20px 20px">
                    <el-radio v-model="stationImport.select.append" label="1">{{ $t('baseData.importAppend') }}</el-radio>
                    <el-radio v-model="stationImport.select.append" label="2">{{ $t('baseData.importOverride') }}</el-radio>
                  </div>
                  <div slot="tip" class="el-upload__tip">{{ $t('baseData.stationImportTip') }}</div>
                </el-upload>
                <div class="import-result">
                  <b>{{ $t('common.importResult') }}</b>
                  <div class="line" />
                  <div v-for="i in stationImport.result" :key="i.id">
                    <span>{{ i.result }}</span>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-drawer>
      <!-- 基站导入结束 -->
      <!-- 区域数据导入 -->
      <el-drawer
        direction="ltr"
        custom-class="demo-drawer"
        title="区域导入"
        :visible.sync="areaImportDialog"
      >
        <div class="demo-drawer__content">
          <div style="margin-left:4%;width:90%;">
            <el-card class="box-card">
              <div slot="header">
                <span>{{ $t('baseData.areaImport') }}</span>
                <el-checkbox v-model="areaImport.select.splitMifFile" style="float: right; padding: 3px 0" type="text">{{ $t('baseData.splitArea') }}</el-checkbox>
              </div>
              <div>
                <el-form style="padding-left:10px">
                  <el-form-item :label="$t('baseData.areaType')">
                    <el-select v-model="afterAreaDate" collapse-tags :placeholder="$t('baseData.areaType')">
                      <el-option v-for="item in getAreaDate" :key="item.id" :label="item.name" :value="item.name" />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('baseData.areaLevel')">
                    <el-select v-model="areaImport.select.level" collapse-tags :placeholder="$t('baseData.areaLevel')">
                      <el-option v-for="item in areaImport.areaLevel" :key="item.code" :label="item.name" :value="item.code" />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('baseData.areaAdministrativeLevel')">
                    <el-select v-model="areaImport.select.regionLevel" collapse-tags :placeholder="$t('baseData.areaAdministrativeLevel')">
                      <el-option v-for="item in areaImport.areaAdministrativeLevel" :key="item.code" :label="item.name" :value="item.code" />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('baseData.areaTag')">
                    <el-select v-model="areaImport.select.coverType" collapse-tags :placeholder="$t('baseData.areaTag')">
                      <el-option v-for="item in areaImport.areaTag" :key="item.code" :label="item.name" :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-upload
                  ref="areaUpload"
                  :action="getUrl('/area/import')"
                  :data="areaImport.select"
                  :on-success="handleAreaSuccess"
                  :file-list="areaImport.file"
                  :headers="myHeaders"
                  :auto-upload="false"
                >
                  <el-button slot="trigger" size="small" type="primary">{{ $t('common.selectFile') }}</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitAreaUpload">{{ $t('common.upload') }}</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传 kml 文件，且不超过 ××.×× MB</div>
                </el-upload>
                <div class="import-result">
                  <b>{{ $t('common.importResult') }}</b>
                  <div class="line" />
                  <div v-for="i in areaImport.result" :key="i.id">
                    <span>{{ i.result }}</span>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-drawer>
      <!-- 区域导入结束 -->
      <!-- 道路导入 -->
      <el-drawer
        direction="ltr"
        custom-class="demo-drawer"
        title="道路导入"
        :before-close="handleAreaClose"
        :visible.sync="roadImportDialog"
      >
        <div class="demo-drawer__content">
          <div style="margin-left:4%;width:90%;">
            <el-card class="box-card">
              <div slot="header">
                <span>道路导入</span>
                <el-checkbox style="float: right; padding: 3px 0" type="text">合并同名轨道</el-checkbox>
              </div>
              <div>
                <el-form style="padding-left:10px">
                  <el-form-item label="归属区域">
                    <el-select v-model="roadImportData.parameter.areaId" collapse-tags :placeholder="$t('baseData.areaType')">
                      <el-option v-for="item in getAreaDate" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="道路类型">
                    <el-select v-model="roadImportData.parameter.roadType" collapse-tags :placeholder="$t('baseData.areaLevel')">
                      <el-option label="铁路" value="0" />
                      <el-option label="高速" value="1" />
                      <el-option label="街道" value="2" />
                      <el-option label="地铁" value="3" />
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-upload
                  ref="roadUpload"
                  :action="getUrl('/road/import')"
                  :data="roadImportData.parameter"
                  :on-success="handleAreaSuccess"
                  :file-list="roadImportData.file"
                  :headers="myHeaders"
                  :auto-upload="false"
                >
                  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitRoadUpload">{{ $t('common.upload') }}</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传 kml 文件，且不超过 ××.×× MB</div>
                </el-upload>
                <div class="import-result">
                  <b>{{ $t('common.importResult') }}</b>
                  <div class="line" />
                  <div v-for="i in roadImportData.result" :key="i.id">
                    <span>{{ i.result }}</span>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-drawer>
      <!-- 道路导入结束 -->
    </div>
  </div>
</template>
<script>
import js from './index'
export default {
  ...js
}
</script>

<style scoped>
  .header {
    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: -10px;
  }
  .cellCard{
    height: 18.75rem;
  }
  .box-card {
    margin: 0.4375rem;
    margin-top: 0.625rem;
    height: 53.125rem;
  }
  .box-card-map{
     margin: 5px 0px 5px 5px;

  }
  .import-result {
    padding-top:20px;
  }
  .line {
    height: 1px;
    background-color: #e0e6ed;
    margin: 12px -24px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .cell-header-button {
    text-align: left;
    margin-bottom: 10px;
  }
  .dialog-pagination {
    margin-top:0px;
    padding:10px 16px;
  }

  .dataTab{
    height: 400px;
  }
  .filter-items{
    margin-left:1rem
  }
</style>
