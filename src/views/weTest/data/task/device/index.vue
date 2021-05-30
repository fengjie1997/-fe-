<template>
  <div>
    <el-row>
      <el-col :span="spanLeft">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>设备列表</span>
            </div>
            <div>
              <div class="app-container">
                <div class="filter-container">
                  <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="生产商">
                      <el-input v-model="listQuery.manufacturer" style="width: 80px;" class="filter-item" />
                    </el-form-item>
                    <el-form-item label="选择排序">
                      <el-select v-model="listQuery.field" style="width: 60px" class="filter-item" @change="handleFilter">
                        <el-option v-for="item in fieldOptions" :key="item.key" :label="item.label" :value="item.key" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="排序方式">
                      <el-select v-model="listQuery.isAsc" style="width: 60px" class="filter-item" @change="handleFilter">
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
                    v-loading="listLoading"
                    :data="deviceList"
                    border
                    height="350"
                  >
                    <el-table-column type="expand">
                      <template slot-scope="props" style="">
                        <el-form label-position="left" inline class="demo-table-expand">
                          <el-form-item :label="$t('WeTestDevice.groupName')">
                            <span>{{ props.row.groupName }}</span>
                          </el-form-item>
                          <el-form-item :label="$t('WeTestDevice.osVersion')">
                            <span>{{ props.row.osVersion }}</span>
                          </el-form-item>
                          <el-form-item :label="$t('WeTestDevice.kernelVersion')">
                            <span>{{ props.row.kernelVersion }}</span>
                          </el-form-item>
                          <el-form-item :label="$t('WeTestDevice.deviceModel')">
                            <span>{{ props.row.deviceModel }}</span>
                          </el-form-item>
                          <el-form-item :label="$t('WeTestDevice.uuid')">
                            <span>{{ props.row.uuid }}</span>
                          </el-form-item>
                          <el-form-item :label="$t('WeTestDevice.version')">
                            <span>{{ props.row.version }}</span>
                          </el-form-item>
                          <el-form-item :label="$t('WeTestDevice.manufacturer')">
                            <span>{{ props.row.manufacturer }}</span>
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                    <template v-for="(item,index) in tableHead">
                      <el-table-column :key="index" align="center" :prop="item.property" :label="item.label">
                        <template slot-scope="scope">
                          <span>{{ scope.row[item.property] }}</span>
                        </template>
                      </el-table-column>
                    </template>
                    <el-table-column :label="$t('common.actions')" align="center" width="120">
                      <template slot-scope="scope">
                        <el-button v-waves :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="handleAddDevice(scope.row)">{{ '添加设备' }}</el-button>
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
              <span>已选设备列表</span>
            </div>
            <div class="app-container">
              <div>
                <el-table
                  v-loading="listLoading"
                  :data="taskList"
                  border
                  height="408"
                  style="margin-top: 22px"
                >
                  <el-table-column type="expand">
                    <template slot-scope="props" style="">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item :label="$t('WeTestDevice.groupName')">
                          <span>{{ props.row.groupName }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('WeTestDevice.osVersion')">
                          <span>{{ props.row.osVersion }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('WeTestDevice.kernelVersion')">
                          <span>{{ props.row.kernelVersion }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('WeTestDevice.deviceModel')">
                          <span>{{ props.row.deviceModel }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('WeTestDevice.imsi')">
                          <span>{{ props.row.imsi }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('WeTestDevice.uuid')">
                          <span>{{ props.row.uuid }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('WeTestDevice.version')">
                          <span>{{ props.row.version }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('WeTestDevice.manufacturer')">
                          <span>{{ props.row.manufacturer }}</span>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <template v-for="(item,index) in tableHead">
                    <el-table-column :key="index" align="center" :prop="item.property" :label="item.label">
                      <template slot-scope="scope">
                        <!-- 时间 -->
                        <span v-if="item.time && scope.row[item.property] !== undefined">{{ scope.row[item.property] | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
import waves from '@/directive/waves/waves'
import Pagination from '@/components/Pagination'
import { fetchWeTestDeviceList } from '../../../../../api/WeTest/device'

export default {
  name: 'Device',
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
      /**
         * 大小
         */
      spanLeft: 12,
      spanRight: 12,
      /**
         * 左侧业务
         */
      multipleTable: [],
      taskTable: {},
      selectData: [],
      time: '',
      // 数据
      temp: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        field: 'id',
        isAsc: 1
      },
      fieldOptions: [{ label: 'ID', key: 'id' }],
      isAscOptions: [{ label: this.$t('common.asc'), key: 1 }, { label: this.$t('common.desc'), key: 0 }],
      deviceList: [],
      taskList: [],
      tableHead: [{
        property: 'manufacturer', label: this.$t('WeTestDevice.manufacturer')
      }, {
        property: 'groupName', label: this.$t('WeTestDevice.groupName')
      }, {
        property: 'uuid', label: this.$t('WeTestDevice.uuid')
      }],
      status: []
    }
  },
  created() {
    this.getList()
    this.init()
  },
  methods: {
    getList() {
      const ids = []
      this.listLoading = true
      this.listQuery.appType = this.model.appType
      fetchWeTestDeviceList(this.listQuery, ids).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.deviceList = data.data.records
          this.total = data.data.total
        }
      })
      this.listLoading = false
    },
    init() {
      if (this.model.taskList !== undefined && this.model.deviceInfo !== null && this.model.deviceInfo !== '') {
        this.taskList = []
        for (const i in this.model.list) {
          this.taskList.push(JSON.parse(JSON.stringify(this.model.list[i])))
        }
      }
    },
    /**
       * 左侧业务
       */

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleAddDevice(row) {
      this.model.taskList = []
      let bool = false
      for (const i in this.taskList) {
        if (row.id === this.taskList[i].id) {
          bool = true
        }
      }
      if (bool) {
        this.$alert('既有设备不可重复添加', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      } else {
        this.selectData = row
        this.taskList.splice(0, 0, this.selectData)
      }
      for (const i in this.taskList) {
        this.model.taskList[i] = this.taskList[i]
      }
    },
    handleDelete(index) {
      this.model.taskList = []
      this.taskList.splice(index, 1)
      for (let i = 0; i < this.taskList.length; i++) {
        this.model.taskList[i] = this.taskList[i]
      }
    }
  }
}

</script>
<style scoped>
  body .el-table th.gutter{
    display: table-cell!important;
  }
  body .el-table colgroup.gutter{
    display: table-cell!important;
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
    padding:10px 16px;
  }
  .app-container{
    padding: 5px;
  }
</style>
