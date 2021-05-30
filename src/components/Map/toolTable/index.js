/**
 * 表格工具/search table
 * @param [] data 渲染数据
 * @return func setView
 */
// import { fetchStationList } from '@/api/data/baseStation.js'
export default {
  name: 'toolTable',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    param: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: { },
  data() {
    return {
      // data: [],
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
      queryParams: {
        pageSize: 7,
        pageIndex: 1
      },
      tables: []
    }
  },
  created() {
    this.tables = this.data
  },
  watch: {
    param(param) {
      console.log(param)
    },
    data(newData) {
      this.tables = newData
    },
    keyword(newKey) {
      const search = newKey
      if (search) {
        return this.tableData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.tableData
    }
  },
  computed: {
    tableData() {
      return this.tables.slice((this.queryParams.pageIndex - 1) * this.queryParams.pageSize, this.queryParams.pageIndex * this.queryParams.pageSize)
    }
  },
  methods: {
    handleFilter() {},
    handleSetView(row) {
      var param = {
        lat: row.latitude,
        lng: row.longitude
      }
      this.$emit('setCenter', param)
    },
    renderHeader(h, { column, $index }, index) {
      return (
        <span>
              ID
          <el-popover placement='bottom' width='200' height='200' trigger='click' v-model={this.visible}>
            <span slot='reference'>
              <i class='el-icon-search' style={this.search ? { 'color': 'red' } : { 'color': 'blue' }}></i>
            </span>
            <el-input size='small' v-model={this.search} placeholder='请输入内容'></el-input>
            <div class='el-table-filter__bottom'>
              <button class={this.search ? '' : 'is-disabled'}>筛选</button>
              <button on-click={this.clearSearch}>重置</button>
            </div>
          </el-popover>
        </span>
      )
    },
    clearSearch() {
      this.search = ''
    }
  }
}
