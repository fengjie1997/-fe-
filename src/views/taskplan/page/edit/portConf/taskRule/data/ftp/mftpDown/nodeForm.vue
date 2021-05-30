<template>
  <el-collapse v-model="active" class="form-collapse">
    <el-collapse-item name="1">
      <template slot="title"><el-divider>{{ title }}</el-divider></template>
      <form-create v-model="modelForm" :rule="rule" :option="option" />
      <el-form label-width="180px">
        <el-form-item label="多路下载配置：">
          <el-table :data="tableData" style="width: 90%" border>
            <template slot="header" slot-scope="scope">
              <el-button :name="scope" size="mini" type="primary" style="float:right">add</el-button>
            </template>
            <el-table-column type="expand" label="#">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="下载文件">
                    <span>{{ props.row.downloadFile }}</span>
                  </el-form-item>
                  <el-form-item label="保存文件">
                    <span>{{ props.row.isSaveFile }}</span>
                  </el-form-item>
                  <el-form-item label="保存文件">
                    <span>{{ props.row.doSave }}</span>
                  </el-form-item>
                  <el-form-item label="线程数">
                    <span>{{ props.row.threadCount }}</span>
                  </el-form-item>
                  <el-form-item label="采样间隔(ms)">
                    <span>{{ props.row.samplesInterval }}</span>
                  </el-form-item>
                  <el-form-item label="重连次数">
                    <span>{{ props.row.reconnectCount }}</span>
                  </el-form-item>
                  <el-form-item label="重连间隔">
                    <span>{{ props.row.reconnectInterval }}</span>
                  </el-form-item>
                  <!-- ftp hosting -->
                  <el-form-item label="站点名称">
                    <span>{{ props.row.ftpHostSetting.siteName }}</span>
                  </el-form-item>
                  <el-form-item label="地址">
                    <span>{{ props.row.ftpHostSetting.address }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="downloadFile" label="下载文件" width="180" />
            <el-table-column prop="isSaveFile" label="保存文件" width="180" />
            <el-table-column prop="threadCount" label="线程数" />
            <el-table-column prop="samplesInterval" label="间隔" />
            <el-table-column prop="reconnectCount" label="重连次数" />
            <el-table-column label="操作" align="center">
              <template slot="header" slot-scope="scope">
                <el-button icon="el-icon-plus" :name="scope" size="mini" type="primary" @click="dialogVisible = true">添加</el-button>
              </template>
              <template slot-scope="scope">
                <el-button size="mini" type="danger" :name="scope.row.id" @click="handleDel(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <el-dialog title="添加多路下载配置" :visible.sync="dialogVisible" width="50%" class="conf-form-dialog">
        <el-form ref="form" :rules="rules" :model="confForm" label-width="100px" label-position="right" size="mini" class="conf-form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="下载文件" prop="downloadFile">
                <el-input v-model="confForm.downloadFile" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="保存文件">
                <el-switch v-model="confForm.isSaveFile" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="保存文件">
                <el-switch v-model="confForm.doSave" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="线程数">
                <el-input-number v-model="confForm.threadCount" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采样间隔(ms)">
                <el-input-number v-model="confForm.samplesInterval" :min="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="重连次数">
                <el-input-number v-model="confForm.reconnectCount" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="重连间隔">
                <el-input-number v-model="confForm.reconnectInterval" :min="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider>FTP Host Setting</el-divider>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="站点名称"
                :prop="'ftpHostSetting.siteName'"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                  { min: 1, max: 100, message: '请输入', trigger: 'blur' }
                ]"
              >
                <el-input v-model="confForm.ftpHostSetting.siteName" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="地址"
                :prop="'ftpHostSetting.address'"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                  { min: 1, max: 100, message: '请输入', trigger: 'blur' }
                ]"
              >
                <el-input v-model="confForm.ftpHostSetting.address" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="端口">
                <el-input-number v-model="confForm.ftpHostSetting.port" :min="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="用户名"
                :prop="'ftpHostSetting.username'"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                  { min: 1, max: 100, message: '请输入', trigger: 'blur' }
                ]"
              >
                <el-input v-model="confForm.ftpHostSetting.username" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="密码"
                :prop="'ftpHostSetting.password'"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                  { min: 1, max: 100, message: '请输入', trigger: 'blur' }
                ]"
              >
                <el-input v-model="confForm.ftpHostSetting.password" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="匿名">
                <el-switch v-model="confForm.ftpHostSetting.isAnonymous" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="连接模式">
                <el-radio-group v-model="confForm.ftpHostSetting.connectionMode">
                  <el-radio label="Passive">Passive</el-radio>
                  <el-radio label="Port">Port</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="传输模式">
                <el-radio-group v-model="confForm.ftpHostSetting.transferMode">
                  <el-radio label="Binary">Binary</el-radio>
                  <el-radio label="ASCII">ASCII</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="业务ID">
                <el-input-number v-model="confForm.ftpHostSetting.taskId" :min="0" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd()">确定添加</el-button>
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
<style lang="less">
.conf-form-dialog{
    .conf-form{
        padding: 15px;
    }
}
</style>
