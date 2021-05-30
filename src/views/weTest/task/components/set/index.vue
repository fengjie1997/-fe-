<template>
  <div>
    <el-row>
      <!--左侧业务列表-->
      <el-col :span="spanLeft">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>业务列表</span>
            </div>
            <div>
              <div class="app-container">
                <div class="filter-container">
                  <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="业务名称">
                      <el-input v-model="listQuery.name" style="width: 80px;" class="filter-item" />
                    </el-form-item>
                    <el-form-item label="创建者">
                      <el-input v-model="listQuery.creator" style="width: 80px;float: left" class="filter-item" />
                    </el-form-item>
                    <el-form-item label="业务类型">
                      <el-cascader
                        v-model="taskType"
                        :options="typeOptions"
                        :props="{ checkStrictly: true }"
                        clearable
                        style="width: 100px"
                        class="filter-item"
                        @change="getTaskAndTaskName"
                      />
                    </el-form-item>
                    <el-form-item label="排序方式">
                      <el-select v-model="listQuery.isAsc" style="width: 80px" class="filter-item" @change="handleFilter">
                        <el-option v-for="item in isAscOptions" :key="item.key" :label="item.label" :value="item.key" />
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button v-waves :loading="listLoading" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('common.search') }}</el-button>
                    </el-form-item>
                  </el-form>
                </div>
                <div>
                  <el-table
                    ref="multipleTable"
                    v-loading="listLoading"
                    :data="businessList"
                    border
                    style="width: auto"
                    height="350"
                  >
                    <el-table-column type="expand">
                      <template slot-scope="props" style="">
                        <el-form label-position="left" inline class="demo-table-expand">
                          <el-form-item label="测试次数">
                            <span>{{ JSON.parse(props.row.config).testTimes }}</span>
                          </el-form-item>
                          <el-form-item label="间隔时长(s)">
                            <span>{{ JSON.parse(props.row.config).testIntervalS }}</span>
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                    <template v-for="(item,index) in tableHead">
                      <el-table-column :key="index" align="center" :prop="item.property" :label="item.label">
                        <template slot-scope="scope">
                          <!-- 时间 -->
                          <span v-if="item.property === 'taskName'">{{ getTaskName(scope.row[item.property]) }}</span>
                          <span v-else-if="item.time && scope.row[item.property] !== undefined">{{ getTimes(scope.row[item.property]) }}</span>
                          <span v-else>{{ scope.row[item.property] }}</span>
                        </template>
                      </el-table-column>
                    </template>
                    <el-table-column :label="$t('common.actions')" align="center" width="120">
                      <template slot-scope="scope">
                        <el-button v-waves :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="handleAddBusiness(scope.row)">{{ '添加业务' }}</el-button>
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
      <el-col :span="spanRight">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>任务配置</span>
            </div>
            <div class="app-container">
              <div class="filter-container1">
                <el-form ref="dataForm" :inline="true" class="demo-form-inline" :rules="rules" :model="model">
                  <el-form-item :label="$t('WeTestTableHead.jobName')" prop="name">
                    <el-input v-model="model.name" />
                  </el-form-item>
                  <el-form-item label="截止时间" prop="endTime">
                    <el-date-picker
                      v-model="model.endTime"
                      value-format="timestamp"
                      type="datetime"
                      :default-value="defaultTime"
                      :picker-options="pickerOptions0"
                      @change="getTime"
                    />
                  </el-form-item>
                </el-form>
              </div>
              <div>

                <el-table
                  v-loading="listLoading"
                  :data="taskList"
                  border
                  height="408"
                >
                  <template v-for="(item,index) in tableHead">
                    <el-table-column :key="index" align="center" :prop="item.property" :label="item.label">
                      <template slot-scope="scope">
                        <!-- 时间 -->
                        <span v-if="item.property === 'taskName'">{{ getTaskName(scope.row[item.property]) }}</span>
                        <span v-else-if="item.time && scope.row[item.property] !== undefined">{{ getTimes(scope.row[item.property]) }}</span>
                        <span v-else>{{ scope.row[item.property] }}</span>
                      </template>
                    </el-table-column>
                  </template>
                  <el-table-column :label="$t('common.actions')" align="center" width="140">
                    <template slot-scope="scope">
                      <el-button v-waves :loading="listLoading" class="filter-item" type="danger" icon="el-icon-minus" @click="handleDelete(scope.$index)">{{ '删除' }}</el-button>
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
import Pagination from '../../../../../components/Pagination'
import { getBusinessName } from '../../../../../utils/WeTestBusinessList'
import { fetchList } from '../../../../../api/WeTest/business'
import { getTimeZone, getTime } from '../../../../../utils/timeZone'
import { weTestBusiness } from '@/views/weTest/business/util'

