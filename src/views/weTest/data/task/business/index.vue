<template>
  <el-tabs type="border-card" class="box-card" @tab-click="handleTabClick">
    <el-tab-pane
      v-for="item in tabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    />
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      max-height="500px"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="序号"
        width="50px"
      >
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <template v-for="(item,index) in tableHead">
        <el-table-column v-if="item.property !== 'id'" :key="index" style="width: auto" align="center" :prop="item.property" :label="item.label">
          <template slot-scope="scope">
            <!-- 时间 -->
            <span v-if="item.property === 'start_time'">{{ getTimes(scope.row[item.property]) }}</span>
            <span v-else-if="item.property === 'call_connect_time'">{{ getTimes(scope.row[item.property], true) }}</span>
            <span v-else-if="item.property === 'call_end_time'">{{ getTimes(scope.row[item.property], true) }}</span>
            <span v-else-if="item.property === 'call_start_time'">{{ getTimes(scope.row[item.property], true) }}</span>
            <span v-else-if="item.property === 'event_time'">{{ getTimes(scope.row[item.property]) }}</span>
            <span v-else-if="item.property === 'call_ring_time'">{{ getTimes(scope.row[item.property], true) }}</span>
            <span v-else>{{ scope.row[item.property] }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </el-tabs>
</template>

<script>
// import { getBusinessTypeName } from '../../../../utils/WeTestBusinessList'
import { removeleft, removeright, remove } from '../../../../../utils/WeTestTable'
import { getWeTestDateTableHead } from '../../../../../utils/weTestTableHead'
import { getTime } from '../../../../../utils/timeZone'

export default {
  name: 'Index',
  props: {
    model: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      listLoading: false,
      tabs: [],
      temp: [],
      baseValues: [],
      gpsValues: [],
      networkValues: [],
      table: [],
      tableHead: [],
      mod: [],
      list: []
    }
  },
  created() {
    this.getTabs()
  },
  methods: {
    getTabs() {
      for (const i in this.model) {
        this.temp.push(this.model[i])
      }
      const arr = []
      for (let i = 0; i < this.model.length; i++) {
        if (arr.indexOf(this.model[i].task_name) === -1) {
          arr.push(this.model[i].task_name)
        }
      }
      for (let i = 0; i < arr.length; i++) {
        this.tabs[i] = {}
        this.tabs[i].title = arr[i]
        this.tabs[i].name = arr[i]
      }

      const arr1 = []
      let temp = 0
      for (let i = 0; i < this.temp.length; i++) {
        if (this.temp[i].task_name === this.tabs[0].name) {
          arr1[temp] = {}
          arr1[temp] = this.temp[i]
          temp++
        }
      }
      this.getJson(arr1)
      this.getTableHead(this.list[0].task_id)
      // if (this.tabs.length > 0) {
      //   const arr = []
      //   let temp = 0
      //   for (let i = 0; i < this.model.length; i++) {
      //     if (this.model[i].task === this.tabs[0].name) {
      //       arr[temp] = {}
      //       arr[temp] = this.model[i]
      //       temp++
      //     }
      //   }
      //   this.tableHead = this.getTable(arr[0])
      //   this.getJson(arr)
      //   this.list = this.mod
      // }
    },
    getTableHead(data) {
      this.tableHead = []
      const tableHead = getWeTestDateTableHead(data)
      for (const i in tableHead) {
        this.tableHead.push(JSON.parse(JSON.stringify(tableHead[i])))
      }
      // if (this.tableHead.length !== (tableHead.length - 4)) {
      //   this.tableHead.splice(0, 4)
      // }
      this.tableHead.splice(0, 4)
      // console.log(this.tableHead)
    },
    getJson(json) {
      this.list = []
      let baseValues = {}
      let networkValues = {}
      const str = []
      for (let i = 0; i < json.length; i++) {
        baseValues = json[i]['values']
        networkValues = json[i]['network_values']
        // json[i]['values'] = ''
        // json[i]['networkValues'] = ''
        // json[i]['gpsValues'] = ''
        str[i] = removeright(JSON.stringify(json[i])) + ',' + remove(JSON.stringify(baseValues)) + ',' + removeleft(JSON.stringify(networkValues))
        this.list[i] = {}
        this.list[i] = JSON.parse(str[i])
      }
    },
    getTimes(time, bool) {
      time = Number(time)
      return getTime(time, this.$store.getters.timezone, bool)
    },
    // getTable(json) {
    //   this.tableHead = []
    //   for (let i = 0; i < Object.keys(json).length; i++) {
    //     this.tableHead[i] = {}
    //     this.tableHead[i]['property'] = Object.keys(json)[i].toString()
    //     const label = 'weTestResult.' + Object.keys(json)[i].toString()
    //     this.tableHead[i]['label'] = this.$t(label.toString())
    //   }
    //   this.tableHead.splice(1, 1)
    //   this.tableHead.splice(5, 2)
    //   // console.log(this.tableHead)
    // },
    handleTabClick(tab) {
      console.log('1')
      const arr = []
      let temp = 0
      for (let i = 0; i < this.temp.length; i++) {
        if (this.temp[i].task_name === tab.name) {
          arr[temp] = {}
          arr[temp] = this.temp[i]
          temp++
        }
      }
      this.getJson(arr)
      console.log(this.list)
      this.getTableHead(this.list[0].task_id)
    }
  }
}
</script>

<style scoped>

</style>
