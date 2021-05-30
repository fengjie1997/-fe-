<template>

  <div>
    <fleet-single-table
      :show-tool-bar="true"
      :show-page="false"
    >
      <div slot="filter">

        <p style="font-size: 13px">{{ $t('sysConfig.dataConfig') }}</p>

      </div>

      <div slot="main-table" class="full-hw">

        <el-table
          v-col-width-limit
          :data="getDataList"
          style="width: 100%;"
          border
          height="100%"
        >
          <el-table-column type="index" :label="$t('common.num')" show-overflow-tooltip width="70" min-width="70" fixed="left" :resizable="false" />
          <el-table-column v-if="language === 'zh' || language === 'tw'" prop="dataKeepName" :label="$t('sysConfig.dataModel')" show-overflow-tooltip min-width="180" />
          <el-table-column v-else prop="dataKeepNameEn" :label="$t('sysConfig.dataModel')" show-overflow-tooltip min-width="180" />
          <el-table-column prop="keepCount" :label="$t('sysConfig.value')" show-overflow-tooltip width="80" min-width="80" />
          <el-table-column prop="keepType" :label="$t('sysConfig.value')" :formatter="dateSwitchHandle" show-overflow-tooltip width="80" min-width="80" />
          <el-table-column :label="$t('sysConfig.takeUp')" show-overflow-tooltip width="80" min-width="80">
            <template slot-scope="data">
              <!-- <span>{{ scope.row.value }}</span> -->
              <el-switch
                v-model="data.row.activeValue"
                @change="updateChange(data.row)"
              />
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.actions')" fixed="right" width="70" min-width="70" :resizable="false">
            <template slot-scope="scope">
              <el-tooltip :content="$t('common.edit')">
                <el-button icon="el-icon-edit" @click="dataUpdateAndSave(scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </fleet-single-table>

    <el-dialog :title="$t('sysConfig.dataSaveConf')" :visible.sync="dialogFormVisible" width="350px">

      <el-form label-position="left" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="$t('sysConfig.value')">
          <el-input v-model="dataUpdataDto.keepCount" style="width: 200px" />
        </el-form-item>
        <el-form-item :label="$t('sysConfig.weekUpdate')">
          <el-select v-model="dataUpdataDto.keepType" style="width: 200px">
            <el-option :label="$t('common.year')" value="0" />
            <el-option :label="$t('common.month')" value="1" />
            <el-option :label="$t('common.week')" value="2" />
            <el-option :label="$t('common.day')" value="3" />
          </el-select>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="getDataUpdate">{{ $t('common.save') }}</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import FleetSingleTable from '@/components/FleetCardTable/single-table'
import { dataConfig, dataUpdate } from '@/api/system/sysconfig'
export default {
  name: 'DataStoreConfig',
  components: {
    FleetSingleTable
  },
  data() {
    return {
      getDataList: [],
      dataUpdataDto: { },
      /**
       * 数据保存配置
       */
      dialogFormVisible: false
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      dataConfig().then(res => {
        this.getDataList = res.data.data
      })
    },
    /**
     * 数据保存
     */
    updateChange(req) {
      this.dataUpdataDto = req
      dataUpdate(this.dataUpdataDto).then(res => {
        if (res.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.actionSuccess'),
            type: 'success'
          })
        }
      })
    },

    /**
     * 保存文件配置
     */
    dateSwitchHandle(row) {
      var returnData = ''
      switch (row.keepType) {
        case '0':
          returnData = this.$t('common.year')
          break
        case '1':
          returnData = this.$t('common.month')
          break
        case '2':
          returnData = this.$t('common.week')
          break
        case '3':
          returnData = this.$t('common.day')
          break
      }
      return returnData
    },
    /**
     * 更新数据或保存
     */
    dataUpdateAndSave(req) {
      this.dataUpdataDto = req
      this.dialogFormVisible = true
    },
    getDataUpdate() {
      this.dialogFormVisible = false
      dataUpdate(this.dataUpdataDto).then(() => {
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>
>>>.tool-bar {
  height: 0 !important;
}
</style>
