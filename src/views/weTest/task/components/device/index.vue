<template>
  <div>
    <el-row>
      <!--左侧业务列表-->
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
                      <el-input v-model="listQuery.manufacturer" style="width: 100px;" class="filter-item" />
                    </el-form-item>
                    <el-form-item label="设备ID">
                      <el-input v-model="listQuery.uuid" style="width: 100px;" class="filter-item" />
                    </el-form-item>
                    <el-form-item label="设备分组">
                      <el-cascader
                        v-model="selectGroupIds"
                        style="width: 180px"
                        clearable
                        :options="groupOption"
                      />
                    </el-form-item>
                    <el-form-item label="排序方式">
                      <el-select v-model="listQuery.isAsc" style="width: 100px" class="filter-item" @change="handleFilter">
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
                    height="300"
                  >
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
              <span>下发设备列表</span>
            </div>
            <div class="app-container">
              <div class="filter-container">
                <span style="margin-bottom: 50px">选择任务下发的设备</span>
              </div>
              <div>
                <el-table
                  v-loading="listLoading"
                  :data="taskList"
                  border
                  height="408"
                  style="margin-top: 22px"
                >
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
import { fetchGroupList, fetchWeTestDeviceList } from '../../../../../api/WeTest/device'

export default {
  name: 'Device',
  components: { Pagination },
  directives: { waves },
  props: {
    model: {
      type: Array,
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
      status: [],
      groupOption: [],
      groupOptions: [],
      groupIds: [],
      selectGroupIds: []
    }
  },
  created() {
    this.getList()
    this.init()
  },
  methods: {
    getList() {
      this.listLoading = false
      fetchGroupList().then(res => {
        let num = 0
        const data = res.data
        if (data.code === 1) {
          this.groupOption = []
          for (let i = 0; i < data.data.length; i++) {
            this.groupOption[i] = {}
            this.groupOption[i].label = data.data[i].name
            this.groupOption[i].value = data.data[i].id
            this.groupOption[i].children = []
            if (data.data[i].children !== undefined) {
              for (let j = 0; j < data.data[i].children.length; j++) {
                this.groupOptions[num] = {}
                this.groupOptions[num].label = data.data[i].children[j].name
                this.groupOptions[num].value = data.data[i].children[j].id
                this.groupIds[num] = data.data[i].children[j].id
                num++
                this.groupOption[i].children[j] = {}
                this.groupOption[i].children[j].label = data.data[i].children[j].name
                this.groupOption[i].children[j].value = data.data[i].children[j].id
              }
            }
          }
          this.listLoading = true
          if (this.selectGroupIds.length !== 0) {
            this.groupIds = []
            this.groupIds[0] = this.selectGroupIds[1]
          }
          fetchWeTestDeviceList(this.listQuery, this.groupIds).then(response => {
            const data = response.data
            if (data.code === 1) {
              this.deviceList = data.data.records
              this.total = data.data.total
            }
          })
          this.listLoading = false
        }
      })
    },
    collectId(arr, ids = []) {
      arr.forEach(({ id, subPermission }) => {
        if (id) {
          ids.push(id)
        }
        if (subPermission) {
          this.collectId(subPermission, ids)
        }
      })
      return ids
    },
    init() {
      for (const j in this.temp) {
        this.$set(this.model, j, this.temp[j])
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
        this.model[i] = this.taskList[i].uuid
      }
    },
    handleDelete(index) {
      const id = []
      this.taskList.splice(index, 1)
      for (let i = 0; i < this.taskList.length; i++) {
        id[i] = this.taskList[i].uuid
      }
      for (let i = 0; i < id.length; i++) {
        this.model[i] = id[i]
      }
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
