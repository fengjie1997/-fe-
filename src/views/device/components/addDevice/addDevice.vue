<template>
  <div class="app-container">
    <el-form
      ref="addDeviceForm"
      :model="deviceForm"
      status-icon
      :show-message="false"
      label-width="120px"
      class="deviceForm"
      label-position="left"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('device.group')" prop="groupId" required>
            <tree-select
              v-model="deviceForm.groupId"
              :multiple="false"
              :options="groupData"
              :flat="true"
              :normalizer="groupNormalizer"
              :placeholder="$t('device.seleGroup')"
              style="width: 235px;"
              :default-expand-level="Infinity"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('device.deviceName')" prop="name" required>
            <el-input v-model="deviceForm.name" style="width: 235px;" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col v-if="typeId != 1 && typeId != 10 && typeId != 7" :span="24">
          <el-form-item :label="$t('device.deviceID')" prop="guid" required class="device-id">
            <el-input v-model="deviceForm.guid" style="width: 606px;" />
          </el-form-item>
          <div class="device-id-example">
            <span>{{ $t('device.example') }} : {12345a78-12e4-1234-1234-123456789f69}</span>
          </div>
        </el-col>

        <el-col v-if="typeId == 1 || typeId == 10 || typeId == 7" :span="24">
          <el-form-item :label="$t('device.deviceID')" prop="guid" required class="device-id">
            <el-input v-model="deviceForm.guid" style="width: 606px;" />
          </el-form-item>
          <div class="device-id-example">
            <span>{{ $t('device.example') }} : 0x01000312</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('device.deviceVersion')" prop="deviceVersion">
            <el-select v-if="typeId == 0" v-model="deviceForm.deviceVersion" :placeholder="$t('common.pleaseSelect')" filterable style="width: 235px;" @blur="selectBlur($event,-1000)">
              <el-option v-if="typeId == 0" label="rcu20" value="rcu20" />
              <el-option v-if="typeId == 0" label="rcu30" value="rcu30" />
            </el-select>
            <el-input v-if="typeId !=0" v-model="deviceForm.deviceVersion" style="width: 235px;" />
            <!--<el-autocomplete
              v-model="deviceForm.deviceVersion"
              class="inline-input"
              :fetch-suggestions="querySearch"
              :placeholder="$t('common.pleaseSelect')"
            />-->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!--          <el-form-item v-if="typeId == 0 || typeId == 8 || typeId == 3 || typeId == 9" :label="$t('device.maxExtend')" prop="maxExtendPort" label-width="130px">-->
          <!--            <el-select v-model.number="deviceForm.maxExtendPort" :placeholder="$t('common.pleaseSelect')" style="width:100%">-->
          <!--              <el-option label="1" value="1" />-->
          <!--              <el-option label="2" value="2" />-->
          <!--              <el-option label="3" value="3" />-->
          <!--              <el-option label="4" value="4" />-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <el-form-item v-if="typeId == 1 || typeId == 6 || typeId == 7 || typeId == 10" :label="$t('device.factory')" prop="vendor">
            <el-select v-model="deviceForm.vendor" style="width: 235px;">
              <el-option v-for="item in factory" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item :label="$t('device.coordinate')">
            <el-checkbox v-model="checked" @change="handleCoordinate" />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item v-if="checked" :label="$t('device.staticLongitude')" prop="staticLongitude" required>
            <el-input-number v-model.number="deviceForm.staticLongitude" :min="-180" :max="180" style="width: 143px;" />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item v-if="checked" :label="$t('device.staticLatitude')" prop="staticLatitude" required>
            <el-input-number v-model.number="deviceForm.staticLatitude" :min="-90" :max="90" style="width: 143px;" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="typeId == 2 || typeId == 10 || typeId == 11">
        <el-col v-if="typeId != 11" :span="12">
          <el-form-item :label="$t('device.imei')" prop="imei">
            <el-input v-model="deviceForm.imei" style="width: 235px;" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('device.PhoneModel')" prop="phoneModel">
            <el-input v-model="deviceForm.phoneModel" style="width: 235px;" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 端口号-->

      <hr v-if="typeId != 2">
      <el-form-item v-if="typeId != 2" :label="$t('device.port')" prop="port">
        <el-select
          v-model="deviceForm.port"
          :placeholder="$t('device.selectPort')"
          style="width: 235px; margin-right: 12px;"
          @change="rcuPorts(deviceForm.port)"
        >
          <el-option v-for="item in ports" :key="item" :label="item" :value="item" />
        </el-select>
        <el-tooltip :content="$t('common.add')">
          <el-button type="primary" icon="el-icon-plus" @click="handlePorts" />
        </el-tooltip>
        <el-tooltip :content="$t('common.delete')">
          <el-button type="danger" icon="el-icon-delete" @click="handleRcuPort" />
        </el-tooltip>
      </el-form-item>
      <hr>
      <!--      <el-form-item style="width: 100%">-->
      <el-table
        ref="multipleTable"
        v-col-width-limit
        :data="deviceForm.rcuPort"
        max-height="250"
        style="width: 100%"
        border
        is-horizontal-resize
        @selection-change="handleSelection"
      >
        <el-table-column
          v-if="typeId != 2 && typeId != 10 && typeId != 11"
          :key="1"
          type="selection"
          width="40"
          align="center"
          fixed
        />
        <el-table-column
          v-if="typeId != 2 && typeId != 10 && typeId != 11"
          :key="2"
          :label="$t('device.portNum')"
          width="60"
          min-width="60"
        >
          <template slot-scope="scope">{{ scope.row.port }}</template>
        </el-table-column>
        <el-table-column
          :key="3"
          prop="name"
          :label="$t('device.netType')"
          width="140"
          min-width="140"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.netType" @change="handelNetType(scope.row.port)">
              <el-option v-for="item in networkType" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          v-if="typeId != 2 && typeId != 10 && typeId != 11"
          :key="4"
          prop="address"
          :label="$t('device.portDeviceType')"
          width="140"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.portDeviceType " @change="handelPortDeviceType(scope.row.portDeviceType,scope.row.port)">
              <el-option v-for="item in devicePortType" :key="item.code" :label="item.name" :value="item.code" :disabled="item.disabled" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          v-if="typeId != 1 && typeId != 10"
          :key="5"
          prop="name"
          :label="$t('device.deviceType')"
          width="140"
          min-width="140"
        >
          <template slot-scope="scope">
            <!--            <el-input v-model="scope.row.deviceModel" />-->
            <!--<el-select v-model="scope.row.deviceModel">
                <el-option v-for="item in deviceTypes" :key="item.code" :label="item.name" :value="item.name" />
              </el-select>-->
            <div>
              <el-select v-model="scope.row.deviceModel" filterable @blur="selectBlur($event,scope.row)">
                <el-option v-for="item in testDeviceTypes" :key="item.code" :label="item.name" :value="item.name" />
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :key="6"
          prop="name"
          :label="$t('device.imsi')"
          min-width="160"
          required
        >
          <template slot-scope="scope" required>
            <el-input v-model="scope.row.imsi" required />
          </template>
        </el-table-column>

        <!-- SIM卡 弹出 -->

        <el-table-column
          :key="7"
          prop="name"
          label="SIM"
          width="45"
          min-width="45"
          :resizable="false"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-tooltip content="SIM">
              <el-button icon="el-icon-edit" @click="nowSimInfoNum = scope.$index, innerDialog = true" />
            </el-tooltip>
          </template>
        </el-table-column>

      </el-table>
      <!--      </el-form-item>-->
    </el-form>

    <!--    弹出-->

    <div>
      <el-dialog :visible.sync="innerDialog" width="750px" append-to-body :title="$t('device.info')" :close-on-click-modal="false">
        <el-form :data="deviceForm.rcuPort[nowSimInfoNum]" label-position="left" label-width="140px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('device.phone')" prop="phoneNumber">
                <el-input v-model="deviceForm.rcuPort[nowSimInfoNum].phoneNumber" style="width: 200px;" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('device.SMSCenter')" prop="smscNumber">
                <el-input v-model="deviceForm.rcuPort[nowSimInfoNum].smscNumber" style="width: 200px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <div style="height: 35px;">
            <span style="font-size: 17px;line-height: 24px;">{{ $t('device.ras') }}</span>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('device.rasNum')" prop="rasNumber">
                <el-input v-model="deviceForm.rcuPort[nowSimInfoNum].rasNumber" style="width: 200px;" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('device.timeOut')" prop="timeout">
                <el-select v-model="deviceForm.rcuPort[nowSimInfoNum].timeout" :placeholder="$t('common.pleaseSelect')" style="width: 200px;">
                  <el-option v-for="item in times" :key="item.t" :label="item.t" :value="item.t" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('device.user')" prop="userName">
                <el-input v-model="deviceForm.rcuPort[nowSimInfoNum].userName" style="width: 200px;" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('device.password')" prop="password">
                <el-input v-model="deviceForm.rcuPort[nowSimInfoNum].password" type="password" style="width: 200px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('device.apn')" prop="apn">
                <el-input v-model="deviceForm.rcuPort[nowSimInfoNum].apn" style="width: 200px;" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('device.template')" prop="name">
                <el-select
                  v-model="deviceForm.rcuPort[nowSimInfoNum].name"
                  :placeholder="$t('common.pleaseSelect')"
                  style="width: 170px;"
                  @visible-change="getRasList()"
                  @change="handleRasData(nowSimInfoNum)"
                >
                  <el-option v-for="item in rasData" :key="item.id" :label="item.name" :value="item.name" />
                </el-select>
                <el-tooltip :content="$t('common.edit')">
                  <el-button type="primary" icon="el-icon-edit" style="padding: 7px 6px;" @click="handleRas()" />
                </el-tooltip>
              </el-form-item>
            </el-col>
          </el-row>

          <div align="right">
            <el-button @click="resetFrom2(nowSimInfoNum)">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="innerDialog = false">{{ $t('common.save') }}
            </el-button>
          </div>
        </el-form>

        <el-dialog :title="$t('device.templateMg')" :visible.sync="innerDialog2" width="800px" append-to-body :close-on-click-modal="false">
          <div style="margin-bottom: 5px;">
            <el-tooltip :content="$t('common.add')">
              <el-button type="primary" icon="el-icon-plus" @click="handelAddRasData" />
            </el-tooltip>
            <el-tooltip :content="$t('common.delete')">
              <el-button type="danger" icon="el-icon-minus" @click="handleDeleteRas" />
            </el-tooltip>
          </div>
          <el-form ref="addRasForm" v-model="rasData">
            <el-form-item>
              <el-table
                ref="multipleTable"
                v-col-width-limit
                :data="rasData"
                style="width: 100%;"
                max-height="300"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="index"
                  width="30"
                  fixed
                />
                <el-table-column
                  type="selection"
                  width="40"
                  align="center"
                  fixed
                />
                <el-table-column
                  :label="$t('device.RasName')"
                  width="110"
                  min-width="110"
                  required
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.name" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="rasNumber"
                  :label="$t('device.rasNum')"
                  width="130"
                  min-width="130"
                  required
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.rasNumber" type="number" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="timeout"
                  :label="$t('device.timeOut')"
                  width="130"
                  min-width="130"
                  required
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.timeout" type="number" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="apn"
                  :label="$t('device.apn')"
                  width="90"
                  min-width="90"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.apn" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="userName"
                  :label="$t('device.user')"
                  width="110"
                  min-width="110"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.userName" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="password"
                  :label="$t('device.password')"
                  width="110"
                  min-width="110"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.password" type="password" />
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerDialog2 = false">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSaveRas">{{ $t('common.save') }}</el-button>
          </div>
        </el-dialog>

      </el-dialog>
    </div>

  </div>
</template>

<script>
import addDevice from './addDevice.js'
export default {
  ...addDevice
}
</script>
<style scoped>
  .el-table >>> .el-button,
  .el-table >>> .el-button--mini {
    padding: 5px;
  }
  .device-id {
    margin-bottom: 0;
  }
  .device-id-example {
    font-size: 12px;
    text-align: right;
    padding-right: 20px;
  }
  .el-form-item >>> .vue-treeselect__control {
    height: 28px;
    line-height: 28px;
    font-size: 12px;
  }
  .el-form-item >>> .vue-treeselect__placeholder,.el-form-item >>> .vue-treeselect__single-value {
    line-height: 28px;
  }

  .el-form-item >>> .vue-treeselect__option {
    font-size: 12px;
    font-weight: normal;
  }

  .el-form-item >>> .vue-treeselect__menu {
    font-size: 12px;
    font-weight: normal;
  }

  .deviceForm >>> .el-row {
    margin: 5px 0;
  }
</style>
