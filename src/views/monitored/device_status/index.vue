<template>
  <div class="full-hw">
    <fleet-single-table
      :filter-show-count="2"
      show-tool-bar
      :filter-default-data="listQuery"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"
      @filter-handle="handleFilter"
    >
      <div slot="tool-bar">
        <el-tooltip v-if="refresh" :content="$t('common.stopRefresh')">
          <el-button icon="el-icon-loading" type="primary" @click="handleStopRefresh" />
        </el-tooltip>
        <el-tooltip v-if="!refresh" :content="$t('common.autoRefresh')">
          <el-button icon="el-icon-d-arrow-right" type="primary" @click="handleRefresh" />
        </el-tooltip>
        <el-tooltip :content="$t('device.disconnect')">
          <el-button type="danger" icon="el-icon-close" @click="handleDisconnect" />
        </el-tooltip>
        <el-tooltip :content="$t('device.restart')">
          <el-button type="primary" icon="el-icon-refresh-right" @click="handleReboot" />
        </el-tooltip>
        <el-tooltip :content="$t('device.updatePlan')">
          <el-button type="primary" icon="el-icon-refresh" @click="handleUpdatePlan" />
        </el-tooltip>
        <el-tooltip :content="$t('device.play')">
          <el-button type="primary" icon="el-icon-video-play" @click="handlePlay" />
        </el-tooltip>
        <el-tooltip :content="$t('device.pause')">
          <el-button type="warning" icon="el-icon-video-pause" @click="handlePause" />
        </el-tooltip>
        <el-tooltip :content="$t('device.stop')">
          <el-button type="danger" icon="el-icon-switch-button" @click="handleStop" />
        </el-tooltip>
      </div>
      <div slot="main-table" class="full-hw">
        <el-table
          ref="multipleTable"
          v-col-width-limit
          v-loading="listLoading"
          :data="list"
          border
          highlight-current-row
          height="100%"
          @selection-change="handleSelect"
        >
          <el-table-column
            type="selection"
            align="center"
            width="40"
          />
          <template v-for="(item,index) in tableHead">
            <el-table-column v-if="item.property !== 'id'" :key="index" :prop="item.property" :label="item.label" :width="item.width" :min-width="item.minWidth" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="item.property === 'deviceType'">{{ getTableDeviceType(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'groupId'">{{ getTableDeviceGroupId(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'status'" :class="{ 'device-online': scope.row[item.property] === '1' }">{{ getTableDeviceStatus(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'lastLogoutDatetime'">{{ getTableTime(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'onlineDuration'">{{ getToFixed(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'speed'">{{ getToFixed(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'memoryRemain'">{{ getRemain(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'dosDataRemain'">{{ getRemain(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'notUploadFileSize'">{{ getFileNum(scope.row[item.property]) }}</span>
                <!-- 时间 -->
                <!--              <span v-if="item.property === 'taskName'">{{ getTaskName(scope.row[item.property]) }}</span>-->
                <!--              <span v-else-if="scope.row[item.property] === undefined">{{ '无更新记录' }}</span>-->
                <!--              <span v-else-if="item.time && scope.row[item.property] !== undefined">{{ getTime(scope.row[item.property]) }}</span>-->
                <!--              &lt;!&ndash; 按钮 &ndash;&gt;-->
                <!--              <span v-else>{{ scope.row[item.property] }}</span>-->
                <span v-else>{{ scope.row[item.property] }}</span>
              </template>
            </el-table-column>
          </template>
          <!-- 操作 -->
          <el-table-column fixed="right" :label="$t('common.actions')" align="center" width="83">
            <template slot-scope="scope">
              <el-tooltip :content="$t('uploadFileList.uploadFile')">
                <el-button icon="el-icon-document" @click="handleView(scope.row)" />
              </el-tooltip>
              <el-tooltip :content="$t('uploadFileList.log')">
                <el-button icon="el-icon-position" plain type="danger" @click="handleSend(scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer-page">
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="getList" />
      </div>
    </fleet-single-table>
    <!-- 待上传文件列表 -->
    <el-dialog v-if="dialogVisible" :title="$t('deviceStatus.uploadFileList')" :visible.sync="dialogVisible" :modal-append-to-body="false" width="700px">
      <el-form :inline="true" style="margin-bottom: auto">
        <el-form-item :label="$t('uploadFileList.port')">
          <el-select v-model="uploadQuery.ports" multiple collapse-tags :placeholder="$t('uploadFileList.selectPort')" style="width: 150px;" class="filter-item">
            <el-option v-for="item in uploadFilePortsOptions" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <!--          <el-form-item>-->
        <!--            <el-select v-model="uploadQuery.type" multiple collapse-tags style="width: 150px;" class="filter-item">-->
        <!--              <el-option v-for="item in uploadFileTypeOptions" :key="item.value" :label="item.label" :value="item.value" />-->
        <!--            </el-select>-->
        <!--          </el-form-item>-->
        <el-form-item>
          <el-tooltip :content="$t('common.search')">
            <el-button :loading="listLoading" type="primary" icon="el-icon-search" @click="handleSearchUploadList" />
          </el-tooltip>
        </el-form-item>
        <span style="margin-left: 20px">{{ $t('uploadFileList.uploadFileCount') }}:{{ uploadFileCount }}</span>
        <span style="margin-left: 20px">{{ $t('uploadFileList.uploadFileSize') }}: {{ uploadFileSize }}M</span>
      </el-form>
      <el-table
        ref="multipleTable"
        v-col-width-limit
        :data="uploadFileList"
        style="width: 100%;"
        border
        fit
        highlight-current-row
        height="100%"
      >
        <!--          @selection-change="handleSelectionChange"-->
        <el-table-column :label="$t('uploadFileList.fileName')" min-width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.fileName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('uploadFileList.fileSize')" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.fileSize }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('uploadFileList.port')" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.port }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('uploadFileList.isUploading')" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.isUploading }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer" style="margin-top: 8px">
        <el-button @click="dialogVisible = false, uploadQuery.ports=[]">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="dialogVisible = false, uploadQuery.ports=[]">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 交互信息 -->
    <el-dialog v-if="dialogVisibleInfo" :title="$t('deviceStatus.interactiveInformation')" :visible.sync="dialogVisibleInfo" :modal-append-to-body="false" class="infmationZindex">
      <el-card class="box-card" style="height: 100%">
        <span>{{ $t('common.pleaseWait') }}</span>
        <span>&nbsp;</span>
        <div v-for="(item,index) in multipleSelection" :key="index" class="text item" style="height: 100%">
          <div>{{ $t('common.sendCommand') + ' (' + $t('device.name') + ':' + item.deviceName + ' ' + $t('common.command') + ':' + command + ')' }}</div>
          <div>{{ $t('common.responseResults') + ':' + info[index] }} </div>
          <span>&nbsp;</span>
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer" style="margin-top: 8px">
        <el-button @click="dialogVisibleInfo = false">{{ $t('common.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchDeviceStatusList,
  fetchGroupList,
  fetchUpdatePlan,
  fetchDisconnect,
  fetchPause,
  fetchPlay,
  fetchReboot,
  fetchStop,
  fetchDeviceFileList,
  fetchUploadLog
} from '../../../api/monitored/monitored'
import { getDeviceType, getDeviceStatus } from '../../../utils/MonitoredTable'
import { getCacheDict } from '../../../utils/dictCache'
import waves from '../../../directive/waves/waves'
import Pagination from '@/components/Pagination'
import { getTime } from '../../../utils/timeZone'
import FleetSingleTable from '@/components/FleetCardTable/single-table'
import { mapGetters } from 'vuex'
export default {
  name: 'DeviceStatus',
  components: { Pagination, FleetSingleTable },
  directives: { waves },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      filterFieldList: [
        { label: this.$t('device.name'), placeholder: this.$t('common.inputTip'), type: 'input', value: 'name' },
        { label: this.$t('common.deviceType'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'types', list: 'deviceTypeOptions', optionKey: 'key', multiple: true, clearable: true },
        { label: this.$t('device.deviceStatus'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'statuses', list: 'deviceStatusOptions', optionKey: 'key', multiple: true, clearable: true }
        // { label: this.$t('common.sort'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'isAsc', list: 'orderOptions', optionKey: 'key' }
      ],
      listTypeInfo: {
        deviceTypeOptions: [],
        deviceStatusOptions: [],
        orderOptions: [
          { label: this.$t('common.asc'), key: 1, value: 1 },
          { label: this.$t('common.desc'), key: 0, value: 0 }
        ]
      },
      // 交互信息
      dialogVisibleInfo: false,
      info: [],
      command: '',
      // 作为过滤的端口的参数
      uploadId: '',
      refresh: false,
      /*
      待上传文件弹窗
       */
      dialogVisible: false,
      uploadFileCount: 0,
      uploadFileSize: 0,
      uploadFileList: [],
      uploadQuery: {
        ports: [],
        type: ''
      },
      uploadFilePortsOptions: [{ label: 1, key: 1 }, { label: 2, key: 2 }, { label: 3, key: 3 }, { label: 4, key: 4 }, { label: 5, key: 5 }, { label: 6, key: 6 }, { label: 7, key: 7 }, { label: 8, key: 8 }, { label: 9, key: 9 }, { label: 10, key: 10 }, { label: 11, key: 11 }, { label: 12, key: 12 }, { label: 13, key: 13 }],
      uploadFileTypeOptions: [{ label: this.$t('uploadFileList.skipData'), value: 1 }, { label: this.$t('uploadFileList.skipFile'), value: 2 }, { label: this.$t('uploadFileList.skipAll'), value: 3 }],
      uploadFileTableHead: [{
        property: 'fileName', label: this.$t('deviceStatus.fileName')
      }, {
        property: 'port', label: this.$t('device.portNum')
      }, {
        property: 'fileSize', label: this.$t('deviceStatus.fileSize')
      }, {
        property: 'isUploading', label: this.$t('deviceStatus.isUploading')
      }],
      cutId: '',
      groupIds: [],
      listLoading: false,
      deviceIdsOptions: [],
      groupIdsOptions: [],
      fieldOptions: [{ label: this.$t('device.deviceID'), value: 'id' }],
      listQuery: {
        limit: 20,
        page: 1,
        field: 'status',
        isAsc: 1,
        deviceIds: [],
        groupIds: [],
        name: '',
        statuses: [],
        types: []
      },
      list: [],
      total: 0,
      multipleSelection: [],
      groupId: [],
      tableHead: [{
        property: 'deviceName', label: this.$t('device.deviceName'), minWidth: 250
      }, {
        property: 'deviceType', label: this.$t('device.deviceType'), width: 120, minWidth: 120
      }, {
        property: 'groupId', label: this.$t('device.deviceGroup'), width: 120, minWidth: 120
      }, {
        property: 'status', label: this.$t('device.state'), width: 100, minWidth: 100
      }, {
        property: 'onlineDuration', label: this.$t('deviceStatus.onlineTime'), width: 140, minWidth: 140
      }, {
        property: 'lastLogoutDatetime', label: this.$t('deviceStatus.lastTime'), time: true, width: 180, minWidth: 180
      }, {
        property: 'speed', label: this.$t('deviceStatus.speed'), width: 120, minWidth: 120
      }, {
        property: 'realtimeLongitude', label: this.$t('common.lon'), width: 120, minWidth: 120
      }, {
        property: 'realtimeLatitude', label: this.$t('common.lat'), width: 120, minWidth: 120
      }, {
        property: 'batteryRemain', label: this.$t('deviceStatus.batteryRemain'), width: 150, minWidth: 150
      }, {
        property: 'powerTemperature', label: this.$t('deviceStatus.powerTemperature'), width: 120, minWidth: 120
      }, {
        property: 'memoryRemain', label: this.$t('deviceStatus.memoryRemain'), width: 170, minWidth: 170
      }, {
        property: 'dosDataRemain', label: this.$t('deviceStatus.dosDataRemain'), width: 170, minWidth: 170
      }, {
        property: 'notUploadFileNum', label: this.$t('deviceStatus.notUploadFileNum'), width: 120, minWidth: 120
      }, {
        property: 'notUploadFileSize', label: this.$t('deviceStatus.notUploadFileSize'), width: 150, minWidth: 150
      }, {
        property: 'version', label: this.$t('common.version'), width: 120, minWidth: 120
      }]
    }
  },
  computed: {
    ...mapGetters({
      flattenGroups: 'flattenGroups'
    })
  },
  created() {
    this.getList()
    this.getFormOptions()
    this.getGroupIds()
  },
  mounted() {
    // if (this.refresh) {
    // }
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    async getList(filterData) {
      this.refresh = !!this.timer
      this.listLoading = true
      const params = Object.assign({}, this.listQuery, filterData)
      fetchDeviceStatusList(params, this.model.groupIds).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = data.data.total
        }
      }).finally(() => {
        this.listLoading = false
      })
    },
    getTableTime(time) {
      return getTime(time, this.$store.getters.timezone)
    },
    // 对上传文件接口进行解析
    getDeviceList(id) {
      let data = {}
      const list = []
      let num = 0
      this.uploadFileSize = 0
      this.uploadFileCount = 0
      fetchDeviceFileList(id).then(response => {
        data = response.data
        for (const key in data.data) {
          list[num] = {}
          list[num].fileName = key
          list[num].port = data.data[key].port
          list[num].fileSize = (Math.round(data.data[key].fileSize * 10000 / 1024 / 1024) / 10000.00).toFixed(2)
          if (data.data[key].isUploading) {
            list[num].isUploading = this.$t('deviceStatus.uploading')
          } else {
            list[num].isUploading = this.$t('deviceStatus.noUpload')
          }
          this.uploadFileSize = Number(this.uploadFileSize) + Number(list[num].fileSize)
          num++
          this.uploadFileCount = num
        }
        this.uploadFileList = list
      })
    },
    // 待上传文件端口的过滤
    portBool(arr, data) {
      let bool = false
      for (const i in arr) {
        if (arr[i] === data) {
          bool = true
        }
      }
      return bool
    },
    getListByPort() {
      this.getDeviceList(this.uploadId)
      setTimeout(() => {
        const list = []
        for (const i in this.uploadFileList) {
          if (this.portBool(this.uploadQuery.ports, this.uploadFileList[i].port)) {
            list.push(this.uploadFileList[i])
          }
        }
        this.uploadFileList = list
      }, 400)
    },
    handleSearchUploadList() {
      if (this.uploadQuery.ports.length > 0) {
        this.getListByPort()
      }
    },
    // 待上传文件弹窗
    handleView(data) {
      this.uploadId = data.deviceId
      this.getDeviceList(data.deviceId)
      this.dialogVisible = true
    },
    handleSend(data) {
      fetchUploadLog(data).then(response => {
        if (response.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('deviceStatus.sendSuccess'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    getGroupIds() {
      fetchGroupList().then(res => {
        const data = res.data
        if (data.code === 1) {
          this.groupIds = data.data
        }
      })
    },
    getFormOptions() {
      // 设备类型
      const deviceTypes = getCacheDict('deviceType')
      for (let i = 0; i < deviceTypes.length; i++) {
        this.listTypeInfo.deviceTypeOptions.push({
          label: deviceTypes[i].name,
          key: deviceTypes[i].code,
          value: deviceTypes[i].code
        })
      }
      // 设备状态
      const deviceStatusList = getCacheDict('deviceStatus')
      for (let i = 0; i < deviceStatusList.length; i++) {
        this.listTypeInfo.deviceStatusOptions.push({
          label: deviceStatusList[i].name,
          key: deviceStatusList[i].code,
          value: deviceStatusList[i].code
        })
      }
    },
    getTableDeviceType(data) {
      return getDeviceType(data)
    },
    getTableDeviceStatus(data) {
      return getDeviceStatus(data)
    },
    getToFixed(data) {
      if (data !== undefined && data !== null && data !== '') {
        return data.toFixed(2)
      } else {
        return
      }
    },
    getRemain(remain) {
      if (remain !== undefined && remain !== null && remain !== '') {
        const data = Number(remain)
        return (Math.round(data * 10000 / 1024) / 10000.00).toFixed(2)
      } else {
        return
      }
    },
    getFileNum(remain) {
      if (remain !== undefined && remain !== null && remain !== '') {
        const data = Number(remain)
        return (Math.round(data * 10000 / 1024 / 1024) / 10000.00).toFixed(2)
      } else {
        return
      }
    },
    // 所属分组转换
    getTableDeviceGroupId(groupId) {
      const group = this.flattenGroups[groupId]
      if (!group) return groupId
      return group.name
    },
    handleClearSearchForm() {
      this.listQuery.groupIds = []
      this.listQuery.name = ''
      this.listQuery.statuses = []
      this.list.types = []
    },
    handleDisconnect() {
      const arr = []
      if (this.multipleSelection.length < 1) {
        this.$alert(this.$t('deviceStatus.selectDevice'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {
          }
        })
      } else {
        this.$confirm(this.$t('common.deviceCommand1') + '"' + this.$t('device.disconnect') + '"' + this.$t('common.deviceCommand2'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning',
          center: false
        }).then(() => {
          this.dialogVisibleInfo = true
          for (const i in this.multipleSelection) {
            arr.push(fetchDisconnect(this.multipleSelection[i]))
          }
          Promise.all(arr).then(response => {
            this.command = this.$t('device.disconnect')
            for (const i in response) {
              console.log(response[i])
              if (response[i].data.code === 1) {
                this.info[i] = this.$t('common.success')
              } else {
                this.info[i] = this.$t('errorCode.' + response[i].data.errorCode.toString())
              }
            }
          })
        })
      }
    },
    handleReboot() {
      if (this.multipleSelection.length < 1) {
        this.$alert(this.$t('deviceStatus.selectDevice'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {
          }
        })
      } else {
        const arr = []
        this.$confirm(this.$t('common.deviceCommand1') + '"' + this.$t('device.restart') + '"' + this.$t('common.deviceCommand2'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning',
          center: false
        }).then(() => {
          this.dialogVisibleInfo = true
          for (const i in this.multipleSelection) {
            arr.push(fetchReboot(this.multipleSelection[i]))
          }
          this.command = this.$t('device.restart')
          Promise.all(arr).then(response => {
            for (const i in response) {
              if (response[i].data.code === 1) {
                this.info[i] = this.$t('common.success')
              } else {
                this.info[i] = this.$t('errorCode.' + response[i].data.errorCode.toString())
              }
            }
          })
        })
      }
      // else {
      //   fetchReboot(this.multipleSelection[0]).then(response => {
      //     if (response.data.code === 1) {
      //       this.$notify({
      //         title: this.$t('common.success'),
      //         message: this.$t('deviceStatus.restartSuccess'),
      //         type: 'success',
      //         duration: 2000
      //       })
      //     }
      //     this.getList()
      //   })
      // }
    },
    handleStopRefresh() {
      console.log(this.timer)
      this.refresh = false
      clearInterval(this.timer)
    },
    handleRefresh() {
      console.log(this.timer)
      this.refresh = true
      if (this.timer) {
        clearInterval(this.timer)
      } else {
        this.timer = setInterval(() => {
          this.getList()
        }, 5000)
      }
    },
    handleUpdatePlan() {
      if (this.multipleSelection.length < 1) {
        this.$alert(this.$t('deviceStatus.selectDevice'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {
          }
        })
      } else {
        const arr = []
        this.$confirm(this.$t('common.deviceCommand1') + '"' + this.$t('device.updatePlan') + '"' + this.$t('common.deviceCommand2'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning',
          center: false
        }).then(() => {
          this.dialogVisibleInfo = true
          for (const i in this.multipleSelection) {
            arr.push(fetchUpdatePlan(this.multipleSelection[i]))
          }
          this.command = this.$t('device.updatePlan')
          Promise.all(arr).then(response => {
            for (const i in response) {
              if (response[i].data.code === 1) {
                this.info[i] = this.$t('common.success')
              } else {
                this.info[i] = this.$t('errorCode.' + response[i].data.errorCode.toString())
              }
              this.$set(this.info, i, this.info[i])
            }
          })
        })
      }
      // else {
      //   fetchUpdatePlan(this.multipleSelection[0]).then(response => {
      //     if (response.data.code === 1) {
      //       this.$notify({
      //         title: this.$t('common.success'),
      //         message: this.$t('deviceStatus.updatePlanSuccess'),
      //         type: 'success',
      //         duration: 2000
      //       })
      //     }
      //     this.getList()
      //   })
      // }
    },
    handlePlay() {
      if (this.multipleSelection.length < 1) {
        this.$alert(this.$t('deviceStatus.selectDevice'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {
          }
        })
      } else {
        const arr = []
        this.$confirm(this.$t('common.deviceCommand1') + '"' + this.$t('device.play') + '"' + this.$t('common.deviceCommand2'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning',
          center: false
        }).then(() => {
          this.dialogVisibleInfo = true
          for (const i in this.multipleSelection) {
            arr.push(fetchPlay(this.multipleSelection[i]))
          }
          this.command = this.$t('device.play')
          Promise.all(arr).then(response => {
            for (const i in response) {
              if (response[i].data.code === 1) {
                this.info[i] = this.$t('common.success')
              } else {
                this.info[i] = this.$t('errorCode.' + response[i].data.errorCode.toString())
              }
              this.$set(this.info, i, this.info[i])
            }
          })
        })
      }
      // else {
      //   fetchPlay(this.multipleSelection[0]).then(response => {
      //     if (response.data.code === 1) {
      //       this.$notify({
      //         title: this.$t('common.success'),
      //         message: this.$t('deviceStatus.playSuccess'),
      //         type: 'success',
      //         duration: 2000
      //       })
      //     }
      //     this.getList()
      //   })
      // }
    },
    handlePause() {
      if (this.multipleSelection.length < 1) {
        this.$alert(this.$t('deviceStatus.selectDevice'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {
          }
        })
      } else {
        const arr = []
        this.$confirm(this.$t('common.deviceCommand1') + '"' + this.$t('device.pause') + '"' + this.$t('common.deviceCommand2'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning',
          center: false
        }).then(() => {
          this.dialogVisibleInfo = true
          for (const i in this.multipleSelection) {
            arr.push(fetchPause(this.multipleSelection[i]))
          }
          this.command = this.$t('device.pause')
          Promise.all(arr).then(response => {
            for (const i in response) {
              console.log(response)
              if (response[i].data.code === 1) {
                this.info[i] = this.$t('common.success')
                console.log(this.info[i])
              } else {
                this.info[i] = this.$t('errorCode.' + response[i].data.errorCode.toString())
                console.log(this.info[i])
              }
              this.$set(this.info, i, this.info[i])
            }
          })
        })
      }
      // else {
      //   fetchPause(this.multipleSelection[0]).then(response => {
      //     if (response.data.code === 1) {
      //       this.$notify({
      //         title: this.$t('common.success'),
      //         message: this.$t('deviceStatus.pauseSuccess'),
      //         type: 'success',
      //         duration: 2000
      //       })
      //     }
      //     this.getList()
      //   })
      // }
    },
    handleStop() {
      if (this.multipleSelection.length < 1) {
        this.$alert(this.$t('deviceStatus.selectDevice'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {
          }
        })
      } else {
        const arr = []
        this.$confirm(this.$t('common.deviceCommand1') + '"' + this.$t('device.stop') + '"' + this.$t('common.deviceCommand2'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning',
          center: false
        }).then(() => {
          this.dialogVisibleInfo = true
          for (const i in this.multipleSelection) {
            arr.push(fetchStop(this.multipleSelection[i]))
          }
          this.command = this.$t('device.stop')
          Promise.all(arr).then(response => {
            for (const i in response) {
              if (response[i].data.code === 1) {
                this.info[i] = this.$t('common.success')
              } else {
                this.info[i] = this.$t('errorCode.' + response[i].data.errorCode.toString())
              }
              this.$set(this.info, i, this.info[i])
            }
          })
        })
      }
      // else {
      //   fetchStop(this.multipleSelection[0]).then(response => {
      //     if (response.data.code === 1) {
      //       this.$notify({
      //         title: this.$t('common.success'),
      //         message: this.$t('deviceStatus.stopSuccess'),
      //         type: 'success',
      //         duration: 2000
      //       })
      //     }
      //     this.getList()
      //   })
      // }
    },
    handleFilter(filterData) {
      this.listQuery.page = 1
      this.getList(filterData)
    },
    handleSelect(val, row) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
      // if (val.length > 1) {
      //   this.$refs.multipleTable.clearSelection() // 清空所有选择
      //   val.shift()
      //   this.$refs.multipleTable.toggleRowSelection(row) //  选中当前选择
      // }
      // const selected = val.length && val.indexOf(row) !== -1
      // console.log(selected) true就是选中，0或者false是取消选中
    },
    // handleSelectionChange(row) {
    //   this.multipleSelection = row
    //   clearInterval(this.timer)
    //   if (this.multipleSelection.length === 0) {
    //     this.timer = setInterval(() => {
    //       this.getList()
    //     }, 5000)
    //   }
    // },
    handleGroupChange(data) {
      this.listQuery.groupIds = []
      for (const i in data) {
        this.listQuery.groupIds.push(data[i][1])
      }
    }
  }
}
</script>

<style scoped>
.infmationZindex{
  z-index: 9999!important;
}
</style>