export default {
  name: 'Set',
  components: { Pagination },
  directives: { waves },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7// 如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      /**
         * 大小
         */
      spanLeft: 12,
      spanRight: 12,
      /**
       * 左侧业务
       */
      taskType: [],
      dialogVisible: false,
      business: '',
      businessData: {},
      multipleTable: [],
      taskTable: {},
      selectData: [],
      defaultTime: getTimeZone(this.$store.getters.timezone),
      // 数据
      time: '',
      temp: {
        appType: 1,
        endTime: '',
        loopInterval: 5,
        loopTimes: 1,
        name: '',
        tasks: []
      },
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        field: 'id',
        isAsc: 0
      },
      typeOptions: weTestBusiness,
      fieldOptions: [{ label: this.$t('weTest.businessId'), key: 'id' }, { label: this.$t('weTest.createTime'), key: 'createDt' }, { label: this.$t('weTest.updateDt'), key: 'updateDt' }],
      isAscOptions: [{ label: this.$t('common.asc'), key: 1 }, { label: this.$t('common.desc'), key: 0 }],
      businessList: [],
      taskList: [],
      tableHead: [{
        property: 'creator', label: this.$t('weTest.creator')
      }, {
        property: 'name', label: this.$t('weTest.businessName')
      }, {
        property: 'taskName', label: this.$t('weTest.businessType')
      }, {
        property: 'createDt', label: this.$t('weTest.createTime'), time: true
      }],
      rules: {
        name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        endTime: [{ required: true, message: '请输入截止时间', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    this.init()
  },
  methods: {
    getList() {
      this.listLoading = false
      fetchList(this.listQuery).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.businessList = data.data.records
          this.total = data.data.total
        }
        this.listLoading = false
      })
    },
    init() {
      if (this.model.name === undefined) {
        for (const j in this.temp) {
          this.$set(this.model, j, this.temp[j])
        }
      }
    },
    /**
     * 时间数据渲染表格
     */
    getTimes(time) {
      return getTime(time, this.$store.getters.timezone)
    },
    getTime() {
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleAddBusiness(row) {
      this.selectData = row
      this.taskList.splice(0, 0, this.selectData)
    },
    handleDelete(index) {
      this.taskList.splice(index, 1)
    },
    /**
     * 选择业务类型，返回type(第二级业务)、task(第一级业务)
     */
    getTaskAndTaskName() {
      if (this.taskType.length === 0) {
        this.listQuery.type = []
      } else if (this.taskType.length === 1) {
        console.log(this.taskType)
        this.listQuery.type = []
        for (const i in this.typeOptions[Number(this.taskType[0]) - 1].children) {
          this.listQuery.type.push(this.typeOptions[Number(this.taskType[0]) - 1].children[i].value)
        }
      } else {
        if (this.taskType[1] !== undefined) {
          this.listQuery.type = []
          this.listQuery.type.push(this.taskType[1])
        }
      }
    },
    getTaskName(taskName) {
      return getBusinessName(taskName)
    },
    submitForm() {
      this.model.tasks = []
      for (let i = 0; i < this.taskList.length; i++) {
        if (this.taskList[i].config != null) {
          this.model.tasks[i] = JSON.parse(this.taskList[i].config)
        }
      }
      return this.$refs.dataForm.validate()
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
    height: 600px;
  }
  .dialog-pagination {
    margin-top:5px;
    padding:10px 16px;
  }
  .app-container{
    padding: 5px;
  }
</style>
