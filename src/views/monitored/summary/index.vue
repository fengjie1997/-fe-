<template>
  <div class="full-hw">
    <fleet-single-table
      :show-tool-bar="false"
      :show-filter="false"
    >
      <div slot="main-table" class="full-hw">
        <el-table
          v-col-width-limit
          v-loading="listLoading"
          :data="list"
          border
          height="100%"
        >
          <template v-for="(item,index) in tableHead">
            <el-table-column v-if="item.property !== 'id'" :key="index" :prop="item.property" :label="item.label" :width="item.width" :min-width="item.minWidth" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- 时间 -->
                <span v-if="item.property === 'taskName'">{{ getTaskName(scope.row[item.property]) }}</span>
                <span v-else-if="item.property === 'groupId'">{{ getTableDeviceGroupId(scope.row[item.property]) }}</span>
                <span v-else-if="scope.row[item.property] === undefined">{{ $t('device.noUpdate') }}</span>
                <span v-else-if="item.time && scope.row[item.property] !== undefined">{{ getTime(scope.row[item.property]) }}</span>
                <!-- 按钮 -->
                <span v-else>{{ scope.row[item.property] }}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div slot="footer-page">
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="getList" />
      </div>
    </fleet-single-table>
  </div>
</template>

<script>
import { fetchSummaryList } from '../../../api/monitored/monitored'
import waves from '../../../directive/waves/waves'
import Pagination from '@/components/Pagination'
import FleetSingleTable from '@/components/FleetCardTable/single-table'
import { mapGetters } from 'vuex'
export default {
  name: 'Summary',
  components: { Pagination, FleetSingleTable },
  directives: { waves },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      listLoading: false,
      fieldOptions: [{ label: this.$t('device.deviceID'), value: 'id' }],
      isAscOptions: [{ label: this.$t('common.asc'), key: 1 }, { label: this.$t('common.desc'), value: 0 }],
      listQuery: {
        limit: 20,
        page: 1,
        filed: 'id',
        isAsc: 0,
        groupIds: []
      },
      total: 0,
      list: [],
      groupIds: [],
      groupIdName: '',
      tableHead: [{
        property: 'groupId', label: this.$t('device.deviceGroup'), minWidth: 150
      }, {
        property: 'deviceCount', label: this.$t('device.devices'), width: 150, minWidth: 150
      }, {
        property: 'totalCount', label: this.$t('device.onlineDevices'), width: 170, minWidth: 170
      }, {
        property: '0', label: this.$t('device.rcu'), width: 150, minWidth: 150
      }, {
        property: '1', label: this.$t('device.atu'), width: 150, minWidth: 150
      }, {
        property: '3', label: this.$t('device.scout'), width: 150, minWidth: 150
      }, {
        property: '2', label: this.$t('device.walkTour'), width: 170, minWidth: 170
      }, {
        property: '9', label: this.$t('device.rcuLight'), width: 170, minWidth: 170
      }]
    }
  },
  computed: {
    ...mapGetters({
      flattenGroups: 'flattenGroups'
    })
  },
  created() {
    this.getList()
    console.log(this.model)
  },
  methods: {
    async getList() {
      this.listLoading = true
      // setTimeout(() => {
      fetchSummaryList(this.listQuery.limit, this.listQuery.page, this.model.groupIds).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = data.data.total
        }
        this.listLoading = false
      })
      // }, 400)
    },
    // getTableDeviceGroupId(id) {
    //   this.$nextTick(() => {
    //     for (let i = 0; i < this.model.groups.length; i++) {
    //       if (id === this.model.groups[i].value) {
    //         return this.model.groups[i].label
    //       }
    //     }
    //   })
    // },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 所属分组转换
    getTableDeviceGroupId(groupId) {
      const group = this.flattenGroups[groupId]
      if (!group) return groupId
      return group.name
    }
  }
}
</script>

<style scoped>
</style>
