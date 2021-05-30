<template>
  <div class="full-hw">
    <fleet-card-table
      :filter-default-data="listParam"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"
      :filter-show-count="3"
      @filter-handle="handleFilter"
      @filter-reset-handle="handleReset"
      @left-refresh-handle="handleRefresh"
    >
      <span slot="left-title">{{ $t('common.groupList') }}</span>
      <div slot="left-tree" class="full-hw scroll-auto">
        <el-tree
          ref="deviceTree"
          class="full-hw"
          :data="groupTree"
          :props="treeProps"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        />
      </div>
      <div slot="tool-bar">
        <el-tooltip :content="$t('common.export')">
          <el-button type="primary" icon="el-icon-download" @click="downloadExcel()" />
        </el-tooltip>
        <el-tooltip :content="$t('device.senior')">
          <el-button type="primary" icon="el-icon-check" @click="handleSenior()" />
        </el-tooltip>
      </div>
      <div slot="main-table" class="full-hw">
        <div ref="tableTip" style="height: 100%;">
          <plx-table-grid
            ref="statisticsTable"
            v-loading="listLoading"
            v-col-width-limit
            :data="list"
            border
            fit
            style="width: 100%;"
            :empty-text="$t('device.tips.noData')"
            :height="tableHeight"
          >
            <!-- 数据 -->
            <plx-table-column
              type="index"
              :label="$t('common.num')"
              width="60"
              fixed="left"
              show-overflow-tooltip
            />
            <plx-table-column :label="$t('device.deviceGroup')" width="120" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.groupName }}</span>
              </template>
            </plx-table-column>
            <plx-table-column :label="$t('device.name')" min-width="260">
              <template slot-scope="scope">
                <span>{{ scope.row.deviceName }}</span>
              </template>
            </plx-table-column>
            <plx-table-column :label="$t('common.deviceType')" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.deviceType }}</span>
              </template>
            </plx-table-column>
            <plx-table-column :label="$t('route.deviceStatus')" width="120">
              <template slot-scope="scope">
                <span :class="{ 'device-online': scope.row.onlineStatus === 1 }">{{ getStatus(scope.row.onlineStatus) }}</span>
              </template>
            </plx-table-column>
            <plx-table-column :label="$t('device.totalTestDuration')" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.totalTime }}</span>
              </template>
            </plx-table-column>
            <plx-table-column :label="$t('stateStatistics.totalDistance')" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.totalDistance }}</span>
              </template>
            </plx-table-column>
            <plx-table-column :label="$t('stateStatistics.fileCount')" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.sourceFileNum }}</span>
              </template>
            </plx-table-column>
            <template v-for="(item,index) in tableHead">
              <plx-table-column :key="index" :label="item" width="120">
                <template slot-scope="scope">
                  <span v-if="index % 2 === 0">{{ scope.row.distancesArr[index / 2] }}</span>
                  <span v-if="index % 2 === 1">{{ scope.row.timesArr[Math.floor(index / 2)] }}</span>
                </template>
              </plx-table-column>
            </template>
            <plx-table-column
              :label="$t('common.actions')"
              width="70"
              align="center"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-tooltip :content="$t('device.viewRecords')">
                  <el-button icon="el-icon-view" @click="handleViewRecords(scope.row)" />
                </el-tooltip>
              </template>
            </plx-table-column>
          </plx-table-grid>
        </div>
      </div>
      <div slot="footer-page">
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </div>
    </fleet-card-table>
    <el-dialog
      :title="$t('device.rulesForJudgingValidDocuments')"
      :visible.sync="dialogVisibleDevice"
      :modal-append-to-body="false"
      width="700px"
    >
      <div class="filter-container">
        <el-form ref="ruleForm" :inline="true" label-width="200px" class="demo-ruleForm">
          <el-row>
            <el-col :span="24">
              <div>
                <el-card class="box-card">
                  <div class="app-container">
                    <el-form-item>
                      <el-checkbox v-model="checkedTestDuration" style="margin-left: 40px" @change="testDurationCheck()" />
                    </el-form-item>
                    <el-form-item :label="$t('device.testDuration') + '(minute)'">
                      <el-input-number v-model="testDuration" controls-position="right" style="width: 280px" :disabled="!checkedTestDuration" @change="senior.testTime = testDuration * 60" />
                    </el-form-item>
                    <el-form-item>
                      <el-checkbox v-model="checkedTestDistance" style="margin-left: 40px" @change="testDistanceCheck()" />
                    </el-form-item>
                    <el-form-item :label="$t('stateStatistics.totalDistance') + '(KM)'">
                      <el-input-number v-model="testDistance" controls-position="right" style="width: 280px" :disabled="!checkedTestDistance" />
                    </el-form-item>
                    <el-form-item>
                      <el-checkbox v-model="checkedFileSize" style="margin-left: 40px" @change="fileSizeCheck()" />
                    </el-form-item>
                    <el-form-item :label="$t('device.dataSize') + '(MB)'">
                      <el-input-number v-model="fileSize" controls-position="right" style="width: 280px" :disabled="!checkedFileSize" />
                    </el-form-item>
                    <!--                    <el-form-item>-->
                    <!--                      <el-checkbox v-model="listParam.containTestTaskAble" style="margin-left: 40px" />-->
                    <!--                    </el-form-item>-->
                    <!--                    <el-form-item :label="$t('device.containsValidBusinessTests')" label-width="150px" />-->
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDevice">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="$t('device.programExitRecord')"
      :visible.sync="dialogVisibleRecord"
      :modal-append-to-body="false"
      width="800px"
    >
      <div class="filter-container">
        <el-table
          v-loading="recordLoading"
          v-col-width-limit
          :data="recordList"
          border
          fit
          height="500px"
          highlight-current-row
        >
          <!-- 数据 -->
          <el-table-column
            type="index"
            :label="$t('common.num')"
            width="60"
            min-width="60"
            fixed
          >
            <template slot-scope="scope">
              <span>{{ (listQuery.page - 1) * listQuery.limit + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.deviceGroup')" min-width="110">
            <template>
              <span>{{ recordGroupName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.name')" min-width="110">
            <template>
              <span>{{ recordDeviceName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.deviceType')" min-width="110">
            <template>
              <span>{{ recordDeviceType }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('reportFile.port')" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.devicePort }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('device.exitTime')" min-width="120">
            <template slot-scope="scope">
              <span>{{ getTableTime(scope.row.logoutDt) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('operateLog.logDescription')" min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.alarmContent }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="recordTotal" :page.sync="recordQuery.page" :limit.sync="recordQuery.limit" @pagination="handleViewRecords" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmRecord">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTime, pickerOptions } from '@/utils/timeZone'
import Pagination from '@/components/Pagination'
import { getStatistics, getLogoutInfo, downloadStatistics } from '@/api/device/device'
import { getTimeStamp, timestampToStr, getdiffdate } from '@/utils/timeZone'
import { getDictToNumberByLanguage } from '@/utils/dictByLanguage'
import { fileSizeFormat } from '@/utils/deviceUpgrade'
import FleetCardTable from '@/components/FleetCardTable'
import EventResizeDetector from 'element-resize-detector'
export default {
  name: 'DeviceStatistics',
  components: { Pagination, FleetCardTable },
  data() {
    return {
      // 表格高
      tableHeight: '',
      // 过滤条件: 分组 子分组 类型 端口 关键字
      filterFieldList: [
        { label: this.$t('device.type'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'deviceType', list: 'deviceTypeOptions', optionKey: 'key', clearable: true },
        { label: this.$t('reportFile.port'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'ports', list: 'portsOptions', optionKey: 'key', multiple: true, collapseTags: true, clearable: true },
        { label: this.$t('device.key'), placeholder: this.$t('common.inputTip'), type: 'input', value: 'keyWord' },
        { label: this.$t('device.timeRange  '), startPlaceholder: this.$t('common.startPlaceholder'), endPlaceholder: this.$t('common.endPlaceholder'), type: 'date', value: 'timeRange', dateType: 'daterange', width: '350px', clearable: true, valueFormat: 'timestamp' }
      ],
      // 过滤条件选项: 分组 子分组 类型 端口
      listTypeInfo: {
        deviceTypeOptions: getDictToNumberByLanguage('deviceType'),
        portsOptions: getDictToNumberByLanguage('devicePort')
      },
      // 分页参数
      listQuery: {
        limit: 20,
        page: 1,
        field: 'device.id',
        isAsc: 0
        // orderBy: '',
        // pageNum: ''
      },
      // 搜索参数
      listParam: {
        endDt: getTimeStamp(new Date()),
        startDt: new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7),
        userZoneStr: this.$store.getters.timezone,
        containTestTaskAble: false,
        deviceType: '',
        groupIds: undefined,
        isExport: false,
        keyWord: '',
        ports: []
      },
      // 搜索参数之高级
      senior: {
        fileSize: '',
        testDistance: '',
        testTime: ''
      },
      // 左侧数结构
      treeProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      checkedTestDuration: false,
      checkedTestDistance: false,
      checkedFileSize: false,
      testDuration: 20,
      testDistance: 1,
      fileSize: 0.5,
      // listParam: {
      // },
      tableHead: [],
      port: '',
      groupIds: [],
      list: [],
      time: [],
      total: 0,
      listLoading: false,
      groupOption: [],
      deviceTypeOptions: [],
      portOptions: [],
      pickerOptions: pickerOptions,
      dialogVisibleDevice: false,
      dialogVisibleRecord: false,
      recordList: [],
      recordQuery: {
        limit: 10,
        page: 1,
        field: '',
        isAsc: 1,
        orderBy: ''
      },
      recordTotal: 0,
      recordLoading: false,
      recordDeviceType: '',
      recordDeviceName: '',
      recordGroupName: '123'
    }
  },
  computed: {
    groupTree() {
      return this.$store.getters.groupTree
    }
    // ...mapGetters(['group'])
  },
  watch: {
    list(newValue) {
      if (Array.isArray(newValue) && newValue.length === 0) {
        const statisticsTable = this.$refs.statisticsTable
        if (statisticsTable && statisticsTable.$el) {
          this.$nextTick(() => {
            const emptyContent = statisticsTable.$el.querySelector('.plx-table--empty-placeholder .plx-table--empty-content')
            console.log(emptyContent)
            if (emptyContent) {
              emptyContent.innerText = this.$t('device.tips.noData')
            }
          })
        }
      }
    }
  },
  created() {
    this.erd = EventResizeDetector()
    this.$nextTick(() => {
      this.getList()
    })
    this.$store.dispatch('getGroup')
  },
  mounted() {
    this.erd.listenTo(this.$refs.tableTip, (e) => {
      this.tableHeight = this.$refs.tableTip.offsetHeight
    })
  },
  beforeDestroy() {
    this.erd.uninstall(this.$refs.tableTip)
  },
  methods: {
    // 翻页 搜索
    handleFilter(filterData) {
      this.listQuery.page = 1
      this.getList(filterData)
    },
    // 刷新左侧菜单
    handleRefresh() {
      this.$store.dispatch('refreshGroupTree')
      this.listParam.groupIds = undefined
      this.getList()
    },
    /** 重置 */
    handleReset(row) {
      this.handleClear()
    },
    // 树选中节点
    handleNodeClick(data) {
      this.listParam.groupIds = [data.id]
      this.getList()
    },
    async getList(filterData) {
      this.listLoading = true
      // 时间解析
      if (filterData) {
        if (filterData.timeRange) {
          this.listParam.startDt = filterData.timeRange[0]
          this.listParam.endDt = filterData.timeRange[1]
        } else {
          this.listParam.startDt = new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)
          this.listParam.endDt = getTimeStamp(new Date())
        }
      }
      this.getWeek()
      // this.$refs.tabel.doLayout()
      // this.$refs.tabel.$forceUpdate()
      console.log(this.listParam, filterData)
      const params = Object.assign({}, this.senior, this.listParam, filterData)
      getStatistics(params, this.listQuery).then(response => {
        const data = response.data
        if (data.code === 1) {
          //  分割路程和时间的逗号
          for (const i in data.data.records) {
            data.data.records[i].distancesArr = []
            data.data.records[i].distancesArr = data.data.records[i].totalDistances.split(',')
            data.data.records[i].timesArr = []
            data.data.records[i].timesArr = data.data.records[i].totalTimes.split(',')
          }
          this.list = data.data.records
          this.total = data.data.total
          // this.$refs.tabel.doLayout()
          // this.$refs.tabel.$forceUpdate()
          this.listLoading = false
        }
      })
    },
    // 文件大小
    getSizeTable(row) {
      if (row === undefined) {
        return
      } else {
        return fileSizeFormat(parseInt(row))
      }
    },
    getTotal(index, time, distance) {
      if (index % 2 === 0) {
        return time.split(',')[Math.floor(index / 2)]
      } else {
        return distance.split(',')[Math.floor(index / 2)]
      }
    },
    getStatus(data) {
      if (Number(data) === 0) {
        return this.$t('trajectory.offLine')
      } else if (Number(data) === 1) {
        return this.$t('trajectory.onLine')
      } else {
        return
      }
    },
    handleSenior() {
      this.dialogVisibleDevice = true
    },
    confirmDevice() {
      this.testDistanceCheck()
      this.testDurationCheck()
      this.fileSizeCheck()
      this.dialogVisibleDevice = false
    },
    handleClear() {
      console.log('1')
      this.checkedTestDuration = false
      this.checkedTestDistance = false
      this.checkedFileSize = false
      this.fileSize = 0.5
      this.testDuration = 20
      this.testDistance = 1
      this.senior.fileSize = ''
      this.senior.testTime = ''
      this.senior.testDistance = ''
    },
    testDurationCheck() {
      if (!this.checkedTestDuration) {
        this.senior.testTime = ''
      } else {
        this.senior.testTime = this.testDuration * 60
      }
    },
    testDistanceCheck() {
      if (!this.checkedTestDistance) {
        this.senior.testTime = ''
      } else {
        this.senior.testTime = this.testDistance * 1000
      }
    },
    fileSizeCheck() {
      if (!this.checkedFileSize) {
        this.senior.fileSize = ''
      } else {
        this.senior.fileSize = this.fileSize * 1024 * 1024
      }
    },
    handleViewRecords(row) {
      this.recordDeviceName = row.deviceName
      this.recordDeviceType = row.deviceType
      this.recordGroupName = row.groupName
      console.log(this.recordGroupName)
      this.recordLoading = true
      this.dialogVisibleRecord = true
      getLogoutInfo(row.deviceId).then(res => {
        const data = res.data
        if (data.code === 1) {
          this.recordList = data.data.records
          this.recordTotal = data.data.total
          this.recordLoading = false
        }
      })
    },
    confirmRecord() {
      this.dialogVisibleRecord = false
    },
    // 根据统计时段，增减表头
    getWeek() {
      const startDt = timestampToStr(this.listParam.startDt, 'YYYY-MM-DD')
      const endDt = timestampToStr(this.listParam.endDt, 'YYYY-MM-DD')
      console.log(startDt, endDt)
      const temp = getdiffdate(startDt, endDt)
      console.log(temp)
      this.tableHead = []
      let num = 0
      for (const i in temp) {
        this.tableHead[num] = temp[i] + '(h)'
        this.tableHead[num + 1] = temp[i] + '(km)'
        num = num + 2
      }
      console.log(this.tableHead)
    },
    getTableTime(time) {
      return getTime(time, this.$store.getters.timezone)
    },
    downloadExcel() {
      downloadStatistics(this.listParam)
    }
  }
}
</script>

<style scoped lang="less">
  .demo-ruleForm /deep/ .el-form-item__label{
    text-align: left;
    width: 170px !important;
  }
  /*.circular-contain {*/
  /*  flex-direction: column;*/
  /*  display: flex;*/
  /*  height: 100%;*/
  /*  width: 100%;*/
  /*}*/
  .filter-container {
    padding-bottom: 1px;
  }
  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
</style>
