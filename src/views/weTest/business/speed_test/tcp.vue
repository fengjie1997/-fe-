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
    <el-form-item :label="$t('parameter.port')" prop="portStr">
      <el-input v-model="model.portStr" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.threadNum')" prop="threadCount">
      <el-input v-model.number="model.threadCount" :disabled="state" />
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
import {
  pingTestSelectCheck,
  testTypeCheck,
  threadCountCheck,
  businessNameCheck,
  testIntervalsCheck,
  testTimesCheck,
  testDurationCheck,
  pkgSizeCheck,
  pkgPeriodCheck,
  pkgCountCheck,
  UrlCheck,
  portStrCheck
} from '../../../../utils/WeTestForm'

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
        threadCount: [{
          validator: threadCountCheck, // 自定义验证
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
        select: true,
        name: '',
        task: 'tcp',
        taskName: 'TCP',
        testTimes: 1,
        testIntervalS: 10,
        testDuration: 60,
        hostipStr: '',
        portStr: '',
        threadCount: 3,
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
      } else {
        this.state = this.model.state
      }
    },
    submitForm() {
      this.model.portStr = this.model.portStr.toString()
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
