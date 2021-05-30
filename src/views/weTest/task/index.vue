<template>
  <div class="app-container we-test-task-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item :label="$t('WeTestTableHead.jobName')">
          <el-input v-model="listQuery.name" style="width: 100px;" class="filter-item" />
        </el-form-item>
        <el-form-item :label="$t('WeTestTableHead.creator')">
          <el-input v-model="listQuery.creator" style="width: 100px;" class="filter-item" />
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
            @change="getTimes"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-perm="'/weTestTask/searchTask'" v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('common.search') }}</el-button>
        </el-form-item>
        <el-form-item :label="$t('weTest.select')">
          <el-select v-model="listQuery.field" style="width: 100px" class="filter-item" @change="handleFilter">
            <el-option v-for="item in timeOptions" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('weTest.order')">
          <el-select v-model="listQuery.isAsc" style="width: 100px" class="filter-item" @change="handleFilter">
            <el-option v-for="item in isAscOptions" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('weTest.setTask') }}</el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      height="100%"
      highlight-current-row
      style="width: 100%"
    >
      <!-- 数据 -->
      <el-table-column
        type="index"
        label="序号"
        align="center"
        min-width="50"
        fixed="left"
      >
        <template slot-scope="scope">
          <span>{{ (listQuery.page - 1) * listQuery.limit + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="序号" width="50px" align="center" fixed="left">-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.$index+1 }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column :label="$t('weTest.taskName')" align="center" min-width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.taskState')" align="center" min-width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.isRetrieved === 1">{{ '已下发' }}</span>
          <span v-if="scope.row.isRetrieved === 0">{{ '未下发' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.creator')" align="center" min-width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.creator }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('WeTestTableHead.startDt')" align="center" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.startDt !== undefined">{{ getTime(scope.row.startDt) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.endDt')" align="center" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.endDt !== undefined">{{ getTime(scope.row.endDt) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.updator')" align="center" min-width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.updator === undefined">{{ '无更新记录' }}</span>
          <span v-if="scope.row.updator !== undefined">{{ scope.row.updator }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.updateDt')" align="center" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.updator === undefined">{{ '无更新记录' }}</span>
          <span v-if="scope.row.updateDt !== undefined">{{ getTime(scope.row.updateDt) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.actions')" align="center" width="350" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isRetrieved !== 1" v-perm="'/weTestTask/editTask'" type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">{{ $t('common.edit') }}</el-button>
          <el-button v-if="scope.row.isRetrieved !== 1" v-perm="'/weTestTask/sendTask'" type="warning" size="mini" @click="handleSend(scope.row)">{{ $t('weTest.taskAssignment') }}</el-button>
          <el-button v-if="scope.row.isRetrieved !== 1" v-perm="'/weTestTask/deleteTask'" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</el-button>
          <el-button v-if="scope.row.isRetrieved === 1" v-perm="'/weTestTask/business'" size="mini" type="success" @click="handleSee(scope.row)">{{ '查看业务' }}</el-button>
          <el-button v-if="scope.row.isRetrieved === 1" v-perm="'/weTestTask/testPlan'" size="mini" type="primary" @click="handleTaskPlan(scope.row.id)">{{ '查看下发' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Page -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <div>
      <el-dialog
        v-if="dialogVisible"
        :title="dialogStatus==='add'?$t('weTest.setTask'):(dialogStatus==='update'?$t('weTest.editTask'):(dialogStatus==='see'?'查看详情':(dialogStatus==='taskPlan'?'任务下发记录':'任务下发')))"
        :visible.sync="dialogVisible"
        :append-to-body="true"
        :modal-append-to-body="false"
        :width="width"
        style="height: 95%"
      >
        <TaskPlan v-if="dialogType === 'taskPlan'" :model="model" />
        <Set v-if="dialogType === 'setTask'" ref="order" :model="model" />
        <TaskEdit v-if="dialogType === 'editTask'" ref="order" :model="editModel" />
        <See v-if="dialogType === 'seeTask'" :model="editModel" />
        <Device v-if="dialogType === 'sendTask'" :model="device" />
        <div slot="footer" class="dialog-footer">
          <el-button v-if="dialogStatus !== 'see'" @click="cancelForm()">{{ $t('common.cancel') }}</el-button>
          <el-button :loading="buttonLoading" type="primary" @click="dialogStatus==='add'?addData(): (dialogStatus === 'update' ? updateData() :(dialogStatus === 'see' ? seeCancel():(dialogStatus === 'taskPlan'?cancelForm():sendData())))">{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import See from './components/see/index'
import Set from './components/set/index'
import TaskPlan from './components/taskPlan/index'
import TaskEdit from './components/update/index'
import Device from './components/device/index'
import { fetchList, createTask, deleteTask, sendTask, updateTask } from '../../../api/WeTest/task'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { getTime, getTimeZone, getTimeStamp } from '../../../utils/timeZone'

export default {
  directives: { waves },
  components: { Pagination, Set, See, TaskEdit, Device, TaskPlan },
  data() {
    return {
      /**
         * 大小
       */
      spanLeft: 12,
      spanRight: 12,
      id: '',
      dialogVisible: false,
      dialogType: '',
      dialogStatus: '',
      // 数据
      model: {},
      time: [],
      editModel: {},
      device: [],
      reset: {},
      width: '',
      tableKey: 0,
      defaultTime: getTimeZone(this.$store.getters.timezone),
      total: 0,
      listLoading: false,
      listQuery: {
        timeField: 'start_dt',
        page: 1,
        limit: 10,
        name: undefined,
        field: 'start_dt',
        isAsc: 0
      },
      timeOptions: [{ label: this.$t('weTest.takeDt'), key: 'start_dt' }, { label: this.$t('weTest.endDt'), key: 'end_dt' }, { label: this.$t('weTest.updateDt'), key: 'update_dt' }],
      isAscOptions: [{ label: this.$t('common.asc'), key: 1 }, { label: this.$t('common.desc'), key: 0 }],
      list: [],
      tableHead: [{
        property: 'name', label: this.$t('testPlan.name')
      }, {
        property: 'version', label: this.$t('testPlan.version')
      }, {
        property: 'startDt', label: this.$t('WeTestTableHead.startDt'), time: true
      }, {
        property: 'endDt', label: this.$t('testPlan.endDt'), time: true
      }, {
        property: 'retrieveDt', label: this.$t('testPlan.retrieveDt'), time: true
      }],
      buttonLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = data.data.total
        }
        this.listLoading = false
      })
    },
    /**
     * 渲染表格时间
     * @param time
     */
    getTime(time) {
      return getTime(time, this.$store.getters.timezone)
    },
    /**
     * 获取创建时间条件选择
     */
    getTimes() {
      if (this.time !== null) {
        this.listQuery.startDt = this.time[0]
        this.listQuery.endDt = this.time[1]
      } else {
        this.listQuery.startDt = ''
        this.listQuery.endDt = ''
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.width = '90%'
      this.dialogType = 'setTask'
      this.dialogStatus = 'add'
      this.dialogVisible = true
    },
    addData() {
      this.buttonLoading = true
      this.$refs.order.submitForm().then((valid) => {
        if (this.model.tasks.length === 0) {
          this.$alert('至少选一个业务', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        } else {
          createTask(this.model).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.createSuccess'),
                type: 'success',
                duration: 2000
              })
              this.getList()
              this.model = {}
              this.buttonLoading = false
              this.dialogVisible = false
            }
          })
        }
      }, () => {
        this.$alert('提交参数有误，请检查', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.buttonLoading = false
          }
        })
      })
      this.buttonLoading = false
      this.getList()
    },
    handleSee(row) {
      this.id = row.id
      this.editModel = row
      this.width = '40%'
      this.dialogType = 'seeTask'
      this.dialogStatus = 'see'
      this.dialogVisible = true
    },
    handleTaskPlan(id) {
      this.dialogStatus = 'taskPlan'
      this.dialogType = 'taskPlan'
      this.width = '60%'
      this.model = {}
      this.model.id = id
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.id = row.id
      this.editModel = row
      this.width = '90%'
      this.dialogType = 'editTask'
      this.dialogStatus = 'update'
      this.dialogVisible = true
    },
    updateData() {
      this.$refs.order.submitForm().then((valid) => {
        if (this.editModel.tasks.length === 0) {
          this.$alert('至少选一个业务', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        } else {
          this.editModel.appType = 1
          updateTask(this.editModel.id, this.editModel).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.updateSuccess'),
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
          this.dialogVisible = false
        }
      }, () => {
        this.$alert('提交参数有误，请检查', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      })
    },
    handleDelete(row) {
      this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
        center: false
      }).then(() => {
        if (row.id !== '') {
          deleteTask(row.id).then(response => {
            if (response.data.code === 1) {
              this.getList()
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleSend(row) {
      if (row.endDt < getTimeStamp(this.defaultTime)) {
        this.$alert('任务已失效，请修改截止时间', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      } else {
        this.model = {}
        this.width = '90%'
        this.dialogType = 'sendTask'
        this.dialogStatus = 'send'
        this.dialogVisible = true
        this.id = row.id
      }
    },
    sendData() {
      if (this.device.length === 0) {
        this.$alert('至少选择一部下发设备', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      } else {
        sendTask(1, this.device, this.id).then(response => {
          if (response.data.code === 1) {
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.createSuccess'),
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.dialogVisible = false
          }
        })
      }
    },
    cancelForm() {
      this.model = {}
      this.getList()
      this.dialogVisible = false
    },
    seeCancel() {
      this.getList()
      this.dialogVisible = false
    }
  }
}

</script>
<style scoped>
  .we-test-task-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .filter-container {
    padding-bottom: 1px;
  }
  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
  body .el-table th.gutter{
    display: table-cell!important;
  }
</style>
