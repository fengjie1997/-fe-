<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="dataForm" :model="parameter" :inline="true" class="demo-form-inline" style="margin: 0">
        <el-form-item label="*App类别" prop="appType">
          <el-select v-model="parameter.appType" style="width:120px" @change="getBusinessOptions">
            <el-option
              v-for="item in team"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="parameter.type==='business'" label="*选择业务" prop="businessSelect">
          <el-cascader
            v-model="parameter.businessSelect"
            :options="businessSelectOptions"
            :props="{ checkStrictly: true }"
            clearable
            collapse-tags
            style="width: 160px"
            class="filter-item"
            @change="handleBusinessTypeSelect"
          />
        </el-form-item>
        <el-form-item label="选择设备" prop="uniqueIds">
          <el-input v-model="parameter.deviceInfo" style="width: 120px;" class="filter-item" @focus="handleDeviceSelect()" />
        </el-form-item>
        <el-form-item v-if="parameter.appType===1" label="选择任务">
          <el-input v-if="parameter.appType===1" v-model="parameter.testPlanInfo" style="width: 120px;" class="filter-item" @focus="handleTestPlanSelect()" />
        </el-form-item>
        <el-form-item label="选择时间">
          <el-date-picker
            v-model="time"
            style="width:300px"
            value-format="timestamp"
            type="datetimerange"
            :default-value="defaultTime"
            @change="getTime"
          />
        </el-form-item>
        <el-form-item label="排序方式">
          <el-select v-model="parameter.order" style="width: 120px" class="filter-item" @change="handleFilter">
            <el-option v-for="item in isAscOptions" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-button v-if="parameter.type==='business'" v-perm="'/weTestData/search'" v-waves :loading="buttonLoading" class="filter-item" type="primary" icon="el-icon-search" @click="handleBusiness()">{{ $t('common.query') }}</el-button>
        <el-button v-perm="'/weTestData/export'" v-waves class="filter-item" type="primary" icon="el-icon-share" @click="handleExport">{{ $t('common.export') }}</el-button>
      </el-form>
    </div>
    <div slot="header" class="clearfix" style="margin-bottom: 30px;margin-top: 5px">
      <span v-if="type==='basic'">业务数据基础信息</span>
    </div>
    <!-- 业务数据基础信息表格 -->
    <el-table
      v-if="type==='basic'"
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      border
      height="100%"
    >
      <af-table-column
        type="index"
        label="序号"
        align="center"
        min-width="50"
      >
        <template slot-scope="scope">
          <span>{{ (parameter.page - 1) * parameter.pageSize + scope.$index + 1 }}</span>
        </template>
      </af-table-column>
      <template v-for="(item,index) in tableHeadBase">
        <af-table-column v-if="item.property !== 'id'" :key="index" align="center" :prop="item.property" :label="item.label">
          <template slot-scope="scope">
            <!-- 时间 -->
            <span v-if="item.time && scope.row[item.property] !== undefined">{{ getTimes(scope.row[item.property]) }}</span>
            <span v-else-if="item.property === 'task'">{{ getTask(scope.row[item.property]) }}</span>
            <span v-else-if="item.property === 'task_name'">{{ getTaskName(scope.row[item.property]) }}</span>
            <span v-else>{{ scope.row[item.property] }}</span>
          </template>
        </af-table-column>
      </template>
    </el-table>
    <!-- 业务数据详情表格 -->
    <el-table
      v-if="type==='business'"
      ref="table"
      v-loading="listLoading"
      :data="list"
      border
      fit
      height="100%"
      style="width: 100%"
    >
      <af-table-column
        v-if="tableNum"
        type="index"
        label="序号"
        align="center"
        min-width="50"
      >
        <template slot-scope="scope">
          <span>{{ (parameter.page - 1) * parameter.pageSize + scope.$index + 1 }}</span>
        </template>
      </af-table-column>
      <template v-for="(item,index) in tableHead">
        <af-table-column v-if="item.property !== 'id' && item.property !== 'result_id' && item.property !== 'result_type' && item.property !== 'job_id' && item.property !== 'plan_id'" :key="index" align="center" :prop="item.property" :label="item.label">
          <template slot-scope="scope">
            <!-- 时间 -->
            <span v-if="item.property === 'start_time'">{{ getTimes(scope.row[item.property]) }}</span>
            <span v-else-if="item.property === 'task'">{{ getTask(scope.row[item.property]) }}</span>
            <span v-else-if="item.property === 'task_name'">{{ getTaskName(scope.row[item.property]) }}</span>
            <span v-else-if="item.property === 'event_time'">{{ getTimes(scope.row[item.property]) }}</span>
            <span v-else-if="item.property === 'call_connect_time'">{{ getTimes(scope.row[item.property], true) }}</span>
            <span v-else-if="item.property === 'call_end_time'">{{ getTimes(scope.row[item.property], true) }}</span>
            <span v-else-if="item.property === 'call_start_time'">{{ getTimes(scope.row[item.property], true) }}</span>
            <span v-else-if="item.property === 'call_ring_time'">{{ getTimes(scope.row[item.property], true) }}</span>
            <span v-else>{{ scope.row[item.property] }}</span>
          </template>
        </af-table-column>
      </template>
    </el-table>
    <!-- Page -->
    <pagination v-if="type==='basic'" v-show="total>0" :total="total" :page.sync="parameter.page" :limit.sync="parameter.pageSize" @pagination="handleFilter" />
    <pagination v-if="type==='business'" v-show="total>0" :total="total" :page.sync="parameter.page" :limit.sync="parameter.pageSize" @pagination="handleFilter" />
    <div>
      <!-- ping -->
      <el-dialog
        v-if="dialogVisible"
        :title="dialogStatus==='testPlan'?'任务选择':(dialogStatus==='business'?'业务详情':'设备选择')"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        width="95%"
      >
        <TestPlan v-if="dialogStatus==='testPlan'" :model="testPlanModel" />
        <Device v-if="dialogStatus==='device'" :model="deviceModel" />
        <!--        <Business v-if="dia"-->
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelForm()">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="dialogStatus==='device'?handleConfirmDevice():(dialogStatus==='business'?cancelForm():handleConfirmTestPlan())">{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import waves from '@/directive/waves'
import { getWeTestDateTableHead } from '../../../../utils/weTestTableHead'
import Pagination from '@/components/Pagination'
import Device from './device/index'
import TestPlan from './testPlan/index'
import { getBusinessTypeName, getTaskByTaskId, getBusinessName } from '../../../../utils/WeTestBusinessList'
import { fetchList, fetchBusinessList, exportOneCsv } from '../../../../api/WeTest/data'
import { removeleft, removeright, remove } from '../../../../utils/WeTestTable'
import { getTimeZone, getTime, getTimeStamp } from '../../../../utils/timeZone'
import { fetchDeviceList, fetchGroupList } from '../../../../api/WeTest/device'
import { weTestBusiness } from '@/views/weTest/data/util'

