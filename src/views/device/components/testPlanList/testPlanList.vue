<template>
  <div>
    <div class="filter-container">
      <div style="margin-top: 15px;">
        <div style="float:left">
          <el-button type="primary" icon="el-icon-plus" @click="handleTestCreate()">{{ $t('common.create') }}</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="handleTestDelete()">{{ $t('common.delete') }}</el-button>
          <el-button type="primary" icon="el-icon-upload">{{ $t('common.import') }}</el-button>
          <el-button type="primary" icon="el-icon-refresh">{{ $t('common.create') }}</el-button>
        </div>
        <div style="float:right">
          <div>
            <el-input v-model="listQuery.name" :placeholder="this.$t('common.inputTip')" class="input-with-select" style="width:400px">
              <el-select slot="prepend" v-model="nowTableHead" :placeholder="this.$t('common.pleaseSelect')" style="width:150px" @change="handleSwitchList()">
                <el-option :label="$t('testPlan.activeList')" value="active" />
                <el-option :label="$t('testPlan.expiredList')" value="expired" />
                <el-option :label="$t('testPlan.historyList')" value="history" />
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="listQuery.page = 1;getList()" />
            </el-input>
          </div>
        </div>
        <div style="clear:both" />
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      height="400"
    >
      <el-table-column type="selection" align="center" width="50" />
      <template v-for="(item,index) in tableHead[nowTableHead]">
        <el-table-column v-if="item.property != 'id'" :key="index" align="center" :prop="item.property" :label="item.label">
          <template slot-scope="scope">
            <!-- 时间 -->
            <span v-if="item.time && scope.row[item.property] !== undefined">{{ scope.row[item.property] | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            <!-- 按钮 -->
            <span v-else-if="item.switch">
              <el-switch
                v-model="scope.row[item.property]"
                @change="handleSwitch(scope.row[item.property],scope.row.id)"
              />
            </span>
            <span v-else>{{ scope.row[item.property] }}</span>
          </template>
        </el-table-column>
      </template>
      <!-- 操作 -->
      <el-table-column :label="$t('common.actions')" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleTest()">{{ $t('common.edit') }}</el-button>
          <el-button size="mini" @click="handleExportXml(scope.row)">{{ $t('common.export') }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Page -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="getList" />

    <!-- 导出配置，生成TXT -->
    <div>
      <el-dialog
        :title="$t('taskPlan.common.exportXml')"
        :visible.sync="exportDialogVisible"
        width="30%"
        center
        :modal-append-to-body="false"
      >
        <el-input
          v-model="configTextArea"
          type="textarea"
          :rows="10"
          :readonly="true"
          placeholder="config"
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="exportDialogVisible = false">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleExportZip();exportDialogVisible = false">{{ $t('testPlan.genTxtFile') }}</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 抽屉，编辑与新建 【重绘问题】 -->
    <div>

      <el-drawer
        :visible.sync="drawer"
        direction="ltr"
        :wrapper-closable="false"
        size="80%"
      >
        <div slot="title" class="drawer-title">
          <img :src="require('@/assets/logo/logo.png')">
          <span>
            {{ $t('testPlan.testPlan') +'：'+ formActName }}
          </span>
        </div>
        <!-- :before-close="handleClose" -->
        <TestPlanEditView />
      </el-drawer>
    </div>
  </div>
</template>

<script>
import js from './testPlanList.js'
export default {
  ...js
}
</script>
<style scoped>
  .dialog-pagination {
    margin-top:5px;
    padding:10px 16px;
  }
  .drawer-title{
    display: -webkit-flex;
    display: flex;
    justify-content: flex-start;
  }
  .drawer-title img{
    width: 38px;
  }
  .drawer-title span{
    font-size: 1.5em;
    margin: auto 10px;
  }
</style>
