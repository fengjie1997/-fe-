<template>
  <el-form ref="dataForm" :model="model" :rules="rules" label-position="left" label-width="150px" style="width: 650px; margin-left:50px">
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
    <el-form-item label="测试方式" prop="resource">
      <el-radio-group v-model="resource" :disabled="state" @change="selectChange">
        <el-radio
          v-for="item in options"
          :key="item.key"
          :label="item.label"
          :value="item.value"
        />
      </el-radio-group>
    </el-form-item>
    <el-form-item v-for="(item,itemIndex) in model.servers" :key="item.itemIndex" :label="$t('weTest.ipConfig')">
      <span style="float:left;">
        <el-form-item :prop="'servers.'+ itemIndex + '.url'" :rules="serverRules.url">
          <el-tooltip class="item" effect="light" content="域名/IP" placement="top-start">
            <el-input v-model="item.url" :placeholder="$t('parameter.ip')" :style="urlStyle" :disabled="state" />
          </el-tooltip>
        </el-form-item>
      </span>
      <span class="span_element">
        <el-form-item :prop="'servers.'+ itemIndex + '.pkgSize'" :rules="serverRules.pkgSize">
          <el-tooltip class="item" effect="light" content="发送包大小(bytes)" placement="top-start">
            <el-input v-model.number="item.pkgSize" :placeholder="$t('parameter.pkgSize')" :style="pkgSizeStyle" :disabled="state" />
          </el-tooltip>
        </el-form-item>
      </span>
      <span class="span_element">
        <el-form-item :prop="'servers.'+ itemIndex + '.sendCycle'" :rules="serverRules.pkgPeriod">
          <el-tooltip class="item" effect="light" content="发送包周期(s)" placement="top-start">
            <el-input v-model="item.sendCycle" :placeholder="$t('parameter.pkgPeriod')" :style="sendCycleStyle" :disabled="state" />
          </el-tooltip>
        </el-form-item>
      </span>
      <span v-if="resource==='包数'" class="span_element1">
        <el-form-item :prop="'servers.'+ itemIndex + '.pkgCount'" :rules="serverRules.pkgCount">
          <el-tooltip class="item" effect="light" content="发送包个数" placement="top-start">
            <el-input v-model.number="item.pkgCount" :placeholder="$t('parameter.sendPkgNum')" :style="pkgCountStyle" :disabled="state" />
          </el-tooltip>
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
import { businessNameCheck, testIntervalsCheck, testTimesCheck, testDurationPingCheck, pkgSizePingCheck, pkgPeriodPingCheck, pkgCountPingCheck } from '../../../../utils/WeTestForm'
export default {
  name: 'PING',
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
        if (value === this.model.servers[i].url) {
          j++
        }
      }
      if (j > 1) {
        callback(new Error('同服务器不能多次配置！'))
      }
      if (reg1.test(value) || reg2.test(value) || reg3.test(value)) {
        callback()
      } else {
        callback(new Error('域名/IP不合法'))
      }
    }
    return {
      urlStyle: { width: '152px' },
      pkgSizeStyle: { width: '172px' },
      sendCycleStyle: { width: '150px' },
      pkgCountStyle: { width: '152px' },
      state: false,
      resource: '包数',
      options: [{ label: '包数', value: '包数' }, { label: '时长', value: '时长' }],
      temp: {
        name: '',
        select: true,
        task: 'ping',
        taskName: 'PING',
        testTimes: 1,
        testIntervalS: 10,
        testDuration: 20,
        pingServerip: 'www.baidu.com',
        servers: [{
          url: '',
          pkgSize: '',
          testDuration: '',
          pkgCount: '',
          sendCycle: '',
          timeout: 2,
          durationButton: false,
          countButton: true
        }]
      },
      serverRules: {
        url: [{
          required: true,
          message: '请输入域名/IP',
          trigger: 'blur'
        }, {
          validator: UrlsCheck, // 自定义验证
          trigger: 'blur'
        }],
        pkgSize: [{
          validator: pkgSizePingCheck, // 自定义验证
          trigger: 'blur'
        }],
        pkgPeriod: [{
          validator: pkgPeriodPingCheck, // 自定义验证
          trigger: 'blur'
        }],
        pkgCount: [{
          validator: pkgCountPingCheck, // 自定义验证
          trigger: 'blur'
        }]
      },
      rules: {
        name: [{
          validator: businessNameCheck, // 自定义验证
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
          validator: testDurationPingCheck, // 自定义验证
          trigger: 'blur'
        }]
      },
      dialogFormVisible: false
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
        if (this.model.servers[0].durationButton) {
          this.resource = '时长'
        }
      }
    },
    selectChange() {
      if (this.resource === '包数') {
        this.urlStyle.width = '152px'
        this.pkgSizeStyle.width = '172px'
        this.sendCycleStyle.width = '150px'
        this.pkgCountStyle.width = '152px'
      } else {
        this.urlStyle.width = '102px'
        this.pkgSizeStyle.width = '130px'
        this.sendCycleStyle.width = '104px'
        this.pkgCountStyle.width = '102px'
      }
    },
    handleElementDelete(itemIndex) {
      if (this.temp.servers.length > 1) {
        this.temp.servers.splice(itemIndex, 1)
      } else {
        this.$alert('至少需一个域名/IP配置', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      }
    },
    handleElementAdd(itemIndex) {
      if (this.resource === '包数') {
        this.temp.servers.splice(itemIndex + 1, 0, { url: '', pkgSize: '', sendCycle: '', pkgCount: '' })
      } else {
        this.temp.servers.splice(itemIndex + 1, 0, { url: '', pkgSize: '', sendCycle: '' })
      }
    },
    submitForm() {
      for (let i = 0; i < this.model.servers.length; i++) {
        for (let j = i + 1; j < this.model.servers.length; j++) {
          if (this.model.servers[i].url === this.model.servers[j].url) {
            this.$alert('同服务器不能多次配置，请修改ip', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            })
          }
        }
        this.model.servers[i].countButton = this.resource === '包数'
        this.model.servers[i].durationButton = this.resource !== '包数'
        this.model.servers[i].testDuration = this.model.testDuration
        this.model.servers[i].timeout = 2
        if (this.resource === '时长') {
          this.model.servers[i].pkgCount = 0
        }
      }
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
    float:left;padding-left:0;
  }
</style>
