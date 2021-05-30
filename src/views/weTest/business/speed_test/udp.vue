<template>
  <el-form ref="dataForm" :model="model" :rules="rules" label-position="left" label-width="150px" style="width: 650px; margin-left:50px;">
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
    <el-form-item label="ip地址" prop="hostipStr">
      <el-input v-model="model.hostipStr" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.port')" prop="portStr" @change="getPortStr">
      <el-input v-model="model.portStr" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.bandwidth')" prop="sendBandwidth">
      <el-input v-model="model.sendBandwidth" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.pkgSize')" prop="pkgSize">
      <el-input v-model.number="model.pkgSize" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.testType')" prop="testType">
      <el-select v-model="model.testType" placeholder="请选择测试类型" style="width:500px" :disabled="state">
        <el-option label="Up and down" value="Up and down" />
        <el-option label="Up" value="Up" />
        <el-option label="Down" value="Down" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('parameter.pingTest')" prop="pingTestSelect">
      <el-select v-model="model.pingTestSelect" placeholder="是否进行PING测试" style="width:500px" :disabled="state">
        <el-option v-for="item in team" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>

  </el-form>
</template>

<script>
import waves from '@/directive/waves'
import { pingTestSelectCheck, testTypeCheck, sendBandwidthCheck, businessNameCheck, portStrCheck, testIntervalsCheck, testTimesCheck, testDurationCheck, pkgSizeCheck, pkgPeriodCheck, pkgCountCheck, UrlCheck } from '../../../../utils/WeTestForm'
export default {
  name: 'TCP',
  directives: { waves },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      state: false,
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
          validator: testDurationCheck, // 自定义验证
          trigger: 'blur'
        }],
        hostipStr: [{
          validator: UrlCheck, // 自定义验证
          trigger: 'blur'
        }],
        portStr: [{
          validator: portStrCheck, // 自定义验证
          trigger: 'blur'
        }],
        sendBandwidth: [{
          validator: sendBandwidthCheck, // 自定义验证
          trigger: 'blur'
        }],
        pkgSize: [{
          validator: pkgSizeCheck, // 自定义验证
          trigger: 'blur'
        }],
        pkgPeriod: [{
          validator: pkgPeriodCheck, // 自定义验证
          trigger: 'blur'
        }],
        pkgCount: [{
          validator: pkgCountCheck, // 自定义验证
          trigger: 'blur'
        }],
        testType: [{
          validator: testTypeCheck, // 自定义验证
          trigger: 'change'
        }],
        pingTestSelect: [{
          validator: pingTestSelectCheck, // 自定义验证
          trigger: 'change'
        }]
      },
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
        task: 'udp',
        select: true,
        taskName: 'UDP',
        testTimes: 1,
        testIntervalS: 10,
        testDuration: 60,
        hostipStr: '',
        portStr: '',
        sendBandwidth: 100,
        pkgSize: 1300,
        testType: 'Up and down',
        pingTestSelect: ''
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
      } else if (this.model.state !== undefined) {
        this.state = this.model.state
      }
    },
    getPortStr() {
      this.model.portStr = this.model.portStr.toString()
    },
    // 传入字符串，返回保留两位小数的数字
    getFloat2: function(x) {
      if (x !== '.') {
        const f = Math.round(x * 100) / 100
        let s = f.toString()
        let rs = s.indexOf('.')
        if (rs <= 0) {
          rs = s.length
          s += '.'
        }
        while (s.length <= rs + 2) {
          s += '0'
        }
        return s
      } else {
        return '0.00'
      }
    },
    submitForm() {
      // 将发送带宽转换为带两位小数
      // this.model.sendBandwidth = this.model.sendBandwidth.toFixed(2)
      // console.log(this.model.sendBandwidth)
      // this.model.sendBandwidth = parseFloat(this.model.sendBandwidth)
      this.model.sendBandwidth = parseFloat(this.getFloat2(this.model.sendBandwidth))
      console.log(this.model.sendBandwidth)
      this.model.portStr = this.model.portStr.toString()
      console.log(this.model)
      return this.$refs.dataForm.validate()
    }
  }
}
</script>

<style scoped>
  .span_element {
    float:left;padding-left:10px;
  }
</style>
