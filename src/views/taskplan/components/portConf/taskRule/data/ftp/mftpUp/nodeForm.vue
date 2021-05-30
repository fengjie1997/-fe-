<template>
  <el-collapse v-model="active" class="form-collapse">
    <el-collapse-item name="1">
      <template slot="title"><el-divider>{{ title }}</el-divider></template>
      <form-create v-model="modelForm" :rule="rule" :option="option" />
      <el-form label-width="180px">
        <el-form-item :label="$t('taskPlan.mftpUp.mftpUpConfig')">
          <el-table v-col-width-limit :data="tableData" style="width: 90%" border>
            <template slot="header" slot-scope="scope">
              <el-button :name="scope" size="mini" type="primary" style="float:right">add</el-button>
            </template>
            <el-table-column type="expand" label="#" show-overflow-tooltip>
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item :label="$t('taskPlan.ftpDownload.downloadFile')">
                    <span>{{ props.row.localFile }}</span>
                  </el-form-item>
                  <el-form-item :label="$t('taskPlan.ftpDownload.isSaveFile')">
                    <span>{{ props.row.doSave }}</span>
                  </el-form-item>
                  <el-form-item :label="$t('taskPlan.ftpDownload.threadCount')">
                    <span>{{ props.row.threadCount }}</span>
                  </el-form-item>
                  <el-form-item :label="$t('taskPlan.ftpUpload.samplesInterval')">
                    <span>{{ props.row.samplesInterval }}</span>
                  </el-form-item>
                  <el-form-item :label="$t('taskPlan.ftpUpload.reConnectCount')">
                    <span>{{ props.row.reconnectCount }}</span>
                  </el-form-item>
                  <el-form-item :label="$t('taskPlan.mftpDown.reconnectInterval')">
                    <span>{{ props.row.reconnectInterval }}</span>
                  </el-form-item>
                  <!-- ftp hosting -->
                  <el-form-item :label="$t('taskPlan.mftpDown.siteName')">
                    <span>{{ props.row.ftpHostSetting.siteName }}</span>
                  </el-form-item>
                  <el-form-item :label="$t('taskPlan.mftpDown.address')">
                    <span>{{ props.row.ftpHostSetting.address }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="localFile" :label="$t('taskPlan.ftpUpload.localFile')" show-overflow-tooltip width="180" />
            <el-table-column prop="threadCount" :label="$t('taskPlan.ftpDownload.threadCount')" show-overflow-tooltip width="180" />
            <el-table-column prop="samplesInterval" :label="$t('taskPlan.ftpUpload.samplesInterval')" show-overflow-tooltip width="180" />
            <el-table-column prop="reconnectCount" :label="$t('taskPlan.ftpUpload.reConnectCount')" show-overflow-tooltip width="180" />
            <el-table-column :label="$t('common.actions')" fixed="right" width="85">
              <template slot="header" slot-scope="scope">
                <el-tooltip :content="$t('common.add')">
                  <el-button icon="el-icon-plus" :name="scope" type="primary" @click="dialogVisible = true, update = false, title = $t('taskPlan.mftpUp.addConfig'), resetModel()" />
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                <el-tooltip :content="$t('common.delete')">
                  <el-button plain icon="el-icon-delete" type="danger" :name="scope.row.id" @click="handleDel(scope.$index)" />
                </el-tooltip>
                <el-tooltip :content="$t('common.edit')">
                  <el-button icon="el-icon-edit" :name="scope.row.id" @click="title = $t('taskPlan.mftpUp.updateConfig'), handleUpdate(scope.row)" />
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" class="conf-form-dialog" :append-to-body="true">
        <el-form ref="form" :rules="rules" :model="confForm" label-width="100px" label-position="right" size="mini" class="conf-form">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('taskPlan.ftpUpload.fileSource')">
                <el-radio-group v-model="confForm.fileSource">
                  <el-radio label="Local File">Local File</el-radio>
                  <el-radio label="Create File">Create File</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('taskPlan.ftpUpload.fileSize')">
                <el-input-number v-model="confForm.fileSize" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('taskPlan.ftpUpload.localFile')">
                <el-input v-model="confForm.localFile" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('taskPlan.ftpUpload.remoteDirectory')">
                <el-input v-model="confForm.remoteDirectory" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('taskPlan.ftpDownload.threadCount')">
                <el-input-number v-model="confForm.threadCount" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('taskPlan.ftpUpload.samplesInterval')">
                <el-input-number v-model="confForm.samplesInterval" :min="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('taskPlan.ftpUpload.reConnectCount')">
                <el-input-number v-model="confForm.reconnectCount" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('taskPlan.mftpDown.reconnectInterval')">
                <el-input-number v-model="confForm.reconnectInterval" :min="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider>FTP Host Setting</el-divider>
          <el-row>
            <el-col :span="8">
              <el-form-item
                :label="$t('taskPlan.mftpDown.siteName')"
                :prop="'ftpHostSetting.siteName'"
                :rules="[
                  { required: true, message: $t('common.pleaseSelect'), trigger: 'blur' }
                  // 这个验证有点奇怪，放后面完善吧，国际化暂时不做
                  // { min: 1, max: 100, message: '请输入', trigger: 'blur' }
                ]"
              >
                <el-input v-model="confForm.ftpHostSetting.siteName" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                :label="$t('taskPlan.mftpDown.address')"
                :prop="'ftpHostSetting.address'"
                :rules="[
                  { required: true, message: $t('common.pleaseSelect'), trigger: 'blur' }
                  // { min: 1, max: 100, message: '请输入', trigger: 'blur' }
                ]"
              >
                <el-input v-model="confForm.ftpHostSetting.address" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('device.portNum')">
                <el-input-number v-model="confForm.ftpHostSetting.port" :min="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                :label="$t('device.user')"
                :prop="'ftpHostSetting.username'"
                :rules="[
                  { required: true, message: $t('common.pleaseSelect'), trigger: 'blur' }
                  // { min: 1, max: 100, message: '请输入', trigger: 'blur' }
                ]"
              >
                <el-input v-model="confForm.ftpHostSetting.username" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                :label="$t('device.password')"
                :prop="'ftpHostSetting.password'"
                :rules="[
                  { required: true, message: $t('common.pleaseSelect'), trigger: 'blur' }
                  // { min: 1, max: 100, message: '请输入', trigger: 'blur' }
                ]"
              >
                <el-input v-model="confForm.ftpHostSetting.password" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('taskPlan.mftpDown.isAnonymous')">
                <el-switch v-model="confForm.ftpHostSetting.isAnonymous" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('taskPlan.mftpDown.connectionMode')">
                <el-radio-group v-model="confForm.ftpHostSetting.connectionMode">
                  <el-radio label="Passive">Passive</el-radio>
                  <el-radio label="Port">Port</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('taskPlan.mftpDown.transferMode')">
                <el-radio-group v-model="confForm.ftpHostSetting.transferMode">
                  <el-radio label="Binary">Binary</el-radio>
                  <el-radio label="ASCII">ASCII</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <!--            <el-col :span="8">-->
            <!--              <el-form-item label="TASK ID">-->
            <!--                <el-input-number v-model="confForm.ftpHostSetting.taskId" :min="0" />-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false, resetModel()">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleAdd()">{{ $t('common.confirm') }}</el-button>
        </span>
      </el-dialog>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import js from './nodeForm.js'
export default {
  ...js
}
</script>
<style lang="less" scoped>
.conf-form-dialog{
    .conf-form{
        padding: 15px;
    }
}
.form-collapse {
  /deep/ .el-table {
    .el-table__body {
      .el-button,
      .el-button--mini {
        padding: 5px;
      }
    }
  }
}
.conf-form-dialog /deep/ .el-input--mini .el-input__inner{
  width: 130px;
}
</style>
