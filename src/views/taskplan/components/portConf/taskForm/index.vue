<template>
  <div>
    <div style="height: 100%; width: 100%; overflow: auto;">
      <div style="width: 1000px; margin-left: 50px;">
        <form-create ref="refs" v-model="modelForm" :rule="rules" :option="options" class="dl-task-form" @template-button-click="allClick" @on-submit="onSubmit" @mounted="onMounted" />
      </div>
    </div>
    <!--    网络设置模板对话框(拨号连接模板对话框)-->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisibleDevice"
      append-to-body
      width="70%"
    >
      <el-card class="box-card">
        <div slot="header">
          <span>
            <el-tooltip :content="$t('common.add')">
              <el-button type="primary" icon="el-icon-plus" @click="handleTemplateAdd" />
            </el-tooltip>
            <el-tooltip :content="$t('common.save')">
              <el-button type="primary" icon="el-icon-download" @click="handleTemplateSave" />
            </el-tooltip>
            <el-tooltip :content="$t('common.delete')">
              <el-button type="danger" icon="el-icon-delete" @click="handleTemplateDelete" />
            </el-tooltip>
            <!--            <el-dropdown :hide-on-click="false">-->
            <!--              <i class="el-icon-platform-eleme" />-->
            <!--              <el-dropdown-menu slot="dropdown">-->
            <!--                <el-scrollbar style="height: 60vh">-->
            <!--                  <el-checkbox-group v-model="check">-->
            <!--                    <el-dropdown-item v-for="(item,index) in checkList" :key="index"><el-checkbox :key="item" :label="item" />-->
            <!--                    </el-dropdown-item>-->
            <!--                  </el-checkbox-group>-->
            <!--                </el-scrollbar>-->
            <!--              </el-dropdown-menu>-->
            <!--            </el-dropdown>-->
          </span>
        </div>
        <div class="filter-container">
          <el-table
            ref="multipleTable"
            :key="tableKey"
            v-col-width-limit
            :data="list"
            border
            fit
            height="400px"
            highlight-current-row
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="40" />
            <!--模板名称-->
            <el-table-column :label="$t('taskPlan.label.templateName')" min-width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" />
              </template>
            </el-table-column>
            <!--RAS号码-->
            <el-table-column v-if="state" :label="$t('taskPlan.label.rasNumber')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-input v-model="scope.row.rasNumber" />
              </template>
            </el-table-column>
            <!--APN-->
            <el-table-column v-if="state" label="APN" width="160" min-width="160">
              <template slot-scope="scope">
                <el-input v-model="scope.row.apn" />
              </template>
            </el-table-column>
            <!--用户名 公用-->
            <el-table-column :label="$t('device.user')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-input v-model="scope.row.username" />
              </template>
            </el-table-column>
            <!--密码 公用-->
            <el-table-column :label="$t('device.password')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-input v-model="scope.row.password" show-password />
              </template>
            </el-table-column>
            <!--单次拨号超时-->
            <el-table-column v-if="state" :label="$t('taskPlan.form.singleTimeout')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-input v-model.number="scope.row.singleTimeout" />
              </template>
            </el-table-column>
            <!--重拨次数-->
            <el-table-column v-if="state" :label="$t('taskPlan.form.totalTimeout')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-input v-model.number="scope.row.totalTimeout" show-password />
              </template>
            </el-table-column>
            <!--拨号断开策略-->
            <el-table-column v-if="state" :label="$t('taskPlan.form.connectionDisconnectStrategy')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-select v-model="scope.row.disconnectStrategy">
                  <el-option v-for="item in disconnectStrategyOptions" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
              </template>
            </el-table-column>
            <!--上行请求速率-->
            <el-table-column v-if="state" :label="$t('taskPlan.label.uplinkRequestRate')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-select v-model="scope.row.ulueRate">
                  <el-option v-for="item in ulUeRateOptions" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
              </template>
            </el-table-column>
            <!--下行请求速率-->
            <el-table-column v-if="state" :label="$t('taskPlan.label.downlinkRequestRate')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-select v-model="scope.row.dlueRate">
                  <el-option v-for="item in dlUeRateOptions" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
              </template>
            </el-table-column>
            <!--IP类型-->
            <el-table-column v-if="state" :label="$t('taskPlan.label.IPType')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-select v-model="scope.row.ipType">
                  <el-option v-for="item in ipTypeOptions" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
              </template>
            </el-table-column>
            <!--wlan-->
            <!--登录方式-->
            <el-table-column v-if="!state" :label="$t('taskPlan.label.loginType')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-select v-model="scope.row.loginType">
                  <el-option v-for="item in loginTypeOptions" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
              </template>
            </el-table-column>
            <!--AP-->
            <el-table-column v-if="!state" label="AP" width="160" min-width="160">
              <template slot-scope="scope">
                <el-input v-model="scope.row.ap" />
              </template>
            </el-table-column>
            <!--运营商-->
            <el-table-column v-if="!state" :label="$t('analyze.label.operator')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-select v-model="scope.row.operator">
                  <el-option v-for="item in operatorOptions" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
              </template>
            </el-table-column>
            <!--加密方式-->
            <el-table-column v-if="!state" :label="$t('taskPlan.label.encryptType')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-select v-model="scope.row.encryptType">
                  <el-option v-for="item in encryptTypeOptions" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.actions')"
              width="80"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-tooltip :content="$t('device.template')">
                  <el-button icon="fe-icon-template" @click="handleTemplate(scope.row)" />
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="click" />
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDevice">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!--    服务设置模板对话框-->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisibleHost"
      append-to-body
      width="70%"
    >
      <el-card class="box-card">
        <div slot="header">
          <span>
            <el-tooltip :content="$t('common.add')">
              <el-button type="primary" icon="el-icon-plus" @click="handleHostTemplateAdd" />
            </el-tooltip>
            <el-tooltip :content="$t('common.save')">
              <el-button type="primary" icon="el-icon-download" @click="handleHostTemplateSave" />
            </el-tooltip>
            <el-tooltip :content="$t('common.delete')">
              <el-button type="danger" icon="el-icon-delete" @click="handleHostTemplateDelete" />
            </el-tooltip>
          </span>
        </div>
        <div class="filter-container">
          <el-table
            ref="multipleTable"
            :key="tableKey"
            :data="list"
            border
            fit
            height="400px"
            highlight-current-row
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="40" />
            <!--模板名称-->
            <el-table-column :label="$t('taskPlan.label.templateName')" min-width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" />
              </template>
            </el-table-column>
            <!--IP地址-->
            <el-table-column v-if="state" :label="$t('taskPlan.mftpDown.ip')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-input v-model="scope.row.address" />
              </template>
            </el-table-column>
            <!--端口-->
            <el-table-column v-if="state" :label="$t('reportFile.port')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.port" />
              </template>
            </el-table-column>
            <!--用户名-->
            <el-table-column :label="$t('device.user')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-input v-model="scope.row.username" />
              </template>
            </el-table-column>
            <!--密码-->
            <el-table-column :label="$t('device.password')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-input v-model="scope.row.password" show-password />
              </template>
            </el-table-column>
            <!--匿名登录-->
            <el-table-column v-if="state" :label="$t('taskPlan.mftpDown.isAnonymous')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-switch v-model.number="scope.row.isAnonymous" />
              </template>
            </el-table-column>
            <!--连接模式-->
            <el-table-column v-if="state" :label="$t('taskPlan.mftpDown.connectionMode')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-select v-model="scope.row.connectionMode">
                  <el-option v-for="item in connectionModeOptions" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
              </template>
            </el-table-column>
            <!--传输模式-->
            <el-table-column v-if="state" :label="$t('taskPlan.mftpDown.transferMode')" width="160" min-width="160">
              <template slot-scope="scope">
                <el-select v-model="scope.row.transferMode">
                  <el-option v-for="item in transferModeOptions" :key="item.value" :label="item.label" :value="item.label" />
                </el-select>
              </template>
            </el-table-column>
            <!--            <el-table-column-->
            <!--              :label="$t('common.actions')"-->
            <!--              align="center"-->
            <!--              width="140"-->
            <!--              class-name="small-padding fixed-width"-->
            <!--              fixed="right"-->
            <!--            >-->
            <!--              <template slot-scope="scope">-->
            <!--                <el-button size="mini" type="primary" @click="handleHostTemplate(scope.row)">{{ $t('device.template') }}</el-button>-->
            <!--              </template>-->
            <!--            </el-table-column>-->
            <el-table-column fixed="right" :label="$t('common.actions')" width="80">
              <template slot-scope="scope">
                <el-tooltip :content="$t('device.template')">
                  <el-button icon="fe-icon-template" @click="handleHostTemplate(scope.row)" />
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="hostClick" />
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmHost">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!--    全局设置模板对话框-->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisibleAll"
      append-to-body
      width="70%"
    >
      <el-card class="box-card">
        <div class="filter-container">
          <el-table
            ref="multipleTable"
            :key="tableKey"
            v-col-width-limit
            :data="list"
            border
            fit
            height="400px"
            highlight-current-row
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="40" />
            <!--模板名称-->
            <el-table-column :label="$t('taskPlan.label.templateName')" min-width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.templateName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.actions')"
              width="83"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-tooltip :content="$t('device.template')">
                  <el-button icon="fe-icon-template" @click="handleAllTemplate(scope.row.id)" />
                </el-tooltip>
                <el-tooltip :content="$t('common.delete')">
                  <el-button type="danger" plain icon="el-icon-delete" @click="handleAllTemplateDelete(scope.row.id)" />
                </el-tooltip>
                <!--                <el-button size="mini" type="primary" @click="handleAllTemplate(scope.row.id)">{{ $t('device.template') }}</el-button>-->
                <!--                <el-button size="mini" type="danger" @click="handleAllTemplateDelete(scope.row.id)">{{ $t('common.delete') }}</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="allClick" />
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleAll = false">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>

import js from './index.js'
export default {
  ...js
}
</script>

<style lang="less" scoped>
  .form-create .form-create .el-form-item {
    margin-bottom: 22px!important;
  }
  input{
    width: 100px;
  }
  .box-card {
    margin: 5px 0px 5px 5px;
  }
  .dialog-pagination {
    margin-top:5px;
    padding:10px 16px;
  }
  .app-container{
    padding: 5px;
  }
  /*.dl-task-form{*/
  /*    width:100%;*/
  /*    .el-row{*/
  /*      width: 100%;*/
  /*    }*/
  /*  }*/
  .dl-task-form /deep/ .el-select,.dl-task-form /deep/ .el-input__inner, .dl-task-form /deep/ .el-input-number--small, .dl-task-form /deep/ .el-input--small{
    display: block;
    margin-right: 0;
    width: 200px;
  }
  .el-table {
    /deep/ .el-button,
    /deep/ .el-button--mini {
      padding: 5px;
    }
  }
</style>
