import { fetchStationList } from '@/api/data/baseStation.js'
export default {
  name: 'CellLookup',
  components: { },
  data() {
    return {
      data: [],
      keyword: null,
      filterValue: 'id',
      filterType: [
        {
          label: '按ID搜索',
          value: 'id'
        },
        {
          label: '按小区名称搜素',
          value: 'cellName'
        }
      ],
      stationFilter: {
        cellName: '',
        networkType: '',
        stationType: '',
        deviceType: ''
      },
      params: {
        name: '',
        limit: 20,
        page: 1,
        field: '',
        isAsc: '',
        orderBy: '',
        networkType: ''
      }
    }
  },
  created() {
    var g = this.getGlobal
    console.log(g)
    var params = Object.assign({}, this.params)
    params.networkType = 'LTEFDD'
    params.limit = '15'
    params.city = '南京市'
    params.province = '江苏省'
    fetchStationList(params).then(res => {
      // this.total = Number(res.data.data.total)
      console.log(res.data)
      this.data = res.data.data.records
    })
  },
  methods: {
    handleFilter() {},
    getGlobal() {
      if (typeof self !== 'undefined') { return self }
      if (typeof window !== 'undefined') { return window }
      if (typeof global !== 'undefined') { return global }
      throw new Error('unable to locate global object')
    }
  }
}
