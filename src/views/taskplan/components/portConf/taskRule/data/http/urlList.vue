<template>
  <div class="task-form-box">
    <div class="filter-container">
      <el-input v-model="url" style="margin-right: 10px;" />
      <el-tooltip :content="$t('common.add')">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd" />
      </el-tooltip>
    </div>
    <el-table
      ref="timeTable"
      v-col-width-limit
      :data="tableData"
      style="width: 90%;"
      border
    >
      <el-table-column type="index" width="60" :label="$t('common.num')" fixed show-overflow-tooltip />
      <el-table-column prop="url" label="URL" min-width="200" show-overflow-tooltip />
      <el-table-column :label="$t('common.actions')" width="80">
        <template slot-scope="scope">
          <el-tooltip :content="$t('common.delete')">
            <el-button plain type="danger" icon="el-icon-delete" @click="handleDel(scope.$index)" />
          </el-tooltip>
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
      console.log(newList)
      this.tableData = JSON.parse(JSON.stringify(newList.urlInfos))
    }
  },
  created() {
    this.tableData = this.list.urlInfos
  },
  methods: {
    handleAdd() {
      if (this.url.length <= 0) {
        return false
      }
      var param = {
        url: this.url,
        isCheck: true
      }
      this.tableData.push(param)
    },
    handleDel(index) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>
<style scoped>
  .filter-container {
    display: flex;
    flex-direction: row;
  }
  .task-form-box >>> .el-table .el-button, .el-table .el-button--mini {
    padding: 5px;
  }
</style>
