<template>
  <div>
    <el-row>
      <!--左侧任务列表-->
      <el-col :span="leftSpan">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>任务列表</span>
            </div>
            <div>
              <div class="app-container">
                <div class="filter-container">
                  <el-form :inline="true" class="demo-form-inline">
                    <el-form-item :label="$t('WeTestTableHead.jobName')">
                      <el-input v-model="listQuery.name" style="width: 88px;" class="filter-item" />
                    </el-form-item>
                    <el-form-item :label="$t('WeTestTableHead.creator')">
                      <el-input v-model="listQuery.creator" style="width: 88px;" class="filter-item" />
                    </el-form-item>
                    <el-form-item :label="$t('WeTestTableHead.selectDt')">
                      <el-select v-model="listQuery.timeField" style="width: 100px">
                        <el-option
                          v-for="item in timeOptions"
                          :key="item.key"
                          :label="item.label"
                          :value="item.key"
                        />
                      </el-select>
                      <el-date-picker
                        v-model="time"
                        style="width: 220px"
                        value-format="timestamp"
                        type="datetimerange"
                        :default-value="defaultTime"
                        @change="getTime"
                      />
                    </el-form-item>
                    <el-form-item>
                      <el-button v-waves :loading="listLoading" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('common.search') }}</el-button>
                    </el-form-item>
                  </el-form>
                </div>
                <div>
                  <el-table
                    v-loading="listLoading"
                    :data="taskList"
                    border
                    style="width: auto"
                    height="350"
                  >
                    <template v-for="(item,index) in taskTableHead">
                      <el-table-column :key="index" style="width: 100px" align="center" :prop="item.property" :label="item.label">
                        <template slot-scope="scope">
                          <!-- 时间 -->
                          <span v-if="item.time && scope.row[item.property] !== undefined">{{ getTimes(scope.row[item.property]) }}</span>
                          <span v-else>{{ scope.row[item.property] }}</span>
                        </template>
                      </el-table-column>
                    </template>
                    <el-table-column :label="$t('common.actions')" align="center" width="200">
                      <template slot-scope="scope">
                        <!--                        <el-button v-waves :loading="listLoading" class="filter-item" type="primary" @click="handleSeeIssue(scope.row)">{{ '查看详情' }}</el-button>-->
                        <el-button v-waves :loading="listLoading" class="filter-item" type="primary" @click="handleAddTask(scope.row)">{{ '添加任务' }}</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- Page -->
                  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="getList" />
                </div>
              </div>

            </div>
          </el-card>
        </div>
      </el-col>

      <!-- 右侧任务配置 -->
      <el-col :span="rightSpan">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>已选任务</span>
            </div>
            <div class="app-container">
              <div>
                <el-table
                  v-loading="listLoading"
                  :data="testPlanList"
                  border
                  height="408"
                >
                  <template v-for="(item,index) in taskTableHead">
                    <el-table-column :key="index" align="center" :prop="item.property" :label="item.label">
                      <template slot-scope="scope">
                        <!-- 时间 -->
                        <span v-if="item.time && scope.row[item.property] !== undefined">{{ getTimes(scope.row[item.property]) }}</span>
                        <span v-else>{{ scope.row[item.property] }}</span>
                      </template>
                    </el-table-column>
                  </template>
                  <el-table-column :label="$t('common.actions')" align="center" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                      <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">{{ $t('common.delete') }}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import waves from '../../../../../directive/waves/waves'
import Pagination from '@/components/Pagination'
import { getTime, getTimeZone } from '../../../../../utils/timeZone'
import { getBusinessTypeName } from '../../../../../utils/WeTestBusinessList'
import { fetchTaskByUUIDsList } from '../../../../../api/WeTest/data'
import { getTestPlanStatus, getAppType } from '../../../../../utils/WeTestTable'

