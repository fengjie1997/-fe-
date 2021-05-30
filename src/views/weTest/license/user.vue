<template>
  <div class="app-container we-test-license-user-container">
    <el-row>
      <el-col :span="topSpan">
        <div>
          <div class="filter-container">
            <el-form ref="listQuery" :model="listQuery" :rules="rules" :inline="true" class="demo-form-inline">
              <el-form-item label="license" prop="license">
                <el-input v-model="listQuery.license" placeholder="请输入查询的license" style="width: 200px;" class="filter-item" />
              </el-form-item>
              <el-button v-perm="'/weTestUserLicense/search'" v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSelectLicense('listQuery')">{{ $t('common.query') }}</el-button>
              <el-button class="filter-item" type="primary" @click="handleUnbindLicenses()">{{ 'license解绑' }}</el-button>
            </el-form>
          </div>
        </div>
      </el-col>
      <!-- 数据 -->
      <el-col :span="leftSpan" style="flex: 1;">
        <el-card class="box-card item" :body-style="{ flex: 1 }">
          <div slot="header" class="clearfix">
            <span>license信息</span>
          </div>
          <el-table
            ref="table"
            :show-header="false"
            :data="tableData"
            border
            height="calc(100vh - 260px)"
            :cell-style="columnStyle"
          >
            <el-table-column style="height: 100px" min-width="100" prop="name" />
            <el-table-column min-width="100" prop="amount1" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="rightSpan" style="flex: 1;">
        <el-card class="box-card item" :body-style="{ flex: 1 }">
          <div slot="header" class="clearfix">
            <span>license绑定设备</span>
          </div>
          <el-table
            ref="multipleTable"
            :key="tableKey"
            v-loading="listLoading"
            :data="UUIDList"
            border
            fit
            highlight-current-row
            height="calc(100vh - 260px)"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column :label="$t('WeTestTableHead.uuid')" align="center" min-width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.uniqueId }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('WeTestTableHead.deviceModel')" align="center" min-width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.deviceModel }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('WeTestTableHead.manufacturer')" align="center" min-width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.manufacturer }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.actions')"
              align="center"
              width="200"
              class-name="small-padding fixed-width"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button v-if="scope.row.isUnbind === 1" size="mini" type="primary" @click="handleUnbindLicense(scope.row.uniqueId)">{{ $t('weTestLicense.licenseUnbind') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import {
  selectLicense,
  selectUUID,
  fetchUserUnbind,
  fetchUserUnbindes
} from '../../../api/WeTest/license'
import { getRemainTime, getTime, getTimeStamp, getRemainTimeDay } from '../../../utils/timeZone'

export default {
  name: 'UserLicense',
  directives: { waves },
  data() {
    return {
      multipleSelection: [],
      licenseInfo: {},
      dataForm: {},
      topSpan: 24,
      appTypeOptions: [{ label: 'WeTest', value: 1 }, { label: 'WeTest ST', value: 2 }],
      leftSpan: 6,
      rightSpan: 18,
      tableKey: '',
      listLoading: false,
      UUIDList: [],
      licenseList: [],
      listQuery: {
        appType: '',
        license: ''
      },
      type: 'selectUUID',
      license: '',
      selectUUIDLicense: '',
      appType: 1,
      uuid: '',
      rules: {
        license: [
          { required: true, message: '必须输入license', trigger: 'blur' }
        ],
        appType: [
          { required: true, message: '必须选择App类型', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    tableData() {
      return [
        {
          name: this.$t('weTest.licenseTotal'),
          amount1: this.licenseInfo.total
        },
        {
          name: this.$t('weTestLicense.isUnbind'),
          amount1: this.licenseInfo.isUnbind === 1 ? this.$t('weTestLicense.unbind') : (this.licenseInfo.isUnbind === 0 ? this.$t('weTestLicense.unbindX') : '')
        },
        {
          name: this.$t('weTest.remain'),
          amount1: this.licenseInfo.remain
        },
        {
          name: this.$t('weTestResult.start_time'),
          amount1: this.getTimes(this.licenseInfo.startDt, 'startDt')
        },
        {
          name: this.$t('weTest.endDtWeTest'),
          amount1: this.getTimes(this.licenseInfo.perm, 'wetest')
        },
        {
          name: this.$t('weTest.wetestRemainDay'),
          amount1: this.getTableRemainTime(this.licenseInfo.perm, 'wetest')
        },
        {
          name: this.$t('weTest.endDtST'),
          amount1: this.getTimes(this.licenseInfo.perm, 'endDt')
        },
        {
          name: this.$t('weTest.stRemainDay'),
          amount1: this.getTableRemainTime(this.licenseInfo.perm, 'wetestSt')
        }
      ]
    }
  },
  methods: {
    // 自定义列背景色
    columnStyle({ columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 3) {
        // 第三第四列的背景色就改变了2和3都是列数的下标
        return 'background:#f3f6fc;'
      } else {
        return 'background:#ffffff;'
      }
    },
    // rowStyle() {
    //   return {
    //     height: ((document.body.clientHeight - 266) / 8).toString() + 'px'
    //   }
    // },
    getTimes(data, task) {
      if (data) {
        const perm = JSON.parse(data)
        switch (task) {
          case 'wetest' : return getTime(perm.validity.wetest, this.$store.getters.timezone)
          case 'wetestSt': return getTime(perm.validity.wetestSt, this.$store.getters.timezone)
          case 'startDt': return getTime(this.licenseInfo.startDt, this.$store.getters.timezone)
          case 'endDt': return getTime(this.licenseInfo.endDt, this.$store.getters.timezone)
        }
      }
    },
    handleSelectUUID() {
      selectUUID(this.license, parseInt(this.appType)).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.selectUUIDLicense = this.license
          this.UUIDList = data.data
        }
      })
    },
    getRemainTime(time) {
      return getRemainTime(getTimeStamp(new Date()), time)
    },
    getTableRemainTime(data, task) {
      console.log(data)
      if (data) {
        const perm = JSON.parse(data)
        console.log(perm)
        if (task === 'wetest') {
          if (perm.validity.version === 1 || perm.validity.version === 3) {
            return getRemainTimeDay(getTimeStamp(new Date()), perm.validity.wetest)
          }
        }
        if (task === 'wetestSt') {
          if (perm.validity.version === 2 || perm.validity.version === 3) {
            return getRemainTimeDay(getTimeStamp(new Date()), perm.validity.wetestSt)
          }
        }
      }
    },
    handleSelectLicense(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          selectLicense(this.listQuery.license, parseInt(this.listQuery.appType)).then(response => {
            const data = response.data
            if (data.code === 1) {
              this.licenseInfo = data.data
            }
          })
          selectUUID(this.listQuery.license, this.listQuery.appType).then(response => {
            const data = response.data
            if (data.code === 1) {
              this.selectUUIDLicense = this.license
              this.UUIDList = data.data
            }
          })
        } else {
          return false
        }
      })
    },
    handleUnbindLicense(id) {
      fetchUserUnbind(id, this.listQuery.license).then(res => {
        if (res.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.updateSuccess'),
            type: 'success',
            duration: 2000
          })
          this.handleSelectLicense('listQuery')
        }
      })
    },
    //  element提供表格选择
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleUnbindLicenses() {
      if (this.multipleSelection.length === 0) {
        this.$alert(this.$t('taskPlan.message.minRecord'), this.$t('taskPlan.title.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {}
        })
      } else if (this.multipleSelection.length > 0) {
        console.log(this.multipleSelection)
        const uuids = []
        for (const i in this.multipleSelection) {
          uuids.push(this.multipleSelection[i].uniqueId)
        }
        console.log(this.multipleSelection)
        fetchUserUnbindes(this.listQuery.license, uuids).then(response => {
          if (response.data.code === 1) {
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.deleteSuccess'),
              type: 'success',
              duration: 2000
            })
          }
          this.handleSelectLicense('listQuery')
        })
      }
    }
  }
}

</script>
<style scoped>
  .we-test-license-user-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .el-table__row {
    height: 100px;
  }
  .we-test-license-user-container .item {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
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
