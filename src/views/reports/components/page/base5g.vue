<template>
  <div v-loading="loading" class="app-container" :class="{'physicsSplit': scenes.length < 2}">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="18" style="max-width: 700px">
        <el-input v-model="reportForm.name" :placeholder="$t('reportList.name')" class="filter-item">
          <template slot="prepend">{{ $t('reportList.name') }}</template>
        </el-input>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane v-for="(item,idx) in scenes" :key="idx" :label="item.name" :name="item.itemName">
        <ReportForm ref="ReportForm" :scene="item" />
      </el-tab-pane>
    </el-tabs>
    <div style="padding-top:10px">
      <el-button type="primary" size="medium" @click="onSubmitReportTask()">{{ $t('report.postReport') }}</el-button>
    </div>
  </div>
</template>

<script>
import js from './base5g.js'
export default {
  ...js
}
</script>
<style scoped>
  .app-container {
    height: calc(100vh - 150px);
    overflow-y: auto;
    padding: 15px;
  }
  .input-name {
    width:30%;
    padding: 10px 10px 10px 10px;
  }
  .report-form-top{
    padding:15px 0;
  }

  >>>.el-collapse-item__header{
    font-size: 14px !important;
  }

   .physicsSplit >>> .el-tabs__header  {
    display: none;
  }

</style>
