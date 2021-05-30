<template>
  <el-container style="height: 100%; border: 1px solid #eee ;background-color: #EBEEF5 ;overflow:hidden">
    <!-- 本页面所有弹框 -->
    <!-- 参数列表 -->
    <el-dialog :title="PortName" :visible.sync="ifDto">
      <template>
        <el-table
          :data="ListPort"
          border
          style="width: 100%"
          height="300"
        >
          <el-table-column :label="PortName">
            <el-table-column :label="$t('trajectory.paraName')">
              <template slot-scope="scope"><span>{{ PortName }}-{{ scope.row.netType }}</span> </template>
            </el-table-column>
            <el-table-column
              prop="latitude"
              :label="$t('common.lat')"
              width="180"
            />
            <el-table-column
              prop="longitude"
              :label="$t('common.lon')"
              width="180"
            />
            <el-table-column
              :formatter="formatDate"
              prop="time"
              :label="$t('common.time')"
            />
            <el-table-column
              prop="value"
              :label="$t('trajectory.para')"
            />
          </el-table-column>
        </el-table>
      </template>
    </el-dialog>
    <!-- 添加设备部分 -->
    <el-dialog :title="$t('trajectory.selectDevice')" :visible.sync="dialogTableVisible" class="showWindowState">
      <el-row class="ctrl">
        <!--<el-col :span="2">-->
        <!-- <el-button type="primary" @click="addState">添加设备</el-button> -->
        <!--</el-col>-->
        <!--<el-col :span="1">-->
        <el-input
          v-model="inputName"
          class="inputSearch"
          :placeholder="$t('trajectory.placeholder')"
          style="margin-right:1rem;width:250px"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchData" />
        </el-input>
        <!--</el-col>-->
        <!--<el-col :span="5" :offset="2" style="margin-top:0.2rem">-->
        <el-switch
          v-model="showChange"
          active-color="#13ce66"
          :active-text="$t('trajectory.online')"
          @change="showOnline"
        />
        <!--</el-col>-->
        <!--<el-col :span="8" :offset="5">-->
        <!--</el-col>-->
      </el-row>
      <el-table
        ref="multipleTable"
        :data="stateAllData"
        tooltip-effect="dark"
        height="22rem"
        style="width:100%"
        @select="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="deviceName" :label="$t('device.name')" show-overflow-tooltip width="300">
          <template slot-scope="datalist">{{ datalist.row.deviceName }}</template>
        </el-table-column>
        <el-table-column property="status" :label="$t('device.state')" width="150" :formatter="equipmentStatusSW" />
        <el-table-column property="onlineDuration" :label="$t('deviceStatus.onlineTime')" width="150" :formatter="onlineTimeSW" />
        <el-table-column property="speed" :label="$t('deviceStatus.speed')" width="100" :formatter="speedSW" />
        <el-table-column property="version" :label="$t('common.version')" show-overflow-tooltip />
      </el-table>
      <div style="display: flex;align-items:center ">
        <div class="pageAndRefresh">
          <pagination
            :total="sum"
            min-width="3.375rem"
            :page.sync="listset.page"
            :limit.sync="listset.limit"
            class="dialog-pagination"
            @pagination="getDeviceList"
          />
        </div>
        <div class="pageAndRefresh">
          <el-button type="primary" style="margin-left:1rem" @click="rePage">{{ $t('common.refresh') }}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- upload-->
    <el-dialog :title="$t('trajectory.upload')" :visible.sync="upload" class="uploadShowWindow">
      <el-upload class="upload-demo" drag action multiple>
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          {{ $t('trajectory.upload1') }}
          <em>{{ $t('trajectory.upload2') }}</em>
        </div>
        <div slot="tip" class="el-upload__tip">{{ $t('trajectory.upload3') }}</div>
      </el-upload>
    </el-dialog>
    <!-- 设置部分 -->
    <el-dialog :title="$t('trajectory.set')" :visible.sync="setWindow" class="setShowWindow">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-s-grid" /> {{ $t('trajectory.gridCoating') }}
          </span>
          <el-table :data="gridData" style="width:100%">
            <el-table-column type="selection" width="55" />
            <el-table-column property="name" :label="$t('trajectory.layerName')" />
            <el-table-column label="" fixed="right" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click.native.prevent="deleteData(scope.$index, gridData)"
                >
                  <i class="el-icon-delete" />
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-location" />{{ $t('trajectory.track') }}
          </span>
          <el-button type="primary" @click=" upload= true">
            {{ $t('common.upLoad') }}
            <i class="el-icon-upload el-icon--right" />
          </el-button>
          <!-- <el-button type="primary" icon="el-icon-delete">删除</el-button> -->
          <el-table :data="trackData" style="width:100%">
            <el-table-column type="selection" width="55" />
            <el-table-column property="name" :label="$t('trajectory.track')" />

            <el-table-column :label="$t('common.remove')" fixed="right" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click.native.prevent="deleteData(scope.$index, trackData)"
                >
                  <i class="el-icon-delete" />
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <pagination
        v-show="sum>0"
        :total="sum"
        min-width="3.375rem"
        :page.sync="listset.page"
        :limit.sync="listset.limit"
        class="dialog-pagination"
        @pagination="getDeviceList"
      />
    </el-dialog>
    <!-- 端口选择 -->
    <el-dialog :title="$t('trajectory.selectPort')" :visible.sync="chooseInt" class="port">
      <!--<el-row>-->
      <!--<el-col :span="4">-->
      <!--<el-button type="primary" @click="rePage">{{ $t('common.refresh') }}</el-button>-->
      <!--</el-col>-->
      <!--<el-col :span="4" :offset="10">-->
      <!--<el-switch-->
      <!--v-model="showChange"-->
      <!--active-color="#13ce66"-->
      <!--:active-text="$t('trajectory.port0')"-->
      <!--@change="showOnline"-->
      <!--/>-->
      <!--</el-col>-->
      <!--<el-col :span="5">-->
      <!--<el-input-->
      <!--v-model="inputName"-->
      <!--class="inputSearch"-->
      <!--:placeholder="$t('trajectory.placeholder')"-->
      <!--style="margin-left:1rem;margin-right:15px"-->
      <!--&gt;-->
      <!--<el-button slot="append" icon="el-icon-search" @click="searchData" />-->
      <!--</el-input>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <div class="port-dialog-table">
        <div v-for="(item,index) in tableData" :key="index" style="margin: 5px 0;">
          <el-table ref="parameterList" :data="item.tableData" :name="item.deviceName" :label="item.deviceId" @select="choosePort" @select-all="choosePort">
            <el-table-column :label="item.deviceName">
              <el-table-column type="selection" width="39" />
              <el-table-column :label="$t('device.name')" width="400">
                <template slot-scope="name">
                  <span :name="name">{{ item.deviceName }}</span>
                </template>
              </el-table-column>
              <el-table-column property="portNumber" :label="$t('device.portNum')" width="100" />
              <el-table-column property="portDeviceType" :label="$t('device.deviceType')" :formatter="dataStyle" />
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <!-- 参数选择 -->
    <!-- todo 功能可以实现 代码需要优化 -->
    <el-dialog :title="$t('trajectory.selectPara')" :visible.sync="dataWindow" @open="openParamWin()">
      <el-tabs ref="paramTabs" type="border-card" @tab-click="getChooseData">
        <el-tab-pane label="-1">
          <span slot="label">Common</span>
          <el-table :data="chooseParameter" style="width:100%" max-height="400" @select="winChoosePort" @select-all="winChoosePort">
            <el-table-column type="selection" width="55" />
            <el-table-column property="name" :label="$t('trajectory.paraName')" width="150" />
            <el-table-column :label="$t('trajectory.threshold')">
              <template slot-scope="scope">
                <span v-if="typeof scope.row.thresholds_str === 'undefined'">--</span>
                <span v-else>
                  <span v-for="(item, index) in JSON.parse(scope.row.thresholds_str)" :key="index" :name="item.Color" :style="{ color: '#'+item.Color.slice(2), fontSize: 16 + 'px' }">
                    <!-- {{ item.Color }} -->
                    {{ item.ThrStr }}
                  </span>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="0">
          <span slot="label">GSM</span>
          <el-table :data="chooseParameter" style="width:100%" max-height="400" @select="winChoosePort">
            <el-table-column type="selection" width="55" />
            <el-table-column property="name" :label="$t('trajectory.paraName')" width="150" />
            <el-table-column :label="$t('trajectory.threshold')">
              <template slot-scope="scope">
                <span v-if="typeof scope.row.thresholds_str === 'undefined'">--</span>
                <span v-else>
                  <span v-for="(item, index) in JSON.parse(scope.row.thresholds_str)" :key="index" :name="item.Color" :style="{ color: '#'+item.Color.slice(2), fontSize: 16 + 'px' }">
                    {{ item.ThrStr }}
                  </span>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="1">
          <span slot="label">CDMA</span>
          <el-table :data="chooseParameter" style="width:100%" max-height="400" @select="winChoosePort">
            <el-table-column type="selection" width="55" />
            <el-table-column property="name" :label="$t('trajectory.paraName')" width="150" />
            <el-table-column :label="$t('trajectory.threshold')">
              <template slot-scope="scope">
                <span v-if="typeof scope.row.thresholds_str === 'undefined'">--</span>
                <span v-else>
                  <span v-for="(item, index) in JSON.parse(scope.row.thresholds_str)" :key="index" :name="item.Color" :style="{ color: '#'+item.Color.slice(2), fontSize: 16 + 'px' }">
                    {{ item.ThrStr }}
                  </span>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="2">
          <span slot="label">WCDMA</span>
          <el-table :data="chooseParameter" style="width:100%" max-height="400" @select="winChoosePort">
            <el-table-column type="selection" width="55" />
            <el-table-column property="name" :label="$t('trajectory.paraName')" width="150" />
            <el-table-column :label="$t('trajectory.threshold')">
              <template slot-scope="scope">
                <span v-if="typeof scope.row.thresholds_str === 'undefined'">--</span>
                <span v-else>
                  <span v-for="(item, index) in JSON.parse(scope.row.thresholds_str)" :key="index" :name="item.Color" :style="{ color: '#'+item.Color.slice(2), fontSize: 16 + 'px' }">
                    {{ item.ThrStr }}
                  </span>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="3">
          <span slot="label">TDSCDMA</span>
          <el-table :data="chooseParameter" style="width:100%" max-height="400" @select="winChoosePort">
            <el-table-column type="selection" width="55" />
            <el-table-column property="name" :label="$t('trajectory.paraName')" width="150" />
            <el-table-column :label="$t('trajectory.threshold')">
              <template slot-scope="scope">
                <span v-if="typeof scope.row.thresholds_str === 'undefined'">--</span>
                <span v-else>
                  <span v-for="(item, index) in JSON.parse(scope.row.thresholds_str)" :key="index" :name="item.Color" :style="{ color: '#'+item.Color.slice(2), fontSize: 16 + 'px' }">
                    {{ item.ThrStr }}
                  </span>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="7">
          <span slot="label">LTE</span>
          <el-table :data="chooseParameter" style="width:100%" max-height="400" @select="winChoosePort">
            <el-table-column type="selection" width="55" />
            <el-table-column property="name" :label="$t('trajectory.paraName')" width="150" />
            <el-table-column :label="$t('trajectory.threshold')">
              <template slot-scope="scope">
                <span v-if="typeof scope.row.thresholds_str === 'undefined'">--</span>
                <span v-else>
                  <span v-for="(item, index) in JSON.parse(scope.row.thresholds_str)" :key="index" :name="item.Color" :style="{ color: '#'+item.Color.slice(2), fontSize: 16 + 'px' }">
                    {{ item.ThrStr }}
                  </span>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="8">
          <span slot="label">5G</span>
          <el-table :data="chooseParameter" style="width:100%" max-height="400" @select="winChoosePort">
            <el-table-column type="selection" width="55" />
            <el-table-column property="name" :label="$t('trajectory.paraName')" width="150" />
            <el-table-column :label="$t('trajectory.threshold')">
              <template slot-scope="scope">
                <span v-if="typeof scope.row.thresholds_str === 'undefined'">--</span>
                <span v-else>
                  <span v-for="(item, index) in JSON.parse(scope.row.thresholds_str)" :key="index" :name="item.Color" :style="{ color: '#'+item.Color.slice(2), fontSize: 16 + 'px' }">
                    {{ item.ThrStr }}
                  </span>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="5">
          <span slot="label">WIFI</span>
          <el-table :data="chooseParameter" style="width:100%" max-height="400" @select="winChoosePort">
            <el-table-column type="selection" width="55" />
            <el-table-column property="name" :label="$t('trajectory.paraName')" width="150" />
            <el-table-column :label="$t('trajectory.threshold')">
              <template slot-scope="scope">
                <span v-if="typeof scope.row.thresholds_str === 'undefined'">--</span>
                <span v-else>
                  <span v-for="(item, index) in JSON.parse(scope.row.thresholds_str)" :key="index" :name="item.Color" :style="{ color: '#'+item.Color.slice(2), fontSize: 16 + 'px' }">
                    {{ item.ThrStr }}
                  </span>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

    </el-dialog>
    <!-- 双击详情 -->
    <el-dialog :title="$t('trajectory.info')" :visible.sync="portData">
      <el-form ref="form" :model="portDataDto" label-position="left" label-width="100px">
        <el-form-item :label="$t('device.deviceID')">
          <el-input v-model="portDataDto.deviceId" />
        </el-form-item>
        <el-form-item :label="$t('device.name')">
          <el-input v-model="portDataDto.deviceName" />
        </el-form-item>
        <el-form-item :label="$t('device.deviceType')">
          <el-input v-model="portDataDto.deviceType" />
        </el-form-item>
        <el-form-item :label="$t('common.version')">
          <el-input v-model="portDataDto.version" />
        </el-form-item>
        <el-form-item :label="$t('device.portCount')">
          <el-input v-model="num" />
        </el-form-item>
        <!-- <el-form-item label="设备是否在线">
          <el-input v-model="status" />
        </el-form-item>
        <el-form-item label="线上持续时间">
          <el-input v-model="onlineDuration" />
        </el-form-item> -->
      </el-form>
    </el-dialog>
    <!-- 本页面所有弹框部分结束 -->
    <!-- aside -->
    <div class="asideDIV">
      <!-- 1上边 -->
      <el-card class="asideStyle" shadow="never">
        <div slot="header">
          <span>
            {{ $t('device.trajectory') }}
          </span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="closeAside">关闭</el-button> -->
          <!-- <el-button style="float: right; margin-right:3px; padding: 3px 0" type="text" @click="setWindow = true">{{ $t('common.setup') }}</el-button> -->
        </div>
        <el-aside
          v-show="showAside"
          width="330"
          class="aside"
        >
          <div class="asideEvent">
            <el-button
              icon="el-icon-plus"
              class="event"
              type="primary"
              size="mini"
              style="padding: 6px 15px; height: 28px;"
              @click="dialogTableVisible = true"
            >{{ $t('common.add') }}</el-button>
            <!-- <el-checkbox-group v-model="checkboxGroup">
              <el-checkbox-button class="event" @click="dataShow=true">{{ $t('common.param') }}</el-checkbox-button>
              <el-checkbox-button class="event" @click="event">{{ $t('common.event') }}</el-checkbox-button>
              <el-checkbox-button class="event" @click="alarm">{{ $t('common.alarm') }}</el-checkbox-button>
            </el-checkbox-group> -->
            <el-checkbox-group ref="formCards" v-model="checkboxGroup" class="button-group" @change="toCtrlScreenShow">
              <el-checkbox-button ref="formCards1" key="param" label="param">{{ $t('common.param') }}</el-checkbox-button>
              <el-checkbox-button ref="formCards2" key="event" label="event">{{ $t('common.event') }}</el-checkbox-button>
              <el-checkbox-button ref="formCards3" key="alarm" label="alarm">{{ $t('common.alarm') }}</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <!-- 设备监控表格 -->
          <div class="asideForm">
            <el-table :data="tableData" style="width: auto;overflow: auto;" height="100%" @cell-click="portDataDetails" @cell-dblclick="portDataDetails2">
              <el-table-column prop="deviceName" :label="$t('device.name')" width="120" show-overflow-tooltip />
              <el-table-column :label="$t('common.state')" width="60">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                  >
                    <i v-if="scope.row.status !== '0' " class="el-icon-check" />
                    <i v-if="scope.row.status === '0' " class="el-icon-close" />
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.delete')" width="60">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                  >
                    <i class="el-icon-delete" />
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.track')" width="60">
                <template slot-scope="scope">
                  <el-button
                    :name="scope.$index"
                    type="text"
                    size="small"
                    @click.native.prevent="locate(tableData[scope.$index],scope.$index)"
                  >
                    <i :class="{ 'el-icon-location-information' : true , located : scope.row.located ,locatedOff : !scope.row.located}" />
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-aside>
      </el-card>
      <!-- 2中间 -->
      <el-card v-show="twoClickShow" shadow="never" class="twoClickStyleV">
        <el-form ref="form" :model="portDataDto" label-position="left" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('common.state')">
                <span v-show="portDataDto.status === '0' " style="margin-left: 10px ">{{ $t('trajectory.offLine') }}</span>
                <span v-show="portDataDto.status !== '0' && portDataDto.status !== undefined" style="margin-left: 10px ">{{ $t('trajectory.onLine') }}</span>
                <!--<i v-if="portDataDto.status === '1' " class="el-icon-check" />-->
                <!--<i v-if="portDataDto.status === '0' " class="el-icon-close" />-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('trajectory.duration')" class="time">
                <el-input v-model="portDataDto.onlineDuration" size="mini" :disabled="true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="2" class="size">
            <el-col :span="24">
              <el-form-item :label="$t('common.location')">
                <!--<el-input v-model="portDataDto.positionCh" />-->
                <span v-show="language==='zh'"> {{ portDataDto.positionCh }}  </span>
                <span v-show="language==='en'"> {{ portDataDto.positionEn }}  </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="2" class="size">
            <el-col :span="24">
              <el-form-item :label="$t('trajectory.speed')" class="speedStyle">
                <el-input v-model="portDataDto.speed" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="2">
            <el-col :span="24">
              <el-form-item :label="$t('common.lat')">
                <el-input v-model="portDataDto.realtimeLatitude" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="2">
            <el-col :span="24">
              <el-form-item :label="$t('common.lon')">
                <el-input v-model="portDataDto.realtimeLongitude" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <!-- 3 table -->
      <el-card v-show="twoClickShow" shadow="never" class="twoClickStyle">
        <!-- <div slot="header" class="clearfix">
          <span>设备详情</span>
          <el-button style="float: right; padding: 3px 0" type="text">关闭</el-button>
        </div> -->
        <el-table v-col-width-limit :data="protListDto" class="tableStyle" border height="100%">
          <el-table-column :label="$t('device.portDetail')">
            <el-table-column prop="portNumber" :label="$t('trajectory.port')" width="50" min-width="4" />
            <!-- <el-table-column width="30">
              <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.row.portNumber" />
              </template>
            </el-table-column> -->
            <el-table-column prop="currentNetType" :label="$t('common.network')" :formatter="netStyle" min-width="70" />
            <el-table-column :label="$t('trajectory.para1')" width="80" min-width="65" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-show="scope.row.val0"> {{ scope.row.val0 }}:{{ param0Total(scope.row.currentNetType) }} </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('trajectory.para2')" width="80" min-width="65" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-show="scope.row.val1"> {{ scope.row.val1 }}:{{ param1Total(scope.row.currentNetType) }} </span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 中间地图和弹出参数Card -->
    <el-main style="padding:0.0063rem" class="mapAndDate">
      <!-- map -->
      <div class="map">
        <div id="lmap" style="height: 100%; width: 100%;" />
      </div>
      <!-- 参数Card -->
      <el-card v-show="dataShow" class="box-card" shadow="never">
        <div slot="header">
          <span>
            {{ $t('common.parameter') }}
          </span>
          <!-- <el-button style="float: right; padding: 0.1875rem 0" type="text" icon="el-icon-close" @click="dataShow=false" /> -->
        </div>
        <el-button type="primary" style="margin:5px 0" @click="getportNumberData">{{ $t('uploadFileList.selectPort') }}</el-button>
        <el-button type="primary" @click="dataWindow=true">{{ $t('trajectory.selectPara') }}</el-button>
        <!-- <el-button type="danger" @click="dataWindow=true">{{ $t('commmon.delete') }}</el-button> -->
        <el-table ref="portAndParamTable" v-col-width-limit :data="parameterListAllShow" height="150" border @row-contextmenu="rowContextmenu">
          <el-table-column :label="$t('trajectory.devicePort')" width="200" min-width="100" show-overflow-tooltip>
            <template slot-scope="sbjk">
              <span>{{ sbjk.row.name }}-P{{ sbjk.row.ports }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="$t('common.delete')" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-delete"
                @click.native.prevent="cancelPortMonitoring(scope.$index, parameterListAllShow)"
              />
            </template></el-table-column> -->
          <el-table-column v-for="(item,index) in portChoList" :key="index" :label="item.name" min-width="165">
            <template slot-scope=" { row }">
              <span v-if="(!row[row.deviceId] || row[row.deviceId][row.ports][item.CODE] === undefined)">{{ $t('trajectory.nodata') }}</span>
              <!-- <span>-----{{ row[row.deviceId][row.ports][item.CODE] }}------</span> -->
              <span v-else>{{ row[row.deviceId][row.ports][item.CODE].value }}</span>
            </template>
          </el-table-column>
        </el-table>
        <context-button v-if="menuVisible" ref="contextbutton" @foo="foo" @handleOne="handleOne" @handleTwo="handleTwo" @handleThree="handleThree" />
      </el-card>
    </el-main>
    <!-- 警告和事件右边栏 -->
    <div v-show="alarmShow||eventShow" class="alarm-card">
      <!-- 警告 -->
      <el-card v-show="alarmShow" class="alarmELCard" :style="alarmELCard" shadow="never">
        <div slot="header">
          <span>
            {{ $t('common.warn') }}
          </span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="closeAlarmCard" /> -->
        </div>
        <el-row>
          <el-col :span="16">
            <el-select v-model="alarmDeviceIds" multiple collapse-tags :placeholder="$t('device.select')" style="width:200px">
              <el-option
                v-for="item in tableData"
                :key="item.deviceId"
                :label="item.deviceName"
                :value="item.deviceId"
              />
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select v-model="alarmDevicePorts" multiple collapse-tags :placeholder="$t('uploadFileList.selectPort')">
              <el-option v-for="item in portsum" :key="item" :label="item" :value="item" />
            </el-select>
          </el-col>
        </el-row>
        <div style="height: calc(100% - 70px);">
          <el-table v-col-width-limit :data="alarmAllData" border class="alarmTable" height="100%" style="width: 100%;margin-top:1rem;">
            <el-table-column :label="$t('uploadFileList.port')" show-overflow-tooltip min-width="50" width="90">
              <template slot-scope="scope">{{ handleDeviceName(scope.row) }}</template>
            </el-table-column>
            <el-table-column prop="alarmLevel" :label="$t('common.level')" width="75" show-overflow-tooltip min-width="60" :formatter="alarmLevelSw" />
            <el-table-column prop="alarmDatetime" :label="$t('trajectory.time')" min-width="50" show-overflow-tooltip width="80" :formatter="formatDateAlarm" />
            <el-table-column prop="alarmContent" :label="$t('trajectory.alarmContent')" show-overflow-tooltip />
          </el-table>
        </div>
        <div class="page" style="margin-top:5px">

          <paginationmini
            :total="alarmTotal"
            :page.sync="alarmlistset.page"
            :limit.sync="alarmlistset.limit"
            @paginationmini="getAlarm"
          />

        </div>
      </el-card>
      <!-- 事件 -->
      <el-card v-show="eventShow" class="eventELCard" :style="eventELCard" shadow="never">
        <div slot="header">
          <span>
            {{ $t('common.event') }}
          </span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="closeEventCard" /> -->
        </div>
        <el-row>
          <el-col :span="16">
            <el-select v-model="eventDeviceIds" multiple collapse-tags :placeholder="$t('device.select')" style="width:200px">
              <el-option
                v-for="item in tableData"
                :key="item.deviceId"
                :label="item.deviceName"
                :value="item.deviceId"
              />
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select v-model="eventDevicePorts" multiple collapse-tags :placeholder="$t('uploadFileList.selectPort')">
              <el-option v-for="item in eventPortSum" :key="item" :label="item" :value="item" />
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-top:1rem">
          <el-col :offset="0.5">
            <!-- <el-checkbox-group v-model="eventCheckList">
              <el-checkbox label="实时事件" />
              <el-checkbox label="解码事件" />
            </el-checkbox-group> -->
          </el-col>
        </el-row>
        <div style="height: calc(100% - 70px);">
          <el-table v-col-width-limit :data="eventAllData" border show-overflow-tooltip height="100%" style="width: 100%;" class="eventTable">
            <el-table-column :label="$t('uploadFileList.port')" width="120" min-width="50" show-overflow-tooltip>
              <template slot-scope="scope">{{ handleDeviceName(scope.row) }}</template>
            </el-table-column>
            <el-table-column prop="eventDatetime" :label="$t('trajectory.time')" show-overflow-tooltip min-width="60" width="80" :formatter="formatDateEvent" />
            <el-table-column prop="eventContent" :label="$t('eventDetails.name')" show-overflow-tooltip />
          </el-table>
        </div>

        <paginationmini
          :total="eventTotal"
          :page.sync="eventlistset.page"
          :limit.sync="eventlistset.limit"
          style="margin-top:5px"
          @paginationmini="getEvent"
        />

      </el-card>
    </div>
    <!-- 双击下弹框 -->

  </el-container>
</template>
<script>
import js from './trajectory'
export default {
  ...js
}
</script>

<style lang='scss' scoped>
/deep/ .el-card__header{
    font-size: 14px;
    color: #606266;
    padding: 10px;
}
/deep/ .el-card__body{
  padding: 10px;
}
/deep/ .el-table__header-wrapper  .el-checkbox{//找到表头那一行，然后把里面的复选框隐藏掉
	display:none
}
.speedStyle /deep/ .el-input-group__append{
  padding: 0 10px;
}
.asideStyle  /deep/ .el-card__body{
   height: calc(100% - 42px);
}
.asideStyle  /deep/ .el-form-item--mini.el-form-item{
   margin-bottom: 2px;
}
.aside{
  height: 100%;
}
.asideStyle{
  height: 100%;
}
.eventTable {
  height: 280rem;
  overflow: auto;
}
.ctrl {
  margin-bottom: 0.5rem;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.setShowWindow {
  .el-dialog {
    width: 60%;
  }
}
.uploadShowWindow {
  .el-dialog {
    width: 60%;
  }
}
.mapAndDate {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .box-card {
    width: 100%;
    // height: 285px;
    margin-top: 5px;
    // .el-card__body{
    //   padding-top: 0
    // }
  }
  .map {
    width: 100%;
    flex: 1;
  }
}
.box-card /deep/ .el-card__body{
    padding-top: 0
  }
.alarmELCard{
    .el-scrollbar {
    overflow: hidden;
    position: relative;
    width: 100px;
   }
}
.alarm-card /deep/ .el-card__body{
    height: calc(100% - 42px);
}
.eventELCard{
  .el-scrollbar {
    overflow: hidden;
    position: relative;
    width: 100px;
}
}

.alarm-card {
   width: 380px;
  //  background: #2b2f3a;
  .el-scrollbar {
    overflow: hidden;
    position: relative;
    width: 100px;
}
  margin-left: 5px;
  float: right;
  height: 100vh;
  // width: 40.625rem;
  .page {
    width: 23.4375rem;
    overflow: hidden;
  }
  // .el-select .el-input {
  //   width: 10rem;
  // }
  .el-select__tags-text {
    width: 100px;
    // color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }
  .alarmTable {
    height: 12.5rem;
  }
}
.showWindowState {
  //  width: 59.4375rem;
  //  height: 47rem;
  .el-dialog {
    height: 35.625rem;
    width: 55%;
    .el-dialog__body {
      padding-top: 0.625rem;
      .el-table
        .el-table--fit
        .el-table--scrollable-x
        .el-table--enable-row-hover
        .el-table--enable-row-transition
        .el-table--mini {
        .el-table__body-wrapper .is-scrolling-left {
          height: 18.75rem;
        }
      }
    }
  }
}
.dialog-pagination {
  margin-top: 0.3125rem;
  padding: 0.625rem 1rem;
  width: 21.125rem;
  box-sizing: border-box;
}
.asideHeader {
  border-bottom:1px solid #EBEEF5;
  width: auto;
  height: 6vh;
  display: flex;
  align-items: center;
  .title {
    flex-grow: 1;
    font-size: 1.5rem;

  }
}
.tableStyle{
  height:calc(33vh - 20px)!important;
  overflow: auto;
}
.asideDIV{
  padding-right: 5px;
  height: 100vh;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 45% 20% 35%;
  min-width: 330px;
  max-width: 330px;
  .el-card{
     .el-card__body{
      padding: 0;
    }
  }
}
.twoClickStyle{
    // height: 33vh;
    margin-top: 5px;
    .el-card__body{
      padding: 0;
    }
}
.twoClickStyleV{
    height: 19.2vh;
    overflow: auto;
    margin-top: 5px;
    .el-card__body{
      padding: 0;
    }
}
.time /deep/ .el-input-group__append{
  padding-left:15px ;
}
.asideEvent {
  width: auto;
  height: 28px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .event {
    width: 4.375rem;
  }
}
.port{
  // height:500px;
}

.port-dialog-table {
  height: calc(70vh - 54px - 60px - 28px);
  overflow: auto;
  margin-top: 5px;
}

.ziti{
    flex-grow: 1;
    font-size: 1rem;
    color: #409EFF;
}
.size{
    .el-input-group__append, .el-input-group__prepend{
    background-color: #F5F7FA;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    padding: 0 10px;
    width: 1px;
    white-space: nowrap;
}
}
.asideForm {
  height: calc(100% - 28px);
}
.demo-table  /deep/ .el-table_1_column_2>.cell {
      padding: 0px;
}
.demo-table  /deep/ .el-table_1_column_3>.cell {
      padding: 0px;
}
.demo-table  /deep/ .el-table_1_column_4>.cell {
      padding: 0px;
}
.located{
  color: #67c23a;
}
.locatedOff{
  color: #606266;
}
.pageAndRefresh{
  display: inline-block;
}
.pageAndRefresh /deep/ .pagination-container{
  width: fit-content;
}
.twoClickStyleV /deep/ .el-form-item__label{
  font-size: 12px; color: #909399;
}
.twoClickStyleV /deep/ .el-form-item{
  margin-bottom:5px ;
}
.twoClickStyle /deep/ .el-card__body{
 padding: 10px;
}
.button-group{
  width: 220px;
  display: flex;
  justify-content: flex-end;
}
.button-group /deep/ .el-checkbox-button__inner{
  width: 65px;
  height: 28px;
  // display: flex;
  // flex: 1;
  // justify-content: center;
  // padding: 7px 0;
}

</style>

