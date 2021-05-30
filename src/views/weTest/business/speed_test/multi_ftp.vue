<template>
  <el-form ref="dataForm" :model="model" :rules="rules" label-position="left" label-width="150px" style="width: 700px; margin-left:50px;">
    <el-form-item :label="$t('weTest.businessType')" prop="taskName">
      <el-input v-model="model.taskName" disabled />
    </el-form-item>
    <el-form-item :label="$t('weTest.businessName')" prop="name">
      <el-input v-model="model.name" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.testTimes')" prop="testTimes">
      <el-input v-model.number="model.testTimes" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.testIntervalS')" prop="testIntervalS">
      <el-input v-model.number="model.testIntervalS" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.testDuration')" prop="testDuration">
      <el-input v-model.number="model.testDuration" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.testType')" prop="testType">
      <el-select v-model="model.testType" placeholder="请选择测试类型" style="width:550px" :disabled="state">
        <el-option label="Up" value="Up" />
        <el-option label="Down" value="Down" />
        <el-option label="Up and down" value="Up and down" />
        <el-option label="Multi-RAB" value="Multi-RAB" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('parameter.pingTest')" prop="pingTestSelect">
      <el-select v-model="model.pingTestSelect" placeholder="是否进行PING测试" style="width:550px" @change="getUrlOptions">
        <el-option v-for="item in team" :key="item.value" :label="item.label" :value="item.value" :disabled="state" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('parameter.pingServer')" prop="pingServerip">
      <el-select v-model="model.pingServerip" placeholder="选择PING服务器" style="width:550px" :disabled="state" @focus="isSelectPing">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-for="(item,itemIndex) in model.servers" :key="item.itemIndex" :label="$t('weTest.ipConfig')">
      <span style="float:left;">
        <el-form-item :prop="'servers.'+ itemIndex + '.hostipStr'" :rules="serverRules.hostipStr">
          <el-tooltip class="item" effect="light" content="IP地址" placement="top-start">
            <el-input v-model="item.hostipStr" :placeholder="$t('parameter.ip')" style="width:165px" :disabled="state" @change="servers" />
          </el-tooltip>
        </el-form-item>
      </span>
      <span class="span_element">
        <el-form-item :prop="'servers.'+ itemIndex + '.portStr'" :rules="serverRules.portStr">
          <el-tooltip class="item" effect="light" content="端口" placement="top-start">
            <el-input v-model="item.portStr" :placeholder="$t('parameter.port')" style="width:130px" :disabled="state" />
          </el-tooltip>
        </el-form-item>
      </span>
      <span class="span_element">
        <el-form-item :prop="'servers.'+ itemIndex + '.user'" :rules="serverRules.user">
          <el-tooltip class="item" effect="light" content="登陆账号" placement="top-start">
            <el-input v-model="item.user" :placeholder="$t('parameter.account')" style="width:118px" :disabled="state" />
          </el-tooltip>
        </el-form-item>
      </span>
      <span class="span_element">
        <el-form-item :prop="'servers.'+ itemIndex + '.passwd'" :rules="serverRules.passwd">
          <el-tooltip class="item" effect="light" content="登录密码" placement="top-start">
            <el-input v-model="item.passwd" :placeholder="$t('parameter.password')" style="width:105px" :disabled="state" show-password />
          </el-tooltip>
        </el-form-item>
      </span>
      <!--      <span class="span_element1">-->
      <!--        <el-form-item :prop="'servers.'+ itemIndex + '.passwd'" :rules="serverRules.passwd">-->
      <!--          <el-input v-model="item.passwd" :placeholder="$t('parameter.password')" style="width:91px" />-->
      <!--        </el-form-item>-->
      <!--      </span>-->
      <span class="span_element1">
        <el-form-item :prop="'servers.'+ itemIndex + '.downloadFile'" :rules="serverRules.downloadFile">
          <el-tooltip class="item" effect="light" content="下载文件" placement="top-start">
            <el-input v-model="item.downloadFile" :placeholder="$t('parameter.downloadFile')" style="width:91px" :disabled="state" />
          </el-tooltip>
        </el-form-item>
      </span>
      <span class="span_element2">
        <el-form-item :prop="'servers.'+ itemIndex + '.uploadPath'" :rules="serverRules.uploadPath">
          <el-tooltip class="item" effect="light" content="上传路径" placement="top-start">
            <el-input v-model="item.uploadPath" :placeholder="$t('parameter.uploadPath')" style="width:91px" :disabled="state" />
          </el-tooltip>
        </el-form-item>
      </span>
      <span class="span_element">
        <el-form-item :prop="'servers.'+ itemIndex + '.threadCount'" :rules="serverRules.threadCount">
          <el-tooltip class="item" effect="light" content="线程数量" placement="top-start">
            <el-input v-model="item.threadCount" :placeholder="$t('parameter.threadNum')" style="width:91px" :disabled="state" />
          </el-tooltip>
        </el-form-item>
      </span>
      <span class="span_element">
        <el-form-item :prop="'servers.'+ itemIndex + '.select'" :rules="serverRules.select">
          <el-select v-model="item.select" placeholder="是否测试" style="width:95px" :disabled="state" @change="isSelect(itemIndex)">
            <el-option v-for="item2 in team" :key="item2.value" :label="item2.label" :value="item2.value" />
          </el-select>
        </el-form-item>
      </span>
      <span class="span_element">
        <!-- 此处的修改和删除是子元素，对数据的操作，而并不提交请求 -->
        <el-button v-if="state===false" size="mini" type="danger" @click="handleElementDelete(itemIndex)">{{ $t('common.delete') }}</el-button>
        <el-button v-if="state===false" size="mini" type="primary" @click="handleElementAdd(itemIndex)">{{ $t('common.add') }}</el-button>
      </span>
    </el-form-item>
  </el-form>
