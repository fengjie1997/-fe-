<template>
  <div class="task-form-box">
    <div class="filter-container">
      <el-col :span="6">
        <el-input v-model="param.serverIp" class="filter-item" style="width:90%" />
      </el-col>
      <el-col :span="4">
        <span>port</span>
        <el-input-number v-model="param.serverPort" :min="0" class="filter-item" />
      </el-col>
      <el-col :span="2">
        <el-button type="primary" class="filter-item" size="mini" icon="el-icon-plus" @click="handleAdd">{{ $t('common.add') }}</el-button>
      </el-col>
    </div>
    <el-table
      ref="timeTable"
      :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column align="center" type="index" width="50" label="序号" fixed="left" />
      <el-table-column prop="serverIp" label="serverIp" align="left" />
      <el-table-column prop="serverPort" label="serverPort" align="left" />
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDel(scope.$index)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'UrlList',
  components: { },
  props: {
    list: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      url: '',
      param: {
        isCheck: true,
        serverIp: '',
        serverPort: ''
      },
      tableData: []
    }
  },
  watch: {
    tableData(newData) {
      this.$emit('update', newData)
    },
    list(newList) {
      this.tableData = JSON.parse(JSON.stringify(newList.servers))
    }
  },
  created() {
    this.tableData = this.list.servers
  },
  methods: {
    handleAdd() {
      this.tableData.push(this.param)
    },
    handleDel(index) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>
