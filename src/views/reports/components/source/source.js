import { getCacheDict } from '@/utils/dictCache.js'
import { fetchDeviceList } from '@/api/report/source'
import { uuid } from '@/utils/uuid'
export default {
  name: 'InlineEditTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      options: [{
        label: 'ces',
        value: 1
      }],
      /**
       * 复选框
       */
      testSummaryOptions: [],
      deviceTypeOptions: [],
      devicePortOptions: [],
      operatorsOptions: [],
      dataNetTypeOptions: [],
      value: undefined,
      /**
       * 项目
       */
      props: {
        multiple: true,
        value: 'id',
        label: 'name'
      },
      groupPro: [],
      tmpDeviceOptions: {

      }
    }
  },
  created() {
    this.optionsRedisCache()
    this.getList()
    this.getGroupList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      if (this.list.length < 1) {
        this.addRow()
      }

      this.listLoading = false
    },
    /**
     * 复选框取缓存
     */
    async optionsRedisCache() {
      this.testSummaryOptions = getCacheDict('testSummary')
      this.deviceTypeOptions = getCacheDict('deviceType')
      this.devicePortOptions = getCacheDict('devicePort')
      this.operatorsOptions = getCacheDict('operators')
      this.dataNetTypeOptions = getCacheDict('TNetworkType')

      console.log(this.operatorsOptions)
    },
    async getGroupList() {
      this.listLoading = true

      this.groupPro = this.$store.getters.groupTree
      this.listLoading = false
    },
    async fetchDeviceListByGroupIds(argv, groupIds, row) {
      if (argv[0] === false || row.isReq === false) return
      row.isReq = false
      if (!Array.isArray(groupIds) || groupIds.length < 1) {
        this.tmpDeviceOptions[row.uuid] = []
        this.$forceUpdate()
        return
      }
      const groups = new Set()
      groupIds.forEach(el => {
        el.forEach(elI => {
          groups.add(elI)
        })
      })
      fetchDeviceList(groups).then(res => {
        this.tmpDeviceOptions[row.uuid] = res.data.data
        this.$forceUpdate()
      })
    },
    /**
     * 删除行
     */
    delRow(index) {
      const uuid = this.list[index].uuid
      this.list.splice(index, 1)
      this.tmpDeviceOptions[uuid] = null
    },
    addRow() {
      const row = {
        groupIds: [],
        deviceType: [],
        deviceIds: [],
        port: [],
        operator: '',
        dataNetTypes: [],
        testTime: undefined,
        isAbnormal: undefined,
        search: '',
        uuid: uuid()
      }
      this.list.push(row)
      this.tmpDeviceOptions[row.uuid] = []
    },
    notifyFather() {
      this.list.forEach(element => {
        if (element.testTime instanceof Array && element.testTime.length > 1) {
          element['startTime'] = element.testTime[0]
          element['endTime'] = element.testTime[1]
        }
      })
      this.$emit('sources', this.list)
    },

    clearRow() {
      this.list = []
      this.tmpDeviceOptions = {}
    }
  }
}
