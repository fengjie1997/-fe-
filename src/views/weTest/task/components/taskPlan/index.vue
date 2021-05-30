<template>
  <div>
    <div class="app-container">
      <div>
        <div class="filter-container">
          <el-form :inline="true" style="margin-bottom: auto">
            <el-form-item :label="$t('WeTestTableHead.uuid')">
              <el-input v-model="listQuery.uuid" style="width: 120px;" class="filter-item" />
            </el-form-item>
            <el-form-item label="生产商">
              <el-input v-model="listQuery.manufacturer" style="width: 120px;" class="filter-item" />
            </el-form-item>
            <el-form-item label="设备分组">
              <el-cascader
                v-model="groupIds"
                :options="groupOption"
                style="width: 150px;"
                clearable
                @change="handleGroupChange"
              />
            </el-form-item>
            <el-form-item label="任务状态">
              <el-select v-model="listQuery.status" style="width: 120px" class="filter-item">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button v-waves :loading="listLoading" class="filter-item" type="primary" icon="el-icon-search" @click="getList">{{ $t('common.search') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          v-loading="listLoading"
          :data="taskPlanList"
          border
          height="408"
        >
          <template v-for="(item,index) in tableHead">
            <el-table-column :key="index" align="center" :prop="item.property" :label="item.label">
              <template slot-scope="scope">
                <!-- 时间 -->
                <span v-if="item.time && scope.row[item.property] !== undefined">{{ getTimes(scope.row[item.property]) }}</span>
                <span v-else-if="item.property==='appType'">{{ getAppType(scope.row[item.property]) }}</span>
                <span v-else-if="item.property==='status'">{{ getStatus(scope.row[item.property]) }}</span>
                <span v-else-if="item.property==='groupId'">{{ getGroupId(scope.row[item.property]) }}</span>
                <span v-else>{{ scope.row[item.property] }}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column :label="$t('common.actions')" align="center" width="160">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status===1" v-waves :loading="listLoading" class="filter-item" type="danger" icon="el-icon-delete" @click="handleTestPlanCancel(scope.row)">{{ '取消任务下发' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import waves from '../../../../../directive/waves/waves'
import { getTime } from '../../../../../utils/timeZone'
import { getBusinessTypeName } from '../../../../../utils/WeTestBusinessList'
import { taskPlan, TestPlanCancel } from '../../../../../api/WeTest/task'
import { getTestPlanStatus, getAppType } from '../../../../../utils/WeTestTable'
import { fetchGroupList } from '../../../../../api/monitored/monitored'

export default {
  name: 'TaskPlan',
  directives: { waves },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      groupOption: [],
      groupIdsOptions: [],
      statusOptions: [{ label: '取消', value: 0 }, { label: '未接收', value: 1 }, { label: '传输中', value: 2 }, { label: '已接收', value: 3 }, { label: '测试中', value: 4 }, { label: '测试完成', value: 5 }],
      total: 0,
      taskIndex: '',
      listLoading: true,
      listQuery: {
        uuid: '',
        groupId: '',
        manufacturer: '',
        status: ''
      },
      groupIds: [],
      taskPlanList: [],
      taskList: [],
      tableHead: [{
        property: 'creator', label: this.$t('WeTestTableHead.distributor')
      }, {
        property: 'createDt', label: this.$t('WeTestTableHead.distributeDt'), time: true
      }, {
        property: 'name', label: this.$t('WeTestTableHead.jobName')
      }, {
        property: 'appType', label: this.$t('weTest.appType')
      }, {
        property: 'uuid', label: this.$t('WeTestTableHead.uuid')
      }, {
        property: 'manufacturer', label: '生产商'
      }, {
        property: 'groupId', label: '设备分组'
      }, {
        property: 'status', label: '状态'
      }, {
        property: 'updateDt', label: '状态更新时间', time: true
      }],
      groupIdName: ''
    }
  },
  created() {
    this.getGroupIds()
    this.getList()
  },
  methods: {
    getGroupIds() {
      fetchGroupList().then(res => {
        let num = 0
        if (res.data.code === 1) {
          const data = res.data.data
          this.groupOption = []
          this.groupIdsOptions = []
          // 获取组管理子节点信息
          for (let i = 0; i < data.length; i++) {
            this.groupOption[i] = {}
            this.groupOption[i].label = data[i].name
            this.groupOption[i].value = data[i].id
            this.groupOption[i].children = []
            if (data[i].children !== undefined) {
              for (let j = 0; j < data[i].children.length; j++) {
                this.groupIdsOptions[num] = {}
                this.groupIdsOptions[num].label = data[i].children[j].name
                this.groupIdsOptions[num].value = data[i].children[j].id
                num++
                this.groupOption[i].children[j] = {}
                this.groupOption[i].children[j].label = data[i].children[j].name
                this.groupOption[i].children[j].value = data[i].children[j].id
              }
            }
          }
        }
      })
    },
    getList() {
      this.listLoading = true
      taskPlan(this.model.id, this.listQuery).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.taskPlanList = data.data
          this.total = data.data.length
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
    getAppType(data) {
      return getAppType(data)
    },
    getStatus(data) {
      return getTestPlanStatus(data)
    },
    handleGroupChange(data) {
      this.listQuery.groupId = data[1]
    },
    getGroupId(data) {
      for (let i = 0; i < this.groupIdsOptions.length; i++) {
        if (data === this.groupIdsOptions[i].value) {
          return this.groupIdsOptions[i].label
        }
      }
    },
    handleTestPlanCancel(row) {
      this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
        center: false
      }).then(() => {
        if (row.id !== '') {
          TestPlanCancel(row.id, row.uuid).then(response => {
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
    handleFilter() {

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
