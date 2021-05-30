<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="el-card device-box-card">
          <div class="filter-container">
            <el-form :inline="true" style="margin-bottom: auto">
              <el-form-item label="生产商">
                <el-input v-model="listQuery.manufacturer" style="width: 150px;" class="filter-item" />
              </el-form-item>
              <el-form-item label="设备ID">
                <el-input v-model="listQuery.uuid" style="width: 120px;" class="filter-item" />
              </el-form-item>
              <el-form-item label="设备分组">
                <el-cascader
                  v-model="selectGroupIds"
                  clearable
                  :options="groupOption"
                  @change="handleGroupChange"
                />
              </el-form-item>
              <!--                <el-form-item :label="$t('WeTestTableHead.endDt')">-->
              <!--                  <el-date-picker-->
              <!--                    v-model="time"-->
              <!--                    style="width: 220px"-->
              <!--                    value-format="timestamp"-->
              <!--                    type="datetimerange"-->
              <!--                    :default-value="defaultTime"-->
              <!--                    @change="getTimes"-->
              <!--                  />-->
              <!--                </el-form-item>-->
              <el-form-item>
                <el-button v-waves :loading="listLoading" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('common.search') }}</el-button>
              </el-form-item>
              <el-form-item label="排序方式">
                <el-select v-model="listQuery.isAsc" style="width: 100px" class="filter-item" @change="handleFilter">
                  <el-option v-for="item in isAscOptions" :key="item.key" :label="item.label" :value="item.key" />
                </el-select>
              </el-form-item>
            </el-form>
            <el-button v-perm="'/weTestDevice/deviceRegister'" class="filter-item" type="primary" icon="el-icon-plus" @click="licenseImport">{{ '设备注册' }}</el-button>
            <el-button v-perm="'/weTestDevice/deviceGroup'" class="filter-item" type="primary" icon="el-icon-edit" @click="deviceBind">{{ '设备分组' }}</el-button>
          </div>

          <el-table
            v-loading="listLoading"
            :data="list"
            :max-height="table"
            border
            fit
            highlight-current-row
            height="510px"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              min-width="50"
            >
              <template slot-scope="scope">
                <span>{{ (listQuery.page - 1) * listQuery.limit + scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <!-- 设备名name/设备imei号-->
            <el-table-column label="设备ID" align="center" min-width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.uuid }}</span>
              </template>
            </el-table-column>
            <!--              <el-table-column label="App类型" align="center" min-width="110">-->
            <!--                <template slot-scope="scope">-->
            <!--                  <span v-if="scope.row.appType===1">{{ 'WeTest' }}</span>-->
            <!--                  <span v-if="scope.row.appType===2">{{ 'WeTest ST' }}</span>-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <el-table-column label="设备分组" align="center" min-width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.groupName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="生产商" align="center" min-width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.manufacturer }}</span>
              </template>
            </el-table-column>
            <el-table-column label="App版本" align="center" min-width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.version }}</span>
              </template>
            </el-table-column>
            <!--              <el-table-column label="内核版本" align="center" min-width="110">-->
            <!--                <template slot-scope="scope">-->
            <!--                  <span>{{ scope.row.kernelVersion }}</span>-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <!--              <el-table-column-->
            <!--                :label="$t('WeTestDevice.deviceModel')"-->
            <!--                align="center"-->
            <!--                min-width="110"-->
            <!--              >-->
            <!--                <template slot-scope="scope">-->
            <!--                  <span>{{ scope.row.deviceModel }}</span>-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <!--              <el-table-column :label="$t('WeTestDevice.osVersion')" align="center" min-width="110">-->
            <!--                <template slot-scope="scope">-->
            <!--                  <span>{{ scope.row.osVersion }}</span>-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <!--              <el-table-column label="截止时间" align="center" min-width="110">-->
            <!--                <template slot-scope="scope">-->
            <!--                  <span>{{ getTime(scope.row.endDt) }}</span>-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <!--              <el-table-column label="剩余天数" align="center" min-width="110">-->
            <!--                <template slot-scope="scope">-->
            <!--                  <span>{{ getTableRemainTime(scope.row.endDt) }}</span>-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <el-table-column :label="$t('weTest.endDtWeTest')" align="center" min-width="120">
              <template slot-scope="scope">
                <span v-if="scope.wetest">{{ getTime(JSON.parse(scope.row.perm).validity.wetest) }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('weTest.wetestRemainDay')" align="center" min-width="130">
              <template slot-scope="scope">
                <span v-if="scope.wetest">{{ getTableRemainTime(JSON.parse(scope.row.perm).validity.wetest) }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('weTest.endDtST')" align="center" min-width="110">
              <template slot-scope="scope">
                <span v-if="scope.st">{{ getTime(JSON.parse(scope.row.perm).validity.wetestSt) }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('weTest.stRemainDay')" align="center" min-width="130">
              <template slot-scope="scope">
                <span v-if="scope.st">{{ getTableRemainTime(JSON.parse(scope.row.perm).validity.wetestSt) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.actions')"
              align="center"
              width="170"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button v-perm="'/weTestDevice/testPlan'" size="mini" type="info" @click="handleSelectHistory(scope.row)">{{ $t('weTest.selectHistoryTask') }}</el-button>
                <el-button
                  v-perm="'/weTestDevice/delete'"
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)"
                >{{ $t('common.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- Page -->
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            class="dialog-pagination"
            @pagination="getList"
          />
        </div>

        <div>
          <el-dialog
            v-if="dialogVisible"
            :title="title"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            :width="width"
            style="height: 95%"
          >
            <div v-if="dialogStatus !== 'historyTask'" class="filter-container">
              <el-form ref="dataForm" :model="deviceQuery" :rules="rules" label-position="left" label-width="150px" style="width: auto; margin-left:50px;">
                <!--                <el-form-item label="App类型" prop="appType">-->
                <!--                  <el-select v-if="dialogStatus !== 'historyTask'" v-model="deviceQuery.appType" style="width: 74%">-->
                <!--                    <el-option v-for="item in appTypeOptions" :key="item.value" :value="item.value" :label="item.label" />-->
                <!--                  </el-select>-->
                <!--                </el-form-item>-->
                <el-form-item v-if="dialogStatus === 'license'||dialogStatus === 'licenses'" label="license" prop="license" style="width: 80%">
                  <el-input v-model="deviceQuery.license" />
                </el-form-item>
                <el-form-item v-if="dialogStatus==='bindes'||dialogStatus==='bind'" label="设备分组" prop="groupId">
                  <el-select v-model="deviceQuery.groupId" style="width: 74%">
                    <el-option v-for="item in groupOptions" :key="item.value" :value="item.value" :label="item.label" />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="dialogStatus === 'bind'||dialogStatus === 'bindes'" label="选择操作" prop="selectBind">
                  <el-select v-model="deviceQuery.selectBind" style="width: 74%" @change="handleSelectBind">
                    <el-option v-for="item in selectBindOptions" :key="item.value" :value="item.value" :label="item.label" />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="dialogStatus === 'license'||dialogStatus === 'licenses'" label="选择操作" prop="selectRegister">
                  <el-select v-model="deviceQuery.selectRegister" style="width: 74%" @change="handleSelectRegister">
                    <el-option v-for="item in selectRegisterOptions" :key="item.value" :value="item.value" :label="item.label" />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="dialogStatus === 'bind'||dialogStatus === 'license'" label="设备ID" prop="uuid" style="width: 80%">
                  <el-input v-model="deviceQuery.uuid" />
                </el-form-item>
                <el-form-item v-if="dialogStatus==='bindes'||dialogStatus==='licenses'" label="设备ID文件" prop="uuid">
                  <el-upload
                    ref="upload"
                    style="display:inline-block"
                    :limit="1"
                    class="upload-demo"
                    accept=".xls,.xlsx"
                    action=""
                    :file-list="fileList"
                    :http-request="uploadSectionFile"
                    :auto-upload="false"
                  >
                    <el-button slot="trigger" v-waves size="small" class="filter-item" type="primary" plain>选取Excel文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传excel文件，单列格式，表头设备ID</div>
                  </el-upload>
                </el-form-item>
              </el-form>
            </div>
            <History v-if="dialogStatus==='historyTask'" :model="taskData" />
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelForm()">{{ $t('common.cancel') }}</el-button>
              <el-button v-if="dialogStatus==='license'" :loading="buttonLoading" type="primary" @click="handleRegister('dataForm')">{{ $t('common.confirm') }}</el-button>
              <el-button v-if="dialogStatus!=='license'" :loading="buttonLoading" type="primary" @click="dialogStatus==='bind'?handleBind('dataForm'):(dialogStatus==='bindes'?submitUpload('dataForm'):(dialogStatus==='historyTask'?cancelForm():submitUpload('dataForm')))">{{ $t('common.confirm') }}</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import js from './index.js'
export default {
  ...js
}
</script>

<style scoped>
  .device-box-card {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 84px - 30px);
    padding: 20px;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .dialog-pagination {
    margin-top:5px;
    padding:10px 16px;
  }
</style>
