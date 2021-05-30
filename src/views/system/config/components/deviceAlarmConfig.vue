<template>

  <div>
    <fleet-single-table
      :show-tool-bar="true"
      :show-page="true"
      :filter-default-data="filterDefaultData"
      :filter-field-list="filterFieldList"
      :filter-type-option-list="listTypeInfo"

      @filter-handle="handleFilter"
    >
      <div slot="main-table" class="full-hw">
        <el-table
          v-col-width-limit
          :data="alarmDataList"
          style="width: 100%"
          border
          height="100%"
        >
          <el-table-column v-if="language === 'zh' || language === 'tw'" prop="alarmContentZh" :label="$t('sysConfig.alarm')" show-overflow-tooltip min-width="180" />
          <el-table-column v-else prop="alarmContent" :label="$t('sysConfig.alarm')" show-overflow-tooltip min-width="180" />
          <el-table-column
            prop="alarmType"
            :label="$t('sysConfig.alarmType')"

            :width="90"
            :min-width="90"
            show-overflow-tooltip
            :formatter="alarmTypeSw"
          />
          <el-table-column
            prop="alarmLevel"
            :label="$t('sysConfig.alarmLevel')"

            :width="90"
            :min-width="90"
            show-overflow-tooltip
            :formatter="alarmLevelSw"
          />
          <el-table-column
            prop="isDisplay"
            :width="80"
            :min-width="80"
            show-overflow-tooltip
            :label="$t('sysConfig.isDisable')"
          >     <template slot-scope="scope">
            <!-- <span>{{ scope.row.value }}</span> -->
            <el-switch
              v-model="scope.row.isDisplay"
              :active-value="true"
              :inactive-value="false"
              @change="chooseIFShow(scope.row)"
            />
          </template>
          </el-table-column>
          <el-table-column
            prop="value"
            :width="90"
            :min-width="90"
            show-overflow-tooltip
            :label="$t('sysConfig.isMess')"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.value }}</span>
              <el-switch
                v-model="scope.row.enableSms"
                :active-value="true"
                :inactive-value="false"
                @change="chooseIfSMS(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            :width="90"
            :min-width="90"
            show-overflow-tooltip
            :label="$t('sysConfig.isMail')"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.value }}</span>
              <el-switch
                v-model="scope.row.enableMail"
                :active-value="true"
                :inactive-value="false"
                @change="chooseIfEm(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div slot="footer-page">
        <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          class="dialog-pagination"
          @pagination="getAlarmList"
        />
      </div>

    </fleet-single-table>
  </div>

</template>

<script>
import Pagination from '@/components/Pagination'
import FleetSingleTable from '@/components/FleetCardTable/single-table'
import { alarmList, ifEm, ifShow, ifSMS } from '@/api/system/sysconfig'
export default {
  name: 'DeviceAlarmConfig',
  components: {
    FleetSingleTable,
    Pagination
  },
  data() {
    return {
      filterDefaultData: {
        page: 1,
        name: null,
        alarmType: null,
        level: null
      },

      filterFieldList: [
        { label: this.$t('sysConfig.alarm'), type: 'input', value: 'name', width: '120px' },
        { label: this.$t('sysConfig.alarmType'), type: 'select', value: 'alarmType', list: 'alarmTypeList', clearable: true, width: '120px' },
        { label: this.$t('sysConfig.alarmLevel'), type: 'select', value: 'level', list: 'alarmLevelList', clearable: true, width: '120px' }
      ],

      listTypeInfo: {
        alarmTypeList: [
          { id: 1, label: 'RCU', value: 1 },
          { id: 2, label: 'ATU', value: 2 }
        ],
        alarmLevelList: [
          { id: 1, label: this.$t('common.clear'), value: '-1' },
          { id: 2, label: this.$t('common.tip'), value: '0' },
          { id: 3, label: this.$t('common.secondary'), value: '1' },
          { id: 4, label: this.$t('common.important'), value: '2' },
          { id: 5, label: this.$t('common.urgent'), value: '3' }
        ]
      },

      total: 0,
      alarmDataList: [],
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        alarmType: null,
        level: null
      }
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  created() {
    this.getAlarmList()
  },
  methods: {
    /** 搜索 */
    handleFilter(row) {
      this.listQuery = { ...this.listQuery, ...row }
      this.getAlarmList()
    },
    getAlarmList() {
      alarmList(this.listQuery).then(res => {
        this.alarmDataList = res.data.data.records
        this.total = res.data.data.total
      })
    },

    /**
     * 设备警告
     */
    chooseIFShow(type) {
      var typeDto = {
        value: type.isDisplay
      }
      ifShow(type.id, typeDto.value).then(res => {
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success'
        })
      })
    },
    chooseIfSMS(type) {
      var typeDto = {
        id: type.id,
        value: type.enableSms
      }
      ifSMS(type.id, typeDto).then(res => {
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success'
        })
      })
    },
    chooseIfEm(type) {
      var typeDto = {
        id: type.id,
        value: type.enableMail
      }
      ifEm(type.id, typeDto).then(res => {
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success'
        })
      })
      // this.getAlarmList()
    },
    // 国际化相关 - 国际化不应该这样写的

    /**
     * 警告转换
     */
    alarmTypeSw(row) {
      var returnData = ''
      switch (row.alarmType) {
        case 1:
          returnData = 'RCU'
          break
        case 2:
          returnData = 'ATU'
          break
      }
      return returnData
    },
    alarmLevelSw(row) {
      var returnData = ''
      switch (row.alarmLevel) {
        case 3:
          returnData = this.$t('common.urgent')
          break
        case -1:
          returnData = this.$t('common.clear')
          break
        case 0:
          returnData = this.$t('common.tip')
          break
        case 1:
          returnData = this.$t('common.secondary')
          break
        case 2:
          returnData = this.$t('common.important')
          break
      }
      return returnData
    }
  }
}
</script>

<style scoped>
>>>.tool-bar {
  height: 0 !important;
}
</style>
