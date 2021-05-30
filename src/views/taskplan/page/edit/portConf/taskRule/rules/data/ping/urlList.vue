<template>
  <div class="task-form-box">
    <div class="filter-container">
      <el-input v-model="url" class="filter-item" style="width:90%" />
      <el-button type="primary" class="filter-item" size="mini" @click="handleAdd">add</el-button>
    </div>
    <el-table
      ref="timeTable"
      :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column align="center" type="index" width="50" label="序号" fixed="left" />
      <el-table-column prop="url" label="URL" align="left" />
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
      tableData: []
    }
  },
  watch: {
    tableData(newData) {
      this.$emit('update', newData)
    },
    list(newList) {
      this.tableData = JSON.parse(JSON.stringify(newList.pingAddress))
    }
  },
  created() {
    this.tableData = this.list.pingAddress
  },
  methods: {
    handleAdd() {
      if (this.url.length <= 0) {
        return false
      }
      var param = {
        url: this.url
      }
      this.tableData.push(param)
    },
    handleDel(index) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>