export default {
  name: 'TaskPlan',
  directives: { waves },
  components: { Pagination },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      leftSpan: 14,
      rightSpan: 10,
      time: '',
      total: 0,
      taskIndex: '',
      listLoading: false,
      listQuery: {
        timeField: 'start_dt',
        isRetrieved: 1,
        limit: 10,
        page: 1,
        field: 'start_dt',
        isAsc: 1,
        appType: 1
      },
      timeOptions: [{ label: this.$t('weTest.takeDt'), key: 'start_dt' }, { label: this.$t('weTest.endDt'), key: 'end_dt' }, { label: this.$t('weTest.updateDt'), key: 'update_dt' }],
      defaultTime: getTimeZone(this.$store.getters.timezone),
      taskList: [],
      testPlanList: [],
      statusOptions: [{ label: '取消', key: 0 }, { label: '未接收', key: 1 }, { label: '传输中', key: 2 }, { label: '已接收', key: 3 }, { label: '测试中', key: 4 }, { label: '测试完成', key: 5 }],
      fieldOptions: [{ label: '任务ID', key: 'id' }],
      isAscOptions: [{ label: this.$t('common.asc'), key: 1 }, { label: this.$t('common.desc'), key: 0 }],
      multipleSelection: [],
      taskTableHead: [{
        property: 'creator', label: this.$t('WeTestTableHead.creator')
      }, {
        property: 'name', label: this.$t('WeTestTableHead.jobName')
      }, {
        property: 'startDt', label: this.$t('WeTestTableHead.startDt'), time: true
      }, {
        property: 'endDt', label: this.$t('WeTestTableHead.endDt'), time: true
      }, {
        property: 'updateDt', label: this.$t('WeTestTableHead.updateDt'), time: true
      }]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      console.log(this.model)
      if (this.model.testPlanList !== undefined && this.model.testPlanInfo !== null && this.model.testPlanInfo !== '') {
        this.testPlanList = []
        for (const i in this.model.list) {
          this.testPlanList.push(JSON.parse(JSON.stringify(this.model.list[i])))
        }
        // this.testPlanList = this.model.testPlanList
      }
      fetchTaskByUUIDsList(this.listQuery, this.model.uuids).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.taskList = data.data.records
          this.total = data.data.total
        }
        this.listLoading = false
      })
    },
    /**
       * 时间数据渲染表格
       */
    getTimes(time) {
      return getTime(time, this.$store.getters.timezone)
    },
    getTime() {
      if (this.time !== null) {
        this.listQuery.startDt = this.time[0]
        this.listQuery.endDt = this.time[1]
      } else {
        this.listQuery.startDt = ''
        this.listQuery.endDt = ''
      }
    },
    getAppType(data) {
      return getAppType(data)
    },
    getStatus(data) {
      return getTestPlanStatus(data)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.model.planIds = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.model.planIds[i] = this.multipleSelection[i].id
      }
    },
    handleAddTask(row) {
      this.model.planIds = []
      let bool = false
      for (const i in this.testPlanList) {
        if (row.id === this.testPlanList[i].id) {
          bool = true
        }
      }
      if (bool) {
        this.$alert('既有任务不可重复添加', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      } else {
        this.testPlanList.splice(0, 0, row)
      }
      this.model.testPlanList = []
      for (const i in this.testPlanList) {
        this.model.planIds[i] = this.testPlanList[i].id
        this.model.testPlanList[i] = this.testPlanList[i]
      }
    },
    handleDelete(index) {
      this.model.planIds = []
      this.model.testPlanList = []
      this.testPlanList.splice(index, 1)
      for (const i in this.testPlanList) {
        this.model.planIds[i] = this.testPlanList[i].id
        this.model.testPlanList[i] = this.testPlanList[i]
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    /**
       *task业务类型
       */
    getBusinessType(task) {
      return getBusinessTypeName(task)
    }
  }
}

</script>
<style scoped>
  .dialog-pagination {
    margin-top:5px;
    padding:10px 16px;
  }
  .container {
    min-height: 100%;
    margin-left: 10px;
    width: 100%;
    overflow: hidden;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
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
    height: 800px;
  }
  .dialog-pagination {
    clear: both;
    margin-top:8px;
    padding:10px 16px;
  }
  .popover-window {
    padding-left: 10px;
    padding-right: 10px;
    height: 90%;
  }
  .business-tree {
    margin-top: 10px;
    padding-bottom: 20px;
    height: 700px;
  }

  .device-tab {
    height: 800px;
    overflow-x: hidden;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .device-box-card {
    margin: 5px 0px 5px 5px;
    height: 800px;
  }

  .product-device-name {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dialog-pagination {
    margin-top:5px;
    padding:10px 16px;
  }

  .float {
    background-color: rgb(24, 144, 255);
    top: 8px;
    width: 55px;
    height: 40px;
    right: 0;
    position: absolute;
    text-align: center;
    font-size: 12px;
    border-radius: 6px 0px 0px 6px!important;
    z-index: 9999;
    pointer-events: auto;
    cursor: pointer;
    color: #fff;
  }
  .filter-container {
    padding-bottom: 5px;
  }
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
    height: 600px;
  }
  .dialog-pagination {
    margin-top:5px;
    padding:10px 10px;
  }
  .app-container{
    padding: 5px;
  }
</style>
