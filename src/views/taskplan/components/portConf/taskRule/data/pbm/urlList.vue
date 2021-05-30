<template>
  <div class="task-form-box">
    <div class="filter-container">
      <el-col :span="6">
        <el-tooltip class="item" content="URL" placement="top-start">
          <el-input v-model="param.serverIp" placeholder="URL" class="filter-item" style="width:90%" />
        </el-tooltip>
      </el-col>
      <el-col :span="6">

        <el-tooltip class="item" :content="$t('uploadFileList.port')" placement="top-start">
          <el-input-number v-model="param.serverPort" :placeholder="$t('uploadFileList.port')" :min="0" class="filter-item" />
        </el-tooltip>
        <!--        <span> <el-input-number v-model="param.serverPort" :placeholder="$t('uploadFileList.port')" :min="0" class="filter-item" /></span>-->
        <!--      </el-col>-->
      </el-col>
      <el-col :span="2">
        <el-tooltip :content="$t('common.add')">
          <el-button type="primary" icon="el-icon-plus" class="filter-item" @click="handleAdd" />
        </el-tooltip>
      </el-col>
    </div>
    <el-table
      ref="timeTable"
      v-col-width-limit
      :data="tableData"
      style="width: 90%;"
      border
    >
      <el-table-column type="index" width="60" :label="$t('common.num')" fixed show-overflow-tooltip />
      <el-table-column prop="serverIp" label="serverIp" show-overflow-tooltip min-width="200" />
      <el-table-column prop="serverPort" label="serverPort" show-overflow-tooltip width="100" />
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
<style scoped>
  .task-form-box >>> .el-table .el-button, .el-table .el-button--mini {
    padding: 5px;
  }
</style>
