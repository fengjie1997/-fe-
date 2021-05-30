<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="dataForm" :model="parameter" :inline="true" class="demo-form-inline" style="margin: 0">
        <!--        <el-form-item label="App类别" prop="appType">-->
        <!--          <el-select v-model="parameter.appType" style="width:120px">-->
        <!--            <el-option-->
        <!--              v-for="item in team"-->
        <!--              :key="item.value"-->
        <!--              :label="item.label"-->
        <!--              :value="item.value"-->
        <!--            />-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
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
        <el-button v-perm="'/weTestData/search'" v-waves :loading="buttonLoading" class="filter-item" type="primary" icon="el-icon-search" @click="handleTask()">{{ $t('common.query') }}</el-button>
        <el-button v-perm="'/weTestData/export'" v-waves class="filter-item" type="primary" icon="el-icon-share" @click="handleExport">{{ $t('common.export') }}</el-button>
      </el-form>
    </div>

    <div slot="header" class="clearfix" style="margin-bottom: 30px;margin-top: 5px">
      <span v-if="type==='basic'">数据基础信息</span>
      <span v-if="type==='testPlan'">任务数据详情</span>
    </div>
    <!-- 任务数据详情表格 -->
    <el-table
      v-if="type==='testPlan'"
      :data="list"
      style="width: 100%;overflow: scroll"
      border
      fit
      highlight-current-row
      height="100%"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
        min-width="50"
      >
        <template slot-scope="scope">
          <span>{{ (parameter.page - 1) * parameter.pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <template v-for="(item,index) in tableHeadTestPlan">
        <el-table-column v-if="item.property !== 'id' && item.property !== 'result_id' && item.property !== 'result_type' && item.property !== 'job_id' && item.property !== 'plan_id'" :key="index" style="width: auto" align="center" :prop="item.property" :label="item.label">
          <template slot-scope="scope">
            <span v-if="item.time && scope.row[item.property] !== undefined">{{ getTimes(scope.row[item.property]) }}</span>
            <span v-else-if="item.property === 'resultType'">{{ getResultType(scope.row[item.property]) }}</span>
            <span v-else>{{ scope.row[item.property] }}</span>
          </template>
        </el-table-column>
      </template>
      <!-- 操作 -->
      <el-table-column fixed="right" :label="$t('common.actions')" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleSearchBusiness(scope.row)">{{ '业务数据' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Page -->
    <pagination v-if="type==='basic'" v-show="total>0" :total="total" :page.sync="parameter.page" :limit.sync="parameter.pageSize" @pagination="getList" />
    <pagination v-if="type==='testPlan'" v-show="total>0" :total="total" :page.sync="parameter.page" :limit.sync="parameter.pageSize" @pagination="handleTask" />
    <div>
      <!-- ping -->
      <el-dialog
        v-if="dialogVisible"
        :title="dialogStatus==='testPlan'?'任务选择':(dialogStatus==='business'?'业务详情' + '(' + taskNameAndDeviceId +')':'设备选择')"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        width="90%"
      >
        <TestPlan v-if="dialogStatus==='testPlan'" :model="testPlanModel" />
        <Device v-if="dialogStatus==='device'" :model="deviceModel" />
        <Business v-if="dialogStatus==='business'" :model="businessModel" />
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
import Pagination from '@/components/Pagination'
import Device from './device/index'
import TestPlan from './testPlan/index'
import Business from './business/index'
import { fetchList, exportCsv, fetchTestPlanList } from '../../../../api/WeTest/data'
import { getTimeZone, getTime, getTimeStamp } from '../../../../utils/timeZone'
import { fetchDeviceList, fetchGroupList } from '../../../../api/WeTest/device'
import { getBusinessTypeName } from '../../../../utils/WeTestBusinessList'
import { exportZip } from '@/utils/zipDownload'
import { weTestBusiness } from '@/views/weTest/data/util'
import { speedTest } from '@/views/weTest/data/util'

export default {
  name: 'Index',
  directives: { waves },
  components: { Pagination, Device, TestPlan, Business },
  data() {
    return {
      /**
         * 大小
         */
      buttonLoading: false,
      businessSelectOptions: [{ label: '测速类', value: 'test', children: [{ label: 'PING', value: 101 }, { label: 'PBM', value: 106 }, { label: 'UDP下载', value: 1041 }, { label: 'UDP上传', value: 1042 }, { label: 'TCP上传', value: 1052 }, { label: 'TCP下载', value: 1051 }, { label: 'Multi_FTP上传', value: 103 }, { label: 'Multi_FTP下载', value: 102 }] }, { label: '即时通讯', value: 'ott_basic', children: [{ label: '微信', value: 110 }, { label: 'Skype', value: 111 }] }, { label: 'App视频', value: 'douyin', children: [{ label: '抖音', value: 118 }] }, { label: '扫码支付', value: 'scan_code_pay', children: [{ label: '微信支付', value: 112 }, { label: '支付宝', value: 113 }] }, { label: '游戏', value: 'game', children: [{ label: '王者荣耀', value: 117 }] }, { label: '访问类', value: 'browse_app', children: [{ label: '京东', value: 114 }, { label: '今日头条', value: 115 }, { label: '淘宝', value: 116 }] }, { label: 'HTTP视频', value: 'http_video', children: [{ label: '新浪视频', value: 1081 }, { label: '搜狐视频', value: 1083 }, { label: '腾讯视频', value: 1085 }, { label: '优酷视频', value: 1086 }, { label: '抖音视频', value: 1087 }, { label: '自定义视频', value: 1088 }] }, { label: 'HTTP网页', value: 'http_web', children: [{ label: '百度官网', value: 1221 }, { label: '网易官网', value: 1222 }, { label: '搜狐官网', value: 1223 }, { label: '人民网', value: 1224 }, { label: '携程网', value: 1225 }, { label: '京东商城', value: 1226 }, { label: '淘宝官网', value: 1227 }, { label: '新浪微博', value: 1228 }, { label: '自定义网页', value: 1229 }] }],
      deviceInfo: '',
      type: 'testPlan',
      id: '',
      // 设置导出的任务名称
      name: '',
      temp: [],
      deviceModel: {},
      testPlanModel: {},
      businessModel: [],
      dialogVisible: false,
      dialogType: '',
      dialogStatus: '',
      // 数据
      taskNameAndDeviceId: '',
      defaultTime: getTimeZone(this.$store.getters.timezone),
      time: '',
      parameter: {
        type: 'business',
        testPlanInfo: '',
        deviceInfo: '',
        page: 1,
        pageSize: 10,
        order: 0,
        appType: 1,
        jobId: [],
        jobIds: []
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
      task: [],
      fieldOptions: [{ label: 'ID', key: 'id' }],
      isAscOptions: [{ label: this.$t('common.asc'), key: 0 }, { label: this.$t('common.desc'), key: 1 }],
      list: [],
      basicList: [],
      tableState: 'baseTable',
      tableHead: [],
      tableHeadTestPlan: [{
        property: 'jobName', label: this.$t('WeTestTableHead.jobName')
      }, {
        property: 'uniqueId', label: this.$t('weTestResult.unique_id')
      }, {
        property: 'appName', label: this.$t('weTestResult.app_name')
      }, {
        property: 'version', label: this.$t('weTestResult.version')
      }, {
        property: 'teleNum', label: this.$t('weTestResult.tele_num')
      }, {
        property: 'resultType', label: this.$t('weTestResult.resultType')
      }],
      table: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getTime() {
      if (this.time !== null) {
        this.parameter.startTime = this.time[0]
        this.parameter.endTime = this.time[1]
      } else {
        this.parameter.startTime = 0
        this.parameter.endTime = getTimeStamp(new Date())
      }
    },
    getTimes(time) {
      time = Number(time)
      return getTime(time, this.$store.getters.timezone)
    },
    // /**
    //  *获取表格数据
    //  */
    // getJson(json) {
    //   const str = []
    //   for (let i = 1; i < json.length; i++) {
    //     this.baseValues = json[i]['values']
    //     this.networkValues = json[i]['network_values']
    //     this.gpsValues = json[i]['gps_values']
    //     str[i] = removeright(JSON.stringify(this.baseValues)) + ',' + remove(JSON.stringify(this.networkValues))
    //   }
    //   for (let i = 1; i < json.length; i++) {
    //     delete json[i]['values']
    //     delete json[i]['network_values']
    //     delete json[i]['values']
    //     str[i] = str[i] + ',' + removeleft(JSON.stringify(json[i]))
    //   }
    //   for (let i = 1; i < json.length; i++) {
    //     this.model[i] = {}
    //     this.model[i] = JSON.parse(str[i])
    //   }
    // },
    // getTable(json) {
    //   let temp = 0
    //   this.baseValues = json['values']
    //   this.networkValues = json['network_values']
    //   this.gpsValues = json['gps_values']
    //   delete json['values']
    //   delete json['network_values']
    //   delete json['gps_values']
    //   for (let i = 0; i < Object.keys(json).length; i++, temp = i) {
    //     if (Object.keys(json)[i].toString() === 'start_time' || Object.keys(json)[i].toString() === 'event_time') {
    //       this.table[i] = {}
    //       this.table[i]['property'] = Object.keys(json)[i].toString()
    //       const label = 'weTestResult.' + Object.keys(json)[i].toString()
    //       this.table[i]['label'] = this.$t(label.toString())
    //       this.table[i]['time'] = true
    //     } else {
    //       this.table[i] = {}
    //       this.table[i]['property'] = Object.keys(json)[i].toString()
    //       const label = 'weTestResult.' + Object.keys(json)[i].toString()
    //       this.table[i]['label'] = this.$t(label.toString())
    //     }
    //   }
    //   for (const key in this.baseValues) {
    //     this.table[temp] = {}
    //     this.table[temp]['property'] = key.toString()
    //     const label = 'weTestResult.' + key.toString()
    //     this.table[temp]['label'] = this.$t(label.toString())
    //     temp++
    //   }
    //   for (const key in this.networkValues) {
    //     this.table[temp] = {}
    //     this.table[temp]['property'] = key.toString()
    //     const label = 'weTestResult.' + key.toString()
    //     this.table[temp]['label'] = this.$t(label.toString())
    //     temp++
    //   }
    //   for (const key in this.gpsValues) {
    //     this.table[temp] = {}
    //     this.table[temp]['property'] = key.toString()
    //     const label = 'weTestResult.' + key.toString()
    //     this.table[temp]['label'] = this.$t(label.toString())
    //     temp++
    //   }
    //   return this.table
    // },
    /**
     * 获取业务基础信息表格数据
     * @returns {Promise<void>}
     */
    async getList() {
      this.listLoading = true
      let str = ''
      let num = 0
      const groupIds = []
      fetchGroupList().then(res => {
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
              this.uuids = str.split(',')
              if (str !== '' && str !== null) {
                if (this.parameter.uniqueIds === undefined || this.parameter.uniqueIds.length === 0) {
                  this.parameter.uniqueIds = this.uuids
                }
                fetchTestPlanList(this.parameter).then(response => {
                  const data = response.data
                  if (data.code === 1) {
                    this.tableState = 'testPlan'
                    this.type = 'testPlan'
                    this.total = data.data.total
                    this.list = data.data.records
                  }
                  this.listLoading = false
                })
                fetchList(this.parameter, this.uuids, this.parameter).then(response => {
                  const data = response.data
                  if (data.code === 1) {
                    this.basicList = data.data.records
                    this.total = data.data.total
                  }
                  this.listLoading = false
                })
              }
            }
          })
        }
      })
    },
    handleFilter() {
      if (this.type === 'basic') {
        this.getList()
      } else {
        this.listLoading = true
        fetchTestPlanList(this.parameter).then(response => {
          const data = response.data
          if (data.code === 1) {
            this.tableState = 'testPlan'
            this.type = 'testPlan'
            this.total = data.data.total
            this.list = data.data.records
          }
          this.listLoading = false
        })
      }
    },
    handleBusinessTypeSelect() {
      if (this.parameter.businessSelect[0] !== 'test') {
        this.parameter.task = ''
        this.parameter.taskId = ''
        this.parameter.task = this.parameter.businessSelect[0]
        this.parameter.taskId = this.parameter.businessSelect[1]
      } else {
        this.parameter.taskId = ''
        this.parameter.taskId = this.parameter.businessSelect[1]
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
    handleTask() {
      this.buttonLoading = true
      if (this.parameter.uniqueIds === undefined || this.parameter.uniqueIds.length === 0) {
        this.parameter.uniqueIds = this.temp
      }
      this.listLoading = true
      fetchTestPlanList(this.parameter).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.tableState = 'testPlan'
          this.type = 'testPlan'
          this.total = data.data.total
          this.list = data.data.records
        }
        this.listLoading = false
        this.buttonLoading = false
      })
    },
    handleSearchBusiness(data) {
      this.taskNameAndDeviceId = '设备id: ' + data.uniqueId + '/' + '任务名称:' + data.jobName
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
      if (this.testPlanModel.list.length === 1) {
        this.name = this.testPlanModel.list[0].name
      }
      this.dialogVisible = false
      this.parameter.jobIds = this.testPlanModel.planIds
      this.parameter.testPlanInfo = '已选择' + this.parameter.jobIds.length + '个任务'
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
    handleExport() {
      if (this.parameter.jobIds.length !== 1) {
        this.$alert('请选择任务进行导出(仅支持单个任务)', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      } else {
        this.$store.dispatch('setBusinessErrorNotity', false)
        // const task = getCacheDict('task(WeTest)')
        // const taskId = getCacheDict('taskId(WeTest)')
        // let name = ''
        const fileArr = []
        const csvArr = []
        const parameter = {
          task: '',
          taskId: ''
        }
        for (let i = 0; i < weTestBusiness.length; i++) {
          if (i === 0) {
            for (const j in speedTest) {
              parameter.taskId = speedTest[j].value
              parameter.task = speedTest[j].label
              fileArr[i] = this.getFileName(parameter.task, Number(parameter.taskId))
              csvArr[i] = exportCsv(parameter.task, parameter.taskId, this.parameter, true)
            }
          } else {
            for (const j in weTestBusiness[i].children) {
              parameter.taskId = weTestBusiness[i].children[j].value
              parameter.task = weTestBusiness[i].value
            }
          }
          fileArr[i] = this.getFileName(parameter.task, Number(parameter.taskId))
          csvArr[i] = exportCsv(parameter.task, parameter.taskId, this.parameter, true)
          console.log(parameter.task)
          // parameter.taskId = ''
          // // name = task[i].name
          // parameter.task = task[i].code
          // for (let j = 0; j < taskId.length; j++) {
          //   if (parameter.task === taskId[j].name) {
          //     parameter.taskId = taskId[j].code
          //   }
          // }
        }
        Promise.all(csvArr).then(response => {
          this.$store.dispatch('setBusinessErrorNotity', true)
          const arr = []
          let num = 0
          for (const i in response) {
            const type = response[i].headers['content-type']
            if (type && type.toLowerCase().startsWith('application/json')) {
              continue
            }
            arr[num] = {}
            arr[num]['data'] = response[i].data
            arr[num]['fileName'] = fileArr[i]
            num++
          }
          exportZip(arr, this.name + '(' + getTimeZone(this.$store.getters.timezone) + ')')
          // if (response === undefined) {
          //   num++
          // }
          // console.log(response)
          // conut++
          // if (conut === 17) {
          //   this.$alert('已成功导出' + num + '个csv文件', '提示', {
          //     confirmButtonText: '确定',
          //     callback: action => {
          //     }
          //   })
          // }
        })
      }
      // this.parameter.task = ''
      // this.parameter.taskId = ''
    },
    getFileName(task, taskId) {
      const time = getTimeZone(this.$store.getters.timezone)
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
        for (let i = 0; i < this.businessSelectOptions[i].length; i++) {
          if (taskId === this.businessSelectOptions[i].value) {
            taskIdName = this.businessSelectOptions[i].label
          }
        }
      }
      return taskName + taskIdName + time + '.csv'
    },
    getResultType(data) {
      if (data === 1) {
        return '下发任务结果'
      } else if (data === 2) {
        return '一键测试结果'
      } else if (data === 3) {
        return '单业务测试结果'
      } else {
        return '旧数据库数据'
      }
    },
    cancelForm() {
      this.dialogVisible = false
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
