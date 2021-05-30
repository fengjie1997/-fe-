<template>
  <div class="app-container we-test-perm-admin-container">
    <div class="filter-container">
      <el-form :inline="true" style="margin-bottom: auto">
        <el-form-item label="license">
          <el-input v-model="listQuery.license" style="width: 160px;" class="filter-item" />
        </el-form-item>
        <el-form-item label="license类型">
          <el-select v-model="listQuery.type" clearable style="width: 160px" class="filter-item">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="listQuery.creator" style="width: 160px;" class="filter-item" />
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('common.search') }}</el-button>
        </el-form-item>
        <el-form-item label="选择排序">
          <el-select v-model="listQuery.field" style="width: 120px" class="filter-item" @change="handleFilter">
            <el-option v-for="item in fieldOptions" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序方式">
          <el-select v-model="listQuery.isAsc" style="width: 120px" class="filter-item" @change="handleFilter">
            <el-option v-for="item in isAscOptions" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-button v-perm="'/weTestAdminLicense/set'" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreateLicense()">{{ '创建license' }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fitg
      height="100%"
    >
      <el-table-column
        v-if="total > 0"
        type="index"
        label="序号"
        align="center"
        width="50"
      >
        <template slot-scope="scope">
          <span>{{ (listQuery.page - 1) * listQuery.limit + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!-- 数据 -->
      <!--      <el-table-column :label="$t('weTest.id')" align="center" min-width="110">-->
      <!--        <template slot-scope="scope">-->
      <!--          <span>{{ scope.row.id }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column :label="$t('weTest.license')" align="center" min-width="260">
        <template slot-scope="scope">
          <span>{{ scope.row.license }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.licenseType')" align="center" width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 1">{{ '试用版' }}</span>
          <span v-if="scope.row.type === 2">{{ '正式版' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTestLicense.isUnbind')" align="center" width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.isUnbind === 1">{{ '可解绑' }}</span>
          <span v-if="scope.row.isUnbind === 0">{{ '不可解绑' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.targetFirm')" align="center" width="110">
        <template slot-scope="scope">
          <span>{{ getTargetFirm(scope.row.targetFirm) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.customerName')" align="center" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column :label="$t('weTest.appType')" align="center" min-width="110">-->
      <!--        <template slot-scope="scope">-->
      <!--          <span v-if="scope.row.appType === 1">{{ 'WeTest' }}</span>-->
      <!--          <span v-if="scope.row.appType === 2">{{ 'WeTest ST' }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column :label="$t('weTest.licenseTotal')" align="center" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.total }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.remain')" align="center" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.remain }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.creator')" align="center" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.creator }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.createTime')" align="center" min-width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.createDt !== null">{{ getTimes(scope.row.createDt) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.updator')" align="center" width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.updator !== null">{{ scope.row.updator }}</span>
          <span v-if="scope.row.updator === null">{{ '无更新记录' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.updateDt')" align="center" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.updateDt !== null">{{ getTimes(scope.row.updateDt) }}</span>
          <span v-if="scope.row.updateDt === null">{{ '无更新记录' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.startDt')" align="center" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.startDt !== null">{{ getTimes(scope.row.startDt) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.endDtLicense')" align="center" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.endDt !== null">{{ getTimes(scope.row.endDt) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.licenseRemainDay')" align="center" width="130">
        <template slot-scope="scope">
          <span>{{ getTableRemainTime(scope.row.endDt) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.endDtWeTest')" align="center" width="150">
        <template slot-scope="scope">
          <span v-if="JSON.parse(scope.row.perm).validity.version === 3 || JSON.parse(scope.row.perm).validity.version === 1">{{ getTimes(JSON.parse(scope.row.perm).validity.wetest) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.wetestRemainDay')" align="center" width="130">
        <template slot-scope="scope">
          <span v-if="JSON.parse(scope.row.perm).validity.version === 3 || JSON.parse(scope.row.perm).validity.version === 1">{{ getTableRemainTime(JSON.parse(scope.row.perm).validity.wetest) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.endDtST')" align="center" width="150">
        <template slot-scope="scope">
          <span v-if="JSON.parse(scope.row.perm).validity.version === 3 || JSON.parse(scope.row.perm).validity.version === 2">{{ getTimes(JSON.parse(scope.row.perm).validity.wetestSt) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.stRemainDay')" align="center" width="130">
        <template slot-scope="scope">
          <span v-if="JSON.parse(scope.row.perm).validity.version === 3 || JSON.parse(scope.row.perm).validity.version === 2">{{ getTableRemainTime(JSON.parse(scope.row.perm).validity.wetestSt) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('weTest.isDisable')" align="center" width="90" fixed="right">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.isDisable === isDisableState?$t('weTest.normal'):$t('weTest.locked')" placement="top">
            <el-switch
              v-model="scope.row.isDisable"
              :active-value="lock0"
              :inactive-value="lock1"
              @change="handleSwitchLock(scope.row.id, scope.row.isDisable)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('common.actions')"
        align="center"
        min-width="250"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button v-perm="'/weTestAdminLicense/edit'" size="mini" type="primary" @click="handleEditLicense(scope.row)">{{ $t('weTest.editLicense') }}</el-button>
          <el-button v-perm="'/weTestAdminLicense/edit'" size="mini" type="primary" @click="handleDeviceLicense(scope.row)">{{ $t('weTest.deviceLicense') }}</el-button>
          <el-button v-if="scope.row.isUnbind === 1" size="mini" type="primary" @click="row = scope.row, dialogVisibleLicense = true">{{ $t('weTestLicense.licenseUnbind') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Page -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 新建/编辑License -->
    <el-dialog
      :title="dialogStatus==='create'?'新建license':$t('weTest.editLicense') + '(' + licenseInfo.license + ' / ' + licenseInfo.type +')' "
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="810px"
      @close="closeDialog"
    >
      <div class="filter-container">
        <el-form ref="ruleForm" :inline="true" :model="license" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="span">
              <div>
                <el-card class="box-card">
                  <div slot="header" class="clear-fix">
                    <span>license信息</span>
                  </div>
                  <div class="app-container">
                    <el-form-item label="可绑设备">
                      <el-input v-model.number="license.total" :disabled="licenseInfo.type === '试用版'" style="width: 220px" />
                    </el-form-item>
                    <el-form-item label="客户名称">
                      <el-input v-model="license.customerName" style="width: 220px" />
                    </el-form-item>
                    <el-form-item label="开始时间" prop="startDt">
                      <el-date-picker v-model="license.startDt" value-format="timestamp" type="datetime" placeholder="选择日期时间" />
                    </el-form-item>
                    <el-form-item label="截止时间" prop="endDt">
                      <el-date-picker v-model="license.endDt" value-format="timestamp" type="datetime" placeholder="选择日期时间" />
                    </el-form-item>
                    <el-form-item label="授权厂商">
                      <el-select v-model="license.targetFirm" style="width: 220px" clearable @change="getTargetFirmNull">
                        <el-option v-for="item in targetFirmOptions" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="解绑权限">
                      <el-select v-model="license.isUnbind" style="width: 220px">
                        <el-option v-for="item in isUnbindOptions" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-form-item>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="span">
              <div>
                <el-card class="box-card">
                  <div slot="header" class="clear-fix">
                    <span>功能信息</span>
                  </div>
                  <div class="app-container">
                    <el-form-item label="功能权限" prop="selectActionList">
                      <el-checkbox v-model="checkedWeTest" style="margin-left: 40px" @change="license.perm.validity.wetest = null, license.WeTestEndDt = null">WeTest</el-checkbox>
                    </el-form-item>
                    <el-form-item prop="WeTestEndDt">
                      <el-date-picker v-model="license.WeTestEndDt" style="margin-left:22px;width: 380px" :disabled="!checkedWeTest" value-format="timestamp" type="datetime" placeholder="选择WeTest的截止时间" @change="license.perm.validity.wetest = license.WeTestEndDt" />
                    </el-form-item>
                    <el-form-item prop="selectActionList">
                      <el-checkbox v-model="checkedSt" style="margin-left: 140px" @change="license.perm.validity.wetestSt = null, license.StEndDt = null">WeTest ST</el-checkbox>
                    </el-form-item>
                    <el-form-item prop="StEndDt">
                      <el-date-picker v-model="license.StEndDt" style="width: 380px" :disabled="!checkedSt" value-format="timestamp" type="datetime" placeholder="选择WeTest ST的截止时间" @change="license.perm.validity.wetestSt = license.StEndDt" />
                    </el-form-item>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus==='create'" :loading="buttonLoading" type="primary" @click="handleCreate('ruleForm')">{{ $t('WeTestButton.confirm') }}</el-button>
        <el-button v-if="dialogStatus==='update'" :loading="buttonLoading" type="primary" @click="handleUpdate('ruleForm')">{{ $t('WeTestButton.confirm') }}</el-button>
        <el-button @click="confirm">{{ '取消' }}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="已绑设备"
      :visible.sync="dialogVisibleDevice"
      :modal-append-to-body="false"
      width="70%"
    >
      <el-card class="box-card">
        <div slot="header">
          <span>
            <el-button v-perm="'/wetest/license/mange/unbind/license'" class="filter-item" type="primary" @click="handleUnbindLicenses()">{{ 'license解绑' }}</el-button>
          </span>
        </div>
        <div class="filter-container">
          <el-table
            ref="multipleTable"
            :key="tableKey"
            v-loading="listLoading"
            :data="UUIDList"
            border
            fit
            height="400px"
            highlight-current-row
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column :label="$t('weTest.license')" align="center" min-width="260">
              <template slot-scope="scope">
                <span>{{ scope.row.deviceLicense }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('weTest.licenseType')" align="center" min-width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.licenseType }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('WeTestTableHead.uuid')" align="center" min-width="150">
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
              min-width="110"
              class-name="small-padding fixed-width"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button v-if="scope.row.isUnbind === 1" size="mini" type="primary" @click="handleDeviceUnbind(scope.row)">{{ $t('weTestLicense.licenseUnbind') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDevice">{{ '关闭' }}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="license解绑"
      :visible.sync="dialogVisibleLicense"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      width="400px"
    >
      <div class="filter-container">
        <el-form label-width="80px">
          <el-form-item label="解绑数">
            <el-input-number v-model="reduceNum" :min="0" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="handleUnbindLicense()">{{ $t('WeTestButton.confirm') }}</el-button>
        <el-button type="primary" @click="dialogVisibleLicense = false, reduceNum = 0">{{ '关闭' }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import {
  fetchUUIDList,
  switchLock,
  updateLicense,
  createLicense,
  expandLicense,
  selectUUID,
  fetchAdminUnbind,
  fetchAdminDeviceUnbind,
  fetchAdminUnbindes
} from '../../../api/WeTest/license'
import { getTimeZone, getTime, getRemainTimeDay, getTimeStamp } from '../../../utils/timeZone'
import { getCacheDict } from '@/utils/dictCache'

export default {
  directives: { waves },
  components: { Pagination },
  data() {
    // const targetFirmCheck = (rule, value, callback) => {
    //   if (value === '' || value === undefined) {
    //     callback(new Error('请选择授权厂商'))
    //   } else {
    //     callback()
    //   }
    // }
    // const totalCheck = (rule, value, callback) => {
    //   if (value === '' || value === undefined) {
    //     callback(new Error('请输入可绑设备数'))
    //   } else {
    //     callback()
    //   }
    // }
    const startDtCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入开始时间'))
      }
      if (parseInt(value / 1000) > parseInt(this.license.endDt / 1000) && this.license.endDt !== null && this.license.endDt !== '') {
        callback(new Error('开始时间不能晚于截止时间'))
      } else {
        callback()
      }
    }
    const endDtCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入截止时间'))
      }
      if (parseInt(value / 1000) > parseInt(this.license.startDt / 1000)) {
        callback()
      } else {
        callback(new Error('截止时间不能早于开始时间'))
      }
    }
    const WeTestEndDtCheck = (rule, value, callback) => {
      if (this.checkedWeTest && (value === '' || value === undefined || value === null)) {
        callback(new Error('请输入WeTest的截止时间'))
      }
      if (parseInt(value / 1000) < parseInt(this.license.startDt / 1000) && this.checkedWeTest && this.license.startDt !== null && this.license.startDt !== '') {
        callback(new Error('本参数不能早于license开始时间'))
      }
      if (parseInt(value / 1000) > parseInt(this.license.endDt / 1000) && this.checkedWeTest && this.license.endDt !== null && this.license.endDt !== '') {
        callback(new Error('本参数不能晚于license截止时间'))
      } else {
        callback()
      }
    }
    const StEndDtCheck = (rule, value, callback) => {
      if (this.checkedSt && (value === '' || value === undefined || value === null)) {
        callback(new Error('请输入WeTest ST的截止时间'))
      }
      if (parseInt(value / 1000) < parseInt(this.license.startDt / 1000) && this.checkedSt && this.license.startDt !== null && this.license.startDt !== '') {
        callback(new Error('本参数不能早于license开始时间'))
      }
      if (parseInt(value / 1000) > parseInt(this.license.endDt / 1000) && this.checkedSt && this.license.endDt !== null && this.license.endDt !== '') {
        callback(new Error('本参数不能晚于license截止时间'))
      } else {
        callback()
      }
    }
    return {
      // license解绑
      dialogVisibleLicense: false,
      multipleSelection: [],
      row: '',
      reduceNum: 0,
      deviceLicense: 1,
      licenseType: '',
      height: 500,
      span: 24,
      checkedWeTest: false,
      checkedSt: false,
      license: {
        isUnbind: '',
        targetFirm: '',
        total: '',
        customerName: '',
        startDt: '',
        endDt: '',
        WeTestEndDt: '',
        StEndDt: '',
        perm: {
          validity: {
            version: '',
            wetest: '', // wetest license的截止时间的时间戳
            wetestSt: '' // st license的截止时间的时间戳
          }
        }
      },
      /**
         * 大小
         */
      licenseInfo: {
        license: '',
        type: ''
      },
      totalNum: '', // 记录剩余可绑数
      minNum: '', // 记录已绑数
      maxNum: '', // 记录可绑总数
      buttonLoading: false,
      time: [],
      UUIDList: [],
      defaultTime: getTimeZone(this.$store.getters.timezone),
      endTime: '',
      startTime: '',
      licenseId: '',
      day: '',
      licenseTotal: '',
      appType: '',
      dialogVisibleDevice: false,
      dialogVisible: false,
      dialogStatus: '',
      isDisableState: 0,
      lock0: 0,
      lock1: 1,
      // 数据
      tableKey: 0,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        field: 'id',
        isAsc: 0
      },
      typeOptions: [{ label: '试用版', value: 1 }, { label: '正式版', value: 2 }],
      fieldOptions: [{ label: 'ID', key: 'id' }],
      isAscOptions: [{ label: this.$t('common.asc'), key: 1 }, { label: this.$t('common.desc'), key: 0 }],
      targetFirmOptions: [],
      list: [],
      rules: {
        // targetFirm: [{ validator: targetFirmCheck, trigger: 'change' }],
        startDt: [{ validator: startDtCheck, trigger: 'change' }],
        endDt: [{ validator: endDtCheck, trigger: 'change' }],
        WeTestEndDt: [{ validator: WeTestEndDtCheck, trigger: 'change' }],
        StEndDt: [{ validator: StEndDtCheck, trigger: 'change' }]
        // total: [{ validator: totalCheck, trigger: 'blur' }]
      },
      isUnbindOptions: [{ label: this.$t('weTestLicense.unbind'), value: 1 }, { label: this.$t('weTestLicense.unbindX'), value: 0 }]
    }
  },
  created() {
    this.getList()
    this.getOptions()
  },
  methods: {
    async getList() {
      this.listLoading = true
      console.log(this.listQuery)
      fetchUUIDList(this.listQuery).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = data.data.total
        }
        this.listLoading = false
      })
    },
    clearPerm() {
      this.license.isUnbind = ''
      this.license.targetFirm = ''
      this.license.total = ''
      this.licenseInfo.type = ''
      this.checkedWeTest = false
      this.checkedSt = false
      this.license.customerName = ''
      this.license.startDt = ''
      this.license.endDt = ''
      this.license.WeTestEndDt = ''
      this.license.StEndDt = ''
      this.license.perm.validity.version = ''
      this.license.perm.validity.wetest = '' // wetest license的截止时间的时间戳
      this.license.perm.validity.wetestSt = '' // st license的截止时间的时间戳
    },
    getTimes(time) {
      return getTime(time, this.$store.getters.timezone)
    },
    getOptions() {
      const data = getCacheDict('targetFirm(WeTest)')
      for (const i in data) {
        this.targetFirmOptions[i] = {}
        this.targetFirmOptions[i]['label'] = data[i].name
        this.targetFirmOptions[i]['value'] = Number(data[i].code)
      }
    },
    getTableRemainTime(endTime) {
      return getRemainTimeDay(getTimeStamp(new Date()), endTime)
    },
    getTime() {
      this.startTime = this.time[0]
      this.endTime = this.time[1]
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSwitchLock(id, lock) {
      this.listLoading = true
      switchLock(id, lock).then(res => {
        const data = res.data
        if (data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.updateSuccess'),
            type: 'success',
            duration: 2000
          })
        }
        this.getList()
      })
    },
    handleDeviceUnbind(row) {
      fetchAdminDeviceUnbind(row.uniqueId, row.deviceLicense).then(res => {
        const data = res.data
        if (data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.updateSuccess'),
            type: 'success',
            duration: 2000
          })
          const para = {
            license: row.deviceLicense,
            type: row.licenseType === '正式版' ? 2 : 1
          }
          this.handleDeviceLicense(para)
          this.getList()
        }
      })
    },
    handleEditLicense(row) {
      this.license.targetFirm = row.targetFirm
      this.dialogStatus = 'update'
      this.license.total = row.total
      this.license.customerName = row.customerName
      this.license.startDt = row.startDt
      this.license.endDt = row.endDt
      this.checkedWeTest = JSON.parse(row.perm).validity.wetest > 0
      this.checkedSt = JSON.parse(row.perm).validity.wetestSt > 0
      this.license.WeTestEndDt = JSON.parse(row.perm).validity.wetest
      this.license.StEndDt = JSON.parse(row.perm).validity.wetestSt
      this.license.perm.validity.version = JSON.parse(row.perm).validity.version
      this.license.perm.validity.wetest = JSON.parse(row.perm).validity.wetest // wetest license的截止时间的时间戳
      this.license.perm.validity.wetestSt = JSON.parse(row.perm).validity.wetestSt // st license的截止时间的时间戳
      this.licenseInfo.license = row.license
      this.licenseInfo.type = (row.type === 1) ? '试用版' : '正式版'
      this.minNum = row.total - row.remain
      this.maxNum = row.total
      this.totalNum = row.remain
      this.licenseId = row.id
      this.dialogVisible = true
    },
    handleUpdate(formName) {
      if (this.license.total === '') {
        this.$alert('请输入已绑设备数', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      } else {
        this.getVersion()
        console.log(this.license)
        if ((this.license.total - this.minNum) < 0) {
          this.$alert('可绑数量不能低于已绑设备数', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        } else {
          this.buttonLoading = true
          // console.log(this.license.total)
          this.$refs[formName].validate((valid) => {
            if (valid) {
              updateLicense(this.licenseId, this.license.startDt, this.license.endDt, this.license.customerName, this.license.targetFirm, this.license.perm).then(res => {
                const data = res.data
                if (data.code === 1) {
                  // console.log(this.maxNum)
                  // console.log(this.license.total)
                  if ((this.license.total - this.maxNum) !== 0) {
                    expandLicense(this.licenseId, (this.license.total - this.maxNum)).then(res => {
                      const data = res.data
                      if (data.code === 1) {
                        this.$notify({
                          title: this.$t('common.success'),
                          message: this.$t('common.updateSuccess'),
                          type: 'success',
                          duration: 2000
                        })
                      }
                      this.getList()
                    })
                  } else {
                    this.getList()
                    this.$notify({
                      title: this.$t('common.success'),
                      message: this.$t('common.updateSuccess'),
                      type: 'success',
                      duration: 2000
                    })
                  }
                }
              })
              // updatePerm(this.licenseId, this.license.perm.validity)
              this.dialogVisible = false
              this.buttonLoading = false
            } else {
              this.$alert('提交参数有误，请检查', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.buttonLoading = false
                }
              })
            }
          })
        }
      }
    },
    // 表格内部，单解绑
    handleUnbindLicense() {
      if (this.row.total < this.reduceNum) {
        this.$alert('解绑数不可大于license可绑总数', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.buttonLoading = false
          }
        })
      } else {
        this.$confirm('该操作会使license可绑数减少，甚至已绑设备解绑', this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning',
          center: false
        }).then(() => {
          fetchAdminUnbind(this.row.id, this.reduceNum).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
          this.dialogVisibleLicense = false
        }
        )
      }
    },
    // 表格上方，数组解绑
    handleUnbindLicenses() {
      if (this.multipleSelection.length === 0) {
        this.$alert(this.$t('taskPlan.message.minRecord'), this.$t('taskPlan.title.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {}
        })
      } else if (this.multipleSelection.length > 0) {
        const uuids = []
        for (const i in this.multipleSelection) {
          uuids.push(this.multipleSelection[i].uniqueId)
        }
        console.log(this.multipleSelection)
        fetchAdminUnbindes(this.multipleSelection[0].deviceLicense, uuids).then(response => {
          if (response.data.code === 1) {
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.deleteSuccess'),
              type: 'success',
              duration: 2000
            })
          }
          const row = {
            license: this.multipleSelection[0].deviceLicense,
            type: this.multipleSelection.licenseType === '正式版' ? 2 : 1
          }
          this.handleDeviceLicense(row)
        })
      }
    },
    handleCreateLicense() {
      this.dialogVisible = true
      this.dialogStatus = 'create'
      this.clearPerm()
    },
    handleCreate(formName) {
      this.getVersion()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createLicense(this.license).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.createSuccess'),
                type: 'success',
                duration: 2000
              })
              this.buttonLoading = false
              this.dialogVisible = false
              this.getList()
            }
          })
        } else {
          this.$alert('提交参数有误，请检查', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.buttonLoading = false
            }
          })
        }
      })
    },
    handleDeviceLicense(data) {
      this.deviceLicense = data.license
      this.licenseType = data.type === 1 ? '试用版' : '正式版'
      this.dialogVisibleDevice = true
      selectUUID(data.license, data.type).then(response => {
        const data = response.data
        if (data.code === 1) {
          if (data.data.length > 0) {
            for (const i in data.data) {
              data.data[i].deviceLicense = this.deviceLicense
              data.data[i].licenseType = this.licenseType
            }
          }
          this.UUIDList = data.data
        }
      })
    },
    getVersion() {
      let wetest = 0
      let st = 0
      if (this.checkedWeTest) {
        wetest = 1
      }
      if (this.checkedSt) {
        st = 2
      }
      this.license.perm.validity.version = wetest + st
    },
    confirmDevice() {
      this.dialogVisibleDevice = false
      this.getList()
    },
    confirm() {
      this.clearPerm()
      this.$refs.ruleForm.resetFields()
      this.dialogVisible = false
      this.getList()
    },
    closeDialog() {
      this.$refs['ruleForm'].resetFields()
    },
    getTargetFirmNull() {
      if (this.license.targetFirm === '') {
        this.license.targetFirm = -1
      }
    },
    getTargetFirm(data) {
      for (const i in this.targetFirmOptions) {
        if (data === this.targetFirmOptions[i].value) {
          return this.targetFirmOptions[i].label
        }
      }
    },
    //  element提供表格选择
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}

</script>
<style scoped>
  .we-test-perm-admin-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .filter-container {
    padding-bottom: 5px;
  }
  .box-card {
    margin: 5px 0px 5px 5px;
  }
  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
  .el-table>>> .el-table th.gutter{
    display: table-cell!important;
  }
</style>