export default {
  name: 'Index',
  directives: { waves },
  components: { Pagination, Device, TestPlan },
  data() {
    return {
      /**
         * 大小
         */
      tableNum: true,
      buttonLoading: false,
      tableMax: window.innerHeight - 200,
      deviceInfo: '',
      type: 'basic',
      id: '',
      deviceModel: {},
      testPlanModel: {},
      businessModel: [],
      dialogVisible: false,
      dialogType: '',
      dialogStatus: '',
      // 数据
      defaultTime: getTimeZone(this.$store.getters.timezone),
      time: '',
      parameter: {
        type: 'business',
        testPlanInfo: '',
        deviceInfo: '',
        page: 1,
        pageSize: 10,
        order: 0,
        appType: 1
      },
      team: [
        {
          value: 1,
          label: 'WeTest'
        },
        {
          value: 2,
          label: 'WeTest ST'
        }],
      uuid: [],
      uuids: [],
      startTime: '',
      endTime: '',
      model: [],
      baseValues: [],
      gpsValues: [],
      networkValues: [],
      values: [],
      tableKey: 0,
      total: 0,
      listLoading: false,
      businessSelectOptions: [],
      task: [],
      speedTest: false,
      fieldOptions: [{ label: 'ID', key: 'id' }],
      isAscOptions: [{ label: this.$t('common.asc'), key: 0 }, { label: this.$t('common.desc'), key: 1 }],
      list: [],
      tableState: 'baseTable',
      tableHead: [],
      tableHeadBase: [{
        property: 'task', label: this.$t('weTestResult.task')
      }, {
        property: 'task_name', label: this.$t('weTestResult.task_name')
      }, {
        property: 'unique_id', label: this.$t('weTestResult.unique_id')
      }, {
        property: 'app_name', label: this.$t('weTestResult.app_name')
      }, {
        property: 'version', label: this.$t('weTestResult.version')
      }, {
        property: 'tele_num', label: this.$t('weTestResult.tele_num')
      }, {
        property: 'start_time', label: this.$t('weTestResult.start_time'), time: true
      }, {
        property: 'event_time', label: this.$t('weTestResult.event_time'), time: true
      }],
      table: []
    }
  },
  created() {
    this.getList()
    this.getBusinessOptions()
  },
  methods: {
    // 获取业务选择选项
    getBusinessOptions() {
      if (this.parameter.appType === 1) {
        this.businessSelectOptions = weTestBusiness
      } else {
        this.businessSelectOptions = [{ label: 'PING', value: 101 }, { label: 'PBM', value: 106 }, { label: 'UDP上传', value: 1042 }, { label: 'UDP下载', value: 1041 }, { label: 'TCP上传', value: 1052 }, { label: 'TCP下载', value: 1051 }, { label: 'Multi_FTP上传', value: 103 }, { label: 'Multi_FTP下载', value: 102 }]
      }
    },
    getTableHead(data) {
      this.tableHead = []
      this.tableHead = getWeTestDateTableHead(data)
    },
    getTime() {
      if (this.time !== null) {
        this.parameter.startTime = this.time[0]
        this.parameter.endTime = this.time[1]
      } else {
        this.parameter.startTime = 0
        this.parameter.endTime = getTimeStamp(new Date())
      }
    },
    getTimes(time, bool) {
      time = Number(time)
      return getTime(time, this.$store.getters.timezone, bool)
    },
    /**
       *获取表格数据
       */
    getJson(json) {
      // this.list = json
      this.list = []
      let baseValues = {}
      let networkValues = {}
      const str = []
      for (let i = 0; i < json.length; i++) {
        baseValues = json[i]['values']
        networkValues = json[i]['network_values']
        json[i]['values'] = ''
        json[i]['network_values'] = ''
        json[i]['gps_values'] = ''
        str[i] = removeright(JSON.stringify(json[i])) + ',' + remove(JSON.stringify(baseValues)) + ',' + removeleft(JSON.stringify(networkValues))
        this.list[i] = {}
        this.list[i] = JSON.parse(str[i])
      }
    },
    getTable(json) {
      this.tableHead = []
      for (let i = 0; i < Object.keys(json).length; i++) {
        this.tableHead[i] = {}
        this.tableHead[i]['property'] = Object.keys(json)[i].toString()
        const label = 'weTestResult.' + Object.keys(json)[i].toString()
        this.tableHead[i]['label'] = this.$t(label.toString())
      }
      this.tableHead.splice(14, 3)
      // console.log(this.tableHead)
    },
    /**
       * 获取业务基础信息表格数据
       * @returns {Promise<void>}
       */
    async getList() {
      let str = ''
      const groupIds = []
      fetchGroupList().then(res => {
        let num = 0
        const data = res.data
        if (data.code === 1) {
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].children !== undefined) {
              for (let j = 0; j < data.data[i].children.length; j++) {
                // groupIds[j] = ''
                groupIds[num] = data.data[i].children[j].id
                num++
              }
            }
          }
          fetchDeviceList(this.parameter.appType, groupIds).then(response => {
            const data = response.data
            if (data.code === 1) {
              for (let i = 0; i < data.data.records.length; i++) {
                if (i === data.data.records.length - 1) {
                  str = str + data.data.records[i].uuid
                } else {
                  str = str + data.data.records[i].uuid + ','
                }
              }
              if (str !== '' && str !== null) {
                this.uuids = str.split(',')
                fetchList(this.parameter, this.uuids, this.parameter).then(response => {
                  const data = response.data
                  if (data.code === 1) {
                    this.list = data.data.records
                    this.total = data.data.total
                  }
                })
              }
            }
          })
        }
      })
      this.listLoading = false
    },
    handleFilter() {
      if (this.type === 'basic') {
        this.getList()
      } else {
        this.handleBusiness()
      }
    },
    handleBusinessTypeSelect() {
      if (this.parameter.appType === 1) {
        if (this.parameter.businessSelect[0] !== 'test') {
          this.speedTest = false
          this.parameter.task = ''
          this.parameter.taskId = ''
          this.parameter.task = this.parameter.businessSelect[0]
          this.parameter.taskId = this.parameter.businessSelect[1]
        } else {
          this.speedTest = true
          this.parameter.taskId = ''
          this.parameter.taskId = this.parameter.businessSelect[1]
          this.parameter.task = getTaskByTaskId(this.parameter.taskId)
        }
      } else {
        this.parameter.taskId = this.parameter.businessSelect[0]
        this.parameter.task = getTaskByTaskId(this.parameter.taskId)
      }
    },
    handleDeviceSelect() {
      this.dialogStatus = 'device'
      this.deviceModel.deviceInfo = ''
      this.deviceModel.deviceInfo = this.parameter.deviceInfo
      this.deviceModel.type = ''
      this.deviceModel.type = this.parameter.type
      this.deviceModel.type = ''
      this.deviceModel.appType = this.parameter.appType
      this.dialogVisible = true
    },
    handleTestPlanSelect() {
      this.dialogStatus = 'testPlan'
      this.testPlanModel.testPlanInfo = ''
      this.testPlanModel.testPlanInfo = this.parameter.testPlanInfo
      this.testPlanModel.type = ''
      this.testPlanModel.uuids = []
      this.testPlanModel.type = this.parameter.type
      if (this.deviceModel.uniqueIds !== undefined) {
        for (let i = 0; i < this.deviceModel.uniqueIds.length; i++) {
          this.testPlanModel.uuids[i] = ''
          this.testPlanModel.uuids[i] = this.deviceModel.uniqueIds[i]
        }
      } else {
        for (let i = 0; i < this.uuids.length; i++) {
          this.testPlanModel.uuids[i] = ''
          this.testPlanModel.uuids[i] = this.uuids[i]
        }
      }
      this.dialogVisible = true
    },
    handleSearchBusiness(data) {
      this.dialogStatus = 'business'
      this.businessModel = data.data
      this.dialogVisible = true
    },
    handleConfirmDevice() {
      this.deviceModel.list = []
      this.parameter.uniqueIds = []
      this.dialogVisible = false
      for (const i in this.deviceModel.taskList) {
        this.parameter.uniqueIds[i] = this.deviceModel.taskList[i].uuid
        this.deviceModel.list.push(JSON.parse(JSON.stringify(this.deviceModel.taskList[i])))
      }
      if (this.parameter.uniqueIds.length > 0) {
        this.parameter.deviceInfo = '已选择' + this.parameter.uniqueIds.length + '台手机'
      } else {
        this.parameter.deviceInfo = null
      }
    },
    handleConfirmTestPlan() {
      this.testPlanModel.list = []
      for (const i in this.testPlanModel.testPlanList) {
        this.testPlanModel.list.push(JSON.parse(JSON.stringify(this.testPlanModel.testPlanList[i])))
      }
      this.dialogVisible = false
      this.parameter.jobIds = this.testPlanModel.planIds
      this.parameter.testPlanInfo = '已选择' + this.parameter.jobIds.length + '个任务'
    },
    handleBusiness() {
      if (this.speedTest && this.parameter.taskId === undefined) {
        this.$alert('测速类业务必选二级业务', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      } else if (this.parameter.task === undefined && this.parameter.taskId === undefined) {
        this.$alert('请选择查询的业务类型', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      } else {
        if (this.parameter.uniqueIds === undefined || this.parameter.uniqueIds.length === 0) {
          this.parameter.uniqueIds = this.uuids
        }
        // if (this.parameter.task === 'test') {
        // }
        this.listLoading = true
        this.buttonLoading = true
        fetchBusinessList(this.parameter).then(response => {
          const data = response.data
          if (data.code === 1) {
            if (data.data.total !== 0) {
              this.tableNum = true
              this.tableState = 'business'
              this.type = 'business'
              this.getJson(data.data.records)
              // console.log(this.list)
              this.getTableHead(this.list[0].task_id)
              // console.log(this.$refs)
              this.$nextTick(() => {
                this.$refs.table.doLayout()
              })
              // console.log(this.tableHead)
              // this.getTable(this.list[0])
              this.total = data.data.total
            } else {
              this.tableNum = false
              this.total = data.data.total
              this.list = []
              this.tableHead = []
            }
          }
        })
        this.listLoading = false
        this.buttonLoading = false
      }
    },
    handleExport() {
      if (this.speedTest) {
        this.parameter.task = getTaskByTaskId(this.parameter.taskId)
      }
      if (this.speedTest && this.parameter.taskId === undefined) {
        this.$alert('测速类业务必选二级业务', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      } else if (this.parameter.task === undefined && this.parameter.taskId === undefined) {
        this.$alert('请选择导出的业务类型', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      } else {
        if (this.parameter.uniqueIds === undefined || this.parameter.uniqueIds.length === 0) {
          this.parameter.uniqueIds = this.uuids
        }
        console.log(this.parameter)
        const fileName = this.getFileName(this.parameter.task, this.parameter.taskId)
        console.log(fileName)
        exportOneCsv(fileName, this.parameter)
      }
    },
    getResultType(data) {
      if (data === 1) {
        return '平台测试数据'
      } else {
        return '终端测试数据'
      }
    },
    cancelForm() {
      this.dialogVisible = false
    },
    getTask(data) {
      return getBusinessTypeName(data)
    },
    getTaskName(data) {
      return getBusinessName(data)
    },
    getFileName(task, taskId) {
      const time = getTimeZone(this.$store.getters.timezone)
      console.log(task)
      const taskName = getBusinessTypeName(task)
      let taskIdName = ''
      if (this.parameter.appType === 1) {
        for (let i = 0; i < this.businessSelectOptions.length; i++) {
          for (let j = 0; j < this.businessSelectOptions[i].children.length; j++) {
            if (taskId === this.businessSelectOptions[i].children[j].value) {
              taskIdName = this.businessSelectOptions[i].children[j].label
            }
          }
        }
      } else {
        for (let i = 0; i < this.businessSelectOptions.length; i++) {
          if (taskId === this.businessSelectOptions[i].value) {
            taskIdName = this.businessSelectOptions[i].label
          }
        }
      }
      return taskName + taskIdName + time + '.csv'
    }
  }
}

</script>
<style scoped>

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    margin: 5px 0px 5px 5px;
    height: auto;
  }
  .filter-container {
    padding-bottom: 5px;
  }
  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }

</style>