</template>

<script>
import waves from '@/directive/waves'
import {
  pingTestSelectCheck,
  testTypeCheck,
  businessNameCheck,
  portStrCheck,
  timeoutCheck,
  testIntervalsCheck,
  testTimesCheck,
  testDurationCheck,
  threadCountCheck, pingServeripCheck
} from '../../../../utils/WeTestForm'
export default {
  name: 'FTP',
  directives: { waves },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    const UrlsCheck = (rule, value, callback) => {
      const reg1 = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/i
      const reg2 = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      const reg3 = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
      let j = 0
      for (let i = 0; i < this.model.servers.length; i++) {
        if (value === this.model.servers[i].hostipStr) {
          j++
        }
      }
      if (!value) {
        callback(new Error('请输入域名/IP'))
      }
      if (j > 1) {
        callback(new Error('重复IP不能多次配置'))
      }
      if (reg1.test(value) || reg2.test(value) || reg3.test(value)) {
        callback()
      } else {
        callback(new Error('域名/IP格式不合法'))
      }
    }
    return {
      state: false,
      options: [],
      team: [
        {
          value: true,
          label: 'Yes'
        },
        {
          value: false,
          label: 'No'
        }],
      temp: {
        name: '',
        select: true,
        task: 'multi_ftp',
        taskName: 'Multi_FTP',
        testTimes: 1,
        testIntervalS: 10,
        testDuration: 30,
        testType: 'Up and down',
        pingTestSelect: '',
        pingServerip: '',
        servers: [{
          select: '',
          hostipStr: '116.6.50.82',
          portStr: '21',
          user: 'dingliftp',
          passwd: '123456',
          downloadFile: '/mnt/dingli/download/50M.rar',
          uploadPath: '/mnt/dingli/upload/',
          threadCount: '3'
        }]
      },
      dialogFormVisible: false,
      rules: {
        name: [{
          validator: businessNameCheck, // 自定义验证
          trigger: 'blur'
        }],
        timeout: [{
          validator: timeoutCheck, // 自定义验证
          trigger: 'blur'
        }],
        testTimes: [{
          validator: testTimesCheck, // 自定义验证
          trigger: 'blur'
        }],
        testIntervalS: [{
          validator: testIntervalsCheck, // 自定义验证
          trigger: 'blur'
        }],
        testDuration: [{
          validator: testDurationCheck, // 自定义验证
          trigger: 'blur'
        }],
        httpWebUrl: [{
          validator: UrlsCheck, // 自定义验证
          trigger: 'blur'
        }],
        testType: [{
          validator: testTypeCheck, // 自定义验证
          trigger: 'change'
        }],
        pingTestSelect: [{
          validator: pingTestSelectCheck, // 自定义验证
          trigger: 'change'
        }],
        pingServerip: [{
          validator: pingServeripCheck, // 自定义验证
          trigger: 'change'
        }]
      },
      serverRules: {
        hostipStr: [{
          validator: UrlsCheck, // 自定义验证
          trigger: 'blur'
        }],
        portStr: [{
          validator: portStrCheck, // 自定义验证
          trigger: 'blur'
        }],
        user: [{
          required: true,
          message: '请输入登录账号',
          trigger: 'blur'
        }],
        passwd: [{
          required: true,
          message: '请输入登录密码',
          trigger: 'blur'
        }],
        downloadFile: [{
          required: true,
          message: '请输入下载文件',
          trigger: 'blur'
        }],
        uploadPath: [{
          required: true,
          message: '请输入上传路径',
          trigger: 'blur'
        }],
        select: [{
          required: true,
          message: '请选择是否测试',
          trigger: 'change'
        }],
        threadCount: [{
          validator: threadCountCheck, // 自定义验证
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    temp() {
      for (let i = 0; i < this.temp.servers.length; i++) {
        this.options[i] = {}
        this.options[i].value = this.temp.servers[i].hostipStr
        this.options[i].label = this.temp.servers[i].hostipStr
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.model.name === undefined) {
        // 如果是新建，执行一下操作
        for (const j in this.temp) {
          this.$set(this.model, j, this.temp[j])
        }
      } else {
        this.state = this.model.state
      }
    },
    servers() {
    },
    handleElementDelete(itemIndex) {
      if (this.temp.servers.length > 1) {
        this.temp.servers.splice(itemIndex, 1)
      } else {
        this.$alert('至少需一个域名/IP配置', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            console.log(this.temp)
          }
        })
      }
    },
    handleElementAdd(itemIndex) {
      this.temp.servers.splice(itemIndex + 1, 0, { select: '', hostipStr: '', portStr: this.temp.servers[0].portStr, user: this.temp.servers[0].user, passwd: this.temp.servers[0].passwd, downloadFile: this.temp.servers[0].downloadFile, uploadPath: this.temp.servers[0].uploadPath, threadCount: this.temp.servers[0].threadCount })
    },
    isSelect(itemIndex) {
      console.log(itemIndex)
      let bool = true
      for (const item in this.model.servers) {
        if (this.model.servers[item].select === true) {
          bool = false
        }
      }
      if (bool) {
        console.log(this.model)
        this.model.servers[itemIndex].select = true
        this.$alert('至少配置至少一个服务器', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      }
    },
    getUrlOptions() {
      for (let i = 0; i < this.temp.servers.length; i++) {
        this.options[i] = {}
        this.options[i].value = this.temp.servers[i].hostipStr
        this.options[i].label = this.temp.servers[i].hostipStr
      }
    },
    isSelectPing(field) {
      this.options = {}
      for (let i = 0; i < this.model.servers.length; i++) {
        this.options[i] = {}
        this.options[i].value = this.model.servers[i].hostipStr
        this.options[i].label = this.model.servers[i].hostipStr
      }
    },
    submitForm() {
      this.model.testIntervalS = Number(this.model.testIntervalS)
      return this.$refs.dataForm.validate()
    }
  }
}
</script>

<style scoped>
  .span_element {
    float:left;padding-left:10px;
  }
  .span_element1 {
    float:left;padding-left:0px;
  }
  .span_element2 {
    float:left;padding-left:20px;
  }
</style>
