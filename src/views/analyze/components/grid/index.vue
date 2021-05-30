<template>
  <div class="grid-form">
    <!-- 项目弹框 -->
    <el-dialog :title="$t('analyze.title.projectSelect')" :visible.sync="showWindow" modal-append-to-body append-to-body>
      <el-tabs type="border-card" class="dialog-body-container">
        <el-tab-pane :label="$t('analyze.label.project')">
          <el-tree
            ref="stationTree"
            :data="gridData"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            class="tree"
            @check="chooseData"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ data.name }}</span>
            </span>
          </el-tree>
        </el-tab-pane>
        <el-tab-pane :label="$t('analyze.label.selected')">
          <template>
            <el-table
              :data="groups"
              height="100%"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="id"
                label="ID"
                width="180"
              />
              <el-table-column
                prop="name"
                :label="$t('analyze.label.name')"
                width="180"
              />
              <el-table-column
                prop="treePath"
                label="treePath"
                width="180"
              />
              <el-table-column
                prop="treeLevel"
                label="treeLevel"
              />
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!-- 区域弹框 -->
    <el-dialog :title="$t('analyze.title.regionSelect')" :visible.sync="showWindowArea" modal-append-to-body append-to-body>
      <el-tabs type="border-card" class="dialog-body-container">
        <el-tab-pane :label="$t('analyze.label.project')">
          <el-tree
            ref="area"
            :data="areaList"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            class="tree"
            @check="chooseArea"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ data.name }}</span>
            </span>
          </el-tree>
        </el-tab-pane>
        <el-tab-pane :label="$t('analyze.label.selected')">
          <template>
            <el-table
              :data="areas"
              height="100%"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="id"
                label="ID"
                width="180"
              />
              <el-table-column
                prop="name"
                :label="$t('analyze.label.name')"
                width="180"
              />
              <el-table-column
                prop="parentName"
                :label="$t('analyze.label.province')"
                width="180"
              />
              <el-table-column
                prop="treePath"
                label="treePath"
                width="180"
              />
              <el-table-column
                prop="treeLevel"
                label="treeLevel"
              />
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-form ref="form" :model="form" label-width="110px">
      <el-row>
        <el-col :span="24" class="grid-title">
          <i class="el-icon-s-fold title-icon" />
          <span class="title-name">{{ $t('analyze.span.networkParameter') }}</span>
        </el-col>
        <el-divider />
        <el-form-item
          :label="$t('analyze.label.operator')"
          class="grid-form-item"
          :rules="[
            { required: true, message: $t('analyze.label.operator'), trigger: 'blur' },
          ]"
        >
          <el-select v-model="Name" clearable :placeholder="$t('analyze.placeholder.select')" class="grid-form-field" @change="clearOperatorParam">
            <!-- <el-option
              v-for="(item,index) in AllData.operators"
              :key="index"
              :label="NameChange(item.operatorName)"
              :value="item.operatorName"
            /> -->
            <el-option
              v-for="(item,index) in operatorNameList"
              :key="index"
              :label="item.code"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('analyze.label.networkType')"
          class="grid-form-item"
          :rules="[
            { required: true, message: $t('analyze.label.networkType'), trigger: 'blur' },
          ]"
        >
          <el-select v-model="operatorId" clearable :placeholder="$t('analyze.placeholder.select')" class="grid-form-field" @change="code = null">
            <!-- <el-option
              v-for="(item,index) in AllData.operators[pass].operatorInfo"
              :key="index"
              :label="IntTypeChange(item.netType)"
              :value="item.operatorId"
            /> -->
            <el-option
              v-for="(item,index) in netTypeList"
              :key="index"
              :label="getNetName(item.netType)"
              :value="item.operatorId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('analyze.label.gridParameter')"
          class="grid-form-item"
          :rules="[
            { required: true, message: $t('analyze.label.gridParameter'), trigger: 'blur' },
          ]"
        >
          <el-select v-model="code" :placeholder="$t('analyze.placeholder.select')" class="grid-form-field" @change="addFile">
            <el-option v-for="(item,index) in getGridOptions" :key="index" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <template>
          <el-table
            v-if="tableData.length > 0 "
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              :label="$t('analyze.label.parameterList')"
              prop="name"
            />
            <el-table-column :label="$t('analyze.label.action')" width="50">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" icon="el-icon-minus" circle @click.native.prevent="deleteRow(scope.$index, tableData)" />
              </template>
            </el-table-column>
          </el-table>

        </template>
      </el-row>

      <el-row class="grid-row">
        <el-col :span="24" class="grid-title">
          <i class="el-icon-aim title-icon" />
          <span class="title-name">{{ $t('analyze.span.itemFilter') }}</span>
        </el-col>
        <el-divider />
        <el-form-item
          class="grid-form-item"
          :label="$t('analyze.label.addItem')"
        >
          <el-input v-model="input3" :placeholder="$t('analyze.placeholder.select')" readonly class="input-with-select">
            <el-button slot="append" icon="el-icon-plus" @click="findObj" />
          </el-input>
        </el-form-item>
      </el-row>
      <el-row class="grid-row">
        <el-col :span="24" class="grid-title">
          <i class="el-icon-aim title-icon" />
          <span class="title-name">{{ $t('analyze.span.timeFilter') }}</span>
        </el-col>
        <el-divider />
        <el-col :span="24">
          <el-form-item
            prop="startDt"
            :label="$t('analyze.label.selectTime')"
            class="grid-form-item"
            :rules="[
              { required: true, message: $t('analyze.label.selectTime'), trigger: 'blur' },
            ]"
          >
            <el-date-picker
              v-model="value1"
              value-format="timestamp"
              style="width:100%"
              type="datetimerange"
              range-separator="-"
              :start-placeholder="$t('analyze.placeholder.startDt')"
              :end-placeholder="$t('analyze.placeholder.endDt')"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="grid-row">
        <el-col :span="24" class="grid-title">
          <i class="el-icon-aim title-icon" />
          <span class="title-name">{{ $t('analyze.span.regionFilter') }}</span>
        </el-col>
        <el-divider />
        <el-form-item
          class="grid-form-item"
          :label="$t('analyze.label.addRegion')"
          :rules="[
            { required: false, message: $t('analyze.label.addRegion'), trigger: 'blur' },
          ]"
        >
          <el-input v-model="input4" :placeholder="$t('analyze.placeholder.select')" readonly class="input-with-select">
            <el-button slot="append" icon="el-icon-plus" @click="findarea" />
          </el-input>
        </el-form-item>
      </el-row>
      <el-row class="grid-row">
        <el-col :span="24" class="grid-title">
          <i class="el-icon-aim title-icon" />
          <span class="title-name">{{ $t('analyze.span.fileFilter') }}</span>
        </el-col>
        <el-divider />
        <el-form-item :label="$t('analyze.label.removeErr')" class="grid-form-item">
          <el-switch v-model="form.filterAbnormal" />
        </el-form-item>
        <el-form-item :label="$t('analyze.label.filePort')" class="grid-form-item">
          <el-select v-model="filePart" :placeholder="$t('analyze.placeholder.select')" multiple class="grid-form-field">
            <el-option v-for="(item,index) in portNum" :key="index" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('analyze.label.testBusiness')" class="grid-form-item">
          <el-select v-model="fileType" :placeholder="$t('analyze.placeholder.select')" multiple class="grid-form-field">
            <el-option v-for="(item,index) in fileTypes" :key="index" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('analyze.label.deviceType')" class="grid-form-item">
          <el-select v-model="deviceType" :placeholder="$t('analyze.placeholder.select')" multiple class="grid-form-field" @change="tabdeviceName">
            <el-option v-for="(item,index) in deviceTypes" :key="index" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('analyze.label.deviceName')" class="grid-form-item">
          <el-select v-model="deviceName" :placeholder="$t('analyze.placeholder.select')" multiple class="grid-form-field">
            <el-option v-for="(item,index) in deviceNameList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row class="grid-row">
        <el-col :span="24" class="grid-title">
          <i class="el-icon-aim title-icon" />
          <span class="title-name"> {{ $t('analyze.span.statisticalMethod') }} </span>
        </el-col>
        <el-divider />
        <el-form-item :label="$t('analyze.label.gridGranularity')" class="grid-form-item">
          <el-select v-model="form.gridSize" :placeholder="$t('analyze.placeholder.select')" clearable class="grid-form-field">
            <el-option v-for="(item,index) in MapSzie" :key="index" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('analyze.span.statisticalMethod')" class="grid-form-item">
          <el-select v-model="form.statisticsType" :placeholder="$t('analyze.placeholder.select')" clearable class="grid-form-field">
            <el-option v-for="(item,index) in dataStatistic" :key="index" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import js from './index'
export default {
  ...js
}
</script>
<style lang="less" scoped>
.grid-row{
  margin-top: 15px;
}
.grid-title{
  color: #555555;
  font-size: 16px;
  .title-icon{
    padding-left: 10px;
  }
  .title-name{
    color: #000000;
    line-height: 16px;
    font-weight: 500;
  }
}
.dialog-body-container {
  height: calc(70vh - 114px);
}
.dialog-body-container .tree,
.dialog-body-container /deep/ .el-tab-pane{
  height: calc(70vh - 114px - 69px);
}
.dialog-body-container .tree {
  overflow: auto;
}
</style>
<style>
.grid-form-item label{
  color: #000000;
  font-weight: 500;
}
.grid-form-field{
  width: 100%;
}
</style>

