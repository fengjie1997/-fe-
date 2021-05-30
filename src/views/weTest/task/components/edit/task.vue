<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item :label="$t('WeTestTableHead.jobName')">
          <el-input v-model="model.name" />
        </el-form-item>
        <el-form-item label="截止时间">
          <el-date-picker v-model="model.loopTimes" type="datetime" :default-value="defaultEndTime" />
        </el-form-item>
      </el-form>
    </div>
    <div>

      <el-table
        v-loading="listLoading"
        :data="list"
        border
        height="410"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="props" style="">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="业务ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="创建者">
                <span>{{ props.row.creator }}</span>
              </el-form-item>
              <el-form-item v-for="(item,itemIndex) in JSON.parse(props.row.config).servers" :key="item.itemIndex" :label="$t('weTest.ipConfig')">
                <span style="float:left;">
                  <el-form-item :prop="'servers.'+ itemIndex + '.url'">
                    <span>{{ item.key }}</span>
                  </el-form-item>
                </span>
              </el-form-item>
              <el-form-item label="业务类1型">
                <span>{{ JSON.parse(props.row.config).taskName }}</span>
              </el-form-item>
              <el-form-item label="业务名称">
                <span>{{ JSON.parse(props.row.config).name }}</span>
              </el-form-item>
              <el-form-item label="测试时长(s)">
                <span>{{ JSON.parse(props.row.config).testDuration }}</span>
              </el-form-item>
              <el-form-item label="间隔时长(s)">
                <span>{{ JSON.parse(props.row.config).testIntervalS }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="selection" align="center" width="50" />
        <template v-for="(item,index) in tableHead">
          <el-table-column :key="index" align="center" :prop="item.property" :label="item.label">
            <template slot-scope="scope">
              <!-- 时间 -->
              <span v-if="item.time && scope.row[item.property] !== undefined">{{ scope.row[item.property] | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
              <span v-else>{{ scope.row[item.property] }}</span>
            </template>
          </el-table-column>
        </template>
        <!-- 操作 -->
        <el-table-column :label="$t('common.actions')" align="center" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpdate(scope.row)">{{ $t('common.edit') }}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- Page -->
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="getList" />
    </div>
  </div>

</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { fetchList } from '../../../../../api/WeTest/business'

export default {
  name: 'Edit',
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
      // 数据
      multipleSelection: [],
      temp: {
        loopInterval: 1,
        loopTimes: '',
        name: '',
        tasks: []
      },
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        field: 'id',
        isAsc: 1
      },
      fieldOptions: [{ label: 'ID', key: 'id' }],
      isAscOptions: [{ label: this.$t('common.asc'), key: 1 }, { label: this.$t('common.desc'), key: 0 }],
      list: [],
      tableHead: [{
        property: 'id', label: this.$t('weTest.businessId')
      }, {
        property: 'taskName', label: this.$t('weTest.taskName')
      }, {
        property: 'name', label: this.$t('weTest.businessName')
      }, {
        property: 'taskName', label: this.$t('weTest.businessType')
      }, {
        property: 'createDt', label: this.$t('weTest.createTime'), time: true
      }]
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
          this.list = data.data.records
          this.total = data.data.total
        }
        this.listLoading = false
      })
    },
    init() {
      for (const j in this.temp) {
        this.$set(this.model, j, this.temp[j])
      }
    },
    handleFilter() {
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style scoped>
  .dialog-pagination {
    margin-top:5px;
    padding:10px 16px;
  }
</style>
